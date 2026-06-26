import { Link } from "react-router-dom";

import { dashboardPreview } from "../../data/dashboardPreview";
import { dashboardConfigs } from "../../data/dashboardConfigs";
import { dashboardMetadata } from "../../data/dashboardMetadata";
import { countWidgets } from "../../utils/dashboardUtils";

export default function DashboardLibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Dashboard Library
        </h1>

        <p className="text-slate-300 mb-12">
          Explore business dashboards developed by NHT Solutions.
        </p>

        {/* GRID - 6 ITEMS / ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          
          {dashboardConfigs.map((dashboard) => {
            const meta =
              dashboardMetadata[
                dashboard.id as keyof typeof dashboardMetadata
              ];

            const stats = countWidgets(dashboard.widgets);

            return (
              <Link
                key={dashboard.id}
                to={`/dashboards/${dashboard.id}`}
                className="group"
              >
                <div
                  className="
                    bg-white/5
                    backdrop-blur-lg
                    border border-cyan-400/20
                    rounded-2xl
                    p-4
                    hover:border-cyan-400/50
                    hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
                    transition-all
                    duration-300
                    h-full
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={
                      dashboardPreview[
                        dashboard.id as keyof typeof dashboardPreview
                      ]
                    }
                    alt={dashboard.name}
                    className="
                      h-28
                      w-full
                      object-cover
                      rounded-xl
                      mb-3
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  />

                  {/* TITLE */}
                  <h3 className="font-bold text-sm text-white">
                    {dashboard.name}
                  </h3>

                  {/* CATEGORY */}
                  <p className="text-cyan-400 text-xs mt-1">
                    {meta?.category}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                    {meta?.description}
                  </p>

                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {stats.total}
                      </p>
                      <p className="text-[10px] text-slate-400">Widgets</p>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        {stats.kpi}
                      </p>
                      <p className="text-[10px] text-slate-400">KPI</p>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        {stats.chart}
                      </p>
                      <p className="text-[10px] text-slate-400">Charts</p>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        {stats.table}
                      </p>
                      <p className="text-[10px] text-slate-400">Tables</p>
                    </div>
                  </div>

                  {/* STYLE */}
                  <p className="mt-3 text-[11px] text-slate-500">
                    Style:{" "}
                    <span className="text-cyan-300">
                      {dashboard.style}
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
}