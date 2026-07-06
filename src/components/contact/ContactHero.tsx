import { ArrowRight, MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactHero() {
  // Chuyển mảng tag thành mảng các Object có định tuyến rõ ràng
  const solutions = [
    { label: "ERP", path: "/solutions/erp" },
    { label: "CRM", path: "/solutions/crm" },
    { label: "Dashboard", path: "/dashboards" },
    { label: "AI", path: "/solutions/ai" },
    { label: "IoT", path: "/solutions/iot" },
    { label: "Mobile App", path: "/solutions/mobile-app" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-white via-slate-50 to-green-50/20 overflow-hidden">
      
      {/* Glow background */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-200/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200/60 text-green-700 font-semibold text-xs md:text-sm tracking-wide">
              Digital Transformation Partner
            </div>

            {/* TITLE */}
            <Link
              to="/"
              className="
                block
                mt-6
                text-4xl
                md:text-5xl
                font-extrabold
                leading-tight
                text-slate-900
                hover:text-green-600
                transition-colors
                duration-300
                tracking-tight
              "
            >
              NHT Solution Showcase
            </Link>
      
            <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
              Explore enterprise management solutions including ERP,
              CRM, Executive Dashboard, Mobile Applications,
              AI Assistant and IoT Platform developed by
              Nagakawa High Technology.
            </p>

            {/* TAGS LINKS (Các nhãn trong hình image_a59b9e.png đã thành link) */}
            <div className="flex flex-wrap gap-2.5 mt-8">
              {solutions.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="
                    px-3.5
                    py-1.5
                    rounded-full
                    bg-slate-50
                    border
                    border-slate-200/80
                    text-slate-700
                    text-xs
                    font-medium
                    hover:border-green-600/40
                    hover:text-green-600
                    hover:bg-white
                    hover:shadow-sm
                    transition-all
                    duration-200
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CALL TO ACTIONS (Hai nút lớn trong hình image_a59b9e.png) */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              
              {/* Nút Request Demo dẫn tới trang liên hệ / đặt lịch */}
              <Link
                to="/contact"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-xl
                  bg-green-600
                  text-white
                  text-sm
                  font-semibold
                  shadow-lg shadow-green-600/15
                  hover:bg-green-700
                  hover:shadow-xl hover:shadow-green-700/20
                  transition-all
                  duration-300
                "
              >
                Request Demo
                <ArrowRight size={16} />
              </Link>

              {/* Nút Dashboard Library dẫn tới kho Dashboard tổng hợp */}
              <Link
                to="/dashboards"
                className="
                  flex
                  items-center
                  justify-center
                  px-7
                  py-3.5
                  rounded-xl
                  bg-white
                  border
                  border-slate-200
                  text-slate-700
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
                Dashboard Library
              </Link>
              
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-8 md:p-10">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center shadow-inner">
                  <MonitorSmartphone
                    size={38}
                    className="text-green-600"
                  />
                </div>
              </div>

              <h2 className="mt-8 text-2xl font-bold text-center text-slate-800">
                Business Dashboard Demo
              </h2>

              <p className="mt-4 text-center text-slate-500 text-sm md:text-base leading-relaxed">
                Interactive dashboards for CEO, Sales,
                Warehouse, CRM, HR, Finance and Production.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}