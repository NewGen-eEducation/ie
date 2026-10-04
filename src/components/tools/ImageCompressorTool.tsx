import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Download, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

interface ImageCompressorToolProps {
  onBack: () => void;
}

export const ImageCompressorTool: React.FC<ImageCompressorToolProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [targetPreset, setTargetPreset] = useState<'passport' | 'signature' | 'custom'>('passport');
  const [quality, setQuality] = useState<number>(0.8);
  const [maxWidth, setMaxWidth] = useState<number>(300);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('compressed_photo.jpg');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      setFileName(file.name.replace(/\.[^/.]+$/, '_compressed.jpg'));
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setSelectedImage(dataUrl);
        compress(dataUrl, targetPreset, quality, maxWidth);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetChange = (preset: 'passport' | 'signature' | 'custom') => {
    setTargetPreset(preset);
    let newWidth = maxWidth;
    let newQuality = quality;

    if (preset === 'passport') {
      newWidth = 350;
      newQuality = 0.8;
    } else if (preset === 'signature') {
      newWidth = 280;
      newQuality = 0.7;
    }

    setMaxWidth(newWidth);
    setQuality(newQuality);
    if (selectedImage) {
      compress(selectedImage, preset, newQuality, newWidth);
    }
  };

  const compress = (dataUrl: string, preset: string, q: number, w: number) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let targetW = w;
      let targetH = (img.height / img.width) * w;

      if (preset === 'passport') {
        targetW = 300;
        targetH = 380;
      } else if (preset === 'signature') {
        targetW = 280;
        targetH = 120;
      }

      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(img, 0, 0, targetW, targetH);
        const resultUrl = canvas.toDataURL('image/jpeg', q);
        setCompressedImage(resultUrl);

        // Calculate size in bytes
        const head = 'data:image/jpeg;base64,';
        const byteLength = Math.round(((resultUrl.length - head.length) * 3) / 4);
        setCompressedSize(byteLength);
      }
      setIsProcessing(false);
    };
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const a = document.createElement('a');
    a.href = compressedImage;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 transition"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-slate-900">Government Portal Image & Photo Compressor</h2>
            <p className="text-xs text-slate-500">
              Resize and compress student passport photos & signatures to strict portal limits (≤ 50 KB / ≤ 100 KB)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Settings & Upload Panel */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider">PRESET SPECIFICATIONS</h3>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'passport', label: 'Passport Photo', limit: '≤ 100 KB' },
              { id: 'signature', label: 'Signature', limit: '≤ 50 KB' },
              { id: 'custom', label: 'Custom', limit: 'Custom' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePresetChange(p.id as any)}
                className={`p-2.5 rounded-lg border text-center transition ${
                  targetPreset === p.id
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="text-xs block leading-tight">{p.label}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{p.limit}</span>
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Compression Quality: <span className="font-mono font-bold text-indigo-600">{Math.round(quality * 100)}%</span>
            </label>
            <input
              type="range"
              min={0.1}
              max={1.0}
              step={0.05}
              value={quality}
              onChange={(e) => {
                const q = parseFloat(e.target.value);
                setQuality(q);
                if (selectedImage) compress(selectedImage, targetPreset, q, maxWidth);
              }}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center hover:border-indigo-400 transition cursor-pointer"
               onClick={() => fileInputRef.current?.click()}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Upload className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800">Click to Select Student Photo or Signature</p>
            <p className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, WEBP (Processed 100% locally in browser)</p>
          </div>
        </div>

        {/* Live Comparison View */}
        <div className="md:col-span-2 bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase text-slate-800 tracking-wider mb-3">
            COMPRESSION PREVIEW & SIZE AUDIT
          </h3>

          {selectedImage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
              {/* Original */}
              <div className="text-center p-3 border border-slate-200 rounded-xl bg-slate-50">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">ORIGINAL IMAGE</span>
                <div className="h-52 flex items-center justify-center overflow-hidden rounded bg-white border border-slate-200 mb-2">
                  <img src={selectedImage} alt="Original" className="max-h-full max-w-full object-contain" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-700">
                  {(originalSize / 1024).toFixed(1)} KB
                </p>
              </div>

              {/* Compressed */}
              <div className="text-center p-3 border-2 border-indigo-500 rounded-xl bg-indigo-50/20">
                <span className="text-[10px] font-bold uppercase text-indigo-600 block mb-1">OPTIMIZED FOR TGBIE</span>
                <div className="h-52 flex items-center justify-center overflow-hidden rounded bg-white border border-slate-200 mb-2">
                  {compressedImage ? (
                    <img src={compressedImage} alt="Compressed" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-xs text-slate-400">Processing...</span>
                  )}
                </div>
                <p className="text-xs font-mono font-black text-emerald-600">
                  {(compressedSize / 1024).toFixed(1)} KB{' '}
                  <span className="text-[10px] font-normal text-slate-500">
                    ({Math.round(((originalSize - compressedSize) / originalSize) * 100)}% smaller)
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center">
              <ImageIcon className="w-12 h-12 stroke-1 mb-2 text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">No Image Selected</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                Upload any photograph or signature to optimize file size for government portals.
              </p>
            </div>
          )}

          {/* Download Action */}
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-4">
            <span className="text-xs text-slate-500">
              {compressedSize > 0 && compressedSize <= 102400 ? (
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Portal compliant (under 100 KB)
                </span>
              ) : null}
            </span>
            <button
              onClick={handleDownload}
              disabled={!compressedImage || isProcessing}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Compressed Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
