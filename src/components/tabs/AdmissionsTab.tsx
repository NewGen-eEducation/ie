import React from 'react';
import {
  IdCard,
  Landmark,
  ExternalLink,
  Users,
  CheckCircle,
  FileSpreadsheet,
  Paperclip,
  Trash2,
  CalendarCheck
} from 'lucide-react';
import { TabType, CustomAttachment, RecentItem } from '../../types';

interface AdmissionsTabProps {
  onLaunchTool: (toolId: string, title: string) => void;
  onOpenAttachmentModal: (tab?: TabType) => void;
  onLogRecent: (item: Omit<RecentItem, 'timestamp'>) => void;
  attachments: CustomAttachment[];
  onDeleteAttachment: (id: string) => void;
  onOpenAttachment: (att: CustomAttachment) => void;
}

export const AdmissionsTab: React.FC<AdmissionsTabProps> = ({
  onLaunchTool,
  onOpenAttachmentModal,
  onLogRecent,
  attachments,
  onDeleteAttachment,
  onOpenAttachment,
}) => {
  return (
    <div className="space-y-6">
      {/* Directorate Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider mb-2">
          Admissions Directorate
        </span>
        <h2 className="text-base font-bold text-slate-900">Intermediate & School Admissions System</h2>
        <p className="text-xs text-slate-500 mt-1">
          Official state and national government portal links with student registration, APAAR ID generation, and verification utilities.
        </p>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="bg-emerald-50/40 rounded-xl border border-emerald-200 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Landmark className="w-5 h-5 text-emerald-700" />
                <h3 className="text-sm font-bold text-emerald-950">TGBIE Official Portal</h3>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                State Board of Intermediate Education First & Second Year admissions, student stream allotment, and nominal rolls verification.
              </p>
            </div>
            <a
              href="https://tgbie.cgg.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onLogRecent({ title: 'TGBIE Portal', url: 'https://tgbie.cgg.gov.in/' })}
              className="mt-4 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition self-start"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit TGBIE Portal</span>
            </a>
          </div>

          <div className="bg-blue-50/40 rounded-xl border border-blue-200 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-700" />
                <h3 className="text-sm font-bold text-blue-950">UDISE+ Official Portal</h3>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                Unified District Information System for Education Plus & automated APAAR (Permanent Academic Account Registry) ID generation.
              </p>
            </div>
            <a
              href="https://udiseplus.gov.in/#/en/page/oldlink"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onLogRecent({ title: 'UDISE+ Portal', url: 'https://udiseplus.gov.in/#/en/page/oldlink' })}
              className="mt-4 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition self-start"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit UDISE+ Portal</span>
            </a>
          </div>
        </div>

        {/* Verification Steps Interactive Tools */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider mb-3">
            COLLEGE ADMISSION VERIFICATION & SUMMARY STEPS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                id: 'attendance',
                title: '1. Student Attendance Summary',
                desc: 'Monthly & cumulative student attendance percentages with condonation & detention thresholds.',
                icon: CalendarCheck,
              },
              {
                id: 'tgbie_adm',
                title: '2. TGBIE Online ADM Summary',
                desc: 'College admissions nominal roll verification statement for submission to Board inspector.',
                icon: FileSpreadsheet,
              },
              {
                id: 'udise',
                title: '3. UDISE+ & APAAR Summary',
                desc: 'Aadhaar authenticated APAAR registry verification and pending student exception tracker.',
                icon: CheckCircle,
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  onClick={() => onLaunchTool(step.id, step.title)}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-400 hover:shadow-xs transition cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-indigo-600 flex items-center gap-1">
                    <span>Open Generator</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Attachments Component */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">
              ADMISSIONS ATTACHMENTS & SPREADSHEETS
            </h3>
            <p className="text-[11px] text-slate-500">
              Attached student admission registers and Google Sheets
            </p>
          </div>
          <button
            onClick={() => onOpenAttachmentModal('admissions')}
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
                  <span className="text-[9.5px] font-bold text-emerald-600 uppercase block mb-0.5">
                    {att.category || 'ADMISSIONS'}
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
            No custom admissions attachments saved yet.
          </div>
        )}
      </div>
    </div>
  );
};
