import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TabType, CustomAttachment, RecentItem } from './types';
import {
  getAllStoredLinks,
  saveAllStoredLinks,
  getLocalFileBlob,
  deleteLocalFileBlob,
  getRecentOpenedList,
  logRecentOpened,
} from './utils/indexedDB';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PinLockModal } from './components/PinLockModal';
import { PinSettingsModal } from './components/PinSettingsModal';
import { CustomAttachmentModal } from './components/CustomAttachmentModal';

// Interactive Tools
import { PreExamLettersTool } from './components/tools/PreExamLettersTool';
import { ExamIdCardsTool } from './components/tools/ExamIdCardsTool';
import { SeatingArrangementTool } from './components/tools/SeatingArrangementTool';
import { LocalExamSeatingTool } from './components/tools/LocalExamSeatingTool';
import { QpAccountRegisterTool } from './components/tools/QpAccountRegisterTool';
import { StatutoryRegistersTool } from './components/tools/StatutoryRegistersTool';
import { RemunerationBillTool } from './components/tools/RemunerationBillTool';
import { PostExamRelievingTool } from './components/tools/PostExamRelievingTool';
import { ResultsAnalyticsTool } from './components/tools/ResultsAnalyticsTool';
import { ImageCompressorTool } from './components/tools/ImageCompressorTool';
import { AdmissionsSummaryTool } from './components/tools/AdmissionsSummaryTool';

// Tabs
import { DashboardTab } from './components/tabs/DashboardTab';
import { AdmissionsTab } from './components/tabs/AdmissionsTab';
import { ExamPreTab } from './components/tabs/ExamPreTab';
import { ExamDuringTab } from './components/tabs/ExamDuringTab';
import { ExamPostTab } from './components/tabs/ExamPostTab';
import { ResultsTab } from './components/tabs/ResultsTab';
import { ConvertersTab } from './components/tabs/ConvertersTab';
import { SportsTab } from './components/tabs/SportsTab';
import { AboutTab } from './components/tabs/AboutTab';

