import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

export default function ChartCard({
  title,
  children,
}: ChartCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">
        {title}
      </h3>

      {children}
    </div>
  );
}