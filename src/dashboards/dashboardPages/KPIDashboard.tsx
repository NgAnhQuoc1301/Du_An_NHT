import {
  kpiCardsData,
  kpiTrendData,
  kpiListData,
} from "../../data/mockData/kpiData";

import ConversionChart
  from "../../components/charts/ConversionChart";
import KpiCard
  from "../../components/common/KpiCard";
import ProgressBar
  from "../../components/common/ProgressBar";

export default function KPIDashboard() {
  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCardsData.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
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
            <ProgressBar key={item.id} {...item} />
          ))}
        </div>
      </div>

    </div>
  );
}