import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  taskKpiData,
  taskTrendData,
  taskStatusData,
  taskListData,
} from "../../data/mockData/taskData";

type Props = { style: string };

const taskWidgets: WidgetConfig[] = [
  ...taskKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "task-trend",
    type: "line-chart" as const,
    title: "Task Completion Trend",
    width: 6 as const,
    chartData: taskTrendData.map((i) => ({ name: i.month, completed: i.rate })),
    chartKeys: [{ key: "completed", color: "#10B981" }],
  },
  {
    id: "task-status",
    type: "pie-chart" as const,
    title: "Task Status",
    width: 6 as const,
    chartData: taskStatusData.map((i) => ({ name: i.name, value: i.value })),
    chartKeys: [{ key: "value", color: "#3B82F6" }],
  },
  {
    id: "task-list",
    type: "table" as const,
    title: "Task List",
    width: 12 as const,
    tableColumns: ["title", "assignee", "priority", "deadline", "status"],
    tableRows: taskListData,
  },
];

export default function TaskDashboard({ style }: Props) {
  const props = { title: "Task Dashboard", widgets: taskWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}