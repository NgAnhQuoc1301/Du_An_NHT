import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-green-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-3">
              NHT Solutions
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hệ thống giải pháp chuyển đổi số toàn diện dành cho doanh nghiệp hiện đại.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">
              Liên kết
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-gray-600 hover:text-green-600 text-sm transition"
              >
                Home
              </Link>
              <Link
                to="/solutions"
                className="text-gray-600 hover:text-green-600 text-sm transition"
              >
                Solutions
              </Link>
              <Link
                to="/dashboards"
                className="text-gray-600 hover:text-green-600 text-sm transition"
              >
                Dashboards  
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-green-600 text-sm transition"
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
            <div className="flex flex-col gap-2 text-gray-600 text-sm">
              <p>📧 cskh@anerp.com.vn</p>
              <p>📞 0328992139</p>
              <p>📍 Địa chỉ: Tầng 3, Gold Tower, 275 Nguyễn Trãi, Thanh Xuân, Hà Nội</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-green-100 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NHT Solutions. All rights reserved.
        </div>

      </div>
    </footer>
  );
}