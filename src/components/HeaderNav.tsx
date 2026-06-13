/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Tab } from '../types';
import { Download, Menu, X, Check, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderNavProps {
  currentTab: Tab;
  setTab: (tab: Tab) => void;
}

export default function HeaderNav({ currentTab, setTab }: HeaderNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Simulate download of Arsalan's CV
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      // Create a blob representing Arsalan's portfolio resume
      const text = `ARSALAN QASIM - AI/ML ENGINEER PORTFOLIO
-----------------------------------------------
Email: arsalanqasim400@gmail.com
Location: Pakistan
Education: BS Artificial Intelligence, COMSATS University Islamabad (7th Semester)

CORE COMPETENCIES:
- PyTorch, Scikit-learn, TensorFlow, NumPy, Pandas
- Deep Learning, Intelligent Game Agents, NLP Classification & Routing
- Automation & Workflows: n8n, Make (Integromat), Web Scraping
- Systems: Docker, Git/GitHub, Computational Mathematics (Neural ODEs)

FEATURED RESEARCH:
- GlycoTwin: Biological Simulation via Hybrid Neural ODEs
  Bridging traditional differential equations with continuous-time deep neural learning
  to model highly dynamic, continuous biological states over time.

KEY PROJECTS:
1. Dino-AI
   Neuroevolution game agent mastering Chrome Dino game via genetic iterative breeding.
2. TriageIQ
   Automated NLP support classification system prioritizing GitHub issues via SVM.
3. Budgy
   Local robust desktop finance controller featuring Pandas and automated classifications.
4. Fake News Def
   Credibility score analysis pipeline with TF-IDF vectorization and Logistic Regression.
--------------------------------------------
Crafted with systemic precision.`;

      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Arsalan_Qasim_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 1200);
  };

  const navItems: { label: string; id: Tab }[] = [
    { label: 'Research', id: 'research' },
    { label: 'Projects', id: 'projects' },
    { label: 'Stack', id: 'stack' },
    { label: 'About', id: 'about' },
  ];

  return (
    <>
      <nav id="header-navbar" className="sticky top-0 z-50 w-full border-b border-[#21262d] bg-[#0a0e14]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6">
          
          {/* Logo Name */}
          <div 
            onClick={() => setTab('research')} 
            className="flex cursor-pointer items-center gap-2 font-display text-xl font-bold tracking-tight text-[#dfe2eb] transition hover:text-[#58a6ff]"
          >
            <span className="h-2 w-2 rounded-full bg-[#58a6ff] animate-pulse"></span>
            Arsalan Qasim
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`relative font-mono text-sm tracking-wide transition-all duration-200 px-3 py-1 cursor-pointer ${
                    active 
                      ? 'text-[#58a6ff] font-bold' 
                      : 'text-[#c0c7d4] hover:text-[#dfe2eb]'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-[#58a6ff]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Resume Download Trigger */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setShowResumeModal(true)}
              className="flex items-center gap-2 border border-[#21262d] bg-[#161b22] px-4 py-1.5 font-mono text-xs font-semibold text-[#58a6ff] rounded transition hover:border-[#58a6ff] hover:bg-[#1c2026] group cursor-pointer"
            >
              Resume
              <Download className="h-3.5 w-3.5 transition group-hover:translate-y-[1px]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden p-2 text-[#c0c7d4] hover:text-[#dfe2eb] transition"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-[#21262d] bg-[#0d1117]/95 px-6 pb-6 pt-2"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const active = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left font-mono text-sm tracking-wide py-1 ${
                        active ? 'text-[#58a6ff] font-bold' : 'text-[#c0c7d4]'
                      }`}
                    >
                      {active ? `~/ ${item.label.toLowerCase()}` : item.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowResumeModal(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 border border-[#21262d] bg-[#161b22] py-2 font-mono text-xs font-semibold text-[#58a6ff] rounded hover:border-[#58a6ff]"
                >
                  Resume
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Resume Overlay Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl border border-[#30363d] bg-[#161b22] px-6 py-6 rounded-lg text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#21262d] pb-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#58a6ff]">v1.0.4.doc</span>
                  <h3 className="font-display text-lg font-bold text-[#dfe2eb]">System Specification Resume</h3>
                </div>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="rounded p-1 text-[#c0c7d4] hover:bg-[#21262d] hover:text-[#dfe2eb] transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="mt-4 max-h-[380px] overflow-y-auto space-y-4 font-mono text-xs bg-[#0d1117] p-4 border border-[#21262d] rounded text-[#dfe2eb]/90 leading-relaxed scrollbar">
                <div>
                  <h4 className="text-[#58a6ff] font-bold">// CONTACT INFORMATION</h4>
                  <p>Name: Arsalan Qasim</p>
                  <p>Specialization: AI / ML Engineering & Continuous Systems</p>
                  <p>Email: arsalanqasim400@gmail.com</p>
                  <p>University: COMSATS University Islamabad (Pakistan)</p>
                </div>

                <div>
                  <h4 className="text-[#58a6ff] font-bold">// CORE ACADEMIC TRAINING</h4>
                  <p>Course: BS Artificial Intelligence (7th Semester)</p>
                  <p>Core Areas: Advanced Neural Architectures, Continuous ODEs, Computer Vision, Pattern Classification</p>
                </div>

                <div>
                  <h4 className="text-[#58a6ff] font-bold">// KEY REPOSITORIES & PRODUCTS</h4>
                  <p>• GlycoTwin: Hybrid Neural Ordinary Differential Equations for real-time biology states.</p>
                  <p>• Dino-AI: Genetics-based neural breed game solver (Pygame).</p>
                  <p>• TriageIQ: Automated multi-class SVM Issue classifier.</p>
                  <p>• Budgy: Local Pandas/NumPy transaction compiler.</p>
                </div>

                <div>
                  <h4 className="text-[#58a6ff] font-bold">// AUTOMATION SUITE</h4>
                  <p>• n8n, Make, Custom Python API routers, BeautifulSoup pipelines.</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#21262d] pt-4">
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="w-full sm:w-auto border border-transparent px-4 py-2 font-mono text-xs text-[#c0c7d4] hover:text-[#dfe2eb] cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded bg-[#58a6ff] hover:bg-[#58a6ff]/90 text-black font-semibold font-mono text-xs px-5 py-2 cursor-pointer transition disabled:opacity-50"
                >
                  {downloading ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" />
                      Download Resume (txt)
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
