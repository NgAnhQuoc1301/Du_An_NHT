type Props = {
  title: string;
  value: string;
  target: string;
  percent: number;
};

export default function ProgressBar({
  title,
  value,
  target,
  percent,
}: Props) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-slate-700">
          {title}
        </span>
        <span className="text-slate-500">
          {value} / {target}
        </span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-xs text-slate-400 mt-1">
        {percent}% of target
      </p>
    </div>
  );
}