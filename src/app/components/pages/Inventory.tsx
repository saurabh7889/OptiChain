import { Warehouse, Package, TrendingDown, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import { ProgressBar } from '../shared/ProgressBar';

const inventoryItems = [
  {
    sku: 'SKU-8821',
    name: 'Premium Laptop Stand',
    warehouse: 'Warehouse A - New York',
    stock: 245,
    capacity: 500,
    reorderPoint: 150,
    movementRate: 'High',
    status: 'In Stock',
    lastRestocked: '3 days ago',
    trend: 'down',
  },
  {
    sku: 'SKU-4521',
    name: 'Wireless Mouse Pro',
    warehouse: 'Warehouse B - Los Angeles',
    stock: 89,
    capacity: 300,
    reorderPoint: 100,
    movementRate: 'High',
    status: 'Low Stock',
    lastRestocked: '5 days ago',
    trend: 'down',
  },
  {
    sku: 'SKU-7723',
    name: 'USB-C Hub',
    warehouse: 'Warehouse A - New York',
    stock: 412,
    capacity: 500,
    reorderPoint: 150,
    movementRate: 'Medium',
    status: 'In Stock',
    lastRestocked: '1 day ago',
    trend: 'stable',
  },
  {
    sku: 'SKU-2341',
    name: 'Mechanical Keyboard',
    warehouse: 'Warehouse C - Chicago',
    stock: 15,
    capacity: 200,
    reorderPoint: 50,
    movementRate: 'Low',
    status: 'Critical',
    lastRestocked: '12 days ago',
    trend: 'down',
  },
  {
    sku: 'SKU-9982',
    name: 'Monitor Arm Mount',
    warehouse: 'Warehouse B - Los Angeles',
    stock: 178,
    capacity: 250,
    reorderPoint: 80,
    movementRate: 'Medium',
    status: 'In Stock',
    lastRestocked: '2 days ago',
    trend: 'up',
  },
];

const warehouses = [
  { name: 'Warehouse A - New York', utilization: 78, items: 1247, alerts: 3 },
  { name: 'Warehouse B - Los Angeles', utilization: 65, items: 892, alerts: 5 },
  { name: 'Warehouse C - Chicago', utilization: 82, items: 1534, alerts: 2 },
  { name: 'Warehouse D - Houston', utilization: 45, items: 623, alerts: 1 },
];

export function Inventory() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Monitor and control stock levels across all warehouses</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          + Add Item
        </button>
      </div>

      {/* Warehouse Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {warehouses.map((warehouse, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-5">
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
        ))}
      </div>

      {/* AI Insights for Inventory */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-indigo-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Smart Inventory Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Restock Needed</p>
                <p className="text-sm text-gray-600">8 items below reorder point</p>
                <button className="text-sm text-indigo-600 font-medium mt-2 hover:text-indigo-700">
                  Auto-Generate Order →
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Dead Stock Detected</p>
                <p className="text-sm text-gray-600">4 items with no movement in 30 days</p>
                <button className="text-sm text-indigo-600 font-medium mt-2 hover:text-indigo-700">
                  View Items →
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Demand Forecast</p>
                <p className="text-sm text-gray-600">SKU-8821 demand up 45% next week</p>
                <button className="text-sm text-indigo-600 font-medium mt-2 hover:text-indigo-700">
                  See Predictions →
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
            All Items
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Low Stock
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Critical
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            High Movement
          </button>
          <div className="ml-auto flex items-center gap-2">
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
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
              {inventoryItems.map((item, index) => {
                const stockPercentage = (item.stock / item.capacity) * 100;
                const isBelowReorder = item.stock < item.reorderPoint;

                return (
                  <tr key={index} className="hover:bg-gray-50">
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
                          <p className="text-xs text-red-600 mt-1">Below reorder point</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                        {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                        <span className="text-sm text-gray-900">{item.movementRate}</span>
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
                        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
                          Restock
                        </button>
                        <button className="px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
