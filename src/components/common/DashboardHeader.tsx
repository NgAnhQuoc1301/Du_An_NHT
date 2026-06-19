interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      {subtitle && (
        <p className="text-slate-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}