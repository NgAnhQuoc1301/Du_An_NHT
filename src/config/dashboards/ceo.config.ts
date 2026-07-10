import type { BIDashboardConfig } from '../../types/bi.types';

export const ceoConfig: BIDashboardConfig = {
  id: 'ceo',
  name: 'CEO Executive Dashboard',
  description: 'Tổng quan kinh doanh — Real-time Business Intelligence',
  theme: 'emerald',

  filters: [
    { id: 'startYear', label: 'Năm bắt đầu', type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',   label: 'Năm kết thúc',   type: 'date-range', defaultValue: 2026 },
    { id: 'Khu vực',    label: 'Khu vực',     type: 'select'   },
    { id: 'Country',   label: 'Country',    type: 'select'   },
    { id: 'Công ty',   label: 'Công ty',    type: 'select'   },
    { id: 'Phòng ban',label: 'Phòng ban', type: 'select'   },
  ],

  layout: {
    kpis: [
      { id: 'kpi-revenue',  title: 'Doanh thu',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-profit',   title: 'Profit',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-cost',     title: 'Chi phí',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-ebitda',   title: 'EBITDA',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-yoy',      title: 'YoY Growth',  type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-revenue-trend',
        type: 'chart',
        title: 'Trend Line Chart',
        chartType: 'area',
        gridSpan: 2,
        dataSource: 'revenueTrend',
        metrics: [
          { label: 'Doanh thu', dataKey: 'revenue', color: '#10b981', type: 'currency' },
          { label: 'Profit',  dataKey: 'profit',  color: '#3b82f6', type: 'currency' },
        ],
      },
      {
        id: 'chart-dept-health',
        type: 'chart',
        title: 'Enterprise Health',
        chartType: 'radar',
        gridSpan: 1,
        dataSource: 'deptHealth',
        metrics: [{ label: 'Health Score', dataKey: 'score', color: '#8b5cf6', type: 'number' }],
      },
      {
        id: 'chart-revenue-region',
        type: 'chart',
        title: 'Industry Bar Chart',
        chartType: 'bar',
        gridSpan: 1,
        dataSource: 'regionSummary',
        metrics: [
          { label: 'Doanh thu', dataKey: 'revenue', color: '#10b981', type: 'currency' },
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
          { header: 'Khu vực',     accessor: 'Region',     type: 'text',     align: 'left'  },
          { header: 'Country',    accessor: 'Country',    type: 'text',     align: 'left'  },
          { header: 'Công ty',    accessor: 'Company',    type: 'text',     align: 'left'  },
          { header: 'Dept',       accessor: 'Department', type: 'text',     align: 'left'  },
          { header: 'Doanh thu',    accessor: 'Revenue',    type: 'currency', align: 'right' },
          { header: 'Profit',     accessor: 'Profit',     type: 'currency', align: 'right' },
          { header: 'Employees',  accessor: 'Employees',  type: 'number',   align: 'right' },
          { header: 'Health',     accessor: 'Health_Score', type: 'badge',  align: 'center'},
        ],
      },
    ],
  },
};
