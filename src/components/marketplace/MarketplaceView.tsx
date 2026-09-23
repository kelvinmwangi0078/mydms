import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, DesignerUser } from '../../types';
import {
  Search,
  Briefcase,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Layers,
  Palette,
} from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const {
    projects,
    designers,
    bids,
    currentUser,
    setIsPostProjectOpen,
    setBidModalData,
    setCurrentView,
    switchDemoRole,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Brand Identity',
    'UI/UX Design',
    'Packaging Design',
    'Illustration & 3D',
    'Print & Publication',
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredDesigners = designers.filter((d) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      d.skills.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchesSearch =
      d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kenya&apos;s Dedicated Creative Design &amp; Web Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Connecting Kenya&apos;s Finest Designers with Visionary Clients.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Meet Your Designer Management System (MYDMS) bridges the creative gap. Post design
              briefs, receive proposals, inspect portfolios, and pay securely via instant{' '}
              <strong className="text-white font-semibold">M-Pesa STK Push Escrow</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  switchDemoRole('client');
                  setIsPostProjectOpen(true);
                }}
                className="px-5 py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold shadow-md transition-colors flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>Post Design Brief</span>
              </button>

              <button
                onClick={() => {
                  switchDemoRole('designer');
                  setCurrentView('dashboard');
                }}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-blue-400" />
                <span>Join as Designer / Portfolio</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Verified Portfolios</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>Safaricom M-Pesa Daraja</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Escrow Milestone Protection</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, skills, designers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>
      </section>

      {/* Section 1: Active Open Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Open Design Briefs & Projects
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Clients seeking skilled graphic, packaging, and UI designers in Kenya
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {filteredProjects.length} Opportunities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const projectBids = bids.filter((b) => b.projectId === project.id);

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                      {project.category}
                    </span>
                    <span className="text-xs font-bold font-mono text-blue-900">
                      KES {project.budgetKes.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                      Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {project.deliverablesRequired.slice(0, 2).map((d, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Due: {project.deadline}</span>
                  </div>

                  {project.status === 'Pending' ? (
                    <button
                      onClick={() => {
                        switchDemoRole('designer');
                        setBidModalData({ isOpen: true, project });
                      }}
                      className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
                    >
                      <span>Submit Bid</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      {project.status}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Featured Verified Designers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Featured Verified Designers
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Graduates & professionals in Graphic, Packaging, Brand & Web Design
            </p>
          </div>
          <button
            onClick={() => {
              switchDemoRole('designer');
              setCurrentView('dashboard');
            }}
            className="text-xs font-semibold text-blue-900 hover:text-blue-950 flex items-center gap-1"
          >
            <span>View My Designer Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredDesigners.map((designer) => (
            <div
              key={designer.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={
                      designer.avatarUrl ||
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
                    }
                    alt={designer.fullName}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-900/10"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {designer.fullName}
                      </h3>
                      {designer.verified && (
                        <CheckCircle2 className="w-4 h-4 text-blue-900 fill-blue-50" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                      {designer.location}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{designer.rating}</span>
                      <span className="text-slate-400 font-normal">
                        ({designer.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {designer.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {designer.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-700 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Portfolio preview miniatures */}
                {designer.portfolio.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1.5">
                      Featured Project Art:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {designer.portfolio.slice(0, 2).map((item) => (
                        <div
                          key={item.id}
                          className="h-20 rounded-lg overflow-hidden border border-slate-200 relative group"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-1.5">
                            <span className="text-[9px] text-white font-medium truncate">
                              {item.title}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Starting Rate
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    KES {designer.hourlyRateKes.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => {
                    switchDemoRole('client');
                    setIsPostProjectOpen(true);
                  }}
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  Hire Designer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Why MYDMS? Grounded in Chapter 1 & 2 Gaps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Addressing Chapter 2 Freelance Gaps
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Engineered Specifically for the Kenyan Design Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Global gig platforms charge up to 20% in conversion fees and lack local mobile money
              rails. MYDMS offers tailor-made infrastructure for clients and creative artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Safaricom M-Pesa STK Escrow</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay directly from your mobile phone. Funds are held in tamper-proof project escrow and
                disbursed only after you review and approve design deliverables.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Verified Designer Credibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Portfolios are screened for technical excellence, visual originality, and production readiness. Detailed client
                ratings and reviews build lasting professional trust.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Escrow Dispute Resolution</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated administration control panel provides active arbitration, milestone
                checks, and fair outcomes for both clients and creative professionals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
