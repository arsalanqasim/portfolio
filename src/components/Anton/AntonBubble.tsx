/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';

interface AntonBubbleProps {
  message: string;
  visible: boolean;
  isUpsideDown?: boolean;
}

export function AntonBubble({ message, visible, isUpsideDown = false }: AntonBubbleProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: isUpsideDown ? -10 : 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: isUpsideDown ? -8 : 8, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`absolute z-50 pointer-events-none select-none max-w-[220px] sm:max-w-[260px] ${
            isUpsideDown 
              ? 'top-[110%] left-1/2 -translate-x-1/2' 
              : 'bottom-[110%] right-[10px]'
          }`}
          // Screen reader accessibility
          role="status"
          aria-live="polite"
        >
          <div className="bg-surface border border-border text-ink px-4 py-2.5 rounded-2xl shadow-xl text-xs sm:text-sm font-medium leading-relaxed relative">
            {message}
            
            {/* Speech bubble arrow */}
            <div
              className={`absolute w-2.5 h-2.5 bg-surface border-border rotate-45 ${
                isUpsideDown
                  ? 'top-[-6px] left-1/2 -translate-x-1/2 border-t border-l'
                  : 'bottom-[-6px] right-[40px] border-r border-b'
              }`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
