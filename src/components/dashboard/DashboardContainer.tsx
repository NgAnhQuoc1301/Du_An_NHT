type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function DashboardContainer({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          {description}
        </p>

      </div>

      {children}

    </div>
  );
}