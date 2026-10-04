import React from 'react';
import {
  FileText,
  IdCard,
  Grid,
  FileSpreadsheet,
  Paperclip,
  Trash2,
  Send,
  Printer
} from 'lucide-react';
import { TabType, CustomAttachment } from '../../types';

interface ExamPreTabProps {
  onLaunchTool: (toolId: string, title: string) => void;
  onOpenAttachmentModal: (tab?: TabType) => void;
  attachments: CustomAttachment[];
  onDeleteAttachment: (id: string) => void;
  onOpenAttachment: (att: CustomAttachment) => void;
}

export const ExamPreTab: React.FC<ExamPreTabProps> = ({
  onLaunchTool,
  onOpenAttachmentModal,
  attachments,
  onDeleteAttachment,
  onOpenAttachment,
}) => {
  const cards = [
    {
      id: 'pre_letters',
      title: 'Pre Examination Letters',
      desc: 'Official covering letters to Police (SHO), Tahsildar (MRO), Post Office, Electricity & MEO.',
      badge: 'Official Letters',
      icon: FileText,
      actionText: 'Generate Letters',
    },
    {
      id: 'exam_id_cards',
      title: 'Exam Identity Cards Generator',
      desc: 'Print official photo badges for CS, DO, Invigilators, Clerk, Attender, Waterman & Police.',
      badge: 'ID Badges',
      icon: IdCard,
      actionText: 'Create ID Cards',
    },
    {
      id: 'seating_arrangements',
      title: 'Day Seating & Attendance Arrangement',
      desc: 'Room layout configs with strength caps, visual blackboard serpentine seating, 26-row attendance sheets, QP summary, & notice boards.',
      badge: 'Seating & Attendance',
      icon: Grid,
      actionText: 'Generate Plan',
    },
    {
      id: 'local_seating',
      title: 'Local Exam Seating Plan',
      desc: 'Internal college exams (Unit Tests, Quarterly, Half-Yearly & Pre-Final) with 2 iframe engines: Room-Wise Layout and Attendance & Seating Generator.',
      badge: 'Dual Iframe Engines',
      icon: FileSpreadsheet,
      actionText: 'Open Local Seating Plan',
    },
    {
      id: 'authorized_person',
      title: 'Authorized Person DIEO Letter',
      desc: 'Letter authorizing senior representative to collect question paper trunks & OMR answer books.',
      badge: 'Camp Letter',
      icon: Send,
      actionText: 'Generate Letter',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider mb-2">
          Examination Wing
        </span>
        <h2 className="text-base font-bold text-slate-900">Pre-Examination Protocols & Letters</h2>
        <p className="text-xs text-slate-500 mt-1">
          Statutory appointment letters, center readiness checklists, room seating layouts, and police bandobast requisitions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                onClick={() => onLaunchTool(c.id, c.title)}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-400 hover:shadow-xs transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
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
                  <span>{c.actionText}</span>
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
              PRE-EXAM ATTACHMENTS & MEMOS
            </h3>
            <p className="text-[11px] text-slate-500">
              Attached office letters, center orders, and Excel seating files
            </p>
          </div>
          <button
            onClick={() => onOpenAttachmentModal('exam-pre')}
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
                  <span className="text-[9.5px] font-bold text-amber-700 uppercase block mb-0.5">
                    {att.category || 'PRE-EXAM'}
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
            No custom pre-exam attachments saved yet.
          </div>
        )}
      </div>
    </div>
  );
};
