import { useState } from "react";
import axios from "axios";
import PredictionCard from "../components/PredictionCard";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        text,
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          🏥 Healthcare NLP Analyzer
        </h1>

        <p className="text-center text-gray-400 mb-8">
          AI-powered medical text classification and entity extraction
        </p>

        <div className="mt-10 flex flex-col items-center">
          <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
            <textarea
              className="w-full h-40 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-lg"
              placeholder="Enter medical report text here..."
              onChange={(e) => setText(e.target.value)}
              rows="5"
              cols="70"
            />
          </div>

          <button
            className="mt-6 px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 text-lg font-semibold"
            onClick={handleSubmit}
          >
            {loading ? "Analyzing..." : "Analyze Text"}
          </button>
        </div>

        {result && <PredictionCard result={result} />}
      </div>
    </div>
  );
}
