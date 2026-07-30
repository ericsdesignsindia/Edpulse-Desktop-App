import React, { useState } from 'react';
import { Split, Trophy, Plus, CheckCircle, ArrowRight } from 'lucide-react';
import { INITIAL_AB_TESTS } from '../../data/mockData';
import { ABExperiment } from '../../types';

export const ABTestingView: React.FC = () => {
  const [experiments, setExperiments] = useState<ABExperiment[]>(INITIAL_AB_TESTS);

  const declareWinner = (id: string, winnerVariant: 'A' | 'B') => {
    setExperiments(
      experiments.map((exp) => {
        if (exp.id === id) {
          return {
            ...exp,
            status: 'Concluded',
            winner: winnerVariant,
          };
        }
        return exp;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase tracking-wide">
              Marketing Suite
            </span>
            <span className="text-xs text-slate-400">| Conversion Rate Optimization (CRO)</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">A/B Split Testing Experiments</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Test copy variants, CTA wording, and page headlines to maximize visitor conversion rates with statistical confidence.
          </p>
        </div>
      </div>

      {/* Experiments List */}
      <div className="space-y-6">
        {experiments.map((exp) => (
          <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-100">{exp.name}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      exp.status === 'Running'
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{exp.pageUrl}</p>
              </div>

              {exp.winner && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-bold self-start sm:self-auto">
                  <Trophy className="w-4 h-4 text-emerald-400" /> Variant {exp.winner} Declared Winner
                </div>
              )}
            </div>

            {/* Split Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Variant A */}
              <div
                className={`p-5 rounded-2xl border space-y-3 relative ${
                  exp.winner === 'A'
                    ? 'bg-emerald-950/20 border-emerald-500/60'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                    Control (Variant A)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{exp.variantA.visitors.toLocaleString()} visitors</span>
                </div>

                <div className="text-sm font-bold text-slate-200 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  "{exp.variantA.headline}"
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Conversion Rate</span>
                    <div className="text-lg font-extrabold text-slate-100">{exp.variantA.conversionRate}%</div>
                  </div>

                  {exp.status === 'Running' && (
                    <button
                      onClick={() => declareWinner(exp.id, 'A')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
                    >
                      Declare Winner A
                    </button>
                  )}
                </div>
              </div>

              {/* Variant B */}
              <div
                className={`p-5 rounded-2xl border space-y-3 relative ${
                  exp.winner === 'B'
                    ? 'bg-emerald-950/20 border-emerald-500/60'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                    Challenger (Variant B)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{exp.variantB.visitors.toLocaleString()} visitors</span>
                </div>

                <div className="text-sm font-bold text-slate-200 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  "{exp.variantB.headline}"
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Conversion Rate</span>
                    <div className="text-lg font-extrabold text-emerald-400">{exp.variantB.conversionRate}%</div>
                  </div>

                  {exp.status === 'Running' && (
                    <button
                      onClick={() => declareWinner(exp.id, 'B')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-emerald-600/20"
                    >
                      Declare Winner B
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
