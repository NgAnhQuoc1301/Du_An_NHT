import { useParams, Link } from "react-router-dom";
import { solutionsData } from "../../data/solutionsData";

export default function SolutionDetailPage() {

  const { id } = useParams();

  const solution = solutionsData.find(
    (s) => s.id === id
  );

  if (!solution) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-xl text-slate-400">
          Solution not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Back */}
        <Link
          to="/solutions"
          className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block"
        >
          ← Back to Solutions
        </Link>

        {/* Header */}
        <div className="mb-12">

          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-white/10"
            style={{ color: solution.color }}
          >
            {solution.name}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {solution.tagline}
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">
            {solution.description}
          </p>

        </div>

        {/* Dashboards */}
        <h2 className="text-2xl font-bold mb-6 text-cyan-300">
          Dashboards thuộc giải pháp này
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {solution.dashboards.map((db) => (
            <Link
              key={db.id}
              to={`/dashboards/${db.id}`}
            >
              <div className="
                group
                p-6
                rounded-2xl
                bg-white/5
                border border-cyan-400/10
                hover:border-cyan-400/40
                hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]
                hover:-translate-y-1
                transition-all duration-300
              ">

                <div
                  className="w-2 h-2 rounded-full mb-4"
                  style={{
                    backgroundColor: solution.color,
                    boxShadow: `0 0 8px ${solution.color}`,
                  }}
                />

                <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-300 transition">
                  {db.name}
                </h3>

                <p className="text-slate-400 text-sm">
                  Xem dashboard →
                </p>

              </div>
            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}