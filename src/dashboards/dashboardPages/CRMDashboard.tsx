import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  crmKpiData,
  crmFunnelData,
  crmLeadSourceData,
  crmConversionData,
  crmOpportunityData,
} from "../../data/mockData/crmData";

type Props = { style: string };

const crmWidgets: WidgetConfig[] = [
  ...crmKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "funnel",
    type: "pie-chart" as const,
    title: "Sales Funnel",
    width: 6 as const,
    chartData: crmFunnelData.map((i) => ({ name: i.stage, value: i.value })),
    chartKeys: [{ key: "value", color: "#3B82F6" }],
  },
  {
    id: "lead-source",
    type: "bar-chart" as const,
    title: "Lead Source",
    width: 6 as const,
    chartData: crmLeadSourceData.map((i) => ({ name: i.source, value: i.value })),
    chartKeys: [{ key: "value", color: "#10B981" }],
  },
  {
    id: "conversion-trend",
    type: "line-chart" as const,
    title: "Conversion Rate Trend",
    width: 12 as const,
    chartData: crmConversionData.map((i) => ({ name: i.month, rate: i.rate })),
    chartKeys: [{ key: "rate", color: "#8B5CF6" }],
  },
  {
    id: "opportunities",
    type: "table" as const,
    title: "Cơ hội kinh doanh",
    width: 12 as const,
    tableColumns: ["company", "contact", "value", "stage", "status"],
    tableRows: crmOpportunityData,
  },
];

export default function CRMDashboard({ style }: Props) {
  const props = { title: "CRM Dashboard", widgets: crmWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}