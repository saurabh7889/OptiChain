import { TrendingUp, TrendingDown, BarChart3, DollarSign, Fuel, Package, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const deliveryData = [
  { month: 'Oct', success: 92, delayed: 8 },
  { month: 'Nov', success: 89, delayed: 11 },
  { month: 'Dec', success: 94, delayed: 6 },
  { month: 'Jan', success: 91, delayed: 9 },
  { month: 'Feb', success: 88, delayed: 12 },
  { month: 'Mar', success: 95, delayed: 5 },
  { month: 'Apr', success: 97, delayed: 3 },
];

const costData = [
  { month: 'Oct', cost: 245 },
  { month: 'Nov', cost: 268 },
  { month: 'Dec', cost: 234 },
  { month: 'Jan', cost: 289 },
  { month: 'Feb', cost: 256 },
  { month: 'Mar', cost: 223 },
  { month: 'Apr', cost: 198 },
];

const fuelData = [
  { month: 'Oct', usage: 3420 },
  { month: 'Nov', usage: 3680 },
  { month: 'Dec', usage: 3250 },
  { month: 'Jan', usage: 3890 },
  { month: 'Feb', usage: 3520 },
  { month: 'Mar', usage: 3180 },
  { month: 'Apr', usage: 2940 },
];

const shipmentDistribution = [
  { name: 'Delivered', value: 1247 },
  { name: 'In Transit', value: 89 },
  { name: 'Delayed', value: 23 },
  { name: 'Pending', value: 45 },
];

const COLORS = ['#10b981', '#4f46e5', '#ef4444', '#f59e0b'];

export function Analytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-600 mt-1">Track performance, costs, and predictive trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-1">97%</p>
          <p className="text-sm text-gray-600">On-Time Delivery</p>
          <p className="text-xs text-green-600 font-medium mt-2">+5% vs last month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-1">$198</p>
          <p className="text-sm text-gray-600">Avg Cost/Shipment</p>
          <p className="text-xs text-green-600 font-medium mt-2">-11% vs last month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <Fuel className="w-5 h-5" />
            </div>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-1">2,940L</p>
          <p className="text-sm text-gray-600">Monthly Fuel Usage</p>
          <p className="text-xs text-green-600 font-medium mt-2">-7.5% vs last month</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-1">3%</p>
          <p className="text-sm text-gray-600">Delay Rate</p>
          <p className="text-xs text-green-600 font-medium mt-2">-2% vs last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Success Rate */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Delivery Performance</h2>
            <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="success"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                name="Success Rate (%)"
              />
              <Line
                type="monotone"
                dataKey="delayed"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 4 }}
                name="Delay Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cost per Shipment */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Cost per Shipment</h2>
            <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="cost" fill="#4f46e5" radius={[8, 8, 0, 0]} name="Cost ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Consumption */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Fuel Consumption</h2>
            <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 7 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fuelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 4 }}
                name="Fuel (Liters)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Shipment Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipment Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={shipmentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {shipmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {shipmentDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className="text-sm text-gray-700">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-indigo-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Predictive Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-5 border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="font-medium text-gray-900">Demand Forecast</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Expected 23% increase in shipments next week based on historical patterns
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Confidence:</span>
              <span className="font-medium text-green-600">87%</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="font-medium text-gray-900">Delay Probability</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              12% chance of delays due to weather conditions in northeast region
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Risk Level:</span>
              <span className="font-medium text-yellow-600">Medium</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="font-medium text-gray-900">Cost Optimization</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Potential to save $4,200/month by optimizing routes and consolidating shipments
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Savings:</span>
              <span className="font-medium text-indigo-600">15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Eco-Efficiency */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-5 border border-green-100">
            <p className="text-sm text-gray-600 mb-2">Total Carbon Footprint</p>
            <p className="text-2xl font-semibold text-gray-900 mb-1">12.4 tons</p>
            <p className="text-xs text-green-600 font-medium">-8% vs last month</p>
          </div>
          <div className="bg-white rounded-lg p-5 border border-green-100">
            <p className="text-sm text-gray-600 mb-2">Fuel Efficiency</p>
            <p className="text-2xl font-semibold text-gray-900 mb-1">8.2 km/L</p>
            <p className="text-xs text-green-600 font-medium">+5% improvement</p>
          </div>
          <div className="bg-white rounded-lg p-5 border border-green-100">
            <p className="text-sm text-gray-600 mb-2">Route Optimization Impact</p>
            <p className="text-2xl font-semibold text-gray-900 mb-1">340 km</p>
            <p className="text-xs text-green-600 font-medium">Distance saved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
