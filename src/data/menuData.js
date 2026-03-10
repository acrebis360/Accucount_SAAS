import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Box,
  Tag,
  Truck,
  FileText,
  AlertCircle,
  Activity,
  UserCog,
  Bell,
  Shield,
  Globe,
  Database,
  Mail,
  CreditCard,
} from 'lucide-react';

export const mainMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '/admin',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Package,
    href: '/admin/inventory',
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart,
    href: '/admin/orders',
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users,
    href: '/admin/customers',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/admin/settings',
  },
];

export const secondaryMenuItems = {
  dashboard: [
    {
      title: 'Overview',
      items: [
        { label: 'Summary', icon: Activity, href: '/admin?tab=summary' },
        { label: 'Recent Activity', icon: FileText, href: '/admin?tab=activity' },
        { label: 'Alerts', icon: AlertCircle, href: '/admin?tab=alerts' },
      ],
    },
    {
      title: 'Quick Actions',
      items: [
        { label: 'Add Item', icon: Package, href: '/admin/inventory/add' },
        { label: 'Create Order', icon: ShoppingCart, href: '/admin/orders/create' },
        { label: 'Add Customer', icon: Users, href: '/admin/customers/add' },
      ],
    },
  ],
  inventory: [
    {
      title: 'Management',
      items: [
        { label: 'All Items', icon: Package, href: '/admin/inventory' },
        { label: 'Categories', icon: Tag, href: '/admin/inventory/categories' },
        { label: 'Locations', icon: Globe, href: '/admin/inventory/locations' },
        { label: 'Stock Alerts', icon: AlertCircle, href: '/admin/inventory/alerts' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { label: 'Receive Stock', icon: Truck, href: '/admin/inventory/receive' },
        { label: 'Transfer', icon: Package, href: '/admin/inventory/transfer' },
        { label: 'Adjust Stock', icon: Database, href: '/admin/inventory/adjust' },
        { label: 'Count Stock', icon: Box, href: '/admin/inventory/count' },
      ],
    },
    {
      title: 'Reports',
      items: [
        { label: 'Inventory Value', icon: FileText, href: '/admin/inventory/value' },
        { label: 'Movement', icon: Activity, href: '/admin/inventory/movement' },
        { label: 'Low Stock', icon: AlertCircle, href: '/admin/inventory/low-stock' },
      ],
    },
  ],
  orders: [
    {
      title: 'Order Management',
      items: [
        { label: 'All Orders', icon: ShoppingCart, href: '/admin/orders' },
        { label: 'Pending', icon: FileText, href: '/admin/orders?status=pending' },
        { label: 'Processing', icon: Truck, href: '/admin/orders?status=processing' },
        { label: 'Completed', icon: Package, href: '/admin/orders?status=completed' },
        { label: 'Cancelled', icon: AlertCircle, href: '/admin/orders?status=cancelled' },
      ],
    },
    {
      title: 'Shipping',
      items: [
        { label: 'Shipments', icon: Truck, href: '/admin/orders/shipments' },
        { label: 'Tracking', icon: Globe, href: '/admin/orders/tracking' },
        { label: 'Returns', icon: Package, href: '/admin/orders/returns' },
      ],
    },
  ],
  customers: [
    {
      title: 'Customer Management',
      items: [
        { label: 'All Customers', icon: Users, href: '/admin/customers' },
        { label: 'Segments', icon: UserCog, href: '/admin/customers/segments' },
        { label: 'Reviews', icon: FileText, href: '/admin/customers/reviews' },
      ],
    },
    {
      title: 'Communication',
      items: [
        { label: 'Email', icon: Mail, href: '/admin/customers/email' },
        { label: 'Notifications', icon: Bell, href: '/admin/customers/notifications' },
      ],
    },
  ],
  analytics: [
    {
      title: 'Reports',
      items: [
        { label: 'Sales Report', icon: BarChart3, href: '/admin/analytics/sales' },
        { label: 'Inventory Report', icon: Package, href: '/admin/analytics/inventory' },
        { label: 'Customer Report', icon: Users, href: '/admin/analytics/customers' },
      ],
    },
    {
      title: 'Insights',
      items: [
        { label: 'Trends', icon: Activity, href: '/admin/analytics/trends' },
        { label: 'Forecasting', icon: Database, href: '/admin/analytics/forecasting' },
      ],
    },
  ],
  settings: [
    {
      title: 'General',
      items: [
        { label: 'Profile', icon: UserCog, href: '/admin/settings/profile' },
        { label: 'Preferences', icon: Settings, href: '/admin/settings/preferences' },
        { label: 'Notifications', icon: Bell, href: '/admin/settings/notifications' },
      ],
    },
    {
      title: 'Security',
      items: [
        { label: 'Users', icon: Users, href: '/admin/settings/users' },
        { label: 'Roles', icon: Shield, href: '/admin/settings/roles' },
        { label: 'Permissions', icon: Shield, href: '/admin/settings/permissions' },
      ],
    },
    {
      title: 'System',
      items: [
        { label: 'Billing', icon: CreditCard, href: '/admin/settings/billing' },
        { label: 'Integrations', icon: Globe, href: '/admin/settings/integrations' },
        { label: 'Backup', icon: Database, href: '/admin/settings/backup' },
      ],
    },
  ],
};