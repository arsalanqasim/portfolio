/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Section } from '../types';
import { Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESUME_PATH } from '../data';
import CinematicControls from './CinematicControls';
import AnimationSwitcher from './animations/AnimationSwitcher';
import { westernAudio } from '../utils/westernAudio';

interface HeaderProps {
  activeSection: Section;
}

const NAV_ITEMS: { label: string; id: Section }[] = [
  { label: 'Camp', id: 'home' },
  { label: 'Bounties', id: 'work' },
  { label: 'Ledger', id: 'experience' },
  { label: 'Arsenal', id: 'skills' },
  { label: 'The Tale', id: 'about' },
];

function scrollToSection(id: Section) {
  westernAudio.playPaperRustle();
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function Header({ activeSection }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-anton-obstacle="true"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-md border-b-2 border-border shadow-md'
          : 'bg-canvas/85 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => scrollToSection('home')}
          className="western-font text-base sm:text-lg md:text-xl font-normal text-ink tracking-wide hover:text-accent transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <span className="text-accent text-sm">★</span>
          Arsalan Qasim
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2.5 py-1 text-sm font-serif transition-colors cursor-pointer ${
                  active ? 'text-accent font-semibold' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {item.label}
                {active && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-accent rounded"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Animation Mode Switcher */}
          <AnimationSwitcher />

          {/* Sound & Lighting Toggles */}
          <CinematicControls />

          <a
            href={RESUME_PATH}
            download="Arsalan_Qasim.pdf"
            onClick={() => westernAudio.playCylinderClick()}
            className="hidden md:inline-flex items-center gap-1.5 rounded border-2 border-border-strong bg-surface px-2.5 py-1.5 text-xs font-serif font-semibold text-ink-secondary hover:border-accent hover:text-accent transition-colors shadow-sm shrink-0"
          >
            <span>CV</span>
            <Download className="h-3 w-3" />
          </a>

          <button
            onClick={() => {
              westernAudio.playCylinderClick();
              setMobileOpen(!mobileOpen);
            }}
            className="lg:hidden p-1.5 text-ink-muted hover:text-ink transition border border-border rounded"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t-2 border-border bg-surface px-6 pb-5 shadow-lg"
          >
            <div className="flex flex-col gap-1 pt-3 font-serif">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileOpen(false);
                  }}
                  className={`text-left py-2 text-base ${
                    activeSection === item.id ? 'text-accent font-semibold' : 'text-ink-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={RESUME_PATH}
                download="Arsalan_Qasim.pdf"
                onClick={() => westernAudio.playCylinderClick()}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded border-2 border-border-strong px-4 py-2 text-sm font-serif font-medium text-ink-secondary bg-canvas/40"
              >
                Download Affidavit (CV)
                <Download className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
