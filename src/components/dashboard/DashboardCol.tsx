type Props = {
  span: 3 | 4 | 6 | 8 | 9 | 12;
  children: React.ReactNode;
};

const spanClass = {
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-6",
  8: "col-span-8",
  9: "col-span-9",
  12: "col-span-12",
};

export default function DashboardCol({
  span,
  children,
}: Props) {

  return (

    <div
      className={spanClass[span]}
    >

      {children}

    </div>

  );

}