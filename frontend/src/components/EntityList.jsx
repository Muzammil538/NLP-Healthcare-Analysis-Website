export default function EntityList({ entities }) {
  if (!entities || entities.length === 0) {
    return (
      <div className="mt-6 text-gray-400">
        No entities detected.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-purple-400 mb-2">
        Extracted Entities
      </h3>
      <div className="flex flex-wrap gap-2">
        {entities.map((ent, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-purple-600/20 border border-purple-500 rounded-full text-sm"
          >
            {ent.text}
          </span>
        ))}
      </div>
    </div>
  );
}