export default function AboutSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-slate-50 to-green-50/30 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-green-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-emerald-100/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="text-green-600 font-bold tracking-widest text-xs uppercase">
              ABOUT NHT SOLUTIONS
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-4 leading-tight bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 text-transparent bg-clip-text">
              Empowering Businesses Through<br />Digital Transformation
            </h2>

            <p className="mt-6 text-slate-600 leading-relaxed text-sm md:text-base">
              NHT Solutions delivers enterprise-grade ERP, CRM, Dashboard Analytics, 
              Mobile Applications and Digital Transformation Platforms helping 
              organizations optimize operations and accelerate growth.
            </p>
          </div>

          {/* RIGHT STATS */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

              <div className="bg-slate-50/60 border border-slate-100 p-6 rounded-2xl hover:border-green-600/30 hover:bg-white transition-all duration-300 group">
                <h3 className="text-3xl font-bold text-green-600">
                  100+
                </h3>
                <p className="text-slate-600 text-sm mt-1 font-medium group-hover:text-slate-800 transition-colors">
                  Projects Delivered
                </p>
              </div>

              <div className="bg-slate-50/60 border border-slate-100 p-6 rounded-2xl hover:border-green-600/30 hover:bg-white transition-all duration-300 group">
                <h3 className="text-3xl font-bold text-green-600">
                  12
                </h3>
                <p className="text-slate-600 text-sm mt-1 font-medium group-hover:text-slate-800 transition-colors">
                  Business Dashboards
                </p>
              </div>

              <div className="bg-slate-50/60 border border-slate-100 p-6 rounded-2xl hover:border-green-600/30 hover:bg-white transition-all duration-300 group">
                <h3 className="text-3xl font-bold text-green-600">
                  ERP
                </h3>
                <p className="text-slate-600 text-sm mt-1 font-medium group-hover:text-slate-800 transition-colors">
                  Enterprise Solutions
                </p>
              </div>

              <div className="bg-slate-50/60 border border-slate-100 p-6 rounded-2xl hover:border-green-600/30 hover:bg-white transition-all duration-300 group">
                <h3 className="text-3xl font-bold text-green-600">
                  CRM
                </h3>
                <p className="text-slate-600 text-sm mt-1 font-medium group-hover:text-slate-800 transition-colors">
                  Customer Management
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}