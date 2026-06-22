import { useParams } from "react-router-dom";

export default function DashboardDetailPage() {
  const { slug } = useParams();

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">

      <h1 className="text-5xl font-bold mb-6">
        {slug?.toUpperCase()} Dashboard
      </h1>

      <p className="text-slate-500 mb-10">
        Dashboard specification and KPI definition.
      </p>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-slate-100 rounded-xl h-96"></div>

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Business Purpose
          </h2>

          <p>
            Monitor performance and support
            decision-making processes.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            KPIs
          </h2>

          <ul className="list-disc pl-6">
            <li>Revenue</li>
            <li>Growth</li>
            <li>Conversion Rate</li>
            <li>Performance</li>
          </ul>
        </div>

      </div>

    </div>
  );
}