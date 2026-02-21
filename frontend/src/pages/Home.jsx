import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/predict", {
      text: text
    });
    setResult(response.data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        Healthcare NLP Analyzer
      </h1>

      <textarea
        className="w-full p-4 rounded bg-gray-800"
        rows="5"
        placeholder="Enter medical text..."
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-4 px-6 py-2 bg-blue-600 rounded"
        onClick={handleSubmit}
      >
        Analyze
      </button>

      {result && (
        <div className="mt-6 bg-gray-800 p-4 rounded">
          <h2>Prediction: {result.prediction}</h2>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>

          <h3 className="mt-4">Entities:</h3>
          <ul>
            {result.entities.map((ent, i) => (
              <li key={i}>
                {ent.text} - {ent.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}