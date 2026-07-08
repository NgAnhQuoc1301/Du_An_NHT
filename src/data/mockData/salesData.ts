// ── Sales Data Record ─────────────────────────────────────────────────────────
export interface SalesRecord {
  id: string;
  Region: string;
  Country: string;
  SalesPerson: string;
  Channel: string;     // 'Online' | 'Offline' | 'Partner'
  Category: string;    // 'Electronics' | 'Home Appliance' | 'Accessories' | 'Other'
  Product: string;
  Year: number;
  Quarter: string;
  Month: string;
  Revenue: number;
  Cost: number;
  Profit: number;
  Orders: number;
  Customers: number;
  AvgOrderValue: number;
  ReturnRate: number;   // %
  SatisfactionScore: number; // /5.0
  ConversionRate: number; // %
  Target: number;
  AchievementRate: number; // %
}

// ── Constants ─────────────────────────────────────────────────────────────────
const REGIONS   = ['North', 'South', 'East', 'West', 'Central'];
const COUNTRIES: Record<string, string[]> = {
  North:   ['Ha Noi', 'Hai Phong', 'Thai Nguyen'],
  South:   ['Ho Chi Minh', 'Can Tho', 'Vung Tau'],
  East:    ['Da Nang', 'Quy Nhon', 'Nha Trang'],
  West:    ['Hue', 'Da Lat', 'Phu Quoc'],
  Central: ['Vinh', 'Thanh Hoa', 'Ha Tinh'],
};
const SALESPERSONS = [
  'Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường',
  'Phạm Thị Dung', 'Hoàng Văn Em', 'Đỗ Thị Phúc',
  'Vũ Văn Giang', 'Ngô Thị Hạnh',
];
const CHANNELS   = ['Online', 'Offline', 'Partner'];
const CATEGORIES: Record<string, string[]> = {
  Electronics:     ['Điều hòa Nagakawa 1HP', 'Điều hòa 2HP Inverter', 'Tủ lạnh 350L', 'Tủ lạnh Side by Side'],
  'Home Appliance': ['Máy giặt 8kg', 'Máy giặt 10kg', 'Nồi cơm điện 1.8L', 'Lò vi sóng'],
  Accessories:     ['Remote thay thế', 'Bộ lọc không khí', 'Giá đỡ điều hòa', 'Cáp kết nối'],
  Other:           ['Bảo hành mở rộng', 'Dịch vụ lắp đặt', 'Phụ kiện OEM'],
};
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const MONTHS: Record<string, string[]> = {
  Q1: ['Jan', 'Feb', 'Mar'],
  Q2: ['Apr', 'May', 'Jun'],
  Q3: ['Jul', 'Aug', 'Sep'],
  Q4: ['Oct', 'Nov', 'Dec'],
};

// ── Generator ─────────────────────────────────────────────────────────────────
function generateSalesData(): SalesRecord[] {
  const data: SalesRecord[] = [];
  let id = 1;

  for (const region of REGIONS) {
    for (const country of (COUNTRIES[region] || [])) {
      for (const salesperson of SALESPERSONS.slice(0, 3)) {
        for (const channel of CHANNELS) {
          for (const [category, products] of Object.entries(CATEGORIES)) {
            for (const quarter of QUARTERS) {
              const year = 2025 + Math.floor(Math.random() * 2);
              const month = MONTHS[quarter][Math.floor(Math.random() * 3)];
              const product = products[Math.floor(Math.random() * products.length)];
              const revenue = Math.round(5_000_000 + Math.random() * 45_000_000);
              const costRatio = 0.55 + Math.random() * 0.15;
              const cost = Math.round(revenue * costRatio);
              const profit = revenue - cost;
              const orders = Math.floor(20 + Math.random() * 180);
              const customers = Math.floor(orders * (0.7 + Math.random() * 0.3));
              const target = Math.round(revenue * (0.8 + Math.random() * 0.4));

              data.push({
                id: String(id++),
                Region: region,
                Country: country,
                SalesPerson: salesperson,
                Channel: channel,
                Category: category,
                Product: product,
                Year: year,
                Quarter: quarter,
                Month: month,
                Revenue: revenue,
                Cost: cost,
                Profit: profit,
                Orders: orders,
                Customers: customers,
                AvgOrderValue: Math.round(revenue / orders),
                ReturnRate: Math.round((1 + Math.random() * 8) * 10) / 10,
                SatisfactionScore: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
                ConversionRate: Math.round((15 + Math.random() * 35) * 10) / 10,
                Target: target,
                AchievementRate: Math.round((revenue / target) * 100 * 10) / 10,
              });

              if (id > 600) break;
            }
            if (id > 600) break;
          }
          if (id > 600) break;
        }
        if (id > 600) break;
      }
      if (id > 600) break;
    }
    if (id > 600) break;
  }

  return data.slice(0, 600);
}

export const SALES_DATA = generateSalesData();

// ── Pre-aggregated for chart seeds (fallback when no filter) ──────────────────
export const SALES_CHANNEL_COLORS: Record<string, string> = {
  Online:  '#3b82f6',
  Offline: '#10b981',
  Partner: '#8b5cf6',
};

export const SALES_CATEGORY_COLORS: Record<string, string> = {
  Electronics:     '#f59e0b',
  'Home Appliance': '#10b981',
  Accessories:     '#3b82f6',
  Other:           '#6b7280',
};