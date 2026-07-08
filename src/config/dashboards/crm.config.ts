import type { BIDashboardConfig } from '../../types/bi.types';

export const crmConfig: BIDashboardConfig = {
  id: 'crm',
  name: 'CRM & Pipeline Dashboard',
  description: 'Quản lý khách hàng — Sales Funnel, Lead Gen & Opportunity Tracking',
  theme: 'violet',

  filters: [
    { id: 'startYear',   label: 'Start Year',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',     label: 'End Year',      type: 'date-range', defaultValue: 2026 },
    { id: 'Region',      label: 'Region',        type: 'select' },
    { id: 'Source',      label: 'Lead Source',   type: 'select' },
    { id: 'Industry',    label: 'Industry',      type: 'select' },
    { id: 'SalesPerson', label: 'Sales Rep',     type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-leads',      title: 'Total Leads',       type: 'kpi', gridSpan: 1 },
      { id: 'kpi-won',        title: 'Won Deals',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-conversion', title: 'Win Rate',          type: 'kpi', gridSpan: 1 },
      { id: 'kpi-value',      title: 'Pipeline Value',    type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-deal',   title: 'Avg Deal Size',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-lost',       title: 'Lost Deals',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-active',     title: 'Active Opps',       type: 'kpi', gridSpan: 1 },
      { id: 'kpi-cycle',      title: 'Avg Sales Cycle',   type: 'kpi', gridSpan: 1 }, // Mock
    ],

    charts: [
      {
        id: 'chart-pipeline-funnel',
        type: 'chart',
        title: 'Sales Funnel by Stage',
        chartType: 'bar',
        gridSpan: 2,
        dataSource: 'funnelData',
        metrics: [
          { label: 'Count', dataKey: 'count', color: '#8b5cf6', type: 'number' },
        ],
      },
      {
        id: 'chart-lead-source',
        type: 'chart',
        title: 'Leads by Source',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'sourceData',
        metrics: [{ label: 'Leads', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-conversion-trend',
        type: 'chart',
        title: 'Pipeline Value by Month',
        chartType: 'line',
        gridSpan: 1,
        dataSource: 'pipelineTrend',
        metrics: [
          { label: 'Pipeline Value', dataKey: 'value', color: '#10b981', type: 'currency' },
        ],
      },
    ],

    tables: [
      {
        id: 'table-crm-detail',
        type: 'table',
        title: 'Opportunity Records',
        dataSource: 'filteredData',
        columns: [
          { header: 'Opp ID',      accessor: 'id',          type: 'text',     align: 'left'   },
          { header: 'Company',     accessor: 'Company',     type: 'text',     align: 'left'   },
          { header: 'Contact',     accessor: 'Contact',     type: 'text',     align: 'left'   },
          { header: 'Stage',       accessor: 'Stage',       type: 'badge',    align: 'center' },
          { header: 'Status',      accessor: 'Status',      type: 'text',     align: 'center' },
          { header: 'Value',       accessor: 'Value',       type: 'currency', align: 'right'  },
          { header: 'Probability', accessor: 'Probability', type: 'badge',    align: 'center' },
          { header: 'Sales Rep',   accessor: 'SalesPerson', type: 'text',     align: 'left'   },
        ],
      },
    ],
  },
};
