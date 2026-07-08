import { useMemo, useState } from 'react';
import { hrConfig } from '../../config/dashboards/hr.config';
import { HR_DATA, DEPT_COLORS } from '../../data/mockData/hrData';
import type { HRRecord } from '../../data/mockData/hrData';
import { DashboardHeader }   from '../../components/bi-platform/shell/DashboardHeader';
import { GlobalFilterPanel } from '../../components/bi-platform/filters/GlobalFilterPanel';
import { KpiEngine }         from '../../components/bi-platform/kpis/KpiEngine';
import { ChartEngine }       from '../../components/bi-platform/charts/ChartEngine';
import { TableEngine }       from '../../components/bi-platform/tables/TableEngine';

const fmtCurrency = (v: number) => {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`;
  if (v >= 1_000_000)     return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000)         return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
};

function downloadCSV(rows: HRRecord[], filename = 'hr_export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof HRRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

const DEFAULT_FILTERS: Record<string, any> = {
  startYear: 2025, endYear: 2026,
  Department: 'All', Region: 'All', EmploymentType: 'All', Status: 'All',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-headcount':   'from-indigo-500 to-violet-600',
  'kpi-hired':       'from-emerald-500 to-teal-600',
  'kpi-resigned':    'from-red-500 to-rose-600',
  'kpi-turnover':    'from-amber-500 to-orange-600',
};

export default function HRDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDown, setDrillDown] = useState<HRRecord | null>(null);

  const handleChange = (key: string, value: any) => setFilters(p => ({ ...p, [key]: value }));
  const handleReset  = () => setFilters(DEFAULT_FILTERS);

  const filteredData = useMemo(() =>
    HR_DATA.filter(d => {
      if (d.Year < filters.startYear || d.Year > filters.endYear) return false;
      if (filters.Department     !== 'All' && d.Department     !== filters.Department)     return false;
      if (filters.Region         !== 'All' && d.Region         !== filters.Region)         return false;
      if (filters.EmploymentType !== 'All' && d.EmploymentType !== filters.EmploymentType) return false;
      if (filters.Status         !== 'All' && d.Status         !== filters.Status)         return false;
      return true;
    }), [filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, any>;
    const n = filteredData.length;
    const sum = (fn: (d: HRRecord) => number) => filteredData.reduce((s, d) => s + fn(d), 0);
    const totalHired   = sum(d => d.Hired);
    const totalResigned= sum(d => d.Resigned);
    return {
      'kpi-headcount':    n,
      'kpi-hired':        totalHired,
      'kpi-resigned':     totalResigned,
      'kpi-turnover':     n > 0 ? Math.round((totalResigned / n) * 1000) / 10 : 0,
      'kpi-salary':       sum(d => d.Salary),
      'kpi-bonus':        sum(d => d.Bonus),
      'kpi-performance':  Math.round((sum(d => d.PerformanceScore) / n) * 10) / 10,
      'kpi-satisfaction': Math.round((sum(d => d.SatisfactionScore) / n) * 10) / 10,
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    // Dept headcount & avg salary
    const deptMap = new Map<string, { count: number; salarySum: number }>();
    filteredData.forEach(d => {
      const ex = deptMap.get(d.Department) ?? { count: 0, salarySum: 0 };
      deptMap.set(d.Department, { count: ex.count + 1, salarySum: ex.salarySum + d.Salary });
    });
    const deptHeadcount = Array.from(deptMap, ([name, v]) => ({
      name, headcount: v.count, avgSalary: Math.round(v.salarySum / v.count),
    }));

    // Employment type mix
    const typeMap = new Map<string, number>();
    filteredData.forEach(d => typeMap.set(d.EmploymentType, (typeMap.get(d.EmploymentType) ?? 0) + 1));
    const TYPE_COLORS: Record<string, string> = { 'Full-time': '#6366f1', 'Part-time': '#10b981', Contract: '#f59e0b' };
    const empTypeMix = Array.from(typeMap, ([name, value]) => ({ name, value, fill: TYPE_COLORS[name] ?? '#64748b' }));

    // Hiring trend by Quarter
    const trendMap = new Map<string, { hired: number; resigned: number }>();
    filteredData.forEach(d => {
      const key = `${d.Year} ${d.Quarter}`;
      const ex = trendMap.get(key) ?? { hired: 0, resigned: 0 };
      trendMap.set(key, { hired: ex.hired + d.Hired, resigned: ex.resigned + d.Resigned });
    });
    const hiringTrend = Array.from(trendMap, ([name, v]) => ({ name, ...v }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Dept performance radar
    const perfMap = new Map<string, { sum: number; count: number }>();
    filteredData.forEach(d => {
      const ex = perfMap.get(d.Department) ?? { sum: 0, count: 0 };
      perfMap.set(d.Department, { sum: ex.sum + d.PerformanceScore, count: ex.count + 1 });
    });
    const deptPerformance = Array.from(perfMap, ([name, v]) => ({
      name, score: Math.round((v.sum / v.count) * 10) / 10,
    }));

    return { deptHeadcount, empTypeMix, hiringTrend, deptPerformance };
  }, [filteredData]);

  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (['kpi-salary', 'kpi-bonus'].includes(id))        return fmtCurrency(v);
    if (['kpi-turnover'].includes(id))                    return `${v}%`;
    if (['kpi-performance', 'kpi-satisfaction'].includes(id)) return `${v}`;
    return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v);
  };

  const resolveChart = (src?: string): any[] => {
    switch (src) {
      case 'deptHeadcount':   return chartData.deptHeadcount;
      case 'empTypeMix':      return chartData.empTypeMix;
      case 'hiringTrend':     return chartData.hiringTrend;
      case 'deptPerformance': return chartData.deptPerformance;
      default: return [];
    }
  };

  const { layout } = hrConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <DashboardHeader config={hrConfig} onExport={() => downloadCSV(filteredData)} />
      <GlobalFilterPanel config={hrConfig.filters} sourceData={HR_DATA} values={filters} onChange={handleChange} onReset={handleReset} />

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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {layout.charts.map(chart => (
          <ChartEngine key={chart.id} config={chart} data={resolveChart(chart.dataSource)} />
        ))}
      </div>

      {/* Table */}
      {layout.tables.map(table => (
        <TableEngine key={table.id} config={table} data={filteredData}
          onRowClick={row => setDrillDown(row as HRRecord)}
          onExport={data => downloadCSV(data as HRRecord[])} />
      ))}

      {/* Drill-down Modal */}
      {drillDown && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDrillDown(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{drillDown.FullName}</h4>
                <p className="text-sm text-slate-500">{drillDown.Position} · {drillDown.Department}</p>
              </div>
              <button onClick={() => setDrillDown(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Department',   drillDown.Department],
                ['Position',     drillDown.Position],
                ['Region',       drillDown.Region],
                ['Type',         drillDown.EmploymentType],
                ['Status',       drillDown.Status],
                ['Gender',       drillDown.Gender],
                ['Salary',       fmtCurrency(drillDown.Salary)],
                ['Bonus',        fmtCurrency(drillDown.Bonus)],
                ['Performance',  `${drillDown.PerformanceScore}/100`],
                ['Satisfaction', `${drillDown.SatisfactionScore}/100`],
                ['Training Hrs', `${drillDown.TrainingHours}h`],
                ['Absence Days', `${drillDown.AbsenceDays} days`],
                ['Years of Svc', `${drillDown.YearsOfService} yrs`],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => downloadCSV([drillDown], `employee_${drillDown.id}.csv`)} className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl text-sm transition-colors">📥 Export</button>
              <button onClick={() => setDrillDown(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}