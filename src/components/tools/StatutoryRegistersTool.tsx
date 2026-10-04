import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Printer,
  RotateCcw,
  FileCheck2,
  Lock,
  Grid,
  Mail,
  Shuffle,
  Barcode,
  Gavel,
  Footprints,
  Tags,
  FileSpreadsheet,
  Layers,
  AlertTriangle,
  Send,
  Receipt,
  FileText,
  Navigation,
  ExternalLink,
} from 'lucide-react';

interface StatutoryRegistersToolProps {
  initialRegister?: string;
  onBack: () => void;
}

interface RegisterConfig {
  id: string;
  name: string;
  shortLabel: string;
  url: string;
  icon: React.ElementType;
  badge: string;
}

const REGISTERS: RegisterConfig[] = [
  {
    id: 'qp_account',
    name: 'TGBIE Q.P. Account Registers Generator (Cols 1-16 & 1-7)',
    shortLabel: 'Q.P. Account Register',
    url: '/qp-account-register.html',
    icon: FileSpreadsheet,
    badge: 'Cols 1-16 & 1-7'
  },
  {
    id: 'annexure',
    name: 'Annexure I, II & III Generator (QP Packeting Parser)',
    shortLabel: 'Annexure I, II, III',
    url: '/annexure-registers.html',
    icon: FileCheck2,
    badge: 'Statutory Returns'
  },
  {
    id: 'errata_detailed',
    name: 'Errata Register (Format 2: Day, Session & Room Acknowledgment)',
    shortLabel: 'Errata (Room Ack)',
    url: '/errata-register-detailed.html',
    icon: AlertTriangle,
    badge: 'Format 2 (Detailed)'
  },
  {
    id: 'errata_basic',
    name: 'Errata Register (Format 1: Basic Row Count & Invigilator Sign)',
    shortLabel: 'Errata (Basic Rows)',
    url: '/errata-register-basic.html',
    icon: AlertTriangle,
    badge: 'Format 1 (Basic)'
  },
  {
    id: 'consolidated_absentees',
    name: 'Consolidated Absentees Statement (10-Digit HT Validator & PDF Schedule)',
    shortLabel: 'Consolidated Absentees',
    url: '/consolidated-absentees.html',
    icon: Send,
    badge: 'Daily Absentees'
  },
  {
    id: 'post_office_dispatch',
    name: 'Answer Script Dispatch & Bundle Booking Register (Multi-Register)',
    shortLabel: 'Post Office Dispatch',
    url: '/post-office-dispatch-register.html',
    icon: Send,
    badge: 'Postal & Unique Bundle'
  },
  {
    id: 'tada_bill',
    name: 'T.A. & D.A. Bill Form Generator (Aligned with TSIPE Data Schema)',
    shortLabel: 'TA / DA Bill',
    url: '/tada-bill.html',
    icon: Receipt,
    badge: 'Remuneration'
  },
  {
    id: 'workdone_statement',
    name: 'Workdone Statement Generator (By Designation & Official Rate)',
    shortLabel: 'Workdone Statement',
    url: '/workdone-statement.html',
    icon: FileText,
    badge: 'Workdone Claim'
  },
  {
    id: 'local_conveyance',
    name: 'Local Conveyance Certificate (Synced with TSIPE Form Fields)',
    shortLabel: 'Local Conveyance',
    url: '/local-conveyance.html',
    icon: Navigation,
    badge: 'Conveyance'
  },
  {
    id: 'invigilator',
    name: 'Allotment of Invigilators Register (Daily Lottery Duty Chart)',
    shortLabel: 'Invigilator Lottery Chart',
    url: '/allotment-invigilators.html',
    icon: Shuffle,
    badge: 'Daily Roster'
  },
  {
    id: 'blank_barcode',
    name: 'Blank OMR Bar-coded Sheets Account Register',
    shortLabel: 'Blank OMR Register',
    url: '/blank-omr-register.html',
    icon: Barcode,
    badge: 'Gen & Voc'
  },
  {
    id: 'part1_omr',
    name: 'Part-I Absentees OMR Submission Letter & Attachment Statement',
    shortLabel: 'Part-I OMR Statement',
    url: '/part1-omr-submission.html',
    icon: Mail,
    badge: 'Postal Memo'
  },
  {
    id: 'bundle_slips',
    name: 'Official Bundle Cover Slips (2-in-1) & Examination Proformas',
    shortLabel: 'Bundle Slips & Proformas',
    url: '/bundle-slips-proformas.html',
    icon: Tags,
    badge: '5 Proformas'
  },
  {
    id: 'room_allotment',
    name: 'Room-wise Allotment & Absentees Register (Before 9:30 AM)',
    shortLabel: 'Room Allotment & Absentees',
    url: '/room-wise-allotment-absentees.html',
    icon: Grid,
    badge: 'Daily Room Log'
  },
  {
    id: 'malpractice',
    name: 'Register of Malpractice Cases Booked at the Examination Centre',
    shortLabel: 'Malpractice Register',
    url: '/malpractice-cases-register.html',
    icon: Gavel,
    badge: 'Disciplinary'
  },
  {
    id: 'movement',
    name: 'Candidate Movement Register (Nature Calls / Washroom Log)',
    shortLabel: 'Candidate Movement',
    url: '/candidate-movement-register.html',
    icon: Footprints,
    badge: 'Supervision Log'
  }
];

