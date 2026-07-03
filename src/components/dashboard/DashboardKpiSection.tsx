import KpiCard from "./KpiCard";

type KpiItem = {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  subtitle?: string;
  icon?: React.ReactNode;
};

type Props = {
  items: KpiItem[];
};

export default function DashboardKpiSection({
  items,
}: Props) {
  return (
    <div className="grid grid-cols-12 gap-6">

      {items.map((item, index) => (

        <div
          key={index}
          className="col-span-3"
        >
          <KpiCard
            title={item.title}
            value={item.value}
            change={item.change}
            positive={item.positive}
            subtitle={item.subtitle}
            icon={item.icon}
          />
        </div>

      ))}

    </div>
  );
}