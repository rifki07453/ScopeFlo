import React from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Clock, FileText, Eye, CheckCircle, Send } from 'lucide-react';

export function ActivityLog() {
  const { activities } = useDashboardStore();

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'VIEWED': return <Eye className="w-4 h-4 text-orange-500" />;
      case 'SIGNED': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'SENT': return <Send className="w-4 h-4 text-blue-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionBg = (actionType: string) => {
    switch (actionType) {
      case 'VIEWED': return 'bg-orange-100';
      case 'SIGNED': return 'bg-green-100';
      case 'SENT': return 'bg-blue-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative flex gap-4">
              {/* Timeline Line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-gray-100"></div>
              )}
              
              {/* Icon */}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm ${getActionBg(activity.action_type)}`}>
                {getActionIcon(activity.action_type)}
              </div>

              {/* Content */}
              <div className="flex-1 pb-1">
                <p className="text-sm text-gray-800 font-medium">{activity.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(activity.timestamp).toLocaleString('id-ID')}</span>
                  {activity.metadata?.location && (
                    <>
                      <span>•</span>
                      <span>{activity.metadata.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-4">No recent activity.</div>
          )}
        </div>
      </div>
    </div>
  );
}
