import { Link } from "react-router-dom";
import { solutionsData } from "../../data/solutionsData";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="text-center">

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200 text-transparent bg-clip-text">
            NHT Solution Catalog
          </h1>

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-lg">
            Hệ thống giải pháp chuyển đổi số toàn diện dành cho doanh nghiệp hiện đại
          </p>

          <div className="mt-6 flex justify-center">
            <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {solutionsData.map((solution) => (
            <Link
              key={solution.id}
              to={`/solutions/${solution.id}`}
            >
              <div className="
                group
                relative
                p-6
                rounded-2xl
                bg-white/5
                border border-cyan-400/10
                backdrop-blur-xl
                transition-all duration-300
                hover:border-cyan-400/40
                hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
                hover:-translate-y-1
              ">

                <div
                  className="w-2 h-2 rounded-full mb-4"
                  style={{
                    backgroundColor: solution.color,
                    boxShadow: `0 0 10px ${solution.color}`,
                  }}
                />

                <div className="inline-block px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 mb-4">
                  {solution.name}
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-300 transition">
                  {solution.tagline}
                </h3>

                <p className="text-slate-300 text-sm leading-6">
                  {solution.description}
                </p>

                <p className="text-xs text-slate-400 mt-4">
                  {solution.dashboards.length} dashboards
                </p>

                <div className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-400 to-blue-500" />

                <p className="mt-5 text-sm text-cyan-300 group-hover:text-white transition">
                  View Details →
                </p>

              </div>
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
}