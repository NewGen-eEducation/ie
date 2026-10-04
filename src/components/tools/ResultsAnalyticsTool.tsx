import React, { useState } from 'react';
import { Printer, ArrowLeft, BarChart3, Award, Users, TrendingUp } from 'lucide-react';

interface StreamResult {
  stream: string;
  registered: number;
  appeared: number;
  passed: number;
  gradeA: number;
  gradeB: number;
  gradeC: number;
  gradeD: number;
  backlogs: number;
}

interface ResultsAnalyticsToolProps {
  initialYear?: '1st' | '2nd' | 'final';
  onBack: () => void;
}

export const ResultsAnalyticsTool: React.FC<ResultsAnalyticsToolProps> = ({
  initialYear = '1st',
  onBack,
}) => {
  const [selectedYear, setSelectedYear] = useState<'1st' | '2nd' | 'final'>(initialYear);
  const [collegeName, setCollegeName] = useState<string>('Govt Junior College, Secunderabad');
  const [collegeCode, setCollegeCode] = useState<string>('25101');
  const [academicYear, setAcademicYear] = useState<string>('2025 - 2026');

  const [streamData, setStreamData] = useState<StreamResult[]>([
    { stream: 'M.P.C (English Medium)', registered: 88, appeared: 86, passed: 76, gradeA: 42, gradeB: 22, gradeC: 9, gradeD: 3, backlogs: 10 },
    { stream: 'Bi.P.C (English Medium)', registered: 64, appeared: 64, passed: 56, gradeA: 28, gradeB: 18, gradeC: 7, gradeD: 3, backlogs: 8 },
    { stream: 'C.E.C (English Medium)', registered: 72, appeared: 70, passed: 61, gradeA: 24, gradeB: 25, gradeC: 8, gradeD: 4, backlogs: 9 },
    { stream: 'M.E.C (English Medium)', registered: 45, appeared: 44, passed: 39, gradeA: 18, gradeB: 14, gradeC: 5, gradeD: 2, backlogs: 5 },
    { stream: 'H.E.C (Telugu Medium)', registered: 38, appeared: 37, passed: 31, gradeA: 8, gradeB: 15, gradeC: 6, gradeD: 2, backlogs: 6 },
    { stream: 'Vocational (Computer Science)', registered: 40, appeared: 40, passed: 36, gradeA: 20, gradeB: 11, gradeC: 4, gradeD: 1, backlogs: 4 },
  ]);

  const totalAppeared = streamData.reduce((acc, s) => acc + s.appeared, 0);
  const totalPassed = streamData.reduce((acc, s) => acc + s.passed, 0);
  const overallPassPercent = totalAppeared > 0 ? ((totalPassed / totalAppeared) * 100).toFixed(1) : '0';
  const totalGradeA = streamData.reduce((acc, s) => acc + s.gradeA, 0);
  const totalBacklogs = streamData.reduce((acc, s) => acc + s.backlogs, 0);

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
            <h2 className="text-base font-bold text-slate-900">Intermediate Results & Analytics Hub</h2>
            <p className="text-xs text-slate-500">General, Vocational, Group-wise, Grade 'A' Distinctions & Backlog Analysis</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Results Report</span>
        </button>
      </div>

      {/* Year Selection Tabs */}
      <div className="flex justify-between items-center no-print">
        <div className="flex gap-1.5">
          <button
            onClick={() => setSelectedYear('1st')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedYear === '1st' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600'
            }`}
          >
            1st Year IPE Results
          </button>
          <button
            onClick={() => setSelectedYear('2nd')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedYear === '2nd' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600'
            }`}
          >
            2nd Year IPE Results
          </button>
          <button
            onClick={() => setSelectedYear('final')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedYear === 'final' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600'
            }`}
          >
            Combined IPE + IPASE Final Results
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span>College Code:</span>
          <input
            type="text"
            value={collegeCode}
            onChange={(e) => setCollegeCode(e.target.value)}
            className="w-16 px-1.5 py-1 bg-white border border-slate-300 rounded font-mono"
          />
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] text-slate-500 font-bold block">TOTAL APPEARED</span>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{totalAppeared}</p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Candidates across all streams</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] text-emerald-600 font-bold block">OVERALL PASS RATE</span>
          <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">{overallPassPercent}%</p>
          <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">{totalPassed} students cleared</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] text-indigo-600 font-bold block">GRADE 'A' DISTINCTIONS</span>
          <p className="text-2xl font-black text-indigo-600 mt-1 font-mono">{totalGradeA}</p>
          <span className="text-[10px] text-indigo-700 font-medium mt-0.5 block">
            {((totalGradeA / totalAppeared) * 100).toFixed(0)}% with distinction (≥ 75%)
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[11px] text-amber-600 font-bold block">COMPARTMENTS / BACKLOGS</span>
          <p className="text-2xl font-black text-amber-600 mt-1 font-mono">{totalBacklogs}</p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Eligible for IPASE Supplementary</span>
        </div>
      </div>

      {/* Printable Sheet */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-300 shadow-sm print-area space-y-6">
        <div className="text-center border-b-2 border-slate-800 pb-3">
          <h2 className="text-xs uppercase font-bold text-slate-700">GOVERNMENT OF TELANGANA — INTERMEDIATE EDUCATION</h2>
          <h3 className="text-base font-black uppercase text-slate-950 mt-0.5">
            CONSOLIDATED {selectedYear.toUpperCase()} PUBLIC EXAMINATION RESULTS SUMMARY
          </h3>
          <p className="text-xs font-bold text-slate-800">
            {collegeName} [COLLEGE CODE: {collegeCode}] — ACADEMIC YEAR: {academicYear}
          </p>
        </div>

        {/* Group-wise Results Table */}
        <table className="w-full border-collapse border border-slate-400 text-xs">
          <thead>
            <tr className="bg-slate-100 font-bold border-b border-slate-400">
              <th className="border border-slate-300 p-2 text-center w-10">Sl</th>
              <th className="border border-slate-300 p-2 text-left">Group / Course Stream</th>
              <th className="border border-slate-300 p-2 text-center w-16">Appeared</th>
              <th className="border border-slate-300 p-2 text-center w-16">Passed</th>
              <th className="border border-slate-300 p-2 text-center w-18">Pass %</th>
              <th className="border border-slate-300 p-2 text-center w-16 text-emerald-800">A Grade</th>
              <th className="border border-slate-300 p-2 text-center w-16 text-blue-800">B Grade</th>
              <th className="border border-slate-300 p-2 text-center w-16">C Grade</th>
              <th className="border border-slate-300 p-2 text-center w-16">D Grade</th>
              <th className="border border-slate-300 p-2 text-center w-16 text-red-700">Failed</th>
            </tr>
          </thead>
          <tbody>
            {streamData.map((s, idx) => {
              const pct = s.appeared > 0 ? ((s.passed / s.appeared) * 100).toFixed(1) : '0';
              return (
                <tr key={idx} className="border-b border-slate-300 hover:bg-slate-50">
                  <td className="border border-slate-300 p-2 text-center font-bold">{idx + 1}</td>
                  <td className="border border-slate-300 p-2 font-semibold text-slate-900">{s.stream}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono">{s.appeared}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold text-emerald-700">{s.passed}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold bg-slate-50">{pct}%</td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold text-emerald-700 bg-emerald-50/30">{s.gradeA}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono text-blue-700">{s.gradeB}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono">{s.gradeC}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono">{s.gradeD}</td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold text-red-600 bg-red-50/30">{s.backlogs}</td>
                </tr>
              );
            })}
            <tr className="bg-slate-100 font-black border-t-2 border-slate-800">
              <td colSpan={2} className="border border-slate-400 p-2 text-right uppercase">
                COLLEGE TOTAL:
              </td>
              <td className="border border-slate-400 p-2 text-center font-mono">{totalAppeared}</td>
              <td className="border border-slate-400 p-2 text-center font-mono text-emerald-700">{totalPassed}</td>
              <td className="border border-slate-400 p-2 text-center font-mono text-indigo-900">{overallPassPercent}%</td>
              <td className="border border-slate-400 p-2 text-center font-mono text-emerald-700">{totalGradeA}</td>
              <td colSpan={3} className="border border-slate-400 p-2 text-center text-slate-500">First / Second Classes</td>
              <td className="border border-slate-400 p-2 text-center font-mono text-red-600">{totalBacklogs}</td>
            </tr>
          </tbody>
        </table>

        {/* College Toppers Showcase */}
        <div>
          <h4 className="text-xs font-black uppercase text-indigo-950 border-b border-slate-300 pb-1 mb-3">
            COLLEGE TOPPERS & STREAM DISTINCTIONS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { rank: '1st College Topper', name: 'K. Sai Akhil', stream: 'M.P.C', marks: '468 / 470 (99.5%)', hallTicket: '252110018' },
              { rank: '2nd College Topper', name: 'M. Deepthi', stream: 'Bi.P.C', marks: '432 / 440 (98.2%)', hallTicket: '252110074' },
              { rank: '3rd College Topper', name: 'T. Karthik', stream: 'C.E.C', marks: '482 / 500 (96.4%)', hallTicket: '252110112' },
            ].map((t, idx) => (
              <div key={idx} className="p-3 border border-slate-300 rounded-lg bg-slate-50">
                <span className="text-[10px] font-black uppercase text-indigo-600 block">{t.rank}</span>
                <p className="text-xs font-black text-slate-900 mt-0.5">{t.name}</p>
                <p className="text-[11px] text-slate-600">{t.stream} | HT: {t.hallTicket}</p>
                <p className="text-xs font-mono font-black text-emerald-700 mt-1">{t.marks}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-between items-end text-xs pt-4 border-t border-slate-200">
          <div>
            <p className="font-semibold text-slate-700">Exam In-charge Lecturer</p>
          </div>
          <div className="text-center">
            <div className="h-8"></div>
            <p className="font-bold">Principal / Chief Superintendent</p>
            <p className="text-[10px] text-slate-500">{collegeName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
