import React, { useState, useEffect, useRef } from 'react';
import { Lock, Shield, Key, MessageCircle, Copy, Check, AlertCircle, Eye, EyeOff, RotateCcw } from 'lucide-react';
import {
  generateDeviceFingerprint,
  getUserPin,
  getMasterKey,
} from '../utils/security';

interface PinLockModalProps {
  isOpen: boolean;
  onUnlock: () => void;
  onOpenSettings?: () => void;
}

export const PinLockModal: React.FC<PinLockModalProps> = ({
  isOpen,
  onUnlock,
  onOpenSettings,
}) => {
  const [pinDigits, setPinDigits] = useState<string[]>(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [deviceKey, setDeviceKey] = useState<string>('Generating Key...');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [showPin, setShowPin] = useState<boolean>(false);
  const [useMasterKeyMode, setUseMasterKeyMode] = useState<boolean>(false);
  const [masterKeyInput, setMasterKeyInput] = useState<string>('');

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (isOpen) {
      setPinDigits(['', '', '', '']);
      setErrorMsg('');
      setUseMasterKeyMode(false);
      setMasterKeyInput('');
      generateDeviceFingerprint().then((k) => setDeviceKey(k));
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, '');
    const char = cleaned.slice(-1);

    const newPin = [...pinDigits];
    newPin[index] = char;
    setPinDigits(newPin);
    setErrorMsg('');

    if (char && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto verify if all 4 digits entered
    if (char && index === 3 && newPin.every((d) => d !== '')) {
      const enteredPin = newPin.join('');
      verifyPin(enteredPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'Enter') {
      const enteredPin = pinDigits.join('');
      if (enteredPin.length === 4) {
        verifyPin(enteredPin);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;

    const newPin = ['', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newPin[i] = pasted[i];
    }
    setPinDigits(newPin);
    if (pasted.length === 4) {
      verifyPin(pasted);
    } else if (pasted.length < 4) {
      inputRefs[pasted.length].current?.focus();
    }
  };

  const verifyPin = (entered: string) => {
    const savedPin = getUserPin();
    const masterKey = getMasterKey();

    if (entered === savedPin || entered === masterKey || entered === '0000') {
      onUnlock();
    } else {
      setErrorMsg('Invalid Security PIN. Please try again or use Master Key.');
      setPinDigits(['', '', '', '']);
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 50);
    }
  };

  const handleNumberPadClick = (num: string) => {
    const firstEmptyIndex = pinDigits.findIndex((d) => d === '');
    if (firstEmptyIndex !== -1) {
      handleDigitChange(firstEmptyIndex, num);
    }
  };

  const handleBackspacePad = () => {
    const lastFilledIndex = [...pinDigits].reverse().findIndex((d) => d !== '');
    if (lastFilledIndex !== -1) {
      const actualIdx = 3 - lastFilledIndex;
      const newPin = [...pinDigits];
      newPin[actualIdx] = '';
      setPinDigits(newPin);
      inputRefs[actualIdx].current?.focus();
    }
  };

  const handleMasterKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const masterKey = getMasterKey();
    if (masterKeyInput.trim() === masterKey || masterKeyInput.trim() === '0000') {
      onUnlock();
    } else {
      setErrorMsg('Invalid Master Recovery Key (Default: 0000).');
    }
  };

  const copyDeviceKey = () => {
    navigator.clipboard.writeText(deviceKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const sendWhatsApp = () => {
    const msg = encodeURIComponent(`Hello Sathish Kumar Sir, please assist with NewGen eEducation IE Utility Hub for Device: ${deviceKey}`);
    window.open(`https://wa.me/919949681639?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-slate-100 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-indigo-900 p-5 text-white text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-indigo-300 border border-white/20 inline-flex items-center justify-center mb-2 shadow-inner">
            <Lock className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-base font-extrabold tracking-tight">NewGen eEducation</h2>
          <p className="text-[11px] text-indigo-200 mt-0.5">IE Utility Hub & College Digital Operations</p>
          <div className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider">
            Protected Platform
          </div>
        </div>

        <div className="p-5">
          {!useMasterKeyMode ? (
            <div>
              <div className="text-center mb-4">
                <h3 className="text-sm font-bold text-slate-900">Enter Security PIN</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Default PIN: <code className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">0000</code>
                </p>
              </div>

              {/* 4 Digit PIN Inputs */}
              <div className="flex justify-center gap-3 mb-4" onPaste={handlePaste}>
                {pinDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    type={showPin ? 'text' : 'password'}
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-14 text-center text-xl font-mono font-bold bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition shadow-inner"
                  />
                ))}
              </div>

              <div className="flex justify-between items-center px-2 mb-4 text-xs">
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
                >
                  {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPin ? 'Hide' : 'Show'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPinDigits(['0', '0', '0', '0']);
                    verifyPin('0000');
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-bold"
                >
                  Fill Default (0000)
                </button>
              </div>

              {/* Numeric Keypad for Touch / Mouse Users */}
              <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto mb-4">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleNumberPadClick(num)}
                    className="h-11 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 border border-slate-200 text-slate-800 font-bold text-base transition active:scale-95 flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setPinDigits(['', '', '', '']);
                    inputRefs[0].current?.focus();
                  }}
                  className="h-11 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold transition active:scale-95 flex items-center justify-center cursor-pointer"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handleNumberPadClick('0')}
                  className="h-11 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 border border-slate-200 text-slate-800 font-bold text-base transition active:scale-95 flex items-center justify-center cursor-pointer shadow-xs"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleBackspacePad}
                  className="h-11 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold transition active:scale-95 flex items-center justify-center cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setUseMasterKeyMode(true);
                  }}
                  className="text-slate-500 hover:text-indigo-600 font-semibold flex items-center gap-1"
                >
                  <Key className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Use Master Key</span>
                </button>

                {onOpenSettings && (
                  <button
                    type="button"
                    onClick={onOpenSettings}
                    className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>PIN Settings</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-4">
                <h3 className="text-sm font-bold text-slate-900">Master Recovery Key</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Default Master Key: <code className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">0000</code>
                </p>
              </div>

              <form onSubmit={handleMasterKeySubmit} className="space-y-3">
                <input
                  type="password"
                  required
                  placeholder="Enter Master Key"
                  value={masterKeyInput}
                  onChange={(e) => setMasterKeyInput(e.target.value)}
                  className="w-full px-3 py-2 text-center text-sm font-mono font-bold bg-slate-50 border-2 border-slate-300 rounded-xl focus:border-indigo-600 focus:bg-white focus:outline-none"
                  autoFocus
                />

                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Unlock with Master Key
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg('');
                    setUseMasterKeyMode(false);
                    setTimeout(() => inputRefs[0].current?.focus(), 50);
                  }}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                >
                  Back to PIN Entry
                </button>
              </form>
            </div>
          )}

          {/* Device Key & Support Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-left">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 mb-1">
                <span>DEVICE HARDWARE KEY:</span>
                <button
                  type="button"
                  onClick={copyDeviceKey}
                  className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-[10.5px] font-bold text-slate-800 break-all select-all">
                {deviceKey}
              </p>
            </div>

            <div className="mt-2.5 flex justify-between items-center text-[11px]">
              <button
                type="button"
                onClick={sendWhatsApp}
                className="text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Support (9949681639)</span>
              </button>
              <span className="text-[10px] text-slate-400 font-medium">Sri. G. Sathish Kumar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
