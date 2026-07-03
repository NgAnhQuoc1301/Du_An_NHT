import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  financeKpiData,
  financeProfitTrendData,
  financeExpenseData,
  financeKpiListData,
} from "../../data/mockData/financeData";

type Props = { style: string };

const financeWidgets: WidgetConfig[] = [
  ...financeKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "profit-trend",
    type: "line-chart" as const,
    title: "Profit Trend",
    width: 6 as const,
    chartData: financeProfitTrendData.map((i) => ({ name: i.month, profit: i.value })),
    chartKeys: [{ key: "profit", color: "#3B82F6" }],
  },
  {
    id: "expense",
    type: "pie-chart" as const,
    title: "Expense Breakdown",
    width: 6 as const,
    chartData: financeExpenseData.map((i) => ({ name: i.name, value: i.value })),
    chartKeys: [{ key: "value", color: "#EF4444" }],
  },
  {
    id: "kpi-list",
    type: "table" as const,
    title: "Financial KPI",
    width: 12 as const,
    tableColumns: ["title", "value", "target"],
    tableRows: financeKpiListData,
  },
];

export default function FinanceDashboard({ style }: Props) {
  const props = { title: "Finance Dashboard", widgets: financeWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}