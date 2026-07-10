import type { BIDashboardConfig } from '../../types/bi.types';

export const workflowConfig: BIDashboardConfig = {
  id: 'workflow-dashboard',
  name: 'Workflow & Processes',
  description: 'Monitor business processes, approvals, and bottlenecks',
  filters: [
    { id: 'startYear', label: 'Năm bắt đầu', type: 'date-range', defaultValue: 2024 },
    { id: 'endYear', label: 'Năm kết thúc', type: 'date-range', defaultValue: 2026 },
    {
      id: 'Phòng ban',
      label: 'Phòng ban',
      type: 'select',
      options: ['Tất cả', 'HR', 'Tài chính', 'Vận hành', 'CNTT', 'Bán hàng'],
      defaultValue: 'Tất cả',
    },
    {
      id: 'ProcessName',
      label: 'Quy trình',
      type: 'select',
      options: ['Tất cả', 'Tiếp nhận', 'Purchase Request', 'Leave Request', 'Budget Approval', 'Contract Review'],
      defaultValue: 'Tất cả',
    },
    {
      id: 'Trạng thái',
      label: 'Trạng thái',
      type: 'select',
      options: ['Tất cả', 'Draft', 'In Review', 'Approved', 'Đã từ chối', 'Đã Xong'],
      defaultValue: 'Tất cả',
    },
    {
      id: 'Ưu tiên',
      label: 'Ưu tiên',
      type: 'select',
      options: ['Tất cả', 'Cao', 'Trung bình', 'Thấp'],
      defaultValue: 'Tất cả',
    }
  ],
  layout: {
    kpis: [
      { id: 'kpi-total', title: 'Tổng Quy trình', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-active', title: 'Active (In Review)', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-completed', title: 'Đã Xong', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-bottleneck', title: 'High Priority Active', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-steps', title: 'Avg Steps per Process', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-completion-rate', title: 'Tỉ lệ hoàn thành', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-delayed', title: 'Delayed Workflows', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-progress', title: 'Avg Progress', type: 'kpi', gridSpan: 1 },
    ],
    charts: [
      {
        id: 'chart-status',
        title: 'Workflow Status',
        type: 'chart',
        chartType: 'pie',
        dataSource: 'statusData',
        gridSpan: 1,
        metrics: [{ label: 'Workflows', dataKey: 'value', type: 'number' }],
      },
      {
        id: 'chart-dept',
        title: 'Workflows by Department',
        type: 'chart',
        chartType: 'bar',
        dataSource: 'deptData',
        gridSpan: 1,
        metrics: [{ label: 'Workflows', dataKey: 'value', color: '#10b981', type: 'number' }],
      },
      {
        id: 'chart-trend',
        title: 'Workflow Trend (Monthly)',
        type: 'chart',
        chartType: 'line',
        dataSource: 'trendData',
        gridSpan: 2,
        metrics: [{ label: 'Workflows', dataKey: 'count', type: 'number' }],
      }
    ],
    tables: [
      {
        id: 'table-workflow-details',
        title: 'Process Details',
        type: 'table',
        dataSource: 'filteredData',
        columns: [
          { accessor: 'id', header: 'ID', type: 'text', align: 'left' },
          { accessor: 'ProcessName', header: 'Quy trình', type: 'text', align: 'left' },
          { accessor: 'Department', header: 'Phòng ban', type: 'text', align: 'left' },
          { accessor: 'Initiator', header: 'Initiator', type: 'text', align: 'left' },
          { accessor: 'Status', header: 'Trạng thái', type: 'text', align: 'center' },
          { accessor: 'Priority', header: 'Ưu tiên', type: 'text', align: 'center' },
          { accessor: 'StartDate', header: 'Start Date', type: 'text', align: 'left' },
          { accessor: 'Progress', header: 'Tiến độ', type: 'badge', align: 'center' },
        ],
      }
    ]
  }
};
