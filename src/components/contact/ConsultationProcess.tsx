import { FileSearch, LineChart, Code2, GraduationCap } from "lucide-react";

const steps = [
  {
    icon: <FileSearch className="w-8 h-8 text-white" />,
    title: "Khảo Sát & Tiếp Nhận",
    desc: "Đánh giá hiện trạng và lấy yêu cầu nghiệp vụ.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-white" />,
    title: "Đề Xuất & Demo",
    desc: "Lên giải pháp tổng thể và demo trên dữ liệu mẫu.",
  },
  {
    icon: <Code2 className="w-8 h-8 text-white" />,
    title: "Tuỳ Chỉnh & Cài Đặt",
    desc: "Tinh chỉnh hệ thống và đồng bộ cơ sở dữ liệu.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    title: "Đào Tạo & Bàn Giao",
    desc: "Hướng dẫn vận hành và hỗ trợ support 24/7.",
  },
];

export default function ConsultationProcess() {
  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Quy Trình <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Triển Khai</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-light">
            Lộ trình làm việc rõ ràng, minh bạch giúp doanh nghiệp nhanh chóng đưa hệ thống vào vận hành thực tế.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-green-100 -z-10"></div>

          {steps.map((item, idx) => (
            <div key={idx} className="relative group text-center">
              <div className="w-24 h-24 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-600/30 group-hover:scale-110 transition-transform duration-300 relative">
                <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
                {item.icon}
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold border-4 border-white">
                  {idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-500 font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}