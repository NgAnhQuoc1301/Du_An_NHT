type Props = {
  children: React.ReactNode;
};

export default function DashboardRow({
  children,
}: Props) {

  return (

    <div
      className="
      grid
      grid-cols-12
      gap-6
      "
    >

      {children}

    </div>

  );

}