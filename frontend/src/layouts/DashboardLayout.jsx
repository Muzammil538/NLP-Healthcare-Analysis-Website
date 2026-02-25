import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <Sidebar />
      <div className="flex-1 p-8">
        <Navbar />
        {children}
      </div>
    </div>
  );
}