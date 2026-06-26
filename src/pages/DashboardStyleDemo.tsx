import DashboardRenderer from "../dashboards/DashboardRenderer";
import type { WidgetConfig } from "../types/widget";
const demoWidgets: WidgetConfig[] = [
  {
    id: "revenue",
    type: "kpi",
    title: "Revenue",
    value: "$120,000",
    width: 3,
  },

  {
    id: "profit",
    type: "kpi",
    title: "Profit",
    value: "$35,000",
    width: 3,
  },

  {
    id: "trend",
    type: "line-chart",
    title: "Sales Trend",
    width: 6,
  },
];
export default function DashboardStyleDemo() {
  return (
    <div className="space-y-20">

      <DashboardRenderer
        title="Style 1 Demo"
        style="style1"
        widgets={demoWidgets}
      />

      <DashboardRenderer
        title="Style 2 Demo"
        style="style2"
        widgets={demoWidgets}
      />

      <DashboardRenderer
        title="Style 3 Demo"
        style="style3"
        widgets={demoWidgets}
      />

      <DashboardRenderer
        title="Style 4 Demo"
        style="style4"
        widgets={demoWidgets}
      />

      <DashboardRenderer
        title="Style 5 Demo"
        style="style5"
        widgets={demoWidgets}
      />

    </div>
  );
}