import {
  hrKpiData,
  hrHiringTrendData,
  hrDepartmentData,
  hrEmployeeData,
} from "../../data/mockData/hrData";
import KpiCard from "../../components/common/KpiCard";
import ConversionChart from "../../components/charts/ConversionChart";
import PieChartWidget from "../../components/charts/PieChartWidget";

export default function HRDashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {hrKpiData.map((kpi) => (
  <KpiCard key={kpi.id} {...kpi} />
))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Hiring Trend
          </h2>

          <ConversionChart
            data={hrHiringTrendData.map((i) => ({
              month: i.month,
              rate: i.value,
            }))}
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Department Distribution
          </h2>

          <PieChartWidget data={hrDepartmentData} />
        </div>

      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-6">
          Employee List
        </h2>

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
              <tr
                key={emp.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-3 font-medium">
                  {emp.name}
                </td>

                <td className="py-3 text-slate-500">
                  {emp.role}
                </td>

                <td className="py-3 text-slate-500">
                  {emp.department}
                </td>

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
