import {
    CalendarDays,
    Download,
    Maximize2,
    Filter,
    RefreshCw,
} from "lucide-react";  

import LineChartWidget from "./charts/LineChartWidget";

type ChartType =
  | "line"
  | "bar"
  | "pie"
  | "funnel";

type Props = {
  title: string;
  chartType: ChartType;
};

export default function ChartCard({
  title,
  chartType,
}: Props) {

  const renderChart = () => {

    switch (chartType) {

      case "line":
        return <LineChartWidget />;

      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400">
            Coming Soon
          </div>
        );

    }

  };

  return (

    <div className="bg-white rounded-xl shadow-sm border border-slate-200">

      {/* Header */}

      <div className="flex items-center justify-between px-5 py-4 border-b">

        <div>

          <h3 className="font-semibold text-slate-700">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">

            <CalendarDays size={14} />

            Last Updated • 2 mins ago

          </div>

        </div>

        <div className="flex items-center gap-2">

    <button
        className="
        h-10
        w-10
        rounded-lg
        border
        hover:bg-slate-100
        flex
        items-center
        justify-center
        "
    >
        <RefreshCw size={16}/>
    </button>

    <button
        className="
        h-10
        w-10
        rounded-lg
        border
        hover:bg-slate-100
        flex
        items-center
        justify-center
        "
    >
        <Filter size={16}/>
    </button>

    <select
        className="
        text-sm
        border
        rounded-lg
        px-3
        py-2
        outline-none
        hover:border-blue-500
        "
    >
        <option>Today</option>
        <option>This Week</option>
        <option>This Month</option>
        <option>This Quarter</option>
        <option>This Year</option>
    </select>

    <button
        className="
        flex
        items-center
        gap-2
        px-3
        py-2
        rounded-lg
        border
        hover:bg-slate-100
        "
    >
        <Download size={16}/>
        Export
    </button>

    <button
        className="
        h-10
        w-10
        rounded-lg
        border
        hover:bg-slate-100
        flex
        items-center
        justify-center
        "
    >
        <Maximize2 size={16}/>
    </button>

</div>

      </div>

      {/* Chart */}

      <div className="h-80 p-4">

        {renderChart()}

      </div>

    </div>

  );

}