import { dashboardData } from "@/services/dashboardService";
import DashboardMetrics from "@/components/modules/admin/DashboardMetrics";

export default async function AdminDashboard() {
  const res = await dashboardData();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <DashboardMetrics data={res.data} />
    </div>
  );
}