export const StatutoryRegistersTool: React.FC<StatutoryRegistersToolProps> = ({
  initialRegister = 'annexure',
  onBack,
}) => {
  const normalizeId = (id: string): string => {
    if (id.includes('qp_account') || id.includes('qp_register') || id === 'qp') return 'qp_account';
    if (id.includes('annexure')) return 'annexure';
    if (id === 'errata_basic' || id === 'errata1') return 'errata_basic';
    if (id === 'errata_detailed' || id === 'errata2' || id.includes('errata')) return 'errata_detailed';
    if (id.includes('consolidated')) return 'consolidated_absentees';
    if (id.includes('post_office') || id.includes('dispatch')) return 'post_office_dispatch';
    if (id.includes('tada') || id === 'ta_da') return 'tada_bill';
    if (id.includes('workdone')) return 'workdone_statement';
    if (id.includes('conveyance') || id === 'local_conveyance') return 'local_conveyance';
    if (id.includes('invigilator')) return 'invigilator';
    if (id.includes('blank_barcode') || id.includes('barcode')) return 'blank_barcode';
    if (id.includes('part1') || id.includes('omr')) return 'part1_omr';
    if (id.includes('bundle') || id.includes('proforma') || id.includes('do_qp') || id.includes('police')) return 'bundle_slips';
    if (id.includes('room_allotment') || id.includes('room_wise')) return 'room_allotment';
    if (id.includes('malpractice') || id.includes('mp_')) return 'malpractice';
    if (id.includes('movement')) return 'movement';
    return 'annexure';
  };

  const [activeRegId, setActiveRegId] = useState<string>(() => normalizeId(initialRegister));
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setActiveRegId(normalizeId(initialRegister));
  }, [initialRegister]);

  const currentConfig = REGISTERS.find((r) => r.id === activeRegId) || REGISTERS[0];

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = currentConfig.url;
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 w-full">
      {/* Top Controls Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl mb-2.5 shadow-xs no-print shrink-0 divide-y divide-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-3 py-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition shrink-0"
              title="Back to During Exams Hub"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {currentConfig.name}
                </h2>
                <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                  {currentConfig.badge}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block truncate">
                Local offline engine &bull; Direct @media print layout &bull; TGBIE statutory formats
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Quick Register Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
              <Layers className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />
              <select
                value={activeRegId}
                onChange={(e) => setActiveRegId(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 border-none outline-none cursor-pointer py-0.5"
              >
                {REGISTERS.map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {reg.shortLabel}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              title="Print Current Register"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Document</span>
            </button>

            <button
              onClick={() => window.open(currentConfig.url, '_blank')}
              className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              title="Open Register in New Window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Open New Window</span>
            </button>

            <button
              onClick={handleReload}
              className="p-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-100 transition"
              title="Reload Tool"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 9 Quick Switcher Navigation Pills */}
        <div className="px-2.5 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-50/70 rounded-b-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            Registers:
          </span>
          {REGISTERS.map((reg) => {
            const Icon = reg.icon;
            const isActive = reg.id === activeRegId;
            return (
              <button
                key={reg.id}
                onClick={() => setActiveRegId(reg.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5 transition shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-200 border border-slate-200 text-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{reg.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Local HTML IFrame container - Full Height Screen Fit */}
      <div className="flex-1 min-h-[calc(100dvh-175px)] sm:min-h-0 w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs relative">
        <iframe
          ref={iframeRef}
          src={currentConfig.url}
          title={currentConfig.name}
          className="absolute inset-0 w-full h-full border-0 block"
        />
      </div>
    </div>
  );
};
