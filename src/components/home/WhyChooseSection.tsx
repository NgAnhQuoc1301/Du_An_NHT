export default function WhyChooseSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-emerald-50 to-green-100 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-green-300/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-green-200/40 blur-[160px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-green-700 via-green-500 to-green-400 text-transparent bg-clip-text">
          Why Choose NHT
        </h2>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div
            className="
              group
              p-8
              rounded-2xl
              bg-white
              border border-green-200
              backdrop-blur-xl
              shadow-md
              transition-all
              duration-300
              hover:border-green-400
              hover:shadow-lg
              hover:-translate-y-1
            "
          >
            <div className="w-3 h-3 bg-green-500 rounded-full mb-4 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />

            <h3 className="font-bold mb-3 text-gray-800 group-hover:text-green-600 transition">
              Enterprise Solutions
            </h3>

            <p className="text-gray-600 text-sm leading-6">
              Scalable architecture for business growth.
            </p>

            <div className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-green-500 to-green-300" />
          </div>

          {/* CARD 2 */}
          <div
            className="
              group
              p-8
              rounded-2xl
              bg-white
              border border-green-200
              backdrop-blur-xl
              shadow-md
              transition-all
              duration-300
              hover:border-green-400
              hover:shadow-lg
              hover:-translate-y-1
            "
          >
            <div className="w-3 h-3 bg-green-500 rounded-full mb-4 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />

            <h3 className="font-bold mb-3 text-gray-800 group-hover:text-green-600 transition">
              Real-Time Analytics
            </h3>

            <p className="text-gray-600 text-sm leading-6">
              Monitor KPIs and performance instantly.
            </p>

            <div className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-green-500 to-green-300" />
          </div>

          {/* CARD 3 */}
          <div
            className="
              group
              p-8
              rounded-2xl
              bg-white
              border border-green-200
              backdrop-blur-xl
              shadow-md
              transition-all
              duration-300
              hover:border-green-400
              hover:shadow-lg
              hover:-translate-y-1
            "
          >
            <div className="w-3 h-3 bg-green-500 rounded-full mb-4 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />

            <h3 className="font-bold mb-3 text-gray-800 group-hover:text-green-600 transition">
              Responsive Design
            </h3>

            <p className="text-gray-600 text-sm leading-6">
              Works across desktop, tablet and mobile.
            </p>

            <div className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-green-500 to-green-300" />
          </div>

        </div>

      </div>
    </section>
  );
}