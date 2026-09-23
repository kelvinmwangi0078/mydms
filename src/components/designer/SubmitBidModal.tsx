import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

export const SubmitBidModal: React.FC = () => {
  const { bidModalData, setBidModalData, submitBid, currentUser } = useApp();

  const [bidAmountKes, setBidAmountKes] = useState(30000);
  const [deliveryDays, setDeliveryDays] = useState(7);
  const [bidMessage, setBidMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!bidModalData?.isOpen || !bidModalData.project) return null;

  const project = bidModalData.project;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bidAmountKes <= 0 || deliveryDays <= 0 || !bidMessage.trim()) return;

    submitBid(project.id, Number(bidAmountKes), Number(deliveryDays), bidMessage.trim());

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setBidModalData(null);
      setBidMessage('');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Submit Design Proposal</h3>
            <p className="text-[11px] text-slate-500">
              Bidding as <span className="font-semibold text-slate-800">{currentUser.fullName}</span>
            </p>
          </div>
          <button
            onClick={() => setBidModalData(null)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-blue-900 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-slate-900">Bid Submitted Successfully!</h4>
            <p className="text-xs text-slate-600">
              The client has been notified of your proposal. You will receive an alert once accepted.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Target Project Summary */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Project Opportunity
              </span>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">{project.title}</h4>
              <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
                <span>Client Budget: KES {project.budgetKes.toLocaleString()}</span>
                <span>·</span>
                <span>Deadline: {project.deadline}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Proposed Quote (KES)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-mono text-xs">
                    KES
                  </div>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    required
                    value={bidAmountKes}
                    onChange={(e) => setBidAmountKes(Number(e.target.value))}
                    className="w-full pl-12 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Timeframe (Days)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Proposal & Pitch Message
              </label>
              <textarea
                required
                rows={4}
                placeholder="Introduce yourself, highlight relevant past design work, your proposed creative direction, and why you are the best fit for this project..."
                value={bidMessage}
                onChange={(e) => setBidMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setBidModalData(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Proposal</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
