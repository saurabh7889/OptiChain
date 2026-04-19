import { ShoppingCart, Package, TruckIcon, CheckCircle, Clock, User, DollarSign } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';

import { useOrders } from '../../hooks/useOrders';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', orders: 12 },
  { name: 'Tue', orders: 19 },
  { name: 'Wed', orders: 15 },
  { name: 'Thu', orders: 28 },
  { name: 'Fri', orders: 22 },
  { name: 'Sat', orders: 35 },
  { name: 'Sun', orders: 42 },
];

const orderStatuses = [
  { label: 'Pending', count: 45, icon: Clock, color: 'text-gray-600' },
  { label: 'Processing', count: 23, icon: Package, color: 'text-blue-600' },
  { label: 'Shipped', count: 67, icon: TruckIcon, color: 'text-indigo-600' },
  { label: 'Delivered', count: 189, icon: CheckCircle, color: 'text-green-600' },
];

export function Orders() {
  const { orders, addOrder, deleteOrder } = useOrders();

  const handleNewOrder = () => {
    addOrder({
      customer: 'New Walk-in Customer',
      items: Math.floor(Math.random() * 20) + 1,
      value: `$${Math.floor(Math.random() * 5000) + 100}`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      shipmentId: null,
      inventoryImpact: 'Low',
      priority: 'medium',
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage order lifecycle from placement to delivery</p>
        </div>
        <button 
          onClick={handleNewOrder}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
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

      {/* Order Volume Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Volume Trends</h2>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="orders" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
            </AreaChart>
          </ResponsiveContainer>
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
                      <button className="px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        View
                      </button>
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                      >
                        Delete
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
              <ShoppingCart className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-center md:text-left">
              <p className="font-medium text-gray-900">Order Placed</p>
              <p className="text-sm text-gray-600">Customer request</p>
            </div>
          </div>
          <div className="text-gray-400 rotate-90 md:rotate-0">→</div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
              <Package className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-center md:text-left">
              <p className="font-medium text-gray-900">Inventory Check</p>
              <p className="text-sm text-gray-600">Auto verification</p>
            </div>
          </div>
          <div className="text-gray-400 rotate-90 md:rotate-0">→</div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
              <TruckIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-center md:text-left">
              <p className="font-medium text-gray-900">Shipment Created</p>
              <p className="text-sm text-gray-600">Auto assignment</p>
            </div>
          </div>
          <div className="text-gray-400 rotate-90 md:rotate-0">→</div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-center md:text-left">
              <p className="font-medium text-gray-900">Delivered</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
