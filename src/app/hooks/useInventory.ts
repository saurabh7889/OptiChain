import { useState, useEffect } from 'react';

export type InventoryTrend = 'up' | 'down' | 'stable';
export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Critical';
export type MovementRate = 'High' | 'Medium' | 'Low';

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  warehouse: string;
  stock: number;
  capacity: number;
  reorderPoint: number;
  movementRate: MovementRate;
  status: InventoryStatus;
  lastRestocked: string;
  trend: InventoryTrend;
}

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('optichain_inventory_live');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load inventory from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('optichain_inventory_live', JSON.stringify(inventory));
  }, [inventory]);

  const addItem = (newItem: Omit<InventoryItem, 'id' | 'sku' | 'status' | 'trend'>) => {
    const sku = `SKU-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `INV-${Math.random().toString(36).substring(2, 9)}`;
    
    let status: InventoryStatus = 'In Stock';
    if (newItem.stock <= 0) status = 'Critical';
    else if (newItem.stock < newItem.reorderPoint) status = 'Low Stock';

    const itemToAdd: InventoryItem = {
      ...newItem,
      id,
      sku,
      status,
      trend: 'stable'
    };
    setInventory(prev => [itemToAdd, ...prev]);
  };

  const deleteItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  return {
    inventory,
    addItem,
    deleteItem
  };
}
