export interface WorkflowRecord {
  id: string;
  ProcessName: string;
  Department: string;
  Initiator: string;
  Status: string; // 'Draft', 'In Review', 'Approved', 'Rejected', 'Completed'
  Priority: string; // 'High', 'Medium', 'Low'
  StartDate: string; // YYYY-MM-DD
  DueDate: string; // YYYY-MM-DD
  CompletionDate: string | null;
  StepsTotal: number;
  StepsCompleted: number;
}

const DEPARTMENTS = ['HR', 'Finance', 'Operations', 'IT', 'Sales'];
const STATUSES = ['Draft', 'In Review', 'Approved', 'Rejected', 'Completed'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const PROCESSES = ['Onboarding', 'Purchase Request', 'Leave Request', 'Budget Approval', 'Contract Review'];

function randomDate(start: Date, end: Date) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

function generateWorkflowData(): WorkflowRecord[] {
  const data: WorkflowRecord[] = [];
  const now = new Date();
  for (let i = 1; i <= 200; i++) {
    const startDate = randomDate(new Date('2024-01-01'), now);
    const dueDate = randomDate(new Date(startDate), new Date('2026-12-31'));
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    const isDone = status === 'Completed' || status === 'Rejected';
    const compDate = isDone ? randomDate(new Date(startDate), now) : null;
    
    const stepsTotal = Math.floor(3 + Math.random() * 5); // 3 to 7
    let stepsCompleted = 0;
    if (isDone) stepsCompleted = stepsTotal;
    else if (status !== 'Draft') stepsCompleted = Math.floor(1 + Math.random() * (stepsTotal - 1));

    data.push({
      id: `WF-${1000 + i}`,
      ProcessName: PROCESSES[Math.floor(Math.random() * PROCESSES.length)],
      Department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
      Initiator: `Employee ${i}`,
      Status: status,
      Priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
      StartDate: startDate,
      DueDate: dueDate,
      CompletionDate: compDate,
      StepsTotal: stepsTotal,
      StepsCompleted: stepsCompleted,
    });
  }
  return data;
}

export const WORKFLOW_DATA = generateWorkflowData();

export const WORKFLOW_STATUS_COLORS: Record<string, string> = {
  'Draft': '#94a3b8',
  'In Review': '#f59e0b',
  'Approved': '#3b82f6',
  'Rejected': '#ef4444',
  'Completed': '#10b981',
};

export const WORKFLOW_PRIORITY_COLORS: Record<string, string> = {
  'High': '#ef4444',
  'Medium': '#f59e0b',
  'Low': '#10b981',
};