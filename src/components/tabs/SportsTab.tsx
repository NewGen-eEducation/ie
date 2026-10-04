import React from 'react';
import {
  Trophy,
  Activity,
  Layers,
  Paperclip,
  Trash2,
  ExternalLink,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { TabType, CustomAttachment, RecentItem } from '../../types';

interface SportsTabProps {
  onLaunchTool?: (toolId: string, title: string) => void;
  onOpenAttachmentModal: (tab?: TabType) => void;
  onLogRecent: (item: Omit<RecentItem, 'timestamp'>) => void;
  attachments: CustomAttachment[];
  onDeleteAttachment: (id: string) => void;
  onOpenAttachment: (att: CustomAttachment) => void;
}

export const SportsTab: React.FC<SportsTabProps> = ({
  onOpenAttachmentModal,
  onLogRecent,
  attachments,
  onDeleteAttachment,
  onOpenAttachment,
}) => {
  const cricketApps = [
    {
      id: 'cricket_hub_app',
      title: 'CricketHub — NewGen Tournament Scorer',
      url: 'https://newgeneeducation.github.io/Crickethub/',
      desc: 'Official NewGen online tournament scorer with live broadcast graphics, strike rates, with/without extras, live run rates, and team match summaries.',
      badge: 'Tournament Scorer',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      icon: Trophy,
    },
    {
      id: 'gully_cricket_app',
      title: 'GullyCricket — Dual-Innings Scorecard',
      url: 'https://newgeneeducation.github.io/GullyCricket/',
      desc: 'Official NewGen Gully Cricket scoring engine with full tabular scorecards, fall of wickets, over logs, player statistics, and match report generation.',
      badge: 'Gully Style Scorer',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      btnColor: 'bg-rose-600 hover:bg-rose-700 text-white',
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-wrap justify-between items-start gap-3">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              Physical Education & Sports
            </span>
            <h2 className="text-base font-bold text-slate-900">Cricket Tournament & Scoring Apps</h2>
            <p className="text-xs text-slate-500 mt-1">
              Official external web applications hosted on GitHub Pages by NewGen eEducation for inter-collegiate tournaments, zonal matches, and local fixtures.
            </p>
          </div>
        </div>

        {/* Featured Cricket Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {cricketApps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className="p-5 rounded-xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white hover:border-rose-400 hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-105 transition shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${app.badgeColor}`}>
                      {app.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition">
                    {app.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {app.desc}
                  </p>

                  <div className="mt-3 p-2 bg-white rounded-lg border border-slate-200 text-[11px] font-mono text-indigo-700 flex items-center justify-between">
                    <span className="truncate">{app.url}</span>
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onLogRecent({ title: app.title, url: app.url })}
                    className={`w-full py-2.5 px-4 ${app.btnColor} rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs hover:shadow`}
                  >
                    <span>Load External Page</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Attachments Component */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">
              SPORTS ATTACHMENTS & TOURNAMENT FIXTURES
            </h3>
            <p className="text-[11px] text-slate-500">
              Attached match schedules, team rosters, and scoresheets
            </p>
          </div>
          <button
            onClick={() => onOpenAttachmentModal('sports-games')}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>+ Add File / Sheet</span>
          </button>
        </div>

        {attachments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {attachments.map((att) => (
              <div
                key={att.id}
                onClick={() => onOpenAttachment(att)}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300 transition cursor-pointer flex justify-between items-start group"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[9.5px] font-bold text-rose-700 uppercase block mb-0.5">
                    {att.category || 'SPORTS'}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600">
                    {att.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {att.desc || att.url}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteAttachment(att.id);
                    }}
                    className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-slate-400 text-xs">
            No custom sports attachments saved yet.
          </div>
        )}
      </div>
    </div>
  );
};
