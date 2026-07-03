import {
  hrKpiData,
  hrEmployeeData,
} from "../../data/mockData/hrData";
import StyleKpiCard from "../../components/common/StyleKpiCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
type Props = { style: string };

export default function HRDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="HR Dashboard"
    description="Monitor human resources metrics and performance."
/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {hrKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>
      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>Employee List</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b">
              <th className="pb-3">Name</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Department</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {hrEmployeeData.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-slate-50">
                <td className="py-3 font-medium">{emp.name}</td>
                <td className="py-3 text-slate-500">{emp.role}</td>
                <td className="py-3 text-slate-500">{emp.department}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    emp.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 text-slate-500"
                  }`}>
                    {emp.status}
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