export interface BIWidgetConfig {
  id: string;
  type: 'kpi' | 'chart' | 'table' | 'insight';
  title?: string;
  gridSpan?: number; // Tailwind col-span, e.g. 1, 2, 4
  dataSource?: string; // e.g. "revenueTrend", "projectStatus"
  chartType?: 'line' | 'bar' | 'pie' | 'radar' | 'area';
  // Additional config for specific widgets
  metrics?: { label: string; dataKey: string; color?: string; type?: 'currency' | 'number' | 'percent' }[];
  columns?: { header: string; accessor: string; type?: 'currency' | 'number' | 'text' | 'badge'; align?: 'left' | 'center' | 'right' }[];
}

export interface BIFilterConfig {
  id: string;
  label: string;
  type: 'select' | 'date-range' | 'search';
  options?: string[]; // Used for hardcoded select options initially
  defaultValue?: any;
}

export interface BIDashboardConfig {
  id: string;
  name: string;
  description: string;
  theme?: 'emerald' | 'blue' | 'indigo' | 'slate' | 'cyan' | 'amber' | 'violet';
  filters: BIFilterConfig[];
  layout: {
    kpis: BIWidgetConfig[];
    charts: BIWidgetConfig[];
    tables: BIWidgetConfig[];
    insights?: BIWidgetConfig[];
  };
}
