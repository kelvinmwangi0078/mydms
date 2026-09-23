import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const MpesaPaymentModal: React.FC = () => {
  const { paymentModalData, setPaymentModalData, processMpesaPayment, currentUser } = useApp();

  const [phone, setPhone] = useState(currentUser.phone || '+254712345678');
  const [stage, setStage] = useState<'form' | 'prompt_sent' | 'pin_input' | 'processing' | 'success'>('form');
  const [pin, setPin] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!paymentModalData?.isOpen || !paymentModalData.project) return null;

  const project = paymentModalData.project;
  const amount = paymentModalData.amount || project.budgetKes;

  const handleInitiateStk = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStage('prompt_sent');
      // After 1 second, display mobile STK push prompt on screen
      setTimeout(() => {
        setStage('pin_input');
      }, 1200);
    }, 800);
  };

  const handleConfirmPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) return;
    setStage('processing');

    try {
      const payment = await processMpesaPayment(project.id, amount, phone);
      setReceiptNumber(payment.mpesaReceiptNumber);
      setStage('success');
    } catch (err) {
      console.error(err);
      setStage('form');
    }
  };

  const handleClose = () => {
    setPaymentModalData(null);
    setStage('form');
    setPin('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Safaricom M-Pesa Branding in Navy Theme */}
        <div className="bg-blue-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center font-bold font-mono text-sm">
              KES
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide leading-tight">M-Pesa Daraja Payment</h3>
              <p className="text-[11px] text-blue-200 font-medium">Lipa Na M-Pesa Online STK Push</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {stage === 'form' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Project Escrow Details
                </span>
                <p className="text-xs font-semibold text-slate-900 leading-snug">{project.title}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-xs">
                  <span className="text-slate-600">Assigned Designer</span>
                  <span className="font-semibold text-slate-800">
                    {project.assignedDesignerName || 'Kelvin Mwangi Wambui'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Payable Amount</span>
                  <span className="font-mono font-bold text-blue-900 text-sm">
                    KES {amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Safaricom M-Pesa Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 712 345 678"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 font-mono"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  An automated STK push prompt will be sent directly to this mobile handset.
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-950 leading-relaxed">
                  <strong>Protected by MYDMS Escrow:</strong> Funds are locked securely and will only be
                  disbursed to the designer once you inspect and approve the project deliverables.
                </p>
              </div>

              <button
                type="button"
                onClick={handleInitiateStk}
                disabled={isSubmitting}
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-medium text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting Safaricom Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Send M-Pesa STK Push</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {stage === 'prompt_sent' && (
            <div className="py-8 text-center space-y-3">
              <Loader2 className="w-10 h-10 text-blue-900 animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">Initiating STK Push...</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Request dispatched to Safaricom Daraja API for phone{' '}
                <span className="font-mono font-semibold text-slate-900">{phone}</span>.
              </p>
            </div>
          )}

          {stage === 'pin_input' && (
            <div className="space-y-4">
              {/* Realistic Safaricom SIM Toolkit Phone Dialog Simulation */}
              <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl shadow-inner border border-slate-700 font-sans space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-[11px] font-mono tracking-wider text-blue-400">
                    SIM TOOLKIT · M-PESA
                  </span>
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-xs space-y-1.5 leading-relaxed">
                  <p className="font-medium text-white">
                    Do you want to pay <span className="text-blue-400 font-bold">KES {amount.toLocaleString()}</span> to{' '}
                    <span className="font-semibold text-white">MYDMS ESCROW</span> for{' '}
                    <span className="italic">{project.title.slice(0, 24)}...</span>?
                  </p>
                  <p className="text-[11px] text-slate-300">Enter M-Pesa PIN:</p>
                </div>

                <form onSubmit={handleConfirmPin} className="space-y-3">
                  <div className="relative">
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••"
                      autoFocus
                      className="w-full text-center tracking-[1em] text-lg font-mono py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStage('form')}
                      className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={pin.length < 4}
                      className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Send PIN
                    </button>
                  </div>
                </form>
              </div>

              <p className="text-[11px] text-center text-slate-500">
                (Testing hint: Enter any 4 numbers e.g. 1234 to complete verification)
              </p>
            </div>
          )}

          {stage === 'processing' && (
            <div className="py-8 text-center space-y-3">
              <Loader2 className="w-10 h-10 text-blue-900 animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">Validating M-Pesa Callback...</h4>
              <p className="text-xs text-slate-500">
                Awaiting Daraja IPN response from Safaricom servers.
              </p>
            </div>
          )}

          {stage === 'success' && (
            <div className="py-4 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto ring-4 ring-blue-50">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Payment Confirmed</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  M-Pesa transaction recorded and funds placed into secure project escrow.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1.5 text-left font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Receipt No:</span>
                  <span className="font-bold text-blue-900">{receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount:</span>
                  <span>KES {amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span>{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-blue-900 font-bold">COMPLETED</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-colors"
              >
                Return to Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
