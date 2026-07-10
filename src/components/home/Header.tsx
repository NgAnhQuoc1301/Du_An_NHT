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
      ? "text-emerald-600 font-bold text-sm relative after:absolute after:bottom-[-24px] after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-emerald-400 after:to-teal-500 after:rounded-t-md transition-all"
      : "text-slate-500 hover:text-emerald-600 text-sm font-semibold relative after:absolute after:bottom-[-24px] after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-full after:h-[3px] after:bg-emerald-200 after:rounded-t-md after:transition-all after:duration-300 transition-colors duration-300";

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-emerald-600 font-bold text-sm bg-gradient-to-r from-emerald-50 to-teal-50/50 border-l-4 border-emerald-500 px-4 py-2.5 rounded-r-lg shadow-sm"
      : "text-slate-600 hover:text-emerald-600 text-sm font-semibold border-l-4 border-transparent px-4 py-2.5 rounded-r-lg hover:bg-slate-50 transition-all";

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-emerald-100 shadow-[0_4px_30px_rgba(16,185,129,0.08)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link 
          to="/" 
          className="text-xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity"
          onClick={() => setMenuOpen(false)}
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
          <span className="hidden items-center gap-2">
            <span className="inline-block w-2.5 h-6 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"></span>
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
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none rounded-lg hover:bg-emerald-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`block w-5 h-[2.5px] rounded-full bg-emerald-600 transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`} />
          <span className={`block w-5 h-[2.5px] rounded-full bg-emerald-600 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`} />
          <span className={`block w-5 h-[2.5px] rounded-full bg-emerald-600 transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`} />
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-emerald-100 px-4 py-4 flex flex-col gap-2 shadow-[0_10px_30px_rgba(16,185,129,0.1)] animate-fadeIn">
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