export interface HRRecord {
  id: string;
  FullName: string;
  Department: string;
  Position: string;
  Region: string;
  EmploymentType: string; // 'Full-time' | 'Part-time' | 'Contract'
  Status: string;         // 'Active' | 'On Leave' | 'Resigned'
  Gender: string;         // 'Male' | 'Female'
  Year: number;
  Quarter: string;
  Month: string;
  Salary: number;
  Bonus: number;
  TrainingHours: number;
  PerformanceScore: number; // 0-100
  SatisfactionScore: number; // 0-100
  AbsenceDays: number;
  YearsOfService: number;
  Hired: number;         // 0 or 1 (new hire this period)
  Resigned: number;      // 0 or 1
}

const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'Finance', 'HR', 'Operations', 'IT', 'Customer Service'];
const POSITIONS: Record<string, string[]> = {
  Engineering:        ['Frontend Dev', 'Backend Dev', 'DevOps', 'QA Engineer', 'Tech Lead'],
  Sales:              ['Sales Executive', 'Sales Manager', 'Account Manager', 'BDM'],
  Marketing:          ['Marketing Specialist', 'Content Creator', 'Brand Manager', 'SEO Analyst'],
  Finance:            ['Accountant', 'Financial Analyst', 'Controller', 'Auditor'],
  HR:                 ['HR Specialist', 'Recruiter', 'Compensation Analyst', 'HR Manager'],
  Operations:         ['Operations Manager', 'Process Analyst', 'Supply Chain Lead'],
  IT:                 ['IT Support', 'System Admin', 'Network Engineer', 'Security Analyst'],
  'Customer Service': ['CS Agent', 'CS Lead', 'Technical Support', 'CS Manager'],
};
const REGIONS        = ['North', 'South', 'East', 'West', 'Central'];
const EMP_TYPES      = ['Full-time', 'Part-time', 'Contract'];
const STATUSES       = ['Active', 'Active', 'Active', 'On Leave', 'Resigned']; // weighted
const GENDERS        = ['Male', 'Female'];
const QUARTERS       = ['Q1', 'Q2', 'Q3', 'Q4'];
const MONTHS: Record<string, string[]> = {
  Q1: ['Jan','Feb','Mar'], Q2: ['Apr','May','Jun'],
  Q3: ['Jul','Aug','Sep'], Q4: ['Oct','Nov','Dec'],
};
const FIRST_NAMES = ['An','Bình','Cường','Dung','Em','Phúc','Giang','Hạnh','Khánh','Lan','Minh','Nam','Oanh','Phương','Quân'];
const LAST_NAMES  = ['Nguyễn','Trần','Lê','Phạm','Hoàng','Đỗ','Vũ','Bùi','Đặng','Ngô'];

function generateHRData(): HRRecord[] {
  const data: HRRecord[] = [];
  let id = 1;
  for (const dept of DEPARTMENTS) {
    for (const region of REGIONS) {
      for (const quarter of QUARTERS) {
        for (let i = 0; i < 6; i++) {
          const year = 2025 + Math.floor(Math.random() * 2);
          const month = MONTHS[quarter][Math.floor(Math.random() * 3)];
          const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
          const resigned = status === 'Resigned' ? 1 : 0;
          const salary = 8_000_000 + Math.random() * 42_000_000;
          data.push({
            id: String(id++),
            FullName: `${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]} ${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]}`,
            Department: dept,
            Position: POSITIONS[dept][Math.floor(Math.random() * POSITIONS[dept].length)],
            Region: region,
            EmploymentType: EMP_TYPES[Math.floor(Math.random() * EMP_TYPES.length)],
            Status: status,
            Gender: GENDERS[Math.floor(Math.random() * GENDERS.length)],
            Year: year,
            Quarter: quarter,
            Month: month,
            Salary: Math.round(salary),
            Bonus: Math.round(salary * (0.05 + Math.random() * 0.20)),
            TrainingHours: Math.floor(4 + Math.random() * 40),
            PerformanceScore: Math.round((55 + Math.random() * 45) * 10) / 10,
            SatisfactionScore: Math.round((50 + Math.random() * 50) * 10) / 10,
            AbsenceDays: Math.floor(Math.random() * 12),
            YearsOfService: Math.floor(0.5 + Math.random() * 10),
            Hired: Math.random() > 0.85 ? 1 : 0,
            Resigned: resigned,
          });
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

export const HR_DATA = generateHRData();

export const DEPT_COLORS: Record<string, string> = {
  Engineering:        '#3b82f6',
  Sales:              '#10b981',
  Marketing:          '#8b5cf6',
  Finance:            '#f59e0b',
  HR:                 '#ef4444',
  Operations:         '#06b6d4',
  IT:                 '#6366f1',
  'Customer Service': '#ec4899',
};