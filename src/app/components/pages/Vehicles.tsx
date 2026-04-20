import { TruckIcon, Wrench, AlertTriangle, CheckCircle, Activity, Fuel, X, Database } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { ProgressBar } from '../shared/ProgressBar';
import { useState } from 'react';
import { useVehicles, Vehicle } from '../../hooks/useVehicles';
import { toast } from 'sonner';
import { Sparkles, Trash2 } from 'lucide-react';

const fleetStats = [
  { label: 'Total Fleet', value: (v: Vehicle[]) => v.length, icon: TruckIcon, color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Active', value: (v: Vehicle[]) => v.filter(x => x.status === 'Active').length, icon: Activity, color: 'bg-green-50 text-green-600' },
  { label: 'Idle', value: (v: Vehicle[]) => v.filter(x => x.status === 'Idle').length, icon: CheckCircle, color: 'bg-gray-50 text-gray-600' },
  { label: 'Maintenance', value: (v: Vehicle[]) => v.filter(x => x.status === 'Maintenance').length, icon: Wrench, color: 'bg-red-50 text-red-600' },
];

export function Vehicles() {
  const { vehicles, addVehicle, deleteVehicle, loadMockData, clearData } = useVehicles();
  const [filterType, setFilterType] = useState<string>('All Vehicles');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    model: '',
    driver: '',
    status: 'Idle' as 'Active' | 'Idle' | 'Maintenance',
    location: '',
    mileage: '0',
    fuelLevel: 100,
    health: 100,
  });

  const handleFormChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitVehicle = () => {
    if (!form.model.trim() || !form.driver.trim() || !form.location.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    addVehicle({
      model: form.model,
      driver: form.driver,
      status: form.status,
      currentShipment: null,
      health: form.health,
      mileage: `${form.mileage} km`,
      lastMaintenance: 'Today',
      nextMaintenance: '30 days',
      fuelLevel: form.fuelLevel,
      location: form.location,
    });
    setShowModal(false);
    setForm({ model: '', driver: '', status: 'Idle', location: '', mileage: '0', fuelLevel: 100, health: 100 });
    toast.success('Vehicle added successfully!');
  };

  const filteredVehicles = vehicles.filter(v => {
    if (filterType === 'All Vehicles') return true;
    if (filterType === 'Active' && v.status === 'Active') return true;
    if (filterType === 'Idle' && v.status === 'Idle') return true;
    if (filterType === 'Needs Maintenance' && (v.status === 'Maintenance' || v.health < 80)) return true;
    return false;
  });

  const handleAISummary = () => {
    const active = vehicles.filter(v => v.status === 'Active').length;
    const maintenance = vehicles.filter(v => v.status === 'Maintenance').length;
    const lowHealth = vehicles.filter(v => v.health < 70).length;
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Vizard AI is analyzing your fleet...',
        success: `Fleet Report: ${vehicles.length} total vehicles — ${active} active, ${maintenance} in maintenance. ${lowHealth > 0 ? `⚠️ ${lowHealth} vehicle(s) need attention (health < 70%).` : '✅ All vehicles are in good health.'}`,
        error: 'Failed to generate AI summary',
      }
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600 mt-1">Monitor vehicle health and maintenance schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={vehicles.length === 0 ? loadMockData : clearData}
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium flex items-center gap-2 border border-purple-200"
          >
            <Database className="w-4 h-4" />
            {vehicles.length === 0 ? 'Load Mock Data' : 'Clear Data'}
          </button>
          <button 
            onClick={handleAISummary}
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium flex items-center gap-2 border border-purple-200"
          >
            <Sparkles className="w-4 h-4" />
            Vizard AI Summary
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            + Add Vehicle
          </button>
        </div>
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
                <span className="text-2xl font-semibold text-gray-900">
                  {typeof stat.value === 'function' ? stat.value(vehicles) : stat.value}
                </span>
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
              {vehicles.filter(v => v.health < 80 || v.status === 'Maintenance').length > 0 ? (
                vehicles.filter(v => v.health < 80 || v.status === 'Maintenance').slice(0, 2).map(v => (
                  <div key={v.id} className="bg-white rounded-lg p-4 border border-yellow-100">
                    <p className="font-medium text-gray-900 mb-1">{v.id} - {v.status === 'Maintenance' ? 'In Service' : 'Service Due Soon'}</p>
                    <p className="text-sm text-gray-600 mb-2">Health is at {v.health}%</p>
                    <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
                      View Details →
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-sm text-gray-600 italic py-2">
                  All active vehicles are healthy. No immediate maintenance required.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          {['All Vehicles', 'Active', 'Idle', 'Needs Maintenance'].map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === type 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
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
        {filteredVehicles.map((vehicle, index) => (
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
              <button 
                onClick={() => deleteVehicle(vehicle.id)}
                className="px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <TruckIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No Vehicles Found</h3>
          <p className="text-gray-500 mt-1">
            {vehicles.length === 0 ? 'Add a new vehicle to start monitoring your fleet.' : 'No vehicles match your current filter.'}
          </p>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Vehicle</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model *</label>
                <input
                  type="text"
                  placeholder="e.g. Volvo VNL, Freightliner Cascadia"
                  value={form.model}
                  onChange={(e) => handleFormChange('model', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name *</label>
                <input
                  type="text"
                  placeholder="e.g. John Smith"
                  value={form.driver}
                  onChange={(e) => handleFormChange('driver', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Idle">Idle</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mileage (km)</label>
                  <input
                    type="number"
                    value={form.mileage}
                    onChange={(e) => handleFormChange('mileage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Main Depot, En route to Boston"
                  value={form.location}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health (%)</label>
                  <input
                    type="number"
                    min="0" max="100"
                    value={form.health}
                    onChange={(e) => handleFormChange('health', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Level (%)</label>
                  <input
                    type="number"
                    min="0" max="100"
                    value={form.fuelLevel}
                    onChange={(e) => handleFormChange('fuelLevel', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleSubmitVehicle}
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Add Vehicle
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
