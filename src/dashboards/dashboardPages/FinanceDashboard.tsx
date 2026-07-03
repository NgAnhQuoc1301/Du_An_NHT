import {
  financeKpiData,
} from "../../data/mockData/financeData";
import StyleKpiCard from "../../components/common/StyleKpiCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
type Props = { style: string };

export default function FinanceDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="Finance Dashboard"
    description="Monitor revenue, orders and sales performance."
/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {financeKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>
    </div>
  );
}