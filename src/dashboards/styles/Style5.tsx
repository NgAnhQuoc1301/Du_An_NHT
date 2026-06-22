type Props = {
  title: string;
};

export default function Style5({ title }: Props) {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        {title}
      </h1>

      <div className="grid grid-cols-12 gap-4">

        <div className="col-span-3 bg-white shadow rounded-xl p-4 h-40">
          KPI Widget
        </div>

        <div className="col-span-3 bg-white shadow rounded-xl p-4 h-40">
          KPI Widget
        </div>

        <div className="col-span-6 bg-white shadow rounded-xl p-4 h-40">
          KPI Widget
        </div>

        <div className="col-span-8 bg-white shadow rounded-xl p-4 h-80">
          Chart Widget
        </div>

        <div className="col-span-4 bg-white shadow rounded-xl p-4 h-80">
          Table Widget
        </div>

      </div>

    </div>
  );
}