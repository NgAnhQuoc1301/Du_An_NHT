import { useParams, Link } from "react-router-dom";
import { solutionsData } from "../../data/solutionsData";

export default function SolutionDetailPage() {
  const { id } = useParams();

  const solution = solutionsData.find(
    (s) => s.id === id
  );

  if (!solution) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center">
        <p className="text-xl text-gray-500">
          Solution not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Back */}
        <Link
          to="/solutions"
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition mb-8"
        >
          ← Back to Solutions
        </Link>

        {/* Header */}
        <div className="mb-14">

          <div
            className="
              inline-block
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
              bg-green-100
              border
              border-green-300
              shadow-sm
              mb-5
            "
            style={{ color: solution.color }}
          >
            {solution.name}
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-700 via-green-500 to-emerald-500 bg-clip-text text-transparent">
            {solution.tagline}
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-3xl leading-8">
            {solution.description}
          </p>

        </div>

        {/* Dashboard Title */}
        <h2 className="text-3xl font-bold text-green-700 mb-8">
          Dashboards thuộc giải pháp này
        </h2>

        {/* Dashboard List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {solution.dashboards.map((db) => (
            <Link
              key={db.id}
              to={`/dashboards/${db.id}`}
            >
              <div
                className="
                  group
                  relative
                  overflow-hidden

                  bg-white

                  p-6

                  rounded-2xl

                  border-2
                  border-green-300

                  ring-1
                  ring-green-100

                  shadow-lg

                  transition-all
                  duration-500

                  hover:-translate-y-2
                  hover:border-green-600
                  hover:ring-green-300
                  hover:shadow-[0_20px_45px_rgba(34,197,94,0.22)]
                "
              >

                {/* Top Accent */}
                <div
                  className="
                    absolute
                    top-0
                    left-0
                    h-1
                    w-full
                    bg-gradient-to-r
                    from-green-600
                    via-green-500
                    to-emerald-400
                  "
                />

                {/* Glow */}
                <div
                  className="
                    absolute
                    -top-14
                    -right-14
                    w-32
                    h-32
                    rounded-full
                    bg-green-100
                    blur-3xl
                    opacity-0
                    group-hover:opacity-70
                    transition-all
                    duration-700
                  "
                />

                <div className="relative z-10">

                  <div
                    className="w-3 h-3 rounded-full mb-5 ring-4 ring-green-100"
                    style={{
                      backgroundColor: solution.color,
                      boxShadow: `0 0 10px ${solution.color}`,
                    }}
                  />

                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition">
                    {db.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Xem dashboard →
                  </p>

                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}