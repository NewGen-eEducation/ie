import React from 'react';
import {
  FileText,
  Scissors,
  Minimize2,
  Image as ImageIcon,
  ArrowLeftRight,
  Heart,
  ExternalLink,
  Paperclip,
  Trash2,
  Wrench
} from 'lucide-react';
import { TabType, CustomAttachment, RecentItem } from '../../types';

interface ConvertersTabProps {
  onLaunchTool: (toolId: string, title: string) => void;
  onOpenAttachmentModal: (tab?: TabType) => void;
  onLogRecent: (item: Omit<RecentItem, 'timestamp'>) => void;
  attachments: CustomAttachment[];
  onDeleteAttachment: (id: string) => void;
  onOpenAttachment: (att: CustomAttachment) => void;
}

export const ConvertersTab: React.FC<ConvertersTabProps> = ({
  onLaunchTool,
  onOpenAttachmentModal,
  onLogRecent,
  attachments,
  onDeleteAttachment,
  onOpenAttachment,
}) => {
  const tools = [
    {
      id: 'photo_compressor',
      title: 'Photo Compressor',
      desc: 'Compress photos to below 200KB, 100KB, 50KB or 20KB quickly without losing quality. Developed by Guduru Sathish Kumar.',
      badge: 'Local Tool',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: ImageIcon,
      url: '/photo-compressor.html',
      isExternal: true,
      actionText: 'Open in New Window',
    },
    {
      id: 'merge_pdf',
      title: 'Merge PDF Documents',
      desc: 'Combine multiple examination orders, hall tickets, or circulars with drag-and-drop ordering directly in browser.',
      badge: 'Local Tool',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: FileText,
      url: '/merge-pdf.html',
      isExternal: true,
      actionText: 'Open in New Window',
    },
    {
      id: 'split_pdf',
      title: 'Split PDF Pages',
      desc: 'Split PDF into multiple files by specifying page ranges (e.g. 1-3, 4-6) directly in browser securely.',
      badge: 'Local Tool',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Scissors,
      url: '/split-pdf.html',
      isExternal: true,
      actionText: 'Open in New Window',
    },
    {
      id: 'compress_pdf',
      title: 'Compress PDF Files',
      desc: 'Reduce PDF file size from 500KB up to 50MB targets while maintaining clean document quality.',
      badge: 'Local Tool',
      badgeBg: 'bg-red-50 text-red-700 border-red-200',
      icon: Minimize2,
      url: '/pdf-compressor.html',
      isExternal: true,
      actionText: 'Open in New Window',
    },
    {
      id: 'pdf_converter',
      title: 'PDF ↔ JPG / PNG Converter',
      desc: 'Convert PDF pages into high-resolution JPG/PNG images, or combine JPG/PNG images into a PDF file.',
      badge: 'Local Tool',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: ArrowLeftRight,
      url: '/pdf-converter.html',
      isExternal: true,
      actionText: 'Open in New Window',
    },
    {
      id: 'img_compressor',
      title: 'Built-in Image Compressor',
      desc: 'Quick embedded image compressor for passport photos & signatures (≤ 50 KB / ≤ 100 KB).',
      badge: 'In-App Tool',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: ImageIcon,
      isExternal: false,
      actionText: 'Launch In-App Tool',
    },
    {
      id: 'ilovepdf_suite',
      title: 'iLovePDF Complete Suite',
      desc: 'External cloud suite for advanced PDF OCR, page numbering, watermark removal, and PDF repair.',
      badge: 'Cloud Suite',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Heart,
      url: 'https://www.ilovepdf.com',
      isExternal: true,
      actionText: 'Open Cloud Suite',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Wrench className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            PDF & IMAGE CONVERSION TOOLS
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          High-performance in-browser passport photo resizing and official portal compression tools.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {tools.map((t) => {
            const Icon = t.icon;
            if (t.isExternal && t.url) {
              return (
                <a
                  key={t.id}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLogRecent({ title: t.title, url: t.url })}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-400 hover:shadow-xs transition flex flex-col justify-between group block text-inherit no-underline"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${t.badgeBg}`}>
                        {t.badge}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                      {t.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-indigo-600">
                    <span>{t.actionText || (t.url?.startsWith('http') ? 'Launch Cloud Tool' : 'Open in New Window')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              );
            }

            return (
              <div
                key={t.id}
                onClick={() => onLaunchTool(t.id, t.title)}
                className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/20 hover:bg-white hover:border-indigo-500 hover:shadow-xs transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center group-hover:scale-105 transition shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${t.badgeBg}`}>
                      {t.badge}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                    {t.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-indigo-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Open Local Compressor</span>
                  <span>&rarr;</span>
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
              CONVERTER ATTACHMENTS & UTILITIES
            </h3>
            <p className="text-[11px] text-slate-500">
              Attached document conversion links and templates
            </p>
          </div>
          <button
            onClick={() => onOpenAttachmentModal('converters')}
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
                  <span className="text-[9.5px] font-bold text-fuchsia-700 uppercase block mb-0.5">
                    {att.category || 'CONVERTER'}
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
            No custom converter attachments saved yet.
          </div>
        )}
      </div>
    </div>
  );
};
