import ConfidenceBar from "./ConfidenceBar";
import EntityList from "./EntityList";

export default function PredictionCard({ result }) {
  return (
    <div className="mt-8 bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
      
      <h2 className="text-2xl font-bold mb-2 text-green-400">
        Prediction: {result.prediction}
      </h2>

      <ConfidenceBar value={result.confidence} />

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-400">
          Top Predictions
        </h3>

        {result.top_predictions.map((item, index) => (
          <ConfidenceBar
            key={index}
            label={item.label}
            value={item.confidence}
          />
        ))}
      </div>

      <EntityList entities={result.entities} />
    </div>
  );
}