/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Tab } from './types';
import HeaderNav from './components/HeaderNav';
import ResearchTab from './components/ResearchTab';
import ProjectsTab from './components/ProjectsTab';
import StackTab from './components/StackTab';
import AboutTab from './components/AboutTab';
import FooterNav from './components/FooterNav';
import PortfolioChatbot from './components/PortfolioChatbot';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('research');

  // Render the corresponding tab component dynamically
  const renderTabContent = () => {
    switch (currentTab) {
      case 'research':
        return <ResearchTab key="research" />;
      case 'projects':
        return <ProjectsTab key="projects" />;
      case 'stack':
        return <StackTab key="stack" />;
      case 'about':
        return <AboutTab key="about" />;
      default:
        return <ResearchTab key="research" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e14] text-[#dfe2eb] relative overflow-x-hidden">
      
      {/* Background Matrix Mesh Element */}
      <div className="pointer-events-none absolute inset-0 grid-bg-pattern opacity-10"></div>
      
      {/* Dynamic Header Component */}
      <HeaderNav currentTab={currentTab} setTab={setCurrentTab} />

      {/* Main Content Layout Block */}
      <main className="flex-grow w-full max-w-[1240px] mx-auto px-6 py-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dynamic Footer Component */}
      <FooterNav />

      {/* Persistent Floating Portfolio Chatbot */}
      <PortfolioChatbot />

    </div>
  );
}

