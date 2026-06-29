/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GLYCOTWIN_HIGHLIGHTS } from '../data';

export default function FeaturedWork() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="card card-lift overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-border">
          <span className="inline-block text-xs font-semibold text-success bg-success-soft px-2.5 py-1 rounded-full mb-4">
            Current focus
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mb-3">
            GlycoTwin
          </h3>
          <p className="text-ink-secondary leading-relaxed">
            My final year project — a digital twin for glycemic response prediction.
            I'm combining sequence encoders with Neural ODEs that respect biological
            constraints, and using computer vision to estimate nutrition from meal photos.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Datasets: OhioT1DM, Shanghai T2DM · Stack: PyTorch, SciPy, TorchDiffeq
          </p>
        </div>

        <div className="lg:col-span-2 bg-canvas/60 p-6 sm:p-8">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-4">
            At a glance
          </h4>
          <dl className="space-y-3">
            {GLYCOTWIN_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4 text-sm">
                <dt className="text-ink-muted shrink-0 sm:w-28">{item.label}</dt>
                <dd className="text-ink font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </motion.article>
  );
}
