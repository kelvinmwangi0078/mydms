import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Palette,
  Shield,
  Smartphone,
  Lock,
  CheckCircle2,
  ArrowRight,
  Zap,
  HelpCircle,
  FileCheck,
  DollarSign,
  Clock,
  Sparkles,
  ChevronRight,
  LogIn,
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { setCurrentView, openAuthModal } = useApp();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: 1,
      title: '1. Client Posts Project Brief',
      role: 'Client Action',
      roleBadge: 'bg-blue-100 text-blue-900 border-blue-200',
      summary: 'Define your creative vision, deliverables checklist, deadline, and KES budget.',
      details:
        'Clients start by posting a structured brief specifying design categories (Brand Identity, UI/UX, Packaging, Marketing Collateral). You outline exact file requirements (vector SVG, Figma tokens, print-ready PDF), turnaround expectations, and target budget in Kenyan Shillings.',
      highlight: 'Clear requirements prevent scope creep and ensure tailored proposals.',
      preview: {
        title: 'Fintech Mobile App UI/UX Redesign',
        budget: 'KES 85,000 (Milestone Escrow)',
        timeline: '14 Days delivery',
        deliverables: ['Figma Design System', 'Dark/Light Theme UI', 'Clickable Prototype'],
      },
    },
    {
      step: 2,
      title: '2. Verified Designers Submit Bids',
      role: 'Designer Action',
      roleBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      summary: 'Explore verified commercial case studies, reviews, and competitive proposals.',
      details:
        'Vetted Kenyan designers evaluate the published brief and submit tailored proposals with precise turnaround schedules and itemized pricing. Clients can inspect each designer’s authenticated portfolio, verified badge status, and previous client satisfaction ratings before deciding.',
      highlight: 'Transparent pricing with pre-vetted local creative talent.',
      preview: {
        bidder: 'Kelvin Mwangi (Senior UI/UX Specialist)',
        rating: '4.9 ★ (34 Completed Projects)',
        proposal: 'Will deliver full responsive design tokens and high-fidelity prototype in Figma.',
        offer: 'KES 80,000 · 12 Days delivery',
      },
    },
    {
      step: 3,
      title: '3. Safaricom M-Pesa STK Escrow Lock',
      role: 'Client & M-Pesa Daraja',
      roleBadge: 'bg-blue-100 text-blue-900 border-blue-200',
      summary: 'Funds are securely deposited via Daraja STK Push into platform escrow.',
      details:
        'Once a client selects the winning proposal, the system triggers a native Safaricom Daraja STK Push directly to their mobile phone. The client authorizes the transaction with their secret M-Pesa PIN. Funds are held in escrow—reassuring the designer that money is committed before work begins.',
      highlight: '100% financial protection; funds remain locked until client sign-off.',
      preview: {
        receipt: 'Daraja STK Callback: QKD710928M',
        phone: '+254 712 *** 890',
        amount: 'KES 80,000 Escrow Protected',
        status: 'Escrow Locked · Project Active',
      },
    },
    {
      step: 4,
      title: '4. Collaboration & Asset Upload',
      role: 'Designer & Client',
      roleBadge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      summary: 'Direct messaging, milestone reviews, and final design package uploads.',
      details:
        'The designer executes the project milestones while maintaining real-time communication with the client via built-in direct messaging. Work-in-progress snapshots can be reviewed, and upon completion, the designer packages source files (AI, PSD, Figma links, SVG) for client inspection.',
      highlight: 'Direct real-time communication without third-party email delays.',
      preview: {
        fileName: 'safari-pay-design-tokens-v2.zip',
        fileSize: '48.2 MB (Production Bundle)',
        notes: 'Includes Figma tokens, dark/light variants, and vector SVG iconography.',
        revisions: 'Round 1 Client Review Completed',
      },
    },
    {
      step: 5,
      title: '5. Milestone Sign-off & Instant Payout',
      role: 'Client & Escrow Settlement',
      roleBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      summary: 'Client approves deliverables, triggering instant M-Pesa disbursement.',
      details:
        'The client reviews the submitted design files. Once satisfied, a single click releases the escrow funds. The system instantly disburses the payment directly to the designer’s M-Pesa phone number with 0% foreign exchange losses. The client leaves feedback and a 5-star rating.',
      highlight: 'Zero waiting periods, zero withdrawal fees, instant mobile money receipt.',
      preview: {
        disbursement: 'KES 80,000 sent to Designer M-Pesa (+254 712 345 678)',
        transactionId: 'MPESA-QKD992314F',
        review: '5.0 ★ "Exceptional design execution and lightning-fast delivery!"',
        status: 'Project Completed Successfully',
      },
    },
  ];

  const faqs = [
    {
      q: 'How does the Safaricom M-Pesa Escrow protect both parties?',
      a: 'For designers, escrow proves the client has paid and funds are guaranteed before work starts. For clients, funds are not released until you inspect the submitted artwork and approve the deliverables.',
    },
    {
      q: 'Why is MYDMS better than global platforms like Upwork or Fiverr?',
      a: 'Global platforms charge 10%–20% commission and convert USD to KES at poor foreign exchange rates with days of withdrawal delay. MYDMS operates natively in Kenyan Shillings (KES) with direct M-Pesa integration and zero FX loss.',
    },
    {
      q: 'What happens if a revision or disagreement occurs?',
      a: 'Clients can request revisions directly on submitted milestones. In the rare event of an unresolvable dispute, the platform Administrator reviews the brief, deliverable history, and chat logs to mediate a fair resolution or full escrow refund.',
    },
    {
      q: 'How are designers verified on MYDMS?',
      a: 'Every designer undergoes portfolio authentication, previous commercial work evaluation, and identity checks before earning the Verified Designer badge.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Transparent 5-Stage System Workflow</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              How MYDMS Works
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              From posting your initial design brief to instant Safaricom M-Pesa payout, our platform
              enforces escrow safety, clear milestones, and verified designer execution.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentView('marketplace')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Browse Design Marketplace</span>
              </button>
              <button
                onClick={() => openAuthModal('client', 'register')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Post a Design Brief</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE 5-STAGE LIFECYCLE EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            The 5-Stage Milestone Lifecycle
          </h2>
          <p className="text-sm text-slate-500">
            Click through any of the 5 stages below to examine the process, responsibilities, and live data model:
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {steps.map((s, index) => {
            const isSelected = activeStep === index;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(index)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-500/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-blue-800 text-blue-200' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Step 0{s.step}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-300" />}
                </div>
                <div className="font-bold text-xs truncate">{s.title.split('. ')[1]}</div>
                <div
                  className={`text-[11px] truncate mt-0.5 ${
                    isSelected ? 'text-blue-200' : 'text-slate-500'
                  }`}
                >
                  {s.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left: Stage Explanation */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border ${steps[activeStep].roleBadge}`}
                  >
                    {steps[activeStep].role}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Phase 0{steps[activeStep].step} of 05
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {steps[activeStep].title}
                </h3>
                <p className="text-sm font-medium text-blue-900">
                  {steps[activeStep].summary}
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {steps[activeStep].details}
              </p>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-blue-900">Milestone Guarantee:</strong>
                  <span>{steps[activeStep].highlight}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  ← Previous Step
                </button>
                <span className="text-slate-400 font-mono">Stage {activeStep + 1} / 5</span>
                <button
                  disabled={activeStep === 4}
                  onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
                  className="px-3 py-1.5 rounded-lg bg-blue-900 text-white hover:bg-blue-950 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                >
                  Next Step →
                </button>
              </div>
            </div>

            {/* Right: Live Data Mockup */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-slate-300">Live Stage Preview</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Step 0{activeStep + 1} Data</span>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 space-y-3 font-mono text-xs">
                  {Object.entries(steps[activeStep].preview).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                        {key.replace(/([A-Z])/g, ' $1')}:
                      </span>
                      {Array.isArray(val) ? (
                        <div className="flex flex-wrap gap-1.5">
                          {val.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-slate-700 text-blue-200 text-[11px]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-white font-medium block">{String(val)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Daraja API Status: Online</span>
                <span className="text-emerald-400">Escrow Validated ✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE-USER ROLES COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Platform Roles &amp; Responsibilities
          </h2>
          <p className="text-sm text-slate-500">
            Every user account belongs to a dedicated role with explicit actions and dashboard features:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CLIENT */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">For Clients</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                <span>Post projects with custom budgets in KES.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                <span>Review designer proposals &amp; portfolios.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                <span>Lock milestone funds safely with M-Pesa STK push.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                <span>Approve deliverables and rate designer work.</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => openAuthModal('client', 'register')}
                className="w-full py-2 px-3 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Sign In as Client
              </button>
            </div>
          </div>

          {/* DESIGNER */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">For Designers</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Build a public portfolio with client case studies.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Submit competitive bids on open design briefs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Collaborate via messaging &amp; upload deliverables.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Receive instant payout to your M-Pesa account.</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => openAuthModal('designer', 'register')}
                className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Sign In as Designer
              </button>
            </div>
          </div>

          {/* ADMINISTRATOR */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">For Administrators</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                <span>Real-time audit of M-Pesa escrow balances.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                <span>Verify designer portfolios &amp; issue badges.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                <span>Fair dispute resolution &amp; escrow refund release.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                <span>Platform governance &amp; quality standards enforcement.</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => openAuthModal('admin', 'login')}
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Admin Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900">
            <HelpCircle className="w-4 h-4 text-blue-900" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2"
            >
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold flex items-center justify-center shrink-0">
                  ?
                </span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
