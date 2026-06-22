import type { WidgetConfig } from "./widget";

export type DashboardStyle =
  | "style1"
  | "style2"
  | "style3"
  | "style4"
  | "style5";

export interface DashboardConfig {
  id: string;
  name: string;
  style: DashboardStyle;

  widgets: WidgetConfig[];
}