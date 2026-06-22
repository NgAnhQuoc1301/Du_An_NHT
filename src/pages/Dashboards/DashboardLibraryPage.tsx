import { dashboards } from "../../data/dashboardData";

export default function DashboardLibraryPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-4">
          Dashboard Library
        </h1>

        <p className="text-slate-500 mb-12">
          Explore business dashboards developed by NHT Solutions.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {dashboards.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl"
            >
              <div className="h-48 bg-slate-200"></div>

              <div className="p-5">
                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-slate-500 mt-2">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}