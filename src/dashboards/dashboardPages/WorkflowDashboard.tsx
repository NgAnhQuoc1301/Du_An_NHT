import { useMemo, useState } from 'react';
import { workflowConfig } from '../../config/dashboards/workflow.config';
import { WORKFLOW_DATA, WORKFLOW_STATUS_COLORS } from '../../data/mockData/workflowData';
import type { WorkflowRecord } from '../../data/mockData/workflowData';

import { DashboardHeader }   from '../../components/bi-platform/shell/DashboardHeader';
import { GlobalFilterPanel } from '../../components/bi-platform/filters/GlobalFilterPanel';
import { KpiEngine }         from '../../components/bi-platform/kpis/KpiEngine';
import { ChartEngine }       from '../../components/bi-platform/charts/ChartEngine';
import { TableEngine }       from '../../components/bi-platform/tables/TableEngine';

// Removed unused fmtCurrency

function downloadCSV(rows: WorkflowRecord[], filename = 'workflow_export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof WorkflowRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

const DEFAULT_FILTERS: Record<string, any> = {
  startYear: 2024, endYear: 2026,
  Department: 'Tất cả', ProcessName: 'Tất cả', Status: 'Tất cả', Priority: 'Tất cả',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-total':     'from-slate-500 to-slate-700',
  'kpi-active':    'from-amber-500 to-orange-600',
  'kpi-completed': 'from-emerald-500 to-teal-600',
  'kpi-bottleneck':'from-red-500 to-rose-600',
};

export default function WorkflowDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDown, setDrillDown] = useState<WorkflowRecord | null>(null);

  const handleChange = (key: string, value: any) => setFilters(p => ({ ...p, [key]: value }));
  const handleReset  = () => setFilters(DEFAULT_FILTERS);

  const filteredData = useMemo(() =>
    WORKFLOW_DATA.filter(d => {
      const year = new Date(d.StartDate).getFullYear();
      if (year < filters.startYear || year > filters.endYear) return false;
      if (filters.Department  !== 'Tất cả' && d.Department  !== filters.Department)  return false;
      if (filters.ProcessName !== 'Tất cả' && d.ProcessName !== filters.ProcessName) return false;
      if (filters.Status      !== 'Tất cả' && d.Status      !== filters.Status)      return false;
      if (filters.Priority    !== 'Tất cả' && d.Priority    !== filters.Priority)    return false;
      return true;
    }), [filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, any>;
    const n = filteredData.length;
    
    const active     = filteredData.filter(d => d.Status === 'In Review').length;
    const completed  = filteredData.filter(d => d.Status === 'Đã Xong').length;
    const bottleneck = filteredData.filter(d => d.Status === 'In Review' && d.Priority === 'Cao').length;
    const avgSteps   = filteredData.reduce((s, d) => s + d.StepsTotal, 0) / n;
    
    const delayed    = filteredData.filter(d => d.Status !== 'Đã Xong' && d.Priority === 'Thấp').length; // Mock delay logic
    const avgProg    = filteredData.reduce((s, d) => s + (d.StepsCompleted / d.StepsTotal), 0) / n * 100;

    return {
      'kpi-total':           n,
      'kpi-active':          active,
      'kpi-completed':       completed,
      'kpi-bottleneck':      bottleneck,
      'kpi-avg-steps':       Math.round(avgSteps * 10) / 10,
      'kpi-completion-rate': Math.round((completed / n) * 100),
      'kpi-delayed':         delayed,
      'kpi-avg-progress':    Math.round(avgProg),
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    const statusMap = new Map<string, number>();
    filteredData.forEach(d => {
      statusMap.set(d.Status, (statusMap.get(d.Status) ?? 0) + 1);
    });
    const statusData = Array.from(statusMap, ([name, value]) => ({
      name, value, fill: WORKFLOW_STATUS_COLORS[name] ?? '#94a3b8'
    }));

    const deptMap = new Map<string, number>();
    filteredData.forEach(d => {
      deptMap.set(d.Department, (deptMap.get(d.Department) ?? 0) + 1);
    });
    // Assign simple colors to departments
    const DEPT_COLORS: Record<string, string> = {
      'HR': '#ec4899', 'Tài chính': '#10b981', 'Vận hành': '#3b82f6', 'CNTT': '#8b5cf6', 'Bán hàng': '#f59e0b'
    };
    const deptData = Array.from(deptMap, ([name, value]) => ({
      name, value, fill: DEPT_COLORS[name] ?? '#94a3b8'
    }));

    // Workflow Trend
    const trendMap = new Map<string, number>();
    filteredData.forEach(d => {
      const date = new Date(d.StartDate);
      const key = `${date.getFullYear()} ${('0' + (date.getMonth() + 1)).slice(-2)}`;
      trendMap.set(key, (trendMap.get(key) ?? 0) + 1);
    });
    const trendData = Array.from(trendMap, ([name, count]) => ({
      name, count
    })).sort((a, b) => a.name.localeCompare(b.name));

    return { statusData, deptData, trendData };
  }, [filteredData]);

  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (id === 'kpi-completion-rate' || id === 'kpi-avg-progress') return `${v}%`;
    return String(v);
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

  const { layout } = workflowConfig;

  // Add Progress dynamically for the table
  const tableData = useMemo(() => filteredData.map(d => ({
    ...d,
    Progress: Math.round((d.StepsCompleted / d.StepsTotal) * 100),
  })), [filteredData]);

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <DashboardHeader config={workflowConfig} onExport={() => downloadCSV(filteredData)} />
      <GlobalFilterPanel config={workflowConfig.filters} sourceData={WORKFLOW_DATA} values={filters} onChange={handleChange} onReset={handleReset} />

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
        <TableEngine key={table.id} config={table} data={tableData}
          onRowClick={row => setDrillDown(row as any)}
          onExport={data => downloadCSV(data as any[])} />
      ))}

      {/* Drill-down Modal */}
      {drillDown && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDrillDown(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{drillDown.ProcessName}</h4>
                <p className="text-sm text-slate-500">{drillDown.id} · {drillDown.Initiator}</p>
              </div>
              <button onClick={() => setDrillDown(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Phòng ban',   drillDown.Department],
                ['Trạng thái',       drillDown.Status],
                ['Ưu tiên',     drillDown.Priority],
                ['Steps Done',   `${drillDown.StepsCompleted} / ${drillDown.StepsTotal}`],
                ['Start Date',   drillDown.StartDate],
                ['Due Date',     drillDown.DueDate],
                ['Completed On', drillDown.CompletionDate ?? 'N/A'],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => downloadCSV([drillDown], `${drillDown.id}.csv`)} className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl text-sm transition-colors">📥 Export</button>
              <button onClick={() => setDrillDown(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}