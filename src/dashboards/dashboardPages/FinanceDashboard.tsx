import {
  financeKpiData,
  financeProfitTrendData,
  financeExpenseData,
  financeKpiListData,
} from "../../data/mockData/financeData";

import ConversionChart from "../../components/charts/ConversionChart";
import PieChartWidget from "../../components/charts/PieChartWidget";
import StyleKpiCard from "../../components/common/StyleKpiCard";
import ProgressBar from "../../components/common/ProgressBar";

type Props = { style: string };

export default function FinanceDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {financeKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`rounded-2xl shadow p-6 ${
          style === "style4" ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            style === "style4" ? "text-white" : ""
          }`}>Profit Trend</h2>
          <ConversionChart
            data={financeProfitTrendData.map((item) => ({
              month: item.month,
              rate: item.value,
            }))}
          />
        </div>

        <div className={`rounded-2xl shadow p-6 ${
          style === "style4" ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            style === "style4" ? "text-white" : ""
          }`}>Expense Breakdown</h2>
          <PieChartWidget data={financeExpenseData} />
        </div>
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>Financial KPI</h2>
        <div className="space-y-5">
          {financeKpiListData.map((item) => (
            <ProgressBar key={item.id} {...item} />
          ))}
        </div>
      </div>

    </div>
  );
}