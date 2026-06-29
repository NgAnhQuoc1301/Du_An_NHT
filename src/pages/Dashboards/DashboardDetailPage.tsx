import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dashboardMetadata } from "../../data/dashboardMetadata";
import { dashboardConfigs } from "../../data/dashboardConfigs";
import DashboardRenderer from "../../dashboards/DashboardRenderer";
import { getDashboardStyle } from "../../services/dashboardConfigService";
import DashboardInfo from "../../components/dashboardDetail/DashboardInfo";
import DashboardGallery from "../../components/dashboardDetail/DashboardGallery";
import { dashboardGallery } from "../../data/dashboardGallery";
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
      <div className="p-10">
        Dashboard not found
      </div>
    );
  }

  const [selectedStyle, setSelectedStyle] = useState(
  getDashboardStyle(dashboard.id) || dashboard.style
);
  useEffect(() => {
    const handleStorageChange = () => {
      const newStyle =
        getDashboardStyle(dashboard.id) ||
        dashboard.style;
      setSelectedStyle(newStyle);
    };

    window.addEventListener("storage", handleStorageChange);

    // Đọc lại mỗi khi vào trang
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dashboard.id, dashboard.style]);
  const metadata =
    dashboardMetadata[
      dashboard.id as keyof typeof dashboardMetadata
    ];

  const gallery =
    dashboardGallery[
      dashboard.id as keyof typeof dashboardGallery
    ];

  const renderDashboard = () => {
    switch (dashboard.id) {
      case "crm":       return <CRMDashboard />;
      case "sales":     return <SalesDashboard />;
      case "ceo":       return <CEODashboard />;
      case "warehouse": return <WarehouseDashboard />;
      case "hr":        return <HRDashboard />;
      case "finance":   return <FinanceDashboard />;
      case "kpi":       return <KPIDashboard />;
      case "production":return <ProductionDashboard />;
      case "warranty":  return <WarrantyDashboard />;
      case "project":   return <ProjectDashboard />;
      case "workflow":  return <WorkflowDashboard />;
      case "task":      return <TaskDashboard />;
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

  return (
    <div className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6">

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
            bg-gradient-to-r from-cyan-500 to-blue-600
            text-white
            text-sm
            font-semibold
            shadow-lg shadow-cyan-500/30
            hover:from-cyan-400 hover:to-blue-500
            hover:shadow-cyan-400/40
            transition-all
            duration-300
          "
        >
          ⚙ Dashboard Settings
        </Link>

      </div>

      <DashboardInfo
        solution={metadata.solution}
        description={metadata.description}
        businessValue={metadata.businessValue}
        tags={metadata.tags}
        currentStyle={selectedStyle}
      />

      <DashboardGallery images={gallery} />

      {renderDashboard()}

    </div>
  );
}