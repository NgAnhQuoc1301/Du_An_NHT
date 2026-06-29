import { useState } from "react";
import { dashboardConfigs } from "../data/dashboardConfigs";
import {
  saveDashboardStyle,
  getDashboardStyle,
} from "../services/dashboardConfigService";
import type { DashboardStyle } from "../types/dashboard";
import { Link } from "react-router-dom";

const STYLES: { value: DashboardStyle; label: string; desc: string }[] = [
  {
    value: "style1",
    label: "Style 1",
    desc: "Clean white — KPI cards + Line chart",
  },
  {
    value: "style2",
    label: "Style 2",
    desc: "Modern grid — Multi-column layout",
  },
  {
    value: "style3",
    label: "Style 3",
    desc: "Dark sidebar — Compact view",
  },
  {
    value: "style4",
    label: "Style 4",
    desc: "Card focus — Large KPI display",
  },
  {
    value: "style5",
    label: "Style 5",
    desc: "Minimal — Clean data layout",
  },
];

export default function DashboardSettingsPage() {

  const [styles, setStyles] = useState(() =>
    Object.fromEntries(
      dashboardConfigs.map((d) => [
        d.id,
        getDashboardStyle(d.id) || d.style,
      ])
    )
  );

  const [saved, setSaved] = useState<string | null>(null);

  const handleChange = (
    dashboardId: string,
    style: DashboardStyle
  ) => {
    setStyles((prev) => ({
      ...prev,
      [dashboardId]: style,
    }));
    saveDashboardStyle(dashboardId, style);
    setSaved(dashboardId);
    setTimeout(() => setSaved(null), 1500);
  };

  const handleReset = (dashboardId: string, defaultStyle: DashboardStyle) => {
    setStyles((prev) => ({
      ...prev,
      [dashboardId]: defaultStyle,
    }));
    saveDashboardStyle(dashboardId, defaultStyle);
    setSaved(dashboardId);
    setTimeout(() => setSaved(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* HEADER */}
    <div className="mb-12">

      <Link
        to="/dashboards"
        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition mb-6"
      >
        ← Quay lại Dashboard Library
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
        Dashboard Settings
      </h1>
      <p className="text-slate-400 mt-2 text-sm">
        Tuỳ chỉnh layout style cho từng dashboard
      </p>
      <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />

    </div>

        {/* DASHBOARD LIST */}
        <div className="space-y-6">

          {dashboardConfigs.map((dashboard) => (
            <div
              key={dashboard.id}
              className="
                bg-white/5
                border border-cyan-400/20
                rounded-2xl
                p-6
                hover:border-cyan-400/30
                transition
              "
            >

              {/* TOP ROW */}
              <div className="flex items-center justify-between mb-4">

                <div>
                  <h2 className="font-bold text-lg text-white">
                    {dashboard.name}
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    ID: {dashboard.id}
                  </p>
                </div>

                {/* Saved badge */}
                {saved === dashboard.id && (
                  <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full">
                    ✓ Đã lưu
                  </span>
                )}

              </div>

              {/* STYLE SELECTOR */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {STYLES.map((style) => (
                  <button
                    key={style.value}
                    onClick={() =>
                      handleChange(dashboard.id, style.value)
                    }
                    className={`
                      p-3
                      rounded-xl
                      border
                      text-left
                      transition-all
                      duration-200
                      ${styles[dashboard.id] === style.value
                        ? "bg-cyan-500/20 border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                        : "bg-white/5 border-cyan-400/10 hover:border-cyan-400/30"
                      }
                    `}
                  >
                    <p className="text-sm font-semibold text-white">
                      {style.label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-4">
                      {style.desc}
                    </p>
                  </button>
                ))}
              </div>

              {/* BOTTOM ROW */}
              <div className="flex items-center justify-between">

                <p className="text-xs text-slate-500">
                  Style hiện tại:{" "}
                  <span className="text-cyan-300 font-medium">
                    {styles[dashboard.id]}
                  </span>
                </p>

                <button
                  onClick={() =>
                    handleReset(dashboard.id, dashboard.style)
                  }
                  className="text-xs text-slate-400 hover:text-cyan-300 transition"
                >
                  ↺ Reset mặc định
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}