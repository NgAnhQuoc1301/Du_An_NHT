import { Target, Medal, Settings, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: <Medal className="w-6 h-6 text-green-600" />,
    title: "Kinh nghiệm thực chiến",
    desc: "Triển khai thành công 100+ dự án chuyển đổi số quy mô lớn.",
  },
  {
    icon: <Target className="w-6 h-6 text-green-600" />,
    title: "Chuyên gia hàng đầu",
    desc: "Đội ngũ chuyên viên tư vấn quản trị ERP & BI cấp cao.",
  },
  {
    icon: <Settings className="w-6 h-6 text-green-600" />,
    title: "Giải pháp tuỳ chỉnh",
    desc: "Thiết kế và tuỳ biến bám sát đặc thù từng doanh nghiệp.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-green-600" />,
    title: "Đồng hành dài hạn",
    desc: "Hỗ trợ tư vấn, triển khai và bảo trì hệ thống trọn đời.",
  },
];

export default function WhyChooseNHT() {
  return (
    <section className="py-24 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-bold text-xs tracking-wide uppercase mb-4">
            Giá trị cốt lõi
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Vì Sao Chọn <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Nagakawa</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-[24px] p-8 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}