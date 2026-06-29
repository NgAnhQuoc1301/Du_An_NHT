import type { WidgetConfig } from "../../types/widget";

import KpiCard from "./KpiCard";
import ChartCard from "./ChartCard";
import TableCard from "./TableCard";

type Props = {
  widget: WidgetConfig;
};

export default function WidgetRenderer({
  widget,
}: Props) {

  switch (widget.type) {

    case "kpi":
      return (
        <KpiCard
          title={widget.title}
          value={widget.value ?? "-"}
        />
      );

    case "line-chart":
  return (
    <ChartCard
      title={widget.title}
      chartType="line"
    />
  );

    case "bar-chart":
  return (
    <ChartCard
      title={widget.title}
      chartType="bar"
    />
  );

    case "pie-chart":
  return (
    <ChartCard
      title={widget.title}
      chartType="pie"
    />
  );

    case "funnel-chart":
  return (
    <ChartCard
      title={widget.title}
      chartType="funnel"
    />
  );

    case "table":
      return (
        <TableCard
          title={widget.title}
        />
      );

    default:
      return null;

  }

}