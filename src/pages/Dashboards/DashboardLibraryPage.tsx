import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { dashboardPreview } from "../../data/dashboardPreview";
import { dashboardConfigs } from "../../data/dashboardConfigs";
import { dashboardMetadata } from "../../data/dashboardMetadata";
import { countWidgets } from "../../utils/dashboardUtils";

const CATEGORIES = [
  "All",
  "Sales",
  "CRM",
  "HR",
  "Executive",
  "Finance",
  "Project",
  "KPI",
  "Warehouse",
  "Warranty",
  "Production",
  "Workflow",
  "Task",
];

const SORT_OPTIONS = [
  { label: "Tên A-Z", value: "name-asc" },
  { label: "Tên Z-A", value: "name-desc" },
  { label: "Nhiều widget nhất", value: "widgets-desc" },
  { label: "Ít widget nhất", value: "widgets-asc" },
];

export default function DashboardLibraryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");

  const filtered = useMemo(() => {
    let result = dashboardConfigs.map((dashboard) => {
      const meta =
        dashboardMetadata[
          dashboard.id as keyof typeof dashboardMetadata
        ];
      const stats = countWidgets(dashboard.widgets);
      return { dashboard, meta, stats };
    });

    // Filter by search
    if (search.trim()) {
      result = result.filter(({ dashboard, meta }) =>
        dashboard.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        meta?.category
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter(
        ({ meta }) => meta?.category === activeCategory
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.dashboard.name.localeCompare(b.dashboard.name);
      }
      if (sortBy === "name-desc") {
        return b.dashboard.name.localeCompare(a.dashboard.name);
      }
      if (sortBy === "widgets-desc") {
        return b.stats.total - a.stats.total;
      }
      if (sortBy === "widgets-asc") {
        return a.stats.total - b.stats.total;
      }
      return 0;
    });

    return result;
  }, [search, activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-green-700">
              Dashboard Library
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              Explore business dashboards developed by NHT Solutions.
            </p>
          </div>

          <Link
            to="/dashboard-settings"
            className="
              flex items-center gap-2
              px-5 py-2.5
              rounded-lg
              bg-green-600
              text-white
              text-sm
              font-semibold
              shadow-md shadow-green-600/10
              hover:bg-green-700
              transition-all
              duration-300
              whitespace-nowrap
            "
          >
            ⚙ Dashboard Settings
          </Link>
        </div>
        
        {/* SEARCH + SORT */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm dashboard..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-10 pr-4 py-2.5
                rounded-lg
                bg-white
                border border-slate-200
                text-slate-800
                placeholder-slate-400
                text-sm
                focus:outline-none
                focus:border-green-600
                focus:ring-1 focus:ring-green-600
                transition
              "
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              px-4 py-2.5
              rounded-lg
              bg-white
              border border-slate-200
              text-slate-700
              text-sm
              focus:outline-none
              focus:border-green-600
              transition
              cursor-pointer
            "
          >
            {SORT_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-1.5
                rounded-full
                text-xs
                font-medium
                border
                transition-all
                duration-200
                ${activeCategory === cat
                  ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-600/20"
                  : "bg-white border-slate-200 text-slate-600 hover:border-green-600 hover:text-green-600"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RESULT COUNT */}
        <p className="text-slate-500 text-sm mb-6">
          Hiển thị{" "}
          <span className="text-green-600 font-semibold">
            {filtered.length}
          </span>{" "}
          / {dashboardConfigs.length} dashboards
        </p>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-lg">
              Không tìm thấy dashboard nào
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 text-green-600 hover:underline text-sm font-medium transition"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map(({ dashboard, meta, stats }) => (
              <Link
                key={dashboard.id}
                to={`/dashboards/${dashboard.id}`}
                className="group"
              >
                <div className="
                  bg-white
                  border border-slate-200/80
                  rounded-xl
                  p-4
                  hover:border-green-600/40
                  hover:shadow-[0_10px_30px_rgba(22,163,74,0.06)]
                  transition-all
                  duration-300
                  h-full
                  flex flex-col
                ">
                  {/* IMAGE */}
                  <div className="overflow-hidden rounded-lg mb-3 h-32 w-full bg-slate-50">
                    <img
                      src={
                        dashboardPreview[
                          dashboard.id as keyof typeof dashboardPreview
                        ]
                      }
                      alt={dashboard.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-300
                      "
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-green-600 transition-colors">
                    {dashboard.name}
                  </h3>

                  {/* CATEGORY */}
                  <p className="text-green-600 font-semibold text-[11px] mt-0.5">
                    {meta?.category}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 flex-grow">
                    {meta?.description}
                  </p>

                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                    <div className="bg-slate-50 p-1.5 rounded">
                      <p className="text-xs font-bold text-slate-700">
                        {stats.total}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Widgets
                      </p>
                    </div>

                    <div className="bg-slate-50 p-1.5 rounded">
                      <p className="text-xs font-bold text-slate-700">
                        {stats.kpi}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        KPI
                      </p>
                    </div>

                    <div className="bg-slate-50 p-1.5 rounded">
                      <p className="text-xs font-bold text-slate-700">
                        {stats.chart}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Charts
                      </p>
                    </div>

                    <div className="bg-slate-50 p-1.5 rounded">
                      <p className="text-xs font-bold text-slate-700">
                        {stats.table}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Tables
                      </p>
                    </div>
                  </div>

                  {/* STYLE */}
                  <p className="mt-3 text-[11px] text-slate-400">
                    Style:{" "}
                    <span className="text-slate-600 font-medium">
                      {dashboard.style}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}