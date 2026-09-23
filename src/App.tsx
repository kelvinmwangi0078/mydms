import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/home/HomeView';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { HowItWorksView } from './components/how-it-works/HowItWorksView';
import { ClientDashboard } from './components/client/ClientDashboard';
import { DesignerDashboard } from './components/designer/DesignerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MessagesView } from './components/messages/MessagesView';
import { TestRunnerView } from './components/tests/TestRunnerModal';
import { TechStackExplorer } from './components/architecture/TechStackExplorer';
import { MpesaPaymentModal } from './components/payments/MpesaPaymentModal';
import { PostProjectModal } from './components/client/PostProjectModal';
import { SubmitBidModal } from './components/designer/SubmitBidModal';
import { FeedbackModal } from './components/client/FeedbackModal';
import { AuthModal } from './components/auth/AuthModal';

const AppContent: React.FC = () => {
  const { currentView, currentUser } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-900 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'marketplace' && <MarketplaceView />}
        {currentView === 'how_it_works' && <HowItWorksView />}
        {currentView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentUser.role === 'client' && <ClientDashboard />}
            {currentUser.role === 'designer' && <DesignerDashboard />}
            {currentUser.role === 'admin' && <AdminDashboard />}
          </div>
        )}
        {currentView === 'messages' && <MessagesView />}
        {currentView === 'documentation' && <DocumentationView />}
        {currentView === 'tech_stack' && <TechStackExplorer />}
        {currentView === 'test_runner' && <TestRunnerView />}
      </main>

      {/* Global Interactive Modals */}
      <MpesaPaymentModal />
      <PostProjectModal />
      <SubmitBidModal />
      <FeedbackModal />
      <AuthModal />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
