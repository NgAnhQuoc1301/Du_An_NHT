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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Technology Stack
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {techs.map((tech) => (
            <div
              key={tech}
              className="bg-white p-8 rounded-xl shadow text-center"
            >
              {tech}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}