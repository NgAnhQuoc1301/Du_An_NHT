import type { DashboardConfig } from "../types/dashboard";

export const dashboardConfigs: DashboardConfig[] = [
  {
  id: "sales",
  name: "Sales Dashboard",
  style: "style1",

  widgets: [
    {
      id: "revenue",
      type: "kpi",
      title: "Revenue"
    },

    {
      id: "profit",
      type: "kpi",
      title: "Profit"
    },

    {
      id: "margin",
      type: "kpi",
      title: "Margin"
    },

    {
      id: "top-products",
      type: "table",
      title: "Top Products"
    },
    {
       id: "sales-trend",
       type: "line-chart",
       title: "Sales Trend"
    }
  ]
}
];