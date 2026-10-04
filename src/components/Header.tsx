import React from 'react';
import {
  Menu,
  Search,
  Paperclip,
  Lock,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onToggleSidebar: () => void;
  onOpenAttachmentModal: () => void;
  onLockApp: () => void;
  onOpenPinSettings: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onToggleSidebar,
  onOpenAttachmentModal,
  onLockApp,
  onOpenPinSettings,
  searchQuery,
  onSearchChange,
}) => {
  const titles: Record<TabType, { title: string; subtitle: string }> = {
    dashboard: { title: 'Dashboard Hub', subtitle: 'Digital Education & College Administration Platform' },
    admissions: { title: 'Admissions & Student Verification', subtitle: 'TGBIE Portal & UDISE+ APAAR Registry' },
    'exam-pre': { title: 'Pre-Examination Protocols & Letters', subtitle: 'Official requisition formats & security correspondence' },
    'exam-during': { title: 'During Examination Tools & Registers', subtitle: 'Annexures, seating allotment & confidential registers' },
    'exam-post': { title: 'Post Examination Relieving & Closure', subtitle: 'Duty certificates, material delivery & transport claim' },
    results: { title: 'Results & Analytics Hub', subtitle: 'IPE & IPASE general, vocational & backlog analytics' },
    converters: { title: 'File Converters & Image Tools', subtitle: 'PDF merge/split & portal compliant image compressor' },
    'sports-games': { title: 'Cricket Scoring & Sports Hub', subtitle: 'Live ball-by-ball tournament scorer & scorecards' },
    about: { title: 'About Us', subtitle: 'Platform author, objectives & educational utilities' },
  };

  const current = titles[currentTab] || { title: 'IE Utility Hub', subtitle: 'NewGen eEducation' };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 no-print">
      {/* Zone 1: Mobile toggle & Breadcrumb Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm md:text-base font-bold text-slate-900 tracking-tight leading-tight">
            {current.title}
          </h2>
          <p className="text-[11px] text-slate-500 hidden sm:block leading-none mt-0.5">
            {current.subtitle}
          </p>
        </div>
      </div>

      {/* Zone 2 & 3: Search & Actions */}
      <div className="flex items-center gap-2">
        <div className="relative hidden lg:block">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search registers, tools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44 md:w-52"
          />
        </div>

        <button
          onClick={onOpenAttachmentModal}
          className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          title="Add Local File or Google Sheet Link"
        >
          <Paperclip className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Attach</span>
        </button>

        {/* PIN Security Settings */}
        <button
          onClick={onOpenPinSettings}
          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          title="Change Security PIN or Master Key"
          aria-label="PIN Settings"
        >
          <Shield className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">PIN Settings</span>
        </button>

        {/* Lock Screen */}
        <button
          onClick={onLockApp}
          className="p-1.5 text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition"
          title="Lock Platform Now"
          aria-label="Lock App"
        >
          <Lock className="w-4 h-4" />
        </button>

        <a
          href="https://tgbie.cgg.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">TGBIE</span>
        </a>
      </div>
    </header>
  );
};
