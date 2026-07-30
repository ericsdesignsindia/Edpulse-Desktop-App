import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  DollarSign,
  TrendingUp,
  Sliders,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { INITIAL_AD_CAMPAIGNS } from '../../data/mockData';
import { AdCampaign } from '../../types';

export const PaidAdManagerView: React.FC = () => {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(INITIAL_AD_CAMPAIGNS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Campaign Form State
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<AdCampaign['platform']>('Google Ads');
  const [budget, setBudget] = useState(2000);

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(
      campaigns.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Active' ? 'Paused' : 'Active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleBudgetChange = (id: string, newBudget: number) => {
    setCampaigns(
      campaigns.map((c) => (c.id === id ? { ...c, monthlyBudget: newBudget } : c))
    );
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newCamp: AdCampaign = {
      id: `ad-${Date.now()}`,
      name,
      platform,
      monthlyBudget: budget,
      spent: 0,
      clicks: 0,
      conversions: 0,
      roas: 3.5,
      status: 'Active',
    };

    setCampaigns([newCamp, ...campaigns]);
    setShowAddModal(false);
    setName('');
  };

  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalBudget = campaigns.reduce((acc, c) => acc + c.monthlyBudget, 0);
  const avgRoas = (
    campaigns.reduce((acc, c) => acc + c.roas, 0) / (campaigns.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
              Marketing Suite
            </span>
            <span className="text-xs text-slate-400">| Multi-Platform PPC Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">Paid Ad Campaign Manager</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Control live search & social ad campaigns across Google Ads, Meta, and LinkedIn. Manage budgets and optimize target ROAS.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Launch Campaign
        </button>
      </div>

      {/* Stats KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Total Monthly Spend</span>
          <div className="text-xl font-extrabold text-slate-100">${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()}</div>
          <div className="text-[11px] text-indigo-400">Pacing on target</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Average Blended ROAS</span>
          <div className="text-xl font-extrabold text-emerald-400">{avgRoas}x Return</div>
          <div className="text-[11px] text-emerald-400/80">+0.8x vs last quarter benchmark</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Active Campaigns</span>
          <div className="text-xl font-extrabold text-slate-100">
            {campaigns.filter((c) => c.status === 'Active').length} Active
          </div>
          <div className="text-[11px] text-slate-400">Google, Meta & LinkedIn</div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-indigo-400" />
            Active Ad Campaigns
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Real-time Budget Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Campaign Name</th>
                <th className="p-3.5">Platform</th>
                <th className="p-3.5">Monthly Budget</th>
                <th className="p-3.5">Spent / Clicks</th>
                <th className="p-3.5">ROAS</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-slate-200">
                    {camp.name}
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        camp.platform === 'Google Ads'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : camp.platform === 'Meta Ads'
                          ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                          : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                      }`}
                    >
                      {camp.platform}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-200 font-semibold">
                        ${camp.monthlyBudget}/mo
                      </span>
                      <input
                        type="range"
                        min="500"
                        max="10000"
                        step="250"
                        value={camp.monthlyBudget}
                        onChange={(e) => handleBudgetChange(camp.id, parseInt(e.target.value))}
                        className="w-20 accent-indigo-500"
                        title="Adjust Budget"
                      />
                    </div>
                  </td>

                  <td className="p-3.5 text-slate-300">
                    <div>${camp.spent} spent</div>
                    <div className="text-[10px] text-slate-500">{camp.clicks} clicks ({camp.conversions} conv.)</div>
                  </td>

                  <td className="p-3.5">
                    <span className="font-extrabold text-emerald-400 font-mono">
                      {camp.roas}x
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        camp.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {camp.status}
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => toggleCampaignStatus(camp.id)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-semibold border border-slate-700 transition-colors inline-flex items-center gap-1"
                    >
                      {camp.status === 'Active' ? (
                        <>
                          <Pause className="w-3 h-3 text-amber-400" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-emerald-400" /> Resume
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddCampaign}
            className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Launch New Paid Campaign</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Enterprise AI SaaS - Search Ads"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 mt-1 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 mt-1 text-slate-200"
                >
                  <option value="Google Ads">Google Ads</option>
                  <option value="Meta Ads">Meta Ads</option>
                  <option value="LinkedIn Ads">LinkedIn Ads</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400">Monthly Target Budget ($)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 mt-1 text-slate-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
            >
              Start Campaign Tracking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
