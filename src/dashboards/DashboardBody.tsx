import WidgetRenderer from "../components/dashboard/WidgetRenderer";
import type { WidgetConfig } from "../types/widget";
import { gridSpan } from "../utils/grid";

type Props = {
  widgets: WidgetConfig[];
};

export default function DashboardBody({
  widgets,
}: Props) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={gridSpan[widget.width ?? 3]}
        >
          <WidgetRenderer widget={widget} />
        </div>
      ))}
    </div>
  );
}