import type { BIDashboardConfig } from '../../types/bi.types';

export const productionConfig: BIDashboardConfig = {
  id: 'production',
  name: 'Manufacturing & Production Dashboard',
  description: 'Quản trị Sản xuất — Manufacturing Operations & OEE Tracking',
  theme: 'blue',

  filters: [
    { id: 'startYear',   label: 'Start Year',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',     label: 'End Year',      type: 'date-range', defaultValue: 2026 },
    { id: 'Plant',       label: 'Plant/Factory', type: 'select' },
    { id: 'Line',        label: 'Prod. Line',    type: 'select' },
    { id: 'ProductType', label: 'Product Type',  type: 'select' },
    { id: 'Shift',       label: 'Shift',         type: 'select', options: ['All', 'Morning', 'Afternoon', 'Night'] },
  ],

  layout: {
    kpis: [
      { id: 'kpi-output',      title: 'Total Output (Actual)', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-target',      title: 'Output vs Target',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-oee',         title: 'Avg OEE (%)',           type: 'kpi', gridSpan: 1 },
      { id: 'kpi-defect',      title: 'Defect Rate',           type: 'kpi', gridSpan: 1 },
      { id: 'kpi-downtime',    title: 'Total Downtime (Hrs)',  type: 'kpi', gridSpan: 1 },
      { id: 'kpi-energy',      title: 'Energy Consumed (kWh)', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-yield',       title: 'First Pass Yield',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-shifts',      title: 'Total Shifts Run',      type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-prod-trend',
        type: 'chart',
        title: 'Production Output Trend (Monthly)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'trendData',
        metrics: [
          { label: 'Target', dataKey: 'target', color: '#94a3b8', type: 'number' },
          { label: 'Actual', dataKey: 'actual', color: '#3b82f6', type: 'number' },
        ],
      },
      {
        id: 'chart-prod-plant',
        type: 'chart',
        title: 'Output by Plant',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'plantData',
        metrics: [{ label: 'Output', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-prod-line-oee',
        type: 'chart',
        title: 'Average OEE by Line',
        chartType: 'bar',
        gridSpan: 1,
        dataSource: 'lineData',
        metrics: [
          { label: 'OEE (%)', dataKey: 'oee', color: '#10b981', type: 'percent' },
        ],
      },
    ],

    tables: [
      {
        id: 'table-prod-detail',
        type: 'table',
        title: 'Production Shift Records',
        dataSource: 'filteredData',
        columns: [
          { header: 'Date',         accessor: 'Date',         type: 'text',     align: 'left'   },
          { header: 'Plant',        accessor: 'Plant',        type: 'text',     align: 'left'   },
          { header: 'Line',         accessor: 'Line',         type: 'text',     align: 'left'   },
          { header: 'Shift',        accessor: 'Shift',        type: 'text',     align: 'center' },
          { header: 'Product',      accessor: 'ProductType',  type: 'text',     align: 'left'   },
          { header: 'Output',       accessor: 'OutputActual', type: 'number',   align: 'right'  },
          { header: 'Defects',      accessor: 'Defects',      type: 'number',   align: 'right'  },
          { header: 'OEE',          accessor: 'OEE',          type: 'badge',    align: 'center' },
        ],
      },
    ],
  },
};
