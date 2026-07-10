import { HelpCircle } from "lucide-react";

const questions = [
  {
    q: "Thời gian triển khai hệ thống mất bao lâu?",
    a: "Tuỳ thuộc vào quy mô và độ phức tạp của doanh nghiệp. Thông thường, một dự án cấu hình chuẩn sẽ kéo dài từ 1 - 3 tháng, và dự án tuỳ chỉnh sâu sẽ từ 3 - 6 tháng.",
  },
  {
    q: "Nagakawa có tuỳ chỉnh ERP theo đặc thù công ty không?",
    a: "Chắc chắn. Điểm mạnh lớn nhất của chúng tôi là khả năng may đo (customize) tính năng bám sát 100% quy trình đặc thù của riêng doanh nghiệp bạn.",
  },
  {
    q: "Hệ thống Dashboard có kết nối được với bên thứ ba không?",
    a: "Có. Nền tảng của chúng tôi cung cấp bộ API mở, dễ dàng đồng bộ dữ liệu hai chiều với Power BI, SAP, Oracle hoặc các phần mềm quản lý nội bộ khác.",
  },
  {
    q: "Chính sách đào tạo và bảo hành sau khi nghiệm thu thế nào?",
    a: "Chúng tôi cung cấp các buổi đào tạo trực tiếp cho từng phòng ban. Đồng thời có đội ngũ support 24/7 và cam kết bảo hành, bảo trì trọn đời hệ thống.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Câu Hỏi <span className="text-green-600">Thường Gặp</span>
          </h2>
          <p className="text-slate-500 font-light text-lg">
            Giải đáp những thắc mắc chung của khách hàng trước khi triển khai hệ thống.
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-start gap-3">
                <span className="text-green-500">Q.</span> {item.q}
              </h3>
              <p className="text-slate-600 font-light leading-relaxed pl-8">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}