import { Link } from "react-router-dom";

import { dashboardConfigs } from "../../data/dashboardConfigs";
import { dashboardMetadata } from "../../data/dashboardMetadata";
import { dashboardPreview } from "../../data/dashboardPreview";

export default function DashboardShowcase() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-cyan-500/20 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 text-transparent bg-clip-text">
          Dashboard Library
        </h2>

        <p className="text-center text-slate-300 mb-12">
          12 enterprise dashboards designed for decision makers
        </p>

        {/* GRID (giữ logic cũ) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {dashboardConfigs.map((dashboard) => {
            const meta =
              dashboardMetadata[
                dashboard.id as keyof typeof dashboardMetadata
              ];

            return (
              <Link
                key={dashboard.id}
                to={`/dashboards/${dashboard.id}`}
                className="group"
              >
                <div
                  className="
                    bg-white/5
                    border border-cyan-400/15
                    backdrop-blur-xl
                    rounded-2xl
                    overflow-hidden
                    transition-all
                    duration-300
                    hover:border-cyan-400/40
                    hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
                    hover:-translate-y-1
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
                      h-44
                      w-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  />

                  {/* CONTENT */}
                  <div className="p-5">

                    <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition">
                      {dashboard.name}
                    </h3>

                    <p className="text-cyan-400 text-sm mt-2">
                      {meta?.category}
                    </p>

                    <p className="text-slate-300 text-sm mt-2 line-clamp-2">
                      {meta?.description}
                    </p>

                  </div>

                </div>
              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}