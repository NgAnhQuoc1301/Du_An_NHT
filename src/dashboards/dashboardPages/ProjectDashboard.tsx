import {
  projectKpiData,
} from "../../data/mockData/projectData";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StyleKpiCard from "../../components/common/StyleKpiCard";

type Props = { style: string };

export default function ProjectDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
      <DashboardHeader
    title="Project Dashboard"
    description="Monitor project progress, status and performance."
/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {projectKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>
    </div>
  );
}