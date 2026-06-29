import {
  salesKpiData,
  salesRevenueTrendData,
  salesByEmployeeData,
  salesKpiListData,
} from "../../data/mockData/salesData";

import ConversionChart
  from "../../components/charts/ConversionChart";
import BarChartWidget
  from "../../components/charts/BarChartWidget";
import KpiCard
  from "../../components/common/KpiCard";
import ProgressBar
  from "../../components/common/ProgressBar";

export default function SalesDashboard() {
  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-2 gap-6">
        {salesKpiData.map((kpi) => (
  <KpiCard key={kpi.id} {...kpi} />
))}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">Revenue Trend</h2>
        <ConversionChart
          data={salesRevenueTrendData.map((item) => ({
            month: item.month,
            rate: item.revenue / 1000,
          }))}
        />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">Revenue By Employee</h2>
        <BarChartWidget data={salesByEmployeeData} />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">KPI List</h2>
        <div className="space-y-5">
          {salesKpiListData.map((item) => (
            <ProgressBar key={item.id} {...item} />
          ))}
        </div>
      </div>

    </div>
  );
}