import Style1 from "../styles/Style1";
import Style2 from "../styles/Style2";
import Style3 from "../styles/Style3";
import Style4 from "../styles/Style4";
import Style5 from "../styles/Style5";
import type { WidgetConfig } from "../../types/widget";
import {
  warehouseKpiData,
  warehouseCategoryData,
  warehouseAlertData,
} from "../../data/mockData/warehouseData";

type Props = { style: string };

const warehouseWidgets: WidgetConfig[] = [
  ...warehouseKpiData.map((kpi) => ({
    id: `kpi-${kpi.id}`,
    type: "kpi" as const,
    title: kpi.title,
    value: kpi.value,
    description: kpi.change,
    positive: kpi.positive,
    width: 3 as const,
  })),
  {
    id: "category-chart",
    type: "bar-chart" as const,
    title: "Cơ cấu hàng tồn theo danh mục",
    width: 6 as const,
    chartData: warehouseCategoryData.map((i) => ({ name: i.name, value: i.value })),
    chartKeys: [{ key: "value", color: "#3B82F6" }],
  },
  {
    id: "alert-table",
    type: "table" as const,
    title: "Cảnh báo tồn kho",
    width: 6 as const,
    tableColumns: ["product", "category", "stock", "minStock", "status"],
    tableRows: warehouseAlertData,
  },
];

export default function WarehouseDashboard({ style }: Props) {
  const props = { title: "Warehouse Dashboard", widgets: warehouseWidgets };
  switch (style) {
    case "style2": return <Style2 {...props} />;
    case "style3": return <Style3 {...props} />;
    case "style4": return <Style4 {...props} />;
    case "style5": return <Style5 {...props} />;
    default:       return <Style1 {...props} />;
  }
}     