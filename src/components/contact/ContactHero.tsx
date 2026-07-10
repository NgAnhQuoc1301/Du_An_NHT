import { ArrowRight, MonitorSmartphone, BarChart2, PieChart, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactHero() {
  const solutions = [
    { label: "Naga ERP", path: "/solutions/naga-erp" },
    { label: "Naga CRM", path: "/solutions/naga-crm" },
    { label: "Dashboards", path: "/dashboards" },
    { label: "Naga AI", path: "/solutions/naga-ai" },
    { label: "Naga IoT", path: "/solutions/naga-iot" },
    { label: "My Naga", path: "/solutions/my-naga" },
  ];

  return (
    <section className="relative bg-slate-50 overflow-hidden font-sans pt-20 pb-28">
      
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-green-200/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-200/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-green-200 shadow-sm text-green-700 font-bold text-xs tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Đối Tác Chuyển Đổi Số
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
              Hệ Sinh Thái Giải Pháp <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Nagakawa
              </span>
            </h1>
      
            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-lg">
              Khám phá bộ giải pháp quản trị doanh nghiệp toàn diện bao gồm ERP, CRM, Dashboard Điều hành, App Mobile, Trợ lý AI và Nền tảng IoT được phát triển bởi <strong className="font-semibold text-slate-800">Nagakawa High Technology</strong>.
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-3 mt-8">
              {solutions.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-white
                    border
                    border-slate-200/80
                    text-slate-700
                    text-sm
                    font-semibold
                    hover:border-green-400
                    hover:text-green-600
                    hover:shadow-md
                    hover:shadow-green-900/5
                    hover:-translate-y-0.5
                    transition-all
                    duration-300
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CALL TO ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-8
                  py-4
                  rounded-2xl
                  bg-green-600
                  text-white
                  text-base
                  font-bold
                  shadow-xl shadow-green-600/20
                  hover:bg-green-700
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                Yêu cầu Tư Vấn
                <ArrowRight size={18} />
              </button>

              <Link
                to="/dashboards"
                className="
                  flex
                  items-center
                  justify-center
                  px-8
                  py-4
                  rounded-2xl
                  bg-white
                  border-2
                  border-slate-100
                  text-slate-700
                  text-base
                  font-bold
                  shadow-sm
                  hover:bg-slate-50
                  hover:border-green-600
                  hover:text-green-600
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                Thư viện Dashboard
              </Link>
            </div>
          </div>

          {/* RIGHT: Visual Card */}
          <div className="relative group">
            {/* Background glowing frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-emerald-300 rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-slate-200/50 rounded-[40px] p-10 transform group-hover:-translate-y-2 transition-transform duration-500">
              
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-600/30 text-white">
                  <MonitorSmartphone size={32} />
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
                Hệ thống Báo cáo <br/> Điều hành
              </h2>

              <p className="text-slate-500 text-lg font-light leading-relaxed mb-10">
                Cung cấp hệ thống Dashboard tương tác trực quan đa chiều dành cho Ban lãnh đạo: CEO, Tài chính, Nhân sự, Bán hàng và Sản xuất.
              </p>

              {/* Decorative mini-charts */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center gap-3">
                  <BarChart2 className="w-8 h-8 text-green-500" />
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center gap-3">
                  <PieChart className="w-8 h-8 text-emerald-500" />
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center gap-3">
                  <Activity className="w-8 h-8 text-green-600" />
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}