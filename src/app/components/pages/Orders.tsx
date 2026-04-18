import { ShoppingCart, Package, TruckIcon, CheckCircle, Clock, User, DollarSign } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';

const orders = [
  {
    id: 'ORD-7723',
    customer: 'TechCorp Inc.',
    items: 12,
    value: '$4,580',
    status: 'Shipped',
    date: '2026-04-17',
    shipmentId: 'SH-4530',
    inventoryImpact: 'Medium',
    priority: 'high',
  },
  {
    id: 'ORD-7722',
    customer: 'Global Logistics Ltd.',
    items: 8,
    value: '$2,340',
    status: 'Processing',
    date: '2026-04-17',
    shipmentId: null,
    inventoryImpact: 'Low',
    priority: 'medium',
  },
  {
    id: 'ORD-7721',
    customer: 'Supply Chain Co.',
    items: 24,
    value: '$8,920',
    status: 'Delivered',
    date: '2026-04-16',
    shipmentId: 'SH-4528',
    inventoryImpact: 'High',
    priority: 'high',
  },
  {
    id: 'ORD-7720',
    customer: 'Retail Express',
    items: 6,
    value: '$1,560',
    status: 'Pending',
    date: '2026-04-18',
    shipmentId: null,
    inventoryImpact: 'Low',
    priority: 'low',
  },
  {
    id: 'ORD-7719',
    customer: 'Distribution Partners',
    items: 18,
    value: '$6,240',
    status: 'Shipped',
    date: '2026-04-16',
    shipmentId: 'SH-4529',
    inventoryImpact: 'Medium',
    priority: 'medium',
  },
];

const orderStatuses = [
  { label: 'Pending', count: 45, icon: Clock, color: 'text-gray-600' },
  { label: 'Processing', count: 23, icon: Package, color: 'text-blue-600' },
  { label: 'Shipped', count: 67, icon: TruckIcon, color: 'text-indigo-600' },
  { label: 'Delivered', count: 189, icon: CheckCircle, color: 'text-green-600' },
];

export function Orders() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage order lifecycle from placement to delivery</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          + New Order
        </button>
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStatuses.map((status, index) => {
          const Icon = status.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-6 h-6 ${status.color}`} />
                <span className="text-2xl font-semibold text-gray-900">{status.count}</span>
              </div>
              <p className="text-sm text-gray-600">{status.label}</p>
            </div>
          );
        })}
      </div>

      {/* Order Lifecycle Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Lifecycle</h2>
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          <div className="absolute top-5 left-0 w-3/4 h-0.5 bg-indigo-600 -z-10"></div>

          {/* Steps */}
          {[
            { icon: Clock, label: 'Pending', desc: 'Order received' },
            { icon: Package, label: 'Processing', desc: 'Inventory check' },
            { icon: TruckIcon, label: 'Shipped', desc: 'In transit' },
            { icon: CheckCircle, label: 'Delivered', desc: 'Completed' },
          ].map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= 2;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    isActive ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <p className="font-medium text-sm text-gray-900 mb-0.5">{step.label}</p>
                <p className="text-xs text-gray-500 text-center">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium">
            All Orders
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Pending
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            Processing
          </button>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
            High Priority
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

      {/* Orders List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items / Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Shipment Link
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Inventory Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{order.id}</p>
                      {order.priority === 'high' && (
                        <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">
                          High
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <p className="text-sm text-gray-900">{order.customer}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{order.items} items</p>
                    <div className="flex items-center gap-1 mt-1">
                      <DollarSign className="w-3 h-3 text-gray-500" />
                      <p className="text-sm text-gray-600">{order.value}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.status === 'Pending' && <StatusBadge status="neutral" label="Pending" size="sm" />}
                    {order.status === 'Processing' && <StatusBadge status="info" label="Processing" size="sm" />}
                    {order.status === 'Shipped' && <StatusBadge status="warning" label="Shipped" size="sm" />}
                    {order.status === 'Delivered' && <StatusBadge status="success" label="Delivered" size="sm" />}
                  </td>
                  <td className="px-6 py-4">
                    {order.shipmentId ? (
                      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                        {order.shipmentId} →
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">Not assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm ${
                        order.inventoryImpact === 'High'
                          ? 'text-red-600'
                          : order.inventoryImpact === 'Medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    >
                      {order.inventoryImpact}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
                        View
                      </button>
                      <button className="px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Integration Info */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-indigo-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">System Integration Flow</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
              <ShoppingCart className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Order Placed</p>
              <p className="text-sm text-gray-600">Customer request</p>
            </div>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
              <Package className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Inventory Check</p>
              <p className="text-sm text-gray-600">Auto verification</p>
            </div>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
              <TruckIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Shipment Created</p>
              <p className="text-sm text-gray-600">Auto assignment</p>
            </div>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Delivered</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
