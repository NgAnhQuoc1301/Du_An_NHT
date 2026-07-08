import type { BIDashboardConfig } from '../../types/bi.types';

export const salesConfig: BIDashboardConfig = {
  id: 'sales',
  name: 'Sales Performance Dashboard',
  description: 'Phân tích doanh số — Sales Intelligence & Pipeline Tracking',
  theme: 'blue',

  filters: [
    { id: 'startYear',  label: 'Start Year', type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',    label: 'End Year',   type: 'date-range', defaultValue: 2026 },
    { id: 'Region',     label: 'Region',     type: 'select' },
    { id: 'Channel',    label: 'Channel',    type: 'select', options: ['All', 'Online', 'Offline', 'Partner'] },
    { id: 'Category',   label: 'Category',   type: 'select', options: ['All', 'Electronics', 'Home Appliance', 'Accessories', 'Other'] },
    { id: 'SalesPerson',label: 'Sales Rep',  type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-revenue',      title: 'Total Revenue',       type: 'kpi', gridSpan: 1 },
      { id: 'kpi-profit',       title: 'Total Profit',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-orders',       title: 'Total Orders',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-customers',    title: 'Total Customers',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-order',    title: 'Avg Order Value',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-margin',       title: 'Profit Margin',       type: 'kpi', gridSpan: 1 },
      { id: 'kpi-conversion',   title: 'Conversion Rate',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-achievement',  title: 'Target Achievement',  type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-revenue-trend',
        type: 'chart',
        title: 'Revenue Trend (Monthly)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'revenueTrend',
        metrics: [
          { label: 'Revenue', dataKey: 'revenue', color: '#3b82f6', type: 'currency' },
          { label: 'Profit',  dataKey: 'profit',  color: '#10b981', type: 'currency' },
          { label: 'Target',  dataKey: 'target',  color: '#f59e0b', type: 'currency' },
        ],
      },
      {
        id: 'chart-channel-mix',
        type: 'chart',
        title: 'Revenue by Channel',
        chartType: 'pie',
        gridSpan: 2,
        dataSource: 'channelMix',
        metrics: [{ label: 'Revenue', dataKey: 'value', type: 'currency' }],
      },
      {
        id: 'chart-category-bar',
        type: 'chart',
        title: 'Revenue by Category',
        chartType: 'bar',
        gridSpan: 2,
        dataSource: 'categorySummary',
        metrics: [
          { label: 'Revenue', dataKey: 'revenue', color: '#3b82f6', type: 'currency' },
          { label: 'Profit',  dataKey: 'profit',  color: '#10b981', type: 'currency' },
        ],
      },
      {
        id: 'chart-region-bar',
        type: 'chart',
        title: 'Revenue by Region',
        chartType: 'bar',
        gridSpan: 2,
        dataSource: 'regionSummary',
        metrics: [
          { label: 'Revenue', dataKey: 'revenue', color: '#8b5cf6', type: 'currency' },
          { label: 'Orders',  dataKey: 'orders',  color: '#f59e0b', type: 'number' },
        ],
      },
    ],

    tables: [
      {
        id: 'table-sales-detail',
        type: 'table',
        title: 'Sales Detail Records',
        dataSource: 'filteredData',
        columns: [
          { header: 'Region',      accessor: 'Region',          type: 'text',     align: 'left'   },
          { header: 'Sales Rep',   accessor: 'SalesPerson',     type: 'text',     align: 'left'   },
          { header: 'Channel',     accessor: 'Channel',         type: 'text',     align: 'left'   },
          { header: 'Category',    accessor: 'Category',        type: 'text',     align: 'left'   },
          { header: 'Product',     accessor: 'Product',         type: 'text',     align: 'left'   },
          { header: 'Revenue',     accessor: 'Revenue',         type: 'currency', align: 'right'  },
          { header: 'Profit',      accessor: 'Profit',          type: 'currency', align: 'right'  },
          { header: 'Orders',      accessor: 'Orders',          type: 'number',   align: 'right'  },
          { header: 'Achievement', accessor: 'AchievementRate', type: 'badge',    align: 'center' },
        ],
      },
    ],
  },
};
