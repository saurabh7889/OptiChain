import { useState, useEffect, useCallback } from 'react';
import { DashboardData } from '../services/dashboardData';

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // In a real production app, this URL would come from an environment variable
      const response = await fetch('http://localhost:5000/api/dashboard');
      if (!response.ok) throw new Error('Backend synchronization failed');
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // We keep existing data if fetch fails after initial load
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Real-time polling every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const optimizeRoutes = useCallback(async () => {
    console.log('Routing optimization request sent to Python engine');
    // Ported from previous local simulator logic to placeholder for API call
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setData(prev => prev ? {
      ...prev,
      alerts: prev.alerts.filter(a => a.id !== id)
    } : null);
  }, []);

  const refreshData = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    optimizeRoutes,
    dismissAlert,
    refreshData,
  };
}
