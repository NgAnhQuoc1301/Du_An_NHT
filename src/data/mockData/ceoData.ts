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

export const RAW_EXCEL_DATA: RegionData[] = [
  { Region: 'Central', Revenue: 15857901, Cost: 8775362, Profit: 7082539, Projects: 2584, Employees: 251, CSAT: 4.1 },
  { Region: 'East',    Revenue: 18217985, Cost: 9739852, Profit: 8478133, Projects: 2934, Employees: 278, CSAT: 4.3 },
  { Region: 'North',   Revenue: 17321636, Cost: 8960013, Profit: 8361623, Projects: 2572, Employees: 245, CSAT: 3.9 },
  { Region: 'South',   Revenue: 16873855, Cost: 10245203, Profit: 6628652, Projects: 2826, Employees: 264, CSAT: 4.2 },
  { Region: 'West',    Revenue: 19196912, Cost: 11320215, Profit: 7876697, Projects: 2787, Employees: 283, CSAT: 4.4 }
];

export const DEPT_DATA: DeptData[] = [
  { name: 'Finance', Revenue: 13196903, Cost: 7849463, Employees: 247, Projects: 2117, Score: 85 },
  { name: 'HR', Revenue: 15068487, Cost: 8032030, Employees: 283, Projects: 2300, Score: 90 },
  { name: 'IT', Revenue: 14216982, Cost: 6742118, Employees: 246, Projects: 2041, Score: 95 },
  { name: 'Marketing', Revenue: 13102120, Cost: 7877514, Employees: 277, Projects: 2133, Score: 88 },
  { name: 'Operations', Revenue: 14873130, Cost: 8683738, Employees: 264, Projects: 2470, Score: 82 },
  { name: 'Sales', Revenue: 17010667, Cost: 9855782, Employees: 245, Projects: 2642, Score: 91 }
];

export const COLORS = ['#1b4332', '#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2'];