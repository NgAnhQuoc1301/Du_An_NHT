import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Landmark, ShoppingCart, HeartHandshake, Contact, Boxes, Factory, Wrench, Target, Kanban, Workflow, ListTodo, LayoutDashboard, Activity } from "lucide-react";

import { dashboardConfigs } from "../../data/dashboardConfigs";
import { dashboardMetadata } from "../../data/dashboardMetadata";
import { countWidgets } from "../../utils/dashboardUtils";

const CATEGORIES = [
  "Tất cả",
  "Bán hàng",
  "Khách hàng",
  "Nhân sự",
  "Ban Giám đốc",
  "Tài chính",
  "Dự án",
  "Đánh giá",
  "Kho vận",
  "Bảo hành",
  "Sản xuất",
  "Quy trình",
  "Công việc",
];

const SORT_OPTIONS = [
  { label: "Tên A-Z", value: "name-asc" },
  { label: "Tên Z-A", value: "name-desc" },
  { label: "Nhiều widget nhất", value: "widgets-desc" },
  { label: "Ít widget nhất", value: "widgets-asc" },
];

export const getCategoryIcon = (category: string | undefined, className?: string) => {
  const css = className || "w-7 h-7 text-white";
  switch (category) {
    case 'Bán hàng': return <ShoppingCart className={css} strokeWidth={1.5} />;
    case 'Nhân sự': return <Contact className={css} strokeWidth={1.5} />;
    case 'Ban Giám đốc': return <Briefcase className={css} strokeWidth={1.5} />;
    case 'Khách hàng': return <HeartHandshake className={css} strokeWidth={1.5} />;
    case 'Tài chính': return <Landmark className={css} strokeWidth={1.5} />;
    case 'Dự án': return <Kanban className={css} strokeWidth={1.5} />;
    case 'Đánh giá': return <Target className={css} strokeWidth={1.5} />;
    case 'Kho vận': return <Boxes className={css} strokeWidth={1.5} />;
    case 'Bảo hành': return <Wrench className={css} strokeWidth={1.5} />;
    case 'Sản xuất': return <Factory className={css} strokeWidth={1.5} />;
    case 'Quy trình': return <Workflow className={css} strokeWidth={1.5} />;
    case 'Công việc': return <ListTodo className={css} strokeWidth={1.5} />;
    default: return <LayoutDashboard className={css} strokeWidth={1.5} />;
  }
};

export const getCategoryGradient = (category: string | undefined) => {
  switch (category) {
    case 'Bán hàng': return "from-orange-500 to-amber-500 shadow-orange-500/30";
    case 'Nhân sự': return "from-fuchsia-500 to-purple-600 shadow-fuchsia-500/30";
    case 'Ban Giám đốc': return "from-slate-700 to-slate-900 shadow-slate-700/30";
    case 'Khách hàng': return "from-rose-500 to-pink-500 shadow-rose-500/30";
    case 'Tài chính': return "from-blue-600 to-indigo-600 shadow-blue-500/30";
    case 'Dự án': return "from-indigo-500 to-cyan-500 shadow-indigo-500/30";
    case 'Đánh giá': return "from-violet-500 to-purple-600 shadow-violet-500/30";
    case 'Kho vận': return "from-amber-500 to-yellow-600 shadow-amber-500/30";
    case 'Bảo hành': return "from-cyan-500 to-blue-500 shadow-cyan-500/30";
    case 'Sản xuất': return "from-slate-500 to-slate-700 shadow-slate-500/30";
    case 'Quy trình': return "from-indigo-500 to-blue-600 shadow-indigo-500/30";
    case 'Công việc': return "from-sky-500 to-blue-500 shadow-sky-500/30";
    default: return "from-indigo-500 to-purple-600 shadow-indigo-500/30";
  }
};

const getCategoryBadgeStyle = (category: string | undefined) => {
  switch (category) {
    case 'Bán hàng': return "bg-orange-50 text-orange-700 border-orange-100";
    case 'Nhân sự': return "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100";
    case 'Ban Giám đốc': return "bg-slate-100 text-slate-700 border-slate-200";
    case 'Khách hàng': return "bg-rose-50 text-rose-700 border-rose-100";
    case 'Tài chính': return "bg-blue-50 text-blue-700 border-blue-100";
    case 'Dự án': return "bg-indigo-50 text-indigo-700 border-indigo-100";
    case 'Đánh giá': return "bg-violet-50 text-violet-700 border-violet-100";
    case 'Kho vận': return "bg-amber-50 text-amber-700 border-amber-100";
    case 'Bảo hành': return "bg-cyan-50 text-cyan-700 border-cyan-100";
    case 'Sản xuất': return "bg-slate-50 text-slate-700 border-slate-100";
    case 'Quy trình': return "bg-indigo-50 text-indigo-700 border-indigo-100";
    case 'Công việc': return "bg-sky-50 text-sky-700 border-sky-100";
    default: return "bg-indigo-50 text-indigo-700 border-indigo-100";
  }
};

