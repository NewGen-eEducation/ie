import React, { useState, useRef } from 'react';
import { ArrowLeft, Printer, RotateCcw, LayoutGrid, FileSpreadsheet, ExternalLink } from 'lucide-react';

interface LocalExamSeatingToolProps {
  onBack: () => void;
  initialEngine?: 'simple' | 'comprehensive';
}

export const LocalExamSeatingTool: React.FC<LocalExamSeatingToolProps> = ({
  onBack,
  initialEngine = 'simple',
}) => {
  const [activeEngine, setActiveEngine] = useState<'simple' | 'comprehensive'>(initialEngine);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeUrl =
    activeEngine === 'simple'
      ? '/local-exam-seating-simple.html'
      : '/local-exam-seating-comprehensive.html';

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = activeUrl;
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 w-full">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-white border border-slate-200 rounded-xl mb-2.5 shadow-xs no-print shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition"
            title="Back to Pre-Exam Hub"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              Local Exam Seating Planning (Internal Exams)
            </h2>
            <p className="text-[10px] text-slate-500 hidden sm:block">
              Unit Tests, Quarterly, Half-Yearly & Pre-Final seating engines with attendance registers
            </p>
          </div>
        </div>

        {/* Engine Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveEngine('simple')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
              activeEngine === 'simple'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Room-Wise Layout</span>
          </button>
          <button
            onClick={() => setActiveEngine('comprehensive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
              activeEngine === 'comprehensive'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Attendance & Reports</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            title="Print Current Seating Plan"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Document</span>
          </button>

          <button
            onClick={() => window.open(activeUrl, '_blank')}
            className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            title="Open in New Window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Open New Window</span>
          </button>

          <button
            onClick={handleReload}
            className="p-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-100 transition"
            title="Reload Seating Tool"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Local HTML IFrame container - Full Height Screen Fit */}
      <div className="flex-1 min-h-[calc(100dvh-175px)] sm:min-h-0 w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs relative">
        <iframe
          ref={iframeRef}
          key={activeEngine}
          src={activeUrl}
          title={
            activeEngine === 'simple'
              ? 'Room Wise Seating Arrangement for Examinations'
              : 'Examination Seating & Attendance Arrangement'
          }
          className="absolute inset-0 w-full h-full border-0 block"
        />
      </div>
    </div>
  );
};
