type Props = {
  title: string;
  value: string;

  change?: string;

  positive?: boolean;

  subtitle?: string;
};

export default function KpiCard({
  title,
  value,
  change,
  positive = true,
  subtitle = "Compared with last month",
}: Props) {

  return (

    <div
      className="
      bg-white
      rounded-xl
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
      border
      border-slate-100
      p-5
      "
    >

      <div className="flex justify-between items-center">

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <div className="text-xl">
          📊
        </div>

      </div>

      <h2 className="text-3xl font-bold mt-4 text-slate-800">
        {value}
      </h2>

      {change && (

        <div className="mt-4">

          <p
            className={`font-semibold ${
              positive
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {positive ? "▲" : "▼"} {change}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {subtitle}
          </p>

        </div>

      )}

    </div>

  );

}