import type { BIDashboardConfig } from '../../types/bi.types';

export const hrConfig: BIDashboardConfig = {
  id: 'hr',
  name: 'Báo cáo Phân tích Nhân sự',
  description: 'Quản trị nhân sự — Phân tích Nguồn nhân lực',
  theme: 'indigo',

  filters: [
    { id: 'startYear',      label: 'Năm bắt đầu',    type: 'date-range', defaultValue: 2025 },
    { id: 'endYear',        label: 'Năm kết thúc',      type: 'date-range', defaultValue: 2026 },
    { id: 'Department',     label: 'Phòng ban',    type: 'select' },
    { id: 'Region',         label: 'Khu vực',        type: 'select' },
    { id: 'EmploymentType', label: 'Loại hợp đồng',     type: 'select' },
    { id: 'Status',         label: 'Trạng thái',        type: 'select' },
  ],

  layout: {
    kpis: [
      { id: 'kpi-headcount',    title: 'Tổng nhân sự',   type: 'kpi', gridSpan: 1 },
      { id: 'kpi-hired',        title: 'Tuyển mới',         type: 'kpi', gridSpan: 1 },
      { id: 'kpi-turnover',     title: 'Tỷ lệ nghỉ việc',     type: 'kpi', gridSpan: 1 },
      { id: 'kpi-performance',  title: 'Hiệu suất TB',   type: 'kpi', gridSpan: 1 },
    ],

    charts: [
      {
        id: 'chart-headcount-dept',
        type: 'chart', title: 'Nhân sự theo Phòng ban',
        chartType: 'bar', gridSpan: 2, dataSource: 'deptHeadcount',
        metrics: [
          { label: 'Nhân sự',   dataKey: 'headcount',  color: '#6366f1', type: 'number' },
          { label: 'Lương TB',  dataKey: 'avgSalary',  color: '#10b981', type: 'currency' },
        ],
      },
      {
        id: 'chart-emp-type',
        type: 'chart', title: 'Cơ cấu Hợp đồng',
        chartType: 'pie', gridSpan: 2, dataSource: 'empTypeMix',
        metrics: [{ label: 'Số lượng', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-hiring-trend',
        type: 'chart', title: 'Xu hướng Tuyển dụng (Quý)',
        chartType: 'line', gridSpan: 2, dataSource: 'hiringTrend',
        metrics: [
          { label: 'Tuyển mới',    dataKey: 'hired',    color: '#10b981', type: 'number' },
          { label: 'Đã nghỉ việc', dataKey: 'resigned', color: '#ef4444', type: 'number' },
        ],
      },
      {
        id: 'chart-performance-dept',
        type: 'chart', title: 'Điểm Hiệu suất theo Phòng ban',
        chartType: 'radar', gridSpan: 2, dataSource: 'deptPerformance',
        metrics: [{ label: 'Hiệu suất', dataKey: 'score', color: '#6366f1', type: 'number' }],
      },
    ],

    tables: [
      {
        id: 'table-hr-detail',
        type: 'table', title: 'Hồ sơ Nhân viên',
        dataSource: 'filteredData',
        columns: [
          { header: 'Họ và tên',        accessor: 'FullName',         type: 'text',    align: 'left'   },
          { header: 'Phòng ban',  accessor: 'Department',       type: 'text',    align: 'left'   },
          { header: 'Vị trí',    accessor: 'Position',         type: 'text',    align: 'left'   },
          { header: 'Khu vực',      accessor: 'Region',           type: 'text',    align: 'left'   },
          { header: 'Hợp đồng',        accessor: 'EmploymentType',   type: 'text',    align: 'center' },
          { header: 'Lương',      accessor: 'Salary',           type: 'currency',align: 'right'  },
          { header: 'Hiệu suất', accessor: 'PerformanceScore', type: 'badge',   align: 'center' },
          { header: 'Trạng thái',      accessor: 'Status',           type: 'text',    align: 'center' },
        ],
      },
    ],
  },
};
