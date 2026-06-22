export type WidgetType =
  | "kpi"
  | "line-chart"
  | "bar-chart"
  | "pie-chart"
  | "table"
  | "chart"; // Add this line to include the "chart" type

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
}