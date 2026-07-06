import { Link } from "react-router-dom";

import { dashboardConfigs } from "../../data/dashboardConfigs";
import { dashboardMetadata } from "../../data/dashboardMetadata";
import { dashboardPreview } from "../../data/dashboardPreview";

export default function DashboardShowcase() {
  // Chỉ lấy tối đa 4 dashboard đầu tiên để hiển thị ở trang chủ cho gọn gàng
  const featuredDashboards = dashboardConfigs.slice(0, 4);

  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-slate-50 to-green-50/20 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-green-200/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-emerald-100/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 text-transparent bg-clip-text">
            Dashboard Library
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Explore our 12 enterprise dashboards designed for decision makers.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          {featuredDashboards.map((dashboard) => {
            const meta = dashboardMetadata[dashboard.id as keyof typeof dashboardMetadata];

            return (
              <Link
                key={dashboard.id}
                to={`/dashboards/${dashboard.id}`}
                className="group flex"
              >
                <div
                  className="
                    bg-white
                    border border-slate-200/80
                    rounded-2xl
                    overflow-hidden
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-green-600/30
                    hover:shadow-[0_15px_40px_rgba(22,163,74,0.05)]
                    hover:-translate-y-1
                    flex flex-col w-full
                  "
                >

                  {/* IMAGE */}
                  <div className="h-44 w-full overflow-hidden relative bg-slate-50">
                    <img
                      src={dashboardPreview[dashboard.id as keyof typeof dashboardPreview]}
                      alt={dashboard.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-green-600 tracking-wider uppercase bg-green-50 px-2.5 py-1 rounded-md inline-block mb-3">
                        {meta?.category || "Enterprise"}
                      </span>

                      <h3 className="font-bold text-base md:text-lg text-slate-800 group-hover:text-green-600 transition-colors duration-200 line-clamp-1">
                        {dashboard.name}
                      </h3>

                      <p className="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                        {meta?.description}
                      </p>
                    </div>

                    {/* Mũi tên dẫn hướng nhỏ dưới chân card */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-green-600 mt-5 transition-colors duration-200">
                      View Dashboard 
                      <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>

                  </div>

                </div>
              </Link>
            );
          })}

        </div>

        {/* VIEW ALL BUTTON */}
        <div className="flex justify-center mt-14">
          <Link
            to="/dashboards"
            className="
              inline-flex items-center justify-center
              bg-white
              border border-slate-200
              text-slate-700
              px-8 py-3.5
              rounded-xl
              text-sm
              font-semibold
              shadow-sm
              hover:bg-slate-50
              hover:border-green-600
              hover:text-green-600
              transition-all
              duration-300
            "
          >
            Explore All 12 Dashboards
          </Link>
        </div>

      </div>
    </section>
  );
}