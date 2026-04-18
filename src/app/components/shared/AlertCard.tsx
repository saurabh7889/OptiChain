import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface AlertCardProps {
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp?: string;
}

export function AlertCard({ type, title, message, timestamp }: AlertCardProps) {
  const config = {
    critical: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-900',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor, textColor } = config[type];

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-4`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className={`font-medium ${textColor} mb-1`}>{title}</p>
          <p className="text-sm text-gray-600">{message}</p>
          {timestamp && (
            <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
          )}
        </div>
      </div>
    </div>
  );
}
