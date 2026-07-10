import type { BIDashboardConfig } from '../../types/bi.types';

export const kpiConfig: BIDashboardConfig = {
  id: 'kpi',
  name: 'Báo cáo Chỉ số Doanh nghiệp (KPI)',
  description: 'Quản trị hiệu suất — Chỉ số Đo lường Hiệu suất Chính & OKRs',
  theme: 'amber',

  filters: [
    { id: 'startYear',   label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',     label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Department',  label: 'Phòng ban',    type: 'select' },
    { id: 'Category',    label: 'Danh mục',      type: 'select' },
    { id: 'Status',      label: 'Trạng thái',        type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-total',     title: 'Tổng số KPI',          type: 'kpi', gridSpan: 1 },
      { id: 'kpi-on-track',  title: 'KPI Đúng tiến độ',       type: 'kpi', gridSpan: 1 },
      { id: 'kpi-at-risk',   title: 'KPI Rủi ro',        type: 'kpi', gridSpan: 1 },
      { id: 'kpi-behind',    title: 'KPI Chậm trễ',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-achv',  title: 'Tỷ lệ đạt TB',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-sales',     title: 'Mức đạt Bán hàng',   type: 'kpi', gridSpan: 1 },
      { id: 'kpi-finance',   title: 'Mức đạt Tài chính', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-ops',       title: 'Mức đạt Vận hành',     type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-kpi-status',
        type: 'chart',
        title: 'Phân bổ Trạng thái KPI',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'statusData',
        metrics: [{ label: 'Số lượng KPI', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-kpi-dept',
        type: 'chart',
        title: 'Tỷ lệ Đạt trung bình theo Phòng ban',
        chartType: 'bar',
        gridSpan: 1,
        dataSource: 'deptData',
        metrics: [
          { label: 'Mức đạt (%)', dataKey: 'achievement', color: '#f59e0b', type: 'percent' },
        ],
      },
      {
        id: 'chart-kpi-trend',
        type: 'chart',
        title: 'Xu hướng Đạt KPI (Tháng)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'trendData',
        metrics: [
          { label: 'Mức đạt TB (%)', dataKey: 'achievement', color: '#10b981', type: 'percent' },
        ],
      },
    ],

    tables: [
      {
        id: 'table-kpi-detail',
        type: 'table',
        title: 'Dữ liệu KPI Chi tiết',
        dataSource: 'filteredData',
        columns: [
          { header: 'Kỳ',      accessor: 'Month',       type: 'text',     align: 'left'   },
          { header: 'Phòng ban',  accessor: 'Department',  type: 'text',     align: 'left'   },
          { header: 'Chỉ số',      accessor: 'MetricName',  type: 'text',     align: 'left'   },
          { header: 'Thực tế',      accessor: 'Actual',      type: 'number',   align: 'right'  },
          { header: 'Mục tiêu',      accessor: 'Target',      type: 'number',   align: 'right'  },
          { header: 'Mức đạt', accessor: 'Achievement', type: 'badge',    align: 'center' },
          { header: 'Trạng thái',      accessor: 'Status',      type: 'text',     align: 'center' },
        ],
      },
    ],
  },
};
