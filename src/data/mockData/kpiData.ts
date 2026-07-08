export interface KPIRecord {
  id: string;
  Year: number;
  Quarter: string;
  Month: string;
  Department: string; // 'Sales', 'Finance', 'HR', 'Operations', 'IT'
  Category: string; // e.g. 'Revenue', 'Customer', 'Efficiency', 'Quality'
  MetricName: string; 
  MetricType: string; // 'currency', 'percent', 'number'
  Actual: number;
  Target: number;
  Achievement: number; // % (Actual / Target)
  Status: string; // 'On Track', 'At Risk', 'Behind'
}

const DEPARTMENTS = ['Sales', 'Finance', 'HR', 'Operations', 'IT'];
const CATEGORIES = ['Financial', 'Customer', 'Process', 'People'];

const METRICS: Record<string, { name: string, type: string, min: number, max: number }[]> = {
  Sales: [
    { name: 'Revenue', type: 'currency', min: 100000000, max: 500000000 },
    { name: 'Win Rate', type: 'percent', min: 15, max: 40 },
    { name: 'New Customers', type: 'number', min: 20, max: 100 },
  ],
  Finance: [
    { name: 'Net Profit Margin', type: 'percent', min: 10, max: 35 },
    { name: 'Operating Cash Flow', type: 'currency', min: 50000000, max: 200000000 },
  ],
  HR: [
    { name: 'Employee Turnover', type: 'percent', min: 2, max: 15 },
    { name: 'Training Hours', type: 'number', min: 100, max: 500 },
  ],
  Operations: [
    { name: 'Order Fulfillment Rate', type: 'percent', min: 85, max: 100 },
    { name: 'Defect Rate', type: 'percent', min: 0.5, max: 5 },
  ],
  IT: [
    { name: 'System Uptime', type: 'percent', min: 98, max: 100 },
    { name: 'Helpdesk SLA', type: 'percent', min: 80, max: 98 },
  ],
};

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const MONTHS: Record<string, string[]> = {
  Q1: ['Jan', 'Feb', 'Mar'],
  Q2: ['Apr', 'May', 'Jun'],
  Q3: ['Jul', 'Aug', 'Sep'],
  Q4: ['Oct', 'Nov', 'Dec'],
};

function generateKPIData(): KPIRecord[] {
  const data: KPIRecord[] = [];
  let id = 1;

  for (const year of [2025, 2026]) {
    for (const quarter of QUARTERS) {
      for (const month of MONTHS[quarter]) {
        for (const dept of DEPARTMENTS) {
          const metrics = METRICS[dept];
          for (const metric of metrics) {
            let category = 'Process';
            if (dept === 'Sales' || dept === 'Finance') category = 'Financial';
            if (metric.name.includes('Customer')) category = 'Customer';
            if (dept === 'HR') category = 'People';

            const actual = metric.min + Math.random() * (metric.max - metric.min);
            const target = metric.type === 'percent' && metric.name.includes('Defect') 
              ? metric.min // For defects, lower is better, so target is min
              : metric.max * (0.8 + Math.random() * 0.2); // Usually target is near max

            // Calculate achievement (handling lower-is-better metrics)
            let achievement = 0;
            if (metric.name.includes('Defect') || metric.name.includes('Turnover')) {
               achievement = (target / actual) * 100;
            } else {
               achievement = (actual / target) * 100;
            }

            let status = 'On Track';
            if (achievement < 85) status = 'Behind';
            else if (achievement < 95) status = 'At Risk';

            data.push({
              id: `KPI-${id++}`,
              Year: year,
              Quarter: quarter,
              Month: month,
              Department: dept,
              Category: category,
              MetricName: metric.name,
              MetricType: metric.type,
              Actual: Math.round(actual * 10) / 10,
              Target: Math.round(target * 10) / 10,
              Achievement: Math.round(achievement * 10) / 10,
              Status: status,
            });
          }
        }
      }
    }
  }

  return data;
}

export const KPI_DATA = generateKPIData();

export const KPI_STATUS_COLORS: Record<string, string> = {
  'On Track': '#10b981', // Green
  'At Risk': '#f59e0b',  // Yellow
  'Behind': '#ef4444',   // Red
};

export const KPI_DEPT_COLORS: Record<string, string> = {
  Sales: '#3b82f6',
  Finance: '#10b981',
  HR: '#f59e0b',
  Operations: '#8b5cf6',
  IT: '#64748b',
};