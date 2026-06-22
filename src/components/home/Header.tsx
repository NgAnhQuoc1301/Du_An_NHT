import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">
          NHT Solutions
        </div>

        <nav className="flex gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/solutions">Solutions</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/dashboards">Dashboards</NavLink>
        </nav>
      </div>
    </header>
  );
}