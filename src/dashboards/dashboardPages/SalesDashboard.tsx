import {
    salesKpiData,
    salesRevenueTrendData,
    salesByEmployeeData,
    salesTopProducts,
    salesKpiListData,
} from "../../data/mockData/sales"; 
import StyleKpiCard from "../../components/common/StyleKpiCard";
import DashboardKpiSection from "../../components/dashboard/DashboardKpiSection";

type Props = { style: string };

export default function SalesDashboard({ style }: Props) {
  return (
    <div className={`p-6 space-y-8 ${
      style === "style4" ? "bg-slate-900 rounded-2xl" : ""
    }`}>
    <DashboardKpiSection
    items={salesKpiData}
/>
      <div className="grd grid-cols-2 gap-6">
        {salesKpiData.map((kpi) => (
          <StyleKpiCard key={kpi.id} {...kpi} style={style} />
        ))}
      </div>  
    </div>
  );
}