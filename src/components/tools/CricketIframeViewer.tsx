import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  RotateCw,
  Trophy,
  Activity,
  Globe,
  Loader2,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

interface CricketIframeViewerProps {
  initialApp?: 'crickethub' | 'gullycricket';
  onBack: () => void;
}

export const CricketIframeViewer: React.FC<CricketIframeViewerProps> = ({
  initialApp = 'crickethub',
  onBack,
}) => {
  const [selectedApp, setSelectedApp] = useState<'crickethub' | 'gullycricket'>(initialApp);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const apps = {
    crickethub: {
      id: 'crickethub',
      title: 'CricketHub — Tournament Scorer',
      badge: 'Live Match Scorer',
      url: 'https://newgeneeducation.github.io/Crickethub/',
      color: 'from-amber-600 to-amber-700',
      icon: Trophy,
      desc: 'Official NewGen online tournament scorer with live graphics, strike rates & match summaries.',
    },
    gullycricket: {
      id: 'gullycricket',
      title: 'GullyCricket — Dual-Innings Scorecard',
      badge: 'Gully Style Scorer',
      url: 'https://newgeneeducation.github.io/GullyCricket/',
      color: 'from-rose-600 to-rose-700',
      icon: Activity,
      desc: 'Official NewGen Gully Cricket scoring engine with full tabular scorecards & player stats.',
    },
  };

  const currentApp = apps[selectedApp];

  const handleRefresh = () => {
    setIsLoading(true);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col overflow-hidden transition-all duration-200 flex-1 h-full min-h-0 w-full"
    >
      {/* Top Controls Toolbar */}
      <div className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          {/* App Switcher Tabs */}
          <div className="flex items-center bg-slate-800/90 p-0.5 rounded-xl border border-slate-700">
            <button
              onClick={() => {
                if (selectedApp !== 'crickethub') {
                  setSelectedApp('crickethub');
                  setIsLoading(true);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                selectedApp === 'crickethub'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>CricketHub</span>
            </button>

            <button
              onClick={() => {
                if (selectedApp !== 'gullycricket') {
                  setSelectedApp('gullycricket');
                  setIsLoading(true);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                selectedApp === 'gullycricket'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>GullyCricket</span>
            </button>
          </div>
        </div>

        {/* URL Pill & Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-lg text-[11px] font-mono text-slate-300 border border-slate-700 max-w-xs truncate">
            <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{currentApp.url}</span>
            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
          </div>

          {/* Reload iframe */}
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Reload Iframe"
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          {/* Open in New Window */}
          <button
            onClick={() => window.open(currentApp.url, '_blank')}
            className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            title="Open Scorer in New Window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Open New Window</span>
          </button>
        </div>
      </div>

      {/* Embedded Iframe Container */}
      <div className="relative flex-1 min-h-[calc(100dvh-175px)] sm:min-h-0 bg-slate-100 overflow-hidden">
        {/* Loading Spinner Indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-900/40 backdrop-blur-xs flex flex-col items-center justify-center text-white pointer-events-none transition-opacity">
            <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-2xl">
              <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
              <div>
                <p className="text-xs font-bold text-white">{currentApp.title}</p>
                <p className="text-[10px] text-slate-400 font-mono">Loading iframe securely...</p>
              </div>
            </div>
          </div>
        )}

        <iframe
          key={`${selectedApp}-${refreshKey}`}
          ref={iframeRef}
          src={currentApp.url}
          title={currentApp.title}
          onLoad={() => setIsLoading(false)}
          className="absolute inset-0 w-full h-full border-0 block"
          allow="fullscreen; clipboard-read; clipboard-write;"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
        />
      </div>
    </div>
  );
};
