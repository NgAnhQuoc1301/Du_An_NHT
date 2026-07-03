import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  kpiCardsData,
  kpiTrendData,
  kpiListData,
} from "../../data/mockData/kpiData";

type Props = { style: string };

const kpiWidgets: WidgetConfig[] = [
  ...kpiCardsData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "kpi-trend",
    type: "line-chart" as const,
    title: "KPI Trend",
    width: 8 as const,
    chartData: kpiTrendData.map((i) => ({ name: i.month, rate: i.rate })),
    chartKeys: [{ key: "rate", color: "#3B82F6" }],
  },
  {
    id: "kpi-list",
    type: "table" as const,
    title: "KPI List",
    width: 4 as const,
    tableColumns: ["title", "value", "target"],
    tableRows: kpiListData,
  },
];

export default function KPIDashboard({ style }: Props) {
  const props = { title: "KPI Dashboard", widgets: kpiWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}