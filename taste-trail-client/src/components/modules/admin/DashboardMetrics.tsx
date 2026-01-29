'use client';

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface DashboardData {
  totalUsers: number;
  recipes: number;
  pendingReview: number;
  totalCategory: number;
  totalCuisines: number;
}

export default function DashboardMetrics({ data }: { data: DashboardData }) {
  const barChartData = [
    { name: 'Total Users', value: data.totalUsers },
    { name: 'Recipes', value: data.recipes },
    { name: 'Categories', value: data.totalCategory },
    { name: 'Cuisines', value: data.totalCuisines },
    { name: 'Pending Review', value: data.pendingReview },
  ];

  // Data for Pie Chart
  const pieChartData = [
    { name: 'Recipes', value: data.recipes },
    { name: 'Categories', value: data.totalCategory },
    { name: 'Cuisines', value: data.totalCuisines },
  ];

  const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="w-full space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-sm font-medium text-gray-600">Total Users</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">{data.totalUsers}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
          <div className="text-sm font-medium text-gray-600">Recipes</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{data.recipes}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100">
          <div className="text-sm font-medium text-gray-600">Categories</div>
          <div className="text-3xl font-bold text-amber-600 mt-2">{data.totalCategory}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="text-sm font-medium text-gray-600">Cuisines</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">{data.totalCuisines}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-sm font-medium text-gray-600">Pending Review</div>
          <div className="text-3xl font-bold text-red-600 mt-2">{data.pendingReview}</div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Overview Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Content Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
