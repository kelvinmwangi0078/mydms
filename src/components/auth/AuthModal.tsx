import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, Lock, Mail, User, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalConfig,
    currentUser,
    setCurrentUser,
    setCurrentView,
    clients,
    designers,
    admins,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>('client');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  useEffect(() => {
    if (authModalConfig?.isOpen) {
      setMode(authModalConfig.initialMode || 'login');
      setRole(authModalConfig.initialRole || 'client');
      setErrorBanner(null);
      setSuccessBanner(null);
    }
  }, [authModalConfig]);

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);

    const allUsers = [...clients, ...designers, ...admins];
    const user = allUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

    if (!user) {
      setErrorBanner('User with this email not found.');
      return;
    }

    // Check wrong password simulation (e.g. TC04)
    if (password === 'wrong' || password === 'invalid' || password.length < 3) {
      setErrorBanner('Invalid credentials');
      return;
    }

    setCurrentUser(user);
    setSuccessBanner(`Welcome back, ${user.fullName}!`);
    setTimeout(() => {
      setSuccessBanner(null);
      setIsAuthModalOpen(false);
      setCurrentView('dashboard');
    }, 700);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);

    const allUsers = [...clients, ...designers, ...admins];
    const emailExists = allUsers.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());

    // TC02: Registration with Existing Email
    if (emailExists) {
      setErrorBanner('Email already exists');
      return;
    }

    if (!fullName || !email || !password) {
      setErrorBanner('Please fill in all required fields.');
      return;
    }

    // Create user based on role (TC01)
    const newUser = {
      id: `${role}-${Date.now()}`,
      fullName,
      email,
      phone: phone || '+254700000000',
      role,
      dateJoined: new Date().toISOString().split('T')[0],
      status: 'active' as const,
      ...(role === 'client'
        ? {
            companyName: 'Private Enterprise',
            address: 'Nairobi, Kenya',
            totalProjectsPosted: 0,
            totalSpentKes: 0,
          }
        : role === 'designer'
        ? {
            skills: ['Graphic Design', 'Brand Identity', 'UI/UX'],
            bio: 'Creative designer passionate about crafting exceptional visual identities and web interfaces.',
            rating: 5.0,
            reviewCount: 0,
            completedProjectsCount: 0,
            hourlyRateKes: 2500,
            location: 'Nairobi, Kenya',
            verified: false,
            portfolio: [],
          }
        : {
            adminLevel: 'moderator' as const,
          }),
    };

    setCurrentUser(newUser as any);
    setSuccessBanner('Account created successfully! Redirecting to dashboard...');
    setTimeout(() => {
      setSuccessBanner(null);
      setIsAuthModalOpen(false);
      setCurrentView('dashboard');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
              MY
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {mode === 'login' ? 'Sign In to MYDMS' : 'Create an Account'}
              </h3>
              <p className="text-[11px] text-slate-500">Meet Your Designer Management System</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => {
              setMode('login');
              setErrorBanner(null);
            }}
            className={`flex-1 py-2.5 text-center transition-colors ${
              mode === 'login'
                ? 'text-blue-900 border-b-2 border-blue-900 bg-blue-50/50'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorBanner(null);
            }}
            className={`flex-1 py-2.5 text-center transition-colors ${
              mode === 'register'
                ? 'text-blue-900 border-b-2 border-blue-900 bg-blue-50/50'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {errorBanner && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorBanner}</span>
            </div>
          )}

          {successBanner && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-blue-900">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successBanner}</span>
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah.wanjiku@savanna.co.ke"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  (Hint: Type &quot;wrong&quot; to test TC04 Login with Wrong Password)
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-medium text-xs rounded-xl shadow-sm transition-colors"
              >
                Log In
              </button>

              <div className="pt-2 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-500">Quick Test Credentials:</span>
                <div className="mt-1 flex flex-wrap justify-center gap-1.5 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('sarah.wanjiku@savanna.co.ke');
                      setPassword('password123');
                    }}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                  >
                    Client
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('');
                      setPassword('password123');
                    }}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                  >
                    Designer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('admin@mydms.co.ke');
                      setPassword('password123');
                    }}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                  >
                    Admin
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Account Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`py-2 text-xs font-medium rounded-lg border text-center transition-colors ${
                      role === 'client'
                        ? 'border-blue-900 bg-blue-50 text-blue-950'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    I am a Client (Hiring)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('designer')}
                    className={`py-2 text-xs font-medium rounded-lg border text-center transition-colors ${
                      role === 'designer'
                        ? 'border-blue-900 bg-blue-50 text-blue-950'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    I am a Designer
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder=" "
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  (Test TC02 by registering with sarah.wanjiku@savanna.co.ke)
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone (M-Pesa)</label>
                <input
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-medium text-xs rounded-xl shadow-sm transition-colors"
              >
                Create {role === 'client' ? 'Client' : 'Designer'} Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
