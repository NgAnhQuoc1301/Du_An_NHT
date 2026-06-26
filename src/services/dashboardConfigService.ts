export function saveDashboardStyle(
  dashboardId: string,
  style: string
) {
  const configs = JSON.parse(
    localStorage.getItem("dashboardStyles") || "{}"
  );

  configs[dashboardId] = style;

  localStorage.setItem(
    "dashboardStyles",
    JSON.stringify(configs)
  );
}

export function getDashboardStyle(
  dashboardId: string
) {
  const configs = JSON.parse(
    localStorage.getItem("dashboardStyles") || "{}"
  );

  return configs[dashboardId];
}