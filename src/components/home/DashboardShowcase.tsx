import { dashboards } from "../../data/dashboardData";

export default function DashboardShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Dashboard Library
        </h2>

        <p className="text-center text-slate-500 mb-12">
          12 enterprise dashboards designed for decision makers
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dashboards.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <div className="h-44 bg-slate-100"></div>

              <div className="p-5">
                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}