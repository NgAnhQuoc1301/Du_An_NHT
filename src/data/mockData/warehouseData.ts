export const warehouseKpiData = [
  {
    id: "inventory",
    title: "Total Inventory",
    value: "12,500",
    change: "+5%",
    positive: true,
  },
  {
    id: "stockvalue",
    title: "Stock Value",
    value: "$450K",
    change: "+3%",
    positive: true,
  },
  {
    id: "lowstock",
    title: "Low Stock Items",
    value: "48",
    change: "+12%",
    positive: false,
  },
  {
    id: "outofstock",
    title: "Out of Stock",
    value: "12",
    change: "+4%",
    positive: false,
  },
];

export const warehouseCategoryData = [
  {
    name: "Điện tử",
    value: 3200,
    color: "#3B82F6",
  },
  {
    name: "Gia dụng",
    value: 2800,
    color: "#10B981",
  },
  {
    name: "Thực phẩm",
    value: 2100,
    color: "#F59E0B",
  },
  {
    name: "May mặc",
    value: 1900,
    color: "#8B5CF6",
  },
  {
    name: "Khác",
    value: 2500,
    color: "#94A3B8",
  },
];

export const warehouseAlertData = [
  {
    id: 1,
    product: "Máy lạnh Nagakawa 1HP",
    category: "Điện tử",
    stock: 5,
    minStock: 20,
    status: "low",
  },
  {
    id: 2,
    product: "Tủ lạnh 2 cánh 350L",
    category: "Điện tử",
    stock: 0,
    minStock: 10,
    status: "out",
  },
  {
    id: 3,
    product: "Nồi cơm điện 1.8L",
    category: "Gia dụng",
    stock: 8,
    minStock: 30,
    status: "low",
  },
  {
    id: 4,
    product: "Quạt điều hòa",
    category: "Điện tử",
    stock: 0,
    minStock: 15,
    status: "out",
  },
  {
    id: 5,
    product: "Máy giặt 8kg",
    category: "Gia dụng",
    stock: 3,
    minStock: 10,
    status: "low",
  },
];