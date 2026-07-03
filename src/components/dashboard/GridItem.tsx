type Props = {
  span?: 3 | 4 | 6 | 12;
  children: React.ReactNode;
};

const spanClass = {
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-6",
  12: "col-span-12",
};

export default function GridItem({
  span = 3,
  children,
}: Props) {
  return (
    <div className={spanClass[span]}>
      {children}
    </div>
  );
}