import {
  warehouseAlertData,
} from "../../data/mockData/warehouseData";
import DashboardHeader from "../../components/dashboard/DashboardHeader";


type Props = { style: string };

export default function WarehouseDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="Warehouse Dashboard"
    description="Monitor revenue, orders and sales performance."
/>
      <div className={`rounded-2xl shadow p-6 ${
        style === "style4" ? "bg-slate-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          style === "style4" ? "text-white" : ""
        }`}>Cảnh báo tồn kho</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="pb-3">Sản phẩm</th>
              <th className="pb-3">Danh mục</th>
              <th className="pb-3">Tồn kho</th>
              <th className="pb-3">Tối thiểu</th>
              <th className="pb-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {warehouseAlertData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-slate-50">
                <td className="py-3 font-medium">{row.product}</td>
                <td className="py-3 text-slate-500">{row.category}</td>
                <td className="py-3 font-semibold">{row.stock}</td>
                <td className="py-3 text-slate-500">{row.minStock}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === "out"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                  }`}>
                    {row.status === "out" ? "Hết hàng" : "Sắp hết"}
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