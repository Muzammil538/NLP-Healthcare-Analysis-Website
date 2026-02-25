import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

export default function History() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    API.get("/history")
      .then((res) => setQueries(res.data))
      .catch(() => console.log("Error loading history"));
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        📜 Query History
      </h1>

      <div className="grid gap-6">
  {queries.length === 0 && (
    <div className="text-gray-400">
      No analysis history available.
    </div>
  )}

  {queries.map((q) => (
    <div
      key={q.id}
      className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg"
    >
      <p className="text-gray-300 mb-2">{q.input_text}</p>
      <div className="flex justify-between">
        <span className="text-blue-400 font-semibold">
          {q.prediction}
        </span>
        <span className="text-green-400">
          {q.confidence}%
        </span>
      </div>
    </div>
  ))}
</div>
    </DashboardLayout>
  );
}