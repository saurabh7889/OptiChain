import { TruckIcon, Wrench, AlertTriangle, CheckCircle, Activity, Fuel } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { ProgressBar } from '../shared/ProgressBar';

const vehicles = [
  {
    id: 'VH-892',
    model: 'Freightliner Cascadia',
    driver: 'John Smith',
    status: 'Active',
    currentShipment: 'SH-4530',
    health: 92,
    mileage: '45,230 km',
    lastMaintenance: '5 days ago',
    nextMaintenance: '15 days',
    fuelLevel: 78,
    location: 'En route to Boston',
  },
  {
    id: 'VH-891',
    model: 'Volvo VNL',
    driver: 'Sarah Johnson',
    status: 'Active',
    currentShipment: 'SH-4529',
    health: 68,
    mileage: '78,450 km',
    lastMaintenance: '18 days ago',
    nextMaintenance: '2 days',
    fuelLevel: 45,
    location: 'En route to San Francisco',
  },
  {
    id: 'VH-890',
    model: 'Kenworth T680',
    driver: 'Mike Davis',
    status: 'Idle',
    currentShipment: null,
    health: 95,
    mileage: '32,100 km',
    lastMaintenance: '2 days ago',
    nextMaintenance: '28 days',
    fuelLevel: 92,
    location: 'Detroit Depot',
  },
  {
    id: 'VH-889',
    model: 'Peterbilt 579',
    driver: 'Emily Brown',
    status: 'Maintenance',
    currentShipment: null,
    health: 45,
    mileage: '92,340 km',
    lastMaintenance: 'In progress',
    nextMaintenance: 'N/A',
    fuelLevel: 35,
    location: 'Houston Service Center',
  },
  {
    id: 'VH-888',
    model: 'Freightliner Cascadia',
    driver: 'David Wilson',
    status: 'Active',
    currentShipment: 'SH-4527',
    health: 88,
    mileage: '56,890 km',
    lastMaintenance: '10 days ago',
    nextMaintenance: '20 days',
    fuelLevel: 64,
    location: 'En route to Dallas',
  },
];

const fleetStats = [
  { label: 'Total Fleet', value: '156', icon: TruckIcon, color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Active', value: '89', icon: Activity, color: 'bg-green-50 text-green-600' },
  { label: 'Idle', value: '54', icon: CheckCircle, color: 'bg-gray-50 text-gray-600' },
  { label: 'Maintenance', value: '13', icon: Wrench, color: 'bg-red-50 text-red-600' },
];

export function Vehicles() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600 mt-1">Monitor vehicle health and maintenance schedules</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          + Add Vehicle
        </button>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fleetStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Maintenance Alerts */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Maintenance Alerts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-4 border border-yellow-100">
                <p className="font-medium text-gray-900 mb-1">VH-891 - Service Due Soon</p>
                <p className="text-sm text-gray-600 mb-2">Next maintenance in 2 days</p>
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                  Schedule Now →
                </button>
              </div>
              <div className="bg-white rounded-lg p-4 border border-yellow-100">
                <p className="font-medium text-gray-900 mb-1">VH-889 - In Service</p>
                <p className="text-sm text-gray-600 mb-2">Maintenance in progress</p>
                <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium">
            All Vehicles
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Active
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Idle
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Needs Maintenance
          </button>
          <div className="ml-auto flex items-center gap-2">
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Sort by Health</option>
              <option>Sort by Mileage</option>
              <option>Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vehicles.map((vehicle, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <TruckIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{vehicle.id}</h3>
                  <p className="text-sm text-gray-600">{vehicle.model}</p>
                </div>
              </div>
              {vehicle.status === 'Active' && <StatusBadge status="success" label="Active" size="sm" />}
              {vehicle.status === 'Idle' && <StatusBadge status="neutral" label="Idle" size="sm" />}
              {vehicle.status === 'Maintenance' && <StatusBadge status="danger" label="Maintenance" size="sm" />}
            </div>

            {/* Driver & Shipment */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Driver</p>
                  <p className="font-medium text-gray-900">{vehicle.driver}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Shipment</p>
                  {vehicle.currentShipment ? (
                    <button className="font-medium text-indigo-600 hover:text-indigo-700">
                      {vehicle.currentShipment}
                    </button>
                  ) : (
                    <p className="text-gray-400">Not assigned</p>
                  )}
                </div>
              </div>
            </div>

            {/* Health & Metrics */}
            <div className="space-y-4 mb-4">
              {/* Vehicle Health */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Vehicle Health</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{vehicle.health}%</span>
                </div>
                <ProgressBar
                  value={vehicle.health}
                  max={100}
                  color={vehicle.health > 80 ? 'green' : vehicle.health > 60 ? 'yellow' : 'red'}
                />
              </div>

              {/* Fuel Level */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Fuel Level</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{vehicle.fuelLevel}%</span>
                </div>
                <ProgressBar
                  value={vehicle.fuelLevel}
                  max={100}
                  color={vehicle.fuelLevel > 60 ? 'green' : vehicle.fuelLevel > 30 ? 'yellow' : 'red'}
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-600 mb-1">Mileage</p>
                <p className="font-medium text-gray-900">{vehicle.mileage}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-600 mb-1">Location</p>
                <p className="font-medium text-gray-900 truncate">{vehicle.location}</p>
              </div>
            </div>

            {/* Maintenance Info */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-gray-600" />
                <p className="text-sm font-medium text-gray-900">Maintenance</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-600">Last service:</p>
                  <p className="text-gray-900">{vehicle.lastMaintenance}</p>
                </div>
                <div>
                  <p className="text-gray-600">Next service:</p>
                  <p className="text-gray-900">{vehicle.nextMaintenance}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
                Track Live
              </button>
              <button className="flex-1 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
