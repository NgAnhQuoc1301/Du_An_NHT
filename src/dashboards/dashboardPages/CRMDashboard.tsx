import { useMemo, useState } from 'react';
import { crmConfig } from '../../config/dashboards/crm.config';
import { CRM_DATA, CRM_SOURCE_COLORS, CRM_STAGE_COLORS } from '../../data/mockData/crmData';
import type { CRMRecord } from '../../data/mockData/crmData';

import { DashboardHeader }   from '../../components/bi-platform/shell/DashboardHeader';
import { GlobalFilterPanel } from '../../components/bi-platform/filters/GlobalFilterPanel';
import { KpiEngine }         from '../../components/bi-platform/kpis/KpiEngine';
import { ChartEngine }       from '../../components/bi-platform/charts/ChartEngine';
import { TableEngine }       from '../../components/bi-platform/tables/TableEngine';

const fmtCurrency = (v: number) => {
  if (Math.abs(v) >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(v) >= 1_000_000)     return `$${(v / 1_000_000).toFixed(1)}M`;
  if (Math.abs(v) >= 1_000)         return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
};

function downloadCSV(rows: CRMRecord[], filename = 'crm_export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof CRMRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

const DEFAULT_FILTERS: Record<string, any> = {
  startYear: 2025, endYear: 2026,
  Region: 'Tất cả', Source: 'Tất cả', Industry: 'Tất cả', SalesPerson: 'Tất cả',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-leads':      'from-blue-500 to-indigo-600',
  'kpi-won':        'from-emerald-500 to-teal-600',
  'kpi-conversion': 'from-violet-500 to-purple-600',
  'kpi-value':      'from-amber-500 to-orange-600',
};

export default function CRMDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDown, setDrillDown] = useState<CRMRecord | null>(null);

  const handleChange = (key: string, value: any) => setFilters(p => ({ ...p, [key]: value }));
  const handleReset  = () => setFilters(DEFAULT_FILTERS);

  const filteredData = useMemo(() =>
    CRM_DATA.filter(d => {
      if (d.Year < filters.startYear || d.Year > filters.endYear) return false;
      if (filters.Region      !== 'Tất cả' && d.Region      !== filters.Region)      return false;
      if (filters.Source      !== 'Tất cả' && d.Source      !== filters.Source)      return false;
      if (filters.Industry    !== 'Tất cả' && d.Industry    !== filters.Industry)    return false;
      if (filters.SalesPerson !== 'Tất cả' && d.SalesPerson !== filters.SalesPerson) return false;
      return true;
    }), [filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, any>;
    const totalLeads = filteredData.length;
    const wonDeals = filteredData.filter(d => d.Stage === 'Thắng');
    const lostDeals = filteredData.filter(d => d.Stage === 'Thua');
    const activeOpps = filteredData.filter(d => !['Thắng', 'Thua'].includes(d.Stage));

    const totalValue = filteredData.reduce((s, d) => s + d.Value, 0);
    const avgDealSize = wonDeals.length ? wonDeals.reduce((s, d) => s + d.Value, 0) / wonDeals.length : 0;

    return {
      'kpi-leads':      totalLeads,
      'kpi-won':        wonDeals.length,
      'kpi-conversion': Math.round((wonDeals.length / totalLeads) * 100 * 10) / 10,
      'kpi-value':      totalValue,
      'kpi-avg-deal':   avgDealSize,
      'kpi-lost':       lostDeals.length,
      'kpi-active':     activeOpps.length,
      'kpi-cycle':      '45 Days', // Mock string
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    // Funnel by Stage
    const stageOrder = ['Cơ hội', 'Đủ ĐK', 'Đề xuất', 'Đàm phán', 'Thắng', 'Thua'];
    const funnelMap = new Map<string, number>();
    filteredData.forEach(d => {
      funnelMap.set(d.Stage, (funnelMap.get(d.Stage) ?? 0) + 1);
    });
    const funnelData = stageOrder.map(stage => ({
      name: stage, count: funnelMap.get(stage) || 0,
      fill: CRM_STAGE_COLORS[stage] ?? '#cbd5e1'
    }));

    // Lead Source
    const sourceMap = new Map<string, number>();
    filteredData.forEach(d => {
      sourceMap.set(d.Source, (sourceMap.get(d.Source) ?? 0) + 1);
    });
    const sourceData = Array.from(sourceMap, ([name, value]) => ({
      name, value, fill: CRM_SOURCE_COLORS[name] ?? '#94a3b8'
    }));

    // Pipeline Trend (Value of Active Opps by ExpectedCloseDate)
    const trendMap = new Map<string, number>();
    filteredData.forEach(d => {
      if (!['Thắng', 'Thua'].includes(d.Stage)) {
        trendMap.set(d.ExpectedCloseDate, (trendMap.get(d.ExpectedCloseDate) ?? 0) + d.Value);
      }
    });
    const pipelineTrend = Array.from(trendMap, ([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return { funnelData, sourceData, pipelineTrend };
  }, [filteredData]);

  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (typeof v === 'string') return v;
    if (['kpi-value', 'kpi-avg-deal'].includes(id)) return fmtCurrency(v);
    if (id === 'kpi-conversion') return `${v}%`;
    return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v);
  };

  const resolveChart = (src?: string): any[] => {
    switch (src) {
      case 'funnelData':    return chartData.funnelData;
      case 'sourceData':    return chartData.sourceData;
      case 'pipelineTrend': return chartData.pipelineTrend;
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

  const { layout } = crmConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <DashboardHeader config={crmConfig} onExport={() => downloadCSV(filteredData)} />
      <GlobalFilterPanel config={crmConfig.filters} sourceData={CRM_DATA} values={filters} onChange={handleChange} onReset={handleReset} />

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
          onRowClick={row => setDrillDown(row as CRMRecord)}
          onExport={data => downloadCSV(data as CRMRecord[])} />
      ))}

      {/* Drill-down Modal */}
      {drillDown && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDrillDown(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{drillDown.Company}</h4>
                <p className="text-sm text-slate-500">{drillDown.id} · {drillDown.Contact}</p>
              </div>
              <button onClick={() => setDrillDown(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Ngành nghề',     drillDown.Industry],
                ['Khu vực',       drillDown.Region],
                ['Nguồn',       drillDown.Source],
                ['Sales Rep',    drillDown.SalesPerson],
                ['Giai đoạn',        drillDown.Stage],
                ['Trạng thái',       drillDown.Status],
                ['Giá trị',        fmtCurrency(drillDown.Value)],
                ['Xác suất',  `${drillDown.Probability}%`],
                ['Exp Close',    drillDown.ExpectedCloseDate],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => downloadCSV([drillDown], `${drillDown.id}.csv`)} className="flex-1 py-2 bg-violet-500 hover:bg-violet-400 text-white font-semibold rounded-xl text-sm transition-colors">📥 Export</button>
              <button onClick={() => setDrillDown(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}