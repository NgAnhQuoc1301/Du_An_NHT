import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

type BarItem = {
  name: string;
  revenue: number;
  color: string;
};

type Props = {
  data: BarItem[];
};

export default function BarChartWidget({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 80 }}
      >

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f1f5f9"
        />

        <XAxis
          type="number"
          tickFormatter={(v) =>
            `$${(v / 1000).toFixed(0)}k`
          }
          tick={{ fontSize: 12 }}
        />

        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 12 }}
        />

        <Tooltip
          formatter={(value) => [
            `$${Number(value).toLocaleString()}`,
            "Revenue",
          ]}
        />

        <Bar dataKey="revenue" radius={[0, 6, 6, 0]}>
          {data.map((item, index) => (
            <Cell
              key={index}
              fill={item.color}
            />
          ))}
        </Bar>

      </BarChart>
    </ResponsiveContainer>
  );
}