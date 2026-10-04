import React from 'react';
import {
  FileText,
  Award,
  CheckCircle,
  Truck,
  Paperclip,
  Trash2,
  Printer
} from 'lucide-react';
import { TabType, CustomAttachment } from '../../types';

interface ExamPostTabProps {
  onLaunchTool: (toolId: string, title: string) => void;
  onOpenAttachmentModal: (tab?: TabType) => void;
  attachments: CustomAttachment[];
  onDeleteAttachment: (id: string) => void;
  onOpenAttachment: (att: CustomAttachment) => void;
}

export const ExamPostTab: React.FC<ExamPostTabProps> = ({
  onLaunchTool,
  onOpenAttachmentModal,
  attachments,
  onDeleteAttachment,
  onOpenAttachment,
}) => {
  const cards = [
    {
      id: 'post_material',
      title: 'Post Material Submission',
      desc: 'Packet submission covering letter addressed to DIEO Camp with sealed unused papers & registers.',
      badge: 'Submission',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: FileText,
      toolType: 'post_material',
    },
    {
      id: 'relieving_certificate',
      title: 'Relieving & Duty Certificate',
      desc: 'Official discharge and conduct certificate for Departmental Officer, CS, and external invigilators.',
      badge: 'Relieving',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Award,
      toolType: 'relieving',
    },
    {
      id: 'spot_valuation_relieving',
      title: 'Spot Valuation Relieving',
      desc: 'Certificate verifying answer script valuation completion and relieving from Camp Officer.',
      badge: 'Spot Camp',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: CheckCircle,
      toolType: 'spot_valuation',
    },
    {
      id: 'transportation_certificate',
      title: 'Transportation Certificate',
      desc: 'Material transportation vehicle charges certificate for question paper trunk and bundle transit.',
      badge: 'Conveyance',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Truck,
      toolType: 'transport',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-2">
          Evaluation & Closure
        </span>
        <h2 className="text-base font-bold text-slate-900">Post Examination Relieving & Submissions</h2>
        <p className="text-xs text-slate-500 mt-1">
          Closing procedures, material submission receipts to DIEO distribution camp, and staff duty relieving certificates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                onClick={() => onLaunchTool('post_exam', c.title)}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-400 hover:shadow-xs transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center group-hover:scale-105 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${c.badgeColor}`}>
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                    {c.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Generate Certificate</span>
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
              POST-EXAM ATTACHMENTS & RECEIPTS
            </h3>
            <p className="text-[11px] text-slate-500">
              Attached postal receipts, relieving orders, and camp vouchers
            </p>
          </div>
          <button
            onClick={() => onOpenAttachmentModal('exam-post')}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Paperclip className="w-3.5 h-3.5" />
            <span>+ Add File / Link</span>
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
                  <span className="text-[9.5px] font-bold text-indigo-700 uppercase block mb-0.5">
                    {att.category || 'POST-EXAM'}
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
            No custom post-exam attachments saved yet.
          </div>
        )}
      </div>
    </div>
  );
};
