import DashboardBody from "../DashboardBody";

import type {
  WidgetConfig,
} from "../../types/widget";

type Props = {
  title: string;
  widgets: WidgetConfig[];
};

export default function Style5({
  title,
  widgets,
}: Props) {
  return (
    <div className="bg-black min-h-screen p-20">

      <h1 className="text-red-500 text-6xl font-bold">
        STYLE 5 ACTIVE
      </h1>

      <h2 className="text-white text-3xl mt-10 mb-10">
        {title}
      </h2>

      <DashboardBody
        widgets={widgets}
      />

    </div>
  );
}