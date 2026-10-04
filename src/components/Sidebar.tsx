import React, { useState } from 'react';
import {
  GraduationCap,
  LayoutGrid,
  IdCard,
  FileSignature,
  ChevronDown,
  BarChart2,
  FileCode,
  Activity,
  Info,
  Shield,
  Lock,
  Plus,
  ExternalLink,
  Youtube,
  X,
} from 'lucide-react';
import { TabType, RecentItem } from '../types';

interface SidebarProps {
  currentTab: TabType;
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
  onOpenPinSettings: () => void;
  onLockApp: () => void;
  onOpenAttachmentModal: () => void;
  recentItems: RecentItem[];
  onOpenRecentItem: (item: RecentItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  isOpen,
  onClose,
  onSelectTab,
  onOpenPinSettings,
  onLockApp,
  onOpenAttachmentModal,
  recentItems,
  onOpenRecentItem,
}) => {
  const [examSubmenuOpen, setExamSubmenuOpen] = useState<boolean>(
    currentTab === 'exam-pre' || currentTab === 'exam-during' || currentTab === 'exam-post'
  );

  const isExamActive =
    currentTab === 'exam-pre' || currentTab === 'exam-during' || currentTab === 'exam-post';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-900 transition-transform duration-200 ease-in-out md:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-3.5 border-b border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs font-bold text-white tracking-tight leading-tight">
                NewGen <span className="text-red-500">e</span>Education
              </h1>
              <p className="text-[10px] text-indigo-400 font-medium">IE Utility Hub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Badge Pill */}
        <div className="px-3 py-2 mx-2.5 my-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-950 text-emerald-400 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-tight">PIN Protected</p>
              <p className="text-[9.5px] text-slate-400 font-mono">Offline Security</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenPinSettings}
            className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 hover:bg-indigo-900 transition"
          >
            Manage
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1 text-xs">
          {/* Dashboard */}
          <button
            onClick={() => {
              onSelectTab('dashboard');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition ${
              currentTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-sm glow-active'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-indigo-400">
                <LayoutGrid className="w-3.5 h-3.5" />
              </div>
              <span>Dashboard Hub</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Home</span>
          </button>

          {/* Admissions */}
          <button
            onClick={() => {
              onSelectTab('admissions');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition ${
              currentTab === 'admissions'
                ? 'bg-indigo-600 text-white shadow-sm glow-active'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald-950/60 flex items-center justify-center text-emerald-400">
                <IdCard className="w-3.5 h-3.5" />
              </div>
              <span>Admissions</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">UDISE+</span>
          </button>

          {/* Examinations with Submenu */}
          <div>
            <button
              onClick={() => setExamSubmenuOpen(!examSubmenuOpen)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition ${
                isExamActive
                  ? 'bg-slate-900 text-amber-300'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-amber-950/60 flex items-center justify-center text-amber-400">
                  <FileSignature className="w-3.5 h-3.5" />
                </div>
                <span>Examinations</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  examSubmenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {examSubmenuOpen && (
              <div className="pl-6 pt-1 space-y-1">
                <button
                  onClick={() => {
                    onSelectTab('exam-pre');
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                    currentTab === 'exam-pre'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  Pre-Exam (Letters)
                </button>
                <button
                  onClick={() => {
                    onSelectTab('exam-during');
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                    currentTab === 'exam-during'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  During Exam & Registers
                </button>
                <button
                  onClick={() => {
                    onSelectTab('exam-post');
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-semibold transition ${
                    currentTab === 'exam-post'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  Post Exam & Relieving
                </button>
              </div>
            )}
          </div>

          {/* Results & Analytics */}
          <button
            onClick={() => {
              onSelectTab('results');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition ${
              currentTab === 'results'
                ? 'bg-indigo-600 text-white shadow-sm glow-active'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-sky-950/60 flex items-center justify-center text-sky-400">
                <BarChart2 className="w-3.5 h-3.5" />
              </div>
              <span>Results & Analytics</span>
            </div>
            <span className="text-[10px] text-sky-400 font-mono">IPE</span>
          </button>

          {/* Converters */}
          <button
            onClick={() => {
              onSelectTab('converters');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition ${
              currentTab === 'converters'
                ? 'bg-indigo-600 text-white shadow-sm glow-active'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-fuchsia-950/60 flex items-center justify-center text-fuchsia-400">
                <FileCode className="w-3.5 h-3.5" />
              </div>
              <span>File Converters</span>
            </div>
            <span className="text-[10px] text-fuchsia-400 font-mono">Tools</span>
          </button>

          {/* Sports */}
          <button
            onClick={() => {
              onSelectTab('sports-games');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition ${
              currentTab === 'sports-games'
                ? 'bg-indigo-600 text-white shadow-sm glow-active'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-rose-950/60 flex items-center justify-center text-rose-400">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <span>Sports & Recreation</span>
            </div>
            <span className="text-[10px] text-rose-400 font-mono">Cricket</span>
          </button>

          {/* About Us */}
          <button
            onClick={() => {
              onSelectTab('about');
              onClose();
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition ${
              currentTab === 'about'
                ? 'bg-indigo-600 text-white shadow-sm glow-active'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-slate-300">
              <Info className="w-3.5 h-3.5" />
            </div>
            <span>About Us</span>
          </button>

          {/* Security PIN Settings */}
          <button
            onClick={() => {
              onOpenPinSettings();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-indigo-950/60 flex items-center justify-center text-indigo-400">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span>PIN & Security</span>
            </div>
            <span className="text-[10px] text-indigo-400 font-mono">Settings</span>
          </button>

          {/* Lock App Screen */}
          <button
            onClick={() => {
              onLockApp();
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold text-amber-400 hover:text-amber-300 hover:bg-amber-950/30 transition"
          >
            <div className="w-6 h-6 rounded-md bg-amber-950/60 flex items-center justify-center text-amber-400">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span>Lock Screen Now</span>
          </button>

          {/* Recent Opened Items Drawer */}
          <div className="pt-3 border-t border-slate-900 mt-2">
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Recent Opened
              </span>
              <button
                onClick={onOpenAttachmentModal}
                className="text-indigo-400 hover:text-indigo-300 p-0.5"
                title="Add Attachment"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              {recentItems.length > 0 ? (
                recentItems.slice(0, 6).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => onOpenRecentItem(item)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-900 text-slate-300 text-[11px] transition text-left"
                  >
                    <span className="truncate max-w-[170px]">{item.title}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-indigo-400 shrink-0 ml-1" />
                  </button>
                ))
              ) : (
                <p className="text-[10px] text-slate-600 px-2 py-1">No recent items logged.</p>
              )}
            </div>
          </div>
        </div>

        {/* YouTube Channel Promo Box */}
        <div className="p-2.5 border-t border-slate-900 bg-slate-950/80">
          <a
            href="https://youtube.com/@gudurusathishkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-xl bg-red-950/30 border border-red-900/50 hover:bg-red-950/50 transition group"
          >
            <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Youtube className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-white truncate leading-tight group-hover:text-red-300 transition">
                YouTube Channel
              </p>
              <p className="text-[9px] text-red-400 truncate">@gudurusathishkumar</p>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
};
