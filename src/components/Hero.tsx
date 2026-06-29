/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { CONTACT, RESUME_PATH, PROFILE_IMAGE } from '../data';

export default function Hero() {
  return (
    <section id="home" className="pt-8 pb-20 md:pt-16 md:pb-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="md:col-span-7 space-y-6"
        >
          <p className="section-label">AI / ML Engineer</p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-ink leading-[1.15] tracking-tight">
            I build machine learning systems that work in the real world.
          </h1>

          <p className="text-lg text-ink-secondary leading-relaxed max-w-xl">
            I'm Arsalan — a final-year AI student at COMSATS Islamabad and freelance engineer.
            I work on computer vision, neural ODEs, reinforcement learning, and automation pipelines
            that save people real time.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              See my work
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={RESUME_PATH}
              download="Arsalan_Qasim.pdf"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-ink-secondary hover:border-accent hover:text-accent transition-colors"
            >
              Download CV
            </a>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="md:col-span-5 flex justify-center md:justify-end"
        >
          <div className="relative w-56 h-56 sm:w-64 md:w-72 md:h-72">
            <div className="absolute inset-0 rounded-2xl bg-accent-soft border border-accent-muted/30 rotate-3" />
            <div className="relative w-full h-full rounded-2xl border border-border overflow-hidden shadow-sm bg-surface">
              <img
                src={PROFILE_IMAGE}
                alt="Arsalan Qasim"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
