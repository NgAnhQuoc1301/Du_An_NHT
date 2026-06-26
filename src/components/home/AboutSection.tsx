export default function AboutSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="text-cyan-400 font-semibold tracking-widest text-sm">
              ABOUT NHT SOLUTIONS
            </span>

            <h2 className="text-4xl font-bold mt-4 leading-snug bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 text-transparent bg-clip-text">
              Empowering Businesses Through
              Digital Transformation
            </h2>

            <p className="mt-6 text-slate-300 leading-8">
              NHT Solutions delivers enterprise-grade
              ERP, CRM, Dashboard Analytics,
              Mobile Applications and Digital
              Transformation Platforms helping
              organizations optimize operations
              and accelerate growth.
            </p>
          </div>

          {/* RIGHT STATS */}
          <div className="bg-white/5 border border-cyan-400/20 backdrop-blur-xl rounded-3xl p-10 shadow-[0_0_30px_rgba(34,211,238,0.15)]">

            <div className="grid grid-cols-2 gap-6">

              <div className="bg-white/5 border border-cyan-400/10 p-6 rounded-xl hover:border-cyan-400/40 transition">
                <h3 className="text-3xl font-bold text-cyan-300">
                  100+
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Projects Delivered
                </p>
              </div>

              <div className="bg-white/5 border border-cyan-400/10 p-6 rounded-xl hover:border-cyan-400/40 transition">
                <h3 className="text-3xl font-bold text-cyan-300">
                  12
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Business Dashboards
                </p>
              </div>

              <div className="bg-white/5 border border-cyan-400/10 p-6 rounded-xl hover:border-cyan-400/40 transition">
                <h3 className="text-3xl font-bold text-cyan-300">
                  ERP
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Enterprise Solutions
                </p>
              </div>

              <div className="bg-white/5 border border-cyan-400/10 p-6 rounded-xl hover:border-cyan-400/40 transition">
                <h3 className="text-3xl font-bold text-cyan-300">
                  CRM
                </h3>
                <p className="text-slate-300 text-sm mt-1">
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