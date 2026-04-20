import { useState, useEffect, useMemo } from 'react';
import { useShipments } from './useShipments';

export interface DeliveryData {
  month: string;
  success: number;
  delayed: number;
}

export interface CostData {
  month: string;
  cost: number;
}

export interface FuelData {
  month: string;
  usage: number;
}

export interface DistributionData {
  name: string;
  value: number;
}

export interface AnalyticsState {
  deliveryData: DeliveryData[];
  costData: CostData[];
  fuelData: FuelData[];
  shipmentDistribution: DistributionData[];
}

const defaultState: AnalyticsState = {
  deliveryData: [],
  costData: [],
  fuelData: [],
  shipmentDistribution: [],
};

const mockData: AnalyticsState = {
  deliveryData: [
    { month: 'Oct', success: 92, delayed: 8 },
    { month: 'Nov', success: 89, delayed: 11 },
    { month: 'Dec', success: 94, delayed: 6 },
    { month: 'Jan', success: 91, delayed: 9 },
    { month: 'Feb', success: 88, delayed: 12 },
    { month: 'Mar', success: 95, delayed: 5 },
    { month: 'Apr', success: 97, delayed: 3 },
  ],
  costData: [
    { month: 'Oct', cost: 245 },
    { month: 'Nov', cost: 268 },
    { month: 'Dec', cost: 234 },
    { month: 'Jan', cost: 289 },
    { month: 'Feb', cost: 256 },
    { month: 'Mar', cost: 223 },
    { month: 'Apr', cost: 198 },
  ],
  fuelData: [
    { month: 'Oct', usage: 3420 },
    { month: 'Nov', usage: 3680 },
    { month: 'Dec', usage: 3250 },
    { month: 'Jan', usage: 3890 },
    { month: 'Feb', usage: 3520 },
    { month: 'Mar', usage: 3180 },
    { month: 'Apr', usage: 2940 },
  ],
  shipmentDistribution: [
    { name: 'Delivered', value: 1247 },
    { name: 'In Transit', value: 89 },
    { name: 'Delayed', value: 23 },
    { name: 'Pending', value: 45 },
  ],
};

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsState>(() => {
    try {
      const saved = localStorage.getItem('optichain_analytics_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('optichain_analytics_v1', JSON.stringify(data));
  }, [data]);

  const loadMockData = () => {
    setData(mockData);
  };

  const clearData = () => {
    setData(defaultState);
  };

  const { shipments } = useShipments();

  const dynamicData = useMemo(() => {
    let delivered = 0, inTransit = 0, delayed = 0, pending = 0;
    shipments.forEach(s => {
      if (s.status === 'Delivered') delivered++;
      else if (s.status === 'In Transit') inTransit++;
      else if (s.status === 'Delayed') delayed++;
      else pending++;
    });

    // Only override distribution if we have actual live data, else use the state (which might be mock data)
    const hasLiveShipments = shipments.length > 0;

    return {
      ...data,
      shipmentDistribution: hasLiveShipments ? [
        { name: 'Delivered', value: delivered },
        { name: 'In Transit', value: inTransit },
        { name: 'Delayed', value: delayed },
        { name: 'Pending', value: pending },
      ] : data.shipmentDistribution
    };
  }, [data, shipments]);

  return { data: dynamicData, loadMockData, clearData };
}
