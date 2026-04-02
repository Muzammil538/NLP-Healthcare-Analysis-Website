import ConfidenceBar from "./ConfidenceBar";
import EntityList from "./EntityList";
import SuggestionCard from "./SuggestionCard";

export default function PredictionCard({ result }) {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 mt-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">Top Predictions</h3>
        {result.top_3 ? (
          <div className="space-y-4">
            {result.top_3.map((pred, index) => (
              <div key={index} className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                <h4 className="text-lg font-semibold text-blue-400">
                  #{index + 1} {pred.prediction}
                </h4>
                <ConfidenceBar
                  label="Confidence"
                  value={pred.confidence}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
            <h4 className="text-lg font-semibold text-blue-400">
              {result.prediction}
            </h4>
            <ConfidenceBar
              label="Confidence"
              value={result.confidence}
            />
          </div>
        )}
      </div>

      <h3 className="mt-4 font-semibold">Entities</h3>
      <EntityList entities={result.entities} />

      <SuggestionCard suggestions={result.suggestions} />
    </div>
  );
}