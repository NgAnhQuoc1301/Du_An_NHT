import {
  salesKpiData,
} from "../../data/mockData/salesData";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StyleKpiCard from "../../components/common/StyleKpiCard";

type Props = { style: string };

export default function SalesDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
<DashboardHeader
    title="Sales Dashboard"
    description="Monitor revenue, orders and sales performance."
/>
      <div className="grid grid-cols-2 gap-6">
        {salesKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>
    </div>
  );
}