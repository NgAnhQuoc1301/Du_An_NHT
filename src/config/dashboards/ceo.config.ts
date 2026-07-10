import type { BIDashboardConfig } from '../../types/bi.types';

export const ceoConfig: BIDashboardConfig = {
  id: 'ceo',
  name: 'Báo cáo Giám đốc điều hành (CEO)',
  description: 'Tổng quan kinh doanh — Trí tuệ doanh nghiệp thời gian thực',
  theme: 'emerald',

  filters: [
    { id: 'startYear', label: 'Năm bắt đầu', type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',   label: 'Năm kết thúc',   type: 'date-range', defaultValue: 2026 },
    { id: 'Region',    label: 'Khu vực',     type: 'select'   },
    { id: 'Country',   label: 'Quốc gia',    type: 'select'   },
    { id: 'Company',   label: 'Công ty',    type: 'select'   },
    { id: 'Department',label: 'Phòng ban', type: 'select'   },
  ],

  layout: {
    kpis: [
      { id: 'kpi-revenue',  title: 'Doanh thu',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-profit',   title: 'Lợi nhuận',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-cost',     title: 'Chi phí',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-ebitda',   title: 'EBITDA',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-yoy',      title: 'Tăng trưởng (YoY)',  type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-revenue-trend',
        type: 'chart',
        title: 'Biểu đồ Xu hướng',
        chartType: 'area',
        gridSpan: 2,
        dataSource: 'revenueTrend',
        metrics: [
          { label: 'Doanh thu', dataKey: 'revenue', color: '#10b981', type: 'currency' },
          { label: 'Lợi nhuận',  dataKey: 'profit',  color: '#3b82f6', type: 'currency' },
        ],
      },
      {
        id: 'chart-dept-health',
        type: 'chart',
        title: 'Sức khỏe doanh nghiệp',
        chartType: 'radar',
        gridSpan: 1,
        dataSource: 'deptHealth',
        metrics: [{ label: 'Điểm sức khỏe', dataKey: 'score', color: '#8b5cf6', type: 'number' }],
      },
      {
        id: 'chart-revenue-region',
        type: 'chart',
        title: 'Biểu đồ Ngành nghề',
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
        title: 'Dữ liệu chi tiết',
        dataSource: 'filteredData',
        columns: [
          { header: 'Khu vực',     accessor: 'Region',     type: 'text',     align: 'left'  },
          { header: 'Quốc gia',    accessor: 'Country',    type: 'text',     align: 'left'  },
          { header: 'Công ty',    accessor: 'Company',    type: 'text',     align: 'left'  },
          { header: 'Phòng ban',       accessor: 'Department', type: 'text',     align: 'left'  },
          { header: 'Doanh thu',    accessor: 'Revenue',    type: 'currency', align: 'right' },
          { header: 'Lợi nhuận',     accessor: 'Profit',     type: 'currency', align: 'right' },
          { header: 'Nhân sự',  accessor: 'Employees',  type: 'number',   align: 'right' },
          { header: 'Sức khỏe',     accessor: 'Health_Score', type: 'badge',  align: 'center'},
        ],
      },
    ],
  },
};
