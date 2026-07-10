import type { BIDashboardConfig } from '../../types/bi.types';

export const projectConfig: BIDashboardConfig = {
  id: 'project',
  name: 'Báo cáo Quản lý Dự án',
  description: 'Quản lý dự án — Danh mục Dự án, Trạng thái & Theo dõi Ngân sách',
  theme: 'cyan',

  filters: [
    { id: 'startYear',  label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',    label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Department', label: 'Phòng ban',    type: 'select' },
    { id: 'Manager',    label: 'Quản lý dự án',   type: 'select' },
    { id: 'Status',     label: 'Trạng thái',        type: 'select' },
    { id: 'Priority',   label: 'Ưu tiên',      type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-total',     title: 'Tổng số Dự án',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-on-track',  title: 'Đúng tiến độ',            type: 'kpi', gridSpan: 1 },
      { id: 'kpi-delayed',   title: 'Chậm trễ',             type: 'kpi', gridSpan: 1 },
      { id: 'kpi-completed', title: 'Đã hoàn thành',           type: 'kpi', gridSpan: 1 },
      { id: 'kpi-budget',    title: 'Tổng Ngân sách',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-spent',     title: 'Đã chi tiêu',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-progress',  title: 'Tiến độ TB',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-variance',  title: 'Chênh lệch chi phí',       type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-prj-status',
        type: 'chart',
        title: 'Tổng quan Trạng thái Dự án',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'statusData',
        metrics: [{ label: 'Dự án', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-prj-budget',
        type: 'chart',
        title: 'Ngân sách vs Chi tiêu theo Phòng ban',
        chartType: 'bar',
        gridSpan: 2,
        dataSource: 'budgetData',
        metrics: [
          { label: 'Ngân sách', dataKey: 'budget', color: '#94a3b8', type: 'currency' },
          { label: 'Chi tiêu',  dataKey: 'spent',  color: '#06b6d4', type: 'currency' },
        ],
      },
      {
        id: 'chart-prj-priority',
        type: 'chart',
        title: 'Dự án theo Mức độ ưu tiên',
        chartType: 'pie', 
        gridSpan: 1,
        dataSource: 'priorityData',
        metrics: [{ label: 'Dự án', dataKey: 'value', type: 'number' }],
      },
    ],

    tables: [
      {
        id: 'table-prj-detail',
        type: 'table',
        title: 'Danh sách Dự án',
        dataSource: 'filteredData',
        columns: [
          { header: 'Tên dự án', accessor: 'ProjectName', type: 'text',     align: 'left'   },
          { header: 'Quản lý',      accessor: 'Manager',     type: 'text',     align: 'left'   },
          { header: 'Phòng ban',   accessor: 'Department',  type: 'text',     align: 'left'   },
          { header: 'Ưu tiên',     accessor: 'Priority',    type: 'badge',    align: 'center' },
          { header: 'Trạng thái',       accessor: 'Status',      type: 'text',     align: 'center' },
          { header: 'Tiến độ',     accessor: 'Progress',    type: 'badge',    align: 'center' },
          { header: 'Ngân sách',       accessor: 'Budget',      type: 'currency', align: 'right'  },
          { header: 'Chi tiêu',        accessor: 'Spent',       type: 'currency', align: 'right'  },
        ],
      },
    ],
  },
};
