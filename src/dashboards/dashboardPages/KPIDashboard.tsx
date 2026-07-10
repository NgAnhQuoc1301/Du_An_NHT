import { useMemo, useState } from 'react';
import { kpiConfig } from '../../config/dashboards/kpi.config';
import { KPI_DATA, KPI_STATUS_COLORS, KPI_DEPT_COLORS } from '../../data/mockData/kpiData';
import type { KPIRecord } from '../../data/mockData/kpiData';

import { DashboardHeader }   from '../../components/bi-platform/shell/DashboardHeader';
import { GlobalFilterPanel } from '../../components/bi-platform/filters/GlobalFilterPanel';
import { KpiEngine }         from '../../components/bi-platform/kpis/KpiEngine';
import { ChartEngine }       from '../../components/bi-platform/charts/ChartEngine';
import { TableEngine }       from '../../components/bi-platform/tables/TableEngine';

function downloadCSV(rows: KPIRecord[], filename = 'kpi_export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof KPIRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

const DEFAULT_FILTERS: Record<string, any> = {
  startYear: 2025, endYear: 2026,
  Department: 'Tất cả', Category: 'Tất cả', Status: 'Tất cả',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-total':    'from-slate-500 to-slate-700',
  'kpi-on-track': 'from-emerald-500 to-teal-600',
  'kpi-at-risk':  'from-amber-500 to-orange-600',
  'kpi-behind':   'from-red-500 to-rose-600',
};

export default function KPIDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDown, setDrillDown] = useState<KPIRecord | null>(null);

  const handleChange = (key: string, value: any) => setFilters(p => ({ ...p, [key]: value }));
  const handleReset  = () => setFilters(DEFAULT_FILTERS);

  const filteredData = useMemo(() =>
    KPI_DATA.filter(d => {
      if (d.Year < filters.startYear || d.Year > filters.endYear) return false;
      if (filters.Department !== 'Tất cả' && d.Department !== filters.Department) return false;
      if (filters.Category   !== 'Tất cả' && d.Category   !== filters.Category)   return false;
      if (filters.Status     !== 'Tất cả' && d.Status     !== filters.Status)     return false;
      return true;
    }), [filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, any>;
    const n = filteredData.length;
    
    const onTrack = filteredData.filter(d => d.Status === 'Đúng tiến độ').length;
    const atRisk  = filteredData.filter(d => d.Status === 'Rủi ro').length;
    const behind  = filteredData.filter(d => d.Status === 'Behind').length;

    const avgAchv = filteredData.reduce((sum, d) => sum + d.Achievement, 0) / n;

    const deptAchv = (dept: string) => {
      const records = filteredData.filter(d => d.Department === dept);
      if (!records.length) return 0;
      return records.reduce((sum, d) => sum + d.Achievement, 0) / records.length;
    };

    return {
      'kpi-total':    n,
      'kpi-on-track': onTrack,
      'kpi-at-risk':  atRisk,
      'kpi-behind':   behind,
      'kpi-avg-achv': Math.round(avgAchv * 10) / 10,
      'kpi-sales':    Math.round(deptAchv('Bán hàng') * 10) / 10,
      'kpi-finance':  Math.round(deptAchv('Tài chính') * 10) / 10,
      'kpi-ops':      Math.round(deptAchv('Vận hành') * 10) / 10,
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    // Status Distribution
    const statusMap = new Map<string, number>();
    filteredData.forEach(d => {
      statusMap.set(d.Status, (statusMap.get(d.Status) ?? 0) + 1);
    });
    const statusData = Array.from(statusMap, ([name, value]) => ({
      name, value, fill: KPI_STATUS_COLORS[name] ?? '#94a3b8'
    }));

    // Dept Achievement
    const deptMap = new Map<string, { sum: number, count: number }>();
    filteredData.forEach(d => {
      const ex = deptMap.get(d.Department) ?? { sum: 0, count: 0 };
      deptMap.set(d.Department, { sum: ex.sum + d.Achievement, count: ex.count + 1 });
    });
    const deptData = Array.from(deptMap, ([name, v]) => ({
      name, achievement: Math.round((v.sum / v.count) * 10) / 10,
      fill: KPI_DEPT_COLORS[name] ?? '#3b82f6'
    }));

    // Achievement Trend
    const trendMap = new Map<string, { sum: number, count: number }>();
    filteredData.forEach(d => {
      const key = `${d.Year} ${d.Month}`;
      const ex = trendMap.get(key) ?? { sum: 0, count: 0 };
      trendMap.set(key, { sum: ex.sum + d.Achievement, count: ex.count + 1 });
    });
    const MONTH_ORDER = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const trendData = Array.from(trendMap, ([name, v]) => ({
      name, achievement: Math.round((v.sum / v.count) * 10) / 10
    })).sort((a, b) => {
      const [aYear, aMonth] = a.name.split(' ');
      const [bYear, bMonth] = b.name.split(' ');
      if (aYear !== bYear) return Number(aYear) - Number(bYear);
      return MONTH_ORDER.indexOf(aMonth) - MONTH_ORDER.indexOf(bMonth);
    });

    return { statusData, deptData, trendData };
  }, [filteredData]);

  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (['kpi-total', 'kpi-on-track', 'kpi-at-risk', 'kpi-behind'].includes(id)) return String(v);
    return `${v}%`;
  };

  const resolveChart = (src?: string): any[] => {
    switch (src) {
      case 'statusData': return chartData.statusData;
      case 'deptData':   return chartData.deptData;
      case 'trendData':  return chartData.trendData;
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

  const { layout } = kpiConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <DashboardHeader config={kpiConfig} onExport={() => downloadCSV(filteredData)} />
      <GlobalFilterPanel config={kpiConfig.filters} sourceData={KPI_DATA} values={filters} onChange={handleChange} onReset={handleReset} />

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
          onRowClick={row => setDrillDown(row as KPIRecord)}
          onExport={data => downloadCSV(data as KPIRecord[])} />
      ))}

      {/* Drill-down Modal */}
      {drillDown && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDrillDown(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{drillDown.MetricName}</h4>
                <p className="text-sm text-slate-500">{drillDown.Department} · {drillDown.Category}</p>
              </div>
              <button onClick={() => setDrillDown(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Period',       `${drillDown.Month} ${drillDown.Year}`],
                ['Metric Type',  drillDown.MetricType],
                ['Trạng thái',       drillDown.Status],
                ['Achievement',  `${drillDown.Achievement}%`],
                ['Mục tiêu',       drillDown.Target],
                ['Actual',       drillDown.Actual],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => downloadCSV([drillDown], `${drillDown.id}.csv`)} className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl text-sm transition-colors">📥 Export</button>
              <button onClick={() => setDrillDown(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}