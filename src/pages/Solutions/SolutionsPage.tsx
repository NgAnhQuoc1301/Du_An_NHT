import { Link } from "react-router-dom";
import { solutionsData } from "../../data/solutionsData";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white">

      {/* Hero */}
      <div className="relative overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-green-300/30 blur-[170px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-green-200/40 blur-[170px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">

          <div className="text-center">

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 via-green-500 to-green-400 text-transparent bg-clip-text">
              NHT Solution Catalog
            </h1>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
              Hệ thống giải pháp chuyển đổi số toàn diện dành cho doanh nghiệp hiện đại
            </p>

            <div className="mt-6 flex justify-center">
              <div className="h-[2px] w-24 rounded-full bg-gradient-to-r from-green-500 to-green-300" />
            </div>

          </div>

        </div>

      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {solutionsData.map((solution) => (
            <Link
              key={solution.id}
              to={`/solutions/${solution.id}`}
            >
              <div
                className="
                  group
                  relative
                  p-6
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

                {/* Dot */}
                <div
                  className="w-2 h-2 rounded-full mb-4"
                  style={{
                    backgroundColor: solution.color,
                    boxShadow: `0 0 10px ${solution.color}`,
                  }}
                />

                {/* Badge */}
                <div
                  className="
                    inline-block
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    bg-green-100
                    text-green-700
                    border border-green-300
                    mb-4
                  "
                >
                  {solution.name}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-green-600 transition">
                  {solution.tagline}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-6">
                  {solution.description}
                </p>

                {/* Dashboard Count */}
                <p className="text-xs text-gray-500 mt-4">
                  {solution.dashboards.length} dashboards
                </p>

                {/* Bottom Line */}
                <div className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-green-500 to-green-300" />

                {/* CTA */}
                <p className="mt-5 text-sm text-green-600 group-hover:text-green-700 transition">
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