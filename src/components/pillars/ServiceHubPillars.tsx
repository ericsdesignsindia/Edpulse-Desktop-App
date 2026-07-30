import React, { useState } from 'react';
import {
  Code,
  TrendingUp,
  Palette,
  FileText,
  Sparkles,
  Bot,
  Search,
  FolderGit2,
  CheckCircle2,
  ArrowRight,
  Zap,
  Play,
  Calculator,
  Layers,
  Send,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import { SERVICE_PILLARS } from '../../data/mockData';
import { ServicePillarId } from '../../types';

export const ServiceHubPillars: React.FC<{
  onNavigateToTab: (tabId: string) => void;
}> = ({ onNavigateToTab }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<ServicePillarId>('web-dev');

  // Pillar 1: Web Dev Estimator State
  const [appType, setAppType] = useState('SaaS Dashboard');
  const [featuresCount, setFeaturesCount] = useState(4);
  const [estimatedDays, setEstimatedDays] = useState(14);

  // Pillar 4: AI Content Writer State
  const [aiTopic, setAiTopic] = useState('Enterprise AI Lead Generation in 2026');
  const [aiType, setAiType] = useState('LinkedIn Thought Leadership Post');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Pillar 6: AI Automation Simulator State
  const [triggerStatus, setTriggerStatus] = useState<string | null>(null);

  const selectedPillar = SERVICE_PILLARS.find((p) => p.id === selectedPillarId) || SERVICE_PILLARS[0];

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'FolderGit2':
        return <FolderGit2 className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const handleGenerateAiCopy = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    setGeneratedCopy('');
    try {
      const res = await fetch('/api/ai/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          type: aiType,
          channel: 'LinkedIn',
          tone: 'Authoritative & High-Converting',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedCopy(data.content);
      } else {
        setGeneratedCopy(`Error: ${data.error || 'Failed to generate copy'}`);
      }
    } catch (err: any) {
      setGeneratedCopy(`Network error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRunAutomationTrigger = () => {
    setTriggerStatus('Testing n8n webhook payload send...');
    setTimeout(() => {
      setTriggerStatus('✅ Webhook received! Lead qualified -> HubSpot deal created -> Slack alert sent (< 80ms)');
    }, 1000);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
              8 Core Operating Pillars
            </span>
            <span className="text-xs text-slate-400">| Integrated Marketing & Engineering</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">EDPulse Service Hub</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Unified control console spanning web engineering, growth marketing, visual identity, AI automation, and technical SEO.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToTab('seo-auditor')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            Run Technical SEO Scan
          </button>
        </div>
      </div>

      {/* 8 Pillar Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICE_PILLARS.map((pillar) => {
          const isSelected = pillar.id === selectedPillarId;
          return (
            <div
              key={pillar.id}
              onClick={() => setSelectedPillarId(pillar.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white bg-gradient-to-tr ${pillar.color} shadow-md`}>
                  {getPillarIcon(pillar.iconName)}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${pillar.badgeColor}`}>
                  Pillar 0{pillar.number}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {pillar.shortDesc}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{pillar.metrics[0]?.label}</span>
                <span className="font-bold text-indigo-400">{pillar.metrics[0]?.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Pillar Interactive Deep Dive Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-tr ${selectedPillar.color} shadow-lg`}>
              {getPillarIcon(selectedPillar.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100">{selectedPillar.title} Console</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${selectedPillar.badgeColor}`}>
                  Active View
                </span>
              </div>
              <p className="text-xs text-slate-400">{selectedPillar.fullDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {selectedPillar.metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">{m.label}</div>
                <div className="text-sm font-extrabold text-indigo-300">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Tool based on Selected Pillar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Capabilities List */}
          <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              Core Pillar Capabilities
            </h4>
            <div className="space-y-2">
              {selectedPillar.keyFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              {selectedPillar.id === 'content-writing' && (
                <button
                  onClick={() => onNavigateToTab('calendar')}
                  className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  Open Content Calendar <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {selectedPillar.id === 'digital-portfolio' && (
                <button
                  onClick={() => onNavigateToTab('portfolio')}
                  className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  Explore Digital Portfolio <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {selectedPillar.id === 'seo' && (
                <button
                  onClick={() => onNavigateToTab('seo-auditor')}
                  className="w-full py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  Launch Full SEO Auditor <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Pillar Specific Interactive Console Area */}
          <div className="lg:col-span-2 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            {/* 1. WEB DEV TOOL */}
            {selectedPillar.id === 'web-dev' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-indigo-400" />
                    Web Application Scope & Timeline Estimator
                  </h4>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
                    Next.js + FastAPI Stack
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 font-medium">Application Archetype</label>
                    <select
                      value={appType}
                      onChange={(e) => setAppType(e.target.value)}
                      className="w-full mt-1 bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="SaaS Dashboard">SaaS Web Application</option>
                      <option value="E-Commerce Hub">Headless E-Commerce</option>
                      <option value="Enterprise Marketing Portal">Enterprise Marketing Portal</option>
                      <option value="AI Agent Web Interface">AI Agent Web Interface</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium">Custom API Modules ({featuresCount})</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={featuresCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setFeaturesCount(val);
                        setEstimatedDays(7 + val * 2);
                      }}
                      className="w-full mt-3 accent-indigo-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Estimated Development Sprint</span>
                    <div className="text-lg font-extrabold text-slate-100">{estimatedDays} Business Days</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Lighthouse Target</span>
                    <div className="text-sm font-bold text-emerald-400">98/100 Core Web Vitals</div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. CONTENT WRITING TOOL (GEMINI AI POWRED) */}
            {selectedPillar.id === 'content-writing' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Gemini AI Marketing Copy Studio
                  </h4>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                    Gemini 3.6 Flash Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400">Content Type</label>
                    <select
                      value={aiType}
                      onChange={(e) => setAiType(e.target.value)}
                      className="w-full mt-1 bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2"
                    >
                      <option value="LinkedIn Thought Leadership Post">LinkedIn Post</option>
                      <option value="Direct Response Ad Copy">Direct Response Ad Copy</option>
                      <option value="SEO Article Intro">SEO Article Introduction</option>
                      <option value="Email Subject Lines">Email Subject Lines</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Core Topic / Focus Keyword</label>
                    <input
                      type="text"
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      className="w-full mt-1 bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2"
                    />
                  </div>
                </div>

                <button
                  onClick={handleGenerateAiCopy}
                  disabled={isGenerating}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Generating copy with Gemini AI...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Generate Instant Copy
                    </>
                  )}
                </button>

                {generatedCopy && (
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 relative">
                    <button
                      onClick={() => handleCopyText(generatedCopy)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-slate-200 p-1 bg-slate-800 rounded"
                      title="Copy text"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <div className="text-[10px] text-indigo-400 font-bold uppercase">AI Generated Output</div>
                    <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans max-h-40 overflow-y-auto pr-6 leading-relaxed">
                      {generatedCopy}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* 6. AI AUTOMATION TOOL */}
            {selectedPillar.id === 'ai-automation' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase flex items-center gap-2">
                    <Bot className="w-4 h-4 text-violet-400" />
                    n8n Webhook & FastAPI Lead Routing Test
                  </h4>
                  <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded">
                    Webhook Port 3000 Ready
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Test the automated workflow pipeline connecting incoming webform lead payloads to Gemini AI qualification and CRM database insertion.
                </p>

                <button
                  onClick={handleRunAutomationTrigger}
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Simulate Inbound Webhook Payload
                </button>

                {triggerStatus && (
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono">
                    {triggerStatus}
                  </div>
                )}
              </div>
            )}

            {/* DEFAULT FALLBACK FOR OTHER PILLARS */}
            {!['web-dev', 'content-writing', 'ai-automation'].includes(selectedPillar.id) && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-200 uppercase flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  {selectedPillar.title} Overview & Strategy
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedPillar.fullDesc}
                </p>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-indigo-300">Target Deliverables</div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {selectedPillar.keyFeatures.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
