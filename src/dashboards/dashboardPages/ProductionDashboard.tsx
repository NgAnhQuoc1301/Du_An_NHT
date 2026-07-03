import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  productionKpiData,
  productionTrendData,
  productionLineData,
  productionAlertData,
} from "../../data/mockData/productionData";

type Props = { style: string };

const productionWidgets: WidgetConfig[] = [
  ...productionKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "production-trend",
    type: "line-chart" as const,
    title: "Production Trend",
    width: 6 as const,
    chartData: productionTrendData.map((i) => ({ name: i.month, output: i.rate })),
    chartKeys: [{ key: "output", color: "#3B82F6" }],
  },
  {
    id: "line-output",
    type: "bar-chart" as const,
    title: "Output By Line",
    width: 6 as const,
    chartData: productionLineData.map((i) => ({ name: i.name, value: i.value })),
    chartKeys: [{ key: "value", color: "#10B981" }],
  },
  {
    id: "alerts",
    type: "table" as const,
    title: "Production Alerts",
    width: 12 as const,
    tableColumns: ["line", "issue", "time", "severity"],
    tableRows: productionAlertData,
  },
];

export default function ProductionDashboard({ style }: Props) {
  const props = { title: "Production Dashboard", widgets: productionWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}