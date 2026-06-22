type Props = {
  title: string;
};

export default function Style2({ title }: Props) {
  return (
    <div className="bg-slate-50 min-h-screen p-8">

      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <div className="grid grid-cols-4 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow p-6">
          KPI
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          KPI
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          KPI
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          KPI
        </div>

      </div>

    </div>
  );
}