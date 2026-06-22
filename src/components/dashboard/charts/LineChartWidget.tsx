import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 5200 },
  { month: "Mar", value: 4800 },
  { month: "Apr", value: 6800 },
  { month: "May", value: 7200 },
];

export default function LineChartWidget() {
  return (
    <div className="h-80">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}