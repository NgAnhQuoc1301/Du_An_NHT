export interface ProjectRecord {
  id: string;
  ProjectName: string;
  Department: string;
  Manager: string;
  Status: string; // 'On Track', 'At Risk', 'Delayed', 'Completed'
  Priority: string; // 'High', 'Medium', 'Low'
  Budget: number;
  Spent: number;
  Progress: number; // 0-100%
  StartDate: string; // YYYY-MM-DD
  EndDate: string; // YYYY-MM-DD
  Year: number;
  Quarter: string;
  TeamSize: number;
}

const DEPARTMENTS = ['IT', 'Engineering', 'Marketing', 'Operations', 'Finance', 'HR'];
const MANAGERS = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'];
const STATUSES = ['On Track', 'At Risk', 'Delayed', 'Completed'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const PROJECT_NAMES = ['ERP Upgrade', 'CRM Mobile App', 'Dashboard Redesign', 'AI Integration', 'Warehouse System', 'Cloud Migration', 'Security Audit', 'New Website Launch', 'Employee Portal', 'Supply Chain Optimization'];

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

function generateProjectData(): ProjectRecord[] {
  const data: ProjectRecord[] = [];
  let id = 1;

  for (const year of [2025, 2026]) {
    for (const quarter of QUARTERS) {
      for (const dept of DEPARTMENTS) {
        const numProjects = 2 + Math.floor(Math.random() * 4); // 2 to 5 projects per dept per quarter

        for (let i = 0; i < numProjects; i++) {
          const budget = 50_000_000 + Math.floor(Math.random() * 450_000_000);
          const isCompleted = Math.random() > 0.8;
          let progress = isCompleted ? 100 : Math.floor(10 + Math.random() * 85);
          
          let status = 'On Track';
          if (isCompleted) status = 'Completed';
          else if (progress < 40 && Math.random() > 0.5) status = 'Delayed';
          else if (progress < 70 && Math.random() > 0.7) status = 'At Risk';

          // Spent is usually related to progress, but can be overbudget
          const spentRatio = (progress / 100) * (0.8 + Math.random() * 0.4); 
          const spent = Math.min(budget * 1.5, Math.round(budget * spentRatio));

          // Calculate a random month within the quarter (0, 1, 2)
          const qIndex = QUARTERS.indexOf(quarter);
          const startMonth = 1 + qIndex * 3 + Math.floor(Math.random() * 2);
          const endMonth = startMonth + 1 + Math.floor(Math.random() * 6);
          
          const startDate = `${year}-${String(startMonth).padStart(2, '0')}-01`;
          let endYear = year;
          let finalEndMonth = endMonth;
          if (finalEndMonth > 12) {
            finalEndMonth -= 12;
            endYear++;
          }
          const endDate = `${endYear}-${String(finalEndMonth).padStart(2, '0')}-28`;

          data.push({
            id: `PRJ-${1000 + id++}`,
            ProjectName: `${PROJECT_NAMES[Math.floor(Math.random() * PROJECT_NAMES.length)]} ${id}`,
            Department: dept,
            Manager: MANAGERS[Math.floor(Math.random() * MANAGERS.length)],
            Status: status,
            Priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
            Budget: budget,
            Spent: spent,
            Progress: progress,
            StartDate: startDate,
            EndDate: endDate,
            Year: year,
            Quarter: quarter,
            TeamSize: 3 + Math.floor(Math.random() * 15),
          });
        }
      }
    }
  }

  return data;
}

export const PROJECT_DATA = generateProjectData();

export const PROJECT_STATUS_COLORS: Record<string, string> = {
  'On Track': '#10b981', // green
  'At Risk': '#f59e0b',  // amber
  'Delayed': '#ef4444',  // red
  'Completed': '#3b82f6',// blue
};

export const PROJECT_PRIORITY_COLORS: Record<string, string> = {
  'High': '#ef4444',
  'Medium': '#f59e0b',
  'Low': '#10b981',
};