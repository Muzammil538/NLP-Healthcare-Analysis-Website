import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ChartCard({ data }) {
  const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#10b981"];

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
      <h3 className="text-xl font-semibold mb-4">
        Category Distribution
      </h3>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="prediction"
          outerRadius={100}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}