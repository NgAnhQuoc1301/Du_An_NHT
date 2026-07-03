export type WidgetType =
  | "kpi"
  | "line-chart"
  | "bar-chart"
  | "pie-chart"
  | "table"
  | "funnel-chart";

export type WidgetWidth =
  | 1 | 2 | 3 | 4 | 5 | 6
  | 7 | 8 | 9 | 10 | 11 | 12;

export type ChartType =
  | "line"
  | "bar"
  | "pie"
  | "funnel";

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  width?: WidgetWidth;
  dataSource?: string;
  // KPI
  value?: string;
  description?: string;
  color?: string;
  positive?: boolean;

  // Chart
  chartType?: ChartType;
  chartData?: ChartDataPoint[];
  chartKeys?: { key: string; color: string }[];

  // Table
  tableColumns?: string[];
  tableRows?: TableRow[];

  // Display
  icon?: string;
  unit?: string;
  refreshInterval?: number;
  exportable?: boolean;
  filterable?: boolean;
  fullscreen?: boolean;
}