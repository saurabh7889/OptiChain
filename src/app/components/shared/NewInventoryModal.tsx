import React, { useState } from 'react';

interface NewInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function NewInventoryModal({ isOpen, onClose, onSubmit }: NewInventoryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    warehouse: 'Warehouse A - New York',
    stock: '',
    capacity: '',
    reorderPoint: '',
    movementRate: 'Medium',
    lastRestocked: 'Just now'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      stock: parseInt(formData.stock) || 0,
      capacity: parseInt(formData.capacity) || 100,
      reorderPoint: parseInt(formData.reorderPoint) || 20,
    });
    setFormData({
      name: '',
      warehouse: 'Warehouse A - New York',
      stock: '',
      capacity: '',
      reorderPoint: '',
      movementRate: 'Medium',
      lastRestocked: 'Just now'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-900">Add Inventory Item</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Item Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              placeholder="e.g. Premium Laptop Stand"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Warehouse Location</label>
            <select 
              required
              value={formData.warehouse}
              onChange={e => setFormData({ ...formData, warehouse: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
            >
              <option value="Warehouse A - New York">Warehouse A - New York</option>
              <option value="Warehouse B - Los Angeles">Warehouse B - Los Angeles</option>
              <option value="Warehouse C - Chicago">Warehouse C - Chicago</option>
              <option value="Warehouse D - Houston">Warehouse D - Houston</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Current Stock</label>
              <input 
                required
                type="number" 
                min="0"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Total Capacity</label>
              <input 
                required
                type="number" 
                min="1"
                value={formData.capacity}
                onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Reorder Point</label>
              <input 
                required
                type="number" 
                min="0"
                value={formData.reorderPoint}
                onChange={e => setFormData({ ...formData, reorderPoint: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Movement Rate</label>
              <select 
                value={formData.movementRate}
                onChange={e => setFormData({ ...formData, movementRate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
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
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
