import { Package, TruckIcon, AlertTriangle, Warehouse, Activity, Zap, RefreshCw, Search, Box } from 'lucide-react';
import { KPICard } from '../shared/KPICard';
import { AlertCard } from '../shared/AlertCard';
import { useDashboard } from '../../hooks/useDashboard';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function Dashboard() {
  const { data, loading, dismissAlert, refreshData } = useDashboard();
  const navigate = useNavigate();

  if (loading || !data) {
    return (
      <div className="p-6 flex items-center justify-center h-full bg-gray-50/50">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="text-gray-600 font-medium animate-pulse">Initializing Control Tower...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Control Tower</h1>
          <p className="text-gray-500 mt-1 font-medium">Real-time supply chain monitoring & analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Quick search..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-64 bg-white/50 backdrop-blur-sm transition-all"
            />
          </div>
          <button 
            onClick={() => {
              refreshData();
              toast.success('System synchronization forced');
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Sync System
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Shipments"
          value={data.kpis.totalShipments}
          change={0}
          icon={Package}
          status="neutral"
        />
        <KPICard
          title="Delayed Shipments"
          value={data.kpis.delayedShipments}
          change={0}
          icon={AlertTriangle}
          status={data.kpis.delayedShipments > 0 ? 'danger' : 'neutral'}
        />
        <KPICard
          title="Inventory Health"
          value={data.kpis.inventoryHealth === 0 ? '0%' : `${data.kpis.inventoryHealth}%`}
          change={0}
          icon={Warehouse}
          status="neutral"
        />
        <KPICard
          title="Active Vehicles"
          value={data.kpis.activeVehicles}
          change={0}
          icon={TruckIcon}
          status="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Tracking Map */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col min-h-[500px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <TruckIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Live Global Tracking</h2>
                <p className="text-xs text-gray-500 font-medium">Monitoring active fleet across all regions</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              data.kpis.activeVehicles > 0 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${data.kpis.activeVehicles > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              {data.kpis.activeVehicles > 0 ? 'LIVE UPDATES' : 'STATIONARY'}
            </div>
          </div>

          {/* Leaflet Map Integration */}
          <div className="relative flex-1 rounded-xl border border-gray-100 overflow-hidden shadow-inner z-0 min-h-[400px]">
             <MapContainer 
              center={[20, 0]} 
              zoom={2} 
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapView center={[20, 0]} zoom={2} />
              
              {data.vehicles.map((vehicle) => (
                <Marker key={vehicle.id} position={[vehicle.lat, vehicle.lng]}>
                  <Popup>
                    <div className="p-1">
                      <p className="font-bold text-indigo-600">{vehicle.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Status: {vehicle.status.toUpperCase()}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Empty State Overlay if no vehicles */}
            {data.vehicles.length === 0 && (
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] pointer-events-none flex items-center justify-center z-[500]">
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/50 text-center max-w-sm mx-4 transform transition-all">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <Box className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Waiting for Fleet Data</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    Once trucks are registered with destinations in the **Shipments** or **Vehicles** sections, they will appear here in real-time.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Map Controls / Summary */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'In Transit', value: 0, color: 'indigo' },
              { label: 'Completed', value: 0, color: 'green' },
              { label: 'Delayed', value: 0, color: 'red' },
              { label: 'Off-Route', value: 0, color: 'yellow' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 hover:bg-gray-50 transition-colors">
                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Critical Alerts</h2>
            <div className="px-2.5 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold">
              {data.alerts.length} NEW
            </div>
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {data.alerts.length > 0 ? (
              data.alerts.map((alert) => (
                <div key={alert.id} className="relative group">
                  <AlertCard
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    timestamp={alert.timestamp}
                  />
                  <button 
                    onClick={() => dismissAlert(alert.id)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-400 hover:text-red-600 transition-all text-[10px] font-bold"
                  >
                    DISMISS
                  </button>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                  <Zap className="w-8 h-8 text-gray-200" />
                </div>
                <h3 className="text-gray-900 font-bold">System Status: Clear</h3>
                <p className="text-sm text-gray-400 mt-2 px-6">
                  Great! No critical issues or delays detected at this moment.
                </p>
              </div>
            )}
          </div>
          
          <button 
            disabled={data.alerts.length === 0}
            className="mt-6 w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-bold text-gray-600 transition-all border border-gray-100"
          >
            Clear All Notifications
          </button>
        </div>
      </div>

      {/* Zero State Activity & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent System Activity</h2>
              <Activity className="w-5 h-5 text-gray-300" />
           </div>
           {data.activities.length > 0 ? (
             <div className="space-y-4">
                {data.activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 px-3 -mx-3 rounded-xl transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${activity.status === 'success' ? 'bg-green-500' : 'bg-indigo-500'}`}></div>
                      <div>
                        <p className="font-bold text-gray-900 leading-none">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1.5 font-medium">{activity.item}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{activity.time}</span>
                  </div>
                ))}
             </div>
           ) : (
             <div className="py-12 text-center">
                <p className="text-gray-400 text-sm font-medium italic">No recorded activity yet. Actions will sync as they occur.</p>
             </div>
           )}
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Smart Insights Engine</h2>
            <p className="text-indigo-100/80 mb-6 max-w-md font-medium">
              Our AI is waiting for movement. Once shipments and routes are active, we'll provide optimization recommendations here.
            </p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => navigate('/analytics')}
                className="px-6 py-2.5 bg-white text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all active:scale-95"
              >
                Explore Analytics
              </button>
              <button className="px-6 py-2.5 bg-indigo-500/30 text-white rounded-xl text-sm font-bold hover:bg-indigo-500/50 transition-all backdrop-blur-sm active:scale-95">
                Enable Predictions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
