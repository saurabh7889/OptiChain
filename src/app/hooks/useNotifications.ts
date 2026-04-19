import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, Package, TruckIcon, Warehouse } from 'lucide-react';

export type NotificationType = 'critical' | 'warning' | 'success' | 'info';

export interface AppNotification {
  id: number;
  type: NotificationType;
  iconType: 'alert' | 'warehouse' | 'truck' | 'package' | 'check' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const defaultNotifications: AppNotification[] = [
  {
    id: 1,
    type: 'critical',
    iconType: 'alert',
    title: 'Shipment Delayed',
    message: 'SH-4523 delayed by 3 hours due to traffic congestion on I-95',
    timestamp: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    iconType: 'warehouse',
    title: 'Low Stock Alert',
    message: 'Product SKU-4521 (Wireless Mouse Pro) is below reorder point in Warehouse B',
    timestamp: '15 minutes ago',
    read: false,
  },
  {
    id: 3,
    type: 'critical',
    iconType: 'truck',
    title: 'Vehicle Maintenance Required',
    message: 'Truck VH-892 requires immediate maintenance - brake system warning',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 4,
    type: 'info',
    iconType: 'package',
    title: 'Route Optimized',
    message: 'New route for SH-4524 saved 45 minutes and reduced fuel consumption by 12%',
    timestamp: '2 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'success',
    iconType: 'check',
    title: 'Delivery Completed',
    message: 'Shipment SH-4501 successfully delivered to Boston, MA',
    timestamp: '3 hours ago',
    read: true,
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('optichain_notifications_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultNotifications;
  });

  useEffect(() => {
    localStorage.setItem('optichain_notifications_v1', JSON.stringify(notifications));
  }, [notifications]);

  const markAllAsReadAndClear = () => {
    setNotifications([]);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, markAllAsReadAndClear, markAsRead, deleteNotification };
}
