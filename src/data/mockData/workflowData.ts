export const workflowKpiData = [
  {
    id: "total",
    title: "Total Workflows",
    value: "48",
    change: "+6",
    positive: true,
  },
  {
    id: "active",
    title: "Active",
    value: "32",
    change: "+4",
    positive: true,
  },
  {
    id: "pending",
    title: "Pending Approval",
    value: "12",
    change: "+2",
    positive: false,
  },
  {
    id: "completed",
    title: "Completed",
    value: "4",
    change: "+1",
    positive: true,
  },
];

export const workflowTypeData = [
  { name: "Mua hàng", value: 18, color: "#3B82F6" },
  { name: "Nhân sự", value: 12, color: "#10B981" },
  { name: "Tài chính", value: 10, color: "#8B5CF6" },
  { name: "Vận hành", value: 8, color: "#F59E0B" },
];

export const workflowListData = [
  {
    id: 1,
    name: "Phê duyệt mua hàng Q3",
    type: "Mua hàng",
    requester: "Nguyễn Văn A",
    status: "pending",
    created: "20/07/2025",
  },
  {
    id: 2,
    name: "Xét duyệt tăng lương",
    type: "Nhân sự",
    requester: "Trần Thị B",
    status: "approved",
    created: "18/07/2025",
  },
  {
    id: 3,
    name: "Thanh toán nhà cung cấp",
    type: "Tài chính",
    requester: "Lê Văn C",
    status: "pending",
    created: "22/07/2025",
  },
  {
    id: 4,
    name: "Nghỉ phép dài hạn",
    type: "Nhân sự",
    requester: "Phạm Thị D",
    status: "rejected",
    created: "19/07/2025",
  },
];