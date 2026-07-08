import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const data = [
    { month: "Jan", revenue: 4 },
    { month: "Feb", revenue: 6 },
    { month: "Mar", revenue: 5 },
    { month: "Apr", revenue: 8 },
    { month: "May", revenue: 10 },
    { month: "Jun", revenue: 12 },
    { month: "Jul", revenue: 14 },
];

export default function RevenueTrendChart() {

    return (

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">

            <h3 className="text-lg font-semibold">
                Revenue Trend
            </h3>

            <p className="text-sm text-slate-500 mb-5">
                Monthly revenue overview
            </p>

            <div className="h-[350px]">

                <ResponsiveContainer>

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#2563eb"
                            strokeWidth={4}
                            dot={{ r: 5 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}