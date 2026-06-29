export const taskKpiData = [
  {
    id: "total",
    title: "Total Tasks",
    value: "128",
    change: "+12",
    positive: true,
  },
  {
    id: "inprogress",
    title: "In Progress",
    value: "45",
    change: "+5",
    positive: true,
  },
  {
    id: "overdue",
    title: "Overdue",
    value: "8",
    change: "+2",
    positive: false,
  },
  {
    id: "completed",
    title: "Completed",
    value: "75",
    change: "+8",
    positive: true,
  },
];

export const taskStatusData = [
  { name: "Completed", value: 75, color: "#10B981" },
  { name: "In Progress", value: 45, color: "#3B82F6" },
  { name: "Overdue", value: 8, color: "#EF4444" },
];

export const taskTrendData = [
  { month: "Jan", rate: 40 },
  { month: "Feb", rate: 48 },
  { month: "Mar", rate: 52 },
  { month: "Apr", rate: 58 },
  { month: "May", rate: 62 },
  { month: "Jun", rate: 68 },
  { month: "Jul", rate: 72 },
  { month: "Aug", rate: 75 },
];

export const taskListData = [
  {
    id: 1,
    title: "Thiết kế UI Dashboard",
    assignee: "Nguyễn Văn A",
    priority: "high",
    status: "in-progress",
    deadline: "25/07/2025",
  },
  {
    id: 2,
    title: "Fix bug login page",
    assignee: "Trần Thị B",
    priority: "high",
    status: "overdue",
    deadline: "20/07/2025",
  },
  {
    id: 3,
    title: "Viết unit test API",
    assignee: "Lê Văn C",
    priority: "medium",
    status: "completed",
    deadline: "30/07/2025",
  },
  {
    id: 4,
    title: "Deploy staging server",
    assignee: "Phạm Thị D",
    priority: "low",
    status: "in-progress",
    deadline: "01/08/2025",
  },
  {
    id: 5,
    title: "Review code PR #42",
    assignee: "Hoàng Văn E",
    priority: "medium",
    status: "completed",
    deadline: "22/07/2025",
  },
];