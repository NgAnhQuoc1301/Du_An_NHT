import {
  salesKpiData,
  salesRevenueTrendData,
  salesByEmployeeData,
  salesKpiListData,
} from "../../data/mockData/salesData";

import ConversionChart from "../../components/charts/ConversionChart";
import BarChartWidget from "../../components/charts/BarChartWidget";
import StyleKpiCard from "../../components/common/StyleKpiCard";
import ProgressBar from "../../components/common/ProgressBar";

type Props = { style: string };

export default function SalesDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>

      <div className="grid grid-cols-2 gap-6">
        {salesKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>
          Revenue Trend
        </h2>
        <ConversionChart
          data={salesRevenueTrendData.map((item) => ({
            month: item.month,
            rate: item.revenue / 1000,
          }))}
        />
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>
          Revenue By Employee
        </h2>
        <BarChartWidget data={salesByEmployeeData} />
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>
          KPI List
        </h2>
        <div className="space-y-5">
          {salesKpiListData.map((item) => (
            <ProgressBar key={item.id} {...item} />
          ))}
        </div>
      </div>

    </div>
  );
}