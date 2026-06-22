type Props = {
  title: string;
};

export default function Style3({ title }: Props) {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        {title}
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-xl">
          Revenue
        </div>

        <div className="bg-green-500 text-white p-4 rounded-xl">
          Orders
        </div>

        <div className="bg-orange-500 text-white p-4 rounded-xl">
          Customers
        </div>

        <div className="bg-purple-500 text-white p-4 rounded-xl">
          Growth
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 h-96">
        Chart Area
      </div>

    </div>
  );
}