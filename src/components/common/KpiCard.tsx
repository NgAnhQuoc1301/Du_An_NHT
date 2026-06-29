type Props = {
  title: string;
  value: string;
  change: string;
  positive: boolean;
};

export default function KpiCard({
  title,
  value,
  change,
  positive,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>

      <p className={`text-sm mt-2 font-medium ${
        positive
          ? "text-green-500"
          : "text-red-500"
      }`}>
        {change} so với tháng trước
      </p>

    </div>
  );
}