
import KpiCard from "../../components/common/KpiCard";
import {
  crmKpiData,
  crmFunnelData,
  crmLeadSourceData,
  crmConversionData,
  crmOpportunityData,
} from "../../data/mockData/crmData";

import FunnelChart
  from "../../components/charts/FunnelChart";

import PieChartWidget
  from "../../components/charts/PieChartWidget";

import ConversionChart
  from "../../components/charts/ConversionChart";

export default function CRMDashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {crmKpiData.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Funnel + Lead Source */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Sales Funnel
          </h2>
          <FunnelChart data={crmFunnelData} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Lead Source
          </h2>
          <PieChartWidget data={crmLeadSourceData} />
        </div>

      </div>

      {/* Conversion Rate */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Conversion Rate
        </h2>
        <ConversionChart data={crmConversionData} />
      </div>

      {/* Opportunity Table */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-6">
          Cơ hội kinh doanh
        </h2>

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
              <tr
                key={row.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-3 font-medium">
                  {row.company}
                </td>

                <td className="py-3 text-slate-500">
                  {row.contact}
                </td>

                <td className="py-3 font-semibold text-blue-600">
                  {row.value}
                </td>

                <td className="py-3">
                  {row.stage}
                </td>

                <td className="py-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${row.status === "hot"
                      ? "bg-red-100 text-red-600"
                      : row.status === "warm"
                      ? "bg-orange-100 text-orange-600"
                      : row.status === "closed"
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 text-slate-600"
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
