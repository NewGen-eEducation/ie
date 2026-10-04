import React, { useState } from 'react';
import { Shield, X, Key, Check, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import {
  getUserPin,
  setUserPin,
  getMasterKey,
  setMasterKey,
} from '../utils/security';

interface PinSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const PinSettingsModal: React.FC<PinSettingsModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'pin' | 'master'>('pin');

  // Change PIN state
  const [currentPin, setCurrentPin] = useState<string>('');
  const [newPin, setNewPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [pinSuccess, setPinSuccess] = useState<string>('');

  // Change Master Key state
  const [currentMaster, setCurrentMaster] = useState<string>('');
  const [newMaster, setNewMaster] = useState<string>('');
  const [confirmMaster, setConfirmMaster] = useState<string>('');
  const [masterError, setMasterError] = useState<string>('');
  const [masterSuccess, setMasterSuccess] = useState<string>('');

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    setPinSuccess('');

    const savedPin = getUserPin();
    const masterKey = getMasterKey();

    if (currentPin !== savedPin && currentPin !== masterKey) {
      setPinError('Current Security PIN is incorrect.');
      return;
    }

    if (!/^\d{4}$/.test(newPin)) {
      setPinError('New PIN must be exactly 4 numeric digits.');
      return;
    }

    if (newPin !== confirmPin) {
      setPinError('New PIN and Confirm PIN do not match.');
      return;
    }

    setUserPin(newPin);
    setPinSuccess('Security PIN successfully updated!');
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');

    setTimeout(() => {
      setPinSuccess('');
      if (onSuccess) onSuccess();
      onClose();
    }, 1500);
  };

  const handleMasterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMasterError('');
    setMasterSuccess('');

    const storedMaster = getMasterKey();
    if (currentMaster !== storedMaster) {
      setMasterError('Current Master Key is incorrect.');
      return;
    }

    if (newMaster.length < 4) {
      setMasterError('New Master Key must be at least 4 characters.');
      return;
    }

    if (newMaster !== confirmMaster) {
      setMasterError('New Master Key and Confirm Key do not match.');
      return;
    }

    setMasterKey(newMaster);
    setMasterSuccess('Master Recovery Key updated successfully!');
    setCurrentMaster('');
    setNewMaster('');
    setConfirmMaster('');

    setTimeout(() => {
      setMasterSuccess('');
      if (onSuccess) onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Security & PIN Settings</h3>
              <p className="text-[11px] text-slate-500">
                Manage 4-digit login PIN and master recovery key
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('pin')}
            className={`flex-1 py-2.5 text-center transition flex items-center justify-center gap-1.5 ${
              activeTab === 'pin'
                ? 'bg-white text-indigo-600 border-b-2 border-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Change 4-Digit PIN</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('master')}
            className={`flex-1 py-2.5 text-center transition flex items-center justify-center gap-1.5 ${
              activeTab === 'master'
                ? 'bg-white text-indigo-600 border-b-2 border-indigo-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Change Master Key</span>
          </button>
        </div>

        <div className="p-5">
          {activeTab === 'pin' ? (
            <form onSubmit={handlePinSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current PIN (or Master Key)
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  required
                  placeholder="Enter current 4-digit PIN"
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  New 4-Digit PIN
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  required
                  placeholder="Enter 4 numeric digits"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm New PIN
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  required
                  placeholder="Re-enter 4 numeric digits"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {pinError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              {pinSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{pinSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save New PIN</span>
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                Default recovery key is <code className="font-bold text-slate-700">0000</code> if you forget your PIN.
              </p>
            </form>
          ) : (
            <form onSubmit={handleMasterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Master Recovery Key
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current master key (Default: 0000)"
                  value={currentMaster}
                  onChange={(e) => setCurrentMaster(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  New Master Recovery Key
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new master key (min 4 chars)"
                  value={newMaster}
                  onChange={(e) => setNewMaster(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm New Master Key
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new master key"
                  value={confirmMaster}
                  onChange={(e) => setConfirmMaster(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {masterError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{masterError}</span>
                </div>
              )}

              {masterSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{masterSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save New Master Key</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
