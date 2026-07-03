import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  workflowKpiData,
  workflowTypeData,
  workflowListData,
} from "../../data/mockData/workflowData";

type Props = { style: string };

const workflowWidgets: WidgetConfig[] = [
  ...workflowKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "workflow-type",
    type: "pie-chart" as const,
    title: "Workflow By Type",
    width: 6 as const,
    chartData: workflowTypeData.map((i) => ({ name: i.name, value: i.value })),
    chartKeys: [{ key: "value", color: "#6366F1" }],
  },
  {
    id: "workflow-list",
    type: "table" as const,
    title: "Workflow List",
    width: 6 as const,
    tableColumns: ["name", "type", "requester", "created", "status"],
    tableRows: workflowListData,
  },
];

export default function WorkflowDashboard({ style }: Props) {
  const props = { title: "Workflow Dashboard", widgets: workflowWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}