import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { WidgetConfig } from "../../types/widget";

type Props = {
  title: string;
  widgets: WidgetConfig[];
};

export default function Style4({ title, widgets }: Props) {

  const kpiWidgets = widgets.filter((w) => w.type === "kpi");
  const lineWidget = widgets.find(
    (w) => w.type === "line-chart" && w.chartData
  ) ?? widgets.find((w) => w.chartData);

  const lineData = lineWidget?.chartData ?? [];
  const lineKeys = lineWidget?.chartKeys ?? [
    { key: "value", color: "#06B6D4" },
  ];

  return (
    <div className="bg-slate-900 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-white mb-8">
        {title}
      </h1>

      {/* KPI Cards dark */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiWidgets.map((w) => (
          <div
            key={w.id}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <p className="text-sm text-slate-400">{w.title}</p>
            <h3 className="text-3xl font-bold mt-2 text-white">
              {w.value}
            </h3>
            <p className={`text-sm mt-2 font-medium ${
              w.positive ? "text-emerald-400" : "text-red-400"
            }`}>
              {w.description}
            </p>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-6">
          {lineWidget?.title ?? "Xu hướng"}
        </h2>
        {lineData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
              />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  color: "#fff",
                }}
              />
              <Legend />
              {lineKeys.map((k) => (
                <Line
                  key={k.key}
                  type="monotone"
                  dataKey={k.key}
                  stroke={k.color}
                  strokeWidth={2}
                  dot={{ r: 4, fill: k.color }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-slate-400 text-center py-10">
            Không có dữ liệu
          </p>
        )}
      </div>

    </div>
  );
}