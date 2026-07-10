import type { BIDashboardConfig } from '../../types/bi.types';

export const hrConfig: BIDashboardConfig = {
  id: 'hr',
  name: 'HR Analytics Dashboard',
  description: 'Quản trị nhân sự — Workforce Intelligence & People Analytics',
  theme: 'indigo',

  filters: [
    { id: 'startYear',      label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',        label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Phòng ban',     label: 'Phòng ban',    type: 'select' },
    { id: 'Khu vực',         label: 'Khu vực',        type: 'select' },
    { id: 'EmploymentType', label: 'Emp. Type',     type: 'select', options: ['Tất cả', 'Full-time', 'Part-time', 'Hợp đồng'] },
    { id: 'Trạng thái',         label: 'Trạng thái',        type: 'select', options: ['Tất cả', 'Active', 'On Leave', 'Resigned'] },
  ],

  layout: {
    kpis: [
      { id: 'kpi-headcount',    title: 'Total Headcount',   type: 'kpi', gridSpan: 1 },
      { id: 'kpi-hired',        title: 'New Hires',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-turnover',     title: 'Turnover Rate',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-performance',  title: 'Avg Performance',   type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-headcount-dept',
        type: 'chart', title: 'Headcount by Department',
        chartType: 'bar', gridSpan: 2, dataSource: 'deptHeadcount',
        metrics: [
          { label: 'Headcount',   dataKey: 'headcount',  color: '#6366f1', type: 'number' },
          { label: 'Lương TB',  dataKey: 'avgSalary',  color: '#10b981', type: 'currency' },
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
          { header: 'Tên',        accessor: 'FullName',         type: 'text',    align: 'left'   },
          { header: 'Phòng ban',  accessor: 'Department',       type: 'text',    align: 'left'   },
          { header: 'Position',    accessor: 'Position',         type: 'text',    align: 'left'   },
          { header: 'Khu vực',      accessor: 'Region',           type: 'text',    align: 'left'   },
          { header: 'Loại',        accessor: 'EmploymentType',   type: 'text',    align: 'center' },
          { header: 'Lương',      accessor: 'Salary',           type: 'currency',align: 'right'  },
          { header: 'Performance', accessor: 'PerformanceScore', type: 'badge',   align: 'center' },
          { header: 'Trạng thái',      accessor: 'Status',           type: 'text',    align: 'center' },
        ],
      },
    ],
  },
};
