import {
  productionKpiData,
  productionTrendData,
  productionLineData,
  productionAlertData,
} from "../../data/mockData/productionData";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ConversionChart from "../../components/charts/ConversionChart";
import BarChartWidget from "../../components/charts/BarChartWidget";
import StyleKpiCard from "../../components/common/StyleKpiCard";

type Props = { style: string };

export default function ProductionDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="Production Dashboard"
    description="Monitor production metrics, trends and performance."
/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {productionKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`rounded-2xl shadow p-6 ${
          style === "style4" ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            style === "style4" ? "text-white" : ""
          }`}>Production Trend</h2>
          <ConversionChart
            data={productionTrendData.map((i) => ({
              month: i.month,
              rate: i.rate,
            }))}
          />
        </div>

        <div className={`rounded-2xl shadow p-6 ${
          style === "style4" ? "bg-slate-800" : "bg-white"
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            style === "style4" ? "text-white" : ""
          }`}>Output By Line</h2>
          <BarChartWidget data={productionLineData} />
        </div>
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>Production Alerts</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-3">Dây chuyền</th>
              <th className="pb-3">Vấn đề</th>
              <th className="pb-3">Thời gian</th>
              <th className="pb-3">Mức độ</th>
            </tr>
          </thead>
          <tbody>
            {productionAlertData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-slate-50">
                <td className="py-3 font-medium">{row.line}</td>
                <td className="py-3 text-slate-500">{row.issue}</td>
                <td className="py-3 text-slate-500">{row.time}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.severity === "high" ? "bg-red-100 text-red-600"
                    : row.severity === "medium" ? "bg-orange-100 text-orange-600"
                    : "bg-green-100 text-green-600"
                  }`}>
                    {row.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}