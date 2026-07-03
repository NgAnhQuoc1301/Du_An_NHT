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
    <section className="relative py-24 bg-gradient-to-br from-white via-emerald-50 to-green-100 overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-green-300/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[480px] h-[480px] bg-green-200/40 blur-[160px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-green-700 via-green-500 to-green-400 text-transparent bg-clip-text">
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
                bg-white
                border border-green-200
                backdrop-blur-xl
                shadow-md
                p-8
                rounded-xl
                text-center
                transition-all
                duration-300
                hover:border-green-400
                hover:shadow-lg
                hover:-translate-y-1
              "
            >
              {/* glow dot */}
              <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-4 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />

              {/* TECH NAME */}
              <span className="font-semibold text-gray-800 group-hover:text-green-600 transition">
                {tech}
              </span>

              {/* bottom line */}
              <div className="mt-4 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-green-500 to-green-300 mx-auto" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}