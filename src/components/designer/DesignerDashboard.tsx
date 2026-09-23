import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, PortfolioItem } from '../../types';
import {
  Palette,
  Briefcase,
  Star,
  CheckCircle2,
  Clock,
  DollarSign,
  Upload,
  Plus,
  ExternalLink,
  MessageSquare,
  FileCheck,
  Send,
  Award,
} from 'lucide-react';

export const DesignerDashboard: React.FC = () => {
  const {
    currentUser,
    projects,
    bids,
    payments,
    feedbacks,
    submitDeliverable,
    setCurrentView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'jobs' | 'bids' | 'portfolio' | 'earnings' | 'reviews'>('jobs');
  const [selectedJobToDeliver, setSelectedJobToDeliver] = useState<Project | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [deliverableNotes, setDeliverableNotes] = useState('');
  const [isSubmittingWork, setIsSubmittingWork] = useState(false);

  // New portfolio state
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCat, setNewPortCat] = useState('Brand Identity');
  const [newPortDesc, setNewPortDesc] = useState('');
  const [newPortImage, setNewPortImage] = useState('');
  const [customPortfolio, setCustomPortfolio] = useState<PortfolioItem[]>([]);

  const designer = currentUser;
  const myBids = bids.filter((b) => b.designerId === designer.id);
  const assignedProjects = projects.filter((p) => p.assignedDesignerId === designer.id);
  const activeJobs = assignedProjects.filter((p) => p.status === 'Active' || p.status === 'Under Review');
  const completedJobs = assignedProjects.filter((p) => p.status === 'Completed');
  const myEarnings = payments.filter((p) => p.designerId === designer.id);
  const totalEarnedKes = myEarnings.reduce((sum, p) => sum + p.amountKes, 0);
  const myFeedbacks = feedbacks.filter((f) => f.designerId === designer.id);

  // Designer portfolio items from user or initial
  const allPortfolioItems = [
    ...((designer as any).portfolio || []),
    ...customPortfolio,
  ];

  const handleDeliverableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobToDeliver || !fileUrl.trim() || !fileName.trim()) return;

    setIsSubmittingWork(true);
    setTimeout(() => {
      submitDeliverable(selectedJobToDeliver.id, fileUrl, fileName, deliverableNotes);
      setIsSubmittingWork(false);
      setSelectedJobToDeliver(null);
      setFileUrl('');
      setFileName('');
      setDeliverableNotes('');
    }, 600);
  };

  const handleAddPortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle || !newPortDesc) return;

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortTitle,
      category: newPortCat,
      description: newPortDesc,
      imageUrl:
        newPortImage.trim() ||
        'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&auto=format&fit=crop&q=80',
      completionDate: new Date().toISOString().split('T')[0],
      clientName: 'Direct Client Project',
    };

    setCustomPortfolio([newItem, ...customPortfolio]);
    setShowAddPortfolio(false);
    setNewPortTitle('');
    setNewPortDesc('');
    setNewPortImage('');
  };

  return (
    <div className="space-y-6">
      {/* Designer Header Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={
              designer.avatarUrl ||
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
            }
            alt={designer.fullName}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-900/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{designer.fullName}</h2>
              {(designer as any).verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  <CheckCircle2 className="w-3 h-3 text-blue-800" />
                  <span>Verified Designer</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 max-w-xl line-clamp-2 mt-0.5">
              {(designer as any).bio ||
                'Lead Visual & Digital Product Designer. Specializing in brand identity, UI/UX, and packaging architecture.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('marketplace')}
            className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Briefcase className="w-4 h-4" />
            <span>Find Open Projects</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Active Workspaces</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-blue-900 font-mono">
              {activeJobs.length}
            </span>
            <span className="text-xs text-blue-800 font-medium">In Progress</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Client Rating</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {(designer as any).rating || 4.9}
            </span>
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="ml-1 text-slate-500 font-sans">
                ({myFeedbacks.length || 18} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Delivered Projects</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {completedJobs.length || (designer as any).completedProjectsCount || 14}
            </span>
            <span className="text-xs text-slate-500">Completed</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total M-Pesa Earnings</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xs font-semibold text-slate-500 font-mono">KES</span>
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {totalEarnedKes.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl max-w-fit flex-wrap">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'jobs'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Jobs ({activeJobs.length})
        </button>
        <button
          onClick={() => setActiveTab('bids')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'bids'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Proposals ({myBids.length})
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'portfolio'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Portfolio Showcase ({allPortfolioItems.length})
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'earnings'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          M-Pesa Receipts ({myEarnings.length})
        </button>
      </div>

      {/* Tab: Active Jobs */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {activeJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-900">No Active Jobs Right Now</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore open marketplace projects to submit proposals and win clients.
              </p>
              <button
                onClick={() => setCurrentView('marketplace')}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Browse Marketplace Briefs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-blue-900">{job.category}</span>
                        <span>·</span>
                        <span>Client: {job.clientName}</span>
                        <span>·</span>
                        <span className="font-mono">Deadline: {job.deadline}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          job.status === 'Under Review'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-blue-50 text-blue-900'
                        }`}
                      >
                        {job.status === 'Under Review' ? 'Reviewing Submission' : 'In Production'}
                      </span>
                      <span className="text-sm font-bold font-mono text-blue-900">
                        KES {job.budgetKes.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

                  {/* Submission Status Indicator */}
                  {job.deliverableSubmission ? (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold text-slate-800">
                        <span>Submitted File: {job.deliverableSubmission.fileName}</span>
                        <span className="text-[10px] text-amber-700 uppercase font-mono">
                          {job.deliverableSubmission.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 italic">
                        &quot;{job.deliverableSubmission.notes}&quot;
                      </p>
                    </div>
                  ) : null}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => setCurrentView('messages')}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>Message {job.clientName}</span>
                    </button>

                    <button
                      onClick={() => setSelectedJobToDeliver(job)}
                      className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>
                        {job.deliverableSubmission ? 'Submit Revision' : 'Upload Deliverables'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Submitted Proposals */}
      {activeTab === 'bids' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Submitted Proposals & Bids Log
            </h3>
            <span className="text-xs text-slate-500 font-mono">{myBids.length} Total</span>
          </div>

          <div className="divide-y divide-slate-200">
            {myBids.map((bid) => {
              const project = projects.find((p) => p.id === bid.projectId);

              return (
                <div key={bid.id} className="p-5 hover:bg-slate-50 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Bid Date: {bid.bidDate}</span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {project?.title || 'Creative Project'}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold font-mono text-slate-900">
                        KES {bid.bidAmountKes.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">({bid.deliveryDays} days)</span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          bid.status === 'Accepted'
                            ? 'bg-blue-50 text-blue-900'
                            : bid.status === 'Rejected'
                            ? 'bg-red-50 text-red-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {bid.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                    &quot;{bid.bidMessage}&quot;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Portfolio Showcase */}
      {activeTab === 'portfolio' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showcasing verified creative portfolio pieces to attract potential clients.
            </p>
            <button
              onClick={() => setShowAddPortfolio(true)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Portfolio Work</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPortfolioItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                <div className="h-44 overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium rounded">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{item.clientName || 'Brand Identity'}</span>
                    <span>{item.completionDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: M-Pesa Receipts */}
      {activeTab === 'earnings' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              M-Pesa Daraja Payouts & Escrow Disbursements
            </h3>
            <span className="text-xs text-blue-900 font-mono font-bold">
              Total Received: KES {totalEarnedKes.toLocaleString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Receipt Code</th>
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Amount (KES)</th>
                  <th className="px-5 py-3">Date & Time</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {myEarnings.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-bold text-blue-900">
                      {pay.mpesaReceiptNumber}
                    </td>
                    <td className="px-5 py-3 font-sans text-slate-800">{pay.projectTitle}</td>
                    <td className="px-5 py-3 font-sans text-slate-600">{pay.clientName}</td>
                    <td className="px-5 py-3 font-bold text-slate-900">
                      KES {pay.amountKes.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-slate-500">{pay.paymentDate}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-900">
                        {pay.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Deliverable Submission Modal */}
      {selectedJobToDeliver && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Submit Project Deliverables</h3>
                <p className="text-[11px] text-slate-500">{selectedJobToDeliver.title}</p>
              </div>
              <button
                onClick={() => setSelectedJobToDeliver(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDeliverableSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deliverable File Name / Asset Label
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. savanna_pay_brand_assets_v2.zip or Figma Link"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cloud Asset URL / Figma / Drive Link
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://figma.com/file/... or Google Drive"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notes for the Client
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize the files uploaded, instructions on opening dielines, color profiles, or password if applicable..."
                  value={deliverableNotes}
                  onChange={(e) => setDeliverableNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedJobToDeliver(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingWork}
                  className="px-5 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingWork ? 'Uploading...' : 'Send Deliverable'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Portfolio Modal */}
      {showAddPortfolio && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-sm text-slate-900">Add Portfolio Showcase</h3>
              <button
                onClick={() => setShowAddPortfolio(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPortfolioItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kenya Wildlife Conservation Rebrand"
                  value={newPortTitle}
                  onChange={(e) => setNewPortTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newPortCat}
                  onChange={(e) => setNewPortCat(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
                >
                  <option value="Brand Identity">Brand Identity</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Packaging Design">Packaging Design</option>
                  <option value="Illustration & 3D">Illustration & 3D</option>
                  <option value="Print & Publication">Print & Publication</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Artwork Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newPortImage}
                  onChange={(e) => setNewPortImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description & Context
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain the client context, creative challenge, and visual solution..."
                  value={newPortDesc}
                  onChange={(e) => setNewPortDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddPortfolio(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow-sm transition-colors"
                >
                  Save Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
