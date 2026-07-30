import React, { useState } from 'react';
import {
  User,
  Minus,
  Square,
  X,
  Code2,
  ShieldCheck,
  CheckCircle2,
  Monitor,
  Sparkles,
} from 'lucide-react';
import { UserRole } from '../types';

interface DesktopHeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenCodeStudio: () => void;
  activeTab: string;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  currentRole,
  onRoleChange,
  onOpenCodeStudio,
  activeTab,
}) => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <>
      {/* Windows Native WPF Title Bar & Header */}
      <header className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 select-none text-xs shrink-0">
        {/* App Icon & Title */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-[10px] text-white shadow-sm shadow-indigo-500/40">
            EP
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200 tracking-wide">
              EDPulse OS
            </span>
            <span className="text-[10px] text-slate-500 hidden sm:inline-block">
              v2.5 (Windows .NET 9 WPF)
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Active Engine
            </span>
          </div>
        </div>

        {/* Center Title or Quick Action */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400">
          <Monitor className="w-3.5 h-3.5 text-indigo-400" />
          <span>Workspace: <strong className="text-slate-200 capitalize">{activeTab.replace('-', ' ')}</strong></span>
        </div>

        {/* Right Tools & Window Controls */}
        <div className="flex items-center gap-2">
          {/* C# WPF Code Studio Button */}
          <button
            onClick={onOpenCodeStudio}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 text-[11px] font-medium transition-colors"
            title="Inspect C# .NET WPF Code & WPF Simulator"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">C# WPF Code Studio</span>
          </button>

          {/* User Role Switcher Button */}
          <button
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-medium transition-colors"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[80px] sm:max-w-none">{currentRole}</span>
          </button>

          {/* Windows Titlebar Control Buttons */}
          <div className="flex items-center ml-1 border-l border-slate-800 pl-1">
            <button
              onClick={() => {}}
              className="p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded"
              title="Minimize"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              <Square className="w-3 h-3" />
            </button>
            <button
              onClick={() => {}}
              className="p-1.5 text-slate-400 hover:bg-rose-600 hover:text-white rounded"
              title="Close Application"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </header>

      {/* Role Switcher Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  Switch Operating Portal & User Role
                </h3>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Select the active portal environment. Switching roles dynamically adjusts accessible tabs and editing permissions across EDPulse OS.
            </p>

            <div className="space-y-2">
              {(['Admin', 'Client', 'Content Manager', 'Developer'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role);
                    setShowRoleModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-xs font-medium text-left transition-all ${
                    currentRole === role
                      ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-slate-100">{role} Portal</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {role === 'Admin' && 'Full system control, ad budgets, and CRM sync'}
                      {role === 'Client' && 'Restricted ROI view, case study approvals, and reports'}
                      {role === 'Content Manager' && 'Content calendar, email drip builder, and copywriting'}
                      {role === 'Developer' && 'C# WPF XAML exporter, FastAPI webhooks, and API logs'}
                    </div>
                  </div>
                  {currentRole === role && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
