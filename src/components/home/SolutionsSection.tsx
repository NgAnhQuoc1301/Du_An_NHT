import { solutions } from "../../data/solutionsData";

export default function SolutionsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Our Solutions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((item) => (
            <div
              key={item.title}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}