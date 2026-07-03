import {
  taskKpiData,
  taskListData,
} from "../../data/mockData/taskData";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StyleKpiCard from "../../components/common/StyleKpiCard";

type Props = { style: string };

export default function TaskDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="Sales Dashboard"
    description="Monitor revenue, orders and sales performance."
/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {taskKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>
      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>Task List</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-3">Task</th>
              <th className="pb-3">Assignee</th>
              <th className="pb-3">Priority</th>
              <th className="pb-3">Deadline</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {taskListData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-slate-50">
                <td className="py-3 font-medium">{row.title}</td>
                <td className="py-3 text-slate-500">{row.assignee}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.priority === "high" ? "bg-red-100 text-red-600"
                    : row.priority === "medium" ? "bg-orange-100 text-orange-600"
                    : "bg-slate-100 text-slate-500"
                  }`}>
                    {row.priority}
                  </span>
                </td>
                <td className="py-3 text-slate-500">{row.deadline}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === "completed" ? "bg-green-100 text-green-600"
                    : row.status === "overdue" ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
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