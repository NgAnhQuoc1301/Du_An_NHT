import {
  productionKpiData,
  productionAlertData,
} from "../../data/mockData/productionData";
type Props = { style: string };
import StyleKpiCard from "../../components/common/StyleKpiCard";
export default function ProductionDashboard({ style }: Props) {
  return (
    <div className="p-6 space-y-8">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {productionKpiData.map((kpi) => (
        <StyleKpiCard key={kpi.id} {...kpi} style={style} />
                ))}
              </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Production Alerts
        </h2>
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
              <tr
                key={row.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-3 font-medium">
                  {row.line}
                </td>
                <td className="py-3 text-slate-500">
                  {row.issue}
                </td>
                <td className="py-3 text-slate-500">
                  {row.time}
                </td>
                <td className="py-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${row.severity === "high"
                      ? "bg-red-100 text-red-600"
                      : row.severity === "medium"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                    }
                  `}>
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
