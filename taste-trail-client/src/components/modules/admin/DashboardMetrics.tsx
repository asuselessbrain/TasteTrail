"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStats {
  totalUsers: number;
  totalRecipes: number; // ব্যাকএন্ডে নাম 'recipes' বা 'totalRecipes' হতে পারে, চেক করে নিবেন
  pendingReview: number;
  totalCategory: number;
  totalCuisines: number;
}

interface ChartData {
  userGrowth: { date: string; users: number }[];
  recipeDistribution: { name: string; value: number }[];
}

interface DashboardData {
  stats: DashboardStats;
  charts: ChartData;
}

export default function DashboardMetrics({ data }: { data: DashboardData }) {
    const { stats, charts } = data
  const barChartData = [
    { name: "Total Users", value: data.stats.totalUsers },
    { name: "Recipes", value: data.stats.totalRecipes },
    { name: "Categories", value: data.stats.totalCategory },
    { name: "Cuisines", value: data.stats.totalCuisines },
    { name: "Pending Review", value: data.stats.pendingReview },
  ];

  const pieChartData = [
    { name: "Recipes", value: data.stats.totalRecipes },
    { name: "Categories", value: data.stats.totalCategory },
    { name: "Cuisines", value: data.stats.totalCuisines },
  ];

  const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b"];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff7300'];

  return (
    <div className="w-full space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-sm font-medium text-gray-600">Total Users</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {data.stats.totalUsers}
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
          <div className="text-sm font-medium text-gray-600">Recipes</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {data.stats.totalRecipes}
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100">
          <div className="text-sm font-medium text-gray-600">Categories</div>
          <div className="text-3xl font-bold text-amber-600 mt-2">
            {data.stats.totalCategory}
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="text-sm font-medium text-gray-600">Cuisines</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">
            {data.stats.totalCuisines}
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-sm font-medium text-gray-600">
            Pending Review
          </div>
          <div className="text-3xl font-bold text-red-600 mt-2">
            {data.stats.pendingReview}
          </div>
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
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* --- User Growth Chart (Area Chart) --- */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>User Growth (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts?.userGrowth || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => value.slice(5)} // শুধু MM-DD দেখাবে (যেমন: 02-14)
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                    name="New Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* --- Recipe Distribution Chart (Donut Pie Chart) --- */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recipe Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts?.recipeDistribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60} // Donut শেপের জন্য
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(charts?.recipeDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
