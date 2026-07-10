import { useMemo, useState } from 'react';
import { ceoConfig } from '../../config/dashboards/ceo.config';
import { DETAILED_DATA } from '../../data/mockData/ceoData';
import type { ExecutiveDataRecord } from '../../data/mockData/ceoData';

// ── Engine imports ────────────────────────────────────────────────────────────
import { DashboardHeader }    from '../../components/bi-platform/shell/DashboardHeader';
import { GlobalFilterPanel }  from '../../components/bi-platform/filters/GlobalFilterPanel';
import { KpiEngine }          from '../../components/bi-platform/kpis/KpiEngine';
import { ChartEngine }        from '../../components/bi-platform/charts/ChartEngine';
import { TableEngine }        from '../../components/bi-platform/tables/TableEngine';

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (v: number, type: 'currency' | 'percent' | 'number' = 'currency') => {
  if (type === 'currency') {
    if (Math.abs(v) >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (Math.abs(v) >= 1_000)     return `$${(v / 1_000).toFixed(0)}K`;
    return `$${v}`;
  }
  if (type === 'percent') return `${v}%`;
  return String(v);
};

function downloadCSV(rows: ExecutiveDataRecord[], filename = 'ceo_export.csv') {
  if (!rows.length) { alert('No data'); return; }
  const header = Object.keys(rows[0]);
  const csv = [header, ...rows.map(r => header.map(k => `"${(r as any)[k]}"`))]
    .map(row => row.join(',')).join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })),
    download: filename,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

// ── Default filter state (matches ceoConfig.filters) ────────────────────────
const DEFAULT_FILTERS: Record<string, any> = {
  startYear:  2025,
  endYear:    2026,
  Region:     'Tất cả',
  Country:    'Tất cả',
  Company:    'Tất cả',
  Department: 'Tất cả',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-revenue': 'from-emerald-500 to-teal-600',
  'kpi-profit':  'from-blue-500 to-indigo-600',
  'kpi-cost':    'from-rose-500 to-red-600',
  'kpi-ebitda':  'from-violet-500 to-purple-600',
  'kpi-yoy':     'from-amber-500 to-orange-600',
};


