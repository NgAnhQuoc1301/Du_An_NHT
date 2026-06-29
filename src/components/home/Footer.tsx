import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              NHT Solutions
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Hệ thống giải pháp chuyển đổi số toàn diện dành cho doanh nghiệp hiện đại.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 text-slate-200">
              Liên kết
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-slate-400 hover:text-white text-sm transition"
              >
                Home
              </Link>
              <Link
                to="/solutions"
                className="text-slate-400 hover:text-white text-sm transition"
              >
                Solutions
              </Link>
              <Link
                to="/dashboards"
                className="text-slate-400 hover:text-white text-sm transition"
              >
                Dashboards
              </Link>
              <Link
                to="/contact"
                className="text-slate-400 hover:text-white text-sm transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-slate-200">
              Liên hệ
            </h4>
            <div className="flex flex-col gap-2 text-slate-400 text-sm">
              <p>📧 info@nhtsolutions.vn</p>
              <p>📞 +84 28 1234 5678</p>
              <p>📍 Hà Nội, Việt Nam</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} NHT Solutions. All rights reserved.
        </div>

      </div>
    </footer>
  );
}