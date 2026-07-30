import React, { useState } from 'react';
import {
  LineChart as LineChartIcon,
  Users,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Globe,
  Smartphone,
  Laptop,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const TRAFFIC_DATA_TODAY = [
  { time: '08:00', visitors: 420, conversions: 24 },
  { time: '10:00', visitors: 680, conversions: 45 },
  { time: '12:00', visitors: 1120, conversions: 82 },
  { time: '14:00', visitors: 980, conversions: 65 },
  { time: '16:00', visitors: 1450, conversions: 110 },
  { time: '18:00', visitors: 1720, conversions: 142 },
  { time: '20:00', visitors: 1350, conversions: 98 },
];

const TRAFFIC_DATA_WEEK = [
  { time: 'Mon', visitors: 8400, conversions: 520 },
  { time: 'Tue', visitors: 9800, conversions: 680 },
  { time: 'Wed', visitors: 12400, conversions: 920 },
  { time: 'Thu', visitors: 11200, conversions: 810 },
  { time: 'Fri', visitors: 14500, conversions: 1150 },
  { time: 'Sat', visitors: 7800, conversions: 480 },
  { time: 'Sun', visitors: 6500, conversions: 390 },
];

export const TrafficAnalyticsView: React.FC = () => {
  const [range, setRange] = useState<'today' | 'week'>('today');

  const activeData = range === 'today' ? TRAFFIC_DATA_TODAY : TRAFFIC_DATA_WEEK;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 uppercase tracking-wide">
              Marketing Suite
            </span>
            <span className="text-xs text-slate-400">| Real-Time Traffic Stream</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">Traffic & Conversion Analytics</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Live visitor streams, funnel conversion tracking, and multi-channel attribution analytics.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setRange('today')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              range === 'today'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Today (24h)
          </button>
          <button
            onClick={() => setRange('week')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              range === 'week'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Last 7 Days
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase">
            <span>Live Active Visitors</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="text-2xl font-extrabold text-slate-100">1,720 Active</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs peak yesterday
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Conversion Rate</span>
          <div className="text-2xl font-extrabold text-indigo-400">4.82%</div>
          <div className="text-[11px] text-indigo-300">Target goal: 4.50%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Avg Session Duration</span>
          <div className="text-2xl font-extrabold text-slate-100">3m 42s</div>
          <div className="text-[11px] text-slate-400">High engagement</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Primary Source</span>
          <div className="text-2xl font-extrabold text-emerald-400">Organic SEO</div>
          <div className="text-[11px] text-slate-400">48% of total traffic</div>
        </div>
      </div>

      {/* Main Area Chart */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <LineChartIcon className="w-4 h-4 text-fuchsia-400" />
            Visitor Traffic & Leads Trend ({range === 'today' ? '24 Hours' : '7 Days'})
          </h3>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Total Visitors
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Conversions
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorVisitors)"
              />
              <Area
                type="monotone"
                dataKey="conversions"
                stroke="#34d399"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConversions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Sources Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase">1. Organic Search (48%)</h4>
          <p className="text-xs text-slate-400">Google search queries & technical SEO keyword clusters driving 825 active users.</p>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[48%]"></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase">2. Paid Ads (32%)</h4>
          <p className="text-xs text-slate-400">Google Search Ads & Meta retargeting campaigns driving 550 active users.</p>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[32%]"></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase">3. Direct & Social (20%)</h4>
          <p className="text-xs text-slate-400">LinkedIn posts and direct URL traffic driving 345 active users.</p>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-fuchsia-500 h-full w-[20%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
