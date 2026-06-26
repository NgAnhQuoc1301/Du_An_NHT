import type { WidgetConfig } from "../types/widget";

export function countWidgets(
  widgets: WidgetConfig[]
) {

  return {

    total: widgets.length,

    kpi: widgets.filter(
      w => w.type === "kpi"
    ).length,

    chart: widgets.filter(
      w =>
        w.type === "line-chart" ||
        w.type === "bar-chart" ||
        w.type === "pie-chart"
    ).length,

    table: widgets.filter(
      w => w.type === "table"
    ).length,

  };

}