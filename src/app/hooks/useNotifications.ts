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

  return { notifications, addNotification, markAllAsReadAndClear, markAsRead, deleteNotification };
}
