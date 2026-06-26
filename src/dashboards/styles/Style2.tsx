import DashboardBody from "../DashboardBody";

import type {
  WidgetConfig,
} from "../../types/widget";

type Props = {
  title: string;
  widgets: WidgetConfig[];
};

export default function Style2({
  title,
  widgets,
}: Props) {
  return (
    <div className="bg-slate-50 min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-8">
        {title}
      </h1>

      <DashboardBody
        widgets={widgets}
      />

    </div>
  );
}