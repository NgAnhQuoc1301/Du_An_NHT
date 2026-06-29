import {
  ceoKpiData,
  ceoRevenueTrendData,
  ceoRevenueDistributionData,
  ceoKpiListData,
} from "../../data/mockData/ceoData";

import ConversionChart
  from "../../components/charts/ConversionChart";
import PieChartWidget
  from "../../components/charts/PieChartWidget";
import KpiCard
  from "../../components/common/KpiCard";
import ProgressBar
  from "../../components/common/ProgressBar";

export default function CEODashboard() {
  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {ceoKpiData.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">Revenue Trend</h2>
          <ConversionChart
            data={ceoRevenueTrendData.map((item) => ({
              month: item.month,
              rate: item.revenue,
            }))}
          />
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">Revenue Distribution</h2>
          <PieChartWidget data={ceoRevenueDistributionData} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">KPI Overview</h2>
        <div className="space-y-5">
          {ceoKpiListData.map((item) => (
            <ProgressBar key={item.id} {...item} />
          ))}
        </div>
      </div>

    </div>
  );
}