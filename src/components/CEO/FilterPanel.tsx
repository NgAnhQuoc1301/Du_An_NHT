import {
  CalendarDays,
  Building2,
  Globe2,
  MapPinned,
  BriefcaseBusiness,
  RotateCcw,
  Download,
} from "lucide-react";

const selectClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function FilterPanel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Global Filters
        </h2>

        <p className="text-sm text-slate-500">
          Filter KPI and charts across the dashboard.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-2">

        {/* Date */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <CalendarDays size={16} />
            Date
          </label>

          <input
            type="month"
            className={selectClass}
          />
        </div>

        {/* Company */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Building2 size={16} />
            Company
          </label>

          <select className={selectClass}>
            <option>All Companies</option>
          </select>
        </div>

        {/* Region */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Globe2 size={16} />
            Region
          </label>

          <select className={selectClass}>
            <option>All Regions</option>
          </select>
        </div>

        {/* Country */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <MapPinned size={16} />
            Country
          </label>

          <select className={selectClass}>
            <option>All Countries</option>
          </select>
        </div>

        {/* Industry */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
            <BriefcaseBusiness size={16} />
            Industry
          </label>

          <select className={selectClass}>
            <option>All Industries</option>
          </select>
        </div>

        {/* Refresh */}

        <button
          className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800"
        >
          <RotateCcw size={18} />
          Refresh
        </button>

        {/* Export */}

        <button
          className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700"
        >
          <Download size={18} />
          Export
        </button>

      </div>
    </div>
  );
}