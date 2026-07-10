import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-emerald-50/50 text-slate-800 pt-16 pb-8 border-t border-emerald-100 overflow-hidden">
      {/* Glassmorphism Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-200" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-6 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"></span>
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight">
                Nagakawa
              </h3>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Hệ thống giải pháp chuyển đổi số toàn diện dành cho doanh nghiệp hiện đại.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              Liên kết
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/solutions', label: 'Solutions' },
                { to: '/dashboards', label: 'Dashboards' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-slate-500 hover:text-emerald-600 text-sm font-medium transition-all hover:translate-x-1 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-4 bg-teal-500 rounded-full" />
              Liên hệ
            </h4>
            <div className="flex flex-col gap-3 text-slate-500 text-sm font-medium">
              <p className="flex items-center gap-2 hover:text-emerald-600 transition-colors cursor-pointer">
                <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">📧</span> cskh@anerp.com.vn
              </p>
              <p className="flex items-center gap-2 hover:text-emerald-600 transition-colors cursor-pointer">
                <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">📞</span> 0328992139
              </p>
              <p className="flex items-start gap-2 hover:text-emerald-600 transition-colors cursor-pointer leading-relaxed">
                <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5">📍</span>
                Tầng 3, Gold Tower, 275 Nguyễn Trãi, Thanh Xuân, Hà Nội
              </p>
            </div>
          </div>

          </div>

        {/* Bottom */}
        <div className="border-t border-emerald-200/60 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-medium">
          <p>© {new Date().getFullYear()} Nagakawa. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-emerald-500 cursor-pointer transition-colors">Chính sách bảo mật</span>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors">Điều khoản dịch vụ</span>
          </div>
        </div>

      </div>
    </footer>
  );
}