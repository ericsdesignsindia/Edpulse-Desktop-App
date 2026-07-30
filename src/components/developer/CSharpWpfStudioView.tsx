import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  Terminal,
  Play,
  Monitor,
  FileCode,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CSHARP_WPF_FILES } from '../../data/mockData';

export const CSharpWpfStudioView: React.FC = () => {
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [simulatedLog, setSimulatedLog] = useState<string[]>([]);
  const [simulatedBuildActive, setSimulatedBuildActive] = useState(false);

  const currentFile = CSHARP_WPF_FILES[selectedFileIdx];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunWpfSimulator = () => {
    setSimulatedBuildActive(true);
    setSimulatedLog(['[dotnet build] Building EDPulse.DesktopOS.csproj for Target Framework net9.0-windows...']);
    setTimeout(() => {
      setSimulatedLog((prev) => [
        ...prev,
        '[dotnet build] Compiling XAML views: MainWindow.xaml -> BAML stream',
        '[dotnet build] C# Roslyn Compiler -> EDPulse.DesktopOS.dll',
        '[dotnet build] Build Succeeded (0 Errors, 0 Warnings)',
        '[dotnet run] Starting WPF App Process (PID: 4892) on Windows Desktop...',
      ]);
      setSimulatedBuildActive(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
              Windows Native .NET
            </span>
            <span className="text-xs text-slate-400">| C# WPF Cross-Platform Solution</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">C# .NET WPF Code Studio</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Inspect, customize, and export the complete C# WPF XAML solution for Windows desktop. Includes ViewModel bindings, XAML controls, and .NET 9 project files.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunWpfSimulator}
            disabled={simulatedBuildActive}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            {simulatedBuildActive ? 'Building .NET Target...' : 'Test .NET 9 Build'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solution Files Navigation Sidebar */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileCode className="w-4 h-4 text-indigo-400" />
            WPF C# Solution Files
          </h3>

          <div className="space-y-2">
            {CSHARP_WPF_FILES.map((file, idx) => (
              <button
                key={file.fileName}
                onClick={() => setSelectedFileIdx(idx)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex flex-col gap-1 ${
                  selectedFileIdx === idx
                    ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300 font-semibold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-slate-200">{file.fileName}</span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded uppercase">
                    {file.language}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1">{file.description}</div>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={handleCopyCode}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Code Copied!' : 'Copy Active File Code'}
            </button>
          </div>
        </div>

        {/* C# Code Inspector & Console Area */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-xs font-bold text-slate-200">{currentFile.fileName}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Target: Windows Desktop (.NET 9.0 WPF)</span>
          </div>

          <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto max-h-[420px] leading-relaxed">
            <pre className="whitespace-pre-wrap">{currentFile.code}</pre>
          </div>

          {/* Build Output Logs */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" /> .NET Build Console Log
              </span>
              <span>net9.0-windows</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 max-h-28 overflow-y-auto space-y-1">
              {simulatedLog.length === 0 ? (
                <span className="text-slate-500">Click "Test .NET 9 Build" above to run C# compilation test.</span>
              ) : (
                simulatedLog.map((log, i) => <div key={i}>{log}</div>)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
