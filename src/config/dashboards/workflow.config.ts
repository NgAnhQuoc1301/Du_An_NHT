import type { BIDashboardConfig } from '../../types/bi.types';

export const workflowConfig: BIDashboardConfig = {
  id: 'workflow-dashboard',
  name: 'Workflow & Processes',
  description: 'Monitor business processes, approvals, and bottlenecks',
  filters: [
    { id: 'startYear', label: 'Start Year', type: 'date-range', defaultValue: 2024 },
    { id: 'endYear', label: 'End Year', type: 'date-range', defaultValue: 2026 },
    {
      id: 'Department',
      label: 'Department',
      type: 'select',
      options: ['All', 'HR', 'Finance', 'Operations', 'IT', 'Sales'],
      defaultValue: 'All',
    },
    {
      id: 'ProcessName',
      label: 'Process',
      type: 'select',
      options: ['All', 'Onboarding', 'Purchase Request', 'Leave Request', 'Budget Approval', 'Contract Review'],
      defaultValue: 'All',
    },
    {
      id: 'Status',
      label: 'Status',
      type: 'select',
      options: ['All', 'Draft', 'In Review', 'Approved', 'Rejected', 'Completed'],
      defaultValue: 'All',
    },
    {
      id: 'Priority',
      label: 'Priority',
      type: 'select',
      options: ['All', 'High', 'Medium', 'Low'],
      defaultValue: 'All',
    }
  ],
  layout: {
    kpis: [
      { id: 'kpi-total', title: 'Total Workflows', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-active', title: 'Active (In Review)', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-completed', title: 'Completed', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-bottleneck', title: 'High Priority Active', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-avg-steps', title: 'Avg Steps per Process', type: 'kpi', gridSpan: 1 },
      { id: 'kpi-completion-rate', title: 'Completion Rate', type: 'kpi', gridSpan: 1 },
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
          { accessor: 'ProcessName', header: 'Process', type: 'text', align: 'left' },
          { accessor: 'Department', header: 'Department', type: 'text', align: 'left' },
          { accessor: 'Initiator', header: 'Initiator', type: 'text', align: 'left' },
          { accessor: 'Status', header: 'Status', type: 'text', align: 'center' },
          { accessor: 'Priority', header: 'Priority', type: 'text', align: 'center' },
          { accessor: 'StartDate', header: 'Start Date', type: 'text', align: 'left' },
          { accessor: 'Progress', header: 'Progress', type: 'badge', align: 'center' },
        ],
        pageSize: 10,
      }
    ]
  }
};
