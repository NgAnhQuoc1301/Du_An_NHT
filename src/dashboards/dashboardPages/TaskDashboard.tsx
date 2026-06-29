import {
  taskKpiData,
  taskStatusData,
  taskTrendData,
  taskListData,
} from "../../data/mockData/taskData";

import ConversionChart
  from "../../components/charts/ConversionChart";

import PieChartWidget
  from "../../components/charts/PieChartWidget";
import KpiCard from "../../components/common/KpiCard";
export default function TaskDashboard() {
  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {taskKpiData.map((kpi) => (
  <KpiCard key={kpi.id} {...kpi} />
))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Task Completion Trend
          </h2>
          <ConversionChart data={taskTrendData} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Task Status
          </h2>
          <PieChartWidget data={taskStatusData} />
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Task List
        </h2>
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
              <tr
                key={row.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-3 font-medium">
                  {row.title}
                </td>
                <td className="py-3 text-slate-500">
                  {row.assignee}
                </td>
                <td className="py-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${row.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : row.priority === "medium"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-slate-100 text-slate-500"
                    }
                  `}>
                    {row.priority}
                  </span>
                </td>
                <td className="py-3 text-slate-500">
                  {row.deadline}
                </td>
                <td className="py-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${row.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : row.status === "overdue"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                    }
                  `}>
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
