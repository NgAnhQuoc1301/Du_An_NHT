import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dashboardConfigs } from "../../data/dashboardConfigs";
import DashboardRenderer from "../../dashboards/DashboardRenderer";
import { getDashboardStyle } from "../../services/dashboardConfigService";
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

  const defaultStyle = dashboard
    ? getDashboardStyle(dashboard.id) || dashboard.style
    : "style1";

  const [selectedStyle, setSelectedStyle] = useState(defaultStyle);

  useEffect(() => {
    if (!dashboard) return;

    const handleStorageChange = () => {
      const newStyle =
        getDashboardStyle(dashboard.id) ||
        dashboard.style;
      setSelectedStyle(newStyle);
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dashboard?.id, dashboard?.style]);

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
          <DashboardRenderer
            style={selectedStyle}
            title={dashboard.name}
            widgets={dashboard.widgets}
          />
        );
    }
  };

  const NEW_STYLE_DASHBOARDS = ['ceo','sales','hr','finance','crm','kpi','production','project','task','warehouse','warranty','workflow'];

  return (
    <div className={NEW_STYLE_DASHBOARDS.includes(dashboard.id) ? "w-full min-h-screen bg-slate-50/50" : "max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6"}>
      {!NEW_STYLE_DASHBOARDS.includes(dashboard.id) && (
        <>
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-green-600 transition">Home</Link>
            <span>/</span>
            <Link to="/dashboards" className="hover:text-green-600 transition">Dashboards</Link>
            <span>/</span>
            <span className="text-slate-600 font-medium">{dashboard.name}</span>
          </div>   
          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-5xl font-bold">
              {dashboard.name}
            </h1>
            <Link
              to="/dashboard-settings"
              className="
                flex items-center gap-2
                px-5 py-2.5
                rounded-xl
                bg-green-600 hover:bg-green-700
                text-white
                text-sm
                font-semibold
                shadow-lg shadow-cyan-500/30
                hover:from-cyan-400 hover:to-blue-500
                transition-all
                duration-300
              "
            >
              ⚙ Dashboard Settings
            </Link>
          </div>
        </>
      )}

      {renderDashboard()}

    </div>
  );
}