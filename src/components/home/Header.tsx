import { useState } from "react";
import { NavLink } from "react-router-dom";

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
    ? "text-green-600 font-semibold"
    : "text-gray-700 hover:text-green-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-green-200 backdrop-blur-xl">            

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">
          NHT Solutions
        </div>

        {/* NAV — desktop */}
        <nav className="hidden md:flex gap-8 text-sm">
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
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-green-600 transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`} />
          <span className={`block w-6 h-0.5 bg-green-600 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`} />
          <span className={`block w-6 h-0.5 bg-green-600 transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`} />
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-green-200 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={linkClass}
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