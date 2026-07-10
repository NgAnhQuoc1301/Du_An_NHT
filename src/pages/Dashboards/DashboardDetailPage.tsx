import { useParams } from "react-router-dom";
import { dashboardConfigs } from "../../data/dashboardConfigs";
import CRMDashboard from "../../dashboards/dashboardPages/CRMDashboard";
import SalesDashboard from "../../dashboards/dashboardPages/SalesDashboard";
import CEODashboard from "../../dashboards/dashboardPages/CEODashboard";
import WarehouseDashboard from "../../dashboards/dashboardPages/WarehouseDashboard";
import HRDashboard from "../../dashboards/dashboardPages/HRDashboard";
import FinanceDashboard from "../../dashboards/dashboardPages/FinanceDashboard";
import KPIDashboard from "../../dashboards/dashboardPages/KPIDashboard";
import ProductionDashboard from "../../dashboards/dashboardPages/ProductionDashboard";
import WarrantyDashboard from "../../dashboards/dashboardPages/WarrantyDashboard";
import ProjectDashboard from "../../dashboards/dashboardPages/ProjectDashboard";
import WorkflowDashboard from "../../dashboards/dashboardPages/WorkflowDashboard";
import TaskDashboard from "../../dashboards/dashboardPages/TaskDashboard";

export default function DashboardDetailPage() {

  const { slug } = useParams();

  const dashboard = dashboardConfigs.find(
    (item) => item.id === slug
  );

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 text-lg">
          Dashboard not found
        </p>
      </div>
    );
  }

  // Dashboard metadata available if needed for future use

  const renderDashboard = () => {
    switch (dashboard.id) {
      case "crm":        return <CRMDashboard />;
      case "sales":      return <SalesDashboard />;
      case "ceo":        return <CEODashboard />;
      case "warehouse":  return <WarehouseDashboard />;
      case "hr":         return <HRDashboard />;
      case "finance":    return <FinanceDashboard />;
      case "kpi":        return <KPIDashboard />;
      case "production": return <ProductionDashboard />;
      case "warranty":   return <WarrantyDashboard />;
      case "project":    return <ProjectDashboard />;
      case "workflow":   return <WorkflowDashboard />;
      case "task":       return <TaskDashboard />;
      default:
        return (
          <div className="flex justify-center items-center h-96">
            <p className="text-slate-500">Dashboard is under construction</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      {renderDashboard()}
    </div>
  );
}