/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Section } from '../types';
import { Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESUME_PATH } from '../data';

interface HeaderProps {
  activeSection: Section;
}

const NAV_ITEMS: { label: string; id: Section }[] = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'About', id: 'about' },
];

function scrollToSection(id: Section) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm shadow-stone-900/5'
          : 'bg-canvas/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <button
          onClick={() => scrollToSection('home')}
          className="font-serif text-lg font-semibold text-ink tracking-tight hover:text-accent transition-colors cursor-pointer"
        >
          Arsalan Qasim
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  active ? 'text-accent' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.label}
                {active && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={RESUME_PATH}
            download="Arsalan_Qasim.pdf"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-ink-secondary hover:border-accent hover:text-accent transition-colors"
          >
            Resume
            <Download className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-ink-muted hover:text-ink transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-white px-6 pb-5"
          >
            <div className="flex flex-col gap-1 pt-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileOpen(false);
                  }}
                  className={`text-left py-2 text-sm font-medium ${
                    activeSection === item.id ? 'text-accent' : 'text-ink-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={RESUME_PATH}
                download="Arsalan_Qasim.pdf"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink-secondary"
              >
                Download Resume
                <Download className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
