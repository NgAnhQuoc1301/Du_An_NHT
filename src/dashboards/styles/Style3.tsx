import type { WidgetConfig } from "../../types/widget";

type Props = {
  title: string;
  widgets: WidgetConfig[];
};

export default function Style3({ title, widgets }: Props) {

  const kpiWidgets = widgets.filter((w) => w.type === "kpi");
  const otherWidgets = widgets.filter((w) => w.type !== "kpi");

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      <div className="bg-white rounded-xl shadow p-4 mb-8">
        <p className="text-slate-500 text-sm">
          Executive Dashboard View — Card Layout
        </p>
      </div>

      {/* KPI Cards lớn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiWidgets.map((w, index) => {
          const colors = [
            "from-blue-500 to-blue-600",
            "from-emerald-500 to-emerald-600",
            "from-purple-500 to-purple-600",
            "from-amber-500 to-amber-600",
          ];
          return (
            <div
              key={w.id}
              className={`bg-gradient-to-br ${colors[index % colors.length]} rounded-2xl p-6 text-white shadow-lg`}
            >
              <p className="text-sm text-white/70 uppercase tracking-wide">
                {w.title}
              </p>
              <h3 className="text-4xl font-extrabold mt-3">
                {w.value}
              </h3>
              <div className="mt-4 flex items-center gap-2">
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  w.positive
                    ? "bg-white/20 text-white"
                    : "bg-red-400/30 text-white"
                }`}>
                  {w.description}
                </span>
                <span className="text-white/60 text-xs">
                  vs tháng trước
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Các widget khác */}
      {otherWidgets.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {otherWidgets.map((w) => (
            <div key={w.id} className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-bold text-lg mb-4">{w.title}</h3>
              <p className="text-slate-400 text-sm">
                {w.type.replace("-", " ").toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}