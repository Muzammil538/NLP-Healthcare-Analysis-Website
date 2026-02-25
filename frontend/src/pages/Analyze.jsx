import { useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import PredictionCard from "../components/PredictionCard";

export default function Analyze() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await API.post("/predict", { text });
      setResult(res.data);
    } catch {
      alert("Error analyzing text");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        🧠 Medical Text Analysis
      </h1>

      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
  <textarea
    className="w-full h-40 bg-slate-900 p-4 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    placeholder="Enter medical report..."
    onChange={(e) => setText(e.target.value)}
  />

  <button
    onClick={handleAnalyze}
    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 py-3 rounded-xl text-lg font-semibold transition shadow-lg"
  >
    Analyze Text
  </button>
</div>
      {result && <PredictionCard result={result} />}
    </DashboardLayout>
  );
}