import { solutionsData } from "../../data/solutionsData";

export default function SolutionsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-slate-50 to-green-50/20 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-green-200/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-emerald-100/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 text-transparent bg-clip-text">
            Giải pháp của chúng tôi
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Hệ sinh thái công nghệ toàn diện giúp tối ưu hóa hiệu suất vận hành doanh nghiệp.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          {solutionsData.map((item) => (
            <div
              key={item.id}
              className="
                group
                bg-white
                border border-slate-200/80
                shadow-sm
                p-8
                rounded-2xl
                transition-all
                duration-300
                hover:border-green-600/30
                hover:shadow-[0_15px_40px_rgba(22,163,74,0.05)]
                hover:-translate-y-1
                flex flex-col justify-between
              "
            >
              <div>
                {/* icon glow dot */}
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full mb-6 shadow-[0_0_12px_rgba(22,163,74,0.6)]" />

                {/* TITLE */}
                <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-800 group-hover:text-green-600 transition-colors duration-200">
                  {item.tagline}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* bottom accent line */}
              <div className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-400" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}