// ── Component ─────────────────────────────────────────────────────────────────
export default function CEODashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDownRow, setDrillDownRow] = useState<ExecutiveDataRecord | null>(null);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value };
      // Cascade: reset Country when Region changes, reset Company when Country changes
      if (key === 'Khu vực')  { next.Country = 'Tất cả'; next.Company = 'Tất cả'; }
      if (key === 'Country') { next.Company = 'Tất cả'; }
      return next;
    });
  };

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  // ── Filtered dataset ────────────────────────────────────────────────────────
  const filteredData = useMemo(() =>
    DETAILED_DATA.filter(d => {
      if (d.Year < filters.startYear || d.Year > filters.endYear) return false;
      if (filters.Region     !== 'Tất cả' && d.Region     !== filters.Region)     return false;
      if (filters.Country    !== 'Tất cả' && d.Country    !== filters.Country)    return false;
      if (filters.Company    !== 'Tất cả' && d.Company    !== filters.Company)    return false;
      if (filters.Department !== 'Tất cả' && d.Department !== filters.Department) return false;
      return true;
    }),
  [filters]);

  // ── KPI calculation ─────────────────────────────────────────────────────────
  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, number>;
    const n = filteredData.length;
    const sum = (fn: (d: ExecutiveDataRecord) => number) => filteredData.reduce((s, d) => s + fn(d), 0);
    const avg = (fn: (d: ExecutiveDataRecord) => number) => Math.round((sum(fn) / n) * 10) / 10;
    const totalRevenue = sum(d => d.Revenue);
    return {
      'kpi-revenue': totalRevenue,
      'kpi-cost':    sum(d => d.Cost),
      'kpi-profit':  totalRevenue - sum(d => d.Cost),
      'kpi-margin':  avg(d => d.Margin),
      'kpi-ebitda':  Math.round(sum(d => d.EBITDA) / n),
      'kpi-yoy':     avg(d => d.YoY_Growth),
      'kpi-emp':     sum(d => d.Employees),
      'kpi-cust':    sum(d => d.Customers),
      'kpi-active':  sum(d => d.Active_Projects),
      'kpi-done':    sum(d => d.Completed_Projects),
      'kpi-fail':    sum(d => d.Failed_Projects),
      'kpi-health':  avg(d => d.Health_Score),
    };
  }, [filteredData]);

  // ── Derived chart data ───────────────────────────────────────────────────────
  const chartData = useMemo(() => {
    // Revenue Trend — computed from filteredData, grouped by Year+Quarter so it reacts to filters
    const trendMap = new Map<string, { revenue: number; profit: number }>();
    filteredData.forEach(d => {
      const key = `${d.Year} ${d.Quarter}`;
      const ex = trendMap.get(key) ?? { revenue: 0, profit: 0 };
      trendMap.set(key, { revenue: ex.revenue + d.Revenue, profit: ex.profit + d.Profit });
    });
    const revenueTrend = Array.from(trendMap, ([name, v]) => ({ name, ...v }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Region summary from filtered data
    const regionMap = new Map<string, { revenue: number; profit: number }>();
    filteredData.forEach(d => {
      const ex = regionMap.get(d.Region) ?? { revenue: 0, profit: 0 };
      regionMap.set(d.Region, { revenue: ex.revenue + d.Revenue, profit: ex.profit + d.Profit });
    });
    const regionSummary = Array.from(regionMap, ([name, v]) => ({ name, ...v }));

    // Project status
    const completed  = filteredData.reduce((s, d) => s + d.Completed_Projects, 0);
    const active     = filteredData.reduce((s, d) => s + d.Active_Projects, 0);
    const atRisk     = Math.floor(active * 0.15);
    const onHold     = Math.floor(active * 0.10);
    const projectStatus = [
      { name: 'Đã Xong',   value: completed,               fill: '#1b4332' },
      { name: 'In Progress', value: active - atRisk - onHold, fill: '#40916c' },
      { name: 'Rủi ro',     value: atRisk,                  fill: '#f59e0b' },
      { name: 'On Hold',     value: onHold,                  fill: '#ef4444' },
    ];

    // Department health
    const deptMap = new Map<string, { sum: number; count: number }>();
    filteredData.forEach(d => {
      const ex = deptMap.get(d.Department) ?? { sum: 0, count: 0 };
      deptMap.set(d.Department, { sum: ex.sum + d.Health_Score, count: ex.count + 1 });
    });
    const deptHealth = Array.from(deptMap, ([name, { sum, count }]) => ({
      name,
      score: Math.round((sum / count) * 10) / 10,
    }));

    return { revenueTrend, regionSummary, projectStatus, deptHealth };
  }, [filteredData]);

  // ── KPI value formatter by id ────────────────────────────────────────────────
  const kpiDisplayValue = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (['kpi-revenue', 'kpi-cost', 'kpi-profit', 'kpi-ebitda'].includes(id)) return fmt(v, 'currency');
    if (['kpi-margin', 'kpi-yoy', 'kpi-health'].includes(id)) return fmt(v, 'percent');
    return fmt(v, 'number');
  };

  // ── Chart data resolver ──────────────────────────────────────────────────────
  const resolveChartData = (dataSource?: string): any[] => {
    switch (dataSource) {
      case 'revenueTrend':   return chartData.revenueTrend;
      case 'regionSummary':  return chartData.regionSummary;
      case 'projectStatus':  return chartData.projectStatus;
      case 'deptHealth':     return chartData.deptHealth;
      default:               return [];
    }
  };

  const { layout } = ceoConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <DashboardHeader config={ceoConfig} onExport={() => downloadCSV(filteredData)} />

      {/* ── Global Filters ─────────────────────────────────────────────────── */}
      <GlobalFilterPanel
        config={ceoConfig.filters}
        sourceData={DETAILED_DATA}
        values={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* ── Primary KPI Row (premium cards) ────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {layout.kpis.map(kpi => (
          <KpiEngine
            key={kpi.id}
            config={kpi}
            value={kpiDisplayValue(kpi.id)}
            variant="premium"
            colorGradient={KPI_PREMIUM[kpi.id]}
          />
        ))}
      </div>

      {/* ── Charts Grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {layout.charts.map(chart => (
          <div key={chart.id} className={chart.gridSpan === 2 ? "lg:col-span-2" : "lg:col-span-1"}>
            <ChartEngine
              config={chart}
              data={resolveChartData(chart.dataSource)}
            />
          </div>
        ))}
      </div>

      {/* ── Detail Table ────────────────────────────────────────────────────── */}
      {layout.tables.map(table => (
        <TableEngine
          key={table.id}
          config={table}
          data={filteredData}
          onRowClick={row => setDrillDownRow(row as ExecutiveDataRecord)}
          onExport={data => downloadCSV(data as ExecutiveDataRecord[])}
        />
      ))}

      {/* ── Drill-down Modal ─────────────────────────────────────────────────── */}
      {drillDownRow && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setDrillDownRow(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">Record #{drillDownRow.id}</h4>
                <p className="text-sm text-slate-500">{drillDownRow.Company} · {drillDownRow.Region}</p>
              </div>
              <button onClick={() => setDrillDownRow(null)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Khu vực',    drillDownRow.Region],
                ['Country',   drillDownRow.Country],
                ['Công ty',   drillDownRow.Company],
                ['Phòng ban',drillDownRow.Department],
                ['Doanh thu',   fmt(drillDownRow.Revenue)],
                ['Profit',    fmt(drillDownRow.Profit)],
                ['EBITDA',    fmt(drillDownRow.EBITDA)],
                ['Margin',    `${drillDownRow.Margin}%`],
                ['Employees', drillDownRow.Employees],
                ['Health',    `${drillDownRow.Health_Score}/100`],
                ['Risk Level',drillDownRow.Risk_Level],
                ['YoY Growth',`${drillDownRow.YoY_Growth}%`],
              ].map(([label, val]) => (
                <div key={label as string} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => downloadCSV([drillDownRow], `record_${drillDownRow.id}.csv`)}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-colors text-sm"
              >
                📥 Export Record
              </button>
              <button
                onClick={() => setDrillDownRow(null)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}