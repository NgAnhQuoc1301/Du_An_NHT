import {
  kpiCardsData,
} from "../../data/mockData/kpiData";
import StyleKpiCard from "../../components/common/StyleKpiCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
type Props = { style: string };

export default function KPIDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="KPI Dashboard"
    description="Monitor key performance indicators and trends."
/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCardsData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
                          ))}
      </div>
    </div>
  );
}