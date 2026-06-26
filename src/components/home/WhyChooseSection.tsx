export default function WhyChooseSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-cyan-500/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 text-transparent bg-clip-text">
          Why Choose NHT
        </h2>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="
            group
            p-8
            rounded-2xl
            bg-white/5
            border border-cyan-400/15
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-cyan-400/40
            hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
            hover:-translate-y-1
          ">
            <div className="w-3 h-3 bg-cyan-400 rounded-full mb-4 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            <h3 className="font-bold mb-3 group-hover:text-cyan-300 transition">
              Enterprise Solutions
            </h3>

            <p className="text-slate-300 text-sm leading-6">
              Scalable architecture for business growth.
            </p>

            <div className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-blue-500" />
          </div>

          {/* CARD 2 */}
          <div className="
            group
            p-8
            rounded-2xl
            bg-white/5
            border border-cyan-400/15
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-cyan-400/40
            hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
            hover:-translate-y-1
          ">
            <div className="w-3 h-3 bg-cyan-400 rounded-full mb-4 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            <h3 className="font-bold mb-3 group-hover:text-cyan-300 transition">
              Real-Time Analytics
            </h3>

            <p className="text-slate-300 text-sm leading-6">
              Monitor KPIs and performance instantly.
            </p>

            <div className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-blue-500" />
          </div>

          {/* CARD 3 */}
          <div className="
            group
            p-8
            rounded-2xl
            bg-white/5
            border border-cyan-400/15
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-cyan-400/40
            hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
            hover:-translate-y-1
          ">
            <div className="w-3 h-3 bg-cyan-400 rounded-full mb-4 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            <h3 className="font-bold mb-3 group-hover:text-cyan-300 transition">
              Responsive Design
            </h3>

            <p className="text-slate-300 text-sm leading-6">
              Works across desktop, tablet and mobile.
            </p>

            <div className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-blue-500" />
          </div>

        </div>

      </div>
    </section>
  );
}