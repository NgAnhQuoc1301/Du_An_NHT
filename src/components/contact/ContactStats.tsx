import { BarChart3, Layers, Trophy, Users } from "lucide-react";

const stats = [
  {
    icon: <BarChart3 className="w-8 h-8 text-green-500" />,
    value: "12+",
    label: "Dashboard Chuyên Sâu",
  },
  {
    icon: <Layers className="w-8 h-8 text-emerald-500" />,
    value: "20+",
    label: "Module Quản Trị",
  },
  {
    icon: <Trophy className="w-8 h-8 text-green-600" />,
    value: "15+",
    label: "Năm Kinh Nghiệm",
  },
  {
    icon: <Users className="w-8 h-8 text-emerald-600" />,
    value: "500+",
    label: "Khách Hàng Doanh Nghiệp",
  },
];

export default function ContactStats() {
  return (
    <section className="bg-white py-16 font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="group text-center border border-slate-100 rounded-3xl p-8 hover:border-green-200 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2">
                {item.value}
              </h2>
              <p className="text-slate-500 font-medium tracking-wide text-sm uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}