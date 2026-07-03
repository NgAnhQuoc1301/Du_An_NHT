import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { WidgetConfig } from "../../types/widget";

type Props = {
  title: string;
  widgets: WidgetConfig[];
};

const COLORS = [
  "#3B82F6", "#10B981", "#8B5CF6",
  "#F59E0B", "#EF4444", "#06B6D4",
];

export default function Style2({ title, widgets }: Props) {

  const kpiWidgets = widgets.filter((w) => w.type === "kpi");
  const chartWidget = widgets.find((w) => w.chartData && w.chartData.length > 0);
  const barData = chartWidget?.chartData ?? [];
  const barKey = chartWidget?.chartKeys?.[0]?.key ?? "value";

  return (
    <div className="bg-slate-50 min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiWidgets.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500"
          >
            <p className="text-sm text-slate-400 uppercase tracking-wide">
              {w.title}
            </p>
            <h3 className="text-4xl font-extrabold mt-2 text-slate-800">
              {w.value}
            </h3>
            <p className={`text-sm mt-2 font-semibold ${
              w.positive ? "text-green-500" : "text-red-500"
            }`}>
              {w.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          {chartWidget?.title ?? "Biểu đồ cột"}
        </h2>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey={barKey} radius={[6, 6, 0, 0]}>
                {barData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
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