export default function SuggestionCard({ suggestions }) {
  const riskColor =
    suggestions.risk_level === "High"
      ? "text-red-400"
      : suggestions.risk_level === "Moderate"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="bg-slate-800 p-6 rounded-2xl mt-6 border border-slate-700">
      <h3 className={`text-lg font-bold ${riskColor}`}>
        Risk Level: {suggestions.risk_level}
      </h3>

      <div className="mt-4">
        <h4 className="font-semibold">Precautions</h4>
        <ul className="list-disc list-inside text-gray-300">
          {suggestions.precautions.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold">Treatment Recommendations</h4>
        <ul className="list-disc list-inside text-gray-300">
          {suggestions.treatment_recommendations.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}