import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { role } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">AI Clinical Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Role: {role?.toUpperCase()}
        </p>
      </div>

      <div className="bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
        🧠 Healthcare NLP Platform
      </div>
    </div>
  );
}