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

  const loadMockData = () => {
    setOrders([
      { id: 'ORD-7521', customer: 'Acme Corp', items: 3, value: '$4,500', status: 'Processing', date: '2023-11-20', shipmentId: 'SH-8401', inventoryImpact: 'Medium', priority: 'high' },
      { id: 'ORD-7522', customer: 'Global Motors', items: 12, value: '$18,200', status: 'Pending', date: '2023-11-21', shipmentId: null, inventoryImpact: 'High', priority: 'medium' },
      { id: 'ORD-7523', customer: 'TechStart Inc', items: 1, value: '$1,200', status: 'Shipped', date: '2023-11-18', shipmentId: 'SH-8403', inventoryImpact: 'Low', priority: 'medium' },
      { id: 'ORD-7524', customer: 'BuildWell Construction', items: 45, value: '$56,000', status: 'Delivered', date: '2023-11-15', shipmentId: 'SH-8402', inventoryImpact: 'High', priority: 'low' }
    ]);
  };

  const clearData = () => {
    setOrders([]);
  };

  return { orders, addOrder, deleteOrder, loadMockData, clearData };
}
