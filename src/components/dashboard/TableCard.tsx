type Props = {
  title: string;
};

const rows = [
  {
    product: "Air Conditioner",
    revenue: "$32,500",
    growth: "+12%",
    status: "Active",
  },
  {
    product: "Smart TV",
    revenue: "$28,000",
    growth: "+8%",
    status: "Active",
  },
  {
    product: "Washing Machine",
    revenue: "$21,500",
    growth: "-2%",
    status: "Warning",
  },
  {
    product: "Microwave",
    revenue: "$18,000",
    growth: "+5%",
    status: "Active",
  },
];

export default function TableCard({
  title,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">

      <h3 className="font-semibold text-slate-700 mb-4">
        {title}
      </h3>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-slate-50">

            <tr>

              <th className="text-left px-3 py-3 font-semibold text-slate-600">
                Product
              </th>

              <th className="text-right px-3 py-3 font-semibold text-slate-600">
                Revenue
              </th>

              <th className="text-center px-3 py-3 font-semibold text-slate-600">
                Growth
              </th>

              <th className="text-center px-3 py-3 font-semibold text-slate-600">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (

              <tr
                key={index}
                className="border-b last:border-0 hover:bg-slate-50 transition"
              >

                <td className="px-3 py-3 font-medium text-slate-700">
                  {row.product}
                </td>

                <td className="px-3 py-3 text-right font-semibold">
                  {row.revenue}
                </td>

                <td
                  className={`px-3 py-3 text-center font-medium ${
                    row.growth.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {row.growth}
                </td>

                <td className="px-3 py-3 text-center">

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      row.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {row.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}