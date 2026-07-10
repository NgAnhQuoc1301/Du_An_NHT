const techs = [
  "React",
  "TypeScript",
  "Tailwind",
  "NodeJS",
  "MySQL",
  "Power BI",
  "Docker",
  "REST API",
];

export default function TechnologySection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-slate-50 to-green-50/20 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-green-200/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[480px] h-[480px] bg-emerald-100/20 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 text-transparent bg-clip-text">
            Nền tảng Công nghệ
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Nền tảng công nghệ hiện đại, bảo mật và tối ưu hóa cho các giải pháp doanh nghiệp.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {techs.map((tech) => (
            <div
              key={tech}
              className="
                group
                relative
                bg-white
                border border-slate-200/80
                shadow-sm
                p-6 md:p-8
                rounded-2xl
                text-center
                transition-all
                duration-300
                hover:border-green-600/30
                hover:shadow-[0_15px_30px_rgba(22,163,74,0.04)]
                hover:-translate-y-1
              "
            >
              {/* glow dot */}
              <div className="w-2 h-2 bg-green-600 rounded-full mx-auto mb-4 shadow-[0_0_10px_rgba(22,163,74,0.6)] transition-transform duration-300 group-hover:scale-125" />

              {/* TECH NAME */}
              <span className="font-bold text-sm md:text-base text-slate-800 group-hover:text-green-600 transition-colors duration-200">
                {tech}
              </span>

              {/* bottom line */}
              <div className="mt-5 h-[2px] w-0 group-hover:w-1/2 transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-400 mx-auto" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}