import {
  warehouseKpiData,
  warehouseCategoryData,
  warehouseAlertData,
} from "../../data/mockData/warehouseData";
import KpiCard from "../../components/common/KpiCard";
import BarChartWidget
  from "../../components/charts/BarChartWidget";

export default function WarehouseDashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {warehouseKpiData.map((kpi) => (
  <KpiCard key={kpi.id} {...kpi} />
))}
      </div>

      {/* Category Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Cơ cấu hàng tồn theo danh mục
        </h2>
        <BarChartWidget
          data={warehouseCategoryData.map((item) => ({
            name: item.name,
            revenue: item.value,
            color: item.color,
          }))}
        />
      </div>

      {/* Alert Table */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-6">
          Cảnh báo tồn kho
        </h2>

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-3">Sản phẩm</th>
              <th className="pb-3">Danh mục</th>
              <th className="pb-3">Tồn kho</th>
              <th className="pb-3">Tồn kho tối thiểu</th>
              <th className="pb-3">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {warehouseAlertData.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-3 font-medium">
                  {row.product}
                </td>

                <td className="py-3 text-slate-500">
                  {row.category}
                </td>

                <td className="py-3 font-semibold">
                  {row.stock}
                </td>

                <td className="py-3 text-slate-500">
                  {row.minStock}
                </td>

                <td className="py-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${row.status === "out"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                    }
                  `}>
                    {row.status === "out"
                      ? "Hết hàng"
                      : "Sắp hết"
                    }
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
