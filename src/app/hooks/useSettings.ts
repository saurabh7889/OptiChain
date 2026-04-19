import { useState, useEffect } from 'react';

export interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  companyName: string;
  industry: string;
  fleetSize: number;
  warehouses: number;
  autoRouteOptimization: boolean;
  aiInsights: boolean;
  realTimeTracking: boolean;
  autoRestock: boolean;
  vizardApiKey: string;
}

const defaultSettings: UserSettings = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@optichain.com',
  role: 'Logistics Manager',
  companyName: 'OptiChain Logistics Inc.',
  industry: 'Logistics & Transportation',
  fleetSize: 0,
  warehouses: 0,
  autoRouteOptimization: true,
  aiInsights: true,
  realTimeTracking: true,
  autoRestock: false,
  vizardApiKey: '',
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem('optichain_settings_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('optichain_settings_v1', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
}
