// app/dashboard/reports/page.tsx  (or wherever your pages live)
'use client'
import { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  DollarSign, 
  Download, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

// Dummy data – replace with real API fetches later
const stockTrendData = [
  { month: 'Jan', value: 42000 },
  { month: 'Feb', value: 38000 },
  { month: 'Mar', value: 45000 },
  { month: 'Apr', value: 52000 },
  { month: 'May', value: 48000 },
  { month: 'Jun', value: 55000 },
];

const categoryData = [
  { name: 'Electronics', value: 45 },
  { name: 'Furniture', value: 25 },
  { name: 'Consumables', value: 18 },
  { name: 'Others', value: 12 },
];

const recentStocktakes = [
  { id: 'STK-001', date: '2026-03-05', items: 342, status: 'Completed', value: 128450, user: 'Rohan K' },
  { id: 'STK-002', date: '2026-02-28', items: 289, status: 'Pending Review', value: 96420, user: 'Admin' },
  { id: 'STK-003', date: '2026-02-15', items: 415, status: 'Completed', value: 167890, user: 'Rohan K' },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('This Month');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 lg:p-8 rounded-lg">
      {/* Header */}
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Inventory & Stock Performance Overview</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
            <Calendar size={18} className="text-gray-500" />
            <select 
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm font-medium"
            >
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
            <Download size={16} />
            Export PDF
          </Button>
        </div>
      </div> */}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-600" />
              Total Stock Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,45,67,890</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight size={14} /> +12.4% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-600" />
              Inventory Turnover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8x</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
              <ArrowUpRight size={14} /> Improved by 0.6x
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Package size={18} className="text-emerald-600" />
              Total SKUs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              +48 new this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-600" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">17</div>
            <p className="text-xs text-amber-600 flex items-center gap-1 mt-1">
              <ArrowDownRight size={14} /> Critical items need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stock Value Trend */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Stock Value Trend</CardTitle>
            <CardDescription>Monthly stock valuation over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Value']}
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b98133" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Stock by Category</CardTitle>
            <CardDescription>Distribution across main categories</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Stocktakes Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Recent Stocktakes</CardTitle>
          <CardDescription>Last 30 days activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Items Count</th>
                  <th className="px-6 py-4">Value</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">User</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentStocktakes.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{item.id}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.items}</td>
                    <td className="px-6 py-4">₹{item.value.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium",
                        item.status === 'Completed' ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{item.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;