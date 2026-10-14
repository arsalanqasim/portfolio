/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { OPERATIONAL_HISTORY } from '../data';
import { westernAudio } from '../utils/westernAudio';

export default function Experience() {
  return (
    <div className="space-y-8 font-serif">
      {OPERATIONAL_HISTORY.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          data-anton-surface="experience"
          data-anton-priority-type="content"
          onClick={() => westernAudio.playPaperRustle()}
          className="relative pl-8 border-l-2 border-border-strong hover:border-accent transition-colors group cursor-pointer"
        >
          <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-surface border-2 border-accent flex items-center justify-center text-[9px] text-accent font-western shadow-xs">
            ★
          </div>
          <time className="text-xs font-western text-accent tracking-wider">{item.period}</time>
          <h3 className="western-font text-lg text-ink font-normal mt-0.5 group-hover:text-accent transition-colors">{item.role}</h3>
          <p className="text-sm font-serif font-semibold text-ink-muted italic">{item.company}</p>
          <p className="mt-2 text-sm text-ink-secondary leading-relaxed font-serif">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
