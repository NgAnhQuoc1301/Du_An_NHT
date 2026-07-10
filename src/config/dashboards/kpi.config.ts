import type { BIDashboardConfig } from '../../types/bi.types';

export const kpiConfig: BIDashboardConfig = {
  id: 'kpi',
  name: 'Corporate KPI Dashboard',
  description: 'Quản trị hiệu suất — Executive Key Performance Indicators & OKRs',
  theme: 'amber',

  filters: [
    { id: 'startYear',   label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',     label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Phòng ban',  label: 'Phòng ban',    type: 'select' },
    { id: 'Danh mục',    label: 'Danh mục',      type: 'select' },
    { id: 'Trạng thái',      label: 'Trạng thái',        type: 'select', options: ['Tất cả', 'Đúng tiến độ', 'Rủi ro', 'Behind'] },
  ],

  layout: {
    kpis: [
      { id: 'kpi-total',     title: 'Total KPIs',          type: 'kpi', gridSpan: 1 },
      { id: 'kpi-on-track',  title: 'KPIs On Track',       type: 'kpi', gridSpan: 1 },
      { id: 'kpi-at-risk',   title: 'KPIs At Risk',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-behind',    title: 'KPIs Behind',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-achv',  title: 'Avg Achievement',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-sales',     title: 'Sales Achievement',   type: 'kpi', gridSpan: 1 },
      { id: 'kpi-finance',   title: 'Finance Achievement', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-ops',       title: 'Ops Achievement',     type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-kpi-status',
        type: 'chart',
        title: 'KPI Status Distribution',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'statusData',
        metrics: [{ label: 'KPIs', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-kpi-dept',
        type: 'chart',
        title: 'Average Achievement by Department',
        chartType: 'bar',
        gridSpan: 1,
        dataSource: 'deptData',
        metrics: [
          { label: 'Achievement (%)', dataKey: 'achievement', color: '#f59e0b', type: 'percent' },
        ],
      },
      {
        id: 'chart-kpi-trend',
        type: 'chart',
        title: 'Corporate Achievement Trend (Monthly)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'trendData',
        metrics: [
          { label: 'Avg Achievement (%)', dataKey: 'achievement', color: '#10b981', type: 'percent' },
        ],
      },
    ],

    tables: [
      {
        id: 'table-kpi-detail',
        type: 'table',
        title: 'KPI Detailed Records',
        dataSource: 'filteredData',
        columns: [
          { header: 'Period',      accessor: 'Month',       type: 'text',     align: 'left'   },
          { header: 'Phòng ban',  accessor: 'Department',  type: 'text',     align: 'left'   },
          { header: 'Chỉ số',      accessor: 'MetricName',  type: 'text',     align: 'left'   },
          { header: 'Actual',      accessor: 'Actual',      type: 'number',   align: 'right'  },
          { header: 'Mục tiêu',      accessor: 'Target',      type: 'number',   align: 'right'  },
          { header: 'Achievement', accessor: 'Achievement', type: 'badge',    align: 'center' },
          { header: 'Trạng thái',      accessor: 'Status',      type: 'text',     align: 'center' },
        ],
      },
    ],
  },
};
