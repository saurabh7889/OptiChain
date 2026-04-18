export interface KPIStats {
  totalShipments: number;
  delayedShipments: number;
  inventoryHealth: number;
  activeVehicles: number;
  trends: {
    totalShipments: number;
    delayedShipments: number;
    inventoryHealth: number;
    activeVehicles: number;
  };
}

export interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  status: 'on-time' | 'delayed' | 'in-transit';
  label: string;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
}

export interface Activity {
  id: string;
  action: string;
  item: string;
  time: string;
  status: 'success' | 'info';
}

export interface DashboardData {
  kpis: KPIStats;
  vehicles: Vehicle[];
  alerts: Alert[];
  activities: Activity[];
}

type Subscriber = (data: DashboardData) => void;

class DataSimulator {
  private data: DashboardData;
  private subscribers: Set<Subscriber> = new Set();

  constructor() {
    this.data = this.getInitialData();
  }

  private getInitialData(): DashboardData {
    // Starting with ZERO data as requested
    return {
      kpis: {
        totalShipments: 0,
        delayedShipments: 0,
        inventoryHealth: 0,
        activeVehicles: 0,
        trends: {
          totalShipments: 0,
          delayedShipments: 0,
          inventoryHealth: 0,
          activeVehicles: 0,
        },
      },
      vehicles: [],
      alerts: [],
      activities: [],
    };
  }

  public subscribe(callback: Subscriber) {
    this.subscribers.add(callback);
    callback(this.data);
    return () => this.subscribers.delete(callback);
  }

  private notify() {
    this.subscribers.forEach(cb => cb({ ...this.data }));
  }

  // Ready for future integration when data is added via other pages
  public updateData(newData: Partial<DashboardData>) {
    this.data = { ...this.data, ...newData };
    this.notify();
  }

  public optimizeRoutes() {
    // Will be implemented when data exists
    this.notify();
  }

  public dismissAlert(id: string) {
    this.data.alerts = this.data.alerts.filter(a => a.id !== id);
    this.notify();
  }

  public refreshData() {
    this.notify();
  }
}

export const simulator = new DataSimulator();
