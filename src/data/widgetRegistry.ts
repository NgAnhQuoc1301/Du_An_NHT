import type { WidgetConfig } from "../types/widget";

export const salesWidgets: WidgetConfig[] = [

  {
    id:"revenue",

    type:"kpi",

    title:"Doanh thu",

    value:"$120,000",

    width:3,

    icon:"DollarSign",

    description:"Tổng doanh thu bán hàng",

    dataSource:"salesRevenue",

    refreshInterval:300
},

  {
    id: "profit",

    type: "kpi",

    title: "Lợi nhuận",

    value: "$35,000",

    width: 3,

    icon: "TrendingUp",

    color: "blue",

    description: "Lợi nhuận ròng",
  },

  {
    id: "margin",

    type: "kpi",

    title: "Biên lợi nhuận",

    value: "29%",

    width: 3,

    icon: "Percent",

    color: "purple",

    description: "Biên lợi nhuận",
  },

  {
    id:"top-products",

    type:"table",

    title:"Sản phẩm hàng đầu",

    width:6,

    dataSource:"salesTopProducts",

    exportable:true,

    filterable:true
},

  {
    id:"sales-trend",

    type:"line-chart",

    chartType:"line",

    title:"Xu hướng Bán hàng",

    width:6,

    dataSource:"salesRevenueTrend",

    exportable:true,

    filterable:true,

    fullscreen:true
  },

];

export const crmWidgets: WidgetConfig[] = [
  {
    id: "leads",
    type: "kpi",
    title: "Lead",
    value: "1,250",
    width: 3,
  },

  {
    id: "customers",
    type: "kpi",
    title: "Khách hàng",
    value: "280",
    width: 3,
  },

  {
    id: "conversion",
    type: "line-chart",
    title: "Tỷ lệ chuyển đổi",
    width: 6,
  },
];

export const hrWidgets: WidgetConfig[] = [
  {
    id: "employees",
    type: "kpi",
    title: "Nhân viên",
    value: "250",
    width: 3,
  },

  {
    id: "attendance",
    type: "line-chart",
    title: "Chuyên cần",
    width: 6,
  },
];
export const ceoWidgets: WidgetConfig[] = [
  {
    id: "total-revenue",
    type: "kpi",
    title: "Tổng Doanh thu",
    value: "$2.4M",
    width: 3,
  },
  {
    id: "profit",
    type: "kpi",
    title: "Lợi nhuận",
    value: "$650K",
    width: 3,
  },
  {
    id: "ceo-trend",
    type: "line-chart",
    title: "Tăng trưởng Kinh doanh",
    width: 6,
  },
];

export const financeWidgets: WidgetConfig[] = [
  {
    id: "cashflow",
    type: "kpi",
    title: "Dòng tiền",
    value: "$850K",
    width: 3,
  },
  {
    id: "expenses",
    type: "kpi",
    title: "Chi phí",
    value: "$120K",
    width: 3,
  },
  {
    id: "finance-trend",
    type: "line-chart",
    title: "Xu hướng Tài chính",
    width: 6,
  },
];

export const projectWidgets: WidgetConfig[] = [
  {
    id: "projects",
    type: "kpi",
    title: "Dự án",
    value: "18",
    width: 3,
  },
  {
    id: "completed",
    type: "kpi",
    title: "Hoàn thành",
    value: "12",
    width: 3,
  },
  {
    id: "project-chart",
    type: "line-chart",
    title: "Tiến độ Dự án",
    width: 6,
  },
];
export const kpiWidgets: WidgetConfig[] = [
  {
    id: "overall-kpi",
    type: "kpi",
    title: "KPI Tổng thể",
    value: "92%",
    width: 3,
  },

  {
    id: "target-achievement",
    type: "kpi",
    title: "Đạt mục tiêu",
    value: "88%",
    width: 3,
  },

  {
    id: "kpi-trend",
    type: "line-chart",
    title: "Xu hướng KPI",
    width: 6,
  },
];

export const warehouseWidgets: WidgetConfig[] = [
  {
    id: "inventory",
    type: "kpi",
    title: "Tồn kho",
    value: "12,500",
    width: 3,
  },

  {
    id: "stock-value",
    type: "kpi",
    title: "Giá trị tồn kho",
    value: "$450K",
    width: 3,
  },

  {
    id: "warehouse-chart",
    type: "line-chart",
    title: "Lưu chuyển tồn kho",
    width: 6,
  },
];

export const warrantyWidgets: WidgetConfig[] = [
  {
    id: "warranty-cases",
    type: "kpi",
    title: "Ca bảo hành",
    value: "235",
    width: 3,
  },

  {
    id: "resolved-cases",
    type: "kpi",
    title: "Ca đã giải quyết",
    value: "198",
    width: 3,
  },

  {
    id: "warranty-chart",
    type: "line-chart",
    title: "Xu hướng Bảo hành",
    width: 6,
  },
];

export const productionWidgets: WidgetConfig[] = [
  {
    id: "production-volume",
    type: "kpi",
    title: "Sản lượng Sản xuất",
    value: "18,000",
    width: 3,
  },

  {
    id: "defect-rate",
    type: "kpi",
    title: "Tỷ lệ lỗi",
    value: "1.2%",
    width: 3,
  },

  {
    id: "production-chart",
    type: "line-chart",
    title: "Sản lượng Sản xuất",
    width: 6,
  },
];

export const workflowWidgets: WidgetConfig[] = [
  {
    id: "active-workflows",
    type: "kpi",
    title: "Quy trình Đang chạy",
    value: "48",
    width: 3,
  },

  {
    id: "completed-workflows",
    type: "kpi",
    title: "Hoàn thành",
    value: "1,250",
    width: 3,
  },

  {
    id: "workflow-chart",
    type: "line-chart",
    title: "Hiệu suất Quy trình",
    width: 6,
  },
];

export const taskWidgets: WidgetConfig[] = [
  {
    id: "total-tasks",
    type: "kpi",
    title: "Tổng Công việc",
    value: "420",
    width: 3,
  },

  {
    id: "completed-tasks",
    type: "kpi",
    title: "Công việc Hoàn thành",
    value: "365",
    width: 3,
  },

  {
    id: "task-chart",
    type: "line-chart",
    title: "Xu hướng Hoàn thành Công việc",
    width: 6,
  },
];