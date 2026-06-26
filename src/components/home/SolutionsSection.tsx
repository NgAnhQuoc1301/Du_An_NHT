import { solutions } from "../../data/solutionsData";

export default function SolutionsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/20 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-500/20 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 text-transparent bg-clip-text">
          Our Solutions
        </h2>

        {/* GRID - giữ logic cũ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {solutions.map((item) => (
            <div
              key={item.title}
              className="
                group
                bg-white/5
                border border-cyan-400/15
                backdrop-blur-xl
                p-8
                rounded-2xl
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
                hover:-translate-y-1
              "
            >
              {/* icon glow dot */}
              <div className="w-3 h-3 bg-cyan-400 rounded-full mb-4 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

              {/* TITLE */}
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-slate-300 text-sm leading-6">
                {item.description}
              </p>

              {/* bottom accent line */}
              <div className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-blue-500" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}