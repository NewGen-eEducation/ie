import React, { useState } from 'react';
import { Printer, ArrowLeft, Plus, Trash2, Calculator, IndianRupee } from 'lucide-react';

interface BillEntry {
  id: string;
  name: string;
  role: string;
  sessions: number;
  rate: number;
  da: number;
}

interface RemunerationBillToolProps {
  onBack: () => void;
}

export const RemunerationBillTool: React.FC<RemunerationBillToolProps> = ({ onBack }) => {
  const [centerCode, setCenterCode] = useState<string>('25101');
  const [collegeName, setCollegeName] = useState<string>('Govt Junior College, Secunderabad');
  const [examName, setExamName] = useState<string>('IPE MARCH 2026');
  const [totalSessions, setTotalSessions] = useState<number>(14);
  const [stationeryAllowance, setStationeryAllowance] = useState<number>(850);
  const [seatingArrangementAllowance, setSeatingArrangementAllowance] = useState<number>(1200);

  const [staffBills, setStaffBills] = useState<BillEntry[]>([
    { id: '1', name: 'Dr. G. Sathish Kumar', role: 'Chief Superintendent (CS)', sessions: 14, rate: 300, da: 0 },
    { id: '2', name: 'Sri. M. Venkat Rao', role: 'Departmental Officer (DO)', sessions: 14, rate: 275, da: 1400 },
    { id: '3', name: 'Smt. K. Saritha', role: 'Invigilator', sessions: 14, rate: 175, da: 0 },
    { id: '4', name: 'Sri. P. Rajeshwar', role: 'Invigilator', sessions: 14, rate: 175, da: 0 },
    { id: '5', name: 'Smt. B. Anuradha', role: 'Invigilator', sessions: 14, rate: 175, da: 0 },
    { id: '6', name: 'Sri. T. Ramesh', role: 'Clerk / Assistant', sessions: 14, rate: 120, da: 0 },
    { id: '7', name: 'Sri. B. Yadagiri', role: 'Attender', sessions: 14, rate: 90, da: 0 },
    { id: '8', name: 'Smt. L. Sunitha', role: 'Waterman', sessions: 14, rate: 80, da: 0 },
  ]);

  const [newName, setNewName] = useState<string>('');
  const [newRole, setNewRole] = useState<string>('Invigilator');
  const [newSessions, setNewSessions] = useState<number>(14);
  const [newRate, setNewRate] = useState<number>(175);
  const [newDa, setNewDa] = useState<number>(0);

  const handleRoleChange = (role: string) => {
    setNewRole(role);
    if (role === 'Chief Superintendent (CS)') setNewRate(300);
    else if (role === 'Departmental Officer (DO)') setNewRate(275);
    else if (role === 'Invigilator') setNewRate(175);
    else if (role === 'Clerk / Assistant') setNewRate(120);
    else if (role === 'Attender') setNewRate(90);
    else if (role === 'Waterman') setNewRate(80);
    else if (role === 'Police Bandobast') setNewRate(100);
  };

  const addStaffBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setStaffBills([
      ...staffBills,
      {
        id: Date.now().toString(),
        name: newName.trim(),
        role: newRole,
        sessions: newSessions,
        rate: newRate,
        da: newDa,
      },
    ]);
    setNewName('');
  };

  const removeStaffBill = (id: string) => {
    setStaffBills(staffBills.filter((s) => s.id !== id));
  };

  const totalHonorarium = staffBills.reduce((acc, s) => acc + s.sessions * s.rate, 0);
  const totalDA = staffBills.reduce((acc, s) => acc + s.da, 0);
  const grandTotal = totalHonorarium + totalDA + stationeryAllowance + seatingArrangementAllowance;

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
            <h2 className="text-base font-bold text-slate-900">TA/DA & Remuneration Work Done Statement</h2>
            <p className="text-xs text-slate-500">Official statutory remuneration bill for CS, DO, Invigilators and Staff</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Claim Bill</span>
        </button>
      </div>

      {/* Inputs Configuration */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 no-print">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Center Code</label>
            <input
              type="text"
              value={centerCode}
              onChange={(e) => setCenterCode(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">College Name</label>
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Exam Sessions Count</label>
            <input
              type="number"
              value={totalSessions}
              onChange={(e) => setTotalSessions(parseInt(e.target.value, 10) || 0)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Stationery & Seating Allowance</label>
            <div className="flex gap-1.5">
              <input
                type="number"
                value={stationeryAllowance}
                onChange={(e) => setStationeryAllowance(parseInt(e.target.value, 10) || 0)}
                className="w-1/2 px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
                title="Stationery"
              />
              <input
                type="number"
                value={seatingArrangementAllowance}
                onChange={(e) => setSeatingArrangementAllowance(parseInt(e.target.value, 10) || 0)}
                className="w-1/2 px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
                title="Seating prep"
              />
            </div>
          </div>
        </div>

        {/* Add Entry Form */}
        <form onSubmit={addStaffBill} className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 items-end">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-[10px] font-bold text-slate-600 mb-1">Staff Name</label>
            <input
              type="text"
              placeholder="Sri. / Smt. Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            />
          </div>
          <div className="w-48">
            <label className="block text-[10px] font-bold text-slate-600 mb-1">Role</label>
            <select
              value={newRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            >
              <option value="Chief Superintendent (CS)">Chief Superintendent (CS)</option>
              <option value="Departmental Officer (DO)">Departmental Officer (DO)</option>
              <option value="Invigilator">Invigilator</option>
              <option value="Clerk / Assistant">Clerk / Assistant</option>
              <option value="Attender">Attender</option>
              <option value="Waterman">Waterman</option>
              <option value="Police Bandobast">Police Bandobast</option>
            </select>
          </div>
          <div className="w-20">
            <label className="block text-[10px] font-bold text-slate-600 mb-1">Sessions</label>
            <input
              type="number"
              value={newSessions}
              onChange={(e) => setNewSessions(parseInt(e.target.value, 10) || 0)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
            />
          </div>
          <div className="w-20">
            <label className="block text-[10px] font-bold text-slate-600 mb-1">Rate (₹)</label>
            <input
              type="number"
              value={newRate}
              onChange={(e) => setNewRate(parseInt(e.target.value, 10) || 0)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
            />
          </div>
          <div className="w-20">
            <label className="block text-[10px] font-bold text-slate-600 mb-1">TA/DA (₹)</label>
            <input
              type="number"
              value={newDa}
              onChange={(e) => setNewDa(parseInt(e.target.value, 10) || 0)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Row
          </button>
        </form>
      </div>

      {/* Official Printable Bill */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-300 shadow-sm print-area space-y-6">
        <div className="text-center border-b-2 border-slate-900 pb-3">
          <h2 className="text-xs uppercase font-bold text-slate-700">TELANGANA BOARD OF INTERMEDIATE EDUCATION, HYDERABAD</h2>
          <h3 className="text-base font-black uppercase text-slate-950 mt-0.5">
            CONSOLIDATED REMUNERATION & WORK DONE BILL OF EXAMINATION STAFF
          </h3>
          <p className="text-xs font-bold text-slate-800">
            EXAMINATION: {examName} | CENTER CODE: {centerCode} — {collegeName}
          </p>
        </div>

        <table className="w-full border-collapse border border-slate-400 text-xs">
          <thead>
            <tr className="bg-slate-100 font-bold border-b border-slate-400">
              <th className="border border-slate-300 p-2 text-center w-10">Sl</th>
              <th className="border border-slate-300 p-2 text-left">Name of the Staff Member</th>
              <th className="border border-slate-300 p-2 text-left">Designation / Role</th>
              <th className="border border-slate-300 p-2 text-center w-16">Sessions</th>
              <th className="border border-slate-300 p-2 text-right w-20">Rate (₹)</th>
              <th className="border border-slate-300 p-2 text-right w-24">Honorarium (₹)</th>
              <th className="border border-slate-300 p-2 text-right w-20">TA / DA (₹)</th>
              <th className="border border-slate-300 p-2 text-right w-28">Net Amount (₹)</th>
              <th className="border border-slate-300 p-2 text-center w-28">Signature of Staff</th>
              <th className="border border-slate-300 p-1 text-center w-10 no-print">Act</th>
            </tr>
          </thead>
          <tbody>
            {staffBills.map((s, idx) => {
              const hon = s.sessions * s.rate;
              const net = hon + s.da;
              return (
                <tr key={s.id} className="border-b border-slate-300 hover:bg-slate-50">
                  <td className="border border-slate-300 p-2 text-center font-bold">{idx + 1}</td>
                  <td className="border border-slate-300 p-2 font-medium">{s.name}</td>
                  <td className="border border-slate-300 p-2">{s.role}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono">{s.sessions}</td>
                  <td className="border border-slate-300 p-2 text-right font-mono">{s.rate}</td>
                  <td className="border border-slate-300 p-2 text-right font-mono font-semibold">{hon}</td>
                  <td className="border border-slate-300 p-2 text-right font-mono">{s.da}</td>
                  <td className="border border-slate-300 p-2 text-right font-mono font-bold text-slate-900 bg-slate-50/50">
                    {net}
                  </td>
                  <td className="border border-slate-300 p-2 text-center text-slate-300">__________</td>
                  <td className="border border-slate-300 p-1 text-center no-print">
                    <button
                      onClick={() => removeStaffBill(s.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Allowance Rows */}
            <tr className="border-b border-slate-300 bg-slate-50/50">
              <td colSpan={7} className="border border-slate-300 p-2 text-right font-medium">
                Stationery, Packing Material, Cloth, Sealing Wax & Twine Charges:
              </td>
              <td className="border border-slate-300 p-2 text-right font-mono font-bold">
                {stationeryAllowance}
              </td>
              <td className="border border-slate-300 p-2 text-center text-slate-400">Voucher enclosed</td>
              <td className="border border-slate-300 p-1 no-print"></td>
            </tr>
            <tr className="border-b border-slate-300 bg-slate-50/50">
              <td colSpan={7} className="border border-slate-300 p-2 text-right font-medium">
                Preparation of Examination Seating Arrangements (Hall cleaning & numbering):
              </td>
              <td className="border border-slate-300 p-2 text-right font-mono font-bold">
                {seatingArrangementAllowance}
              </td>
              <td className="border border-slate-300 p-2 text-center text-slate-400">Voucher enclosed</td>
              <td className="border border-slate-300 p-1 no-print"></td>
            </tr>

            {/* Grand Total */}
            <tr className="bg-slate-100 font-black border-t-2 border-slate-800 text-sm">
              <td colSpan={7} className="border border-slate-400 p-2 text-right uppercase">
                Grand Total Claimed Amount:
              </td>
              <td className="border border-slate-400 p-2 text-right font-mono text-indigo-900">
                ₹ {grandTotal.toLocaleString()}
              </td>
              <td colSpan={2} className="border border-slate-400 p-2 text-center text-xs font-normal text-slate-600">
                Rupees in words: (Verified)
              </td>
            </tr>
          </tbody>
        </table>

        {/* Certificate signatures */}
        <div className="pt-6 border-t border-slate-300 text-xs leading-relaxed">
          <p className="text-justify font-semibold text-slate-800">
            Certified that the above staff members were genuinely deployed for the examination duties at Center Code: <strong>{centerCode}</strong> as per the roster and their services were fully utilized. The rates charged are in accordance with the TGBIE approved scales of remuneration.
          </p>

          <div className="mt-14 flex justify-between items-end text-xs">
            <div className="text-center">
              <p className="font-bold">Departmental Officer (DO)</p>
              <p className="text-[10px] text-slate-500">Center Code: {centerCode}</p>
            </div>
            <div className="text-center">
              <p className="font-bold">Chief Superintendent (CS)</p>
              <p className="text-[10px] text-slate-500">{collegeName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
