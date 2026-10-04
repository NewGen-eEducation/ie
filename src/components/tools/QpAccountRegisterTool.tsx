import React, { useRef } from 'react';
import { ArrowLeft, Printer, RotateCcw, ExternalLink } from 'lucide-react';

interface QpAccountRegisterToolProps {
  onBack: () => void;
}

export const QpAccountRegisterTool: React.FC<QpAccountRegisterToolProps> = ({ onBack }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = '/qp-account-register.html';
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 w-full">
      {/* Top Controls Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-xl mb-2.5 shadow-xs no-print shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 transition"
            title="Back to Exam Hub"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              TGBIE Q.P. Account Registers Generator (C.S. & D.O.)
            </h2>
            <p className="text-[10px] text-slate-500 hidden sm:block">
              Full Q.P. Account Register (Cols 1-16) & Stock / Withdrawal Register (Cols 1-7)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            title="Print Current Register"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Register</span>
          </button>

          <button
            onClick={() => window.open('/qp-account-register.html', '_blank')}
            className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            title="Open in New Window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Open New Window</span>
          </button>

          <button
            onClick={handleReload}
            className="p-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-100 transition"
            title="Reload Q.P. Tool"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Local HTML IFrame container - Full Height Screen Fit */}
      <div className="flex-1 min-h-[calc(100dvh-175px)] sm:min-h-0 w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs relative">
        <iframe
          ref={iframeRef}
          src="/qp-account-register.html"
          title="TGBIE Q.P. Registers Generator"
          className="absolute inset-0 w-full h-full border-0 block"
        />
      </div>
    </div>
  );
};
