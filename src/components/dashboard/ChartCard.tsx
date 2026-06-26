import LineChartWidget from "./charts/LineChartWidget";

type Props = {
  title: string;
};

export default function ChartCard({
  title,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">
        {title}
      </h3>

      <div className="h-72 bg-slate-50 rounded-lg p-2">
        <LineChartWidget />
      </div>
    </div>
  );
}