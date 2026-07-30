import React, { useState, useEffect } from 'react';
import { Wifi, Cpu, Activity, Clock, Terminal } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');
  const [ramUsage, setRamUsage] = useState(42);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    update();
    const timer = setInterval(update, 1000);

    // Simulate mild RAM fluctuation
    const ramTimer = setInterval(() => {
      setRamUsage((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(65, Math.max(35, prev + delta));
      });
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(ramTimer);
    };
  }, []);

  return (
    <footer className="h-7 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-3 text-[11px] text-slate-400 select-none shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <Wifi className="w-3 h-3 animate-pulse" />
          <span>Hub Connected</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-indigo-400" />
          <span>Runtime: .NET 9.0 WPF Engine</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-violet-400" />
          <span>RAM: {ramUsage}% (1.8 GB / 4.0 GB)</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-slate-300 font-mono">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{timeStr}</span>
        </div>
        <div className="hidden lg:flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[10px]">
          <Activity className="w-3 h-3 text-indigo-400" />
          <span>Express + Gemini API</span>
        </div>
      </div>
    </footer>
  );
};
