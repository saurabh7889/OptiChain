import { User, Building, Bell, Shield, Database, Globe, Lock, Key, Mail, Eye, EyeOff } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

type SettingsTab = 'profile' | 'company' | 'notifications' | 'security' | 'integrations' | 'system';

const tabs: { id: SettingsTab; label: string; icon: any }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Database },
  { id: 'system', label: 'System', icon: Globe },
];

export function Settings() {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (field: keyof typeof settings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSettings(formData);
    toast.success("Settings saved successfully!");
  };

  const Toggle = ({ checked, onChange, label, desc }: { checked: boolean; onChange: (v: boolean) => void; label: string; desc: string }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
      </label>
    </div>
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Menu */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  } ${tab.id !== 'profile' ? 'mt-1' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">

          {/* ===== PROFILE ===== */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">
                      {formData.firstName?.charAt(0)}{formData.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</p>
                    <p className="text-sm text-gray-500">{formData.role}</p>
                    <button className="mt-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm">
                      Change Photo
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input type="text" value={formData.role} onChange={(e) => handleChange('role', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">Save Changes</button>
                  <button onClick={() => setFormData(settings)} className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* ===== COMPANY ===== */}
          {activeTab === 'company' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input type="text" value={formData.companyName} onChange={(e) => handleChange('companyName', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select value={formData.industry} onChange={(e) => handleChange('industry', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Logistics & Transportation</option>
                    <option>E-commerce</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fleet Size</label>
                    <input type="number" value={formData.fleetSize} onChange={(e) => handleChange('fleetSize', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Warehouses</label>
                    <input type="number" value={formData.warehouses} onChange={(e) => handleChange('warehouses', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <button onClick={handleSave} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">Save Company Info</button>
              </div>
            </div>
          )}

          {/* ===== NOTIFICATIONS ===== */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-3">
                <Toggle checked={true} onChange={() => {}} label="Email Notifications" desc="Receive email alerts for critical shipment updates" />
                <Toggle checked={true} onChange={() => {}} label="Push Notifications" desc="Browser push notifications for real-time alerts" />
                <Toggle checked={false} onChange={() => {}} label="SMS Alerts" desc="Text message alerts for high-priority events" />
                <Toggle checked={true} onChange={() => {}} label="Daily Digest" desc="Receive a daily summary email of all activities" />
                <Toggle checked={false} onChange={() => {}} label="Marketing Updates" desc="Product updates and feature announcements" />
              </div>
              <button onClick={() => toast.success('Notification preferences saved!')} className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">Save Preferences</button>
            </div>
          )}

          {/* ===== SECURITY ===== */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} placeholder="Enter current password" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input type="password" placeholder="Enter new password" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <button onClick={() => toast.success('Password updated successfully!')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">Update Password</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h2>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Enable 2FA</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm">Enable</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-3">
                  <div>
                    <p className="font-medium text-gray-900">Active Sessions</p>
                    <p className="text-sm text-gray-500">1 session active — this device</p>
                  </div>
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm">Sign Out All</button>
                </div>
              </div>
            </div>
          )}

          {/* ===== INTEGRATIONS ===== */}
          {activeTab === 'integrations' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Connected Integrations</h2>
              <div className="space-y-3">
                {[
                  { name: 'Warehouse Management System', status: 'Connected', color: 'text-emerald-600 bg-emerald-50' },
                  { name: 'ERP System', status: 'Connected', color: 'text-emerald-600 bg-emerald-50' },
                  { name: 'Payment Gateway', status: 'Not Connected', color: 'text-gray-500 bg-gray-100' },
                  { name: 'CRM Platform', status: 'Not Connected', color: 'text-gray-500 bg-gray-100' },
                  { name: 'Analytics Dashboard', status: 'Connected', color: 'text-emerald-600 bg-emerald-50' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${item.color}`}>{item.status}</span>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      item.status === 'Connected' 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}>
                      {item.status === 'Connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== SYSTEM ===== */}
          {activeTab === 'system' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">System Preferences</h2>
              <div className="space-y-3">
                <Toggle checked={formData.autoRouteOptimization} onChange={(v) => handleChange('autoRouteOptimization', v)} label="Auto Route Optimization" desc="Automatically optimize routes when new shipments are created" />
                <Toggle checked={formData.aiInsights} onChange={(v) => handleChange('aiInsights', v)} label="AI Insights" desc="Enable predictive analytics and smart recommendations" />
                <Toggle checked={formData.realTimeTracking} onChange={(v) => handleChange('realTimeTracking', v)} label="Real-time Tracking" desc="Enable live GPS tracking for all vehicles" />
                <Toggle checked={formData.autoRestock} onChange={(v) => handleChange('autoRestock', v)} label="Automatic Inventory Restock" desc="Auto-generate purchase orders when stock hits reorder point" />
              </div>
              <button onClick={handleSave} className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">Save Preferences</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
