import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { westernAudio } from '../../utils/westernAudio';

export default function SaloonDoors() {
  const [isOpen, setIsOpen] = useState(false);

  const swingDoors = () => {
    westernAudio.playPaperRustle();
    westernAudio.playCylinderClick();
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2400);
  };

  return (
    <>
      <button
        onClick={swingDoors}
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-border bg-surface text-ink-secondary hover:text-accent hover:border-accent transition-colors cursor-pointer text-xs font-serif"
        title="Swing Saloon Doors"
      >
        <span className="font-western text-[10px]">🚪 KICK SALOON DOORS</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            style={{ perspective: 1200 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-between overflow-hidden"
          >
            {/* Left Saloon Door */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{
                rotateY: [-110, 35, -25, 10, -5, 0],
              }}
              exit={{ rotateY: -110, opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              style={{ transformOrigin: 'left center' }}
              className="w-1/2 h-[75vh] bg-[#3d2b1f] border-4 border-[#241911] shadow-2xl relative flex flex-col justify-between p-6 opacity-95"
            >
              {/* Slats */}
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-[#4a3526] border border-[#241911] rounded-xs shadow-inner" />
                ))}
              </div>
              <div className="western-font text-center text-accent/80 text-lg tracking-widest">
                ★ DIRT SALOON ★
              </div>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-[#4a3526] border border-[#241911] rounded-xs shadow-inner" />
                ))}
              </div>
            </motion.div>

            {/* Right Saloon Door */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{
                rotateY: [110, -35, 25, -10, 5, 0],
              }}
              exit={{ rotateY: 110, opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              style={{ transformOrigin: 'right center' }}
              className="w-1/2 h-[75vh] bg-[#3d2b1f] border-4 border-[#241911] shadow-2xl relative flex flex-col justify-between p-6 opacity-95"
            >
              {/* Slats */}
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-[#4a3526] border border-[#241911] rounded-xs shadow-inner" />
                ))}
              </div>
              <div className="western-font text-center text-accent/80 text-lg tracking-widest">
                ★ NO WEAPONS ★
              </div>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-[#4a3526] border border-[#241911] rounded-xs shadow-inner" />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
