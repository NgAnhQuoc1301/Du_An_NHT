import type { BIDashboardConfig } from '../../types/bi.types';

export const salesConfig: BIDashboardConfig = {
  id: 'sales',
  name: 'Sales Performance Dashboard',
  description: 'Phân tích doanh số — Sales Intelligence & Pipeline Tracking',
  theme: 'blue',

  filters: [
    { id: 'startYear',  label: 'Năm bắt đầu', type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',    label: 'Năm kết thúc',   type: 'date-range', defaultValue: 2026 },
    { id: 'Khu vực',     label: 'Khu vực',     type: 'select' },
    { id: 'Channel',    label: 'Channel',    type: 'select', options: ['Tất cả', 'Online', 'Offline', 'Partner'] },
    { id: 'Danh mục',   label: 'Danh mục',   type: 'select', options: ['Tất cả', 'Điện tử', 'Home Appliance', 'Phụ kiện', 'Khác'] },
    { id: 'Nhân viên bán hàng',label: 'Sales Rep',  type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-revenue',      title: 'Doanh thu',             type: 'kpi', gridSpan: 1 },
      { id: 'kpi-profit',       title: 'Profit',              type: 'kpi', gridSpan: 1 },
      { id: 'kpi-conversion',   title: 'Conversion Rate',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-achievement',  title: 'Đạt MT',     type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-sales-funnel',
        type: 'chart',
        title: 'Sales Funnel Chart',
        chartType: 'funnel',
        gridSpan: 1,
        dataSource: 'salesFunnel',
        metrics: [{ label: 'Giá trị', dataKey: 'value' }],
      },
      {
        id: 'chart-revenue-trend',
        type: 'chart',
        title: 'Revenue vs Target',
        chartType: 'composed',
        gridSpan: 2,
        dataSource: 'revenueTrend',
        metrics: [
          { label: 'Doanh thu', dataKey: 'revenue', color: '#3b82f6', type: 'currency' },
          { label: 'Mục tiêu',  dataKey: 'target',  color: '#f59e0b', type: 'currency' },
        ],
      },
      {
        id: 'chart-region-bar',
        type: 'chart',
        title: 'Regional Bar Chart',
        chartType: 'bar',
        gridSpan: 1,
        dataSource: 'regionSummary',
        metrics: [
          { label: 'Doanh thu', dataKey: 'revenue', color: '#8b5cf6', type: 'currency' },
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
          { header: 'Khu vực',      accessor: 'Region',          type: 'text',     align: 'left'   },
          { header: 'Sales Rep',   accessor: 'SalesPerson',     type: 'text',     align: 'left'   },
          { header: 'Channel',     accessor: 'Channel',         type: 'text',     align: 'left'   },
          { header: 'Danh mục',    accessor: 'Category',        type: 'text',     align: 'left'   },
          { header: 'Sản phẩm',     accessor: 'Product',         type: 'text',     align: 'left'   },
          { header: 'Doanh thu',     accessor: 'Revenue',         type: 'currency', align: 'right'  },
          { header: 'Profit',      accessor: 'Profit',          type: 'currency', align: 'right'  },
          { header: 'Orders',      accessor: 'Orders',          type: 'number',   align: 'right'  },
          { header: 'Achievement', accessor: 'AchievementRate', type: 'badge',    align: 'center' },
        ],
      },
    ],
  },
};
