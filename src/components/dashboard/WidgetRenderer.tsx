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
          value="100"
        />
      );

    case "chart":
      return (
        <ChartCard
          title={widget.title}
        />
      );

    case "table":
      return (
        <TableCard
          title={widget.title}
        />
      );
      case "line-chart":
  return (
    <ChartCard
      title={widget.title}
    />
  );

    default:
      return null;
  }
}