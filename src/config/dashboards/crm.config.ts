import type { BIDashboardConfig } from '../../types/bi.types';

export const crmConfig: BIDashboardConfig = {
  id: 'crm',
  name: 'Báo cáo CRM & Cơ hội',
  description: 'Quản lý khách hàng — Phễu bán hàng, Tiềm năng & Theo dõi Cơ hội',
  theme: 'violet',

  filters: [
    { id: 'startYear',   label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',     label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Region',      label: 'Khu vực',        type: 'select' },
    { id: 'Source',      label: 'Nguồn khách hàng',   type: 'select' },
    { id: 'Industry',    label: 'Ngành nghề',      type: 'select' },
    { id: 'SalesPerson', label: 'Nhân viên KD',     type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-leads',      title: 'Tổng KH tiềm năng',       type: 'kpi', gridSpan: 1 },
      { id: 'kpi-won',        title: 'Đã chốt',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-conversion', title: 'Tỷ lệ chốt',          type: 'kpi', gridSpan: 1 },
      { id: 'kpi-value',      title: 'Giá trị Cơ hội',    type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-deal',   title: 'Quy mô Deal TB',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-lost',       title: 'Deal thất bại',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-active',     title: 'Cơ hội đang mở',       type: 'kpi', gridSpan: 1 },
      { id: 'kpi-cycle',      title: 'Chu kỳ bán hàng',   type: 'kpi', gridSpan: 1 }, // Mock
    ],

    charts: [
      {
        id: 'chart-pipeline-funnel',
        type: 'chart',
        title: 'Phễu bán hàng theo Giai đoạn',
        chartType: 'bar',
        gridSpan: 2,
        dataSource: 'funnelData',
        metrics: [
          { label: 'Số lượng', dataKey: 'count', color: '#8b5cf6', type: 'number' },
        ],
      },
      {
        id: 'chart-lead-source',
        type: 'chart',
        title: 'KH Tiềm năng theo Nguồn',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'sourceData',
        metrics: [{ label: 'Khách hàng', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-conversion-trend',
        type: 'chart',
        title: 'Giá trị Cơ hội theo Tháng',
        chartType: 'line',
        gridSpan: 1,
        dataSource: 'pipelineTrend',
        metrics: [
          { label: 'Giá trị Cơ hội', dataKey: 'value', color: '#10b981', type: 'currency' },
        ],
      },
    ],

    tables: [
      {
        id: 'table-crm-detail',
        type: 'table',
        title: 'Dữ liệu Cơ hội Bán hàng',
        dataSource: 'filteredData',
        columns: [
          { header: 'Mã cơ hội',      accessor: 'id',          type: 'text',     align: 'left'   },
          { header: 'Công ty',     accessor: 'Company',     type: 'text',     align: 'left'   },
          { header: 'Liên hệ',     accessor: 'Contact',     type: 'text',     align: 'left'   },
          { header: 'Giai đoạn',       accessor: 'Stage',       type: 'badge',    align: 'center' },
          { header: 'Trạng thái',      accessor: 'Status',      type: 'text',     align: 'center' },
          { header: 'Giá trị',       accessor: 'Value',       type: 'currency', align: 'right'  },
          { header: 'Xác suất', accessor: 'Probability', type: 'badge',    align: 'center' },
          { header: 'Nhân viên KD',   accessor: 'SalesPerson', type: 'text',     align: 'left'   },
        ],
      },
    ],
  },
};
