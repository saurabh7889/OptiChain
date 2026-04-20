import { useState, useEffect } from 'react';

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

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('optichain_notifications_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return []; // Start empty — no fake notifications
  });

  useEffect(() => {
    localStorage.setItem('optichain_notifications_v2', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<AppNotification, 'id' | 'read'>) => {
    setNotifications(prev => [
      { ...notification, id: Date.now(), read: false },
      ...prev,
    ]);
  };

  const markAllAsReadAndClear = () => {
    setNotifications([]);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const loadMockData = () => {
    setNotifications([
      { id: 1, type: 'critical', iconType: 'alert', title: 'Route Delay: SH-8403', message: 'Vehicle VH-103 is experiencing heavy delays due to a storm in the Northeast region. Estimated delay: 4 hours.', timestamp: '10 mins ago', read: false },
      { id: 2, type: 'warning', iconType: 'warehouse', title: 'Low Stock Alert: Cooling Fans', message: 'Stock level for "Cooling Fans" in TX-South has fallen below reorder point (45/100).', timestamp: '1 hour ago', read: false },
      { id: 3, type: 'info', iconType: 'truck', title: 'Maintenance Scheduled', message: 'Vehicle VH-103 is scheduled for engine maintenance next week.', timestamp: '3 hours ago', read: true },
      { id: 4, type: 'success', iconType: 'package', title: 'Shipment Delivered', message: 'SH-8402 has been successfully delivered to Miami Depot.', timestamp: '5 hours ago', read: true }
    ]);
  };

  const clearData = () => {
    setNotifications([]);
  };

  return { notifications, addNotification, markAllAsReadAndClear, markAsRead, deleteNotification, loadMockData, clearData };
}
