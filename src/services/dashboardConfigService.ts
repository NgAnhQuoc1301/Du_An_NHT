import type { DashboardStyle } from "../types/dashboard";

const KEY = "dashboard-styles";

export function saveDashboardStyle(
  dashboardId: string,
  style: DashboardStyle
) {
  const current = getAllStyles();
  current[dashboardId] = style;
  localStorage.setItem(KEY, JSON.stringify(current));

  // Phát sự kiện để DashboardDetailPage cập nhật
  window.dispatchEvent(new Event("storage"));
}

export function getDashboardStyle(
  dashboardId: string
): DashboardStyle | null {
  const all = getAllStyles();
  return (all[dashboardId] as DashboardStyle) || null;
}

function getAllStyles(): Record<string, string> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}