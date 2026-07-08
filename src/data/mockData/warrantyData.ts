export interface WarrantyRecord {
  id: string;
  Customer: string;
  Product: string;
  Category: string; // 'Electronics', 'Appliances', 'Accessories', 'Other'
  Issue: string;
  Status: string; // 'Pending', 'Processing', 'Resolved', 'Rejected'
  Priority: string; // 'High', 'Medium', 'Low'
  RequestDate: string; // YYYY-MM-DD
  ResolutionDate: string | null;
  Cost: number;
}

const CATEGORIES = ['Electronics', 'Appliances', 'Accessories', 'Other'];
const STATUSES = ['Pending', 'Processing', 'Resolved', 'Rejected'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const ISSUES = ['Power failure', 'Broken screen', 'Overheating', 'Noisy operation', 'Water leak', 'Software bug'];

function randomDate(start: Date, end: Date) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

function generateWarrantyData(): WarrantyRecord[] {
  const data: WarrantyRecord[] = [];
  const now = new Date();
  for (let i = 1; i <= 200; i++) {
    const reqDate = randomDate(new Date('2024-01-01'), now);
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const isResolved = status === 'Resolved' || status === 'Rejected';
    const resDate = isResolved ? randomDate(new Date(reqDate), now) : null;
    
    data.push({
      id: `WAR-${1000 + i}`,
      Customer: `Customer ${i}`,
      Product: `Product SKU-${Math.floor(100 + Math.random() * 900)}`,
      Category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      Issue: ISSUES[Math.floor(Math.random() * ISSUES.length)],
      Status: status,
      Priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
      RequestDate: reqDate,
      ResolutionDate: resDate,
      Cost: isResolved && status === 'Resolved' ? Math.floor(10 + Math.random() * 200) : 0,
    });
  }
  return data;
}

export const WARRANTY_DATA = generateWarrantyData();

export const WARRANTY_STATUS_COLORS: Record<string, string> = {
  'Pending': '#f59e0b',
  'Processing': '#3b82f6',
  'Resolved': '#10b981',
  'Rejected': '#ef4444',
};

export const WARRANTY_PRIORITY_COLORS: Record<string, string> = {
  'High': '#ef4444',
  'Medium': '#f59e0b',
  'Low': '#10b981',
};