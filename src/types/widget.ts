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

  value?: string;

  width?: WidgetWidth;

  /*
   * Future Ready
   */

  description?: string;

  icon?: string;

  chartType?: ChartType;

  dataSource?: string;

  unit?: string;

  color?: string;

  refreshInterval?: number;

}