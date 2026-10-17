/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GLYCOTWIN_HIGHLIGHTS } from '../data';
import { westernAudio } from '../utils/westernAudio';

export default function FeaturedWork() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      data-anton-surface="project"
      data-anton-priority-type="technical"
      onClick={() => westernAudio.playPaperRustle()}
      className="card card-lift overflow-hidden cursor-pointer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border">
          <div className="inline-flex items-center gap-1.5 text-xs font-western text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/20 mb-4">
            <span>★</span>
            <span>FLAGSHIP RESEARCH BOUNTY</span>
          </div>
          <h3 className="western-font text-2xl sm:text-3xl font-normal text-ink mb-3">
            GlycoTwin
          </h3>
          <p className="font-serif text-ink-secondary leading-relaxed">
            My final year project — a physics-informed digital twin for glycemic response prediction.
            A biological mass-balance ODE core calibrated per patient, with a neural residual benchmarked
            as an artifact — and negative results documented as carefully as wins.
          </p>
          <div className="mt-4 pt-3 border-t border-border/80 flex flex-wrap gap-2 text-xs font-serif text-ink-muted">
            <span className="font-semibold text-accent">Datasets:</span> OhioT1DM, D1NAMO
            <span className="text-ink-muted/50">|</span>
            <span className="font-semibold text-accent">Arsenal:</span> PyTorch, SciPy, TorchDiffeq, FastAPI
          </div>
        </div>

        <div className="lg:col-span-2 bg-canvas/60 p-6 sm:p-8 font-serif">
          <h4 className="text-xs font-western uppercase tracking-wider text-accent mb-4 flex items-center gap-1.5">
            <span>★</span>
            <span>DOCKET & SPECS</span>
          </h4>
          <dl className="space-y-3">
            {GLYCOTWIN_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4 text-sm border-b border-border/40 pb-2 last:border-b-0">
                <dt className="text-ink-muted shrink-0 sm:w-28 text-xs">{item.label}</dt>
                <dd className="text-ink font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </motion.article>
  );
}
