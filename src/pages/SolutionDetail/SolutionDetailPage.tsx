import React from "react";

type DashboardItem = {
  name: string;
};

const dashboards: Record<string, DashboardItem[]> = {
  ERP: [
    { name: "CEO Dashboard" },
    { name: "Warehouse Dashboard" },
    { name: "HR Dashboard" },
    { name: "Finance Dashboard" },
    { name: "Production Dashboard" },
    { name: "Task Dashboard" },
  ],
  CRM: [
    { name: "CRM Dashboard" },
    { name: "Sales Dashboard" },
    { name: "KPI Dashboard" },
  ],
  Dashboard: [
    { name: "Executive Dashboard" },
    { name: "Project Dashboard" },
  ],
};

export default function SolutionDetailPage() {
  const selected = "ERP"; // tạm fix cứng (sau có router đổi sau)

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚙️ {selected} Solution</h1>
      <p style={styles.subtitle}>
        Danh sách dashboard liên quan đến giải pháp {selected}
      </p>

      <div style={styles.grid}>
        {dashboards[selected].map((d, i) => (
          <div key={i} style={styles.card}>
            <h3 style={styles.cardTitle}>{d.name}</h3>
            <p style={styles.desc}>
              Dashboard phân tích và điều hành thuộc hệ thống {selected}.
            </p>

            <div style={styles.tag}>Active</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #0b1220, #0f172a)",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    fontSize: "26px",
    marginBottom: "6px",
    color: "#38bdf8",
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
  card: {
    padding: "16px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(37,99,235,0.25)",
    backdropFilter: "blur(10px)",
  },
  cardTitle: {
    fontSize: "15px",
    marginBottom: "6px",
  },
  desc: {
    fontSize: "13px",
    color: "#cbd5e1",
    marginBottom: "10px",
  },
  tag: {
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "6px",
    background: "#22c55e",
    fontSize: "11px",
  },
};