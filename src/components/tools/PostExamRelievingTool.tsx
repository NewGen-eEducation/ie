import React, { useState } from 'react';
import { Printer, ArrowLeft, Award, FileText, CheckCircle } from 'lucide-react';

interface PostExamRelievingToolProps {
  initialType?: string;
  onBack: () => void;
}

export const PostExamRelievingTool: React.FC<PostExamRelievingToolProps> = ({
  initialType = 'relieving',
  onBack,
}) => {
  const [docType, setDocType] = useState<string>(initialType);
  const [centerCode, setCenterCode] = useState<string>('25101');
  const [collegeName, setCollegeName] = useState<string>('Govt Junior College, Secunderabad');
  const [district, setDistrict] = useState<string>('Hyderabad');
  const [csName, setCsName] = useState<string>('Dr. G. Sathish Kumar');

  // Relieving Details
  const [personName, setPersonName] = useState<string>('Sri. M. Venkat Rao');
  const [personRole, setPersonRole] = useState<string>('Departmental Officer');
  const [parentCollege, setParentCollege] = useState<string>('GJC Malkajgiri, Medchal Dist');
  const [startDate, setStartDate] = useState<string>('01-03-2026');
  const [endDate, setEndDate] = useState<string>('24-03-2026');
  const [conduct, setConduct] = useState<string>('Satisfactory and Exemplary');

  // Transportation Details
  const [vehicleNo, setVehicleNo] = useState<string>('TS 10 UB 4590');
  const [distanceKm, setDistanceKm] = useState<number>(36);
  const [transportAmount, setTransportAmount] = useState<number>(1450);

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
            <h2 className="text-base font-bold text-slate-900">Post-Exam Relieving & Duty Certificates</h2>
            <p className="text-xs text-slate-500">Official relieving letters, DIEO camp material submission & vehicle claims</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Certificate</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-print border-b border-slate-200">
        {[
          { id: 'relieving', label: '1. Relieving & Duty Certificate' },
          { id: 'post_material', label: '2. Post Material Submission to DIEO' },
          { id: 'spot_valuation', label: '3. Spot Valuation Relieving' },
          { id: 'transport', label: '4. Transportation Charges Certificate' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setDocType(tab.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
              docType === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Configuration Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3 no-print">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Center Code & College</label>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={centerCode}
              onChange={(e) => setCenterCode(e.target.value)}
              className="w-20 px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold"
            />
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Relieved Person Name</label>
          <input
            type="text"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Designation & Role</label>
          <input
            type="text"
            value={personRole}
            onChange={(e) => setPersonRole(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">Duty Period (From - To)</label>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-1/2 px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-1/2 px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* DOCUMENT 1: Relieving & Duty Certificate */}
      {docType === 'relieving' && (
        <div className="bg-white p-8 md:p-12 rounded-xl border-2 border-slate-800 shadow-sm max-w-3xl mx-auto print-area text-slate-900 leading-relaxed font-serif">
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-8">
            <h1 className="text-xs font-bold uppercase tracking-wider text-slate-700">GOVERNMENT OF TELANGANA</h1>
            <h2 className="text-base font-black uppercase text-slate-950 mt-1">OFFICE OF THE CHIEF SUPERINTENDENT</h2>
            <h3 className="text-xs font-bold text-slate-800 uppercase mt-0.5">
              {collegeName} [CENTER CODE: {centerCode}]
            </h3>
            <p className="text-[11px] text-slate-600">{district} District, Telangana State.</p>
          </div>

          <div className="text-center my-6">
            <h4 className="text-sm font-black uppercase tracking-wider border-2 border-slate-900 inline-block px-6 py-1.5 rounded bg-slate-50 font-sans">
              DUTY & RELIEVING CERTIFICATE
            </h4>
          </div>

          <div className="text-xs leading-loose text-justify space-y-4 my-8">
            <p>
              This is to certify that <strong>{personName}</strong>, {personRole}, working at <strong>{parentCollege}</strong> has reported for duty at this examination center (Center Code: <strong>{centerCode}</strong>) on the Forenoon of <strong>{startDate}</strong> in connection with the conduct of <strong>Intermediate Public Examinations March 2026</strong>.
            </p>
            <p>
              He / She has performed his/her statutory examination duties diligently from <strong>{startDate}</strong> to <strong>{endDate}</strong> (Total 14 Sessions).
            </p>
            <p>
              He / She is hereby relieved of his/her duties at this center on the Afternoon of <strong>{endDate}</strong> with instructions to report back to his/her parent institution.
            </p>
            <p>
              During the above period, his/her conduct, integrity, and devotion to examination duty have been <strong>{conduct}</strong>.
            </p>
          </div>

          <div className="mt-20 flex justify-between items-end text-xs font-sans">
            <div>
              <p className="text-[11px] text-slate-500">Date: {endDate}</p>
              <p className="text-[11px] text-slate-500">Place: {collegeName}</p>
            </div>
            <div className="text-center">
              <div className="h-10"></div>
              <p className="font-bold">({csName})</p>
              <p className="text-[11px] text-slate-600">Chief Superintendent & Principal</p>
              <p className="text-[10px] text-slate-500">Center Code: {centerCode}</p>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT 2: Post Material Submission Letter */}
      {docType === 'post_material' && (
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-300 shadow-sm max-w-3xl mx-auto print-area text-slate-900 leading-relaxed font-serif">
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <h1 className="text-xs font-bold uppercase text-slate-700">GOVERNMENT OF TELANGANA</h1>
            <h2 className="text-base font-black uppercase text-slate-950 mt-1">OFFICE OF THE CHIEF SUPERINTENDENT</h2>
            <h3 className="text-xs font-bold text-slate-800 uppercase mt-0.5">{collegeName} [CENTER CODE: {centerCode}]</h3>
          </div>

          <div className="flex justify-between items-center text-xs font-mono mb-4">
            <span>Rc.No. CS/IPE-2026/Post-Material</span>
            <span>Date: {endDate}</span>
          </div>

          <div className="text-xs whitespace-pre-line mb-4 font-sans">
            To
            The District Intermediate Educational Officer (DIEO) / Convener DEC,
            {district} District, Telangana State.
          </div>

          <div className="text-xs font-bold mb-4 font-sans pl-2 border-l-2 border-slate-700">
            Sub: TGBIE - IPE March 2026 - Handing over of Post-Examination Unused Confidential Stationery, Used Registers & Vouchers pertaining to Center Code: {centerCode} - Reg.
          </div>

          <div className="text-xs leading-relaxed text-justify mb-4">
            Sir,
            I am herewith submitting the sealed packets containing all the remaining unused examination stationery, registers, vouchers, and accounts of Center Code <strong>{centerCode}</strong> after the successful and peaceful completion of the Intermediate Public Examinations March 2026:
          </div>

          <ol className="list-decimal pl-6 text-xs space-y-1 font-sans">
            <li>Consolidated Annexure I, II & III Registers (Signed jointly by CS & DO).</li>
            <li>Departmental Officer Question Paper Custody & Opening Register.</li>
            <li>Postal Speed Post Insured Receipts & Part-I OMR Statements.</li>
            <li>Invigilators Attendance, Lottery Register & Candidate Movement Logs.</li>
            <li>Unused Main Answer Books (OMRs) sealed packet (Qty: ______ books).</li>
            <li>Unused Blank Barcodes buffer packet (Qty: ______ barcodes).</li>
            <li>Consolidated TA/DA & Remuneration Bills along with verified vouchers.</li>
          </ol>

          <p className="text-xs mt-4">Kindly acknowledge receipt of the material.</p>

          <div className="mt-14 flex justify-between items-end text-xs font-sans">
            <div className="border border-dashed border-slate-400 p-2 text-center text-[10px] w-48">
              <p className="font-bold">Received the Material:</p>
              <div className="h-8"></div>
              <p>DIEO Camp In-charge Signature</p>
            </div>
            <div className="text-center">
              <p className="font-bold">({csName})</p>
              <p className="text-[11px] text-slate-600">Chief Superintendent</p>
              <p className="text-[10px] text-slate-500">Center Code: {centerCode}</p>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT 3: Spot Valuation Relieving */}
      {docType === 'spot_valuation' && (
        <div className="bg-white p-8 md:p-12 rounded-xl border-2 border-slate-800 shadow-sm max-w-3xl mx-auto print-area text-slate-900 leading-relaxed font-serif">
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-8">
            <h1 className="text-xs font-bold uppercase text-slate-700">TELANGANA BOARD OF INTERMEDIATE EDUCATION</h1>
            <h2 className="text-base font-black uppercase text-slate-950 mt-1">SPOT VALUATION CAMP — RELIEVING CERTIFICATE</h2>
            <p className="text-xs font-bold text-slate-800 uppercase mt-0.5">{collegeName} Camp</p>
          </div>

          <div className="text-xs leading-loose text-justify space-y-4 my-8">
            <p>
              This is to certify that <strong>{personName}</strong>, Junior Lecturer in <strong>English</strong>, working at <strong>{parentCollege}</strong> has attended the Spot Valuation Camp as an <strong>Assistant Examiner (AE)</strong> from <strong>{startDate}</strong> to <strong>{endDate}</strong>.
            </p>
            <p>
              He / She has valued <strong>480</strong> answer scripts allotted to his/her bundle and completed the tabulation and entry verification satisfactorily.
            </p>
            <p>
              He / She is relieved from the Spot Valuation Camp on the Afternoon of <strong>{endDate}</strong>.
            </p>
          </div>

          <div className="mt-20 flex justify-between items-end text-xs font-sans">
            <p className="text-[11px] text-slate-500">Date: {endDate}</p>
            <div className="text-center">
              <div className="h-10"></div>
              <p className="font-bold">Camp Officer / Special Officer</p>
              <p className="text-[11px] text-slate-600">Spot Valuation Camp, {district}</p>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT 4: Transportation Certificate */}
      {docType === 'transport' && (
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-300 shadow-sm max-w-3xl mx-auto print-area text-slate-900 leading-relaxed font-serif">
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <h1 className="text-xs font-bold uppercase text-slate-700">TGBIE — IPE MARCH 2026</h1>
            <h2 className="text-base font-black uppercase text-slate-950 mt-1">MATERIAL TRANSPORTATION VEHICLE CHARGES CERTIFICATE</h2>
            <p className="text-xs font-bold text-slate-800">CENTER CODE: {centerCode}</p>
          </div>

          <div className="space-y-4 text-xs font-sans leading-relaxed my-6">
            <p>
              Certified that Auto/Taxi vehicle bearing registration number <strong>{vehicleNo}</strong> was officially hired for transporting confidential examination question papers from the Police Strong Room to Center Code: <strong>{centerCode}</strong> and for daily dispatch of answer script bundles to the Head Post Office.
            </p>
            <div className="bg-slate-50 p-4 rounded border border-slate-200">
              <p>Total distance traversed during examination days: <strong>{distanceKm} km</strong></p>
              <p className="mt-1">Total conveyance amount incurred: <strong>₹ {transportAmount}</strong></p>
            </div>
            <p className="text-justify">
              Certified that no government vehicle was available for this purpose and the expenditure incurred is legitimate and strictly within the ceiling limits sanctioned by the TGBIE.
            </p>
          </div>

          <div className="mt-16 flex justify-between items-end text-xs font-sans">
            <div>
              <p className="font-bold">Departmental Officer (DO)</p>
            </div>
            <div className="text-center">
              <p className="font-bold">Chief Superintendent (CS)</p>
              <p className="text-[10px] text-slate-500">{collegeName}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
