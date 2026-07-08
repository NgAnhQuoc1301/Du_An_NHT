import type { BIDashboardConfig } from '../../types/bi.types';

export const ceoConfig: BIDashboardConfig = {
  id: 'ceo',
  name: 'CEO Executive Dashboard',
  description: 'Tổng quan kinh doanh — Real-time Business Intelligence',
  theme: 'emerald',

  filters: [
    { id: 'startYear', label: 'Start Year', type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',   label: 'End Year',   type: 'date-range', defaultValue: 2026 },
    { id: 'Region',    label: 'Region',     type: 'select'   },
    { id: 'Country',   label: 'Country',    type: 'select'   },
    { id: 'Company',   label: 'Company',    type: 'select'   },
    { id: 'Department',label: 'Department', type: 'select'   },
  ],

  layout: {
    kpis: [
      { id: 'kpi-revenue',  title: 'Total Revenue',  type: 'kpi', gridSpan: 1 },
      { id: 'kpi-cost',     title: 'Total Cost',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-profit',   title: 'Net Profit',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-margin',   title: 'Avg Margin',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-ebitda',   title: 'EBITDA',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-yoy',      title: 'YoY Growth',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-emp',      title: 'Employees',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-cust',     title: 'Customers',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-active',   title: 'Active Projects',type: 'kpi', gridSpan: 1 },
      { id: 'kpi-done',     title: 'Completed',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-fail',     title: 'Failed',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-health',   title: 'Health Score',   type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-revenue-trend',
        type: 'chart',
        title: 'Revenue Trend (Quarterly)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'revenueTrend',
        metrics: [
          { label: 'Revenue', dataKey: 'revenue', color: '#10b981', type: 'currency' },
          { label: 'Profit',  dataKey: 'profit',  color: '#3b82f6', type: 'currency' },
        ],
      },
      {
        id: 'chart-project-status',
        type: 'chart',
        title: 'Project Status Distribution',
        chartType: 'pie',
        gridSpan: 2,
        dataSource: 'projectStatus',
        metrics: [{ label: 'Count', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-dept-health',
        type: 'chart',
        title: 'Department Health Score',
        chartType: 'radar',
        gridSpan: 2,
        dataSource: 'deptHealth',
        metrics: [{ label: 'Health Score', dataKey: 'score', color: '#8b5cf6', type: 'number' }],
      },
      {
        id: 'chart-revenue-region',
        type: 'chart',
        title: 'Revenue by Region',
        chartType: 'bar',
        gridSpan: 2,
        dataSource: 'regionSummary',
        metrics: [
          { label: 'Revenue', dataKey: 'revenue', color: '#10b981', type: 'currency' },
          { label: 'Profit',  dataKey: 'profit',  color: '#3b82f6', type: 'currency' },
        ],
      },
    ],

    tables: [
      {
        id: 'table-detail',
        type: 'table',
        title: 'Detail Records',
        dataSource: 'filteredData',
        columns: [
          { header: 'Region',     accessor: 'Region',     type: 'text',     align: 'left'  },
          { header: 'Country',    accessor: 'Country',    type: 'text',     align: 'left'  },
          { header: 'Company',    accessor: 'Company',    type: 'text',     align: 'left'  },
          { header: 'Dept',       accessor: 'Department', type: 'text',     align: 'left'  },
          { header: 'Revenue',    accessor: 'Revenue',    type: 'currency', align: 'right' },
          { header: 'Profit',     accessor: 'Profit',     type: 'currency', align: 'right' },
          { header: 'Employees',  accessor: 'Employees',  type: 'number',   align: 'right' },
          { header: 'Health',     accessor: 'Health_Score', type: 'badge',  align: 'center'},
        ],
      },
    ],
  },
};
