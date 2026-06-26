import { Outlet } from "react-router-dom";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}