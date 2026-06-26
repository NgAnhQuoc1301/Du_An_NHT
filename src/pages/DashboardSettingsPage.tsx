import { useState } from "react";

import { dashboardConfigs }
from "../data/dashboardConfigs";

import {
  saveDashboardStyle,
  getDashboardStyle,
} from "../services/dashboardConfigService";
import type {
  DashboardStyle,
} from "../types/dashboard";
export default function DashboardSettingsPage() {

  const [styles, setStyles] = useState(() =>
  Object.fromEntries(
    dashboardConfigs.map((d) => [
      d.id,
      getDashboardStyle(d.id) || d.style,
    ])
  )
);

  const handleChange = (
  dashboardId: string,
  style: DashboardStyle
) => {

    setStyles((prev) => ({
      ...prev,
      [dashboardId]: style,
    }));

    saveDashboardStyle(
      dashboardId,
      style
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-20">

      <h1 className="text-4xl font-bold mb-10">
        Dashboard Settings
      </h1>

      {dashboardConfigs.map((dashboard) => (

        <div
          key={dashboard.id}
          className="bg-white p-6 rounded-xl shadow mb-6"
        >

          <h2 className="font-bold text-xl">
            {dashboard.name}
          </h2>

          <select
            value={styles[dashboard.id]}
            onChange={(e) =>
            handleChange(
                dashboard.id,
                e.target.value as DashboardStyle
            )
            }
            className="border rounded px-4 py-2 mt-4"
          >
            <option value="style1">
              Style 1
            </option>

            <option value="style2">
              Style 2
            </option>

            <option value="style3">
              Style 3
            </option>

            <option value="style4">
              Style 4
            </option>

            <option value="style5">
              Style 5
            </option>
          </select>

        </div>

      ))}

    </div>
  );
}