import { useState, useEffect } from 'react';

export interface WarehouseInfo {
  id: string;
  name: string;
  utilization: number;
  items: number;
  alerts: number;
}

export function useWarehouses() {
  const [warehouses, setWarehouses] = useState<WarehouseInfo[]>(() => {
    try {
      const saved = localStorage.getItem('optichain_warehouses_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return []; // Starts at zero
  });

  useEffect(() => {
    localStorage.setItem('optichain_warehouses_v2', JSON.stringify(warehouses));
  }, [warehouses]);

  const addWarehouse = (data: { name: string }) => {
    setWarehouses(prev => [...prev, {
      id: `WH-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name,
      items: 0,
      alerts: 0,
      utilization: 0,
    }]);
  };

  const deleteWarehouse = (id: string) => {
    setWarehouses(prev => prev.filter(w => w.id !== id));
  };

  return { warehouses, addWarehouse, deleteWarehouse };
}