export default function DashboardLibraryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
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
    if (activeCategory !== "Tất cả") {
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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white pt-20 pb-16 mb-10 border-b border-slate-100">
        <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-green-200/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-emerald-200/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200/60 text-green-700 font-bold text-xs tracking-wide shadow-sm mb-6">
            <Activity className="w-4 h-4" /> Báo cáo Điều hành
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight">
            Thư viện <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Dashboard</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Hệ thống báo cáo BI trực quan và biểu đồ phân tích chuyên sâu đa chiều, giúp Ban Lãnh đạo ra quyết định chính xác dựa trên dữ liệu thời gian thực.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        
        {/* SEARCH + SORT */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm group-focus-within:text-green-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm dashboard theo tên hoặc danh mục..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-12 pr-4 py-3.5
                rounded-2xl
                bg-white
                border border-slate-200
                text-slate-800
                placeholder-slate-400
                text-sm font-medium
                focus:outline-none
                focus:border-green-500
                focus:ring-4 focus:ring-green-500/10
                shadow-sm hover:shadow-md
                transition-all duration-300
              "
            />
          </div>

          {/* Sort */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                appearance-none
                w-full sm:w-56
                pl-4 pr-10 py-3.5
                rounded-2xl
                bg-white
                border border-slate-200
                text-slate-700
                text-sm font-medium
                focus:outline-none
                focus:border-green-500
                focus:ring-4 focus:ring-green-500/10
                shadow-sm hover:shadow-md
                transition-all duration-300
                cursor-pointer
              "
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {/* CATEGORY FILTER - BEAUTIFIED */}
        <div className="flex flex-wrap gap-3 mb-10 p-3 bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const icon = getCategoryIcon(cat === 'Tất cả' ? undefined : cat, "w-4 h-4");
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ease-out
                  ${isActive 
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/30 scale-105" 
                    : "bg-slate-50 text-slate-500 hover:bg-green-50 hover:text-green-600 border border-transparent hover:border-green-100"
                  }
                `}
              >
                {cat !== "Tất cả" && (
                  <span className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-green-500"} transition-colors`}>
                    {icon}
                  </span>
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* RESULT COUNT */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-slate-500 text-sm font-medium">
            Hiển thị <span className="text-green-600 font-bold px-1 py-0.5 bg-green-50 rounded-md">{filtered.length}</span> / {dashboardConfigs.length} kết quả
          </p>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-600 text-lg font-medium">
              Không tìm thấy dashboard nào khớp với yêu cầu.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("Tất cả");
              }}
              className="mt-6 px-6 py-2.5 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 rounded-xl text-sm font-bold transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(({ dashboard, meta, stats }) => (
              <Link
                key={dashboard.id}
                to={`/dashboards/${dashboard.id}`}
                className="group relative"
              >
                <div className="
                  bg-white
                  border border-slate-100
                  rounded-[28px]
                  p-6
                  hover:border-green-300
                  hover:shadow-[0_20px_50px_-15px_rgba(22,163,74,0.2)]
                  hover:-translate-y-2
                  transition-all
                  duration-500
                  h-full
                  flex flex-col
                  overflow-hidden
                ">
                  {/* Decorative line */}
                  <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${getCategoryGradient(meta?.category).split(' ')[0]} ${getCategoryGradient(meta?.category).split(' ')[1]} transition-all duration-300 opacity-90`} />

                  <div className="flex justify-between items-start mb-6 mt-1">
                    <div className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center
                      bg-gradient-to-br ${getCategoryGradient(meta?.category)}
                      shadow-md group-hover:scale-110 group-hover:rotate-6
                      transition-all duration-500
                    `}>
                      {getCategoryIcon(meta?.category)}
                    </div>
                    
                    <span className={`text-[10px] font-bold tracking-widest uppercase border px-3 py-1.5 rounded-full ${getCategoryBadgeStyle(meta?.category)}`}>
                      {meta?.category || "Enterprise"}
                    </span>
                  </div>

                  <h3 className="font-bold text-[17px] text-slate-800 line-clamp-1 group-hover:text-green-600 transition-colors mb-2.5 leading-tight">
                    {dashboard.name}
                  </h3>

                  <p className="text-slate-500 text-[13px] line-clamp-2 flex-grow font-normal leading-relaxed">
                    {meta?.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md">
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      {stats.total} Widgets
                    </div>
                    
                    <div className="flex items-center gap-1 text-[13px] font-bold text-green-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span>Mở</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}