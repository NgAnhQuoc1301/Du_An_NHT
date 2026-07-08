import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  positive: boolean;
  icon: ReactNode;
  color: string;
}

export default function KPICard({
  title,
  value,
  change,
  positive,
  icon,
  color,
}: KPICardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          {icon}
        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <div
          className={`flex items-center gap-2 text-sm font-semibold ${
            positive
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {positive ? (
            <TrendingUp size={18} />
          ) : (
            <TrendingDown size={18} />
          )}

          {change}%
        </div>

        <p className="text-xs text-slate-400">
          Compared to last month
        </p>

      </div>

    </div>
  );
}