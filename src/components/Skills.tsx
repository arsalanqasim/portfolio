/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_GROUPS } from '../data';
import { ChevronDown } from 'lucide-react';

export default function Skills() {
  const [expanded, setExpanded] = useState<string | null>(SKILL_GROUPS[0].title);

  return (
    <div className="space-y-4">
      {SKILL_GROUPS.map((group) => {
        const isOpen = expanded === group.title;
        return (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="card overflow-hidden"
          >
            <button
              onClick={() => setExpanded(isOpen ? null : group.title)}
              className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-canvas/50 transition-colors"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">{group.title}</h3>
              <ChevronDown
                className={`h-4 w-4 text-ink-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative"
                      >
                        <span className="inline-block text-sm font-medium text-ink-secondary bg-canvas border border-border px-3 py-1.5 rounded-lg hover:border-accent hover:text-accent transition-colors cursor-default">
                          {skill.name}
                        </span>
                        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 px-3 py-2 text-xs text-ink-secondary bg-surface border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden sm:block">
                          {skill.usedIn}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
