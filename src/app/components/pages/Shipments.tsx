import React, { useState } from 'react';
import { Package, MapPin, Clock, TruckIcon, CheckCircle, AlertCircle, Navigation, Database } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { ProgressBar } from '../shared/ProgressBar';
import { useShipments } from '../../hooks/useShipments';
import { NewShipmentModal } from '../shared/NewShipmentModal';
import { toast } from 'sonner';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu';
import { Trash2 } from 'lucide-react';

export function Shipments() {
  const { shipments, addShipment, deleteShipment, loadMockData, clearData } = useShipments();
  const [filterType, setFilterType] = useState<string>('All Shipments');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive filtered shipments based on current active filter
  const filteredShipments = shipments.filter(shipment => {
    if (filterType === 'All Shipments') return true;
    return shipment.status === filterType;
  });

  const handleOptimizeRoutes = () => {
    toast.info('Calculating optimal routes...', { duration: 2000 });
    setTimeout(() => {
      toast.success('Routes optimized! Expected savings: 18% fuel & 35 mins/route.', { duration: 4000 });
    }, 2000);
  };

  const handleTrackLive = (id: string) => {
    toast(`Opening live tracking map for ${id}`, {
       icon: <Navigation className="w-4 h-4 text-indigo-500" />
    });
  };

  const handleViewDetails = (id: string) => {
    toast(`Displaying full shipment manifesto for ${id}`);
  };

  const handleCreateShipment = (data: any) => {
    addShipment(data);
    toast.success('Shipment created successfully!', {
       icon: <CheckCircle className="w-4 h-4 text-green-500" />
    });
  };

  const handleDeleteShipment = (id: string) => {
    deleteShipment(id);
    toast.error(`Shipment ${id} was deleted successfully.`, {
       icon: <Trash2 className="w-4 h-4 text-red-500" />
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Shipments</h1>
          <p className="text-gray-600 mt-1">Track and manage all shipments in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={shipments.length === 0 ? loadMockData : clearData}
            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium flex items-center gap-2 border border-purple-200"
          >
            <Database className="w-4 h-4" />
            {shipments.length === 0 ? 'Load Mock Data' : 'Clear Data'}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            + New Shipment
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          {['All Shipments', 'In Transit', 'Delayed', 'Delivered'].map((type) => (
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
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 font-medium">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments.length === 0 ? (
           <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
             <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
             <h3 className="text-lg font-medium text-gray-900">No shipments found</h3>
             <p className="text-gray-500">There are no shipments matching your current filter.</p>
           </div>
        ) : (
          filteredShipments.map((shipment) => (
            <ContextMenu key={shipment.id}>
              <ContextMenuTrigger asChild>
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-context-menu">
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
                <div className="lg:col-span-4 flex flex-col justify-center">
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

                  <div className="grid grid-cols-2 gap-4 mt-2">
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
                      <span className="text-sm font-medium text-gray-900 truncate ml-2">{shipment.driver}</span>
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
                    <button 
                      onClick={() => handleTrackLive(shipment.id)}
                      className="w-full px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                    >
                      Track Live
                    </button>
                    <button 
                      onClick={() => handleViewDetails(shipment.id)}
                      className="w-full px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48 bg-white border border-gray-200 shadow-xl rounded-xl">
                <ContextMenuItem 
                  onClick={() => handleDeleteShipment(shipment.id)}
                  className="text-red-600 flex items-center gap-2 cursor-pointer font-medium p-2 text-sm hover:!bg-red-50 hover:!text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Shipment
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))
        )}
      </div>

      {/* Route Optimization Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Route Optimization</h2>
          <button 
            onClick={handleOptimizeRoutes}
            className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Optimize All Routes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-indigo-100 hover:shadow-md transition-shadow">
            <Navigation className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Shortest Route</h3>
            <p className="text-sm text-gray-600 mb-3">Optimize for minimal distance traveled</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg. Savings:</span>
              <span className="font-semibold text-indigo-600">0 km/route</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-md transition-shadow">
            <TruckIcon className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Fuel Efficient</h3>
            <p className="text-sm text-gray-600 mb-3">Minimize fuel consumption and costs</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg. Savings:</span>
              <span className="font-semibold text-green-600">0% fuel</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100 hover:shadow-md transition-shadow">
            <Clock className="w-8 h-8 text-yellow-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Traffic Aware</h3>
            <p className="text-sm text-gray-600 mb-3">Real-time traffic and road conditions</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg. Savings:</span>
              <span className="font-semibold text-yellow-600">0 min/route</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Shipment Modal */}
      <NewShipmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateShipment}
      />
    </div>
  );
}
