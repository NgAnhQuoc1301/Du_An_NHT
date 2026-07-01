export type WidgetType =
  | "kpi"
  | "line-chart"
  | "bar-chart"
  | "pie-chart"
  | "table"
  | "funnel-chart";

export type WidgetWidth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export type ChartType =
  | "line"
  | "bar"
  | "pie"
  | "funnel";

export interface WidgetConfig {
  id: string;

  type: WidgetType;

  title: string;

  width?: WidgetWidth;

  value?: string;

  /*
   * Chart
   */
  chartType?: ChartType;

  dataSource?: string;

  /*
   * Display
   */
  description?: string;

  icon?: string;

  unit?: string;

  color?: string;

  /*
   * Dashboard
   */
  refreshInterval?: number;

  exportable?: boolean;

  filterable?: boolean;

  fullscreen?: boolean;
}