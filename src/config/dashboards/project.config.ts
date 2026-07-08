import type { BIDashboardConfig } from '../../types/bi.types';

export const projectConfig: BIDashboardConfig = {
  id: 'project',
  name: 'Project Management Dashboard',
  description: 'Quản lý dự án — Project Portfolio, Status & Budget Tracking',
  theme: 'cyan',

  filters: [
    { id: 'startYear',  label: 'Start Year',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',    label: 'End Year',      type: 'date-range', defaultValue: 2026 },
    { id: 'Department', label: 'Department',    type: 'select' },
    { id: 'Manager',    label: 'Project Mgr',   type: 'select' },
    { id: 'Status',     label: 'Status',        type: 'select', options: ['All', 'On Track', 'At Risk', 'Delayed', 'Completed'] },
    { id: 'Priority',   label: 'Priority',      type: 'select', options: ['All', 'High', 'Medium', 'Low'] },
  ],

  layout: {
    kpis: [
      { id: 'kpi-total',     title: 'Total Projects',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-on-track',  title: 'On Track',            type: 'kpi', gridSpan: 1 },
      { id: 'kpi-delayed',   title: 'Delayed',             type: 'kpi', gridSpan: 1 },
      { id: 'kpi-completed', title: 'Completed',           type: 'kpi', gridSpan: 1 },
      { id: 'kpi-budget',    title: 'Total Budget',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-spent',     title: 'Total Spent',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-progress',  title: 'Avg Progress',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-variance',  title: 'Cost Variance',       type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-prj-status',
        type: 'chart',
        title: 'Project Status Overview',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'statusData',
        metrics: [{ label: 'Projects', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-prj-budget',
        type: 'chart',
        title: 'Budget vs Spent by Department',
        chartType: 'bar',
        gridSpan: 2,
        dataSource: 'budgetData',
        metrics: [
          { label: 'Budget', dataKey: 'budget', color: '#94a3b8', type: 'currency' },
          { label: 'Spent',  dataKey: 'spent',  color: '#06b6d4', type: 'currency' },
        ],
      },
      {
        id: 'chart-prj-priority',
        type: 'chart',
        title: 'Projects by Priority',
        chartType: 'pie', // Actually, maybe bar or donut? We only have pie.
        gridSpan: 1,
        dataSource: 'priorityData',
        metrics: [{ label: 'Projects', dataKey: 'value', type: 'number' }],
      },
    ],

    tables: [
      {
        id: 'table-prj-detail',
        type: 'table',
        title: 'Project Portfolio List',
        dataSource: 'filteredData',
        columns: [
          { header: 'Project Name', accessor: 'ProjectName', type: 'text',     align: 'left'   },
          { header: 'Manager',      accessor: 'Manager',     type: 'text',     align: 'left'   },
          { header: 'Department',   accessor: 'Department',  type: 'text',     align: 'left'   },
          { header: 'Priority',     accessor: 'Priority',    type: 'badge',    align: 'center' },
          { header: 'Status',       accessor: 'Status',      type: 'text',     align: 'center' },
          { header: 'Progress',     accessor: 'Progress',    type: 'badge',    align: 'center' },
          { header: 'Budget',       accessor: 'Budget',      type: 'currency', align: 'right'  },
          { header: 'Spent',        accessor: 'Spent',       type: 'currency', align: 'right'  },
        ],
      },
    ],
  },
};
