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
      const saved = localStorage.getItem('optichain_inventory_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load inventory from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('optichain_inventory_v2', JSON.stringify(inventory));
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

  const loadMockData = () => {
    setInventory([
      { id: 'INV-4921', sku: 'SKU-5442', name: 'Industrial Motors (Type A)', warehouse: 'NY-Central', stock: 450, capacity: 1000, reorderPoint: 200, movementRate: 'High', status: 'In Stock', lastRestocked: '2 days ago', trend: 'up' },
      { id: 'INV-4922', sku: 'SKU-8910', name: 'Cooling Fans', warehouse: 'TX-South', stock: 45, capacity: 500, reorderPoint: 100, movementRate: 'High', status: 'Critical', lastRestocked: '3 weeks ago', trend: 'down' },
      { id: 'INV-4923', sku: 'SKU-1102', name: 'Hydraulic Pumps', warehouse: 'CA-West', stock: 150, capacity: 600, reorderPoint: 250, movementRate: 'Medium', status: 'Low Stock', lastRestocked: '1 month ago', trend: 'stable' },
      { id: 'INV-4924', sku: 'SKU-3329', name: 'Steel Bearings', warehouse: 'NY-Central', stock: 8500, capacity: 10000, reorderPoint: 2000, movementRate: 'Low', status: 'In Stock', lastRestocked: '1 week ago', trend: 'up' }
    ]);
  };

  const clearData = () => {
    setInventory([]);
  };

  return {
    inventory,
    addItem,
    deleteItem,
    loadMockData,
    clearData
  };
}
