import React from 'react';
import {
  BarChart3,
  Award,
  Layers,
  Paperclip,
  Trash2,
  TrendingUp,
  Download
} from 'lucide-react';
import { TabType, CustomAttachment } from '../../types';

interface ResultsTabProps {
  onLaunchTool: (toolId: string, title: string) => void;
  onOpenAttachmentModal: (tab?: TabType) => void;
  attachments: CustomAttachment[];
  onDeleteAttachment: (id: string) => void;
  onOpenAttachment: (att: CustomAttachment) => void;
}

export const ResultsTab: React.FC<ResultsTabProps> = ({
  onLaunchTool,
  onOpenAttachmentModal,
  attachments,
  onDeleteAttachment,
  onOpenAttachment,
}) => {
  const cards = [
    {
      id: 'results_1st',
      title: '1st Year IPE Results',
      desc: 'General, Vocational, Group, Subject wise marks, distinction rankers & backlogs breakdown.',
      badge: '1st Year',
      year: '1st',
      icon: BarChart3,
    },
    {
      id: 'results_2nd',
      title: '2nd Year IPE Results',
      desc: 'Final graduating batches marks analytics, GPA bands, college toppers and pass percentages.',
      badge: '2nd Year',
      year: '2nd',
      icon: Award,
    },
    {
      id: 'results_final',
      title: 'IPE + IPASE Final Consolidated',
      desc: 'Combined 1st & 2nd year consolidated college analytics with supplementary clearance tracking.',
      badge: 'Consolidated',
      year: 'final',
      icon: Layers,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold uppercase tracking-wider mb-2">
          Analytics Directorate
        </span>
        <h2 className="text-base font-bold text-slate-900">Intermediate Results & Performance Analytics</h2>
        <p className="text-xs text-slate-500 mt-1">
          Detailed marksheet tabulation, pass rate analysis across groups (MPC, BiPC, CEC, MEC, HEC, Vocational), and Grade A distinctions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                onClick={() => onLaunchTool('results_analytics', c.title)}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-sky-400 hover:shadow-xs transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center group-hover:scale-105 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Open Analytics Portal</span>
                  <span>&rarr;</span>
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
              RESULTS ATTACHMENTS & CSV SHEETS
            </h3>
            <p className="text-[11px] text-slate-500">
              Attached student marks spreadsheets and Board Gazette copies
            </p>
          </div>
          <button
            onClick={() => onOpenAttachmentModal('results')}
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
                  <span className="text-[9.5px] font-bold text-sky-700 uppercase block mb-0.5">
                    {att.category || 'RESULTS'}
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
            No custom results attachments saved yet.
          </div>
        )}
      </div>
    </div>
  );
};
