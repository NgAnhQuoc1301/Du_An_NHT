import {
  financeKpiData,
  financeProfitTrendData,
  financeExpenseData,
  financeKpiListData,
} from "../../data/mockData/financeData";

import ConversionChart from "../../components/charts/ConversionChart";
import PieChartWidget from "../../components/charts/PieChartWidget";

export default function FinanceDashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {financeKpiData.map((kpi) => (
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

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Profit Trend
          </h2>

          <ConversionChart
            data={financeProfitTrendData.map((item) => ({
              month: item.month,
              rate: item.value,
            }))}
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Expense Breakdown
          </h2>

          <PieChartWidget data={financeExpenseData} />
        </div>

      </div>

      {/* KPI List */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-6">
          Financial KPI
        </h2>

        <div className="space-y-5">
          {financeKpiListData.map((item) => (
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
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 mt-1">
                {item.percent}% performance
              </p>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}