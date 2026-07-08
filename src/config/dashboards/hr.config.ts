import type { BIDashboardConfig } from '../../types/bi.types';

export const hrConfig: BIDashboardConfig = {
  id: 'hr',
  name: 'HR Analytics Dashboard',
  description: 'Quản trị nhân sự — Workforce Intelligence & People Analytics',
  theme: 'indigo',

  filters: [
    { id: 'startYear',      label: 'Start Year',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',        label: 'End Year',      type: 'date-range', defaultValue: 2026 },
    { id: 'Department',     label: 'Department',    type: 'select' },
    { id: 'Region',         label: 'Region',        type: 'select' },
    { id: 'EmploymentType', label: 'Emp. Type',     type: 'select', options: ['All', 'Full-time', 'Part-time', 'Contract'] },
    { id: 'Status',         label: 'Status',        type: 'select', options: ['All', 'Active', 'On Leave', 'Resigned'] },
  ],

  layout: {
    kpis: [
      { id: 'kpi-headcount',    title: 'Total Headcount',   type: 'kpi' },
      { id: 'kpi-hired',        title: 'New Hires',         type: 'kpi' },
      { id: 'kpi-resigned',     title: 'Resignations',      type: 'kpi' },
      { id: 'kpi-turnover',     title: 'Turnover Rate',     type: 'kpi' },
      { id: 'kpi-salary',       title: 'Total Salary Cost', type: 'kpi' },
      { id: 'kpi-bonus',        title: 'Total Bonus',       type: 'kpi' },
      { id: 'kpi-performance',  title: 'Avg Performance',   type: 'kpi' },
      { id: 'kpi-satisfaction', title: 'Avg Satisfaction',  type: 'kpi' },
    ],

    charts: [
      {
        id: 'chart-headcount-dept',
        type: 'chart', title: 'Headcount by Department',
        chartType: 'bar', gridSpan: 2, dataSource: 'deptHeadcount',
        metrics: [
          { label: 'Headcount',   dataKey: 'headcount',  color: '#6366f1', type: 'number' },
          { label: 'Avg Salary',  dataKey: 'avgSalary',  color: '#10b981', type: 'currency' },
        ],
      },
      {
        id: 'chart-emp-type',
        type: 'chart', title: 'Employment Type Mix',
        chartType: 'pie', gridSpan: 2, dataSource: 'empTypeMix',
        metrics: [{ label: 'Count', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-hiring-trend',
        type: 'chart', title: 'Hiring Trend (Quarterly)',
        chartType: 'line', gridSpan: 2, dataSource: 'hiringTrend',
        metrics: [
          { label: 'Hired',    dataKey: 'hired',    color: '#10b981', type: 'number' },
          { label: 'Resigned', dataKey: 'resigned', color: '#ef4444', type: 'number' },
        ],
      },
      {
        id: 'chart-performance-dept',
        type: 'chart', title: 'Performance Score by Department',
        chartType: 'radar', gridSpan: 2, dataSource: 'deptPerformance',
        metrics: [{ label: 'Performance', dataKey: 'score', color: '#6366f1', type: 'number' }],
      },
    ],

    tables: [
      {
        id: 'table-hr-detail',
        type: 'table', title: 'Employee Records',
        dataSource: 'filteredData',
        columns: [
          { header: 'Name',        accessor: 'FullName',         type: 'text',    align: 'left'   },
          { header: 'Department',  accessor: 'Department',       type: 'text',    align: 'left'   },
          { header: 'Position',    accessor: 'Position',         type: 'text',    align: 'left'   },
          { header: 'Region',      accessor: 'Region',           type: 'text',    align: 'left'   },
          { header: 'Type',        accessor: 'EmploymentType',   type: 'text',    align: 'center' },
          { header: 'Salary',      accessor: 'Salary',           type: 'currency',align: 'right'  },
          { header: 'Performance', accessor: 'PerformanceScore', type: 'badge',   align: 'center' },
          { header: 'Status',      accessor: 'Status',           type: 'text',    align: 'center' },
        ],
      },
    ],
  },
};
