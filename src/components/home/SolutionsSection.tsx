import { solutionsData } from "../../data/solutionsData";

export default function SolutionsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-green-50 to-white overflow-hidden">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-green-300/30 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-green-200/40 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-green-700 via-green-500 to-green-400 text-transparent bg-clip-text">
          Our Solutions
        </h2>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {solutionsData.map((item) => (
            <div
              key={item.id}
              className="
                group
                bg-white
                border border-green-200
                backdrop-blur-xl
                shadow-md
                p-8
                rounded-2xl
                transition-all
                duration-300
                hover:border-green-400
                hover:shadow-lg
                hover:-translate-y-1
              "
            >
              {/* icon glow dot */}
              <div className="w-3 h-3 bg-green-500 rounded-full mb-4 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />

              {/* TITLE */}
              <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-green-600 transition">
                {item.tagline}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm leading-6">
                {item.description}
              </p>

              {/* bottom accent line */}
              <div className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-green-500 to-green-300" />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}