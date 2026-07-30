import React, { useState } from 'react';
import {
  Briefcase,
  ExternalLink,
  Filter,
  CheckCircle,
  Plus,
  Layers,
  X,
  Globe,
} from 'lucide-react';
import { INITIAL_PORTFOLIO_CASES } from '../../data/mockData';
import { PortfolioCaseStudy, ServicePillarId } from '../../types';

export const DigitalPortfolioView: React.FC = () => {
  const [cases, setCases] = useState<PortfolioCaseStudy[]>(INITIAL_PORTFOLIO_CASES);
  const [filterPillar, setFilterPillar] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<PortfolioCaseStudy | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Case form state
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newRoi, setNewRoi] = useState('');

  const filteredCases = filterPillar === 'all'
    ? cases
    : cases.filter((c) => c.pillar === filterPillar);

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newClient) return;

    const created: PortfolioCaseStudy = {
      id: `case-${Date.now()}`,
      title: newTitle,
      client: newClient,
      description: newDesc || 'Verified digital growth deployment.',
      pillar: 'web-dev',
      pillarLabel: 'Web Dev & SEO',
      roiStats: newRoi || '+150% ROI Impact',
      techStack: ['React', 'Tailwind', 'FastAPI'],
      gradient: 'from-indigo-900 to-slate-900',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      liveUrl: `https://${newClient.toLowerCase().replace(/\s+/g, '')}.example.com`,
    };

    setCases([created, ...cases]);
    setShowAddModal(false);
    setNewTitle('');
    setNewClient('');
    setNewDesc('');
    setNewRoi('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wide">
              Pillar 08: Digital Portfolio
            </span>
            <span className="text-xs text-slate-400">| Client Case Studies</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">EDPulse Client Showcase</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Verified case studies, live app deployments, and measurable ROI growth metrics across enterprise verticals.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Case Study
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="text-slate-500 flex items-center gap-1 shrink-0 font-medium mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter by:
        </span>
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'web-dev', label: 'Web Dev & SEO' },
          { id: 'ai-automation', label: 'AI Automation' },
          { id: 'brand-solution', label: 'Creative & Branding' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterPillar(tab.id)}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-all shrink-0 ${
              filterPillar === tab.id
                ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Case Study Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Card Banner */}
              <div className={`h-36 bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between relative`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                    {item.pillarLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-950/60 px-2 py-0.5 rounded">
                    Client: {item.client}
                  </span>
                </div>

                <h3 className="font-bold text-slate-100 text-base group-hover:text-indigo-300 transition-colors drop-shadow">
                  {item.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {/* ROI Highlight */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-emerald-300">{item.roiStats}</span>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
              <button
                onClick={() => setSelectedCase(item)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                View Deep Dive Specs
              </button>
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg"
                >
                  <Globe className="w-3 h-3 text-slate-400" />
                  Demo <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Deep Dive Case Study Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${selectedCase.badgeColor}`}>
                  {selectedCase.pillarLabel}
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{selectedCase.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <strong className="text-slate-400 block mb-0.5">Client Organization:</strong>
                <span className="text-slate-200 font-semibold text-sm">{selectedCase.client}</span>
              </div>

              <div>
                <strong className="text-slate-400 block mb-0.5">Project Overview & Business Impact:</strong>
                <p className="leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300">
                  {selectedCase.description}
                </p>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <strong className="text-emerald-400 block text-[11px] uppercase">Verified Business ROI:</strong>
                <span className="text-emerald-300 font-bold text-sm">{selectedCase.roiStats}</span>
              </div>

              <div>
                <strong className="text-slate-400 block mb-1">Integrated Technology Stack:</strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCase.techStack.map((t, i) => (
                    <span key={i} className="bg-slate-800 text-indigo-300 px-2.5 py-1 rounded text-[11px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddCase}
            className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Add New Case Study</h3>
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
                <label className="text-slate-400">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. AI Workflow Optimization"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 mt-1 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400">Client Name</label>
                <input
                  type="text"
                  required
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 mt-1 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400">ROI Growth Metric</label>
                <input
                  type="text"
                  value={newRoi}
                  onChange={(e) => setNewRoi(e.target.value)}
                  placeholder="e.g. +180% Organic Leads"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 mt-1 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-400">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Brief summary of client deliverables and results..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 mt-1 text-slate-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
            >
              Publish to Portfolio
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
