

export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 rounded-full bg-green-50 animate-pulse"></div>
      </div>
      <h3 className="text-lg font-semibold text-slate-700 tracking-wide">
        Đang tải dữ liệu...
      </h3>
      <p className="text-sm text-slate-500 mt-2 font-light">
        Vui lòng đợi trong giây lát
      </p>
    </div>
  );
}
