import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  projectKpiData,
  projectStatusData,
  projectListData,
} from "../../data/mockData/projectData";

type Props = { style: string };

const projectWidgets: WidgetConfig[] = [
  ...projectKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "project-status",
    type: "pie-chart" as const,
    title: "Project Status",
    width: 6 as const,
    chartData: projectStatusData.map((i) => ({ name: i.name, value: i.value })),
    chartKeys: [{ key: "value", color: "#8B5CF6" }],
  },
  {
    id: "project-list",
    type: "table" as const,
    title: "Project List",
    width: 6 as const,
    tableColumns: ["name", "team", "progress", "status", "deadline"],
    tableRows: projectListData,
  },
];

export default function ProjectDashboard({ style }: Props) {
  const props = { title: "Project Dashboard", widgets: projectWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}