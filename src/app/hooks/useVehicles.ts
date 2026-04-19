import { useState, useEffect } from 'react';

export interface Vehicle {
  id: string;
  model: string;
  driver: string;
  status: 'Active' | 'Idle' | 'Maintenance';
  currentShipment: string | null;
  health: number;
  mileage: string;
  lastMaintenance: string;
  nextMaintenance: string;
  fuelLevel: number;
  location: string;
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem('optichain_vehicles_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return []; // Start with 0 data
  });

  useEffect(() => {
    localStorage.setItem('optichain_vehicles_v1', JSON.stringify(vehicles));
  }, [vehicles]);

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const id = `VH-${Math.floor(800 + Math.random() * 100)}`;
    setVehicles(prev => [{ ...vehicle, id }, ...prev]);
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  return { vehicles, addVehicle, deleteVehicle };
}
