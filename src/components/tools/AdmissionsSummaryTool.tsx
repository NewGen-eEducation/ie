import React, { useState } from 'react';
import { Printer, ArrowLeft, Users, Search, CheckCircle, AlertTriangle } from 'lucide-react';

interface StudentAdmission {
  id: string;
  admissionNo: string;
  name: string;
  stream: string;
  gender: string;
  attendancePct: number;
  apaarId: string;
  tgbieVerified: boolean;
  udiseStatus: string;
}

interface AdmissionsSummaryToolProps {
  initialType?: string;
  onBack: () => void;
}

export const AdmissionsSummaryTool: React.FC<AdmissionsSummaryToolProps> = ({
  initialType = 'attendance',
  onBack,
}) => {
  const [activeView, setActiveView] = useState<string>(initialType);
  const [collegeCode, setCollegeCode] = useState<string>('25101');
  const [collegeName, setCollegeName] = useState<string>('Govt Junior College, Secunderabad');
  const [academicYear, setAcademicYear] = useState<string>('2025 - 2026');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [students, setStudents] = useState<StudentAdmission[]>([
    { id: '1', admissionNo: 'ADM-2025-0101', name: 'G. Sai Tarun', stream: 'M.P.C (EM)', gender: 'Male', attendancePct: 88.5, apaarId: 'APAAR-9812-4501-1122', tgbieVerified: true, udiseStatus: 'Completed' },
    { id: '2', admissionNo: 'ADM-2025-0102', name: 'K. Sravani', stream: 'Bi.P.C (EM)', gender: 'Female', attendancePct: 92.0, apaarId: 'APAAR-9812-4501-1123', tgbieVerified: true, udiseStatus: 'Completed' },
    { id: '3', admissionNo: 'ADM-2025-0103', name: 'M. Shiva Kumar', stream: 'C.E.C (EM)', gender: 'Male', attendancePct: 76.2, apaarId: 'APAAR-9812-4501-1124', tgbieVerified: true, udiseStatus: 'Completed' },
    { id: '4', admissionNo: 'ADM-2025-0104', name: 'P. Bhavani', stream: 'M.E.C (EM)', gender: 'Female', attendancePct: 81.0, apaarId: 'APAAR-9812-4501-1125', tgbieVerified: true, udiseStatus: 'Completed' },
    { id: '5', admissionNo: 'ADM-2025-0105', name: 'B. Rajesh', stream: 'H.E.C (TM)', gender: 'Male', attendancePct: 68.4, apaarId: 'APAAR-9812-4501-1126', tgbieVerified: false, udiseStatus: 'Pending Aadhaar' },
    { id: '6', admissionNo: 'ADM-2025-0106', name: 'T. Kavya', stream: 'Vocational (CS)', gender: 'Female', attendancePct: 94.5, apaarId: 'APAAR-9812-4501-1127', tgbieVerified: true, udiseStatus: 'Completed' },
    { id: '7', admissionNo: 'ADM-2025-0107', name: 'V. Naresh', stream: 'M.P.C (EM)', gender: 'Male', attendancePct: 62.0, apaarId: 'APAAR-9812-4501-1128', tgbieVerified: false, udiseStatus: 'Condonation Fee Req' },
  ]);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.stream.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.apaarId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h2 className="text-base font-bold text-slate-900">Admissions & UDISE+ Student Verification System</h2>
            <p className="text-xs text-slate-500">Student attendance statements, APAAR ID synchronization & admission rolls</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Summary</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center no-print">
        <div className="flex gap-1.5">
          {[
            { id: 'attendance', label: '1. Student Attendance Summary' },
            { id: 'tgbie_adm', label: '2. TGBIE Online ADM Summary' },
            { id: 'udise', label: '3. UDISE+ & APAAR Statement' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeView === tab.id ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="w-64">
          <input
            type="text"
            placeholder="Search student, stream, APAAR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-300 shadow-sm print-area space-y-6">
        <div className="text-center border-b-2 border-slate-800 pb-3">
          <h2 className="text-xs uppercase font-bold text-slate-700">TELANGANA STATE BOARD OF INTERMEDIATE EDUCATION</h2>
          <h3 className="text-base font-black uppercase text-slate-950 mt-0.5">
            {activeView === 'attendance'
              ? 'MONTHLY & CUMULATIVE STUDENT ATTENDANCE REGISTER'
              : activeView === 'tgbie_adm'
              ? 'COLLEGE ADMISSIONS NOMINAL ROLL VERIFICATION'
              : 'UDISE+ & APAAR (AUTOMATED PERMANENT ACADEMIC ACCOUNT REGISTRY)'}
          </h3>
          <p className="text-xs font-bold text-slate-800">
            {collegeName} [CODE: {collegeCode}] — ACADEMIC SESSION: {academicYear}
          </p>
        </div>

        <table className="w-full border-collapse border border-slate-400 text-xs">
          <thead>
            <tr className="bg-slate-100 font-bold border-b border-slate-400">
              <th className="border border-slate-300 p-2 text-center w-10">Sl</th>
              <th className="border border-slate-300 p-2 text-center w-28">Admission No</th>
              <th className="border border-slate-300 p-2 text-left">Student Name</th>
              <th className="border border-slate-300 p-2 text-left">Group / Medium</th>
              <th className="border border-slate-300 p-2 text-center w-16">Gender</th>
              <th className="border border-slate-300 p-2 text-center w-20">Attendance %</th>
              <th className="border border-slate-300 p-2 text-center w-44">APAAR ID</th>
              <th className="border border-slate-300 p-2 text-center w-28">Portal Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, idx) => (
              <tr key={s.id} className="border-b border-slate-300 hover:bg-slate-50">
                <td className="border border-slate-300 p-2 text-center font-bold">{idx + 1}</td>
                <td className="border border-slate-300 p-2 text-center font-mono font-semibold">{s.admissionNo}</td>
                <td className="border border-slate-300 p-2 font-bold text-slate-900">{s.name}</td>
                <td className="border border-slate-300 p-2">{s.stream}</td>
                <td className="border border-slate-300 p-2 text-center">{s.gender}</td>
                <td className="border border-slate-300 p-2 text-center font-mono font-bold">
                  <span
                    className={
                      s.attendancePct >= 75
                        ? 'text-emerald-700'
                        : s.attendancePct >= 65
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }
                  >
                    {s.attendancePct}%
                  </span>
                </td>
                <td className="border border-slate-300 p-2 text-center font-mono text-[11px] text-indigo-950 font-semibold">
                  {s.apaarId}
                </td>
                <td className="border border-slate-300 p-2 text-center">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      s.tgbieVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {s.udiseStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-14 flex justify-between items-end text-xs pt-4 border-t border-slate-200">
          <div>
            <p className="font-semibold text-slate-700">Admissions In-Charge Lecturer</p>
          </div>
          <div className="text-center">
            <div className="h-8"></div>
            <p className="font-bold">Principal</p>
            <p className="text-[10px] text-slate-500">{collegeName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
