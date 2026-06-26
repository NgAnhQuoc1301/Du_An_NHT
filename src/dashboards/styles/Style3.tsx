import DashboardBody from "../DashboardBody";

import type {
  WidgetConfig,
} from "../../types/widget";

type Props = {
  title: string;
  widgets: WidgetConfig[];
};

export default function Style3({
  title,
  widgets,
}: Props) {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        {title}
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <p className="text-slate-500">
          Executive Dashboard View
        </p>
      </div>

      <DashboardBody
        widgets={widgets}
      />

    </div>
  );
}