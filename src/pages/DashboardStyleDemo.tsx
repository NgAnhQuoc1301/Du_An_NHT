import DashboardRenderer from "../dashboards/DashboardRenderer";

export default function DashboardStyleDemo() {
  return (
    <div className="space-y-20">

      <DashboardRenderer
        title="Style 1 Demo"
        style="style1"
      />

      <DashboardRenderer
        title="Style 2 Demo"
        style="style2"
      />

      <DashboardRenderer
        title="Style 3 Demo"
        style="style3"
      />

      <DashboardRenderer
        title="Style 4 Demo"
        style="style4"
      />

      <DashboardRenderer
        title="Style 5 Demo"
        style="style5"
      />

    </div>
  );
}