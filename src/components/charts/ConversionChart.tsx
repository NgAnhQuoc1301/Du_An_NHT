import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type DataItem = {
  month: string;
  rate: number;
};

type Props = {
  data: DataItem[];
};

export default function ConversionChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f1f5f9"
        />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
        />

        <YAxis
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 12 }}
        />

        <Tooltip
          formatter={(value) => [`${value}%`, "Conversion Rate"]}
        />

        <Line
          type="monotone"
          dataKey="rate"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />

      </LineChart>
    </ResponsiveContainer>
  );
}