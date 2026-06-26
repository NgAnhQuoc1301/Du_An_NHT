export type WidgetType =
  | "kpi"
  | "line-chart"
  | "bar-chart"
  | "pie-chart"
  | "table";
export type WidgetWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;

  value?: string;
  width?: WidgetWidth;
}