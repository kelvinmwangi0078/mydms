import React from 'react';
import { useApp } from '../context/AppContext';
import { Palette, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-white">
                <Palette className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">MYDMS</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Meet Your Designer Management System (MYDMS) — A specialized collaborative platform
              connecting clients and creative professionals with project bidding, portfolio showcases,
              real-time messaging, and M-Pesa Daraja integration.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Platform Modules
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-white transition-colors"
                >
                  Home (Overview &amp; Workflow)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="hover:text-white transition-colors"
                >
                  Design Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  User Dashboard (Role Based)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('messages')}
                  className="hover:text-white transition-colors"
                >
                  Direct Messaging
                </button>
              </li>
            </ul>
          </div>

        </div> 

        {/* Quiet Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 Meet Your Designer Management System (MYDMS). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Production Verified</span>
            <span>·</span>
            <span>Nairobi, Kenya</span>
          </div>
        </div>

      </div>
    </footer>
  );
};