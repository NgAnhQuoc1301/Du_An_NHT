import type { DashboardConfig } from "../types/dashboard";
import {
  salesWidgets,
  crmWidgets,
  hrWidgets,
  ceoWidgets,
  financeWidgets,
  projectWidgets,
  kpiWidgets,
  warehouseWidgets,
  warrantyWidgets,
  productionWidgets,
  workflowWidgets,
  taskWidgets,
} from "./widgetRegistry";
export const dashboardConfigs: DashboardConfig[] = [
  {
    id: "sales",
    name: "Dashboard Bán hàng",
    style: "style1",

    widgets: salesWidgets,
  },

  {
    id: "crm",
    name: "Dashboard CRM",
    style: "style2",

    widgets: crmWidgets,
  },
  {
  id: "hr",
  name: "Dashboard Nhân sự",
  style: "style3",

  widgets: hrWidgets,
},
{
  id: "ceo",
  name: "Dashboard CEO",
  style: "style1",
  widgets: ceoWidgets,
},

{
  id: "finance",
  name: "Dashboard Tài chính",
  style: "style4",
  widgets: financeWidgets,
},

{
  id: "project",
  name: "Dashboard Dự án",
  style: "style5",
  widgets: projectWidgets,
},
{
  id: "kpi",
  name: "Dashboard KPI",
  style: "style2",
  widgets: kpiWidgets,
},

{
  id: "warehouse",
  name: "Dashboard Kho hàng",
  style: "style1",
  widgets: warehouseWidgets,
},

{
  id: "warranty",
  name: "Dashboard Bảo hành",
  style: "style3",
  widgets: warrantyWidgets,
},

{
  id: "production",
  name: "Dashboard Sản xuất",
  style: "style4",
  widgets: productionWidgets,
},

{
  id: "workflow",
  name: "Dashboard Quy trình",
  style: "style5",
  widgets: workflowWidgets,
},

{
  id: "task",
  name: "Dashboard Công việc",
  style: "style2",
  widgets: taskWidgets,
},
];