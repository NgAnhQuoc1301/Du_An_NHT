import { useMemo, useState } from 'react';
import { taskConfig } from '../../config/dashboards/task.config';
import { TASK_DATA, TASK_STATUS_COLORS, TASK_PRIORITY_COLORS } from '../../data/mockData/taskData';
import type { TaskRecord } from '../../data/mockData/taskData';

import { DashboardHeader }   from '../../components/bi-platform/shell/DashboardHeader';
import { GlobalFilterPanel } from '../../components/bi-platform/filters/GlobalFilterPanel';
import { KpiEngine }         from '../../components/bi-platform/kpis/KpiEngine';
import { ChartEngine }       from '../../components/bi-platform/charts/ChartEngine';
import { TableEngine }       from '../../components/bi-platform/tables/TableEngine';

function downloadCSV(rows: TaskRecord[], filename = 'task_export.csv') {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof TaskRecord)[];
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${r[k]}"`).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: filename,
  });
  a.click(); URL.revokeObjectURL(a.href);
}

const DEFAULT_FILTERS: Record<string, any> = {
  startYear: 2025, endYear: 2026,
  Assignee: 'Tất cả', Project: 'Tất cả', Status: 'Tất cả', Priority: 'Tất cả',
};

const KPI_PREMIUM: Record<string, string> = {
  'kpi-total':    'from-slate-500 to-slate-700',
  'kpi-todo':     'from-amber-500 to-orange-600',
  'kpi-inprog':   'from-violet-500 to-purple-600',
  'kpi-done':     'from-emerald-500 to-teal-600',
  'kpi-blocked':  'from-red-500 to-rose-600',
};

export default function TaskDashboard() {
  const [filters, setFilters] = useState<Record<string, any>>(DEFAULT_FILTERS);
  const [drillDown, setDrillDown] = useState<TaskRecord | null>(null);

  const handleChange = (key: string, value: any) => setFilters(p => ({ ...p, [key]: value }));
  const handleReset  = () => setFilters(DEFAULT_FILTERS);

  const filteredData = useMemo(() =>
  TASK_DATA.filter(d => {
    const year = new Date(d.DueDate).getFullYear();
    if (year < filters.startYear || year > filters.endYear) return false;
    if (filters.Assignee !== 'Tất cả' && d.Assignee !== filters.Assignee) return false;
    if (filters.Project  !== 'Tất cả' && d.Project  !== filters.Project)  return false;
    if (filters.Status   !== 'Tất cả' && d.Status   !== filters.Status)   return false;
    if (filters.Priority !== 'Tất cả' && d.Priority !== filters.Priority) return false;
    return true;
  }), [filters]);

  const kpis = useMemo(() => {
    if (!filteredData.length) return {} as Record<string, any>;
    const n = filteredData.length;
    const todo    = filteredData.filter(d => d.Status === 'Chưa làm').length;
    const inprog  = filteredData.filter(d => d.Status === 'Đang làm').length;
    const done    = filteredData.filter(d => d.Status === 'Hoàn thành').length;
    const blocked = filteredData.filter(d => d.Status === 'Bị chặn').length;
    const avgProg = filteredData.reduce((s, d) => s + d.Progress, 0) / n;
    
    const highPri = filteredData.filter(d => d.Priority === 'Cao' && d.Status !== 'Hoàn thành').length;
    // eslint-disable-next-line react-hooks/purity
    const overdue = filteredData.filter(d => d.Status !== 'Hoàn thành' && new Date(d.DueDate).getTime() < Date.now()).length;

    return {
      'kpi-total':    n,
      'kpi-todo':     todo,
      'kpi-inprog':   inprog,
      'kpi-done':     done,
      'kpi-blocked':  blocked,
      'kpi-avg-prog': Math.round(avgProg),
      'kpi-high-priority': highPri,
      'kpi-overdue':  overdue,
    };
  }, [filteredData]);

  const chartData = useMemo(() => {
    // Status Distribution
    const statusMap = new Map<string, number>();
    filteredData.forEach(d => {
      statusMap.set(d.Status, (statusMap.get(d.Status) ?? 0) + 1);
    });
    const statusData = Array.from(statusMap, ([name, value]) => ({
      name, value, fill: TASK_STATUS_COLORS[name] ?? '#94a3b8'
    }));

    // Priority Distribution
    const priorityMap = new Map<string, number>();
    filteredData.forEach(d => {
      priorityMap.set(d.Priority, (priorityMap.get(d.Priority) ?? 0) + 1);
    });
    const priorityData = Array.from(priorityMap, ([name, value]) => ({
      name, value, fill: TASK_PRIORITY_COLORS[name] ?? '#94a3b8'
    }));

    // Avg Progress Trend (monthly)
    const trendMap = new Map<string, { sum: number, count: number }>();
    filteredData.forEach(d => {
      const date = new Date(d.DueDate);
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2);
      const key = `${year} ${month}`; // month from DueDate
      const ex = trendMap.get(key) ?? { sum: 0, count: 0 };
      trendMap.set(key, { sum: ex.sum + d.Progress, count: ex.count + 1 });
    });
    const MONTH_ORDER = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    const trendData = Array.from(trendMap, ([name, v]) => ({
      name,
      progress: Math.round((v.sum / v.count) * 10) / 10,
    })).sort((a, b) => {
      const [aYear, aMonth] = a.name.split(' ');
      const [bYear, bMonth] = b.name.split(' ');
      if (aYear !== bYear) return Number(aYear) - Number(bYear);
      return MONTH_ORDER.indexOf(aMonth) - MONTH_ORDER.indexOf(bMonth);
    });

    return { statusData, priorityData, trendData };
  }, [filteredData]);

  const kpiDisplay = (id: string): string => {
    const v = kpis[id] ?? 0;
    if (id === 'kpi-avg-prog') return `${v}%`;
    return String(v);
  };

  const resolveChart = (src?: string): any[] => {
    switch (src) {
      case 'statusData':   return chartData.statusData;
      case 'priorityData': return chartData.priorityData;
      case 'trendData':    return chartData.trendData;
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

  const { layout } = taskConfig;

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      <DashboardHeader config={taskConfig} onExport={() => downloadCSV(filteredData)} />
      <GlobalFilterPanel config={taskConfig.filters} sourceData={TASK_DATA} values={filters} onChange={handleChange} onReset={handleReset} />

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
          onRowClick={row => setDrillDown(row as TaskRecord)}
          onExport={data => downloadCSV(data as TaskRecord[])} />
      ))}

      {/* Drill-down Modal */}
      {drillDown && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setDrillDown(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{drillDown.Title}</h4>
                <p className="text-sm text-slate-500">{drillDown.id} · {drillDown.Project}</p>
              </div>
              <button onClick={() => setDrillDown(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {([
                ['Người phụ trách',drillDown.Assignee],
                ['Trạng thái',     drillDown.Status],
                ['Ưu tiên',        drillDown.Priority],
                ['Tiến độ',        `${drillDown.Progress}%`],
                ['Ngày tạo',       drillDown.CreatedAt],
                ['Ngày cập nhật',  drillDown.UpdatedAt],
                ['Hạn chót',       drillDown.DueDate],
              ] as [string, any][]).map(([label, val]) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-slate-400 mb-1">{label}</p>
                  <p className="font-bold text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => downloadCSV([drillDown], `${drillDown.id}.csv`)} className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl text-sm transition-colors">📥 Xuất CSV</button>
              <button onClick={() => setDrillDown(null)} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}