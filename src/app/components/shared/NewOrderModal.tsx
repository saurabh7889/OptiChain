import React, { useState } from 'react';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function NewOrderModal({ isOpen, onClose, onSubmit }: NewOrderModalProps) {
  const [formData, setFormData] = useState({
    customer: '',
    items: '',
    value: '',
    status: 'Pending',
    priority: 'medium',
    inventoryImpact: 'Medium'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      items: parseInt(formData.items) || 1,
      value: `$${parseFloat(formData.value || '0').toLocaleString()}`,
      date: new Date().toISOString().split('T')[0],
      shipmentId: null
    });
    setFormData({
      customer: '',
      items: '',
      value: '',
      status: 'Pending',
      priority: 'medium',
      inventoryImpact: 'Medium'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-900">Create New Order</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Customer Name</label>
            <input 
              required
              type="text" 
              value={formData.customer}
              onChange={e => setFormData({ ...formData, customer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Number of Items</label>
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
              <label className="text-sm font-medium text-gray-700">Total Value ($)</label>
              <input 
                required
                type="number" 
                min="0"
                step="0.01"
                value={formData.value}
                onChange={e => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <select 
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
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
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
