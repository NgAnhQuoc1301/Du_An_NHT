type Props = {
  solution: string;
  description: string;
  businessValue: string;
  tags: string[];
  currentStyle: string;
};

export default function DashboardInfo({
  solution,
  description,
  businessValue,
  tags,
  currentStyle,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-8 mb-10">

      <p className="text-blue-600 font-semibold">
        {solution}
      </p>

      <p className="mt-4 text-slate-600">
        {description}
      </p>

      <h3 className="font-bold mt-8">
        Business Value
      </h3>

      <p className="text-slate-600 mt-2">
        {businessValue}
      </p>

      <h3 className="text-xl font-bold mt-8">
        Tags
      </h3>

      <div className="flex flex-wrap gap-3 mt-4">

        {tags.map((tag) => (

          <span
            key={tag}
            className="
              px-4
              py-2
              rounded-full
              bg-blue-50
              text-blue-700
              text-sm
              font-medium
            "
          >
            {tag}
          </span>

        ))}

      </div>

      <h3 className="font-bold mt-8">
        Current Style
      </h3>

      <p className="mt-2">
        {currentStyle}
      </p>

    </div>
  );
}