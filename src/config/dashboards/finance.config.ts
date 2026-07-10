import type { BIDashboardConfig } from '../../types/bi.types';

export const financeConfig: BIDashboardConfig = {
  id: 'finance',
  name: 'Báo cáo Tài chính Kế toán',
  description: 'Quản trị tài chính — Hiệu suất tài chính & Theo dõi Ngân sách',
  theme: 'emerald',

  filters: [
    { id: 'startYear',   label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',     label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Department',  label: 'Phòng ban',    type: 'select' },
    { id: 'AccountType', label: 'Loại tài khoản',  type: 'select' },
    { id: 'Category',    label: 'Danh mục',      type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-revenue',    title: 'Tổng Doanh thu',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-expense',    title: 'Tổng Chi phí',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-profit',     title: 'Lợi nhuận ròng',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-margin',     title: 'Biên lợi nhuận',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-budget-var', title: 'Chênh lệch Ngân sách',   type: 'kpi', gridSpan: 1 },
      { id: 'kpi-roi',        title: 'Ước tính ROI',          type: 'kpi', gridSpan: 1 },
      { id: 'kpi-liquidity',  title: 'Tỷ số thanh khoản',   type: 'kpi', gridSpan: 1 },
      { id: 'kpi-debt',       title: 'Tỷ lệ nợ',        type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-profit-trend',
        type: 'chart',
        title: 'Xu hướng Doanh thu & Lợi nhuận (Tháng)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'profitTrend',
        metrics: [
          { label: 'Doanh thu', dataKey: 'revenue', color: '#10b981', type: 'currency' },
          { label: 'Chi phí', dataKey: 'expense', color: '#ef4444', type: 'currency' },
          { label: 'Lợi nhuận',  dataKey: 'profit',  color: '#3b82f6', type: 'currency' },
        ],
      },
      {
        id: 'chart-category-breakdown',
        type: 'chart',
        title: 'Cơ cấu theo Danh mục',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'categoryBreakdown',
        metrics: [{ label: 'Số tiền', dataKey: 'value', type: 'currency' }],
      },
      {
        id: 'chart-budget-variance',
        type: 'chart',
        title: 'Chênh lệch Ngân sách theo Phòng ban',
        chartType: 'bar',
        gridSpan: 1,
        dataSource: 'budgetVariance',
        metrics: [
          { label: 'Chênh lệch (Tích cực)', dataKey: 'variance', color: '#8b5cf6', type: 'currency' },
        ],
      },
    ],

    tables: [
      {
        id: 'table-finance-detail',
        type: 'table',
        title: 'Giao dịch / Dữ liệu Tài chính',
        dataSource: 'filteredData',
        columns: [
          { header: 'Mã GD',          accessor: 'id',          type: 'text',     align: 'left'   },
          { header: 'Kỳ',      accessor: 'Month',       type: 'text',     align: 'left'   },
          { header: 'Phòng ban',  accessor: 'Department',  type: 'text',     align: 'left'   },
          { header: 'Loại',        accessor: 'AccountType', type: 'badge',    align: 'center' },
          { header: 'Danh mục',    accessor: 'Category',    type: 'text',     align: 'left'   },
          { header: 'Số tiền',      accessor: 'Amount',      type: 'currency', align: 'right'  },
          { header: 'Ngân sách',      accessor: 'Budget',      type: 'currency', align: 'right'  },
          { header: 'Chênh lệch',    accessor: 'Variance',    type: 'currency', align: 'right'  },
        ],
      },
    ],
  },
};
