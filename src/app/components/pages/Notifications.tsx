import { Bell, AlertTriangle, CheckCircle, Info, Package, TruckIcon, Warehouse, Sparkles, Trash2, Database } from 'lucide-react';
import { toast } from 'sonner';
import { useNotifications } from '../../hooks/useNotifications';

export function Notifications() {
  const { notifications, markAllAsReadAndClear, markAsRead, deleteNotification, loadMockData, clearData } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleAISummary = () => {
    if (unreadCount === 0) {
      toast.info("No unread notifications to summarize.");
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Vizard AI is analyzing your notifications...',
        success: `Vizard AI Summary: You have ${unreadCount} unread items. Please check critical delays and maintenance warnings immediately to prevent bottlenecks.`,
        error: 'Failed to generate AI summary',
      }
    );
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleAISummary}
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium flex items-center gap-2 border border-purple-200"
          >
            <Sparkles className="w-4 h-4" />
            Vizard AI Summary
          </button>
          <button
            onClick={notifications.length === 0 ? loadMockData : clearData}
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium flex items-center gap-2 border border-purple-200"
          >
            <Database className="w-4 h-4" />
            {notifications.length === 0 ? 'Load Mock Data' : 'Clear Data'}
          </button>
          <button
            onClick={() => {
              markAllAsReadAndClear();
              toast.success("All notifications cleared!");
            }}
            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            Settings
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
          const getIconComponent = (iconType: string) => {
            switch (iconType) {
              case 'alert': return AlertTriangle;
              case 'warehouse': return Warehouse;
              case 'truck': return TruckIcon;
              case 'package': return Package;
              case 'check': return CheckCircle;
              case 'info': return Info;
              default: return Bell;
            }
          };
          const Icon = getIconComponent(notification.iconType);
          const styles = getNotificationStyles(notification.type);
          return (
            <div
              key={notification.id}
              className={`bg-white rounded-xl border transition-all ${notification.read ? 'border-gray-200' : 'border-indigo-200 shadow-sm'
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
                        className={`font-semibold ${notification.read ? 'text-gray-900' : 'text-gray-900'
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
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs text-red-600 hover:text-red-700 font-medium ml-2"
                        >
                          Delete
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
