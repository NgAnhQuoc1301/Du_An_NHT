import { Outlet } from "react-router-dom";
import Header from "../components/home/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}