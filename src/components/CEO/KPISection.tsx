import {
  DollarSign,
  Wallet,
  BadgeDollarSign,
  Landmark,
  Users,
  UserRound,
  Briefcase,
  TrendingUp,
  Activity,
} from "lucide-react";

import KPICard from "./KPICard";

const kpis = [
  {
    title: "Revenue",
    value: "$25.6M",
    change: 12.4,
    positive: true,
    icon: <DollarSign className="text-white" />,
    color: "bg-blue-600",
  },

  {
    title: "Profit",
    value: "$8.1M",
    change: 8.7,
    positive: true,
    icon: <BadgeDollarSign className="text-white" />,
    color: "bg-green-600",
  },

  {
    title: "Operating Cost",
    value: "$15.9M",
    change: 4.1,
    positive: false,
    icon: <Wallet className="text-white" />,
    color: "bg-red-500",
  },

  {
    title: "EBITDA",
    value: "$11.2M",
    change: 10.1,
    positive: true,
    icon: <Landmark className="text-white" />,
    color: "bg-violet-600",
  },

  {
    title: "Profit Margin",
    value: "31%",
    change: 3.8,
    positive: true,
    icon: <TrendingUp className="text-white" />,
    color: "bg-emerald-600",
  },

  {
    title: "Employees",
    value: "5,218",
    change: 1.5,
    positive: true,
    icon: <Users className="text-white" />,
    color: "bg-cyan-600",
  },

  {
    title: "Customers",
    value: "83,600",
    change: 14.2,
    positive: true,
    icon: <UserRound className="text-white" />,
    color: "bg-orange-500",
  },

  {
    title: "Projects",
    value: "182",
    change: 5.1,
    positive: true,
    icon: <Briefcase className="text-white" />,
    color: "bg-indigo-600",
  },

  {
    title: "Enterprise Score",
    value: "92",
    change: 2.6,
    positive: true,
    icon: <Activity className="text-white" />,
    color: "bg-pink-600",
  },
];

export default function KPISection() {
  return (
    <section>

      <div className="mb-5">

        <h2 className="text-xl font-bold text-slate-800">
          Executive KPI
        </h2>

        <p className="text-slate-500">
          Overall business performance overview
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-3 2xl:grid-cols-5 lg:grid-cols-2">

        {kpis.map((item) => (
          <KPICard key={item.title} {...item} />
        ))}

      </div>

    </section>
  );
}