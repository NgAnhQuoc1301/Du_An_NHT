import KpiCard from "../../components/dashboard/KpiCard";

type Props = {
  title: string;
};

export default function Style1({ title }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <div className="grid grid-cols-4 gap-4 mt-8">
        <KpiCard
          title="Revenue"
          value="$120,000"
        />

        <KpiCard
          title="Orders"
          value="450"
        />
        </div>

        <div className="bg-white p-6 rounded">
          KPI 3
        </div>

        <div className="bg-white p-6 rounded">
          KPI 4
        </div>
      </div>
  );
}