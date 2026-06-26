type Props = {
  title: string;
};

export default function TableCard({
  title,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">
        {title}
      </h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">
              Name
            </th>

            <th className="text-left py-2">
              Value
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="py-2">
              Product A
            </td>

            <td className="py-2">
              120
            </td>
          </tr>

          <tr className="border-b">
            <td className="py-2">
              Product B
            </td>

            <td className="py-2">
              98
            </td>
          </tr>

          <tr>
            <td className="py-2">
              Product C
            </td>

            <td className="py-2">
              75
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}