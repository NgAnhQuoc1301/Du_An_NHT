import type { BIDashboardConfig } from '../../types/bi.types';

export const warehouseConfig: BIDashboardConfig = {
  id: 'warehouse-dashboard',
  name: 'Warehouse Management',
  description: 'Inventory tracking, stock levels, and warehouse operations',
  filters: [
    { id: 'startYear', label: 'Năm bắt đầu', type: 'date-range', defaultValue: 2024 },
    { id: 'endYear', label: 'Năm kết thúc', type: 'date-range', defaultValue: 2026 },
    {
      id: 'Danh mục',
      label: 'Danh mục',
      type: 'select',
      options: ['Tất cả', 'Điện tử', 'Gia dụng', 'Food', 'Clothing', 'Khác'],
      defaultValue: 'Tất cả',
    },
    {
      id: 'Location',
      label: 'Location',
      type: 'select',
      options: ['Tất cả', 'Zone A', 'Zone B', 'Zone C', 'Zone D'],
      defaultValue: 'Tất cả',
    },
    {
      id: 'Trạng thái',
      label: 'Trạng thái',
      type: 'select',
      options: ['Tất cả', 'Còn hàng', 'Sắp hết', 'Hết hàng', 'Overstock'],
      defaultValue: 'Tất cả',
    },
    {
      id: 'Supplier',
      label: 'Supplier',
      type: 'select',
      options: ['Tất cả', 'TechCorp', 'GlobalGoods', 'PrimeSupplies', 'MegaMart', 'QualityVendors'],
      defaultValue: 'Tất cả',
    }
  ],
  layout: {
    kpis: [
      { id: 'kpi-total-items', title: 'Total Items (SKUs)', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-stock-value', title: 'Stock Value', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-turnover', title: 'Turnover Rate', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-low-stock', title: 'Low Stock Alerts', type: 'kpi', gridSpan: 1 },
    ],
    charts: [
      {
        id: 'chart-stock-levels',
        title: 'Inventory vs Reorder Point',
        type: 'chart',
        chartType: 'composed',
        dataSource: 'stockLevels',
        gridSpan: 2,
        metrics: [
          { label: 'Stock', dataKey: 'stock', color: '#3b82f6', type: 'number' },
          { label: 'Min Stock', dataKey: 'minStock', color: '#ef4444', type: 'number' },
        ],
      },
      {
        id: 'chart-turnover',
        title: 'Turnover Rate vs Stock Value',
        type: 'chart',
        chartType: 'scatter',
        dataSource: 'turnoverData',
        gridSpan: 2,
        metrics: [
          { label: 'Turnover', dataKey: 'turnover', color: '#10b981', type: 'number' },
          { label: 'Stock Value', dataKey: 'stockValue', color: '#8b5cf6', type: 'currency' },
        ],
      }
    ],
    tables: [
      {
        id: 'table-warehouse-details',
        title: 'Inventory Details',
        type: 'table',
        dataSource: 'filteredData',
        columns: [
          { accessor: 'SKU', header: 'Mã SP', type: 'text', align: 'left' },
          { accessor: 'ProductName', header: 'Product Name', type: 'text', align: 'left' },
          { accessor: 'Category', header: 'Danh mục', type: 'text', align: 'left' },
          { accessor: 'Location', header: 'Location', type: 'text', align: 'left' },
          { accessor: 'Status', header: 'Trạng thái', type: 'text', align: 'center' },
          { accessor: 'Stock', header: 'Stock Qty', type: 'number', align: 'center' },
          { accessor: 'UnitCost', header: 'Unit Cost', type: 'currency', align: 'right' },
        ],
      }
    ]
  }
};
