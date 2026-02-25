import { useEffect, useState, useContext } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Patients() {
  const { role } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (role === "doctor") {
      API.get("/patients")
        .then((res) => setPatients(res.data))
        .catch(() => console.log("Error loading patients"));
    }
  }, [role]);

  if (role !== "doctor") {
    return (
      <DashboardLayout>
        <p className="text-red-400">
          Access restricted to doctors only.
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        👨‍⚕️ Patient Records
      </h1>

      <div className="grid gap-6">
        {patients.length === 0 && (
          <p className="text-gray-400">
            No patients found.
          </p>
        )}

        {patients.map((p) => (
          <div
            key={p.id}
            className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
          >
            <h3 className="text-lg font-semibold">
              {p.name}
            </h3>
            <p className="text-gray-400">{p.email}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}