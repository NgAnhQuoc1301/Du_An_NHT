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
    name: "Sales Dashboard",
    style: "style1",

    widgets: salesWidgets,
  },

  {
    id: "crm",
    name: "CRM Dashboard",
    style: "style2",

    widgets: crmWidgets,
  },
  {
  id: "hr",
  name: "HR Dashboard",
  style: "style3",

  widgets: hrWidgets,
},
{
  id: "ceo",
  name: "CEO Dashboard",
  style: "style1",
  widgets: ceoWidgets,
},

{
  id: "finance",
  name: "Finance Dashboard",
  style: "style4",
  widgets: financeWidgets,
},

{
  id: "project",
  name: "Project Dashboard",
  style: "style5",
  widgets: projectWidgets,
},
{
  id: "kpi",
  name: "KPI Dashboard",
  style: "style2",
  widgets: kpiWidgets,
},

{
  id: "warehouse",
  name: "Warehouse Dashboard",
  style: "style1",
  widgets: warehouseWidgets,
},

{
  id: "warranty",
  name: "Warranty Dashboard",
  style: "style3",
  widgets: warrantyWidgets,
},

{
  id: "production",
  name: "Production Dashboard",
  style: "style4",
  widgets: productionWidgets,
},

{
  id: "workflow",
  name: "Workflow Dashboard",
  style: "style5",
  widgets: workflowWidgets,
},

{
  id: "task",
  name: "Task Dashboard",
  style: "style2",
  widgets: taskWidgets,
},
];