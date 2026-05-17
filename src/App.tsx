/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import { ModalProvider, useModals } from './contexts/ModalContext';
import TargetCursor from './components/TargetCursor';
import ClickSpark from './components/ClickSpark';
// import SplashCursor from './components/SplashCursor';
import LoginModal from './components/LoginModal';
import WaitlistModal from './components/WaitlistModal';
import StealthModal from './components/StealthModal';
import PrivacyModal from './components/PrivacyModal';

function GlobalModals() {
  const { 
    isWaitlistModalOpen, closeWaitlistModal, waitlistTitle,
    isStealthModalOpen, closeStealthModal,
    isPrivacyModalOpen, closePrivacyModal
  } = useModals();
  return (
    <>
      <LoginModal />
      <WaitlistModal 
        isOpen={isWaitlistModalOpen} 
        onClose={closeWaitlistModal} 
        onSuccess={() => {}} 
        title={waitlistTitle}
      />
      <StealthModal isOpen={isStealthModalOpen} onClose={closeStealthModal} />
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={closePrivacyModal} />
    </>
  );
}

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Suspense fallback={<div className="h-48 w-full animate-pulse bg-gray-200" />}>
        <Hero />
        <ReactFlowDemo />
        <Features />
        <ContentVisual />
        <CoreCapabilities />
        <Alignment />
        <Vision />
        <Pricing />
      </Suspense>
    </motion.main>
  );
}

import LuxuryLanding from './pages/LuxuryLanding';
// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
const Features = lazy(() => import('./components/Features'));
const ReactFlowDemo = lazy(() => import('./components/ReactFlowDemo'));
const ContentVisual = lazy(() => import('./components/ContentVisual'));
const CoreCapabilities = lazy(() => import('./components/CoreCapabilities'));
const Alignment = lazy(() => import('./components/Alignment'));
const Vision = lazy(() => import('./components/Vision'));
const Pricing = lazy(() => import('./components/Pricing'));
const Docs = lazy(() => import('./pages/Docs'));
const LuxuryLanding = lazy(() => import('./pages/LuxuryLanding'));

// ...

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/luxury" element={<Suspense fallback={<div>Loading...</div>}><LuxuryLanding /></Suspense>} />
        <Route path="/docs" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Suspense fallback={<div>Loading Docs...</div>}><Docs /></Suspense>
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}


export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <LanguageProvider>
      <ModalProvider>
        {!isMobile && (
          <>
            <TargetCursor />
            <ClickSpark sparkColor="#ffb4a8" sparkSize={20} sparkRadius={40} sparkCount={16} duration={600} />
          </>
        )}
        <BrowserRouter>
          <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary">
            <Navbar />
            <AnimatedRoutes />
            <Footer />
            <GlobalModals />
          </div>
        </BrowserRouter>
      </ModalProvider>
    </LanguageProvider>
  );
}
