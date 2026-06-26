type FunnelItem = {
  stage: string;
  value: number;
  color: string;
};

type Props = {
  data: FunnelItem[];
};

export default function FunnelChart({ data }: Props) {

  const max = data[0].value;

  return (
    <div className="space-y-3">

      {data.map((item, index) => {

        const width = Math.round(
          (item.value / max) * 100
        );

        const percentage = Math.round(
          (item.value / max) * 100
        );

        return (
          <div key={index}>

            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-slate-700">
                {item.stage}
              </span>
              <span className="text-slate-500">
                {item.value.toLocaleString()} ({percentage}%)
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-10 flex items-center">
              <div
                className="h-10 rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                  width: `${width}%`,
                  backgroundColor: item.color,
                }}
              >
                <span className="text-white text-sm font-semibold px-3">
                  {item.stage}
                </span>
              </div>
            </div>

          </div>
        );
      })}

    </div>
  );
}