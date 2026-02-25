export default function ConfidenceBar({ label, value }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}