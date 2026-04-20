import { useState, useCallback, useMemo } from 'react';
import { DashboardData } from '../services/dashboardData';
import { useShipments } from './useShipments';
import { useVehicles } from './useVehicles';
import { useInventory } from './useInventory';
import { useOrders } from './useOrders';

export function useDashboard() {
  const { shipments } = useShipments();
  const { vehicles } = useVehicles();
  const { inventory } = useInventory();
  const { orders } = useOrders();

  const [alerts, setAlerts] = useState<any[]>([]);

  const data = useMemo(() => {
    const totalShipments = shipments.length;
    const delayedShipments = shipments.filter(s => s.status === 'Delayed').length;
    
    let healthSum = 0;
    let validItems = 0;
    inventory.forEach(item => {
      if (item.capacity > 0) {
        healthSum += (item.stock / item.capacity);
        validItems++;
      }
    });
    const inventoryHealth = validItems > 0 ? Math.round((healthSum / validItems) * 100) : 0;
    const activeVehicles = vehicles.filter(v => v.status === 'Active').length;

    const mockActivities = orders.slice(0, 5).map(o => ({
      id: o.id,
      action: 'Order Placed',
      item: `${o.customer} - ${o.value}`,
      time: 'Recently',
      status: 'success' as const
    }));

    return {
      kpis: {
        totalShipments,
        delayedShipments,
        inventoryHealth,
        activeVehicles,
        trends: { totalShipments: 0, delayedShipments: 0, inventoryHealth: 0, activeVehicles: 0 }
      },
      vehicles: vehicles.filter(v => v.status !== 'Idle').map((v) => ({
        id: v.id,
        lat: 20 + (Math.random() * 40 - 20),
        lng: 0 + (Math.random() * 40 - 20),
        status: v.health > 80 ? 'on-time' : 'delayed',
        label: `${v.model} (${v.driver})`
      })) as DashboardData['vehicles'],
      alerts: alerts,
      activities: mockActivities
    };
  }, [shipments, vehicles, inventory, orders, alerts]);

  const optimizeRoutes = useCallback(async () => {
    console.log('Routing optimization simulated');
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const refreshData = useCallback(() => {
    // Data is inherently reactive via the other hooks, this is a placeholder
    console.log('Force system sync triggered');
  }, []);

  return {
    data,
    loading: false,
    error: null,
    optimizeRoutes,
    dismissAlert,
    clearAllAlerts,
    refreshData,
  };
}
