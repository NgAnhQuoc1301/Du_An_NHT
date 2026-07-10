import type { BIDashboardConfig } from '../../types/bi.types';

export const salesConfig: BIDashboardConfig = {
  id: 'sales',
  name: 'Báo cáo Hiệu suất Bán hàng',
  description: 'Phân tích doanh số — Năng suất Bán hàng & Theo dõi Cơ hội',
  theme: 'blue',

  filters: [
    { id: 'startYear',  label: 'Năm bắt đầu', type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',    label: 'Năm kết thúc',   type: 'date-range', defaultValue: 2026 },
    { id: 'Region',     label: 'Khu vực',     type: 'select' },
    { id: 'Channel',    label: 'Kênh bán hàng',    type: 'select' },
    { id: 'Category',   label: 'Danh mục',   type: 'select' },
    { id: 'SalesPerson',label: 'Nhân viên KD',  type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-revenue',      title: 'Doanh thu',             type: 'kpi', gridSpan: 1 },
      { id: 'kpi-profit',       title: 'Lợi nhuận',              type: 'kpi', gridSpan: 1 },
      { id: 'kpi-conversion',   title: 'Tỷ lệ chuyển đổi',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-achievement',  title: 'Tỷ lệ đạt mục tiêu',     type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-sales-funnel',
        type: 'chart',
        title: 'Phễu Bán hàng',
        chartType: 'funnel',
        gridSpan: 1,
        dataSource: 'salesFunnel',
        metrics: [{ label: 'Giá trị', dataKey: 'value' }],
      },
      {
        id: 'chart-revenue-trend',
        type: 'chart',
        title: 'Doanh thu vs Mục tiêu',
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
        title: 'Doanh thu theo Khu vực',
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
        title: 'Dữ liệu Bán hàng Chi tiết',
        dataSource: 'filteredData',
        columns: [
          { header: 'Khu vực',      accessor: 'Region',          type: 'text',     align: 'left'   },
          { header: 'Nhân viên KD',   accessor: 'SalesPerson',     type: 'text',     align: 'left'   },
          { header: 'Kênh',     accessor: 'Channel',         type: 'text',     align: 'left'   },
          { header: 'Danh mục',    accessor: 'Category',        type: 'text',     align: 'left'   },
          { header: 'Sản phẩm',     accessor: 'Product',         type: 'text',     align: 'left'   },
          { header: 'Doanh thu',     accessor: 'Revenue',         type: 'currency', align: 'right'  },
          { header: 'Lợi nhuận',      accessor: 'Profit',          type: 'currency', align: 'right'  },
          { header: 'Số đơn hàng',      accessor: 'Orders',          type: 'number',   align: 'right'  },
          { header: 'Mức đạt', accessor: 'AchievementRate', type: 'badge',    align: 'center' },
        ],
      },
    ],
  },
};
