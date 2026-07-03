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
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}
    <div className="flex items-start justify-between mb-8">

      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">
          Dashboard Library
        </h1>
        <p className="text-white-300 text-sm md:text-base">
          Explore business dashboards developed by NHT Solutions.
        </p>
      </div>

      <Link
        to="/dashboard-settings"
        className="
          flex items-center gap-2
          px-5 py-2.5
          rounded-xl
          bg-gradient-to-r from-green-500 to-green-600
          text-white
          text-sm
          font-semibold
          shadow-lg shadow-green-500/30
          hover:from-green-400 hover:to-green-500
          hover:shadow-green-400/40
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
                pl-10 pr-4 py-3
                rounded-xl
                bg-white
                border border-green-400/20
                text-white
                placeholder-slate-400
                text-sm
                focus:outline-none
                focus:border-green-400/50
                transition
              "
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              px-4 py-3
              rounded-xl
              bg-slate-900
              border border-cyan-400/20
              text-slate-300
              text-sm
              focus:outline-none
              focus:border-cyan-400/50
              transition
              cursor-pointer
            "
          >
            {SORT_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-slate-900"
              >
                {opt.label}
              </option>
            ))}
          </select>

        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2
                rounded-full
                text-xs
                font-medium
                border
                transition-all
                duration-200
                ${activeCategory === cat
                  ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-white border-cyan-400/20 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RESULT COUNT */}
        <p className="text-slate-400 text-sm mb-6">
          Hiển thị{" "}
          <span className="text-cyan-300 font-semibold">
            {filtered.length}
          </span>{" "}
          / {dashboardConfigs.length} dashboards
        </p>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">
              Không tìm thấy dashboard nào
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm transition"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            {filtered.map(({ dashboard, meta, stats }) => (
              <Link
                key={dashboard.id}
                to={`/dashboards/${dashboard.id}`}
                className="group"
              >
                <div className="
                  bg-white
                  backdrop-blur-lg
                  border border-cyan-400/20
                  rounded-2xl
                  p-4
                  hover:border-cyan-400/50
                  hover:shadow-[0_20px_50px_rgba(34,197,94,0.18)]
                  transition-all
                  duration-300
                  h-full
                ">

                  {/* IMAGE */}
                  <img
                    src={
                      dashboardPreview[
                        dashboard.id as keyof typeof dashboardPreview
                      ]
                    }
                    alt={dashboard.name}
                    className="
                      h-28
                      w-full
                      object-cover
                      rounded-xl
                      mb-3
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  />

                  {/* TITLE */}
                  <h3 className="font-bold text-sm text-white">
                    {dashboard.name}
                  </h3>

                  {/* CATEGORY */}
                  <p className="text-cyan-400 text-xs mt-1">
                    {meta?.category}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">
                    {meta?.description}
                  </p>

                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-2 mt-4 text-center">

                    <div>
                      <p className="text-sm font-bold text-white">
                        {stats.total}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Widgets
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        {stats.kpi}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        KPI
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        {stats.chart}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Charts
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        {stats.table}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Tables
                      </p>
                    </div>

                  </div>

                  {/* STYLE */}
                  <p className="mt-3 text-[11px] text-slate-500">
                    Style:{" "}
                    <span className="text-cyan-300">
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