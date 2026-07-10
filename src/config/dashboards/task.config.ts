import type { BIDashboardConfig } from '../../types/bi.types';

export const taskConfig: BIDashboardConfig = {
  id: 'task',
  name: 'Dashboard Quản lý Công việc',
  description: 'Theo dõi tiến độ, trạng thái & mức độ ưu tiên của công việc',
  theme: 'indigo',

  filters: [
    { id: 'startYear',  label: 'Năm bắt đầu',   type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',    label: 'Năm kết thúc',  type: 'date-range', defaultValue: 2026 },
    { id: 'Assignee',   label: 'Người phụ trách',type: 'select' },
    { id: 'Project',    label: 'Dự án',         type: 'select' },
    { id: 'Status',     label: 'Trạng thái',    type: 'select', options: ['Tất cả', 'Chưa làm', 'Đang làm', 'Hoàn thành', 'Bị chặn'] },
    { id: 'Priority',   label: 'Ưu tiên',       type: 'select', options: ['Tất cả', 'Cao', 'Trung bình', 'Thấp'] },
  ],

  layout: {
    kpis: [
      { id: 'kpi-total',     title: 'Tổng số Task',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-todo',      title: 'Chưa làm',             type: 'kpi', gridSpan: 1 },
      { id: 'kpi-inprog',    title: 'Đang làm',             type: 'kpi', gridSpan: 1 },
      { id: 'kpi-done',      title: 'Hoàn thành',           type: 'kpi', gridSpan: 1 },
      { id: 'kpi-blocked',   title: 'Bị chặn',              type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-prog',  title: 'Tiến độ TB',           type: 'kpi', gridSpan: 1 },
      { id: 'kpi-high-priority', title: 'Ưu tiên Cao',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-overdue', title: 'Quá hạn',                type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-task-status',
        type: 'chart',
        title: 'Phân bổ Trạng thái',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'statusData',
        metrics: [{ label: 'Số lượng', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-task-priority',
        type: 'chart',
        title: 'Phân bổ Mức độ Ưu tiên',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'priorityData',
        metrics: [{ label: 'Số lượng', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-task-progress',
        type: 'chart',
        title: 'Xu hướng Tiến độ Trung bình (Theo tháng)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'trendData',
        metrics: [{ label: 'Tiến độ TB', dataKey: 'progress', type: 'percent' }],
      },
    ],

    tables: [
      {
        id: 'table-task-detail',
        type: 'table',
        title: 'Danh sách Công việc',
        dataSource: 'filteredData',
        columns: [
          { header: 'Tiêu đề',       accessor: 'Title',      type: 'text',     align: 'left'   },
          { header: 'Người phụ trách',accessor: 'Assignee',   type: 'text',     align: 'left'   },
          { header: 'Dự án',         accessor: 'Project',    type: 'text',     align: 'left'   },
          { header: 'Trạng thái',    accessor: 'Status',     type: 'text',     align: 'center' },
          { header: 'Ưu tiên',       accessor: 'Priority',   type: 'badge',    align: 'center' },
          { header: 'Tiến độ',       accessor: 'Progress',   type: 'badge',    align: 'center' },
          { header: 'Hạn chót',      accessor: 'DueDate',    type: 'text',     align: 'center' },
        ],
      },
    ],
  },
};
