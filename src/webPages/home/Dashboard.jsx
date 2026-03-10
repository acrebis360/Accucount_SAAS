// app/dashboard/page.js or components/DashboardPage.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Users,
  Store,
  Box,
  DollarSign,
  ShoppingCart,
  Truck,
  BarChart3,
  PieChart,
  Activity,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const DashboardPage = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Sample data for charts and tables
  const stats = [
    { 
      title: 'Total Inventory Value', 
      value: '$2.4M', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    { 
      title: 'Total Items', 
      value: '45,892', 
      change: '+8.2%', 
      trend: 'up',
      icon: Package,
      color: 'text-black',
      bgColor: 'bg-[#F5EEE9]'
    },
    { 
      title: 'Low Stock Items', 
      value: '23', 
      change: '-5%', 
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    { 
      title: 'Active Locations', 
      value: '12', 
      change: '+2', 
      trend: 'up',
      icon: Store,
      color: 'text-black',
      bgColor: 'bg-[#F5EEE9]'
    },
  ];

  const recentActivities = [
    { id: 1, action: 'Stock count completed', location: 'Warehouse A', user: 'John Doe', time: '5 min ago', status: 'completed' },
    { id: 2, action: 'Low stock alert', location: 'Store B', user: 'System', time: '15 min ago', status: 'warning' },
    { id: 3, action: 'New shipment received', location: 'Warehouse C', user: 'Jane Smith', time: '1 hour ago', status: 'success' },
    { id: 4, action: 'Inventory transfer', location: 'A → B', user: 'Mike Johnson', time: '3 hours ago', status: 'pending' },
    { id: 5, action: 'Stock adjustment', location: 'Store A', user: 'Sarah Wilson', time: '5 hours ago', status: 'completed' },
  ];

  const topProducts = [
    { name: 'Product A', sku: 'SKU001', stock: 1245, threshold: 100, value: '$12,450', status: 'healthy' },
    { name: 'Product B', sku: 'SKU002', stock: 89, threshold: 150, value: '$8,900', status: 'low' },
    { name: 'Product C', sku: 'SKU003', stock: 567, threshold: 200, value: '$22,680', status: 'healthy' },
    { name: 'Product D', sku: 'SKU004', stock: 34, threshold: 50, value: '$3,400', status: 'critical' },
    { name: 'Product E', sku: 'SKU005', stock: 892, threshold: 300, value: '$35,680', status: 'healthy' },
  ];

  const locationStats = [
    { name: 'Warehouse A', items: 15234, value: '$890K', occupancy: 85 },
    { name: 'Warehouse B', items: 12345, value: '$720K', occupancy: 72 },
    { name: 'Store A', items: 5678, value: '$340K', occupancy: 68 },
    { name: 'Store B', items: 4231, value: '$250K', occupancy: 54 },
    { name: 'Store C', items: 3456, value: '$200K', occupancy: 45 },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white rounded-lg">
        
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-20 bg-white lg:hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold">
                <span className="text-red-600">ACCU</span>
                <span className="text-black">COUNT</span>
              </span>
              <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(false)}>
                <X size={20} />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#F5EEE9] rounded-lg">
                <Search size={18} className="text-black/40" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-sm text-black placeholder:text-black/40 w-full"
                />
              </div>
              {/* Add mobile navigation items here */}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-[#F5EEE9] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-black/50">{stat.title}</p>
                      <p className="text-2xl font-bold text-black mt-1">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === 'up' ? (
                          <ArrowUpRight size={16} className="text-green-600" />
                        ) : (
                          <ArrowDownRight size={16} className="text-red-600" />
                        )}
                        <span className={cn(
                          "text-sm",
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        )}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-black/40">vs last month</span>
                      </div>
                    </div>
                    <div className={cn("p-3 rounded-full", stat.bgColor)}>
                      <Icon size={24} className={stat.color} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* Inventory Overview Chart */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-black">Inventory Overview</CardTitle>
                  <CardDescription className="text-black/50">Stock levels across locations</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1 border-[#F5EEE9]">
                    <Calendar size={14} />
                    <span>This Week</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download size={14} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-[#F5EEE9]/30 rounded-lg">
                <p className="text-black/50">Chart component would go here</p>
                {/* Add your preferred chart library here (Recharts, Chart.js, etc.) */}
              </div>
            </CardContent>
          </Card>

          {/* Location Distribution */}
          <Card className="border-[#F5EEE9]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-black">Location Distribution</CardTitle>
                  <CardDescription className="text-black/50">Items by warehouse/store</CardDescription>
                </div>
                <Tabs defaultValue="items" className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-2 bg-[#F5EEE9]">
                    <TabsTrigger value="items" className="data-[state=active]:bg-white">Items</TabsTrigger>
                    <TabsTrigger value="value" className="data-[state=active]:bg-white">Value</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationStats.map((location, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-sm font-medium text-black">{location.name}</span>
                        <span className="text-xs text-black/50 ml-2">
                          {location.items.toLocaleString()} items
                        </span>
                      </div>
                      <span className="text-sm font-medium text-black">${location.value}</span>
                    </div>
                    <Progress 
                      value={location.occupancy} 
                      className="h-2 bg-[#F5EEE9]"
                      indicatorClassName={cn(
                        location.occupancy > 80 ? "bg-red-600" : "bg-black"
                      )}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activities */}
          <Card className="border-[#F5EEE9]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-black">Recent Activities</CardTitle>
                  <CardDescription className="text-black/50">Latest inventory updates</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Filter size={14} />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      activity.status === 'completed' && "bg-green-50",
                      activity.status === 'warning' && "bg-red-50",
                      activity.status === 'success' && "bg-[#F5EEE9]",
                      activity.status === 'pending' && "bg-yellow-50"
                    )}>
                      {activity.status === 'completed' && <CheckCircle size={16} className="text-green-600" />}
                      {activity.status === 'warning' && <AlertTriangle size={16} className="text-red-600" />}
                      {activity.status === 'success' && <Package size={16} className="text-black" />}
                      {activity.status === 'pending' && <Clock size={16} className="text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-black">{activity.action}</p>
                        <span className="text-xs text-black/50">{activity.time}</span>
                      </div>
                      <p className="text-xs text-black/50 mt-0.5">
                        {activity.location} • {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="border-[#F5EEE9]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-black">Top Products</CardTitle>
                  <CardDescription className="text-black/50">Products by stock value</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/products" className="gap-1">
                    View All
                    <ArrowUpRight size={14} />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#F5EEE9]">
                    <TableHead className="text-black/50">Product</TableHead>
                    <TableHead className="text-black/50">SKU</TableHead>
                    <TableHead className="text-black/50">Stock</TableHead>
                    <TableHead className="text-black/50 text-right">Value</TableHead>
                    <TableHead className="text-black/50">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={index} className="border-[#F5EEE9]">
                      <TableCell className="font-medium text-black">{product.name}</TableCell>
                      <TableCell className="text-black/70">{product.sku}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-black">{product.stock}</span>
                          <Progress 
                            value={(product.stock / product.threshold) * 100} 
                            className="w-16 h-1.5 bg-[#F5EEE9]"
                            indicatorClassName={cn(
                              product.status === 'healthy' && "bg-black",
                              product.status === 'low' && "bg-yellow-500",
                              product.status === 'critical' && "bg-red-600"
                            )}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-black">{product.value}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "border-0",
                            product.status === 'healthy' && "bg-green-50 text-green-700",
                            product.status === 'low' && "bg-yellow-50 text-yellow-700",
                            product.status === 'critical' && "bg-red-50 text-red-700"
                          )}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { label: 'New Stocktake', icon: Package, color: 'bg-red-600 text-white' },
            { label: 'Add Products', icon: Box, color: 'bg-black text-white' },
            { label: 'Generate Report', icon: FileText, color: 'bg-[#F5EEE9] text-black' },
            { label: 'Settings', icon: Settings, color: 'bg-white border border-[#F5EEE9] text-black' },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "h-auto py-4 flex flex-col items-center gap-2",
                  action.color,
                  "hover:scale-105 transition-transform"
                )}
              >
                <Icon size={20} />
                <span className="text-sm">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;