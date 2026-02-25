import ConfidenceBar from "./ConfidenceBar";
import EntityList from "./EntityList";
import SuggestionCard from "./SuggestionCard";

export default function PredictionCard({ result }) {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 mt-6">
      <h2 className="text-2xl font-bold text-blue-400">
        {result.prediction}
      </h2>

      <ConfidenceBar
        label="Model Confidence"
        value={result.confidence}
      />

      <h3 className="mt-4 font-semibold">Entities</h3>
      <EntityList entities={result.entities} />

      <SuggestionCard suggestions={result.suggestions} />
    </div>
  );
}