import {
  crmKpiData,
  crmOpportunityData,
} from "../../data/mockData/crmData";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StyleKpiCard from "../../components/common/StyleKpiCard";
type Props = { style: string };

export default function CRMDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="CRM Dashboard"
    description="Monitor customer metrics, trends and sales performance."
/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {crmKpiData.map((kpi) => (
                <StyleKpiCard key={kpi.id} {...kpi} style={style} />
              ))}
            </div>
      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>Cơ hội kinh doanh</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-3">Công ty</th>
              <th className="pb-3">Liên hệ</th>
              <th className="pb-3">Giá trị</th>
              <th className="pb-3">Giai đoạn</th>
              <th className="pb-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {crmOpportunityData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-slate-50">
                <td className="py-3 font-medium">{row.company}</td>
                <td className="py-3 text-slate-500">{row.contact}</td>
                <td className="py-3 font-semibold text-blue-600">{row.value}</td>
                <td className="py-3">{row.stage}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === "hot" ? "bg-red-100 text-red-600"
                    : row.status === "warm" ? "bg-orange-100 text-orange-600"
                    : row.status === "closed" ? "bg-green-100 text-green-600"
                    : "bg-slate-100 text-slate-600"
                  }`}>
                    {row.status}
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