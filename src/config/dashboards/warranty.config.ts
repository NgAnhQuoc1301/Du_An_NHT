import type { BIDashboardConfig } from '../../types/bi.types';

export const warrantyConfig: BIDashboardConfig = {
  id: 'warranty-dashboard',
  name: 'Bảo hành & Hỗ trợ',
  description: 'Theo dõi yêu cầu bảo hành, thẻ hỗ trợ và chỉ số giải quyết',
  filters: [
    { id: 'startYear', label: 'Năm bắt đầu', type: 'date-range', defaultValue: 2024 },
    { id: 'endYear', label: 'Năm kết thúc', type: 'date-range', defaultValue: 2026 },
    {
      id: 'Danh mục',
      label: 'Danh mục',
      type: 'select',
      options: ['Tất cả', 'Điện tử', 'Gia dụng', 'Phụ kiện', 'Khác'],
      defaultValue: 'Tất cả',
    },
    {
      id: 'Trạng thái',
      label: 'Trạng thái',
      type: 'select',
      options: ['Tất cả', 'Chờ xử lý', 'Đang xử lý', 'Đã giải quyết', 'Đã từ chối'],
      defaultValue: 'Tất cả',
    },
    {
      id: 'Ưu tiên',
      label: 'Ưu tiên',
      type: 'select',
      options: ['Tất cả', 'Cao', 'Trung bình', 'Thấp'],
      defaultValue: 'Tất cả',
    }
  ],
  layout: {
    kpis: [
      { id: 'kpi-total-requests', title: 'Tổng Yêu cầu', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-pending', title: 'Chờ xử lý', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-resolved', title: 'Đã giải quyết', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-cost', title: 'Chi phí TB', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-resolution-time', title: 'Thời gian xử lý TB', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-resolution-rate', title: 'Tỷ lệ giải quyết', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-high-priority', title: 'Ưu tiên Cao', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-unique-products', title: 'Sản phẩm Unique', type: 'kpi', gridSpan: 1 },
    ],
    charts: [
      {
        id: 'chart-status',
        title: 'Trạng thái Yêu cầu',
        type: 'chart',
        chartType: 'pie',
        dataSource: 'statusData',
        gridSpan: 1,
        metrics: [{ label: 'Yêu cầu', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-priority',
        title: 'Phân bổ Ưu tiên',
        type: 'chart',
        chartType: 'bar',
        dataSource: 'priorityData',
        gridSpan: 1,
        metrics: [{ label: 'Yêu cầu', dataKey: 'value', color: '#f59e0b', type: 'number' }],
      },
      {
        id: 'chart-trend',
        title: 'Request Trend (Monthly)',
        type: 'chart',
        chartType: 'line',
        dataSource: 'trendData',
        gridSpan: 2,
        metrics: [{ label: 'Yêu cầu', dataKey: 'count', type: 'number' }],
      }
    ],
    tables: [
      {
        id: 'table-warranty-details',
        title: 'Yêu cầu Bảo hành',
        type: 'table',
        dataSource: 'filteredData',
        columns: [
          { accessor: 'id', header: 'Request ID', type: 'text', align: 'left' },
          { accessor: 'Customer', header: 'Khách hàng', type: 'text', align: 'left' },
          { accessor: 'Product', header: 'Sản phẩm', type: 'text', align: 'left' },
          { accessor: 'Category', header: 'Danh mục', type: 'text', align: 'left' },
          { accessor: 'Issue', header: 'Vấn đề', type: 'text', align: 'left' },
          { accessor: 'Status', header: 'Trạng thái', type: 'text', align: 'center' },
          { accessor: 'Priority', header: 'Ưu tiên', type: 'text', align: 'center' },
          { accessor: 'RequestDate', header: 'Ngày', type: 'text', align: 'left' },
        ],
      }
    ]
  }
};
