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

  const loadMockData = () => {
    setVehicles([
      { id: 'VH-101', model: 'Volvo VNL 860', driver: 'John Doe', status: 'Active', currentShipment: 'SH-8401', health: 98, mileage: '45,200 km', fuelLevel: 75, location: 'In Transit', lastMaintenance: '2 weeks ago', nextMaintenance: '2 months' },
      { id: 'VH-102', model: 'Freightliner Cascadia', driver: 'Jane Smith', status: 'Idle', currentShipment: null, health: 100, mileage: '12,500 km', fuelLevel: 100, location: 'Miami Depot', lastMaintenance: '1 week ago', nextMaintenance: '3 months' },
      { id: 'VH-103', model: 'Kenworth T680', driver: 'Mike Johnson', status: 'Active', currentShipment: 'SH-8403', health: 85, mileage: '125,000 km', fuelLevel: 45, location: 'Delayed Route', lastMaintenance: '4 months ago', nextMaintenance: 'Next Week' },
      { id: 'VH-104', model: 'Peterbilt 579', driver: 'Sarah Williams', status: 'Maintenance', currentShipment: null, health: 60, mileage: '280,000 km', fuelLevel: 15, location: 'Denver Service Center', lastMaintenance: '6 months ago', nextMaintenance: 'In Progress' }
    ]);
  };

  const clearData = () => {
    setVehicles([]);
  };

  return { vehicles, addVehicle, deleteVehicle, loadMockData, clearData };
}
