import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch(() => console.log("Error loading dashboard"));
  }, []);

  if (!data) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        📊 Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
  <StatsCard title="Total Queries" value={data.total_queries} />
  <StatsCard
    title="Average Confidence"
    value={`${data.avg_confidence?.toFixed(2)}%`}
  />
  <StatsCard
    title="Unique Categories"
    value={data.category_distribution.length}
  />
</div>

      <ChartCard data={data.category_distribution} />
    </DashboardLayout>
  );
}