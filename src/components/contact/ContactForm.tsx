import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import {
  Building2,
  User,
  Phone,
  Mail,
  Briefcase,
  LayoutDashboard,
  CalendarClock,
  Wallet,
  FileText,
  ShieldCheck,
  Headphones,
  Clock3,
  Send,
  MapPin,
} from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    industry: "",
    solution: "",
    timeline: "",
    budget: "",
    requirements: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contactPerson || !formData.phone || !formData.email) {
      toast.error("Vui lòng điền các thông tin bắt buộc (Họ tên, SĐT, Email).");
      return;
    }

    setIsSubmitting(true);

    // THAY THẾ BẰNG CÁC KEY CỦA BẠN TỪ EMAILJS.COM
    const serviceId = "YOUR_SERVICE_ID";
    const templateId = "YOUR_TEMPLATE_ID";
    const publicKey = "YOUR_PUBLIC_KEY";

    if (serviceId === "YOUR_SERVICE_ID") {
      // Giả lập gửi thành công nếu chưa điền key (dành cho Demo)
      setTimeout(() => {
        toast.success("Giả lập: Đã gửi thông tin thành công! (Vui lòng nhập Key EmailJS để nhận mail thật)");
        setIsSubmitting(false);
        setFormData({
          companyName: "", contactPerson: "", phone: "", email: "",
          industry: "", solution: "", timeline: "", budget: "", requirements: ""
        });
      }, 1500);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          phone: formData.phone,
          email: formData.email,
          industry: formData.industry,
          solution: formData.solution,
          timeline: formData.timeline,
          budget: formData.budget,
          requirements: formData.requirements,
        },
        publicKey
      );

      toast.success("Tuyệt vời! Thông tin của bạn đã được gửi thành công.");
      setFormData({
        companyName: "", contactPerson: "", phone: "", email: "",
        industry: "", solution: "", timeline: "", budget: "", requirements: ""
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi. Vui lòng thử lại sau.");
      console.error("EmailJS Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-green-50 to-white relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-16 relative z-10">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-100 text-green-700 font-bold text-xs tracking-wide uppercase border border-green-200/50 shadow-sm">
            💬 Yêu cầu tư vấn & Liên hệ
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Hãy cho chúng tôi biết về <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              Doanh nghiệp của bạn
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Để lại thông tin và yêu cầu nghiệp vụ của doanh nghiệp.
            Chuyên gia NHT sẽ liên hệ lại trong vòng 24h để tư vấn giải pháp phù hợp nhất.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start relative z-10">
          
          {/* Left: Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="
              lg:col-span-3
              bg-white
              rounded-[32px]
              border
              border-white
              shadow-[0_20px_60px_rgba(22,163,74,0.08)]
              p-8 sm:p-10
              relative
            "
          >
            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-green-200/30 blur-[50px] rounded-full pointer-events-none" />

            <h3 className="text-2xl font-bold text-slate-800 mb-8">Form Đăng Ký</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <InputField
                icon={<Building2 size={18} />}
                label="Tên doanh nghiệp"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Nhập tên công ty"
              />
              <InputField
                icon={<User size={18} />}
                label="Người liên hệ *"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                required
              />
              <InputField
                icon={<Phone size={18} />}
                label="Số điện thoại *"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
              <InputField
                icon={<Mail size={18} />}
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập địa chỉ email"
                required
              />
              <SelectField
                icon={<Briefcase size={18} />}
                label="Ngành nghề"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                options={[
                  "Sản xuất",
                  "Bán lẻ",
                  "Logistics",
                  "Giáo dục",
                  "Y tế",
                  "Xây dựng",
                ]}
              />
              <SelectField
                icon={<LayoutDashboard size={18} />}
                label="Giải pháp quan tâm"
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                options={[
                  "Naga ERP",
                  "Naga CRM",
                  "Naga Analytics",
                  "Naga Warranty",
                  "Naga AI",
                  "Naga IoT",
                ]}
              />
              <InputField
                icon={<CalendarClock size={18} />}
                label="Thời gian dự kiến"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="Ví dụ: Quý 4/2026"
              />
              <InputField
                icon={<Wallet size={18} />}
                label="Ngân sách dự kiến"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Ví dụ: 200 Triệu VNĐ"
              />
            </div>

            <div className="mt-8 relative z-10">
              <label className="block font-semibold text-slate-700 mb-3">
                Yêu cầu nghiệp vụ
              </label>
              <div className="relative group">
                <FileText
                  size={18}
                  className="absolute left-4 top-5 text-green-600 group-focus-within:text-green-700 transition-colors"
                />
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Mô tả quy trình hiện tại, khó khăn và mục tiêu kỳ vọng..."
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50/50
                    focus:bg-white
                    focus:ring-4
                    focus:ring-green-100
                    focus:border-green-500
                    outline-none
                    transition-all
                    resize-none
                  "
                />
              </div>
            </div>

            {/* Features Info */}
            <div className="grid sm:grid-cols-3 gap-4 mt-8 relative z-10">
              <Feature
                icon={<ShieldCheck size={24} />}
                title="Bảo mật 100%"
                desc="Tuyệt đối an toàn"
              />
              <Feature
                icon={<Headphones size={24} />}
                title="Chuyên gia"
                desc="Tư vấn chuyên sâu"
              />
              <Feature
                icon={<Clock3 size={24} />}
                title="Hồi đáp nhanh"
                desc="Trong vòng 24h"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full
                mt-10
                py-4
                rounded-2xl
                text-white
                font-bold
                text-lg
                flex
                items-center
                justify-center
                gap-3
                transition-all
                duration-300
                relative z-10
                ${isSubmitting 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/30 hover:-translate-y-1"}
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Gửi Yêu Cầu Tư Vấn
                </>
              )}
            </button>

            <p className="text-center text-sm text-slate-400 mt-5 font-light">
              Thông tin của bạn sẽ được bảo mật tuyệt đối và không chia sẻ cho bên thứ ba.
            </p>
          </form>

          {/* Right: Contact Info & Map */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Info Card */}
            <div className="bg-white rounded-[32px] p-8 border border-white shadow-[0_20px_60px_rgba(22,163,74,0.06)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-500" />
              
              <h3 className="text-2xl font-bold text-slate-800 mb-8 relative z-10">Liên Hệ Trực Tiếp</h3>
              
              <div className="space-y-6 relative z-10">
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-green-700 mb-1">
                    CÔNG TY CỔ PHẦN CÔNG NGHỆ CAO NAGAKAWA
                  </h4>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-green-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-slate-900 font-semibold mb-0.5">Địa chỉ</h5>
                    <p className="text-slate-600 text-sm font-light leading-relaxed">
                      Tầng 3, Toà nhà Gold Tower, <br/>
                      275 Nguyễn Trãi, Thanh Xuân, Hà Nội
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-green-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-slate-900 font-semibold mb-0.5">Hotline</h5>
                    <p className="text-slate-600 text-sm font-light">
                      <a href="tel:0328992139" className="hover:text-green-600 font-medium transition-colors">
                        0328992139
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-green-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-slate-900 font-semibold mb-0.5">Email</h5>
                    <p className="text-slate-600 text-sm font-light">
                      <a href="mailto:cskh@anerp.com.vn" className="hover:text-green-600 transition-colors">
                        cskh@anerp.com.vn
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-slate-900 font-semibold mb-0.5">Mạng xã hội</h5>
                    <p className="text-slate-600 text-sm font-light">
                      <a href="https://www.facebook.com/anerp.official" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                        Fanpage Chính Thức
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white rounded-[32px] p-2 border border-slate-100 shadow-[0_20px_60px_rgba(22,163,74,0.06)] h-[350px] relative group overflow-hidden">
              <div className="absolute inset-0 bg-green-600/5 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 z-10 rounded-[30px]"></div>
              <iframe
                title="Google Map - Gold Tower"
                src="https://maps.google.com/maps?q=To%C3%A0%20nh%C3%A0%20Gold%20Tower,%20275%20Nguy%E1%BB%85n%20Tr%C3%A3i,%20Thanh%20Xu%C3%A2n,%20H%C3%A0%20N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover rounded-[28px] grayscale-[10%] contrast-110"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Components ---------- */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
}

function InputField({ icon, label, ...rest }: InputProps) {
  return (
    <div>
      <label className="block font-semibold text-slate-700 mb-2 text-sm">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-4 text-green-600 group-focus-within:text-green-700 transition-colors">
          {icon}
        </div>
        <input
          className="
            w-full
            pl-12
            pr-4
            py-3.5
            rounded-2xl
            border
            border-slate-200
            bg-slate-50/50
            focus:bg-white
            focus:ring-4
            focus:ring-green-100
            focus:border-green-500
            outline-none
            transition-all
            text-sm
          "
          {...rest}
        />
      </div>
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactNode;
  label: string;
  options: string[];
}

function SelectField({ icon, label, options, ...rest }: SelectProps) {
  return (
    <div>
      <label className="block font-semibold text-slate-700 mb-2 text-sm">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-4 text-green-600 group-focus-within:text-green-700 transition-colors">
          {icon}
        </div>
        <select
          className="
            w-full
            pl-12
            pr-4
            py-3.5
            rounded-2xl
            border
            border-slate-200
            bg-slate-50/50
            focus:bg-white
            focus:ring-4
            focus:ring-green-100
            focus:border-green-500
            outline-none
            transition-all
            appearance-none
            text-sm
          "
          {...rest}
        >
          <option value="">Chọn...</option>
          {options.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 border border-green-100/60 bg-green-50/30 rounded-xl p-4">
      <div className="text-green-600 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-700 text-sm">
          {title}
        </h4>
        <p className="text-xs text-slate-500">
          {desc}
        </p>
      </div>
    </div>
  );
}