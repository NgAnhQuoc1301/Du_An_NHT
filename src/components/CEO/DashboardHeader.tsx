import {
  Bell,
  RefreshCcw,
  UserCircle2,
} from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-[1700px] px-8 py-5 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            CEO Executive Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Enterprise Business Intelligence Platform
          </p>

        </div>

        <div className="flex items-center gap-4">

          <button
            className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
          >
            <RefreshCcw size={18} />
          </button>

          <button
            className="relative w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
          >
            <Bell size={18} />

            <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-red-500" />
          </button>

          <button
            className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center"
          >
            <UserCircle2 />
          </button>

        </div>

      </div>
    </header>
  );
}