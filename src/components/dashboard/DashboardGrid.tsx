type Props = {
  children: React.ReactNode;
};

export default function DashboardGrid({
  children,
}: Props) {

  return (
    <div
      className="
      grid
      gap-6
      grid-cols-12
      "
    >
      {children}
    </div>
  );

}