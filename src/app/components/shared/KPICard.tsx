import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  status?: 'success' | 'warning' | 'danger' | 'neutral';
}

export function KPICard({ title, value, change, icon: Icon, trend, status = 'neutral' }: KPICardProps) {
  const statusColors = {
    success: 'bg-green-50 text-green-600',
    warning: 'bg-yellow-50 text-yellow-600',
    danger: 'bg-red-50 text-red-600',
    neutral: 'bg-indigo-50 text-indigo-600',
  };

  const trendColors = {
    up: change && change > 0 ? 'text-green-600' : 'text-red-600',
    down: change && change > 0 ? 'text-red-600' : 'text-green-600',
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-semibold text-gray-900 mb-2">{value}</p>
          {change !== undefined && (
            <p className={`text-sm font-medium ${trend ? trendColors[trend] : 'text-gray-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last period
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${statusColors[status]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
