import {
  kpiCardsData,
  kpiTrendData,
  kpiListData,
} from "../../data/mockData/kpiData";

import ConversionChart
  from "../../components/charts/ConversionChart";

export default function KPIDashboard() {
  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCardsData.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <p className="text-sm text-slate-500">
              {kpi.title}
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {kpi.value}
            </h3>
            <p className={`text-sm mt-2 font-medium ${
              kpi.positive
                ? "text-green-500"
                : "text-red-500"
            }`}>
              {kpi.change} so với tháng trước
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          KPI Trend
        </h2>
        <ConversionChart data={kpiTrendData} />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          KPI List
        </h2>
        <div className="space-y-5">
          {kpiListData.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">
                  {item.title}
                </span>
                <span className="text-slate-500">
                  {item.value} / {item.target}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {item.percent}% of target
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}