import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-slate-900 p-6 text-white border-r border-slate-800">
      <h2 className="text-2xl font-bold mb-12 text-blue-400">
        🏥 MedAI
      </h2>

      <nav className="flex flex-col gap-6 text-gray-300 text-lg">
        <Link to="/dashboard" className="hover:text-white transition">
          📊 Dashboard
        </Link>
        <Link to="/analyze" className="hover:text-white transition">
          🧠 Analyze
        </Link>
        <Link to="/history" className="hover:text-white transition">
          📜 History
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-16 w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl transition"
      >
        Logout
      </button>
    </div>
  );
}