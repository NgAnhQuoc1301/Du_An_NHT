import RevenueTrendChart from "../charts/RevenueTrendChart";
import EnterpriseRadarChart from "../charts/EnterpriseRadarChart";
import ProjectStatusChart from "../charts/ProjectStatusChart";
import RevenueRegionChart from "../charts/RevenueRegionChart";
export default function ChartSection() {
  return (
    <section className="space-y-6">

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RevenueTrendChart />

        <EnterpriseRadarChart />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <ProjectStatusChart />

        <RevenueRegionChart />

      </div>

    </section>
  );
}