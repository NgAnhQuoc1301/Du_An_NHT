import type { BIDashboardConfig } from '../../types/bi.types';

export const warehouseConfig: BIDashboardConfig = {
  id: 'warehouse-dashboard',
  name: 'Quản lý Kho hàng',
  description: 'Theo dõi Tồn kho, Mức lưu trữ và Hoạt động Kho',
  theme: 'emerald',

  filters: [
    { id: 'startYear', label: 'Năm bắt đầu', type: 'date-range', defaultValue: 2025 },
    { id: 'endYear', label: 'Năm kết thúc', type: 'date-range', defaultValue: 2026 },
    {
      id: 'Category',
      label: 'Danh mục',
      type: 'select',
      defaultValue: 'Tất cả',
    },
    {
      id: 'Location',
      label: 'Vị trí',
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
      id: 'Supplier',
      label: 'Nhà cung cấp',
      type: 'select',
      defaultValue: 'Tất cả',
    }
  ],
  layout: {
    kpis: [
      { id: 'kpi-total-items', title: 'Tổng số SKU', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-stock-value', title: 'Giá trị Tồn kho', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-turnover', title: 'Tỷ lệ Vòng quay', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-low-stock', title: 'Cảnh báo Sắp hết', type: 'kpi', gridSpan: 1 },
    ],
    charts: [
      {
        id: 'chart-stock-levels',
        title: 'Tồn kho vs Điểm đặt lại',
        type: 'chart',
        chartType: 'composed',
        dataSource: 'stockLevels',
        gridSpan: 2,
        metrics: [
          { label: 'Tồn kho', dataKey: 'stock', color: '#3b82f6', type: 'number' },
          { label: 'Tồn kho tối thiểu', dataKey: 'minStock', color: '#ef4444', type: 'number' },
        ],
      },
      {
        id: 'chart-turnover',
        title: 'Vòng quay vs Giá trị Tồn kho',
        type: 'chart',
        chartType: 'scatter',
        dataSource: 'turnoverData',
        gridSpan: 2,
        metrics: [
          { label: 'Vòng quay', dataKey: 'turnover', color: '#10b981', type: 'number' },
          { label: 'Giá trị', dataKey: 'stockValue', color: '#8b5cf6', type: 'currency' },
        ],
      }
    ],
    tables: [
      {
        id: 'table-warehouse-details',
        title: 'Chi tiết Tồn kho',
        type: 'table',
        dataSource: 'filteredData',
        columns: [
          { accessor: 'SKU', header: 'Mã SP', type: 'text', align: 'left' },
          { accessor: 'ProductName', header: 'Tên sản phẩm', type: 'text', align: 'left' },
          { accessor: 'Category', header: 'Danh mục', type: 'text', align: 'left' },
          { accessor: 'Location', header: 'Vị trí', type: 'text', align: 'left' },
          { accessor: 'Status', header: 'Trạng thái', type: 'text', align: 'center' },
          { accessor: 'Stock', header: 'S.Lượng Tồn', type: 'number', align: 'center' },
          { accessor: 'UnitCost', header: 'Đơn giá', type: 'currency', align: 'right' },
        ],
      }
    ]
  }
};
