import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PieItem = {
  source?: string;
  name?: string;
  value: number;
  color: string;
};

type Props = {
  data: PieItem[];
};

export default function PieChartWidget({ data }: Props) {

  const normalized = data.map((item) => ({
    ...item,
    name: item.name ?? item.source ?? "",
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={normalized}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) =>
            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
        >
          {normalized.map((item, index) => (
            <Cell
              key={index}
              fill={item.color}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
} 