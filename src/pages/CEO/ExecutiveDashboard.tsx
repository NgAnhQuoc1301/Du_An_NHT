import DashboardHeader from "../../components/ceo/DashboardHeader";
import FilterPanel from "../../components/ceo/FilterPanel";
import KPISection from "../../components/ceo/KPISection";
import ChartSection from "../../components/ceo/ChartSection";

export default function ExecutiveDashboard() {

    return (

        <div className="min-h-screen bg-slate-100">

            <DashboardHeader />

            <main className="mx-auto max-w-[1700px] p-6 space-y-6">

                <FilterPanel />

                <KPISection />

                <ChartSection />

            </main>

        </div>

    );

}