import {
  projectKpiData,
  projectStatusData,
  projectListData,
} from "../../data/mockData/projectData";

import PieChartWidget
  from "../../components/charts/PieChartWidget";
import KpiCard from "../../components/common/KpiCard";
export default function ProjectDashboard() {
  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {projectKpiData.map((kpi) => (
  <KpiCard key={kpi.id} {...kpi} />
))}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Project Status
        </h2>
        <PieChartWidget data={projectStatusData} />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Project List
        </h2>
        <div className="space-y-4">
          {projectListData.map((project) => (
            <div
              key={project.id}
              className="border rounded-xl p-4 hover:bg-slate-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">
                  {project.name}
                </h3>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${project.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : project.status === "delayed"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                  }
                `}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-3">
                {project.team} · Deadline: {project.deadline}
              </p>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {project.progress}% hoàn thành
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
