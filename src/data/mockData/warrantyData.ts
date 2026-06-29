export const warrantyKpiData = [
  {
    id: "requests",
    title: "Total Requests",
    value: "320",
    change: "+5%",
    positive: false,
  },
  {
    id: "resolved",
    title: "Resolved",
    value: "280",
    change: "+8%",
    positive: true,
  },
  {
    id: "pending",
    title: "Pending",
    value: "40",
    change: "-10%",
    positive: true,
  },
  {
    id: "satisfaction",
    title: "Satisfaction",
    value: "92%",
    change: "+2%",
    positive: true,
  },
];

export const warrantyTrendData = [
  { month: "Jan", rate: 45 },
  { month: "Feb", rate: 52 },
  { month: "Mar", rate: 48 },
  { month: "Apr", rate: 38 },
  { month: "May", rate: 35 },
  { month: "Jun", rate: 30 },
  { month: "Jul", rate: 28 },
  { month: "Aug", rate: 40 },
];

export const warrantyTypeData = [
  { name: "Điện tử", value: 140, color: "#3B82F6" },
  { name: "Gia dụng", value: 90, color: "#10B981" },
  { name: "Phụ kiện", value: 60, color: "#F59E0B" },
  { name: "Khác", value: 30, color: "#94A3B8" },
];

export const warrantyRequestData = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    product: "Máy lạnh 1HP",
    issue: "Không làm lạnh",
    status: "pending",
  },
  {
    id: 2,
    customer: "Trần Thị B",
    product: "Tủ lạnh 350L",
    issue: "Rò rỉ nước",
    status: "processing",
  },
  {
    id: 3,
    customer: "Lê Văn C",
    product: "Máy giặt 8kg",
    issue: "Không vắt được",
    status: "resolved",
  },
  {
    id: 4,
    customer: "Phạm Thị D",
    product: "Quạt điều hòa",
    issue: "Tiếng ồn lớn",
    status: "pending",
  },
];