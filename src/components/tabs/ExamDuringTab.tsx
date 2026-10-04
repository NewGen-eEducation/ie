import React from 'react';
import {
  FileCheck2,
  Lock,
  Grid,
  Mail,
  Send,
  Shuffle,
  Barcode,
  AlertTriangle,
  Gavel,
  Footprints,
  Tags,
  Receipt,
  Paperclip,
  Trash2,
  FileSpreadsheet
} from 'lucide-react';
import { TabType, CustomAttachment } from '../../types';

interface ExamDuringTabProps {
  onLaunchTool: (toolId: string, title: string) => void;
  onOpenAttachmentModal: (tab?: TabType) => void;
  attachments: CustomAttachment[];
  onDeleteAttachment: (id: string) => void;
  onOpenAttachment: (att: CustomAttachment) => void;
}

export const ExamDuringTab: React.FC<ExamDuringTabProps> = ({
  onLaunchTool,
  onOpenAttachmentModal,
  attachments,
  onDeleteAttachment,
  onOpenAttachment,
}) => {
  const duringExamItems = [
    {
      id: 'qp_account_register',
      title: 'TGBIE Q.P. Account Registers Generator',
      desc: 'Full Q.P. Account Register (Cols 1-16) & Stock / Withdrawal Register (Cols 1-7) with instant PDF parser, combined streams, and print layout.',
      badge: 'Cols 1-16 & 1-7',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
      icon: FileSpreadsheet,
      buttons: [{ text: 'Open Q.P. Account Register', toolId: 'qp_account_register' }],
    },
    {
      id: 'annexure_registers',
      title: 'Annexure I, II & III Generator',
      desc: 'TGBIE official Annexure I (QP Account), II (Room absentees), and III statutory returns with automatic PDF packeting parser.',
      badge: 'Statutory Returns',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: FileCheck2,
      buttons: [{ text: 'Open Annexure I, II, III', toolId: 'annexure_registers' }],
    },
    {
      id: 'errata_notices',
      title: 'Errata Registers (2 Formats)',
      desc: 'TGBIE official Errata registers for question paper corrections communicated by the Board with invigilator room acknowledgments.',
      badge: '2 Formats',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-300',
      icon: AlertTriangle,
      buttons: [
        { text: 'Format 1: Basic Rows', toolId: 'errata_basic' },
        { text: 'Format 2: Room Ack', toolId: 'errata_detailed' },
      ],
    },
    {
      id: 'post_office_absentees',
      title: 'Consolidated Absentees & Post Office',
      desc: 'Consolidated absentees statement with 10-digit Hall Ticket validator and Answer Script Dispatch & Bundle Booking Register.',
      badge: '2 Registers',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Send,
      buttons: [
        { text: 'Consolidated Absentees', toolId: 'consolidated_absentees' },
        { text: 'Post Office Dispatch', toolId: 'post_office_dispatch' },
      ],
    },
    {
      id: 'billing_statements',
      title: 'Billing: TA/DA, Workdone & Conveyance',
      desc: 'Official TGBIE billing generators aligned with TSIPE schema: TA/DA Bill, Workdone Statement, and Local Conveyance form.',
      badge: '3 Billing Forms',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
      icon: Receipt,
      buttons: [
        { text: 'TA / DA Bill', toolId: 'tada_bill' },
        { text: 'Workdone Statement', toolId: 'workdone_statement' },
        { text: 'Local Conveyance', toolId: 'local_conveyance' },
      ],
    },
    {
      id: 'invigilators_register',
      title: 'Allotment of Invigilators Register',
      desc: 'Daily Lottery Duty Chart & attendance roster with room allotment, subject restriction checks, and reporting time rules.',
      badge: 'Daily Lottery Chart',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Shuffle,
      buttons: [{ text: 'Open Invigilators Register', toolId: 'invigilators_register' }],
    },
    {
      id: 'blank_barcode',
      title: 'Blank OMR Bar-coded Sheets Register',
      desc: 'Blank OMR Bar-coded Sheets Account Register and replacement buffer tracking for General and Vocational streams.',
      badge: 'Audit Register',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: Barcode,
      buttons: [{ text: 'Open Blank OMR Register', toolId: 'blank_barcode' }],
    },
    {
      id: 'part1_omr',
      title: 'Part-I Absentees OMR Submission Letter',
      desc: 'Part-I absentees OMR submission letter & daily postal attachment statement for DIEO Camp and TGBIE Hyderabad.',
      badge: 'Postal Memo',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Mail,
      buttons: [{ text: 'Open Part-I OMR Statement', toolId: 'part1_omr' }],
    },
    {
      id: 'bundle_slips',
      title: 'Bundle Cover Slips & Examination Proformas',
      desc: 'Bundle cover slips (2-in-1), Police safe custody deposit/withdrawal register, QP opening account, and malpractice proformas.',
      badge: '5 Proformas',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Tags,
      buttons: [{ text: 'Open Bundle Slips & Proformas', toolId: 'bundle_slips' }],
    },
    {
      id: 'room_allotment',
      title: 'Room-wise Allotment & Absentees (Ann-II)',
      desc: 'Hall ticket series mapped to rooms with invigilator signatures, room door slips, and materials returned before 9:30 AM.',
      badge: 'Annexure - II',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Grid,
      buttons: [
        { text: 'Room Absentees (Ann-II)', toolId: 'room_allotment' },
        { text: 'Room Seating Layout', toolId: 'seating_arrangements' },
      ],
    },
    {
      id: 'malpractice_cases',
      title: 'Malpractice Cases Register',
      desc: 'Register of Malpractice Cases Booked at the Examination Centre as per CS handbook with confiscation memo.',
      badge: 'Disciplinary',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Gavel,
      buttons: [{ text: 'Open Malpractice Register', toolId: 'malpractice_cases' }],
    },
    {
      id: 'candidate_movement',
      title: 'Candidate Movement Register',
      desc: 'Candidate hall exit, washroom movement, nature calls, and water boy monitoring log with precise timestamps.',
      badge: 'Mandatory',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: Footprints,
      buttons: [{ text: 'Open Movement Register', toolId: 'candidate_movement' }],
    },
    {
      id: 'do_qp_account',
      title: 'DO Q.P Account & Safe Custody',
      desc: 'Departmental Officer custody register accounting for Question Paper packets receipt & opening, and Police Safe Custody.',
      badge: 'Confidential',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      icon: Lock,
      buttons: [
        { text: 'Police Safe Custody', toolId: 'bundle_slips' },
        { text: 'Q.P. Register', toolId: 'qp_account_register' },
      ],
    },
    {
      id: 'tada_remuneration',
      title: 'Remuneration & Honorarium Calculator',
      desc: 'Custom staff remuneration bills and honorarium calculation for CS, DO, Invigilators, Clerks, and Waterman.',
      badge: 'Calculator',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: Receipt,
      buttons: [
        { text: 'Remuneration Calculator', toolId: 'remuneration' },
        { text: 'Post-Exam Relieving', toolId: 'post_exam' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider mb-2">
          Active Operations
        </span>
        <h2 className="text-base font-bold text-slate-900">During Examination Tools & Registers</h2>
        <p className="text-xs text-slate-500 mt-1">
          Comprehensive statutory registers, question paper opening custody, room seating arrangements, barcode logs, and invigilation slips.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {duringExamItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col justify-between hover:bg-white hover:border-slate-300 hover:shadow-xs transition"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex gap-1.5 flex-wrap mt-4 pt-2.5 border-t border-slate-200/80">
                  {item.buttons.map((btn, bIdx) => (
                    <button
                      key={bIdx}
                      onClick={() => onLaunchTool(btn.toolId, `${item.title} - ${btn.text}`)}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition"
                    >
                      <span>{btn.text}</span>
                      <span>&rarr;</span>
                    </button>
                  ))}
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
              DURING-EXAM ATTACHMENTS & SPREADSHEETS
            </h3>
            <p className="text-[11px] text-slate-500">
              Attached examination registers and daily attendance sheets
            </p>
          </div>
          <button
            onClick={() => onOpenAttachmentModal('exam-during')}
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
                  <span className="text-[9.5px] font-bold text-amber-700 uppercase block mb-0.5">
                    {att.category || 'EXAMINATION'}
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
            No custom during-exam attachments saved yet.
          </div>
        )}
      </div>
    </div>
  );
};
