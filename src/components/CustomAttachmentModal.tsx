import React, { useState, useEffect } from 'react';
import { X, Upload, Globe, FileText, Check } from 'lucide-react';
import { TabType, CustomAttachment } from '../types';
import { storeLocalFileBlob, getAllStoredLinks, saveAllStoredLinks } from '../utils/indexedDB';

interface CustomAttachmentModalProps {
  isOpen: boolean;
  initialTab?: TabType;
  onClose: () => void;
  onSaved: () => void;
}

export const CustomAttachmentModal: React.FC<CustomAttachmentModalProps> = ({
  isOpen,
  initialTab = 'dashboard',
  onClose,
  onSaved,
}) => {
  const [mode, setMode] = useState<'local' | 'web'>('local');
  const [targetTab, setTargetTab] = useState<TabType>(initialTab);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [webUrl, setWebUrl] = useState<string>('');
  const [category, setCategory] = useState<string>('LOCAL FILE');
  const [desc, setDesc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setTargetTab(initialTab);
      setSelectedFile(null);
      setTitle('');
      setWebUrl('');
      setCategory(mode === 'local' ? 'LOCAL FILE' : 'GOOGLE SHEET');
      setDesc('');
      setError('');
    }
  }, [isOpen, initialTab, mode]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const id = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const allLinks = getAllStoredLinks();
      const currentList = allLinks[targetTab] || [];

      let finalUrl = webUrl.trim();
      let fName = '';
      let fSize = 0;
      let fType = '';

      if (mode === 'local') {
        if (!selectedFile) {
          setError('Please select a file to upload.');
          setLoading(false);
          return;
        }
        await storeLocalFileBlob({
          id,
          name: selectedFile.name,
          blob: selectedFile,
          type: selectedFile.type || 'application/octet-stream',
        });
        finalUrl = `local://${selectedFile.name}`;
        fName = selectedFile.name;
        fSize = selectedFile.size;
        fType = selectedFile.type;
      } else {
        if (!webUrl.trim()) {
          setError('Please enter a valid URL or link.');
          setLoading(false);
          return;
        }
        if (!/^https?:\/\//i.test(finalUrl)) {
          finalUrl = 'https://' + finalUrl;
        }
      }

      const newAttachment: CustomAttachment = {
        id,
        tab: targetTab,
        title: title.trim(),
        url: finalUrl,
        desc: desc.trim(),
        category,
        timestamp: Date.now(),
        fileName: fName,
        fileSize: fSize,
        fileType: fType,
      };

      allLinks[targetTab] = [newAttachment, ...currentList];
      saveAllStoredLinks(allLinks);
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to save attachment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Add Attachment or Link</h3>
              <p className="text-[11px] text-slate-500">Attach offline documents, PDFs, or Google Sheets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode selector */}
        <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg mt-4 mb-4">
          <button
            type="button"
            onClick={() => {
              setMode('local');
              setCategory('LOCAL FILE');
            }}
            className={`py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              mode === 'local' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('web');
              setCategory('GOOGLE SHEET');
            }}
            className={`py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              mode === 'web' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Web URL / Sheet</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Page</label>
            <select
              value={targetTab}
              onChange={(e) => setTargetTab(e.target.value as TabType)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="dashboard">Dashboard Hub</option>
              <option value="admissions">Admissions Hub</option>
              <option value="exam-pre">Pre-Exam (Letters)</option>
              <option value="exam-during">During Exam & Registers</option>
              <option value="exam-post">Post Exam & Relieving</option>
              <option value="results">Results & Analytics</option>
              <option value="converters">File Conversion Tools</option>
              <option value="sports-games">Cricket & Sports</option>
            </select>
          </div>

          {mode === 'local' ? (
            <div className="p-3 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center hover:border-indigo-400 transition">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <Upload className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-700 block">
                  {selectedFile ? selectedFile.name : 'Choose a file to attach'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  PDF, Excel, Word, CSV, or images (stored in browser IndexedDB)
                </span>
              </label>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Web URL or Google Sheet Link</label>
              <input
                type="url"
                placeholder="https://docs.google.com/spreadsheets/..."
                value={webUrl}
                onChange={(e) => setWebUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required={mode === 'web'}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Display Title</label>
            <input
              type="text"
              placeholder="e.g. Center Seating Plan 2026 or Admission List"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="LOCAL FILE">LOCAL FILE</option>
                <option value="GOOGLE SHEET">GOOGLE SHEET</option>
                <option value="ADMISSIONS">ADMISSIONS</option>
                <option value="EXAMINATION">EXAMINATION</option>
                <option value="REGISTERS">REGISTERS</option>
                <option value="SPORTS">SPORTS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Note / Description</label>
              <input
                type="text"
                placeholder="Optional short note..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
            >
              {loading ? <span>Saving...</span> : <span>Save Attachment</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
