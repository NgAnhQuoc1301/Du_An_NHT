import {
  kpiCardsData,
  kpiTrendData,
  kpiListData,
} from "../../data/mockData/kpiData";

import ConversionChart from "../../components/charts/ConversionChart";
import StyleKpiCard from "../../components/common/StyleKpiCard";
import ProgressBar from "../../components/common/ProgressBar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
type Props = { style: string };

export default function KPIDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="KPI Dashboard"
    description="Monitor key performance indicators and trends."
/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCardsData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>KPI Trend</h2>
        <ConversionChart data={kpiTrendData} />
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>KPI List</h2>
        <div className="space-y-5">
          {kpiListData.map((item) => (
            <ProgressBar key={item.id} {...item} />
          ))}
        </div>
      </div>

    </div>
  );
}