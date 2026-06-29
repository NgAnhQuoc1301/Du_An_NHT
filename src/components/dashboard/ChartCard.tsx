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

    case "bar":
      return null;

    case "pie":
      return null;

    case "funnel":
      return null;

    default:
      return null;
  }

};
  
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h3 className="font-semibold mb-4">
        {title}
      </h3>

      <div className="h-72 bg-slate-50 rounded-lg p-2">
        {renderChart()}
      </div>

    </div>
  );
}