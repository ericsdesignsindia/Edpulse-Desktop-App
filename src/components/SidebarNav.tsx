import React from 'react';
import {
  LayoutGrid,
  Briefcase,
  Calendar,
  Mail,
  Megaphone,
  LineChart,
  SearchCheck,
  Split,
  ShieldCheck,
  Code2,
  Cpu,
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarNavProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  currentRole: UserRole;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  currentRole,
}) => {
  const isTabActive = (tabId: string) => activeTab === tabId;

  const getButtonClass = (tabId: string) =>
    `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
      isTabActive(tabId)
        ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
    }`;

  return (
    <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none">
      <div className="p-3 space-y-4 overflow-y-auto">
        {/* Brand Badge */}
        <div className="px-2 py-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-indigo-500/30">
            EP
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-xs tracking-wide">EDPulse</h1>
            <span className="text-[10px] text-indigo-400 font-medium block">Digital Marketing OS</span>
          </div>
        </div>

        {/* 1. Services & Portfolio */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Services & Portfolio
          </div>
          <button
            onClick={() => onSelectTab('dashboard')}
            className={getButtonClass('dashboard')}
          >
            <LayoutGrid className="w-4 h-4 text-indigo-400" />
            <span>Service Hub (8 Pillars)</span>
          </button>
          <button
            onClick={() => onSelectTab('portfolio')}
            className={getButtonClass('portfolio')}
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Digital Portfolio</span>
          </button>
        </div>

        {/* 2. Marketing Suite */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Marketing Suite
          </div>
          <button
            onClick={() => onSelectTab('calendar')}
            className={getButtonClass('calendar')}
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Content Calendar</span>
          </button>
          <button
            onClick={() => onSelectTab('email-builder')}
            className={getButtonClass('email-builder')}
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Email Drip Builder</span>
          </button>
          <button
            onClick={() => onSelectTab('ad-manager')}
            className={getButtonClass('ad-manager')}
          >
            <Megaphone className="w-4 h-4 text-indigo-400" />
            <span>Paid Ad Manager</span>
          </button>
          <button
            onClick={() => onSelectTab('traffic-reports')}
            className={getButtonClass('traffic-reports')}
          >
            <LineChart className="w-4 h-4 text-fuchsia-400" />
            <span>Traffic Analytics</span>
          </button>
          <button
            onClick={() => onSelectTab('seo-auditor')}
            className={getButtonClass('seo-auditor')}
          >
            <SearchCheck className="w-4 h-4 text-rose-400" />
            <span>SEO Site Auditor</span>
          </button>
          <button
            onClick={() => onSelectTab('ab-testing')}
            className={getButtonClass('ab-testing')}
          >
            <Split className="w-4 h-4 text-violet-400" />
            <span>A/B Testing Experiments</span>
          </button>
        </div>

        {/* 3. System & Governance */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            System & Architecture
          </div>
          <button
            onClick={() => onSelectTab('crm-permissions')}
            className={getButtonClass('crm-permissions')}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CRM Sync & User Roles</span>
          </button>
          <button
            onClick={() => onSelectTab('csharp-studio')}
            className={getButtonClass('csharp-studio')}
          >
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>C# WPF Code Studio</span>
          </button>
        </div>
      </div>

      {/* User Info Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
            ER
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-200 truncate">
              Eric Rodgers
            </p>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-medium truncate block">
              {currentRole}
            </span>
          </div>
        </div>
        <Cpu className="w-4 h-4 text-slate-500" title="System Engine Active" />
      </div>
    </aside>
  );
};
