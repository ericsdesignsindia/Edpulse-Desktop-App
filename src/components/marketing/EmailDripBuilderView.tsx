import React, { useState } from 'react';
import {
  Mail,
  Plus,
  Trash2,
  Sparkles,
  Loader2,
  Code2,
  Copy,
  Check,
  Image,
  Type,
  MousePointer,
  Grid,
  Minus,
} from 'lucide-react';
import { EmailBlock } from '../../types';

export const EmailDripBuilderView: React.FC = () => {
  const [blocks, setBlocks] = useState<EmailBlock[]>([
    {
      id: 'block-1',
      type: 'Header Banner',
      title: 'Header Image Banner',
      content: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'block-2',
      type: 'Body Copy',
      title: 'Welcome Email Body',
      content: 'Hello {{First_Name}},\n\nThank you for exploring EDPulse OS. Our integrated marketing & operating platform helps team scale digital campaigns with sub-second execution.',
    },
    {
      id: 'block-3',
      type: 'CTA Button',
      title: 'Main Call to Action',
      content: 'Claim Your Strategy Call ->',
      buttonUrl: 'https://edpulse.app/demo',
    },
  ]);

  const [aiProduct, setAiProduct] = useState('EDPulse Growth Engine');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleAddBlock = (type: EmailBlock['type']) => {
    const newBlock: EmailBlock = {
      id: `block-${Date.now()}`,
      type,
      title: `${type} Block`,
      content:
        type === 'Header Banner'
          ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
          : type === 'CTA Button'
          ? 'Schedule Free Audit'
          : type === 'Feature Grid'
          ? '• Feature 1: Sub-second AI Routing\n• Feature 2: 4.2x ROAS Optimization'
          : 'Custom email section content text goes here...',
      buttonUrl: type === 'CTA Button' ? 'https://edpulse.app' : undefined,
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const handleGenerateAiDrip = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/email-drip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: aiProduct,
          campaignGoal: 'Schedule Live Demo',
          audience: 'B2B Marketing Directors',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.emails && data.emails.length > 0) {
          const firstEmail = data.emails[0];
          setBlocks([
            {
              id: `block-${Date.now()}-1`,
              type: 'Body Copy',
              title: `Subject: ${firstEmail.subject}`,
              content: firstEmail.body,
            },
            {
              id: `block-${Date.now()}-2`,
              type: 'CTA Button',
              title: 'Action Button',
              content: 'Schedule Demo Now',
              buttonUrl: 'https://edpulse.app/demo',
            },
          ]);
          setIsGenerating(false);
          return;
        }
      }
      // Fallback block sequence for GitHub Pages hosting
      setBlocks([
        {
          id: `block-${Date.now()}-1`,
          type: 'Body Copy',
          title: `Subject: Introducing ${aiProduct || 'EDPulse Digital OS'} - Accelerate Your Pipeline`,
          content: `Hi Founder,\n\nAre you looking to scale your marketing velocity without adding headcount? With ${aiProduct || 'EDPulse'}, automate lead capture, CRM syncing, and CRO analytics in one unified dashboard.\n\nLet's discuss how we can increase your conversion rate by 3x this month.`,
        },
        {
          id: `block-${Date.now()}-2`,
          type: 'CTA Button',
          title: 'Primary Action',
          content: 'Book 15-Min Strategy Session',
          buttonUrl: 'https://edpulse.app/demo',
        },
      ]);
    } catch (err) {
      console.error(err);
      setBlocks([
        {
          id: `block-${Date.now()}-1`,
          type: 'Body Copy',
          title: `Subject: Introducing ${aiProduct || 'EDPulse Digital OS'} - Accelerate Your Pipeline`,
          content: `Hi Founder,\n\nAre you looking to scale your marketing velocity without adding headcount? With ${aiProduct || 'EDPulse'}, automate lead capture, CRM syncing, and CRO analytics in one unified dashboard.\n\nLet's discuss how we can increase your conversion rate by 3x this month.`,
        },
        {
          id: `block-${Date.now()}-2`,
          type: 'CTA Button',
          title: 'Primary Action',
          content: 'Book 15-Min Strategy Session',
          buttonUrl: 'https://edpulse.app/demo',
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportHtmlCode = () => {
    const htmlString = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
    .card { background: #1e293b; padding: 20px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
    .btn { display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="card">
    ${blocks
      .map((b) => {
        if (b.type === 'Header Banner') return `<img src="${b.content}" style="width:100%; border-radius:8px; margin-bottom:15px;" />`;
        if (b.type === 'CTA Button') return `<a href="${b.buttonUrl || '#'}" class="btn">${b.content}</a>`;
        return `<p style="line-height:1.6; white-space:pre-line;">${b.content}</p>`;
      })
      .join('\n    ')}
  </div>
</body>
</html>`;
    navigator.clipboard.writeText(htmlString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
              Marketing Suite
            </span>
            <span className="text-xs text-slate-400">| Email Automation Builder</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">Visual Email Drip Builder</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Assemble high-converting email drip workflows dynamically. Drag, edit, and export responsive HTML email templates.
          </p>
        </div>

        <button
          onClick={exportHtmlCode}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto"
        >
          {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copiedCode ? 'HTML Copied!' : 'Export HTML Code'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Block Palette & AI Drip Generator */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-5 shadow-xl">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <label className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Drip Sequence Generator
            </label>
            <input
              type="text"
              value={aiProduct}
              onChange={(e) => setAiProduct(e.target.value)}
              placeholder="Product or Service Name"
              className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-slate-200"
            />
            <button
              onClick={handleGenerateAiDrip}
              disabled={isGenerating}
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              Generate 3-Step Sequence
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Add Email Elements
            </h3>

            <button
              onClick={() => handleAddBlock('Header Banner')}
              className="w-full text-left bg-slate-950 hover:bg-slate-800/80 p-3 rounded-xl border border-slate-800 text-xs flex items-center gap-2.5 text-slate-200 transition-colors"
            >
              <Image className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold">Add Image Banner</div>
                <div className="text-[10px] text-slate-400">Hero graphic or brand header</div>
              </div>
            </button>

            <button
              onClick={() => handleAddBlock('Body Copy')}
              className="w-full text-left bg-slate-950 hover:bg-slate-800/80 p-3 rounded-xl border border-slate-800 text-xs flex items-center gap-2.5 text-slate-200 transition-colors"
            >
              <Type className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <div className="font-semibold">Add Text Copy Block</div>
                <div className="text-[10px] text-slate-400">Formatted email body content</div>
              </div>
            </button>

            <button
              onClick={() => handleAddBlock('CTA Button')}
              className="w-full text-left bg-slate-950 hover:bg-slate-800/80 p-3 rounded-xl border border-slate-800 text-xs flex items-center gap-2.5 text-slate-200 transition-colors"
            >
              <MousePointer className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="font-semibold">Add Call to Action Button</div>
                <div className="text-[10px] text-slate-400">Direct response button with link</div>
              </div>
            </button>

            <button
              onClick={() => handleAddBlock('Feature Grid')}
              className="w-full text-left bg-slate-950 hover:bg-slate-800/80 p-3 rounded-xl border border-slate-800 text-xs flex items-center gap-2.5 text-slate-200 transition-colors"
            >
              <Grid className="w-4 h-4 text-violet-400 shrink-0" />
              <div>
                <div className="font-semibold">Add Feature Bullet Grid</div>
                <div className="text-[10px] text-slate-400">Key value propositions</div>
              </div>
            </button>
          </div>
        </div>

        {/* Live Canvas View */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              Live Interactive Email Canvas ({blocks.length} Blocks)
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">
              Responsive Preview
            </span>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 min-h-[380px] space-y-4 max-w-lg mx-auto shadow-inner">
            {blocks.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-16">
                Canvas is empty. Click elements on the left to assemble your email.
              </p>
            ) : (
              blocks.map((block) => (
                <div
                  key={block.id}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 relative group hover:border-indigo-500/50 transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase border-b border-slate-800/60 pb-2">
                    <span>{block.type}</span>
                    <button
                      onClick={() => handleRemoveBlock(block.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded"
                      title="Remove block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Render by Type */}
                  {block.type === 'Header Banner' && (
                    <img
                      src={block.content}
                      alt="Banner"
                      className="w-full h-32 object-cover rounded-lg border border-slate-800"
                    />
                  )}

                  {block.type === 'Body Copy' && (
                    <textarea
                      rows={3}
                      value={block.content}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, content: val } : b)));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded p-2 leading-relaxed focus:border-indigo-500 focus:outline-none"
                    />
                  )}

                  {block.type === 'CTA Button' && (
                    <div className="pt-1 text-center">
                      <a
                        href={block.buttonUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-lg shadow-md hover:bg-indigo-500 transition-colors"
                      >
                        {block.content}
                      </a>
                    </div>
                  )}

                  {block.type === 'Feature Grid' && (
                    <textarea
                      rows={2}
                      value={block.content}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, content: val } : b)));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded p-2 focus:border-indigo-500 focus:outline-none"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
