import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Briefcase,
  ChevronDown,
  UserCheck,
  Shield,
  Palette,
  LayoutDashboard,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchDemoRole,
    currentView,
    setCurrentView,
    setIsPostProjectOpen,
    notifications,
    setIsAuthModalOpen,
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Main Top Bar Contract: Brand · Nav Links · Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single-element Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-900 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-950 transition-colors">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block leading-none">
                MYDMS
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                Meet Your Designer
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean Public Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setCurrentView('home')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              currentView === 'home' ? 'text-blue-900 font-semibold border-b-2 border-blue-900 py-1' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView('marketplace')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              currentView === 'marketplace' ? 'text-blue-900 font-semibold border-b-2 border-blue-900 py-1' : ''
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setCurrentView('how_it_works')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              currentView === 'how_it_works' ? 'text-blue-900 font-semibold border-b-2 border-blue-900 py-1' : ''
            }`}
          >
            How It Works
          </button>
        </nav>

        {/* Zone 3: Actions (Role Switcher, Notifications, Post Project / Auth) */}
        <div className="flex items-center gap-3">
          {/* Post Project button (if client) */}
          {currentUser.role === 'client' && (
            <button
              onClick={() => setIsPostProjectOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Post Design Project</span>
            </button>
          )}

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Notifications
                  </span>
                  <span className="text-[11px] text-slate-500">{notifications.length} alerts</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors text-left">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Demo Role Switcher Badge */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <div className="w-7 h-7 rounded-md bg-slate-600" />
              <div className="hidden sm:block text-left pr-1">
                <div className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[120px]">
                  {currentUser.fullName}
                </div>
                <div className="text-[10px] text-blue-900 font-medium capitalize">
                  {currentUser.role}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                <div className="p-1 border-b border-slate-100">
                  <button
                    onClick={() => {
                      setShowRoleDropdown(false);
                      setCurrentView('dashboard');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-blue-900 hover:bg-blue-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-blue-900" />
                    <span>Open My Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowRoleDropdown(false);
                      setCurrentView('messages');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    <span>Direct Messages</span>
                  </button>
                </div>

                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Test Role (Interactive)
                  </div>
                </div>

                <div className="p-1">
                  <button
                    onClick={() => {
                      switchDemoRole('designer');
                      setShowRoleDropdown(false);
                      setCurrentView('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                      currentUser.role === 'designer'
                        ? 'bg-blue-50 text-blue-950 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Palette className="w-4 h-4 text-blue-900" />
                    <div>
                      <div className="font-semibold">Kelvin Mwangi (Designer)</div>
                      <div className="text-[11px] text-slate-500">Submit bids, portfolio & artwork</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      switchDemoRole('client');
                      setShowRoleDropdown(false);
                      setCurrentView('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                      currentUser.role === 'client'
                        ? 'bg-blue-50 text-blue-950 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-blue-900" />
                    <div>
                      <div className="font-semibold">Sarah Wanjiku (Client)</div>
                      <div className="text-[11px] text-slate-500">Post projects, pay M-Pesa, review</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      switchDemoRole('admin');
                      setShowRoleDropdown(false);
                      setCurrentView('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                      currentUser.role === 'admin'
                        ? 'bg-blue-50 text-blue-950 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-blue-900" />
                    <div>
                      <div className="font-semibold">john doe (Admin)</div>
                      <div className="text-[11px] text-slate-500">M-Pesa auditing & moderation</div>
                    </div>
                  </button>
                </div>

                <div className="border-t border-slate-100 mt-1 pt-1 px-1">
                  <button
                    onClick={() => {
                      setShowRoleDropdown(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Register New / Custom Login</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
