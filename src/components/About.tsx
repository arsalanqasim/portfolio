/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Dumbbell } from 'lucide-react';
import { CURRENT_FOCUS } from '../data';

export default function About() {
  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="space-y-4"
      >
        <p className="text-ink-secondary leading-relaxed text-[1.05rem]">
          I'm a final-year Artificial Intelligence student at COMSATS University Islamabad.
          I care about the full pipeline — from raw data to a model that actually runs in production.
          When I'm not training models, I'm usually freelancing on AI automation or working through
          a calisthenics session (same discipline, different domain).
        </p>
        <p className="text-ink-secondary leading-relaxed">
          I don't chase buzzwords. I like problems where math, code, and measurable results line up —
          whether that's cutting upload time by 90% for a client or hitting 55 FPS on a vision pipeline.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="card p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-4 w-4 text-accent" />
            <h3 className="font-serif font-semibold text-ink">Education</h3>
          </div>
          <p className="text-sm font-medium text-ink">BS Artificial Intelligence</p>
          <p className="text-sm text-ink-muted mt-0.5">COMSATS University Islamabad</p>
          <p className="text-xs text-ink-muted mt-2">7th semester · Expected graduation January 2027</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Dumbbell className="h-4 w-4 text-accent" />
            <h3 className="font-serif font-semibold text-ink">Outside of code</h3>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed">
            I train calisthenics seriously. Progressive overload, consistent reps, fixing form —
            it's the same mindset I bring to iterating on models and pipelines.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="card p-6 sm:p-8"
      >
        <h3 className="font-serif text-xl font-semibold text-ink mb-6">What I'm up to</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURRENT_FOCUS.map((block) => (
            <div key={block.category}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                {block.category}
              </h4>
              <ul className="space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="text-sm text-ink-secondary leading-relaxed flex gap-2">
                    <span className="text-accent mt-1.5 shrink-0">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
