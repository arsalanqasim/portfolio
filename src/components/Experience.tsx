/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { OPERATIONAL_HISTORY } from '../data';

export default function Experience() {
  return (
    <div className="space-y-8">
      {OPERATIONAL_HISTORY.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="relative pl-6 border-l-2 border-border hover:border-accent transition-colors"
        >
          <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-border ring-4 ring-canvas" />
          <time className="text-xs font-medium text-accent">{item.period}</time>
          <h3 className="font-serif text-lg font-semibold text-ink mt-1">{item.role}</h3>
          <p className="text-sm text-ink-muted">{item.company}</p>
          <p className="mt-2 text-sm text-ink-secondary leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
