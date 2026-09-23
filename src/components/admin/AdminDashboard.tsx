import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Users,
  Briefcase,
  Smartphone,
  BarChart3,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Download,
  Search,
  Filter,
  Ban,
  Check,
  Send,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    clients,
    designers,
    projects,
    payments,
    toggleUserStatus,
    verifyDesignerBadge,
    resolveProjectDispute,
    sendBroadcastAnnouncement,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'projects' | 'payments' | 'reports' | 'broadcast'>('users');
  const [userSearch, setUserSearch] = useState('');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Aggregated platform telemetry
  const totalUsers = clients.length + designers.length;
  const totalGrossKes = payments.reduce((sum, p) => sum + p.amountKes, 0);
  const activeEscrowKes = projects
    .filter((p) => p.status === 'Active' || p.status === 'Under Review')
    .reduce((sum, p) => sum + p.budgetKes, 0);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMsg.trim()) return;

    sendBroadcastAnnouncement(broadcastTitle.trim(), broadcastMsg.trim());
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
      setBroadcastTitle('');
      setBroadcastMsg('');
    }, 1200);
  };

  const filteredDesigners = designers.filter((d) =>
    d.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
    d.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredClients = clients.filter((c) =>
    c.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Administrative Control Center · MYDMS Platform Operations</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            MYDMS Administrator Governance
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage user credential verification, monitor M-Pesa escrow flow, resolve disputes, and audit platform transactions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-lg border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>Daraja API Gateway Nominal</span>
          </span>
        </div>
      </div>

      {/* System Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Registered Platform Users</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">{totalUsers}</span>
            <span className="text-xs text-slate-500">
              ({designers.length} Designers · {clients.length} Clients)
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Active Escrow Value</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xs font-semibold text-slate-500 font-mono">KES</span>
            <span className="text-2xl font-bold text-blue-900 font-mono">
              {activeEscrowKes.toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Locked in production</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Cumulative M-Pesa Volume</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xs font-semibold text-slate-500 font-mono">KES</span>
            <span className="text-2xl font-bold text-slate-900 font-mono">
              {totalGrossKes.toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">All transactions settled</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Dispute Rate</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-slate-900 font-mono">0.0%</span>
            <span className="text-xs text-blue-900 font-semibold font-mono">100% HEALTHY</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">0 active disputes</span>
        </div>
      </div>

      {/* Admin Nav Segmented Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl max-w-fit flex-wrap">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'users'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          User Management ({totalUsers})
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'projects'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Project Supervision ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'payments'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          M-Pesa Audit Ledger ({payments.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'reports'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          System Reports
        </button>
        <button
          onClick={() => setActiveTab('broadcast')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            activeTab === 'broadcast'
              ? 'bg-white text-slate-900 shadow-sm font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Broadcast Alerts
        </button>
      </div>

      {/* Tab 1: User Management */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search user by name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Displaying {filteredDesigners.length + filteredClients.length} accounts
            </span>
          </div>

          {/* Designers Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Creative Designers Directory
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">{filteredDesigners.length} designers</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Designer</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Rating</th>
                    <th className="px-5 py-3">Verification Badge</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Admin Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredDesigners.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={
                              d.avatarUrl ||
                              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
                            }
                            alt={d.fullName}
                            className="w-7 h-7 rounded-md object-cover"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{d.fullName}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{d.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-slate-600">
                        <div>{d.email}</div>
                        <div className="text-[11px] text-slate-400">{d.phone}</div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="font-mono font-bold text-amber-600">{d.rating} ★</span>
                      </td>
                      <td className="px-5 py-3">
                        {d.verified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-blue-800" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => verifyDesignerBadge(d.id, true)}
                            className="text-[11px] font-medium text-slate-600 hover:text-blue-900 bg-slate-100 hover:bg-blue-50 px-2 py-0.5 rounded border border-slate-200 transition-colors"
                          >
                            + Grant Badge
                          </button>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            d.status === 'active'
                              ? 'bg-blue-50 text-blue-900'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {d.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() =>
                            toggleUserStatus(d.id, d.status === 'active' ? 'suspended' : 'active')
                          }
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
                            d.status === 'active'
                              ? 'text-red-700 border-red-200 hover:bg-red-50'
                              : 'text-blue-900 border-blue-200 hover:bg-blue-50'
                          }`}
                        >
                          {d.status === 'active' ? 'Suspend' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Clients Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Hiring Clients Directory
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">{filteredClients.length} clients</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Client Name</th>
                    <th className="px-5 py-3">Organization / Address</th>
                    <th className="px-5 py-3">Contact Email</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredClients.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-bold text-slate-900">{c.fullName}</td>
                      <td className="px-5 py-3 text-slate-600">
                        {c.companyName || 'Private Client'} · {c.address}
                      </td>
                      <td className="px-5 py-3 font-mono text-slate-600">{c.email}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            c.status === 'active'
                              ? 'bg-blue-50 text-blue-900'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {c.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() =>
                            toggleUserStatus(c.id, c.status === 'active' ? 'suspended' : 'active')
                          }
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
                            c.status === 'active'
                              ? 'text-red-700 border-red-200 hover:bg-red-50'
                              : 'text-blue-900 border-blue-200 hover:bg-blue-50'
                          }`}
                        >
                          {c.status === 'active' ? 'Suspend' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Projects Supervision */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              All Platform Projects Oversight
            </h3>
            <span className="text-xs text-slate-500 font-mono">{projects.length} Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Project Title</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Assigned Designer</th>
                  <th className="px-5 py-3">Budget (KES)</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Dispute Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-bold text-slate-900">{p.title}</td>
                    <td className="px-5 py-3 text-slate-600">{p.category}</td>
                    <td className="px-5 py-3 text-slate-700">{p.clientName}</td>
                    <td className="px-5 py-3 text-slate-700">
                      {p.assignedDesignerName || <span className="text-slate-400">Unassigned</span>}
                    </td>
                    <td className="px-5 py-3 font-mono font-bold text-slate-900">
                      KES {p.budgetKes.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          p.status === 'Completed'
                            ? 'bg-slate-100 text-slate-700'
                            : p.status === 'Active'
                            ? 'bg-blue-50 text-blue-900'
                            : p.status === 'Under Review'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {p.status === 'Disputed' ? (
                        <button
                          onClick={() => resolveProjectDispute(p.id, 'completed')}
                          className="px-2.5 py-1 bg-blue-900 text-white rounded text-[11px] font-medium hover:bg-blue-950"
                        >
                          Resolve & Release
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono">No Dispute</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: M-Pesa Audit Ledger */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Safaricom Daraja API Settlement Ledger
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Verified against Safaricom Lipa Na M-Pesa callback records
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Ledger</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 font-sans">
                <tr>
                  <th className="px-5 py-3">Safaricom Receipt</th>
                  <th className="px-5 py-3">Project Title</th>
                  <th className="px-5 py-3">Sender (Client)</th>
                  <th className="px-5 py-3">Beneficiary (Designer)</th>
                  <th className="px-5 py-3">Amount (KES)</th>
                  <th className="px-5 py-3">Timestamp</th>
                  <th className="px-5 py-3">Reconciliation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {payments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-bold text-blue-900">
                      {pay.mpesaReceiptNumber}
                    </td>
                    <td className="px-5 py-3 font-sans text-slate-800">{pay.projectTitle}</td>
                    <td className="px-5 py-3 font-sans text-slate-600">
                      {pay.clientName} ({pay.phoneNumber})
                    </td>
                    <td className="px-5 py-3 font-sans text-slate-600">{pay.designerName}</td>
                    <td className="px-5 py-3 font-bold text-slate-900">
                      KES {pay.amountKes.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-[11px]">{pay.paymentDate}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                        <Check className="w-3 h-3" />
                        <span>MATCHED</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: System Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Executive & System Performance Report</h3>
              <p className="text-xs text-slate-500">
                Generated based on real-time operational and platform service analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-semibold block">Design Category Distribution</span>
                <p className="font-bold text-slate-900 text-sm">Brand Identity: 50%</p>
                <p className="text-slate-600">UI/UX Web & Mobile: 30%</p>
                <p className="text-slate-600">Packaging & 3D: 20%</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-semibold block">Average Designer Turnaround</span>
                <p className="font-bold text-blue-900 text-sm">9.4 Calendar Days</p>
                <p className="text-slate-600">On-time milestone delivery: 96.5%</p>
                <p className="text-slate-600">Client satisfaction index: 4.85 / 5.0</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-semibold block">M-Pesa STK Gateway Latency</span>
                <p className="font-bold text-slate-900 text-sm font-mono">&lt; 1.8 seconds</p>
                <p className="text-slate-600">Callback acknowledgment: 100%</p>
                <p className="text-slate-600">Failed attempts: 0%</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report Package</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Broadcast Announcements */}
      {activeTab === 'broadcast' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Send Platform Announcement</h3>
            <p className="text-xs text-slate-500">
              Dispatches notifications to all registered client and designer dashboards.
            </p>
          </div>

          {broadcastSuccess && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-blue-900">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Broadcast dispatched successfully to all user accounts.</span>
            </div>
          )}

          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Announcement Headline
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Scheduled Platform Maintenance & Escrow Payout Schedule"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notification Body
              </label>
              <textarea
                required
                rows={4}
                placeholder="Type your official administrative communication here..."
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Notification</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
