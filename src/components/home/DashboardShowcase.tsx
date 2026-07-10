import { Link } from "react-router-dom";
import { dashboardConfigs } from "../../data/dashboardConfigs";
import { dashboardMetadata } from "../../data/dashboardMetadata";
import { getCategoryIcon, getCategoryGradient } from "../../pages/Dashboards/DashboardLibraryPage";

export default function DashboardShowcase() {
  // Chỉ lấy tối đa 4 dashboard đầu tiên để hiển thị ở trang chủ cho gọn gàng
  const featuredDashboards = dashboardConfigs.slice(0, 4);

  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-slate-50 to-green-50/30 overflow-hidden font-sans">
      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-green-200/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-green-100/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-green-900 text-transparent bg-clip-text pb-2">
            Thư viện Dashboard Demo
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 max-w-xl mx-auto font-light">
            Khám phá 12 mẫu dashboard quản trị doanh nghiệp chuyên sâu được thiết kế chuyên biệt cho Ban lãnh đạo.
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
                    border border-slate-100
                    rounded-[24px]
                    overflow-hidden
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-green-500/30
                    hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.15)]
                    hover:-translate-y-1.5
                    flex flex-col w-full
                    relative
                  "
                >
                  {/* Decorative top border */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${getCategoryGradient(meta?.category).split(' ')[0]} ${getCategoryGradient(meta?.category).split(' ')[1]} transition-all duration-300 opacity-90`} />

                  <div className="p-6 flex flex-col flex-grow">
                    {/* ICON BLOCK */}
                    <div className="mb-6 flex justify-between items-start">
                      <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center
                        bg-gradient-to-br ${getCategoryGradient(meta?.category)}
                        shadow-md group-hover:scale-110 group-hover:rotate-6
                        transition-all duration-500
                      `}>
                        {getCategoryIcon(meta?.category, "w-7 h-7 text-white")}
                      </div>
                      
                      <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full group-hover:text-green-600 group-hover:bg-green-50 group-hover:border-green-100 transition-colors">
                        {meta?.category || "Enterprise"}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-[17px] text-slate-800 group-hover:text-green-600 transition-colors duration-200 line-clamp-1 mb-2.5 leading-tight">
                        {dashboard.name}
                      </h3>

                      <p className="text-slate-500 text-[13px] line-clamp-2 leading-relaxed font-normal">
                        {meta?.description}
                      </p>
                    </div>

                    {/* Mũi tên dẫn hướng */}
                    <div className="mt-auto pt-8 flex items-center gap-1.5 text-sm font-bold text-green-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span>Mở Dashboard</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>

                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="flex justify-center mt-16">
          <Link
            to="/dashboards"
            className="
              inline-flex items-center justify-center gap-2
              bg-green-800 text-white
              px-8 py-3.5
              rounded-2xl
              text-[15px] font-semibold
              shadow-xl shadow-green-800/20
              hover:bg-green-600
              hover:shadow-green-600/30
              hover:-translate-y-0.5
              transition-all duration-300
            "
          >
            Khám phá toàn bộ 12 Dashboards
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}