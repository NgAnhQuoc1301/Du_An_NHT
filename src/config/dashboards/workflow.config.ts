import type { BIDashboardConfig } from '../../types/bi.types';

export const workflowConfig: BIDashboardConfig = {
  id: 'workflow-dashboard',
  name: 'Quy trình & Phê duyệt',
  description: 'Theo dõi quy trình kinh doanh, phê duyệt và tắc nghẽn',
  theme: 'violet',

  filters: [
    { id: 'startYear', label: 'Năm bắt đầu', type: 'date-range', defaultValue: 2025 },
    { id: 'endYear', label: 'Năm kết thúc', type: 'date-range', defaultValue: 2026 },
    {
      id: 'Department',
      label: 'Phòng ban',
      type: 'select',
      defaultValue: 'Tất cả',
    },
    {
      id: 'ProcessName',
      label: 'Quy trình',
      type: 'select',
      defaultValue: 'Tất cả',
    },
    {
      id: 'Status',
      label: 'Trạng thái',
      type: 'select',
      defaultValue: 'Tất cả',
    },
    {
      id: 'Priority',
      label: 'Ưu tiên',
      type: 'select',
      defaultValue: 'Tất cả',
    }
  ],
  layout: {
    kpis: [
      { id: 'kpi-total', title: 'Tổng Quy trình', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-active', title: 'Đang xử lý', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-completed', title: 'Đã hoàn thành', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-bottleneck', title: 'Ưu tiên Cao (Đang xử lý)', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-steps', title: 'Số bước TB / Quy trình', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-completion-rate', title: 'Tỉ lệ hoàn thành', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-delayed', title: 'Quy trình Chậm trễ', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-progress', title: 'Tiến độ TB', type: 'kpi', gridSpan: 1 },
    ],
    charts: [
      {
        id: 'chart-status',
        title: 'Trạng thái Quy trình',
        type: 'chart',
        chartType: 'pie',
        dataSource: 'statusData',
        gridSpan: 1,
        metrics: [{ label: 'Số lượng', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-dept',
        title: 'Quy trình theo Phòng ban',
        type: 'chart',
        chartType: 'bar',
        dataSource: 'deptData',
        gridSpan: 1,
        metrics: [{ label: 'Quy trình', dataKey: 'value', color: '#10b981', type: 'number' }],
      },
      {
        id: 'chart-trend',
        title: 'Xu hướng Quy trình (Tháng)',
        type: 'chart',
        chartType: 'line',
        dataSource: 'trendData',
        gridSpan: 2,
        metrics: [{ label: 'Quy trình', dataKey: 'count', type: 'number' }],
      }
    ],
    tables: [
      {
        id: 'table-workflow-details',
        title: 'Chi tiết Quy trình',
        type: 'table',
        dataSource: 'filteredData',
        columns: [
          { accessor: 'id', header: 'Mã QT', type: 'text', align: 'left' },
          { accessor: 'ProcessName', header: 'Quy trình', type: 'text', align: 'left' },
          { accessor: 'Department', header: 'Phòng ban', type: 'text', align: 'left' },
          { accessor: 'Initiator', header: 'Người khởi tạo', type: 'text', align: 'left' },
          { accessor: 'Status', header: 'Trạng thái', type: 'text', align: 'center' },
          { accessor: 'Priority', header: 'Ưu tiên', type: 'text', align: 'center' },
          { accessor: 'StartDate', header: 'Ngày bắt đầu', type: 'text', align: 'left' },
          { accessor: 'Progress', header: 'Tiến độ', type: 'badge', align: 'center' },
        ],
      }
    ]
  }
};
