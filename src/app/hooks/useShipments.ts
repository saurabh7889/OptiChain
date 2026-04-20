import { useState, useEffect } from 'react';

export type ShipmentStatus = 'In Transit' | 'Delayed' | 'Delivered' | 'Packed';
export type ShipmentPriority = 'high' | 'medium' | 'low';

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  progress: number;
  eta: string;
  vehicle: string;
  driver: string;
  items: number;
  weight: string;
  priority: ShipmentPriority;
}

export function useShipments() {
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    try {
      const saved = localStorage.getItem('optichain_shipments_v5');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load shipments from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('optichain_shipments_v5', JSON.stringify(shipments));
  }, [shipments]);

  // Force cache clear on hot reload so user sees empty without refresh
  useEffect(() => {
    const hasCleared = localStorage.getItem('has_cleared_demo_v5');
    if (!hasCleared) {
      setShipments([]);
      localStorage.setItem('has_cleared_demo_v5', 'true');
    }
  }, []);

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setShipments(prevShipments => 
        prevShipments.map(shipment => {
          if (shipment.status === 'Delivered') return shipment;

          let newProgress = shipment.progress;

          // Only progress sometimes to make it look realistic
          if (Math.random() > 0.5) {
            newProgress += Math.floor(Math.random() * 5);
          }

          if (newProgress >= 100) {
            return {
              ...shipment,
              progress: 100,
              status: 'Delivered',
              eta: 'Completed',
            };
          }

          let newStatus = shipment.status;
          if (newProgress > 15 && shipment.status === 'Packed') {
            newStatus = 'In Transit';
          }

          // Random delay simulation
          if (Math.random() > 0.95 && shipment.status !== 'Delayed') {
             newStatus = 'Delayed';
          } else if (Math.random() > 0.9 && shipment.status === 'Delayed') {
             newStatus = 'In Transit';
          }

          let newEta = shipment.eta;
          if (newStatus === 'Delayed') {
            newEta = 'Delayed (Unknown)';
          } else if (newProgress < 50) {
            newEta = '4+ hours';
          } else if (newProgress < 80) {
             newEta = '1-3 hours';
          } else if (newProgress < 100) {
             newEta = '< 1 hour';
          }

          return {
            ...shipment,
            progress: newProgress,
            status: newStatus,
            eta: newEta
          };
        })
      );
    }, 5000); // update every 5 seconds for visual demo

    return () => clearInterval(interval);
  }, []);

  const addShipment = (newShipment: Omit<Shipment, 'id' | 'progress' | 'status' | 'eta'>) => {
    const id = `SH-${Math.floor(4000 + Math.random() * 1000)}`;
    const shipmentToAdd: Shipment = {
      ...newShipment,
      id,
      progress: 0,
      status: 'Packed',
      eta: 'Calculating...',
    };
    setShipments(prev => [shipmentToAdd, ...prev]);
  };

  const deleteShipment = (id: string) => {
    setShipments(prev => prev.filter(shipment => shipment.id !== id));
  };

  const loadMockData = () => {
    setShipments([
      { id: 'SH-8401', origin: 'New York, NY', destination: 'Los Angeles, CA', status: 'In Transit', progress: 65, eta: '2 days', vehicle: 'VH-101', driver: 'John Doe', items: 120, weight: '1,450 kg', priority: 'high' },
      { id: 'SH-8402', origin: 'Chicago, IL', destination: 'Miami, FL', status: 'Delivered', progress: 100, eta: 'Completed', vehicle: 'VH-102', driver: 'Jane Smith', items: 45, weight: '300 kg', priority: 'medium' },
      { id: 'SH-8403', origin: 'Boston, MA', destination: 'Seattle, WA', status: 'Delayed', progress: 25, eta: 'Delayed (Weather)', vehicle: 'VH-103', driver: 'Mike Johnson', items: 85, weight: '890 kg', priority: 'high' },
      { id: 'SH-8404', origin: 'Austin, TX', destination: 'Denver, CO', status: 'Packed', progress: 0, eta: 'Calculating...', vehicle: 'VH-104', driver: 'Sarah Williams', items: 210, weight: '2,100 kg', priority: 'low' }
    ]);
  };

  const clearData = () => {
    setShipments([]);
  };

  return {
    shipments,
    addShipment,
    deleteShipment,
    loadMockData,
    clearData
  };
}
