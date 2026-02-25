export default function EntityList({ entities }) {
  if (!entities || entities.length === 0) {
    return <p className="text-gray-400">No entities detected.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {entities.map((ent, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-purple-600/20 border border-purple-500 rounded-full text-sm"
        >
          {ent.text}
        </span>
      ))}
    </div>
  );
}