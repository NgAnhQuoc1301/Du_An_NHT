import { useParams } from "react-router-dom";
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

const selectedStyle =
  getDashboardStyle(dashboard.id) ||
  dashboard.style;

const metadata =
  dashboardMetadata[
    dashboard.id as keyof typeof dashboardMetadata
  ];
  const gallery =
  dashboardGallery[
    dashboard.id as keyof typeof dashboardGallery
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">

      <h1 className="text-5xl font-bold mb-6">
        {dashboard.name}
      </h1>
      <DashboardInfo
        solution={metadata.solution}
        description={metadata.description}
        businessValue={metadata.businessValue}
        tags={metadata.tags}
        currentStyle={selectedStyle}
      /> 
      <DashboardGallery
          images={gallery}
      />
      {dashboard.id === "crm" ? (
  <CRMDashboard />
) : dashboard.id === "sales" ? (
  <SalesDashboard />
) : dashboard.id === "ceo" ? (
  <CEODashboard />
) : dashboard.id === "warehouse" ? (
  <WarehouseDashboard />
) : (
  <DashboardRenderer
    style={selectedStyle}
    title={dashboard.name}
    widgets={dashboard.widgets}
  />
)}

    </div>
  );
}