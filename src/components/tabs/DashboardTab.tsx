import React from 'react';
import {
  IdCard,
  FileSignature,
  PieChart,
  Activity,
  Youtube,
  Paperclip,
  CheckCircle,
  ExternalLink,
  Landmark,
  BookOpen,
  FileSpreadsheet,
  Users,
  Coins,
  ArrowLeftRight,
  ShieldCheck,
  MessageSquare,
  Video,
  Mail,
  GraduationCap,
  Bus,
  FileCheck2,
  Trash2,
  Download,
  Trophy
} from 'lucide-react';
import { TabType, CustomAttachment, RecentItem } from '../../types';

interface DashboardTabProps {
  onSwitchTab: (tab: TabType) => void;
  onLaunchTool: (toolId: string, title: string) => void;
  onOpenAttachmentModal: (tab?: TabType) => void;
  onLogRecent: (item: Omit<RecentItem, 'timestamp'>) => void;
  attachments: CustomAttachment[];
  onDeleteAttachment: (id: string) => void;
  onOpenAttachment: (att: CustomAttachment) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  onSwitchTab,
  onLaunchTool,
  onOpenAttachmentModal,
  onLogRecent,
  attachments,
  onDeleteAttachment,
  onOpenAttachment,
}) => {
  const hubTiles = [
    {
      tab: 'admissions' as TabType,
      badge: '2 Portals',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-700',
      icon: IdCard,
      title: 'Admissions Hub',
      desc: 'Direct links to TGBIE Student Admission & UDISE+ Official Portal.',
    },
    {
      tab: 'exam-during' as TabType,
      badge: '15+ Registers',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      iconBg: 'bg-amber-100 text-amber-700',
      icon: FileSignature,
      title: 'Exam Administration',
      desc: 'Comprehensive registers, seating arrangements & statutory slips.',
    },
    {
      tab: 'results' as TabType,
      badge: 'Live Analytics',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      iconBg: 'bg-sky-100 text-sky-700',
      icon: PieChart,
      title: 'Results & Summary',
      desc: 'General, Vocational & Subject-wise intermediate exam marks analytics.',
    },
    {
      tab: 'sports-games' as TabType,
      badge: 'Cricket Apps',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      iconBg: 'bg-rose-100 text-rose-700',
      icon: Activity,
      title: 'Cricket Scoring & Sports',
      desc: 'CricketHub tournament scorer & GullyCricket dual-innings scorecards.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-indigo-900 text-white p-6 md:p-8 shadow-lg border border-indigo-900/60">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-indigo-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Next-Gen Digital Learning & College Administration Tools</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
            NewGen <span className="text-red-500">e</span>Education
          </h1>
          <p className="text-xs md:text-sm text-indigo-100 leading-relaxed mb-6">
            A unified platform for digital college administration, statutory examinations, admissions, sports utilities, and practical tools curated for Telangana Intermediate Colleges.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://youtube.com/@gudurusathishkumar"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onLogRecent({ title: 'YouTube Channel', url: 'https://youtube.com/@gudurusathishkumar' })}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube Channel</span>
            </a>
            <button
              onClick={() => onSwitchTab('exam-during')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-xs"
            >
              <FileSignature className="w-4 h-4" />
              <span>Exam Registers</span>
            </button>
            <button
              onClick={() => onSwitchTab('sports-games')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-xs"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Cricket Apps</span>
            </button>
            <button
              onClick={() => onOpenAttachmentModal('dashboard')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition backdrop-blur-xs"
            >
              <Paperclip className="w-4 h-4" />
              <span>Attach File / Link</span>
            </button>
          </div>
        </div>

        {/* Decorative circle */}
        <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-indigo-500/10 pointer-events-none blur-2xl"></div>
      </div>

      {/* Hub Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hubTiles.map((tile, idx) => {
          const Icon = tile.icon;
          return (
            <div
              key={idx}
              onClick={() => onSwitchTab(tile.tab)}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:shadow-md hover:border-slate-300 transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className={`w-8 h-8 rounded-lg ${tile.iconBg} flex items-center justify-center transition group-hover:scale-105`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${tile.badgeBg}`}>
                    {tile.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {tile.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {tile.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>Open Hub</span>
                <span>&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Cricket Scoring Apps Banner on Dashboard */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-950 to-slate-950 text-white rounded-2xl p-5 md:p-6 shadow-md border border-rose-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 text-[10px] font-bold uppercase tracking-wider mb-1">
                <span>Official Sports Applications</span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-white">
                NewGen Live Cricket Scoring & Scorecard Engines
              </h3>
              <p className="text-xs text-rose-200/80 mt-0.5 max-w-xl">
                Tournament scoring, ball-by-ball updates, strike rates, team statistics, and Gully Cricket scorecards.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSwitchTab('sports-games')}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition self-start md:self-auto shrink-0"
          >
            <span>View All Sports Tools</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4 pt-4 border-t border-rose-900/60">
          {/* CricketHub Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>CricketHub — Tournament Scorer</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Live Match Scorer
                </span>
              </div>
              <p className="text-[11px] text-rose-100/80 mt-1 leading-snug">
                Official tournament live scorer with broadcast stats, strike rates, overs, extras & match results.
              </p>
              <div className="mt-2 text-[10.5px] font-mono text-rose-200 truncate">
                https://newgeneeducation.github.io/Crickethub/
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/10">
              <a
                href="https://newgeneeducation.github.io/Crickethub/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onLogRecent({ title: 'CricketHub — Tournament Scorer', url: 'https://newgeneeducation.github.io/Crickethub/' })}
                className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <span>Load External Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* GullyCricket Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>GullyCricket — Dual-Innings Scorecard</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-rose-400/20 text-rose-300 border border-rose-400/30">
                  Gully Engine
                </span>
              </div>
              <p className="text-[11px] text-rose-100/80 mt-1 leading-snug">
                Complete gully cricket dual innings scorecard, tabular score details, over logs & player stats.
              </p>
              <div className="mt-2 text-[10.5px] font-mono text-rose-200 truncate">
                https://newgeneeducation.github.io/GullyCricket/
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/10">
              <a
                href="https://newgeneeducation.github.io/GullyCricket/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onLogRecent({ title: 'GullyCricket — Dual-Innings Scorecard', url: 'https://newgeneeducation.github.io/GullyCricket/' })}
                className="w-full py-2.5 px-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <span>Load External Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Administration Categories */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Administration & Government Portals</h2>
          <p className="text-xs text-slate-500">
            Essential government, board, employee, student welfare, and administrative applications arranged for quick access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category 1: Board & Academic */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 border-l-4 border-l-indigo-600 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5 mb-3">
                <Landmark className="w-3.5 h-3.5 text-indigo-600" />
                <span>1. Board & Academic</span>
              </h3>
              <div className="space-y-2">
                <a
                  href="https://tgbie.cgg.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'TGBIE Official Portal', url: 'https://tgbie.cgg.gov.in/' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">TGBIE Official Portal</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Primary board announcements & notifications</p>
                </a>
                <a
                  href="https://udiseplus.gov.in/#/en/page/oldlink"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'UDISE+ Portal', url: 'https://udiseplus.gov.in/#/en/page/oldlink' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">UDISE+ Portal</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">National student data & APAAR reporting</p>
                </a>
                <a
                  href="https://acadtsbie.cgg.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'Academic Module', url: 'https://acadtsbie.cgg.gov.in/' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">Academic Module</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Curriculum & textbook guidelines</p>
                </a>
                <a
                  href="https://bietg.cgg.gov.in/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'Exam Bill Entry', url: 'https://bietg.cgg.gov.in/login' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">Exam Bill Entry</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Remuneration & center bill submission</p>
                </a>
              </div>
            </div>
          </div>

          {/* Category 2: Employee Services */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 border-l-4 border-l-blue-600 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5 mb-3">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>2. Employee & HRMS</span>
              </h3>
              <div className="space-y-2">
                <a
                  href="https://ie-hrms.telangana.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'Intermediate HRMS', url: 'https://ie-hrms.telangana.gov.in/' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">Intermediate HRMS</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Employee profile & leave management</p>
                </a>
                <a
                  href="https://ifmis.telangana.gov.in/login?forced#/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'IFMIS Salary Bills', url: 'https://ifmis.telangana.gov.in/login?forced#/home' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">IFMIS Salary Bills</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Government pay slips & DDO bills</p>
                </a>
                <a
                  href="https://transfers-ie.aptonline.in/CIE/Views/Login.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'General Transfers', url: 'https://transfers-ie.aptonline.in/CIE/Views/Login.aspx' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">General Transfers</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Junior Lecturer counseling & transfers</p>
                </a>
                <a
                  href="https://ifmis.telangana.gov.in/pension/#/pensionerinfopublic"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'Pensioners Info', url: 'https://ifmis.telangana.gov.in/pension/#/pensionerinfopublic' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">Pensioners Info</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Public pension lookup & PPO tracking</p>
                </a>
              </div>
            </div>
          </div>

          {/* Category 3: Communication */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 border-l-4 border-l-emerald-600 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-3">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>3. Communication</span>
              </h3>
              <div className="space-y-2">
                <a
                  href="https://web.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'WhatsApp Web', url: 'https://web.whatsapp.com/' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">WhatsApp Web</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Desktop messaging with staff & DIEO</p>
                </a>
                <a
                  href="https://zoom.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'Zoom Conference', url: 'https://zoom.us/' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">Zoom Conference</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Online review meetings & webinars</p>
                </a>
                <a
                  href="https://gmail.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'Gmail Workspace', url: 'https://gmail.com/' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">Gmail Workspace</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Official college inbox & mailings</p>
                </a>
              </div>
            </div>
          </div>

          {/* Category 4: Student Welfare */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 border-l-4 border-l-amber-600 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-3">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>4. Student Welfare</span>
              </h3>
              <div className="space-y-2">
                <a
                  href="https://telanganaepass.cgg.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'Telangana ePass', url: 'https://telanganaepass.cgg.gov.in/' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">Telangana ePass</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Post-matric scholarship portal</p>
                </a>
                <a
                  href="https://mis.tgsrtcpass.com/homepage.do"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'TGSRTC Bus Pass', url: 'https://mis.tgsrtcpass.com/homepage.do' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">TGSRTC Bus Pass</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Student concessional travel passes</p>
                </a>
                <a
                  href="https://goir.telangana.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: 'Telangana G.O.s', url: 'https://goir.telangana.gov.in/' })}
                  className="p-2 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition block"
                >
                  <p className="text-xs font-bold text-slate-900 leading-tight">Telangana G.O.s</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Official Government Orders repository</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Attachments Component for Dashboard */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">
              CUSTOM ATTACHMENTS & GOOGLE SHEETS
            </h3>
            <p className="text-[11px] text-slate-500">
              Files and links saved to Dashboard Hub
            </p>
          </div>
          <button
            onClick={() => onOpenAttachmentModal('dashboard')}
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
                  <span className="text-[9.5px] font-bold text-indigo-600 uppercase block mb-0.5">
                    {att.category || 'LOCAL FILE'}
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
            No custom attachments saved on Dashboard yet. Click "+ Add File / Link" to attach local spreadsheets or files.
          </div>
        )}
      </div>
    </div>
  );
};
