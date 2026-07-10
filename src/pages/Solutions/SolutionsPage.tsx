import { Link } from "react-router-dom";
import { solutionsData } from "../../data/solutionsData";
import { Database, Smartphone, LayoutDashboard, ShieldCheck, ArrowRight } from "lucide-react";
import React from "react";

// Ánh xạ icon tương ứng với từng giải pháp
const iconMap: Record<string, React.ElementType> = {
  "naga-erp": Database,
  "my-naga": Smartphone,
  "naga-dashboards": LayoutDashboard,
  "naga-warranty": ShieldCheck,
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50/50 to-white font-sans">

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-16">
        
        {/* Glow Effects */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-green-200/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-emerald-200/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200/60 text-green-700 font-bold text-xs md:text-sm tracking-wide shadow-sm mb-6">
            Hệ sinh thái Nagakawa
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Chuyển đổi số với <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              Giải pháp Toàn diện
            </span>
          </h1>

          <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Khám phá sức mạnh của công nghệ thông qua các nền tảng quản trị được thiết kế riêng biệt nhằm tối ưu hóa mọi quy trình hoạt động của doanh nghiệp bạn.
          </p>

        </div>
      </div>

      {/* Solutions Grid */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pb-28 z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {solutionsData.map((solution) => {
            const IconComponent = iconMap[solution.id] || LayoutDashboard;
            
            return (
              <Link
                key={solution.id}
                to={`/solutions/${solution.id}`}
                className="group relative flex flex-col bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(22,163,74,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(22,163,74,0.2)] hover:border-green-200 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-50 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

                {/* Header: Icon & Badge */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-500">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold group-hover:bg-green-50 group-hover:text-green-600 group-hover:border-green-200 transition-colors">
                    {solution.dashboards.length} Modules
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                    {solution.name}
                  </h3>
                  <h4 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">
                    {solution.tagline}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-light mb-8">
                    {solution.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="relative z-10 pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                    Khám phá chi tiết
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Bottom Animated Border */}
                <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-700 ease-out"></div>
                
              </Link>
            );
          })}
          
        </div>
        
      </div>
      
    </div>
  );
}