import { Bell, AlertTriangle, CheckCircle, Info, Package, TruckIcon, Warehouse } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'critical',
    icon: AlertTriangle,
    title: 'Shipment Delayed',
    message: 'SH-4523 delayed by 3 hours due to traffic congestion on I-95',
    timestamp: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    icon: Warehouse,
    title: 'Low Stock Alert',
    message: 'Product SKU-4521 (Wireless Mouse Pro) is below reorder point in Warehouse B',
    timestamp: '15 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'critical',
    icon: TruckIcon,
    title: 'Vehicle Maintenance Required',
    message: 'Truck VH-892 requires immediate maintenance - brake system warning',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 4,
    type: 'info',
    icon: Package,
    title: 'Route Optimized',
    message: 'New route for SH-4524 saved 45 minutes and reduced fuel consumption by 12%',
    timestamp: '2 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'success',
    icon: CheckCircle,
    title: 'Delivery Completed',
    message: 'Shipment SH-4501 successfully delivered to Boston, MA',
    timestamp: '3 hours ago',
    read: true,
  },
  {
    id: 6,
    type: 'info',
    icon: Package,
    title: 'New Order Received',
    message: 'Order ORD-7730 received from TechCorp Inc. - 12 items valued at $4,580',
    timestamp: '4 hours ago',
    read: true,
  },
  {
    id: 7,
    type: 'warning',
    icon: Warehouse,
    title: 'Inventory Aging Alert',
    message: '4 items in Warehouse A have not moved in 30 days',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: 8,
    type: 'success',
    icon: CheckCircle,
    title: 'Maintenance Completed',
    message: 'Vehicle VH-889 has completed scheduled maintenance and is ready for service',
    timestamp: '6 hours ago',
    read: true,
  },
];

export function Notifications() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
        };
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
        };
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Mark All as Read
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            Notification Settings
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium">
            All Notifications
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Unread
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Critical
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Shipments
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Inventory
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Vehicles
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          const styles = getNotificationStyles(notification.type);

          return (
            <div
              key={notification.id}
              className={`bg-white rounded-xl border transition-all ${
                notification.read ? 'border-gray-200' : 'border-indigo-200 shadow-sm'
              }`}
            >
              <div className="p-5">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg ${styles.bgColor} ${styles.borderColor} border flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${styles.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3
                        className={`font-semibold ${
                          notification.read ? 'text-gray-900' : 'text-gray-900'
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-1.5"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                            Mark as Read
                          </button>
                        )}
                        <button className="text-xs text-gray-600 hover:text-gray-700 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          {[
            {
              category: 'Critical Alerts',
              desc: 'Shipment delays, vehicle breakdowns, system failures',
              enabled: true,
            },
            { category: 'Inventory Warnings', desc: 'Low stock, reorder points, dead stock', enabled: true },
            {
              category: 'Shipment Updates',
              desc: 'Status changes, delivery confirmations, route changes',
              enabled: true,
            },
            {
              category: 'Vehicle Maintenance',
              desc: 'Scheduled maintenance, health alerts, fuel levels',
              enabled: true,
            },
            { category: 'Order Updates', desc: 'New orders, processing status, completions', enabled: false },
            {
              category: 'Analytics Insights',
              desc: 'Performance reports, cost savings, predictions',
              enabled: false,
            },
          ].map((pref, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 mb-1">{pref.category}</p>
                <p className="text-sm text-gray-600">{pref.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={pref.enabled} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
