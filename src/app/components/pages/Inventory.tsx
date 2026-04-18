import React, { useState } from 'react';
import { Warehouse, Package, TrendingDown, TrendingUp, AlertTriangle, BarChart3, Trash2 } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { ProgressBar } from '../shared/ProgressBar';
import { useInventory } from '../../hooks/useInventory';
import { useWarehouses } from '../../hooks/useWarehouses';
import { NewInventoryModal } from '../shared/NewInventoryModal';
import { NewWarehouseModal } from '../shared/NewWarehouseModal';
import { toast } from 'sonner';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu';

export function Inventory() {
  const { inventory, addItem, deleteItem } = useInventory();
  const { warehouses, addWarehouse, deleteWarehouse } = useWarehouses();
  const [filterType, setFilterType] = useState<string>('All Items');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);

  const filteredItems = inventory.filter(item => {
    if (filterType === 'All Items') return true;
    if (filterType === 'Low Stock' && item.status === 'Low Stock') return true;
    if (filterType === 'Critical' && item.status === 'Critical') return true;
    if (filterType === 'High Movement' && item.movementRate === 'High') return true;
    return false;
  });

  const handleAddItem = (data: any) => {
    addItem(data);
    toast.success(`${data.name} added to inventory!`);
  };

  const handleDeleteWarehouse = (id: string, name: string) => {
    deleteWarehouse(id);
    toast.error(`Deleted ${name} warehouse.`, {
      icon: <Trash2 className="w-4 h-4 text-red-500" />
    });
  };

  const handleDeleteItem = (id: string, name: string) => {
    deleteItem(id);
    toast.error(`Deleted ${name} from inventory.`, {
      icon: <Trash2 className="w-4 h-4 text-red-500" />
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Monitor and control stock levels across all warehouses</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          + Add Item
        </button>
      </div>

      {/* Warehouse Overview Header */}
      <div className="flex items-center justify-between mt-2 mb-1">
        <h2 className="text-lg font-semibold text-gray-900">Warehouse Utilization</h2>
        <button 
          onClick={() => setIsWarehouseModalOpen(true)}
          className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm border border-indigo-100"
        >
          + Add Warehouse
        </button>
      </div>

      {/* Warehouse Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {warehouses.length === 0 ? (
          <div className="col-span-full text-center py-6 bg-white rounded-xl border border-gray-200 border-dashed">
            <Warehouse className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-900">No warehouses configured</h3>
            <p className="text-xs text-gray-500">Add a warehouse to begin tracking location metrics.</p>
          </div>
        ) : (
          warehouses.map((warehouse) => (
            <ContextMenu key={warehouse.id}>
              <ContextMenuTrigger asChild>
                <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-context-menu">
                  <div className="flex items-start justify-between mb-3">
                    <Warehouse className="w-8 h-8 text-indigo-600" />
                    {warehouse.alerts > 0 && (
                      <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                        {warehouse.alerts} alerts
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{warehouse.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{warehouse.items} items</p>
                  <ProgressBar
                    value={warehouse.utilization}
                    max={100}
                    label="Utilization"
                    showPercentage
                    color={warehouse.utilization > 80 ? 'red' : warehouse.utilization > 60 ? 'yellow' : 'green'}
                  />
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48 bg-white border border-gray-200 shadow-xl rounded-xl">
                <ContextMenuItem 
                  onClick={() => handleDeleteWarehouse(warehouse.id, warehouse.name)}
                  className="text-red-600 flex items-center gap-2 cursor-pointer font-medium p-2 text-sm hover:!bg-red-50 hover:!text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Warehouse
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))
        )}
      </div>

      {/* AI Insights for Inventory */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-indigo-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Smart Inventory Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-indigo-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Restock Needed</p>
                <p className="text-sm text-gray-600">8 items below reorder point</p>
                <button 
                  onClick={() => toast.info('Auto-generating order...')}
                  className="text-sm text-indigo-600 font-medium mt-2 hover:text-indigo-700"
                >
                  Auto-Generate Order →
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-indigo-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Dead Stock Detected</p>
                <p className="text-sm text-gray-600">4 items with no movement in 30 days</p>
                <button 
                  onClick={() => toast.info('Viewing dead stock filters...')}
                  className="text-sm text-indigo-600 font-medium mt-2 hover:text-indigo-700"
                >
                  View Items →
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-indigo-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Demand Forecast</p>
                <p className="text-sm text-gray-600">SKU-8821 demand up 45% next week</p>
                <button 
                  onClick={() => toast.info('Loading predictive models...')}
                  className="text-sm text-indigo-600 font-medium mt-2 hover:text-indigo-700"
                >
                  See Predictions →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          {['All Items', 'Low Stock', 'Critical', 'High Movement'].map(type => (
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
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-gray-700">
              <option>All Warehouses</option>
              <option>Warehouse A</option>
              <option>Warehouse B</option>
              <option>Warehouse C</option>
              <option>Warehouse D</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Warehouse
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Movement
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No inventory found</h3>
                      <p className="text-gray-500">There are no items matching your current filter.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const stockPercentage = item.capacity > 0 ? (item.stock / item.capacity) * 100 : 0;
                  const isBelowReorder = item.stock < item.reorderPoint;

                  return (
                    <ContextMenu key={item.id}>
                      <ContextMenuTrigger asChild>
                        <tr className="hover:bg-gray-50 cursor-context-menu transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.sku}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-900">{item.warehouse}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="w-48">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {item.stock} / {item.capacity}
                                </span>
                                <span className="text-sm text-gray-600">{Math.round(stockPercentage)}%</span>
                              </div>
                              <ProgressBar
                                value={item.stock}
                                max={item.capacity}
                                color={
                                  item.status === 'Critical'
                                    ? 'red'
                                    : item.status === 'Low Stock'
                                    ? 'yellow'
                                    : 'green'
                                }
                              />
                              {isBelowReorder && (
                                <p className="text-xs text-red-600 mt-1 font-medium">Below reorder point</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                              {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                              <span className="text-sm text-gray-900 font-medium">{item.movementRate}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Restocked {item.lastRestocked}</p>
                          </td>
                          <td className="px-6 py-4">
                            {item.status === 'In Stock' && <StatusBadge status="success" label="In Stock" size="sm" />}
                            {item.status === 'Low Stock' && <StatusBadge status="warning" label="Low Stock" size="sm" />}
                            {item.status === 'Critical' && <StatusBadge status="danger" label="Critical" size="sm" />}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => toast.info(`Restocking ${item.name}...`)}
                                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                              >
                                Restock
                              </button>
                              <button 
                                onClick={() => toast.info(`Viewing details for ${item.name}`)}
                                className="px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                              >
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-48 bg-white border border-gray-200 shadow-xl rounded-xl">
                        <ContextMenuItem 
                          onClick={() => handleDeleteItem(item.id, item.name)}
                          className="text-red-600 flex items-center gap-2 cursor-pointer font-medium p-2 text-sm hover:!bg-red-50 hover:!text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Item
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewInventoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddItem}
      />
      <NewWarehouseModal 
        isOpen={isWarehouseModalOpen}
        onClose={() => setIsWarehouseModalOpen(false)}
        onSubmit={(data) => {
          addWarehouse(data);
          toast.success(`Warehouse "${data.name}" setup successfully!`);
        }}
      />
    </div>
  );
}
