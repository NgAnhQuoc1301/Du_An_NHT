export default function WhyChooseSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-slate-50 to-green-50/20 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-green-200/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-emerald-100/20 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 text-transparent bg-clip-text">
            Why Choose NHT
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Những thế mạnh vượt trội giúp NHT Solutions đồng hành bền vững cùng sự phát triển của doanh nghiệp.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* CARD 1 */}
          <div
            className="
              group
              p-8
              rounded-2xl
              bg-white
              border border-slate-200/80
              shadow-sm
              transition-all
              duration-300
              hover:border-green-600/30
              hover:shadow-[0_15px_40px_rgba(22,163,74,0.05)]
              hover:-translate-y-1
              flex flex-col justify-between
            "
          >
            <div>
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full mb-5 shadow-[0_0_12px_rgba(22,163,74,0.6)] transition-transform duration-300 group-hover:scale-125" />

              <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-green-600 transition-colors duration-200">
                Enterprise Solutions
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                Scalable architecture for business growth.
              </p>
            </div>

            <div className="mt-6 h-[2px] w-0 group-hover:w-1/2 transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-400" />
          </div>

          {/* CARD 2 */}
          <div
            className="
              group
              p-8
              rounded-2xl
              bg-white
              border border-slate-200/80
              shadow-sm
              transition-all
              duration-300
              hover:border-green-600/30
              hover:shadow-[0_15px_40px_rgba(22,163,74,0.05)]
              hover:-translate-y-1
              flex flex-col justify-between
            "
          >
            <div>
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full mb-5 shadow-[0_0_12px_rgba(22,163,74,0.6)] transition-transform duration-300 group-hover:scale-125" />

              <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-green-600 transition-colors duration-200">
                Real-Time Analytics
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                Monitor KPIs and performance instantly.
              </p>
            </div>

            <div className="mt-6 h-[2px] w-0 group-hover:w-1/2 transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-400" />
          </div>

          {/* CARD 3 */}
          <div
            className="
              group
              p-8
              rounded-2xl
              bg-white
              border border-slate-200/80
              shadow-sm
              transition-all
              duration-300
              hover:border-green-600/30
              hover:shadow-[0_15px_40px_rgba(22,163,74,0.05)]
              hover:-translate-y-1
              flex flex-col justify-between
            "
          >
            <div>
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full mb-5 shadow-[0_0_12px_rgba(22,163,74,0.6)] transition-transform duration-300 group-hover:scale-125" />

              <h3 className="font-bold text-lg mb-2 text-slate-800 group-hover:text-green-600 transition-colors duration-200">
                Responsive Design
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                Works across desktop, tablet and mobile.
              </p>
            </div>

            <div className="mt-6 h-[2px] w-0 group-hover:w-1/2 transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-400" />
          </div>

        </div>

      </div>
    </section>
  );
}