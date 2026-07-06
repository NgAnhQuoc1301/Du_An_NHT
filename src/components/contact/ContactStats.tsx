const stats = [
  {
    value: "12+",
    label: "Business Dashboards",
  },
  {
    value: "20+",
    label: "ERP Modules",
  },
  {
    value: "15+",
    label: "Years Experience",
  },
  {
    value: "500+",
    label: "Enterprise Customers",
  },
];

export default function ContactStats() {
  return (
    <section className="bg-white">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">

        {stats.map((item) => (
          <div
            key={item.label}
            className="text-center border rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-4xl font-bold text-green-600">
              {item.value}
            </h2>

            <p className="mt-3 text-slate-600">
              {item.label}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}