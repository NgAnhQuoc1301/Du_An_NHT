import {
  warrantyKpiData,
  warrantyTrendData,
  warrantyTypeData,
  warrantyRequestData,
} from "../../data/mockData/warrantyData";
import KpiCard from "../../components/common/KpiCard";
import ConversionChart
  from "../../components/charts/ConversionChart";

import PieChartWidget
  from "../../components/charts/PieChartWidget";

export default function WarrantyDashboard() {
  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {warrantyKpiData.map((kpi) => (
  <KpiCard key={kpi.id} {...kpi} />
))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Warranty Requests Trend
          </h2>
          <ConversionChart data={warrantyTrendData} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Warranty By Type
          </h2>
          <PieChartWidget data={warrantyTypeData} />
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Warranty Requests
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-3">Khách hàng</th>
              <th className="pb-3">Sản phẩm</th>
              <th className="pb-3">Vấn đề</th>
              <th className="pb-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {warrantyRequestData.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-3 font-medium">
                  {row.customer}
                </td>
                <td className="py-3 text-slate-500">
                  {row.product}
                </td>
                <td className="py-3 text-slate-500">
                  {row.issue}
                </td>
                <td className="py-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${row.status === "resolved"
                      ? "bg-green-100 text-green-600"
                      : row.status === "processing"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-orange-100 text-orange-600"
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
