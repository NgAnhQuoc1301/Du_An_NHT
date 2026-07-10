export interface WarrantyRecord {
  id: string;
  Customer: string;
  Product: string;
  Category: string; // 'Điện tử', 'Gia dụng', 'Phụ kiện', 'Khác'
  Issue: string;
  Status: string; // 'Chờ xử lý', 'Đang xử lý', 'Đã giải quyết', 'Đã từ chối'
  Priority: string; // 'Cao', 'Trung bình', 'Thấp'
  RequestDate: string; // YYYY-MM-DD
  ResolutionDate: string | null;
  Cost: number;
}

const CATEGORIES = ['Điện tử', 'Gia dụng', 'Phụ kiện', 'Khác'];
const STATUSES = ['Chờ xử lý', 'Đang xử lý', 'Đã giải quyết', 'Đã từ chối'];
const PRIORITIES = ['Cao', 'Trung bình', 'Thấp'];
const ISSUES = ['Lỗi nguồn', 'Vỡ màn hình', 'Quá nhiệt', 'Hoạt động ồn', 'Rò rỉ nước', 'Lỗi phần mềm'];

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
    const isResolved = status === 'Đã giải quyết' || status === 'Đã từ chối';
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
      Cost: isResolved && status === 'Đã giải quyết' ? Math.floor(10 + Math.random() * 200) : 0,
    });
  }
  return data;
}

export const WARRANTY_DATA = generateWarrantyData();

export const WARRANTY_STATUS_COLORS: Record<string, string> = {
  'Chờ xử lý': '#f59e0b',
  'Đang xử lý': '#3b82f6',
  'Đã giải quyết': '#10b981',
  'Đã từ chối': '#ef4444',
};

export const WARRANTY_PRIORITY_COLORS: Record<string, string> = {
  'Cao': '#ef4444',
  'Trung bình': '#f59e0b',
  'Thấp': '#10b981',
};