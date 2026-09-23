import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, Bid } from '../../types';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  DollarSign,
  Plus,
  Users,
  Eye,
  FileCheck,
  Smartphone,
  Star,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const {
    currentUser,
    projects,
    bids,
    payments,
    feedbacks,
    setIsPostProjectOpen,
    setPaymentModalData,
    setFeedbackModalData,
    acceptBidAndHire,
    reviewDeliverable,
    setCurrentView,
    sendMessage,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'active' | 'payments' | 'reviews'>('projects');
  const [selectedProjectForBids, setSelectedProjectForBids] = useState<Project | null>(null);

  // Filter projects created by current client (or all client projects for testing convenience)
  const clientProjects = projects.filter((p) => p.clientId === currentUser.id);
  const activeProjects = clientProjects.filter((p) => p.status === 'Active' || p.status === 'Under Review');
  const completedProjects = clientProjects.filter((p) => p.status === 'Completed');
  const clientPayments = payments.filter((p) => p.clientId === currentUser.id);

  const totalSpent = clientPayments.reduce((sum, p) => sum + p.amountKes, 0);

  return (
    <div className="space-y-6">
      {/* Client Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
              Client Portal
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">{currentUser.fullName}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            Design Project Management & Hiring
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming designer proposals, inspect creative deliverables, and release secure M-Pesa escrow.
          </p>
        </div>

        <button
          onClick={() => setIsPostProjectOpen(true)}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Project</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Projects Posted</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {clientProjects.length}
            </span>
            <span className="text-xs text-slate-500">Briefs</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Active Workspaces</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-blue-900 font-mono">
              {activeProjects.length}
            </span>
            <span className="text-xs text-blue-800 font-medium">In Production</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Completed Projects</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {completedProjects.length}
            </span>
            <span className="text-xs text-slate-500">Delivered</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Escrow Disbursed</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xs font-semibold text-slate-500 font-mono">KES</span>
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {totalSpent.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl max-w-fit">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'projects'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Posted Projects ({clientProjects.length})
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'active'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Handoffs & Review ({activeProjects.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'payments'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          M-Pesa Ledger ({clientPayments.length})
        </button>
      </div>

      {/* Tab: All Posted Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {clientProjects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-900">No Projects Posted Yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Create your first design project brief to start receiving competitive proposals from verified Kenyan designers.
              </p>
              <button
                onClick={() => setIsPostProjectOpen(true)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Post a Project Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {clientProjects.map((project) => {
                const projectBids = bids.filter((b) => b.projectId === project.id);
                const hasSubmission = Boolean(project.deliverableSubmission);

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                          <span className="font-semibold text-blue-900">{project.category}</span>
                          <span>·</span>
                          <span>Posted {project.datePosted}</span>
                          <span>·</span>
                          <span className="font-mono">Deadline: {project.deadline}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                            project.status === 'Active'
                              ? 'bg-blue-50 text-blue-900'
                              : project.status === 'Under Review'
                              ? 'bg-amber-50 text-amber-800'
                              : project.status === 'Completed'
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-blue-50 text-blue-800'
                          }`}
                        >
                          {project.status}
                        </span>
                        <span className="text-sm font-bold font-mono text-slate-900">
                          KES {project.budgetKes.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{project.description}</p>

                    {/* Assigned Designer Info or Bids preview */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100">
                      {project.assignedDesignerId ? (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Assigned Designer:</span>
                          <span className="font-semibold text-slate-900">
                            {project.assignedDesignerName}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span className="font-semibold text-slate-800 font-mono">
                            {projectBids.length} Proposals Received
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {projectBids.length > 0 && !project.assignedDesignerId && (
                          <button
                            onClick={() => setSelectedProjectForBids(project)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors"
                          >
                            Review {projectBids.length} Bids
                          </button>
                        )}

                        {project.status === 'Pending' && project.assignedDesignerId && (
                          <button
                            onClick={() =>
                              setPaymentModalData({
                                isOpen: true,
                                project,
                                amount: project.budgetKes,
                              })
                            }
                            className="px-3 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>Fund via M-Pesa</span>
                          </button>
                        )}

                        {project.status === 'Completed' && (
                          <button
                            onClick={() => setFeedbackModalData({ isOpen: true, project })}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                          >
                            <Star className="w-3.5 h-3.5 fill-white" />
                            <span>Leave Rating</span>
                          </button>
                        )}

                        <button
                          onClick={() => setCurrentView('messages')}
                          className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          <span>Chat</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab: Active Handoffs & Review */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeProjects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <FileCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-900">No Active Handoffs Pending</p>
              <p className="text-xs text-slate-500">
                Once a designer is hired and uploads artwork files, they will appear here for inspection.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[11px] text-blue-900 font-semibold uppercase">
                        Work in Progress
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                    </div>
                    <span className="text-xs font-bold font-mono px-2.5 py-1 bg-blue-50 text-blue-900 rounded">
                      KES {project.budgetKes.toLocaleString()} in Escrow
                    </span>
                  </div>

                  {project.deliverableSubmission ? (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-blue-800" />
                          <span className="text-xs font-bold text-slate-800">
                            Designer Submission: {project.deliverableSubmission.fileName}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(project.deliverableSubmission.submittedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 italic bg-white p-3 rounded-lg border border-slate-200">
                        &quot;{project.deliverableSubmission.notes}&quot;
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <a
                          href={project.deliverableSubmission.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-blue-900 hover:text-blue-950 flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Design Link / File Asset</span>
                        </a>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              reviewDeliverable(
                                project.id,
                                false,
                                'Please refine the typography hierarchy and color contrast.'
                              )
                            }
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                          >
                            Request Revisions
                          </button>
                          <button
                            onClick={() => {
                              reviewDeliverable(project.id, true);
                              setFeedbackModalData({ isOpen: true, project });
                            }}
                            className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve & Release Payment</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-amber-800 flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        Designer <strong className="text-slate-900">{project.assignedDesignerName}</strong> is
                        currently working on your deliverables. You will be notified once preview files are
                        ready.
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: M-Pesa Ledger */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              M-Pesa Daraja Transaction Records
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Total: KES {totalSpent.toLocaleString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Receipt No</th>
                  <th className="px-5 py-3">Project Title</th>
                  <th className="px-5 py-3">Recipient Designer</th>
                  <th className="px-5 py-3">Amount (KES)</th>
                  <th className="px-5 py-3">Payment Method</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {clientPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-bold text-blue-900">
                      {payment.mpesaReceiptNumber}
                    </td>
                    <td className="px-5 py-3 font-sans font-medium text-slate-800">
                      {payment.projectTitle}
                    </td>
                    <td className="px-5 py-3 font-sans text-slate-600">{payment.designerName}</td>
                    <td className="px-5 py-3 font-bold text-slate-900">
                      KES {payment.amountKes.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 font-sans text-slate-500">{payment.paymentMethod}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-900">
                        {payment.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inspect Bids Modal for Selected Project */}
      {selectedProjectForBids && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Review Proposals for: {selectedProjectForBids.title}
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  Budget: KES {selectedProjectForBids.budgetKes.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedProjectForBids(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {bids
                .filter((b) => b.projectId === selectedProjectForBids.id)
                .map((bid) => (
                  <div
                    key={bid.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors space-y-3 bg-slate-50/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            bid.designerAvatar ||
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
                          }
                          alt={bid.designerName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{bid.designerName}</h4>
                          <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{bid.designerRating} rating</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold font-mono text-blue-900">
                          KES {bid.bidAmountKes.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-slate-500 block font-mono">
                          in {bid.deliveryDays} days
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                      {bid.bidMessage}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-wrap gap-1">
                        {bid.designerSkills.map((s, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-slate-600 font-medium px-2 py-0.5 bg-slate-100 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            acceptBidAndHire(bid.id);
                            setSelectedProjectForBids(null);
                            setPaymentModalData({
                              isOpen: true,
                              project: selectedProjectForBids,
                              amount: bid.bidAmountKes,
                            });
                          }}
                          className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept & Fund Escrow</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
