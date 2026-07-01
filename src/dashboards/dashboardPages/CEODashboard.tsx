import {
  ceoKpiData,
  ceoRevenueTrendData,
  ceoRevenueDistributionData,
  ceoKpiListData,
} from "../../data/mockData/ceoData";

import ConversionChart from "../../components/charts/ConversionChart";
import PieChartWidget from "../../components/charts/PieChartWidget";
import StyleKpiCard from "../../components/common/StyleKpiCard";
import ProgressBar from "../../components/common/ProgressBar";

type Props = { style: string };

export default function CEODashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {ceoKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`rounded-2xl shadow p-6 ${
          style === "style4" ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            style === "style4" ? "text-white" : ""
          }`}>Revenue Trend</h2>
          <ConversionChart
            data={ceoRevenueTrendData.map((item) => ({
              month: item.month,
              rate: item.revenue,
            }))}
          />
        </div>

        <div className={`rounded-2xl shadow p-6 ${
          style === "style4" ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            style === "style4" ? "text-white" : ""
          }`}>Revenue Distribution</h2>
          <PieChartWidget data={ceoRevenueDistributionData} />
        </div>
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>KPI Overview</h2>
        <div className="space-y-5">
          {ceoKpiListData.map((item) => (
            <ProgressBar key={item.id} {...item} />
          ))}
        </div>
      </div>

    </div>
  );
}