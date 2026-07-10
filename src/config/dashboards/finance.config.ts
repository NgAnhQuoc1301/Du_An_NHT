import type { BIDashboardConfig } from '../../types/bi.types';

export const financeConfig: BIDashboardConfig = {
  id: 'finance',
  name: 'Finance & Accounting Dashboard',
  description: 'Quản trị tài chính — Financial Performance & Budget Tracking',
  theme: 'emerald',

  filters: [
    { id: 'startYear',   label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',     label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Phòng ban',  label: 'Phòng ban',    type: 'select' },
    { id: 'AccountType', label: 'Account Type',  type: 'select', options: ['Tất cả', 'Doanh thu', 'Chi phí'] },
    { id: 'Danh mục',    label: 'Danh mục',      type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-revenue',    title: 'Tổng Doanh thu',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-expense',    title: 'Total Expense',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-profit',     title: 'Lợi nhuận ròng',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-margin',     title: 'Profit Margin',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-budget-var', title: 'Budget Variance',   type: 'kpi', gridSpan: 1 },
      { id: 'kpi-roi',        title: 'Est. ROI',          type: 'kpi', gridSpan: 1 },
      { id: 'kpi-liquidity',  title: 'Liquidity Ratio',   type: 'kpi', gridSpan: 1 },
      { id: 'kpi-debt',       title: 'Debt Ratio',        type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-profit-trend',
        type: 'chart',
        title: 'Revenue & Profit Trend (Monthly)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'profitTrend',
        metrics: [
          { label: 'Doanh thu', dataKey: 'revenue', color: '#10b981', type: 'currency' },
          { label: 'Chi phí', dataKey: 'expense', color: '#ef4444', type: 'currency' },
          { label: 'Profit',  dataKey: 'profit',  color: '#3b82f6', type: 'currency' },
        ],
      },
      {
        id: 'chart-expense-breakdown',
        type: 'chart',
        title: 'Expense Breakdown by Category',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'expenseBreakdown',
        metrics: [{ label: 'Số tiền', dataKey: 'value', type: 'currency' }],
      },
      {
        id: 'chart-budget-variance',
        type: 'chart',
        title: 'Budget Variance by Department',
        chartType: 'bar',
        gridSpan: 1,
        dataSource: 'budgetVariance',
        metrics: [
          { label: 'Variance (Favorable)', dataKey: 'variance', color: '#8b5cf6', type: 'currency' },
        ],
      },
    ],

    tables: [
      {
        id: 'table-finance-detail',
        type: 'table',
        title: 'Financial Transactions / Records',
        dataSource: 'filteredData',
        columns: [
          { header: 'ID',          accessor: 'id',          type: 'text',     align: 'left'   },
          { header: 'Period',      accessor: 'Month',       type: 'text',     align: 'left'   },
          { header: 'Phòng ban',  accessor: 'Department',  type: 'text',     align: 'left'   },
          { header: 'Loại',        accessor: 'AccountType', type: 'badge',    align: 'center' },
          { header: 'Danh mục',    accessor: 'Category',    type: 'text',     align: 'left'   },
          { header: 'Số tiền',      accessor: 'Amount',      type: 'currency', align: 'right'  },
          { header: 'Ngân sách',      accessor: 'Budget',      type: 'currency', align: 'right'  },
          { header: 'Variance',    accessor: 'Variance',    type: 'currency', align: 'right'  },
        ],
      },
    ],
  },
};
