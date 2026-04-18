import { Package, TruckIcon, AlertTriangle, Warehouse, Activity, TrendingUp, MapPin, Zap } from 'lucide-react';
import { KPICard } from '../shared/KPICard';
import { AlertCard } from '../shared/AlertCard';
import { StatusBadge } from '../shared/StatusBadge';

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Control Tower</h1>
        <p className="text-gray-600 mt-1">Real-time logistics and inventory oversight</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Shipments"
          value="1,247"
          change={12.5}
          icon={Package}
          trend="up"
          status="neutral"
        />
        <KPICard
          title="Delayed Shipments"
          value="23"
          change={-8.3}
          icon={AlertTriangle}
          trend="down"
          status="danger"
        />
        <KPICard
          title="Inventory Health"
          value="94%"
          change={2.1}
          icon={Warehouse}
          trend="up"
          status="success"
        />
        <KPICard
          title="Active Vehicles"
          value="156"
          change={5.2}
          icon={TruckIcon}
          trend="up"
          status="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Tracking Map */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Live Tracking</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative bg-gray-50 rounded-lg h-80 border border-gray-200 overflow-hidden">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50"></div>

            {/* Simulated Routes and Vehicles */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 50 200 Q 150 100 250 180 T 450 160"
                stroke="#4f46e5"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                opacity="0.4"
              />
              <path
                d="M 100 150 Q 200 80 350 140 T 500 120"
                stroke="#10b981"
                strokeWidth="3"
                fill="none"
                opacity="0.6"
              />
            </svg>

            {/* Vehicle Markers */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <TruckIcon className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-xs">
                  SH-4521
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <TruckIcon className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-xs">
                  SH-4522
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                  <TruckIcon className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-xs">
                  SH-4523 (Delayed)
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-xs text-gray-700">On Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                <span className="text-xs text-gray-700">Delayed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                <span className="text-xs text-gray-700">In Transit</span>
              </div>
            </div>
          </div>

          {/* Active Shipments Summary */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-gray-900">89</p>
              <p className="text-sm text-gray-600">In Transit</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-gray-900">34</p>
              <p className="text-sm text-gray-600">Arriving Today</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-gray-900">12</p>
              <p className="text-sm text-gray-600">At Risk</p>
            </div>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Critical Alerts</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AlertCard
              type="critical"
              title="Shipment Delay"
              message="SH-4523 delayed by 3 hours due to traffic"
              timestamp="5 min ago"
            />
            <AlertCard
              type="warning"
              title="Low Stock Alert"
              message="Product SKU-4521 below threshold"
              timestamp="15 min ago"
            />
            <AlertCard
              type="critical"
              title="Vehicle Issue"
              message="Truck VH-892 requires maintenance"
              timestamp="1 hour ago"
            />
            <AlertCard
              type="info"
              title="Route Optimized"
              message="New route saved 45 minutes for SH-4524"
              timestamp="2 hours ago"
            />
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-indigo-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Route Inefficiency Detected</p>
                <p className="text-sm text-gray-600">3 shipments can be optimized to save 2.5 hours</p>
                <button className="text-sm text-indigo-600 font-medium mt-2 hover:text-indigo-700">
                  Optimize Now →
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Stock Prediction</p>
                <p className="text-sm text-gray-600">5 items will run out in 2 days based on demand</p>
                <button className="text-sm text-indigo-600 font-medium mt-2 hover:text-indigo-700">
                  View Details →
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Performance Trend</p>
                <p className="text-sm text-gray-600">Delivery success rate improved by 8% this week</p>
                <button className="text-sm text-indigo-600 font-medium mt-2 hover:text-indigo-700">
                  See Analytics →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Shipment Created', item: 'SH-4530', time: '2 minutes ago', status: 'info' },
            { action: 'Delivery Completed', item: 'SH-4501', time: '15 minutes ago', status: 'success' },
            { action: 'Inventory Updated', item: 'SKU-8821', time: '32 minutes ago', status: 'info' },
            { action: 'Route Optimized', item: 'Route-A45', time: '1 hour ago', status: 'success' },
            { action: 'Order Placed', item: 'ORD-7723', time: '1 hour ago', status: 'info' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
