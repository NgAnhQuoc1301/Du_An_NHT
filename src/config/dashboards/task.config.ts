import type { BIDashboardConfig } from '../../types/bi.types';

export const taskConfig: BIDashboardConfig = {
  id: 'task',
  name: 'Task Management Dashboard',
  description: 'Quản lý công việc — Task Tracking, Status & Priorities',
  theme: 'indigo',

  filters: [
    { id: 'startYear',  label: 'Start Year',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',    label: 'End Year',      type: 'date-range', defaultValue: 2026 },
    { id: 'Assignee',   label: 'Assignee',      type: 'select' },
    { id: 'Project',    label: 'Project',       type: 'select' },
    { id: 'Status',     label: 'Status',        type: 'select', options: ['All', 'Todo', 'In Progress', 'Done', 'Blocked'] },
    { id: 'Priority',   label: 'Priority',      type: 'select', options: ['All', 'High', 'Medium', 'Low'] },
  ],

  layout: {
    kpis: [
      { id: 'kpi-total',     title: 'Total Tasks',          type: 'kpi', gridSpan: 1 },
      { id: 'kpi-todo',      title: 'Todo',                type: 'kpi', gridSpan: 1 },
      { id: 'kpi-inprog',    title: 'In Progress',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-done',      title: 'Done',                type: 'kpi', gridSpan: 1 },
      { id: 'kpi-blocked',   title: 'Blocked',             type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-prog',  title: 'Avg Progress',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-high-priority', title: 'High Priority', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-overdue', title: 'Overdue Tasks', type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-task-status',
        type: 'chart',
        title: 'Task Status Distribution',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'statusData',
        metrics: [{ label: 'Tasks', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-task-priority',
        type: 'chart',
        title: 'Task Priority Distribution',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'priorityData',
        metrics: [{ label: 'Tasks', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-task-progress',
        type: 'chart',
        title: 'Average Progress Trend (Monthly)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'trendData',
        metrics: [{ label: 'Avg Progress', dataKey: 'progress', type: 'percent' }],
      },
    ],

    tables: [
      {
        id: 'table-task-detail',
        type: 'table',
        title: 'Task List',
        dataSource: 'filteredData',
        columns: [
          { header: 'Title',      accessor: 'Title',      type: 'text',     align: 'left'   },
          { header: 'Assignee',   accessor: 'Assignee',   type: 'text',     align: 'left'   },
          { header: 'Project',    accessor: 'Project',    type: 'text',     align: 'left'   },
          { header: 'Status',     accessor: 'Status',     type: 'text',     align: 'center' },
          { header: 'Priority',   accessor: 'Priority',   type: 'badge',    align: 'center' },
          { header: 'Progress',   accessor: 'Progress',   type: 'badge',    align: 'center' },
          { header: 'Due Date',   accessor: 'DueDate',   type: 'text',     align: 'center' },
        ],
      },
    ],
  },
};
