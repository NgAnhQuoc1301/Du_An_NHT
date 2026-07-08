import { useMemo, useState } from 'react';
import { productionConfig } from '../../config/dashboards/production.config';
import { PRODUCTION_DATA, PROD_PLANT_COLORS, PROD_LINE_COLORS } from '../../data/mockData/productionData';
import type { ProductionRecord } from '../../data/mockData/productionData';

import { DashboardHeader }   from '../../components/bi-platform/shell/DashboardHeader';
import { GlobalFilterPanel } from '../../components/bi-platform/filters/GlobalFilterPanel';
import { KpiEngine }         from '../../components/bi-platform/kpis/KpiEngine';
import { ChartEngine }       from '../../components/bi-platform/charts/ChartEngine';
import { TableEngine }       from '../../components/bi-platform/tables/TableEngine';

function downloadCSV(rows: ProductionRecord[], filename = 'production_export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof ProductionRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

const DEFAULT_FILTERS: Record<string, any> = {
  startYear: 2025, endYear: 2026,
  Plant: 'All', Line: 'All', ProductType: 'All', Shift: 'All',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-output':    'from-blue-500 to-indigo-600',
  'kpi-target':    'from-emerald-500 to-teal-600',
  'kpi-oee':       'from-violet-500 to-purple-600',
  'kpi-defect':    'from-rose-500 to-pink-600',
};

export default function ProductionDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDown, setDrillDown] = useState<ProductionRecord | null>(null);

  const handleChange = (key: string, value: any) => setFilters(p => ({ ...p, [key]: value }));
  const handleReset  = () => setFilters(DEFAULT_FILTERS);

  const filteredData = useMemo(() =>
    PRODUCTION_DATA.filter(d => {
      if (d.Year < filters.startYear || d.Year > filters.endYear) return false;
      if (filters.Plant       !== 'All' && d.Plant       !== filters.Plant)       return false;
      if (filters.Line        !== 'All' && d.Line        !== filters.Line)        return false;
      if (filters.ProductType !== 'All' && d.ProductType !== filters.ProductType) return false;
      if (filters.Shift       !== 'All' && d.Shift       !== filters.Shift)       return false;
      return true;
    }), [filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, any>;
    const n = filteredData.length;
    
    const sum = (fn: (d: ProductionRecord) => number) => filteredData.reduce((s, d) => s + fn(d), 0);
    const avg = (fn: (d: ProductionRecord) => number) => sum(fn) / n;

    const actual = sum(d => d.OutputActual);
    const target = sum(d => d.OutputTarget);
    const defects = sum(d => d.Defects);

    return {
      'kpi-output':    actual,
      'kpi-target':    Math.round((actual / (target || 1)) * 100 * 10) / 10,
      'kpi-oee':       Math.round(avg(d => d.OEE) * 10) / 10,
      'kpi-defect':    Math.round((defects / (actual || 1)) * 100 * 100) / 100, // 2 decimals
      'kpi-downtime':  Math.round(sum(d => d.DowntimeMinutes) / 60), // Hours
      'kpi-energy':    sum(d => d.EnergyConsumed),
      'kpi-yield':     Math.round(((actual - defects) / (actual || 1)) * 100 * 10) / 10,
      'kpi-shifts':    n,
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    // Output Trend
    const trendMap = new Map<string, { actual: number, target: number }>();
    filteredData.forEach(d => {
      const key = `${d.Year} ${d.Month}`;
      const ex = trendMap.get(key) ?? { actual: 0, target: 0 };
      trendMap.set(key, { actual: ex.actual + d.OutputActual, target: ex.target + d.OutputTarget });
    });
    
    const MONTH_ORDER = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const trendData = Array.from(trendMap, ([name, v]) => ({ name, ...v }))
      .sort((a, b) => {
        const [aYear, aMonth] = a.name.split(' ');
        const [bYear, bMonth] = b.name.split(' ');
        if (aYear !== bYear) return Number(aYear) - Number(bYear);
        return MONTH_ORDER.indexOf(aMonth) - MONTH_ORDER.indexOf(bMonth);
      });

    // Output by Plant
    const plantMap = new Map<string, number>();
    filteredData.forEach(d => {
      plantMap.set(d.Plant, (plantMap.get(d.Plant) ?? 0) + d.OutputActual);
    });
    const plantData = Array.from(plantMap, ([name, value]) => ({
      name, value, fill: PROD_PLANT_COLORS[name] ?? '#94a3b8'
    }));

    // OEE by Line
    const lineMap = new Map<string, { sum: number, count: number }>();
    filteredData.forEach(d => {
      const ex = lineMap.get(d.Line) ?? { sum: 0, count: 0 };
      lineMap.set(d.Line, { sum: ex.sum + d.OEE, count: ex.count + 1 });
    });
    const lineData = Array.from(lineMap, ([name, v]) => ({
      name, oee: Math.round((v.sum / v.count) * 10) / 10,
      fill: PROD_LINE_COLORS[name] ?? '#3b82f6'
    })).sort((a, b) => a.name.localeCompare(b.name));

    return { trendData, plantData, lineData };
  }, [filteredData]);

  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (['kpi-target', 'kpi-oee', 'kpi-defect', 'kpi-yield'].includes(id)) return `${v}%`;
    return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v);
  };

  const resolveChart = (src?: string): any[] => {
    switch (src) {
      case 'trendData': return chartData.trendData;
      case 'plantData': return chartData.plantData;
      case 'lineData':  return chartData.lineData;
      default: return [];
    }
  };

  const getColSpanClass = (span?: number) => {
    switch (span) {
      case 1: return 'lg:col-span-1';
      case 2: return 'lg:col-span-2';
      case 3: return 'lg:col-span-3';
      case 4: return 'lg:col-span-4';
      default: return 'lg:col-span-2';
    }
  };

  const { layout } = productionConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <DashboardHeader config={productionConfig} onExport={() => downloadCSV(filteredData)} />
      <GlobalFilterPanel config={productionConfig.filters} sourceData={PRODUCTION_DATA} values={filters} onChange={handleChange} onReset={handleReset} />

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {layout.kpis.slice(0, 4).map(kpi => (
          <KpiEngine key={kpi.id} config={kpi} value={kpiDisplay(kpi.id)} variant="premium" colorGradient={KPI_PREMIUM[kpi.id]} />
        ))}
      </div>
      
      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {layout.kpis.slice(4).map(kpi => (
          <KpiEngine key={kpi.id} config={kpi} value={kpiDisplay(kpi.id)} variant="default" />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {layout.charts.map(chart => (
          <div key={chart.id} className={getColSpanClass(chart.gridSpan)}>
            <ChartEngine config={chart} data={resolveChart(chart.dataSource)} />
          </div>
        ))}
      </div>

      {/* Tables */}
      {layout.tables.map(table => (
        <TableEngine key={table.id} config={table} data={filteredData}
          onRowClick={row => setDrillDown(row as ProductionRecord)}
          onExport={data => downloadCSV(data as ProductionRecord[])} />
      ))}

      {/* Drill-down Modal */}
      {drillDown && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDrillDown(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{drillDown.id}</h4>
                <p className="text-sm text-slate-500">{drillDown.Date} · {drillDown.Plant} - {drillDown.Line}</p>
              </div>
              <button onClick={() => setDrillDown(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Product Type', drillDown.ProductType],
                ['Shift',        drillDown.Shift],
                ['Supervisor',   drillDown.Supervisor],
                ['OEE',          `${drillDown.OEE}%`],
                ['Output Actual',drillDown.OutputActual],
                ['Output Target',drillDown.OutputTarget],
                ['Defects',      drillDown.Defects],
                ['Downtime',     `${drillDown.DowntimeMinutes} mins`],
                ['Energy',       `${drillDown.EnergyConsumed} kWh`],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => downloadCSV([drillDown], `${drillDown.id}.csv`)} className="flex-1 py-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-colors">📥 Export</button>
              <button onClick={() => setDrillDown(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}