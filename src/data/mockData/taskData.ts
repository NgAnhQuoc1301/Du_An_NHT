export interface TaskRecord {
  id: string;
  Title: string;
  Assignee: string;
  Status: string; // 'Todo', 'In Progress', 'Done', 'Blocked'
  Priority: string; // 'High', 'Medium', 'Low'
  DueDate: string; // YYYY-MM-DD
  Project: string;
  Progress: number; // 0-100
  CreatedAt: string; // ISO date
  UpdatedAt: string;
}

const ASSIGNEES = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'];
const PROJECTS = ['ERP Upgrade', 'CRM Mobile App', 'Dashboard Redesign', 'AI Integration', 'Warehouse System'];
const STATUSES = ['Todo', 'In Progress', 'Done', 'Blocked'];
const PRIORITIES = ['High', 'Medium', 'Low'];

function randomDate(start: Date, end: Date) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

function generateTaskData(): TaskRecord[] {
  const data: TaskRecord[] = [];
  let id = 1;
  const now = new Date();
  for (let i = 0; i < 200; i++) {
    const created = randomDate(new Date('2024-01-01'), now);
    const due = randomDate(new Date(created), new Date('2026-12-31'));
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const progress = status === 'Done' ? 100 : status === 'Todo' ? 0 : Math.floor(10 + Math.random() * 80);
    data.push({
      id: `TASK-${1000 + id++}`,
      Title: `${PROJECTS[Math.floor(Math.random() * PROJECTS.length)]} - ${['Design', 'Development', 'Testing', 'Deployment'][Math.floor(Math.random() * 4)]}`,
      Assignee: ASSIGNEES[Math.floor(Math.random() * ASSIGNEES.length)],
      Status: status,
      Priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
      DueDate: due,
      Project: PROJECTS[Math.floor(Math.random() * PROJECTS.length)],
      Progress: progress,
      CreatedAt: created,
      UpdatedAt: randomDate(new Date(created), now),
    });
  }
  return data;
}

export const TASK_DATA = generateTaskData();

export const TASK_STATUS_COLORS: Record<string, string> = {
  'Todo': '#3b82f6',
  'In Progress': '#f59e0b',
  'Done': '#10b981',
  'Blocked': '#ef4444',
};

export const TASK_PRIORITY_COLORS: Record<string, string> = {
  'High': '#ef4444',
  'Medium': '#f59e0b',
  'Low': '#10b981',
};