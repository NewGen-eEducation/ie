import React from 'react';
import {
  GraduationCap,
  Mail,
  Youtube,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AboutTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center shrink-0 shadow-md">
            <GraduationCap className="w-9 h-9" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              Official Educational Platform
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              NewGen <span className="text-red-600">e</span>Education
            </h2>
            <p className="text-xs font-bold text-slate-700 mt-1">
              Author & Developer: <span className="text-indigo-600">Sri. Guduru Sathish Kumar</span>
            </p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Contact: guduru.excel.pro@gmail.com | WhatsApp: +91 9949681639
            </p>
            <p className="text-xs text-slate-600 leading-relaxed mt-3">
              IE Utility Hub is an advanced, offline-first digital utility suite engineered specifically for Principals, Chief Superintendents, Departmental Officers, and College Administrators under the Telangana Board of Intermediate Education (TGBIE).
            </p>
          </div>
        </div>

        {/* Contact & Channel Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100">
          <a
            href="https://youtube.com/@gudurusathishkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-red-200 bg-red-50/30 hover:bg-red-50 transition flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
              <Youtube className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-red-600">YouTube Channel</p>
              <p className="text-[10px] text-slate-500">@gudurusathishkumar</p>
            </div>
          </a>

          <a
            href="mailto:guduru.excel.pro@gmail.com"
            className="p-3 rounded-xl border border-blue-200 bg-blue-50/30 hover:bg-blue-50 transition flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Official Email</p>
              <p className="text-[10px] text-slate-500 truncate">guduru.excel.pro@gmail.com</p>
            </div>
          </a>

          <a
            href="https://wa.me/919949681639"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50 transition flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">Direct Support</p>
              <p className="text-[10px] text-slate-500">+91 9949681639</p>
            </div>
          </a>
        </div>
      </div>

      {/* Platform Objectives */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
          PLATFORM CORE OBJECTIVES & COMPLIANCE
        </h3>
        <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Streamline Exam Day Registers:</strong> Rapidly generate official TGBIE Annexure I, II & III statutory returns, DO custody registers, candidate washroom movement logs, and room door seating slips in compliant print formats.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Standardized Pre-Exam Correspondence:</strong> Draft and print requisition letters for police bandobast under CrPC Sec 144, electricity substation power stabilization, post office speed post bookings, and staff deputations.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Admissions & UDISE+ APAAR Verification:</strong> Facilitate monthly student attendance calculations, admission verification statements, and APAAR ID tracking.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Client-Side Storage & PIN Security:</strong> Built-in IndexedDB offline attachments store and 4-digit PIN password protection ensure sensitive college records, faculty duties, and examination registers remain completely safe.
            </span>
          </li>
        </ul>
      </div>

      {/* License Status Card */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">LICENSE STATUS</span>
          <p className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Full Lifetime Registered License Active</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-indigo-400 font-mono">Build: March 2026 • Production Edition</span>
        </div>
      </div>
    </div>
  );
};
