import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  hrKpiData,
  hrHiringTrendData,
  hrDepartmentData,
  hrEmployeeData,
} from "../../data/mockData/hrData";

type Props = { style: string };

const hrWidgets: WidgetConfig[] = [
  ...hrKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "hiring-trend",
    type: "line-chart" as const,
    title: "Hiring Trend",
    width: 6 as const,
    chartData: hrHiringTrendData.map((i) => ({ name: i.month, hired: i.value })),
    chartKeys: [{ key: "hired", color: "#3B82F6" }],
  },
  {
    id: "department",
    type: "pie-chart" as const,
    title: "Department Distribution",
    width: 6 as const,
    chartData: hrDepartmentData.map((i) => ({ name: i.name, value: i.value })),
    chartKeys: [{ key: "value", color: "#10B981" }],
  },
  {
    id: "employees",
    type: "table" as const,
    title: "Employee List",
    width: 12 as const,
    tableColumns: ["name", "role", "department", "status"],
    tableRows: hrEmployeeData,
  },
];

export default function HRDashboard({ style }: Props) {
  const props = { title: "HR Dashboard", widgets: hrWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}