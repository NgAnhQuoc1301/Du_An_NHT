import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 border-b border-cyan-400/10 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
          NHT Solutions
        </div>

        {/* NAV */}
        <nav className="flex gap-8 text-sm">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300 font-semibold"
                : "text-slate-300 hover:text-cyan-300 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/solutions"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300 font-semibold"
                : "text-slate-300 hover:text-cyan-300 transition"
            }
          >
            Solutions
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300 font-semibold"
                : "text-slate-300 hover:text-cyan-300 transition"
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/dashboards"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300 font-semibold"
                : "text-slate-300 hover:text-cyan-300 transition"
            }
          >
            Dashboards
          </NavLink>

        </nav>

      </div>
    </header>
  );
}