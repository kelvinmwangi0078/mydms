import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Palette,
  Briefcase,
  Shield,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck,
  MessageSquare,
  Star,
  Users,
  Lock,
  ChevronRight,
  DollarSign,
  Send,
  Zap,
  Award,
  Eye,
  LogIn,
  UserPlus,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setCurrentView,
    openAuthModal,
    loginAndNavigate,
    setIsPostProjectOpen,
    projects,
    designers,
    clients,
    payments,
  } = useApp();

  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);

  const workflowSteps = [
    {
      step: 1,
      title: 'Client Posts Design Brief',
      actor: 'Client',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      description:
        'The client creates a structured project specification indicating category (Brand Identity, UI/UX, Packaging), deliverables required, strict deadline, and proposed budget in Kenyan Shillings (KES).',
      highlight: 'Structured deliverable checklist + clear budget expectations.',
      preview: {
        title: 'FinTech Mobile Banking UI/UX Design System',
        category: 'UI/UX Design',
        budget: 'KES 85,000',
        deadline: '14 Days',
        deliverables: ['Figma Design System', 'Clickable Prototype', 'iOS & Android Tokens'],
      },
    },
    {
      step: 2,
      title: 'Vetted Designers Submit Bids',
      actor: 'Designer',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      description:
        'Verified digital designers review open project briefs on the Marketplace and submit tailored proposals with competitive quotes, proposed turnaround times, and links to verified portfolio case studies.',
      highlight: 'Zero bidding spam; transparent ratings and verified badges.',
      preview: {
        designerName: 'Kelvin Mwangi Wambui',
        rating: '5.0 ★ (18 Reviews)',
        bidAmount: 'KES 75,000',
        turnaround: '10 Days',
        pitch: 'Specialized in scalable fintech design tokens and mobile design systems with 100% on-time delivery record.',
      },
    },
    {
      step: 3,
      title: 'M-Pesa STK Push Escrow Lock',
      actor: 'Client & Safaricom',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
      description:
        'The client accepts the preferred designer proposal. The system triggers Safaricom Daraja STK push to the client’s handset (+254 7XX). Funds are locked into secure platform escrow before work commences.',
      highlight: 'Funds guaranteed in escrow; protected from non-delivery or non-payment.',
      preview: {
        gateway: 'Safaricom Daraja 2.0 Lipa Na M-Pesa Online',
        shortcode: '174379 (Escrow Pool)',
        stkPrompt: 'Enter M-Pesa PIN on phone to reserve KES 75,000 in escrow',
        status: 'Status: Escrow Locked (Project State → Active)',
      },
    },
    {
      step: 4,
      title: 'Collaboration & Milestone Submission',
      actor: 'Designer & Client',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
      description:
        'The matched designer and client communicate directly through real-time encrypted messaging. Once completed, the designer uploads high-resolution production assets and version release notes.',
      highlight: 'Direct channel messaging + complete deliverable asset archiving.',
      preview: {
        channel: 'Direct Messaging Workspace: Sarah Wanjiku ↔ Kelvin Mwangi',
        fileSubmitted: 'fintech-design-system-v2.0-final.zip (148.2 MB)',
        notes: 'Includes Figma tokens, dark/light variants, and vector SVG iconography.',
      },
    },
    {
      step: 5,
      title: 'Approval & Instant M-Pesa Payout',
      actor: 'Client & Admin',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      description:
        'The client inspects and approves the submitted artwork deliverables. The escrow contract immediately releases the full milestone payment directly to the designer’s M-Pesa phone, and a 5-star review is published.',
      highlight: 'Zero withdrawal delays; instant mobile money receipt with 0% foreign exchange loss.',
      preview: {
        receiptNumber: 'QKD710928M (Safaricom Daraja Confirmed)',
        disbursement: 'KES 75,000 sent to +254 712 345 678',
        review: '5.0 ★ "Exceptional design quality and lightning fast delivery!"',
      },
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,58,138,0.35),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Meet Your Designer Management System
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              A specialized creative marketplace connecting corporate clients with verified Kenyan graphic,
              brand, and UI/UX designers. Engineered with role-based governance for <strong className="text-white">Clients</strong>,{' '}
              <strong className="text-white">Designers</strong>, and <strong className="text-white">Administrators</strong> — with
              guaranteed milestone security through Safaricom M-Pesa escrow.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => openAuthModal('client', 'register')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Get Started as Client</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openAuthModal('designer', 'register')}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Palette className="w-4 h-4 text-blue-400" />
                <span>Get Started as Designer</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3.5 bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>How It Works</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 block">Milestone Protection</span>
                <span className="text-white font-bold text-sm">100% Escrow Secured</span>
              </div>
              <div>
                <span className="text-slate-400 block">Payment Rails</span>
                <span className="text-white font-bold text-sm">M-Pesa STK Push (KES)</span>
              </div>
              <div>
                <span className="text-slate-400 block">Foreign Exchange Fee</span>
                <span className="text-emerald-400 font-bold text-sm">0% FX Deduction</span>
              </div>
              <div>
                <span className="text-slate-400 block">Verified Talent</span>
                <span className="text-white font-bold text-sm">Pre-vetted Creatives</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE SYSTEM USERS (DOCUMENTED ROLES BREAKDOWN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-200">
            <Users className="w-3.5 h-3.5" />
            <span>Documented User Roles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Three Dedicated User Experiences in One Unified System
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            As documented in the platform specifications, MYDMS governs three distinct user roles.
            Each role possesses tailored permissions, dedicated dashboards, and explicit workflow responsibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* USER 1: CLIENT */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-blue-400 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-sm">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                  Role: Client
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  The Client (Project Hirer)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Businesses, enterprises, marketing managers, and founders commissioning creative design work.
                </p>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                  Documented Responsibilities:
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span>Create &amp; publish project briefs with scope, deadline &amp; KES budget.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span>Compare designer proposals, delivery schedules, and portfolio case studies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span>Authorize Safaricom M-Pesa STK push to lock milestone funds in escrow.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                    <span>Coordinate via real-time messaging, review deliverables &amp; release payment.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => openAuthModal('client', 'login')}
                className="w-full py-2.5 px-4 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Client Sign In / Register</span>
              </button>
            </div>
          </div>

          {/* USER 2: DESIGNER */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-emerald-400 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <Palette className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                  Role: Designer
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  The Designer (Creative Talent)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Graphic designers, UI/UX engineers, packaging creators, brand strategists, and 3D artists.
                </p>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                  Documented Responsibilities:
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Curate verified portfolio gallery with past commercial case studies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Explore open marketplace briefs and submit competitive bids with delivery timeline.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Collaborate with client via direct messaging and upload final vector/design archives.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Receive instant Safaricom M-Pesa disbursement upon client deliverable sign-off.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => openAuthModal('designer', 'login')}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Designer Sign In / Register</span>
              </button>
            </div>
          </div>

          {/* USER 3: ADMINISTRATOR */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-slate-800 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-900 border border-slate-300">
                  Role: Administrator
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  The Administrator (Governance)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Platform operations, escrow auditing, dispute arbitration, and designer verification authority.
                </p>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                  Documented Responsibilities:
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                    <span>Real-time audit of M-Pesa escrow balances and Daraja transaction receipts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                    <span>Evaluate designer portfolios &amp; issue verified badges to authentic talent.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                    <span>Arbitrate milestone disputes with power to release or refund locked escrow funds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                    <span>Broadcast operational notices and execute QA system verification test cases.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => openAuthModal('admin', 'login')}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Admin Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW THE SYSTEM WORKS (INTERACTIVE LIFECYCLE AS DOCUMENTED) */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-blue-900 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4 text-blue-800" />
                <span>End-to-End System Workflow</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                How MYDMS Operates (Documented 5-Stage Lifecycle)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
                From project initiation to final Safaricom M-Pesa settlement, every step enforces milestone
                safety and transparent role execution.
              </p>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Click any stage below to inspect the live data model:
            </div>
          </div>

          {/* Workflow Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {workflowSteps.map((s, index) => {
              const isSelected = activeWorkflowStep === index;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveWorkflowStep(index)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-500/40'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-blue-800 text-blue-200' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Step 0{s.step}
                    </span>
                    <span className="text-[10px] opacity-80">{s.actor}</span>
                  </div>
                  <div className="text-xs font-bold leading-tight line-clamp-1">{s.title}</div>
                </button>
              );
            })}
          </div>

          {/* Interactive Inspection Card for Selected Stage */}
          {(() => {
            const current = workflowSteps[activeWorkflowStep];
            return (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${current.badgeColor}`}>
                      Stage {current.step} of 5 · {current.actor}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Documented Specification</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{current.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{current.description}</p>

                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <strong className="text-blue-900 font-semibold block">Key System Rule &amp; Guarantee:</strong>
                    <p className="text-slate-700">{current.highlight}</p>
                  </div>
                </div>

                {/* Right: Simulated System Artifact / Terminal */}
                <div className="lg:col-span-6 bg-slate-900 text-slate-200 rounded-xl p-5 border border-slate-800 font-mono text-xs shadow-inner space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                      <span>MYDMS Live State Machine Simulation</span>
                    </span>
                    <span className="text-blue-400">Step {current.step} Artifact</span>
                  </div>

                  <div className="space-y-2 pt-1 text-[11px] leading-relaxed">
                    {Object.entries(current.preview).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="text-slate-400 capitalize w-28 shrink-0">{key}:</span>
                        <span className="text-slate-100 font-semibold break-words">
                          {Array.isArray(value) ? value.join(' • ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Verified via Safaricom Daraja v2 &amp; PostgreSQL Ledger</span>
                    <span className="text-emerald-400">Audit Status: VALID</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 4. COMPREHENSIVE "GET STARTED" ONBOARDING PORTAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-blue-900/50">
          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
                Ready to Experience MYDMS?
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Choose Your Role and Get Started Immediately
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Whether you are a client with a new design brief or a designer looking to submit quotes and get
                paid in Kenyan Shillings, MYDMS is ready for immediate test drive or production onboarding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Client Action Box */}
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Briefcase className="w-5 h-5" />
                    <h3 className="font-bold text-base text-white">For Clients (Post &amp; Hire)</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Have a corporate logo, brand book, website UI, or packaging job? Post your brief in minutes,
                    review proposals from verified designers, and deposit securely via M-Pesa.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => openAuthModal('client', 'register')}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Post a Project Brief</span>
                  </button>
                  <button
                    onClick={() => openAuthModal('client', 'login')}
                    className="w-full py-2.5 px-4 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Client Sign In / Register</span>
                  </button>
                </div>
              </div>

              {/* Designer Action Box */}
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Palette className="w-5 h-5" />
                    <h3 className="font-bold text-base text-white">For Designers (Bid &amp; Earn)</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Showcase your creative portfolio, place competitive bids on live client briefs, coordinate
                    deliverables, and receive direct M-Pesa payouts upon project sign-off.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setCurrentView('marketplace')}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Palette className="w-4 h-4" />
                    <span>Browse Open Briefs</span>
                  </button>
                  <button
                    onClick={() => openAuthModal('designer', 'login')}
                    className="w-full py-2.5 px-4 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Designer Sign In / Register</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SYSTEM GUARANTEES & VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Daraja 2.0 Lipa Na M-Pesa</h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              Real-time STK push prompts with sub-4-second callback verification. Built natively for Kenya’s mobile economy with 0% FX loss.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Escrow State Machine</h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              Guarantees designer payments before work begins, while holding funds safely until the client inspects and approves deliverables.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Verified Designer Badges</h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              Every designer profile showcases authenticated commercial projects, client ratings, and administrative credential checks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
