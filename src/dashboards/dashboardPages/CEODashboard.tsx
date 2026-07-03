import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  ceoKpiData,
  ceoRevenueTrendData,
  ceoRevenueDistributionData,
  ceoKpiListData,
} from "../../data/mockData/ceoData";

type Props = { style: string };

const ceoWidgets: WidgetConfig[] = [
  ...ceoKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "revenue-trend",
    type: "line-chart" as const,
    title: "Revenue Trend",
    width: 8 as const,
    chartData: ceoRevenueTrendData.map((i) => ({ name: i.month, revenue: i.revenue })),
    chartKeys: [{ key: "revenue", color: "#3B82F6" }],
  },
  {
    id: "distribution",
    type: "pie-chart" as const,
    title: "Revenue Distribution",
    width: 4 as const,
    chartData: ceoRevenueDistributionData.map((i) => ({ name: i.source, value: i.value })),
    chartKeys: [{ key: "value", color: "#10B981" }],
  },
  {
    id: "kpi-overview",
    type: "table" as const,
    title: "KPI Overview",
    width: 12 as const,
    tableColumns: ["title", "value", "target"],
    tableRows: ceoKpiListData,
  },
];

export default function CEODashboard({ style }: Props) {
  const props = { title: "CEO Dashboard", widgets: ceoWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}