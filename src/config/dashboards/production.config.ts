import type { BIDashboardConfig } from '../../types/bi.types';

export const productionConfig: BIDashboardConfig = {
  id: 'production',
  name: 'Báo cáo Sản xuất & Chế tạo',
  description: 'Quản trị Sản xuất — Theo dõi Hoạt động Sản xuất & OEE',
  theme: 'blue',

  filters: [
    { id: 'startYear',   label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',     label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Plant',       label: 'Nhà máy', type: 'select' },
    { id: 'Line',        label: 'Dây chuyền',    type: 'select' },
    { id: 'ProductType', label: 'Loại sản phẩm',  type: 'select' },
    { id: 'Shift',       label: 'Ca làm việc',         type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-output',      title: 'Tổng Sản lượng', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-target',      title: 'Thực tế vs Mục tiêu',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-oee',         title: 'OEE trung bình (%)',           type: 'kpi', gridSpan: 1 },
      { id: 'kpi-defect',      title: 'Tỷ lệ Lỗi',           type: 'kpi', gridSpan: 1 },
      { id: 'kpi-downtime',    title: 'Thời gian chết (Giờ)',  type: 'kpi', gridSpan: 1 },
      { id: 'kpi-energy',      title: 'Tiêu thụ Năng lượng', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-yield',       title: 'Tỷ lệ đạt Lần 1',      type: 'kpi', gridSpan: 1 },
      { id: 'kpi-shifts',      title: 'Tổng số Ca',      type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-prod-trend',
        type: 'chart',
        title: 'Xu hướng Sản lượng (Tháng)',
        chartType: 'line',
        gridSpan: 2,
        dataSource: 'trendData',
        metrics: [
          { label: 'Mục tiêu', dataKey: 'target', color: '#94a3b8', type: 'number' },
          { label: 'Thực tế', dataKey: 'actual', color: '#3b82f6', type: 'number' },
        ],
      },
      {
        id: 'chart-prod-plant',
        type: 'chart',
        title: 'Sản lượng theo Nhà máy',
        chartType: 'pie',
        gridSpan: 1,
        dataSource: 'plantData',
        metrics: [{ label: 'Sản lượng', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-prod-line-oee',
        type: 'chart',
        title: 'OEE Trung bình theo Dây chuyền',
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
        title: 'Dữ liệu Sản xuất theo Ca',
        dataSource: 'filteredData',
        columns: [
          { header: 'Ngày',         accessor: 'Date',         type: 'text',     align: 'left'   },
          { header: 'Nhà máy',        accessor: 'Plant',        type: 'text',     align: 'left'   },
          { header: 'Dây chuyền',         accessor: 'Line',         type: 'text',     align: 'left'   },
          { header: 'Ca',        accessor: 'Shift',        type: 'text',     align: 'center' },
          { header: 'Sản phẩm',      accessor: 'ProductType',  type: 'text',     align: 'left'   },
          { header: 'Sản lượng',       accessor: 'OutputActual', type: 'number',   align: 'right'  },
          { header: 'Lỗi',      accessor: 'Defects',      type: 'number',   align: 'right'  },
          { header: 'OEE',          accessor: 'OEE',          type: 'badge',    align: 'center' },
        ],
      },
    ],
  },
};
