export const productionKpiData = [
  {
    id: "output",
    title: "Daily Output",
    value: "2,400",
    change: "+8%",
    positive: true,
  },
  {
    id: "efficiency",
    title: "Efficiency",
    value: "87%",
    change: "+3%",
    positive: true,
  },
  {
    id: "defect",
    title: "Defect Rate",
    value: "1.2%",
    change: "-0.3%",
    positive: true,
  },
  {
    id: "downtime",
    title: "Downtime",
    value: "4.5h",
    change: "+1h",
    positive: false,
  },
];

export const productionTrendData = [
  { month: "Jan", rate: 2100 },
  { month: "Feb", rate: 2200 },
  { month: "Mar", rate: 2150 },
  { month: "Apr", rate: 2300 },
  { month: "May", rate: 2280 },
  { month: "Jun", rate: 2350 },
  { month: "Jul", rate: 2380 },
  { month: "Aug", rate: 2400 },
];

export const productionLineData = [
  {
    name: "Line A",
    value: 820,
    color: "#3B82F6",
  },
  {
    name: "Line B",
    value: 740,
    color: "#10B981",
  },
  {
    name: "Line C",
    value: 680,
    color: "#8B5CF6",
  },
  {
    name: "Line D",
    value: 580,
    color: "#F59E0B",
  },
];

export const productionAlertData = [
  {
    id: 1,
    line: "Line A",
    issue: "Máy đóng gói chậm",
    severity: "medium",
    time: "08:30",
  },
  {
    id: 2,
    line: "Line C",
    issue: "Thiếu nguyên liệu đầu vào",
    severity: "high",
    time: "09:15",
  },
  {
    id: 3,
    line: "Line B",
    issue: "Bảo trì định kỳ",
    severity: "low",
    time: "10:00",
  },
];