import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  salesRevenueTrendData,
  salesByEmployeeData,
  salesByProductData,
  salesKpiListData,
} from "../../data/mockData/salesData";

type Props = { style: string };

const salesWidgets: WidgetConfig[] = [
  { id: "kpi-revenue", type: "kpi", title: "Revenue", value: "$120,000", description: "+15%", positive: true, width: 3 },
  { id: "kpi-orders", type: "kpi", title: "Orders", value: "356", description: "+8%", positive: true, width: 3 },
  { id: "kpi-customers", type: "kpi", title: "Customers", value: "820", description: "+5%", positive: true, width: 3 },
  { id: "kpi-growth", type: "kpi", title: "Growth", value: "18%", description: "+2%", positive: true, width: 3 },
  {
    id: "revenue-trend",
    type: "line-chart",
    title: "Revenue Trend",
    width: 8,
    chartData: salesRevenueTrendData.map((i) => ({ name: i.month, revenue: i.revenue })),
    chartKeys: [{ key: "revenue", color: "#3B82F6" }],
  },
  {
    id: "by-employee",
    type: "bar-chart",
    title: "Revenue By Employee",
    width: 4,
    chartData: salesByEmployeeData.map((i) => ({ name: i.name, revenue: i.revenue })),
    chartKeys: [{ key: "revenue", color: "#10B981" }],
  },
  {
    id: "by-product",
    type: "pie-chart",
    title: "Revenue By Product",
    width: 6,
    chartData: salesByProductData.map((i) => ({ name: i.name, value: i.value })),
    chartKeys: [{ key: "value", color: "#8B5CF6" }],
  },
  {
    id: "kpi-list",
    type: "table",
    title: "KPI List",
    width: 6,
    tableColumns: ["title", "value", "target"],
    tableRows: salesKpiListData,
  },
];

export default function SalesDashboard({ style }: Props) {
  const props = { title: "Sales Dashboard", widgets: salesWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}