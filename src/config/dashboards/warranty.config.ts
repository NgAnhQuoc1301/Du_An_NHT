import type { BIDashboardConfig } from '../../types/bi.types';

export const warrantyConfig: BIDashboardConfig = {
  id: 'warranty-dashboard',
  name: 'Warranty & Support',
  description: 'Track warranty claims, support tickets, and resolution metrics',
  filters: [
    { id: 'startYear', label: 'Start Year', type: 'date-range', defaultValue: 2024 },
    { id: 'endYear', label: 'End Year', type: 'date-range', defaultValue: 2026 },
    {
      id: 'Category',
      label: 'Category',
      type: 'select',
      options: ['All', 'Electronics', 'Appliances', 'Accessories', 'Other'],
      defaultValue: 'All',
    },
    {
      id: 'Status',
      label: 'Status',
      type: 'select',
      options: ['All', 'Pending', 'Processing', 'Resolved', 'Rejected'],
      defaultValue: 'All',
    },
    {
      id: 'Priority',
      label: 'Priority',
      type: 'select',
      options: ['All', 'High', 'Medium', 'Low'],
      defaultValue: 'All',
    }
  ],
  layout: {
    kpis: [
      { id: 'kpi-total-requests', title: 'Total Requests', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-pending', title: 'Pending', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-resolved', title: 'Resolved', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-cost', title: 'Avg Cost', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-resolution-time', title: 'Avg Res Time', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-resolution-rate', title: 'Resolution Rate', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-high-priority', title: 'High Priority', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-unique-products', title: 'Unique Products', type: 'kpi', gridSpan: 1 },
    ],
    charts: [
      {
        id: 'chart-status',
        title: 'Request Status',
        type: 'chart',
        chartType: 'pie',
        dataSource: 'statusData',
        gridSpan: 1,
        metrics: [{ label: 'Requests', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-priority',
        title: 'Priority Distribution',
        type: 'chart',
        chartType: 'bar',
        dataSource: 'priorityData',
        gridSpan: 1,
        metrics: [{ label: 'Requests', dataKey: 'value', color: '#f59e0b', type: 'number' }],
      },
      {
        id: 'chart-trend',
        title: 'Request Trend (Monthly)',
        type: 'chart',
        chartType: 'line',
        dataSource: 'trendData',
        gridSpan: 2,
        metrics: [{ label: 'Requests', dataKey: 'count', type: 'number' }],
      }
    ],
    tables: [
      {
        id: 'table-warranty-details',
        title: 'Warranty Requests',
        type: 'table',
        dataSource: 'filteredData',
        columns: [
          { accessor: 'id', header: 'Request ID', type: 'text', align: 'left' },
          { accessor: 'Customer', header: 'Customer', type: 'text', align: 'left' },
          { accessor: 'Product', header: 'Product', type: 'text', align: 'left' },
          { accessor: 'Category', header: 'Category', type: 'text', align: 'left' },
          { accessor: 'Issue', header: 'Issue', type: 'text', align: 'left' },
          { accessor: 'Status', header: 'Status', type: 'text', align: 'center' },
          { accessor: 'Priority', header: 'Priority', type: 'text', align: 'center' },
          { accessor: 'RequestDate', header: 'Date', type: 'text', align: 'left' },
        ],
        pageSize: 10,
      }
    ]
  }
};
