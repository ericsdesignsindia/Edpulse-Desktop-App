import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, CheckCircle2, Key, Users, Lock, Radio } from 'lucide-react';
import { UserRole } from '../../types';

interface CrmPermissionsViewProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const CrmPermissionsView: React.FC<CrmPermissionsViewProps> = ({
  currentRole,
  onRoleChange,
}) => {
  const [hubspotStatus, setHubspotStatus] = useState<'Connected' | 'Syncing'>('Connected');
  const [salesforceStatus, setSalesforceStatus] = useState<'Connected' | 'Syncing'>('Connected');

  const handleSyncHubspot = () => {
    setHubspotStatus('Syncing');
    setTimeout(() => setHubspotStatus('Connected'), 1200);
  };

  const handleSyncSalesforce = () => {
    setSalesforceStatus('Syncing');
    setTimeout(() => setSalesforceStatus('Connected'), 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
              System Architecture
            </span>
            <span className="text-xs text-slate-400">| CRM Webhooks & Access Control</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">CRM Synchronization & User Roles</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Manage external lead database webhooks, API tokens, and role-based permissions across EDPulse OS.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CRM Integrations Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            Active CRM Webhook Integrations
          </h3>

          <div className="space-y-3">
            {/* HubSpot */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200 text-xs">HubSpot CRM Real-time Sync</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Bi-directional contact & deal pipeline sync</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                  {hubspotStatus}
                </span>
                <button
                  onClick={handleSyncHubspot}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                  title="Trigger Manual Sync"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${hubspotStatus === 'Syncing' ? 'animate-spin text-indigo-400' : ''}`} />
                </button>
              </div>
            </div>

            {/* Salesforce */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200 text-xs">Salesforce Enterprise Webhook</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Automated lead routing & ROI opportunity logging</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                  {salesforceStatus}
                </span>
                <button
                  onClick={handleSyncSalesforce}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                  title="Trigger Manual Sync"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${salesforceStatus === 'Syncing' ? 'animate-spin text-indigo-400' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Role Matrix Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="w-4 h-4 text-indigo-400" />
            Active Role & Access Matrix
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Current Active Role: <strong className="text-indigo-300">{currentRole}</strong>. Select another role below to switch active portal context.
          </p>

          <div className="space-y-2">
            {(['Admin', 'Client', 'Content Manager', 'Developer'] as UserRole[]).map((role) => (
              <div
                key={role}
                onClick={() => onRoleChange(role)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                  currentRole === role
                    ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="font-bold text-slate-200">{role} Role</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {role === 'Admin' && 'Full system access & ad budgets'}
                    {role === 'Client' && 'Restricted case study & report views'}
                    {role === 'Content Manager' && 'Calendar & copywriting access'}
                    {role === 'Developer' && 'C# WPF XAML exporter & FastAPI webhooks'}
                  </div>
                </div>

                {currentRole === role && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
