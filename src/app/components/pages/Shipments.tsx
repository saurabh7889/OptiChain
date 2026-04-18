import { Package, MapPin, Clock, TruckIcon, CheckCircle, AlertCircle, Navigation } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { ProgressBar } from '../shared/ProgressBar';

const shipments = [
  {
    id: 'SH-4530',
    origin: 'New York, NY',
    destination: 'Boston, MA',
    status: 'In Transit',
    progress: 65,
    eta: '2 hours',
    vehicle: 'VH-892',
    driver: 'John Smith',
    items: 45,
    weight: '2,340 kg',
    priority: 'high',
  },
  {
    id: 'SH-4529',
    origin: 'Los Angeles, CA',
    destination: 'San Francisco, CA',
    status: 'Delayed',
    progress: 40,
    eta: '4 hours (delayed)',
    vehicle: 'VH-891',
    driver: 'Sarah Johnson',
    items: 32,
    weight: '1,850 kg',
    priority: 'medium',
  },
  {
    id: 'SH-4528',
    origin: 'Chicago, IL',
    destination: 'Detroit, MI',
    status: 'Delivered',
    progress: 100,
    eta: 'Completed',
    vehicle: 'VH-890',
    driver: 'Mike Davis',
    items: 28,
    weight: '1,420 kg',
    priority: 'low',
  },
  {
    id: 'SH-4527',
    origin: 'Houston, TX',
    destination: 'Dallas, TX',
    status: 'Packed',
    progress: 10,
    eta: '6 hours',
    vehicle: 'VH-889',
    driver: 'Emily Brown',
    items: 67,
    weight: '3,120 kg',
    priority: 'high',
  },
];

export function Shipments() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Shipments</h1>
          <p className="text-gray-600 mt-1">Track and manage all shipments in real-time</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          + New Shipment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium">
            All Shipments
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            In Transit
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Delayed
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Delivered
          </button>
          <div className="ml-auto flex items-center gap-2">
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Shipment Info */}
              <div className="lg:col-span-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{shipment.id}</h3>
                      {shipment.status === 'In Transit' && <StatusBadge status="info" label="In Transit" size="sm" />}
                      {shipment.status === 'Delayed' && <StatusBadge status="danger" label="Delayed" size="sm" />}
                      {shipment.status === 'Delivered' && <StatusBadge status="success" label="Delivered" size="sm" />}
                      {shipment.status === 'Packed' && <StatusBadge status="neutral" label="Packed" size="sm" />}
                    </div>
                    {shipment.priority === 'high' && (
                      <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                        High Priority
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Origin</p>
                      <p className="font-medium text-gray-900">{shipment.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Destination</p>
                      <p className="font-medium text-gray-900">{shipment.destination}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress & Status */}
              <div className="lg:col-span-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{shipment.progress}%</span>
                  </div>
                  <ProgressBar
                    value={shipment.progress}
                    max={100}
                    color={shipment.status === 'Delayed' ? 'red' : shipment.status === 'Delivered' ? 'green' : 'indigo'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">ETA</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900">{shipment.eta}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                    <div className="flex items-center gap-2">
                      <TruckIcon className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900">{shipment.vehicle}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details & Actions */}
              <div className="lg:col-span-3">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Driver:</span>
                    <span className="text-sm font-medium text-gray-900">{shipment.driver}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Items:</span>
                    <span className="text-sm font-medium text-gray-900">{shipment.items}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Weight:</span>
                    <span className="text-sm font-medium text-gray-900">{shipment.weight}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
                    Track Live
                  </button>
                  <button className="w-full px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Route Optimization Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Route Optimization</h2>
          <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm">
            Optimize All Routes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-indigo-100">
            <Navigation className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Shortest Route</h3>
            <p className="text-sm text-gray-600 mb-3">Optimize for minimal distance traveled</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg. Savings:</span>
              <span className="font-semibold text-indigo-600">24 km/route</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
            <TruckIcon className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Fuel Efficient</h3>
            <p className="text-sm text-gray-600 mb-3">Minimize fuel consumption and costs</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg. Savings:</span>
              <span className="font-semibold text-green-600">18% fuel</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-6 border border-yellow-100">
            <Clock className="w-8 h-8 text-yellow-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Traffic Aware</h3>
            <p className="text-sm text-gray-600 mb-3">Real-time traffic and road conditions</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg. Savings:</span>
              <span className="font-semibold text-yellow-600">35 min/route</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
