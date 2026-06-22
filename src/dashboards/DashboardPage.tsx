import { useParams } from "react-router-dom";
import DashboardRenderer from "./DashboardRenderer";
import { dashboardConfigs } from "../data/dashboardConfigs";

export default function DashboardPage() {

  const { id } = useParams();

  const dashboard =
    dashboardConfigs.find(
      (x) => x.id === id
    );

  if (!dashboard) {
    return <div>Not Found</div>;
  }

  return (
    <DashboardRenderer
      title={dashboard.name}
      style={dashboard.style}
    />
  );
}