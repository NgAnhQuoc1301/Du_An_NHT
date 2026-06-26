import {
  warehouseKpiData,
  warehouseCategoryData,
  warehouseAlertData,
} from "../../data/mockData/warehouseData";

import BarChartWidget
  from "../../components/charts/BarChartWidget";

export default function WarehouseDashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {warehouseKpiData.map((kpi) => (
          <div
            key={kpi.id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <p className="text-sm text-slate-500">
              {kpi.title}
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {kpi.value}
            </h3>

            <p className={`text-sm mt-2 font-medium ${
              kpi.positive
                ? "text-green-500"
                : "text-red-500"
            }`}>
              {kpi.change} so với tháng trước
            </p>
          </div>
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