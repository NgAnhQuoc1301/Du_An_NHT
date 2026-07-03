import type { WidgetConfig } from "../../types/widget";

type Props = {
  title: string;
  widgets: WidgetConfig[];
};

export default function Style5({ title, widgets }: Props) {

  const kpiWidgets = widgets.filter((w) => w.type === "kpi");
  const chartWidgets = widgets.filter((w) => w.chartData);

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">{title}</h1>

      {/* KPI List ngang */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b bg-slate-50">
          <h2 className="font-bold text-slate-700">KPI Overview</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500 bg-slate-50">
              <th className="px-6 py-3">Chỉ số</th>
              <th className="px-6 py-3">Giá trị</th>
              <th className="px-6 py-3">Thay đổi</th>
              <th className="px-6 py-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {kpiWidgets.map((w) => (
              <tr
                key={w.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 font-medium text-slate-700">
                  {w.title}
                </td>
                <td className="px-6 py-4 font-bold text-blue-600">
                  {w.value}
                </td>
                <td className={`px-6 py-4 font-semibold ${
                  w.positive ? "text-green-500" : "text-red-500"
                }`}>
                  {w.description}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    w.positive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {w.positive ? "Tốt" : "Cần cải thiện"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Data List từ chartData */}
      {chartWidgets.map((w) => (
        <div key={w.id} className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b bg-slate-50">
            <h2 className="font-bold text-slate-700">{w.title}</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-slate-500 bg-slate-50">
                <th className="px-6 py-3">Tên</th>
                {w.chartKeys?.map((k) => (
                  <th key={k.key} className="px-6 py-3 capitalize">
                    {k.key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {w.chartData?.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-3 font-medium text-slate-700">
                    {row.name}
                  </td>
                  {w.chartKeys?.map((k) => (
                    <td
                      key={k.key}
                      className="px-6 py-3 font-semibold"
                      style={{ color: k.color }}
                    >
                      {typeof row[k.key] === "number"
                        ? Number(row[k.key]).toLocaleString()
                        : String(row[k.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

    </div>
  );
}