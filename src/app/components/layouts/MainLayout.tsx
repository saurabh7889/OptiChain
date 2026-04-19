import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  Truck,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  User,
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/shipments', label: 'Shipments', icon: Package },
  { path: '/inventory', label: 'Inventory', icon: Warehouse },
  { path: '/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/vehicles', label: 'Vehicles', icon: Truck },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background transition-colors duration-300">
      <Toaster position="top-right" richColors />
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-20' : 'w-64'
        } bg-card border-r border-border flex flex-col transition-all duration-300 shadow-sm`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">OptiChain</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search shipments, orders, inventory..."
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <ThemeToggle />
            <div className="w-px h-6 bg-border mx-2" />
            <button className="relative p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
            </button>
            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-accent transition-colors ml-1">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
