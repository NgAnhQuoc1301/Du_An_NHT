import { Link } from "react-router-dom";

import { dashboardConfigs } from "../../data/dashboardConfigs";
import { dashboardMetadata } from "../../data/dashboardMetadata";
import { dashboardPreview } from "../../data/dashboardPreview";

export default function DashboardShowcase() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-emerald-50 to-green-100 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-green-300/30 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-green-200/40 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-700 via-green-500 to-green-400 text-transparent bg-clip-text">
          Dashboard Library
        </h2>

        <p className="text-center text-gray-600 mb-12">
          12 enterprise dashboards designed for decision makers
        </p>

        {/* GRID */}
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
                    bg-white
                    border border-green-200
                    backdrop-blur-xl
                    rounded-2xl
                    overflow-hidden
                    shadow-md
                    transition-all
                    duration-300
                    hover:border-green-400
                    hover:shadow-lg
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

                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition">
                      {dashboard.name}
                    </h3>

                    <p className="text-green-600 text-sm mt-2 font-medium">
                      {meta?.category}
                    </p>

                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
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