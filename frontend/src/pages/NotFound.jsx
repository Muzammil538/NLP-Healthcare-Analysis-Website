import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-6xl font-bold text-blue-400 mb-4">
        404
      </h1>
      <p className="text-xl mb-6 text-gray-400">
        Page not found
      </p>

      <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}