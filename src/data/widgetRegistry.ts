import type { WidgetConfig } from "../types/widget";

export const salesWidgets: WidgetConfig[] = [
  {
    id: "revenue",
    type: "kpi",
    title: "Revenue",
    value: "$120,000",
    width: 3,
  },

  {
    id: "profit",
    type: "kpi",
    title: "Profit",
    value: "$35,000",
    width: 3,
  },

  {
    id: "margin",
    type: "kpi",
    title: "Margin",
    value: "29%",
    width: 3,
  },

  {
    id: "top-products",
    type: "table",
    title: "Top Products",
    width: 6,
  },

  {
    id: "sales-trend",
    type: "line-chart",
    title: "Sales Trend",
    width: 6,

    dataSource: "salesRevenueTrendData",
  },
];

export const crmWidgets: WidgetConfig[] = [
  {
    id: "leads",
    type: "kpi",
    title: "Leads",
    value: "1,250",
    width: 3,
  },

  {
    id: "customers",
    type: "kpi",
    title: "Customers",
    value: "280",
    width: 3,
  },

  {
    id: "conversion",
    type: "line-chart",
    title: "Conversion Rate",
    width: 6,
  },
];

export const hrWidgets: WidgetConfig[] = [
  {
    id: "employees",
    type: "kpi",
    title: "Employees",
    value: "250",
    width: 3,
  },

  {
    id: "attendance",
    type: "line-chart",
    title: "Attendance",
    width: 6,
  },
];
export const ceoWidgets: WidgetConfig[] = [
  {
    id: "total-revenue",
    type: "kpi",
    title: "Total Revenue",
    value: "$2.4M",
    width: 3,
  },
  {
    id: "profit",
    type: "kpi",
    title: "Profit",
    value: "$650K",
    width: 3,
  },
  {
    id: "ceo-trend",
    type: "line-chart",
    title: "Business Growth",
    width: 6,
  },
];

export const financeWidgets: WidgetConfig[] = [
  {
    id: "cashflow",
    type: "kpi",
    title: "Cash Flow",
    value: "$850K",
    width: 3,
  },
  {
    id: "expenses",
    type: "kpi",
    title: "Expenses",
    value: "$120K",
    width: 3,
  },
  {
    id: "finance-trend",
    type: "line-chart",
    title: "Finance Trend",
    width: 6,
  },
];

export const projectWidgets: WidgetConfig[] = [
  {
    id: "projects",
    type: "kpi",
    title: "Projects",
    value: "18",
    width: 3,
  },
  {
    id: "completed",
    type: "kpi",
    title: "Completed",
    value: "12",
    width: 3,
  },
  {
    id: "project-chart",
    type: "line-chart",
    title: "Project Progress",
    width: 6,
  },
];
export const kpiWidgets: WidgetConfig[] = [
  {
    id: "overall-kpi",
    type: "kpi",
    title: "Overall KPI",
    value: "92%",
    width: 3,
  },

  {
    id: "target-achievement",
    type: "kpi",
    title: "Target Achievement",
    value: "88%",
    width: 3,
  },

  {
    id: "kpi-trend",
    type: "line-chart",
    title: "KPI Trend",
    width: 6,
  },
];

export const warehouseWidgets: WidgetConfig[] = [
  {
    id: "inventory",
    type: "kpi",
    title: "Inventory",
    value: "12,500",
    width: 3,
  },

  {
    id: "stock-value",
    type: "kpi",
    title: "Stock Value",
    value: "$450K",
    width: 3,
  },

  {
    id: "warehouse-chart",
    type: "line-chart",
    title: "Inventory Movement",
    width: 6,
  },
];

export const warrantyWidgets: WidgetConfig[] = [
  {
    id: "warranty-cases",
    type: "kpi",
    title: "Warranty Cases",
    value: "235",
    width: 3,
  },

  {
    id: "resolved-cases",
    type: "kpi",
    title: "Resolved Cases",
    value: "198",
    width: 3,
  },

  {
    id: "warranty-chart",
    type: "line-chart",
    title: "Warranty Trend",
    width: 6,
  },
];

export const productionWidgets: WidgetConfig[] = [
  {
    id: "production-volume",
    type: "kpi",
    title: "Production Volume",
    value: "18,000",
    width: 3,
  },

  {
    id: "defect-rate",
    type: "kpi",
    title: "Defect Rate",
    value: "1.2%",
    width: 3,
  },

  {
    id: "production-chart",
    type: "line-chart",
    title: "Production Output",
    width: 6,
  },
];

export const workflowWidgets: WidgetConfig[] = [
  {
    id: "active-workflows",
    type: "kpi",
    title: "Active Workflows",
    value: "48",
    width: 3,
  },

  {
    id: "completed-workflows",
    type: "kpi",
    title: "Completed",
    value: "1,250",
    width: 3,
  },

  {
    id: "workflow-chart",
    type: "line-chart",
    title: "Workflow Performance",
    width: 6,
  },
];

export const taskWidgets: WidgetConfig[] = [
  {
    id: "total-tasks",
    type: "kpi",
    title: "Total Tasks",
    value: "420",
    width: 3,
  },

  {
    id: "completed-tasks",
    type: "kpi",
    title: "Completed Tasks",
    value: "365",
    width: 3,
  },

  {
    id: "task-chart",
    type: "line-chart",
    title: "Task Completion Trend",
    width: 6,
  },
];