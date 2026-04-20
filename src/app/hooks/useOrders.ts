import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  customer: string;
  items: number;
  value: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
  shipmentId: string | null;
  inventoryImpact: 'High' | 'Medium' | 'Low';
  priority: 'high' | 'medium' | 'low';
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('optichain_orders_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return []; // Start with zero data
  });

  useEffect(() => {
    localStorage.setItem('optichain_orders_v2', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Omit<Order, 'id'>) => {
    const id = `ORD-${Math.floor(7000 + Math.random() * 1000)}`;
    setOrders(prev => [{ ...order, id }, ...prev]);
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return { orders, addOrder, deleteOrder };
}
