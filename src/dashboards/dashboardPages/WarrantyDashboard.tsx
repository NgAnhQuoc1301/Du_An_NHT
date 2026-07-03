import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  warrantyKpiData,
  warrantyTrendData,
  warrantyTypeData,
  warrantyRequestData,
} from "../../data/mockData/warrantyData";

type Props = { style: string };

const warrantyWidgets: WidgetConfig[] = [
  ...warrantyKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "warranty-trend",
    type: "line-chart" as const,
    title: "Warranty Requests Trend",
    width: 6 as const,
    chartData: warrantyTrendData.map((i) => ({ name: i.month, requests: i.rate })),
    chartKeys: [{ key: "requests", color: "#F59E0B" }],
  },
  {
    id: "warranty-type",
    type: "pie-chart" as const,
    title: "Warranty By Type",
    width: 6 as const,
    chartData: warrantyTypeData.map((i) => ({ name: i.name, value: i.value })),
    chartKeys: [{ key: "value", color: "#EF4444" }],
  },
  {
    id: "requests",
    type: "table" as const,
    title: "Warranty Requests",
    width: 12 as const,
    tableColumns: ["customer", "product", "issue", "status"],
    tableRows: warrantyRequestData,
  },
];

export default function WarrantyDashboard({ style }: Props) {
  const props = { title: "Warranty Dashboard", widgets: warrantyWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}