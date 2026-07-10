import { Link } from "react-router-dom";
import { ArrowRight, LayoutDashboard, MonitorSmartphone, Database } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/50 to-white min-h-[90vh] flex items-center font-sans">

      {/* Modern Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-300/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-300/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200/60 text-green-700 font-bold text-xs md:text-sm tracking-wide shadow-sm mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
              </span>
              Nền tảng Chuyển đổi số Toàn diện
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Tối ưu vận hành với <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Nagakawa ERP</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 font-light">
              Hệ sinh thái công nghệ đột phá bao gồm Quản trị Doanh nghiệp (ERP), Quản lý Khách hàng (CRM), và Thư viện Dashboard phân tích trực quan dành riêng cho Ban Lãnh đạo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/dashboards"
                className="group flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-2xl text-[15px] font-bold shadow-xl shadow-green-600/20 hover:bg-green-700 hover:shadow-green-600/30 hover:-translate-y-1 transition-all duration-300"
              >
                Trải nghiệm Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/solutions"
                className="flex items-center justify-center px-8 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-700 text-[15px] font-bold shadow-sm hover:border-green-600 hover:text-green-600 hover:bg-green-50/50 hover:-translate-y-1 transition-all duration-300"
              >
                Khám phá Giải pháp
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-70">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-black text-slate-800">12+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Dashboards</span>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-black text-slate-800">50K+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Dữ liệu mẫu</span>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-black text-slate-800">100%</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Tùy biến</span>
              </div>
            </div>
          </div>

          {/* Right Visuals - Floating Cards */}
          <div className="relative hidden lg:block h-[500px] w-full">
            {/* Main Center Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-3xl p-6 shadow-[0_20px_50px_-15px_rgba(22,163,74,0.3)] border border-white/50 z-20 hover:-translate-y-6 transition-transform duration-500">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                <LayoutDashboard className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Executive Dashboard</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">Giám sát toàn diện dữ liệu doanh nghiệp theo thời gian thực.</p>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-3/4 rounded-full"></div>
              </div>
            </div>

            {/* Floating Left Card */}
            <div className="absolute top-[10%] left-0 w-64 bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] border border-slate-100/50 z-10 animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">ERP System</h4>
                  <p className="text-slate-400 text-xs">Syncing data...</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                <div className="h-1.5 w-4/5 bg-slate-100 rounded-full"></div>
              </div>
            </div>

            {/* Floating Right Card */}
            <div className="absolute bottom-[10%] right-[-5%] w-72 bg-slate-900 rounded-3xl p-6 shadow-[0_25px_45px_-15px_rgba(22,163,74,0.4)] z-30">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MonitorSmartphone className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">My Naga App</h4>
                  <p className="text-green-400/80 text-xs font-medium">Online</p>
                </div>
              </div>
              <Link to="/solutions" className="block w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold text-center transition-colors">
                Xem chi tiết
              </Link>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full border border-green-200/50 -z-10"></div>
            <div className="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full border border-emerald-200/50 -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}