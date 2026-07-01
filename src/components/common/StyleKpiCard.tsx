type Props = {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  style: string;
};

export default function StyleKpiCard({
  title,
  value,
  change,
  positive,
  style,
}: Props) {

  if (style === "style2") {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
        <p className="text-sm text-slate-400 uppercase tracking-wide">
          {title}
        </p>
        <h3 className="text-4xl font-extrabold mt-2 text-slate-800">
          {value}
        </h3>
        <p className={`text-sm mt-2 font-semibold ${
          positive ? "text-green-500" : "text-red-500"
        }`}>
          {change} so với tháng trước
        </p>
      </div>
    );
  }

  if (style === "style3") {
    return (
      <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-200">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-1 text-slate-800">
            {value}
          </h3>
        </div>
        <span className={`
          text-sm font-semibold px-3 py-1 rounded-full
          ${positive
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
          }
        `}>
          {change}
        </span>
      </div>
    );
  }

  if (style === "style4") {
    return (
      <div className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="text-3xl font-bold mt-2 text-white">
          {value}
        </h3>
        <p className={`text-sm mt-2 font-medium ${
          positive ? "text-emerald-400" : "text-red-400"
        }`}>
          {change} so với tháng trước
        </p>
      </div>
    );
  }

  if (style === "style5") {
    return (
      <div className={`
        rounded-2xl p-6 text-white
        ${positive
          ? "bg-gradient-to-br from-cyan-500 to-blue-600"
          : "bg-gradient-to-br from-slate-600 to-slate-800"
        }
      `}>
        <p className="text-sm text-white/70">{title}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
        <p className="text-sm mt-2 text-white/80">
          {change} so với tháng trước
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      <p className={`text-sm mt-2 font-medium ${
        positive ? "text-green-500" : "text-red-500"
      }`}>
        {change} so với tháng trước
      </p>
    </div>
  );
}