import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-green-50/20">

      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-green-200/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[500px] h-[500px] bg-emerald-100/20 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center px-4 md:px-6">

        {/* TITLE */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 tracking-tight text-slate-800">
          Sẵn sàng chuyển đổi số cùng <span className="text-green-600">NHT?</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mb-10 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Khám phá hệ sinh thái giải pháp doanh nghiệp và hệ thống dashboard quản trị giúp bạn tối ưu hóa hoạt động vận hành.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

          <Link
            to="/dashboards"
            className="
              w-full sm:w-auto
              bg-green-600
              text-white
              px-8
              py-3.5
              rounded-xl
              text-sm
              font-semibold
              shadow-lg shadow-green-600/15
              hover:bg-green-700
              hover:shadow-xl hover:shadow-green-700/20
              transition-all
              duration-300
            "
          >
            Yêu cầu Demo
          </Link>

          <Link
            to="/contact"
            className="
              w-full sm:w-auto
              bg-white
              border border-slate-200
              text-slate-700
              px-8
              py-3.5
              rounded-xl
              text-sm
              font-semibold
              shadow-sm
              hover:bg-slate-50
              hover:border-green-600
              hover:text-green-600
              transition-all
              duration-300
            "
          >
            Liên hệ với chúng tôi
          </Link>

        </div>

      </div>
    </section>
  );
}