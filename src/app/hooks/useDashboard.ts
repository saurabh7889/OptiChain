import { useState, useEffect, useCallback } from 'react';
import { simulator, DashboardData } from '../services/dashboardData';

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = simulator.subscribe((newData) => {
      setData(newData);
      setLoading(false);
    });

    return () => { unsubscribe(); };
  }, []);

  const optimizeRoutes = useCallback(() => {
    simulator.optimizeRoutes();
  }, []);

  const dismissAlert = useCallback((id: string) => {
    simulator.dismissAlert(id);
  }, []);

  const refreshData = useCallback(() => {
    simulator.refreshData();
  }, []);

  return {
    data,
    loading,
    optimizeRoutes,
    dismissAlert,
    refreshData,
  };
}
