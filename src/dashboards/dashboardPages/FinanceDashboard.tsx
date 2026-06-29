import {
  financeKpiData,
  financeProfitTrendData,
  financeExpenseData,
  financeKpiListData,
} from "../../data/mockData/financeData";

import ConversionChart
  from "../../components/charts/ConversionChart";
import PieChartWidget
  from "../../components/charts/PieChartWidget";
import KpiCard
  from "../../components/common/KpiCard";
import ProgressBar
  from "../../components/common/ProgressBar";

export default function FinanceDashboard() {
  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {financeKpiData.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

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

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Financial KPI
        </h2>
        <div className="space-y-5">
          {financeKpiListData.map((item) => (
            <ProgressBar key={item.id} {...item} />
          ))}
        </div>
      </div>

    </div>
  );
}