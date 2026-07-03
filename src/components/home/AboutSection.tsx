export default function AboutSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-emerald-50 to-green-100 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-green-300/30 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-green-200/40 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="text-green-600 font-semibold tracking-widest text-sm">
              ABOUT NHT SOLUTIONS
            </span>

            <h2 className="text-4xl font-bold mt-4 leading-snug bg-gradient-to-r from-green-700 via-green-500 to-green-400 text-transparent bg-clip-text">
              Empowering Businesses Through
              Digital Transformation
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              NHT Solutions delivers enterprise-grade
              ERP, CRM, Dashboard Analytics,
              Mobile Applications and Digital
              Transformation Platforms helping
              organizations optimize operations
              and accelerate growth.
            </p>
          </div>

          {/* RIGHT STATS */}
          <div className="bg-white border border-green-200 backdrop-blur-xl rounded-3xl p-10 shadow-lg">

            <div className="grid grid-cols-2 gap-6">

              <div className="bg-green-50 border border-green-200 p-6 rounded-xl hover:border-green-400 transition">
                <h3 className="text-3xl font-bold text-cyan-300">
                  100+
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Projects Delivered
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-xl hover:border-green-400 transition">
                <h3 className="text-3xl font-bold text-green-600">
                  12
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Business Dashboards
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-xl hover:border-green-400 transition">
                <h3 className="text-3xl font-bold text-cyan-300">
                  ERP
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Enterprise Solutions
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-xl hover:border-green-400 transition">
                <h3 className="text-3xl font-bold text-cyan-300">
                  CRM
                </h3>
                <p className="text-gray-600 text-sm mt-1">
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