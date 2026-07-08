import type { BIDashboardConfig } from '../../types/bi.types';

export const warehouseConfig: BIDashboardConfig = {
  id: 'warehouse-dashboard',
  name: 'Warehouse Management',
  description: 'Inventory tracking, stock levels, and warehouse operations',
  filters: [
    { id: 'startYear', label: 'Start Year', type: 'date-range', defaultValue: 2024 },
    { id: 'endYear', label: 'End Year', type: 'date-range', defaultValue: 2026 },
    {
      id: 'Category',
      label: 'Category',
      type: 'select',
      options: ['All', 'Electronics', 'Appliances', 'Food', 'Clothing', 'Other'],
      defaultValue: 'All',
    },
    {
      id: 'Location',
      label: 'Location',
      type: 'select',
      options: ['All', 'Zone A', 'Zone B', 'Zone C', 'Zone D'],
      defaultValue: 'All',
    },
    {
      id: 'Status',
      label: 'Status',
      type: 'select',
      options: ['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Overstock'],
      defaultValue: 'All',
    },
    {
      id: 'Supplier',
      label: 'Supplier',
      type: 'select',
      options: ['All', 'TechCorp', 'GlobalGoods', 'PrimeSupplies', 'MegaMart', 'QualityVendors'],
      defaultValue: 'All',
    }
  ],
  layout: {
    kpis: [
      { id: 'kpi-total-items', title: 'Total Items (SKUs)', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-stock-value', title: 'Stock Value', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-turnover', title: 'Turnover Rate', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-low-stock', title: 'Low Stock Alerts', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-total-capacity', title: 'Total Capacity', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-active-orders', title: 'Active Orders', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-cost', title: 'Avg Unit Cost', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-categories', title: 'Total Categories', type: 'kpi', gridSpan: 1 },
    ],
    charts: [
      {
        id: 'chart-status',
        title: 'Inventory Status Distribution',
        type: 'chart',
        chartType: 'pie',
        dataSource: 'statusData',
        gridSpan: 1,
        metrics: [{ label: 'Items', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-category',
        title: 'Stock by Category',
        type: 'chart',
        chartType: 'bar',
        dataSource: 'categoryData',
        gridSpan: 1,
        metrics: [{ label: 'Stock Qty', dataKey: 'value', color: '#3b82f6', type: 'number' }],
      },
      {
        id: 'chart-trend',
        title: 'Restock Trend (Monthly)',
        type: 'chart',
        chartType: 'line',
        dataSource: 'trendData',
        gridSpan: 2,
        metrics: [{ label: 'Restock Qty', dataKey: 'restock', type: 'number' }],
      }
    ],
    tables: [
      {
        id: 'table-warehouse-details',
        title: 'Inventory Details',
        type: 'table',
        dataSource: 'filteredData',
        columns: [
          { accessor: 'SKU', header: 'SKU', type: 'text', align: 'left' },
          { accessor: 'ProductName', header: 'Product Name', type: 'text', align: 'left' },
          { accessor: 'Category', header: 'Category', type: 'text', align: 'left' },
          { accessor: 'Location', header: 'Location', type: 'text', align: 'left' },
          { accessor: 'Status', header: 'Status', type: 'text', align: 'center' },
          { accessor: 'Stock', header: 'Stock Qty', type: 'number', align: 'center' },
          { accessor: 'UnitCost', header: 'Unit Cost', type: 'currency', align: 'right' },
        ],
        pageSize: 10,
      }
    ]
  }
};
