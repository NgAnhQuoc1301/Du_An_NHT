import {
  workflowKpiData,
  workflowTypeData,
  workflowListData,
} from "../../data/mockData/workflowData";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import PieChartWidget from "../../components/charts/PieChartWidget";
import StyleKpiCard from "../../components/common/StyleKpiCard";

type Props = { style: string };

export default function WorkflowDashboard({ style }: Props) {
  return (
    
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="Workflow Dashboard"
    description="Monitor workflow, type and status performance."
/>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {workflowKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>Workflow By Type</h2>
        <PieChartWidget data={workflowTypeData} />
      </div>

      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>Workflow List</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-3">Tên workflow</th>
              <th className="pb-3">Loại</th>
              <th className="pb-3">Người yêu cầu</th>
              <th className="pb-3">Ngày tạo</th>
              <th className="pb-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {workflowListData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-slate-50">
                <td className="py-3 font-medium">{row.name}</td>
                <td className="py-3 text-slate-500">{row.type}</td>
                <td className="py-3 text-slate-500">{row.requester}</td>
                <td className="py-3 text-slate-500">{row.created}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === "approved" ? "bg-green-100 text-green-600"
                    : row.status === "rejected" ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
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