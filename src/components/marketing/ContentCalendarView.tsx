import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Send,
  Sparkles,
  Loader2,
  Trash2,
  Filter,
  CheckCircle,
  Clock,
  Copy,
  Check,
} from 'lucide-react';
import { INITIAL_CALENDAR_POSTS } from '../../data/mockData';
import { CalendarPost } from '../../types';

export const ContentCalendarView: React.FC = () => {
  const [posts, setPosts] = useState<CalendarPost[]>(INITIAL_CALENDAR_POSTS);
  const [platform, setPlatform] = useState<'LinkedIn' | 'Twitter' | 'Instagram' | 'Facebook'>('LinkedIn');
  const [postText, setPostText] = useState('');
  const [scheduledTime, setScheduledTime] = useState('Tomorrow at 03:00 PM');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // AI Generator state
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSchedulePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPost: CalendarPost = {
      id: `post-${Date.now()}`,
      platform,
      content: postText,
      scheduledTime: scheduledTime || 'Scheduled for Next Sprint',
      status: 'Scheduled',
      author: 'Eric Rodgers',
      hashtags: ['EDPulseOS', 'GrowthOps'],
    };

    setPosts([newPost, ...posts]);
    setPostText('');
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleGenerateAiPost = async () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          type: `${platform} Social Post`,
          channel: platform,
          tone: 'Professional & High-Converting',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPostText(data.content);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter((p) => p.platform === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
              Marketing Suite
            </span>
            <span className="text-xs text-slate-400">| Multi-Channel Social Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">Content Calendar & AI Assistant</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Schedule social posts, run Gemini AI copywriting, and manage post queues across LinkedIn, Twitter, and Instagram.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Queue Velocity</span>
            <div className="text-sm font-bold text-emerald-400">{posts.length} Posts Active</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create / Schedule Post Form with AI Assistant */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-emerald-400" />
              Schedule New Social Post
            </h3>
          </div>

          {/* AI Idea Prompt */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <label className="text-[11px] font-bold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Copy Draft Assistant
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Topic e.g. SaaS CRO Tips"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleGenerateAiPost}
                disabled={isGenerating}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Generate
              </button>
            </div>
          </div>

          <form onSubmit={handleSchedulePost} className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-slate-400">Target Channel</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg p-2.5 mt-1 focus:border-indigo-500 focus:outline-none"
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter / X</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400">Post Content & Ad Copy</label>
              <textarea
                rows={4}
                required
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Type your social post or generate with Gemini AI above..."
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg p-2.5 mt-1 focus:border-indigo-500 focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-400">Publish Schedule Time</label>
              <input
                type="text"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                placeholder="e.g. Today at 04:00 PM"
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg p-2.5 mt-1 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              Schedule Post to Queue
            </button>
          </form>
        </div>

        {/* Scheduled Posts Queue Column */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Scheduled Queue ({filteredPosts.length})
            </h3>

            {/* Platform Filter Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
              {['all', 'LinkedIn', 'Twitter', 'Instagram'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2.5 py-1 rounded-md border font-medium transition-all shrink-0 ${
                    activeFilter === filter
                      ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                No scheduled posts found for this filter. Create one on the left!
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative group hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-400 px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">
                        {post.platform}
                      </span>
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {post.scheduledTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-medium border border-emerald-500/20">
                        {post.status}
                      </span>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-sans pt-1 whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {post.hashtags && post.hashtags.length > 0 && (
                    <div className="flex gap-1.5 pt-1">
                      {post.hashtags.map((tag, i) => (
                        <span key={i} className="text-[10px] text-indigo-400 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
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
