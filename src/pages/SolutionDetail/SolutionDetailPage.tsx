import { useParams, Link } from "react-router-dom";
import { solutionsData } from "../../data/solutionsData";
import { dashboardMetadata } from "../../data/dashboardMetadata";

export default function SolutionDetailPage() {
  const { id } = useParams();

  const solution = solutionsData.find(
    (s) => s.id === id
  );

  if (!solution) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center bg-white p-10 rounded-3xl shadow-xl shadow-green-900/5 border border-slate-100 max-w-md mx-auto relative overflow-hidden">
          <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-green-200/40 blur-[40px] rounded-full pointer-events-none" />
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Giải pháp không tồn tại</h2>
          <p className="text-slate-500 mb-8 font-light">Rất tiếc, chúng tôi không thể tìm thấy giải pháp bạn đang yêu cầu. Có thể đường dẫn đã bị thay đổi.</p>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-300"
          >
            ← Quay lại Danh sách
          </Link>
        </div>
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
          ← Quay lại Danh sách Giải pháp
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

        {solution.dashboards.map((db) => {
          const meta = dashboardMetadata[db.id as keyof typeof dashboardMetadata];

          return (
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
                  flex flex-col h-full
                  p-6
                "
              >

                <div className="flex-grow flex flex-col justify-between relative z-10">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition">
                      {db.name}
                    </h3>
                    
                    {meta?.targetAudience && (
                      <div className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold mb-3">
                        👥 {meta.targetAudience}
                      </div>
                    )}

                    {meta?.businessValue && (
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                        {meta.businessValue}
                      </p>
                    )}
                  </div>

                  <p className="text-green-600 font-semibold text-sm mt-4 flex items-center gap-1">
                    Xem Demo Dashboard <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}

        </div>

      </div>

    </div>
  );
}