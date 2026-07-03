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
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white">

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">

        {/* HEADER */}
    <div className="mb-14">

  <Link
    to="/dashboards"
    className="
      inline-flex
      items-center
      gap-2
      text-green-600
      hover:text-green-700
      font-medium
      transition
      mb-6
    "
  >
    ← Quay lại Dashboard Library
  </Link>

  <h1 className="text-5xl font-bold bg-gradient-to-r from-green-700 via-green-500 to-emerald-500 bg-clip-text text-transparent">
    Dashboard Settings
  </h1>

  <p className="mt-4 text-gray-600 text-lg">
    Tuỳ chỉnh layout style cho từng Dashboard
  </p>

  <div className="mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-green-600 via-green-500 to-emerald-400" />

</div>

        {/* DASHBOARD LIST */}
        <div className="space-y-6">

          {dashboardConfigs.map((dashboard) => (
            <div
              key={dashboard.id}
              className="
                group
                relative
                overflow-hidden

                bg-white

                rounded-2xl

                p-6

                border-2
                border-green-300

                ring-1
                ring-green-100

                shadow-lg

                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-green-600
                hover:ring-green-300
                hover:shadow-[0_20px_45px_rgba(34,197,94,0.18)]
                "
            >
              <div
                className="
                  absolute
                  top-0
                  left-0
                  h-1
                  w-full
                  bg-gradient-to-r
                  from-green-600
                  via-green-500
                  to-emerald-400
                "
              />
              {/* TOP ROW */}
              <div className="flex items-center justify-between mb-4">

                <div>
                  <h2 className="font-bold text-xl text-gray-800">
                    {dashboard.name}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    ID: {dashboard.id}
                  </p>
                </div>

                {/* Saved badge */}
                {saved === dashboard.id && (
                  <span className="
                  text-xs
                  font-semibold
                  text-green-700
                  bg-green-100
                  border
                  border-green-300
                  px-3
                  py-1
                  rounded-full
                  ">
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
                      p-4

                      rounded-xl

                      border-2

                      transition-all
                      duration-300

                      ${
                      styles[dashboard.id]===style.value
                      ?`
                      bg-green-600
                      border-green-600
                      text-white
                      shadow-lg
                      scale-105
                      `
                      :`
                      bg-white
                      border-green-200
                      hover:border-green-500
                      hover:bg-green-50
                      hover:-translate-y-1
                      `
                      }
                      `}
                  >
                    <p
                      className={`text-sm font-semibold ${
                      styles[dashboard.id]===style.value
                      ? "text-white"
                      : "text-gray-800"
                      }`}
                      >
                      {style.label}
                    </p>
                    <p
                      className={`text-[10px] mt-1 leading-4 ${
                      styles[dashboard.id]===style.value
                      ? "text-green-100"
                      : "text-gray-500"
                      }`}
                      >
                      {style.desc}
                    </p>
                  </button>
                ))}
              </div>

              {/* BOTTOM ROW */}
              <div className="flex items-center justify-between">

                <p className="text-sm text-gray-600">
                  Style hiện tại:{" "}
                  <span className="font-semibold text-green-600">
                    {styles[dashboard.id]}
                  </span>
                </p>

                <button
                  onClick={() =>
                    handleReset(dashboard.id, dashboard.style)
                  }
                  className="
                  text-sm
                  font-medium
                  text-green-600
                  hover:text-green-700
                  transition
                  "
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