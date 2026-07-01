import type { DashboardStyle } from "../types/dashboard";

const KEY = "dashboard-styles";
const OLD_KEY = "dashboardStyles";

export function saveDashboardStyle(
  dashboardId: string,
  style: DashboardStyle
) {
  // Xóa key cũ nếu còn tồn tại
  localStorage.removeItem(OLD_KEY);

  const current = getAllStyles();
  current[dashboardId] = style;
  localStorage.setItem(KEY, JSON.stringify(current));

  window.dispatchEvent(new Event("storage"));
}

export function getDashboardStyle(
  dashboardId: string
): DashboardStyle | null {
  // Migrate từ key cũ sang key mới nếu cần
  const oldRaw = localStorage.getItem(OLD_KEY);
  if (oldRaw) {
    try {
      const oldData = JSON.parse(oldRaw);
      localStorage.setItem(KEY, JSON.stringify(oldData));
      localStorage.removeItem(OLD_KEY);
    } catch {
      localStorage.removeItem(OLD_KEY);
    }
  }

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