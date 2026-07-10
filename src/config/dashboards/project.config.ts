import type { BIDashboardConfig } from '../../types/bi.types';

export const projectConfig: BIDashboardConfig = {
  id: 'project',
  name: 'Project Management Dashboard',
  description: 'Quản lý dự án — Project Portfolio, Status & Budget Tracking',
  theme: 'cyan',

  filters: [
    { id: 'startYear',  label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',    label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Phòng ban', label: 'Phòng ban',    type: 'select' },
    { id: 'Quản lý',    label: 'Project Mgr',   type: 'select' },
    { id: 'Trạng thái',     label: 'Trạng thái',        type: 'select', options: ['Tất cả', 'Đúng tiến độ', 'Rủi ro', 'Chậm trễ', 'Đã Xong'] },
    { id: 'Ưu tiên',   label: 'Ưu tiên',      type: 'select', options: ['Tất cả', 'Cao', 'Trung bình', 'Thấp'] },
  ],

  layout: {
    kpis: [
      { id: 'kpi-total',     title: 'Total Projects',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-on-track',  title: 'Đúng tiến độ',            type: 'kpi', gridSpan: 1 },
      { id: 'kpi-delayed',   title: 'Chậm trễ',             type: 'kpi', gridSpan: 1 },
      { id: 'kpi-completed', title: 'Đã Xong',           type: 'kpi', gridSpan: 1 },
      { id: 'kpi-budget',    title: 'Tổng Ngân sách',        type: 'kpi', gridSpan: 1 },
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
          { label: 'Ngân sách', dataKey: 'budget', color: '#94a3b8', type: 'currency' },
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
          { header: 'Quản lý',      accessor: 'Manager',     type: 'text',     align: 'left'   },
          { header: 'Phòng ban',   accessor: 'Department',  type: 'text',     align: 'left'   },
          { header: 'Ưu tiên',     accessor: 'Priority',    type: 'badge',    align: 'center' },
          { header: 'Trạng thái',       accessor: 'Status',      type: 'text',     align: 'center' },
          { header: 'Tiến độ',     accessor: 'Progress',    type: 'badge',    align: 'center' },
          { header: 'Ngân sách',       accessor: 'Budget',      type: 'currency', align: 'right'  },
          { header: 'Spent',        accessor: 'Spent',       type: 'currency', align: 'right'  },
        ],
      },
    ],
  },
};
