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
    <section className="relative py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-cyan-500/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[480px] h-[480px] bg-blue-500/20 blur-[160px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 text-transparent bg-clip-text">
          Technology Stack
        </h2>

        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-6">

          {techs.map((tech) => (
            <div
              key={tech}
              className="
                group
                relative
                bg-white/5
                border border-cyan-400/15
                backdrop-blur-xl
                p-8
                rounded-xl
                text-center
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]
                hover:-translate-y-1
              "
            >
              {/* glow dot */}
              <div className="w-2 h-2 bg-cyan-400 rounded-full mx-auto mb-4 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

              {/* TECH NAME */}
              <span className="text-white font-semibold group-hover:text-cyan-300 transition">
                {tech}
              </span>

              {/* bottom glow line */}
              <div className="mt-4 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}