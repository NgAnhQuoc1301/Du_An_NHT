import { useState } from "react";
import { NavLink, Link } from "react-router-dom"; // Thêm Link vào đây

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/solutions", label: "Solutions", end: false },
    { to: "/dashboards", label: "Dashboards", end: false },
    { to: "/contact", label: "Contact", end: false },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-green-600 font-semibold text-sm relative after:absolute after:bottom-[-21px] after:left-0 after:w-full after:h-[2px] after:bg-green-600 transition-colors"
      : "text-slate-600 hover:text-green-600 text-sm font-medium transition-colors duration-200";

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-green-600 font-semibold text-sm bg-green-50/50 px-3 py-2 rounded-lg"
      : "text-slate-600 hover:text-green-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-50 transition-all";

  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b border-slate-100 backdrop-blur-md shadow-sm shadow-slate-100/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* LOGO - Đã được bọc thẻ Link về trang chủ và thêm hiệu ứng hover mượt */}
        <Link 
          to="/" 
          className="text-xl font-bold text-green-600 tracking-tight flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          onClick={() => setMenuOpen(false)} // Đóng luôn mobile menu nếu đang mở khi bấm logo
        >
          <img
            src="https://nagakawa.com.vn/wp-content/uploads/2023/09/logo-nht.png"
            alt="Nagakawa"
            className="h-8 object-contain"
            onError={(e) => {
            e.currentTarget.style.display = "none";

            const fallback =
              e.currentTarget.nextElementSibling as HTMLElement | null;
            if (fallback) {
              fallback.style.display = "flex";
            }
          }}
          />
          <span className="hidden items-center gap-1.5">
            <span className="inline-block w-2 h-5 bg-green-600 rounded-sm"></span>
            Nagakawa
          </span>
        </Link>

        {/* NAV — desktop */}
        <nav className="hidden md:flex gap-8 items-center h-full">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none rounded-lg hover:bg-slate-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`block w-5 h-0.5 bg-green-600 transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2 !bg-green-600" : ""
          }`} />
          <span className={`block w-5 h-0.5 bg-green-600 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`} />
          <span className={`block w-5 h-0.5 bg-green-600 transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2 !bg-green-600" : ""
          }`} />
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-1 shadow-inner animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={mobileLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}