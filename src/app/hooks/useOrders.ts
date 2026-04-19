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

const defaultOrders: Order[] = [
  {
    id: 'ORD-7723',
    customer: 'TechCorp Inc.',
    items: 12,
    value: '$4,580',
    status: 'Shipped',
    date: '2026-04-17',
    shipmentId: 'SH-4530',
    inventoryImpact: 'Medium',
    priority: 'high',
  },
  {
    id: 'ORD-7722',
    customer: 'Global Logistics Ltd.',
    items: 8,
    value: '$2,340',
    status: 'Processing',
    date: '2026-04-17',
    shipmentId: null,
    inventoryImpact: 'Low',
    priority: 'medium',
  },
  {
    id: 'ORD-7721',
    customer: 'Supply Chain Co.',
    items: 24,
    value: '$8,920',
    status: 'Delivered',
    date: '2026-04-16',
    shipmentId: 'SH-4528',
    inventoryImpact: 'High',
    priority: 'high',
  },
  {
    id: 'ORD-7720',
    customer: 'Retail Express',
    items: 6,
    value: '$1,560',
    status: 'Pending',
    date: '2026-04-18',
    shipmentId: null,
    inventoryImpact: 'Low',
    priority: 'low',
  },
  {
    id: 'ORD-7719',
    customer: 'Distribution Partners',
    items: 18,
    value: '$6,240',
    status: 'Shipped',
    date: '2026-04-16',
    shipmentId: 'SH-4529',
    inventoryImpact: 'Medium',
    priority: 'medium',
  },
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('optichain_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultOrders;
  });

  useEffect(() => {
    localStorage.setItem('optichain_orders_v1', JSON.stringify(orders));
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
