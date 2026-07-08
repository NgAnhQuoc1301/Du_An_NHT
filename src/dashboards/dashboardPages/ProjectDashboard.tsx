import { useMemo, useState } from 'react';
import { projectConfig } from '../../config/dashboards/project.config';
import { PROJECT_DATA, PROJECT_STATUS_COLORS, PROJECT_PRIORITY_COLORS } from '../../data/mockData/projectData';
import type { ProjectRecord } from '../../data/mockData/projectData';

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

function downloadCSV(rows: ProjectRecord[], filename = 'project_export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof ProjectRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

const DEFAULT_FILTERS: Record<string, any> = {
  startYear: 2025, endYear: 2026,
  Department: 'All', Manager: 'All', Status: 'All', Priority: 'All',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-total':     'from-slate-500 to-slate-700',
  'kpi-on-track':  'from-emerald-500 to-teal-600',
  'kpi-delayed':   'from-red-500 to-rose-600',
  'kpi-completed': 'from-blue-500 to-indigo-600',
};

export default function ProjectDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDown, setDrillDown] = useState<ProjectRecord | null>(null);

  const handleChange = (key: string, value: any) => setFilters(p => ({ ...p, [key]: value }));
  const handleReset  = () => setFilters(DEFAULT_FILTERS);

  const filteredData = useMemo(() =>
    PROJECT_DATA.filter(d => {
      if (d.Year < filters.startYear || d.Year > filters.endYear) return false;
      if (filters.Department !== 'All' && d.Department !== filters.Department) return false;
      if (filters.Manager    !== 'All' && d.Manager    !== filters.Manager)    return false;
      if (filters.Status     !== 'All' && d.Status     !== filters.Status)     return false;
      if (filters.Priority   !== 'All' && d.Priority   !== filters.Priority)   return false;
      return true;
    }), [filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, any>;
    const n = filteredData.length;
    
    const sum = (fn: (d: ProjectRecord) => number) => filteredData.reduce((s, d) => s + fn(d), 0);

    const onTrack   = filteredData.filter(d => d.Status === 'On Track').length;
    const delayed   = filteredData.filter(d => d.Status === 'Delayed').length;
    const completed = filteredData.filter(d => d.Status === 'Completed').length;

    const budget = sum(d => d.Budget);
    const spent  = sum(d => d.Spent);

    return {
      'kpi-total':     n,
      'kpi-on-track':  onTrack,
      'kpi-delayed':   delayed,
      'kpi-completed': completed,
      'kpi-budget':    budget,
      'kpi-spent':     spent,
      'kpi-progress':  Math.round(sum(d => d.Progress) / n),
      'kpi-variance':  budget - spent, // + is good
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    // Status Distribution
    const statusMap = new Map<string, number>();
    filteredData.forEach(d => {
      statusMap.set(d.Status, (statusMap.get(d.Status) ?? 0) + 1);
    });
    const statusData = Array.from(statusMap, ([name, value]) => ({
      name, value, fill: PROJECT_STATUS_COLORS[name] ?? '#94a3b8'
    }));

    // Budget vs Spent by Dept
    const deptMap = new Map<string, { budget: number, spent: number }>();
    filteredData.forEach(d => {
      const ex = deptMap.get(d.Department) ?? { budget: 0, spent: 0 };
      deptMap.set(d.Department, { budget: ex.budget + d.Budget, spent: ex.spent + d.Spent });
    });
    const budgetData = Array.from(deptMap, ([name, v]) => ({ name, ...v }));

    // Priority Distribution
    const priorityMap = new Map<string, number>();
    filteredData.forEach(d => {
      priorityMap.set(d.Priority, (priorityMap.get(d.Priority) ?? 0) + 1);
    });
    const priorityData = Array.from(priorityMap, ([name, value]) => ({
      name, value, fill: PROJECT_PRIORITY_COLORS[name] ?? '#94a3b8'
    }));

    return { statusData, budgetData, priorityData };
  }, [filteredData]);

  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (['kpi-budget', 'kpi-spent', 'kpi-variance'].includes(id)) return fmtCurrency(v);
    if (id === 'kpi-progress') return `${v}%`;
    return String(v);
  };

  const resolveChart = (src?: string): any[] => {
    switch (src) {
      case 'statusData':   return chartData.statusData;
      case 'budgetData':   return chartData.budgetData;
      case 'priorityData': return chartData.priorityData;
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

  const { layout } = projectConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <DashboardHeader config={projectConfig} onExport={() => downloadCSV(filteredData)} />
      <GlobalFilterPanel config={projectConfig.filters} sourceData={PROJECT_DATA} values={filters} onChange={handleChange} onReset={handleReset} />

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
          onRowClick={row => setDrillDown(row as ProjectRecord)}
          onExport={data => downloadCSV(data as ProjectRecord[])} />
      ))}

      {/* Drill-down Modal */}
      {drillDown && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDrillDown(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{drillDown.ProjectName}</h4>
                <p className="text-sm text-slate-500">{drillDown.id} · {drillDown.Department}</p>
              </div>
              <button onClick={() => setDrillDown(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Manager',      drillDown.Manager],
                ['Status',       drillDown.Status],
                ['Priority',     drillDown.Priority],
                ['Progress',     `${drillDown.Progress}%`],
                ['Budget',       fmtCurrency(drillDown.Budget)],
                ['Spent',        fmtCurrency(drillDown.Spent)],
                ['Start Date',   drillDown.StartDate],
                ['End Date',     drillDown.EndDate],
                ['Team Size',    `${drillDown.TeamSize} members`],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => downloadCSV([drillDown], `${drillDown.id}.csv`)} className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl text-sm transition-colors">📥 Export</button>
              <button onClick={() => setDrillDown(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}