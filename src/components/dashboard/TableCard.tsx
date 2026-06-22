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

      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Demo</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}