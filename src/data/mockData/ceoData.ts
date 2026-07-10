export interface ExecutiveDataRecord {
  id: string;
  Region: string;
  Country: string;
  Company: string;
  Department: string;
  Year: number;
  Quarter: string;
  Revenue: number;
  Cost: number;
  Profit: number;
  EBITDA: number;
  Margin: number;
  YoY_Growth: number;
  Employees: number;
  Customers: number;
  Active_Projects: number;
  Completed_Projects: number;
  Failed_Projects: number;
  Completion_Rate: number;
  Health_Score: number;
  Risk_Level: 'Thấp' | 'Trung bình' | 'Cao';
  Report_Date: string;
}

export interface RegionData {
  Region: string;
  Revenue: number;
  Cost: number;
  Profit: number;
  Projects: number;
  Employees: number;
  CSAT: number;
}

export interface DeptData {
  name: string;
  Revenue: number;
  Cost: number;
  Employees: number;
  Projects: number;
  Score: number;
}

const REGIONS = ['Miền Bắc', 'Miền Nam', 'Miền Đông', 'Miền Tây', 'Miền Trung'];
const COUNTRIES: Record<string, string[]> = {
  North: ['Ha Noi', 'Hai Phong', 'Thai Nguyen'],
  South: ['Ho Chi Minh', 'Can Tho', 'Vung Tau'],
  East: ['Da Nang', 'Quy Nhon', 'Nha Trang'],
  West: ['Hue', 'Da Lat', 'Phu Quoc'],
  Central: ['Vinh', 'Thanh Hoa', 'Ha Tinh']
};
const COMPANIES = ['NHT Solutions', 'Tech Corp', 'Biz Pro', 'Innovation Hub', 'Global Services'];
const DEPARTMENTS = ['Bán hàng', 'Marketing', 'CNTT', 'Tài chính', 'HR', 'Vận hành'];
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const RISK_LEVELS = ['Thấp', 'Trung bình', 'Cao'] as const;

function generateDetailedData(): ExecutiveDataRecord[] {
  const data: ExecutiveDataRecord[] = [];
  let id = 1;

  outer: for (const region of REGIONS) {
    const countries = COUNTRIES[region] || ['Unknown'];
    for (const country of countries) {
      for (const company of COMPANIES.slice(0, 2)) {
        for (const dept of DEPARTMENTS) {
          for (const quarter of QUARTERS) {
            const year = 2025 + Math.floor(Math.random() * 2);
            const revenue = 2000000 + Math.random() * 8000000;
            const costRatio = 0.45 + Math.random() * 0.15;
            const cost = revenue * costRatio;
            const profit = revenue - cost;
            const ebitda = profit * (0.85 + Math.random() * 0.15);
            const margin = (profit / revenue) * 100;
            const yoy = -5 + Math.random() * 20;

            data.push({
              id: `${id}`,
              Region: region,
              Country: country,
              Company: company,
              Department: dept,
              Year: year,
              Quarter: quarter,
              Revenue: Math.round(revenue),
              Cost: Math.round(cost),
              Profit: Math.round(profit),
              EBITDA: Math.round(ebitda),
              Margin: Math.round(margin * 10) / 10,
              YoY_Growth: Math.round(yoy * 10) / 10,
              Employees: Math.floor(15 + Math.random() * 60),
              Customers: Math.floor(50 + Math.random() * 200),
              Active_Projects: Math.floor(5 + Math.random() * 25),
              Completed_Projects: Math.floor(8 + Math.random() * 30),
              Failed_Projects: Math.floor(Math.random() * 5),
              Completion_Rate: Math.round((70 + Math.random() * 25) * 10) / 10,
              Health_Score: Math.round((60 + Math.random() * 40) * 10) / 10,
              Risk_Level: RISK_LEVELS[Math.floor(Math.random() * RISK_LEVELS.length)],
              Report_Date: `${year}-${String(Math.floor(quarter.charCodeAt(1)) * 3 - 2).padStart(2, '0')}-15`
            });

            id++;
            if (id > 500) break outer;
          }
        }
      }
    }
  }

  return data.slice(0, 500);
}

export const DETAILED_DATA = generateDetailedData();

export const RAW_EXCEL_DATA: RegionData[] = [
  { Region: 'Miền Bắc', Revenue: 15857901, Cost: 8775362, Profit: 7082539, Projects: 2584, Employees: 251, CSAT: 4.1 },
  { Region: 'Miền Nam', Revenue: 18217985, Cost: 9739852, Profit: 8478133, Projects: 2934, Employees: 278, CSAT: 4.3 },
  { Region: 'Miền Đông', Revenue: 17321636, Cost: 8960013, Profit: 8361623, Projects: 2572, Employees: 245, CSAT: 3.9 },
  { Region: 'Miền Tây', Revenue: 16873855, Cost: 10245203, Profit: 6628652, Projects: 2826, Employees: 264, CSAT: 4.2 },
  { Region: 'Miền Trung', Revenue: 19196912, Cost: 11320215, Profit: 7876697, Projects: 2787, Employees: 283, CSAT: 4.4 }
];

export const DEPT_DATA: DeptData[] = [
  { name: 'Bán hàng', Revenue: 17010667, Cost: 9855782, Employees: 245, Projects: 2642, Score: 91 },
  { name: 'Marketing', Revenue: 13102120, Cost: 7877514, Employees: 277, Projects: 2133, Score: 88 },
  { name: 'CNTT', Revenue: 14216982, Cost: 6742118, Employees: 246, Projects: 2041, Score: 95 },
  { name: 'Tài chính', Revenue: 13196903, Cost: 7849463, Employees: 247, Projects: 2117, Score: 85 },
  { name: 'HR', Revenue: 15068487, Cost: 8032030, Employees: 283, Projects: 2300, Score: 90 },
  { name: 'Vận hành', Revenue: 14873130, Cost: 8683738, Employees: 264, Projects: 2470, Score: 82 }
];

export const COLORS = ['#1b4332', '#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2'];

export const QUARTERLY_TREND = [
  { name: 'Q1 2025', revenue: 45000000, cost: 22500000, profit: 22500000, ebitda: 19000000 },
  { name: 'Q2 2025', revenue: 48000000, cost: 24000000, profit: 24000000, ebitda: 20500000 },
  { name: 'Q3 2025', revenue: 52000000, cost: 26000000, profit: 26000000, ebitda: 22500000 },
  { name: 'Q4 2025', revenue: 56000000, cost: 28000000, profit: 28000000, ebitda: 24500000 },
  { name: 'Q1 2026', revenue: 58000000, cost: 29000000, profit: 29000000, ebitda: 25500000 },
  { name: 'Q2 2026', revenue: 61000000, cost: 30500000, profit: 30500000, ebitda: 27000000 }
];

export const PROJECT_STATUS_DATA = [
  { name: 'Đã Xong', value: 245 },
  { name: 'In Progress', value: 178 },
  { name: 'Rủi ro', value: 45 },
  { name: 'On Hold', value: 32 }
];