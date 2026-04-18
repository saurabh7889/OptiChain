import React, { useState } from 'react';

interface NewShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function NewShipmentModal({ isOpen, onClose, onSubmit }: NewShipmentModalProps) {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    vehicle: '',
    driver: '',
    items: '',
    weight: '',
    priority: 'medium',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      items: parseInt(formData.items) || 0,
      weight: formData.weight ? formData.weight + ' kg' : '0 kg',
    });
    setFormData({
      origin: '',
      destination: '',
      vehicle: '',
      driver: '',
      items: '',
      weight: '',
      priority: 'medium',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-900">New Shipment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Origin</label>
              <input 
                required
                type="text" 
                value={formData.origin}
                onChange={e => setFormData({ ...formData, origin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                placeholder="e.g. New York, NY"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Destination</label>
              <input 
                required
                type="text" 
                value={formData.destination}
                onChange={e => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                placeholder="e.g. Boston, MA"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Vehicle ID</label>
              <input 
                required
                type="text" 
                value={formData.vehicle}
                onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                placeholder="e.g. VH-123"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Driver Name</label>
              <input 
                required
                type="text" 
                value={formData.driver}
                onChange={e => setFormData({ ...formData, driver: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                placeholder="e.g. Jane Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Item Count</label>
              <input 
                required
                type="number" 
                min="1"
                value={formData.items}
                onChange={e => setFormData({ ...formData, items: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Total Weight (kg)</label>
              <input 
                required
                type="number" 
                min="1"
                value={formData.weight}
                onChange={e => setFormData({ ...formData, weight: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <select 
              value={formData.priority}
              onChange={e => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm shadow-sm"
            >
              Create Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