const IDLE_TIMEOUT_MS = 180000; // 3 minutes idle lock

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [activeToolTitle, setActiveToolTitle] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // PIN Security State
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [pinSettingsOpen, setPinSettingsOpen] = useState<boolean>(false);

  // Custom Attachments & Links State
  const [allAttachments, setAllAttachments] = useState<Record<TabType, CustomAttachment[]>>({
    dashboard: [],
    admissions: [],
    'exam-pre': [],
    'exam-during': [],
    'exam-post': [],
    results: [],
    converters: [],
    'sports-games': [],
    about: [],
  });
  const [attachmentModalOpen, setAttachmentModalOpen] = useState<boolean>(false);
  const [attachmentModalTab, setAttachmentModalTab] = useState<TabType>('dashboard');

  // Recent Items
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load attachments & recents on initial render
  useEffect(() => {
    setAllAttachments(getAllStoredLinks());
    setRecentItems(getRecentOpenedList());
  }, []);

  // Idle timer reset
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      setIsLocked(true);
    }, IDLE_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    const handleActivity = () => {
      if (!isLocked) {
        resetIdleTimer();
      }
    };

    events.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));
    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((ev) => window.removeEventListener(ev, handleActivity));
    };
  }, [isLocked, resetIdleTimer]);

  const handleUnlock = () => {
    setIsLocked(false);
    resetIdleTimer();
  };

  const handleLockNow = () => {
    setIsLocked(true);
  };

  const handleLaunchTool = (toolId: string, title: string) => {
    setActiveToolId(toolId);
    setActiveToolTitle(title);
    const updated = logRecentOpened({
      title,
      toolId,
      tab: currentTab,
    });
    setRecentItems(updated);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromTool = () => {
    setActiveToolId(null);
    setActiveToolTitle('');
  };

  const handleOpenAttachmentModal = (tab?: TabType) => {
    setAttachmentModalTab(tab || currentTab);
    setAttachmentModalOpen(true);
  };

  const handleRefreshAttachments = () => {
    setAllAttachments(getAllStoredLinks());
  };

  const handleDeleteAttachment = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this attachment?')) return;
    await deleteLocalFileBlob(id);
    const current = { ...allAttachments };
    Object.keys(current).forEach((key) => {
      const t = key as TabType;
      current[t] = current[t].filter((att) => att.id !== id);
    });
    setAllAttachments(current);
    saveAllStoredLinks(current);
  };

  const handleOpenAttachment = async (att: CustomAttachment) => {
    const updated = logRecentOpened({
      title: att.title,
      url: att.url,
      id: att.id,
      tab: att.tab,
      isLocal: att.url.startsWith('local://'),
    });
    setRecentItems(updated);

    if (att.url.startsWith('local://')) {
      try {
        const stored = await getLocalFileBlob(att.id);
        if (!stored || !stored.blob) {
          alert('Local file not found in browser storage.');
          return;
        }
        const objUrl = URL.createObjectURL(stored.blob);
        const a = document.createElement('a');
        a.href = objUrl;
        a.download = stored.name || att.title;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(objUrl), 60000);
      } catch (err) {
        console.error(err);
        alert('Could not open local file.');
      }
    } else {
      window.open(att.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenRecent = (item: RecentItem) => {
    if (item.toolId) {
      handleLaunchTool(item.toolId, item.title);
    } else if (item.url && item.url !== '#') {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.tab) {
      setCurrentTab(item.tab);
    }
  };

  const handleLogRecent = (item: Omit<RecentItem, 'timestamp'>) => {
    const updated = logRecentOpened(item);
    setRecentItems(updated);
  };

  // Search handler
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    const query = q.toLowerCase().trim();
    if (!query) return;

    if (query.includes('cricket') || query.includes('sport') || query.includes('score')) {
      setCurrentTab('sports-games');
      setActiveToolId(null);
    } else if (query.includes('result') || query.includes('mark') || query.includes('topper')) {
      setCurrentTab('results');
      setActiveToolId(null);
    } else if (query.includes('admit') || query.includes('admission') || query.includes('apaar') || query.includes('udise')) {
      setCurrentTab('admissions');
      setActiveToolId(null);
    } else if (query.includes('convert') || query.includes('pdf') || query.includes('compress') || query.includes('photo')) {
      setCurrentTab('converters');
      setActiveToolId(null);
    } else if (query.includes('letter') || query.includes('police') || query.includes('mro') || query.includes('sho') || query.includes('bandobast')) {
      setCurrentTab('exam-pre');
      setActiveToolId(null);
    } else if (query.includes('local seat') || query.includes('internal exam') || query.includes('unit test')) {
      setCurrentTab('exam-pre');
      handleLaunchTool('local_seating', 'Local Exam Seating Plan');
    } else if (query.includes('seat') || query.includes('room') || query.includes('bench')) {
      setCurrentTab('exam-pre');
      handleLaunchTool('seating_arrangements', 'Seating Arrangements');
    } else if (query.includes('qp') || query.includes('question paper') || query.includes('stock register')) {
      setCurrentTab('exam-during');
      handleLaunchTool('qp_account_register', 'TGBIE Q.P. Account Registers Generator');
    } else if (query.includes('annexure') || query.includes('custody') || query.includes('remuneration') || query.includes('bill')) {
      setCurrentTab('exam-during');
      setActiveToolId(null);
    } else if (query.includes('reliev') || query.includes('post material') || query.includes('spot')) {
      setCurrentTab('exam-post');
      setActiveToolId(null);
    }
  };

  // Render current tool view if active
  const renderActiveTool = () => {
    if (!activeToolId) return null;

    if (activeToolId === 'pre_letters' || activeToolId === 'authorized_person') {
      const type = activeToolId === 'authorized_person' ? 'authorization' : 'letters';
      return <PreExamLettersTool initialType={type} onBack={handleBackFromTool} />;
    }
    if (activeToolId === 'exam_id_cards') {
      return <ExamIdCardsTool onBack={handleBackFromTool} />;
    }
    if (activeToolId === 'seating_arrangements') {
      return <SeatingArrangementTool onBack={handleBackFromTool} />;
    }
    if (
      activeToolId === 'local_seating' ||
      activeToolId === 'local_exam_seating' ||
      activeToolId === 'local_seating_simple' ||
      activeToolId === 'local_seating_comprehensive'
    ) {
      const initEngine = activeToolId === 'local_seating_comprehensive' ? 'comprehensive' : 'simple';
      return <LocalExamSeatingTool initialEngine={initEngine} onBack={handleBackFromTool} />;
    }
    if (
      activeToolId === 'qp_account_register' ||
      activeToolId === 'qp_register' ||
      activeToolId === 'qp_account' ||
      activeToolId === 'qp_generator'
    ) {
      return <StatutoryRegistersTool initialRegister="qp_account" onBack={handleBackFromTool} />;
    }
    if (
      activeToolId === 'annexure' ||
      activeToolId === 'annexure_registers' ||
      activeToolId === 'do_qp' ||
      activeToolId === 'do_qp_account' ||
      activeToolId === 'invigilator' ||
      activeToolId === 'invigilators_register' ||
      activeToolId === 'movement' ||
      activeToolId === 'candidate_movement' ||
      activeToolId === 'blank_barcode' ||
      activeToolId === 'bundle_slips' ||
      activeToolId === 'official_slips' ||
      activeToolId === 'room_allotment' ||
      activeToolId === 'room_wise_allotment' ||
      activeToolId === 'errata_notices' ||
      activeToolId === 'errata' ||
      activeToolId === 'errata_basic' ||
      activeToolId === 'errata_detailed' ||
      activeToolId === 'consolidated' ||
      activeToolId === 'consolidated_absentees' ||
      activeToolId === 'post_office' ||
      activeToolId === 'post_office_dispatch' ||
      activeToolId === 'post_office_absentees' ||
      activeToolId === 'tada_bill' ||
      activeToolId === 'tada' ||
      activeToolId === 'workdone_statement' ||
      activeToolId === 'workdone' ||
      activeToolId === 'local_conveyance' ||
      activeToolId === 'conveyance' ||
      activeToolId === 'malpractice_cases' ||
      activeToolId === 'malpractice' ||
      activeToolId === 'other_slips' ||
      activeToolId === 'part1_omr'
    ) {
      return <StatutoryRegistersTool initialRegister={activeToolId} onBack={handleBackFromTool} />;
    }
    if (activeToolId === 'remuneration' || activeToolId === 'tada_remuneration') {
      return <RemunerationBillTool onBack={handleBackFromTool} />;
    }
    if (
      activeToolId === 'post_exam' ||
      activeToolId === 'post_material' ||
      activeToolId === 'relieving_certificate' ||
      activeToolId === 'spot_valuation_relieving' ||
      activeToolId === 'transportation_certificate'
    ) {
      let sub = 'relieving';
      if (activeToolId === 'post_material') sub = 'post_material';
      else if (activeToolId === 'spot_valuation_relieving') sub = 'spot_valuation';
      else if (activeToolId === 'transportation_certificate') sub = 'transport';

      return <PostExamRelievingTool initialType={sub} onBack={handleBackFromTool} />;
    }
    if (
      activeToolId === 'results_analytics' ||
      activeToolId === 'results_1st' ||
      activeToolId === 'results_2nd' ||
      activeToolId === 'results_final'
    ) {
      let yr: '1st' | '2nd' | 'final' = '1st';
      if (activeToolId === 'results_2nd') yr = '2nd';
      else if (activeToolId === 'results_final') yr = 'final';

      return <ResultsAnalyticsTool initialYear={yr} onBack={handleBackFromTool} />;
    }
    if (activeToolId === 'img_compressor') {
      return <ImageCompressorTool onBack={handleBackFromTool} />;
    }
    if (activeToolId === 'attendance' || activeToolId === 'tgbie_adm' || activeToolId === 'udise') {
      return <AdmissionsSummaryTool initialType={activeToolId} onBack={handleBackFromTool} />;
    }

    return null;
  };

  // Render tab content
  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardTab
            onSwitchTab={(t) => {
              setCurrentTab(t);
              setActiveToolId(null);
            }}
            onLaunchTool={handleLaunchTool}
            onOpenAttachmentModal={handleOpenAttachmentModal}
            onLogRecent={handleLogRecent}
            attachments={allAttachments.dashboard || []}
            onDeleteAttachment={handleDeleteAttachment}
            onOpenAttachment={handleOpenAttachment}
          />
        );
      case 'admissions':
        return (
          <AdmissionsTab
            onLaunchTool={handleLaunchTool}
            onOpenAttachmentModal={handleOpenAttachmentModal}
            onLogRecent={handleLogRecent}
            attachments={allAttachments.admissions || []}
            onDeleteAttachment={handleDeleteAttachment}
            onOpenAttachment={handleOpenAttachment}
          />
        );
      case 'exam-pre':
        return (
          <ExamPreTab
            onLaunchTool={handleLaunchTool}
            onOpenAttachmentModal={handleOpenAttachmentModal}
            attachments={allAttachments['exam-pre'] || []}
            onDeleteAttachment={handleDeleteAttachment}
            onOpenAttachment={handleOpenAttachment}
          />
        );
      case 'exam-during':
        return (
          <ExamDuringTab
            onLaunchTool={handleLaunchTool}
            onOpenAttachmentModal={handleOpenAttachmentModal}
            attachments={allAttachments['exam-during'] || []}
            onDeleteAttachment={handleDeleteAttachment}
            onOpenAttachment={handleOpenAttachment}
          />
        );
      case 'exam-post':
        return (
          <ExamPostTab
            onLaunchTool={handleLaunchTool}
            onOpenAttachmentModal={handleOpenAttachmentModal}
            attachments={allAttachments['exam-post'] || []}
            onDeleteAttachment={handleDeleteAttachment}
            onOpenAttachment={handleOpenAttachment}
          />
        );
      case 'results':
        return (
          <ResultsTab
            onLaunchTool={handleLaunchTool}
            onOpenAttachmentModal={handleOpenAttachmentModal}
            attachments={allAttachments.results || []}
            onDeleteAttachment={handleDeleteAttachment}
            onOpenAttachment={handleOpenAttachment}
          />
        );
      case 'converters':
        return (
          <ConvertersTab
            onLaunchTool={handleLaunchTool}
            onOpenAttachmentModal={handleOpenAttachmentModal}
            onLogRecent={handleLogRecent}
            attachments={allAttachments.converters || []}
            onDeleteAttachment={handleDeleteAttachment}
            onOpenAttachment={handleOpenAttachment}
          />
        );
      case 'sports-games':
        return (
          <SportsTab
            onLaunchTool={handleLaunchTool}
            onOpenAttachmentModal={handleOpenAttachmentModal}
            onLogRecent={handleLogRecent}
            attachments={allAttachments['sports-games'] || []}
            onDeleteAttachment={handleDeleteAttachment}
            onOpenAttachment={handleOpenAttachment}
          />
        );
      case 'about':
        return <AboutTab />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-slate-50 text-slate-900 flex flex-col md:flex-row antialiased w-full ${activeToolId ? 'h-screen h-[100dvh] overflow-hidden' : 'min-h-screen'}`}>
      {/* 4-Digit PIN Security Lock Modal */}
      <PinLockModal
        isOpen={isLocked}
        onUnlock={handleUnlock}
        onOpenSettings={() => setPinSettingsOpen(true)}
      />

      {/* Security PIN & Master Key Settings Modal */}
      <PinSettingsModal
        isOpen={pinSettingsOpen}
        onClose={() => setPinSettingsOpen(false)}
      />

      {/* Custom Attachment & Link Modal */}
      <CustomAttachmentModal
        isOpen={attachmentModalOpen}
        initialTab={attachmentModalTab}
        onClose={() => setAttachmentModalOpen(false)}
        onSaved={handleRefreshAttachments}
      />

      {/* Main Sidebar */}
      <Sidebar
        currentTab={currentTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setActiveToolId(null);
        }}
        onOpenPinSettings={() => setPinSettingsOpen(true)}
        onLockApp={handleLockNow}
        onOpenAttachmentModal={handleOpenAttachmentModal}
        recentItems={recentItems}
        onOpenRecentItem={handleOpenRecent}
      />

      {/* Main Content Viewport */}
      <div className={`flex-1 flex flex-col min-w-0 ${activeToolId ? 'h-full h-[100dvh] overflow-hidden' : 'min-h-screen overflow-y-auto'}`}>
        <Header
          currentTab={currentTab}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenAttachmentModal={() => handleOpenAttachmentModal(currentTab)}
          onLockApp={handleLockNow}
          onOpenPinSettings={() => setPinSettingsOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />

        <main className={`flex-1 ${activeToolId ? 'p-1.5 md:p-3 flex flex-col min-h-0 h-full overflow-hidden' : 'p-4 md:p-6'} max-w-full xl:max-w-7xl w-full mx-auto`}>
          {activeToolId ? renderActiveTool() : renderTabContent()}
        </main>
      </div>
    </div>
  );
}
