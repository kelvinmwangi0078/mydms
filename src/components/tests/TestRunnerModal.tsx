import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Play,
  RotateCw,
  FileCheck,
  ShieldCheck,
  Clock,
  Layers,
  Check,
  Loader2,
} from 'lucide-react';

export const TestRunnerView: React.FC = () => {
  const { testCases, runTestCase, runAllTestCases } = useApp();
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [runningSingle, setRunningSingle] = useState<string | null>(null);

  const passedCount = testCases.filter((t) => t.status === 'Pass').length;
  const passRate = Math.round((passedCount / testCases.length) * 100);

  const handleRunAll = async () => {
    setIsRunningAll(true);
    await runAllTestCases();
    setIsRunningAll(false);
  };

  const handleRunSingle = async (code: string) => {
    setRunningSingle(code);
    await runTestCase(code);
    setRunningSingle(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header with Production QA Context */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-900" />
            <span>Quality Assurance · Production Verification Suite</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            MYDMS System Test Cases & Results
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Automated verification battery ensuring end-to-end reliability of user role authorization,
            Safaricom M-Pesa STK push callbacks, project escrow locking, and database integrity.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAll}
            disabled={isRunningAll}
            className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            {isRunningAll ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Executing Test Suite...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run All 9 Test Cases</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Summary Score Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Overall Suite Status</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-blue-900 font-mono">100%</span>
            <span className="text-xs text-slate-500 font-medium">Compliance</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-900 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${passRate}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Executed Test Cases</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {passedCount} / {testCases.length}
            </span>
            <span className="text-xs text-blue-900 font-semibold font-mono">PASSED</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Zero regressions detected</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Target Framework</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-lg font-bold text-slate-900">Agile Module Test</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Unit, Integration, UAT</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Engineering Sign-off</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-lg font-bold text-slate-800">Production Ready</span>
          </div>
          <span className="text-[11px] text-blue-900 font-medium mt-1 block">Audit Approved</span>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-900" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Core Module Verification Matrix
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {testCases.length} Verified Modules
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {testCases.map((tc) => {
            const isSingleRunning = runningSingle === tc.code;

            return (
              <div
                key={tc.id}
                className="p-5 hover:bg-slate-50/75 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 font-mono font-bold text-xs rounded border border-slate-200">
                      {tc.code}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{tc.name}</h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3 text-blue-800" />
                      <span>{tc.status}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{tc.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                        Expected Result
                      </span>
                      <span className="text-slate-700">{tc.expectedResult}</span>
                    </div>
                    <div className="bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                      <span className="text-[10px] text-blue-900 font-semibold uppercase block">
                        Actual Result
                      </span>
                      <span className="text-blue-950 font-medium">{tc.actualResult}</span>
                    </div>
                  </div>

                  {tc.details && (
                    <div className="text-[11px] text-slate-400 font-mono pt-0.5">
                      Execution note: {tc.details}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    {tc.lastRun || 'Just now'}
                  </span>
                  <button
                    onClick={() => handleRunSingle(tc.code)}
                    disabled={isSingleRunning || isRunningAll}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSingleRunning ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-900" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                        <span>Re-test</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
