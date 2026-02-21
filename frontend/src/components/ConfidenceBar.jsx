export default function ConfidenceBar({ label, value }) {
  return (
    <div className="mb-3">
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      {!label && (
        <div className="text-sm mb-1">
          Confidence: {value}%
        </div>
      )}
      <div className="w-full bg-slate-700 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}