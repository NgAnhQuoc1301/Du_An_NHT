import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

export default function Style1({ title, widgets }: Props) {

  const kpiWidgets = widgets.filter((w) => w.type === "kpi");
  const chartWidget = widgets.find(
    (w) => w.type === "pie-chart" || w.chartData
  );

  const pieData = chartWidget?.chartData ?? [];
  const pieKey = chartWidget?.chartKeys?.[0]?.key ?? "value";

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiWidgets.map((w) => (
          <div key={w.id} className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-slate-500">{w.title}</p>
            <h3 className="text-3xl font-bold mt-2">{w.value}</h3>
            <p className={`text-sm mt-2 font-medium ${
              w.positive ? "text-green-500" : "text-red-500"
            }`}>
              {w.description}
            </p>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          {chartWidget?.title ?? "Phân bổ dữ liệu"}
        </h2>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey={pieKey}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
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