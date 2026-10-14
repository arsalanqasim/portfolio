import { useState } from 'react';
import { motion } from 'motion/react';
import { westernAudio } from '../../utils/westernAudio';

interface RevolverCylinderProps {
  onSpin?: () => void;
  className?: string;
}

export default function RevolverCylinder({ onSpin, className = '' }: RevolverCylinderProps) {
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    westernAudio.playCylinderClick();
    setRotation((prev) => prev + 360 + 60);
    if (onSpin) onSpin();
  };

  return (
    <button
      onClick={spin}
      title="Spin Cylinder"
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border border-border bg-surface text-ink-secondary hover:text-accent hover:border-accent transition-colors cursor-pointer text-xs font-serif ${className}`}
    >
      <motion.svg
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        width="16"
        height="16"
        viewBox="0 0 100 100"
        className="text-accent"
      >
        {/* Outer Cylinder ring */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
        <circle cx="50" cy="50" r="10" fill="currentColor" />
        {/* 6 Chambers */}
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 50 + 26 * Math.cos(rad);
          const cy = 50 + 26 * Math.sin(rad);
          return (
            <circle
              key={idx}
              cx={cx}
              cy={cy}
              r="9"
              fill="currentColor"
              opacity="0.85"
            />
          );
        })}
      </motion.svg>
      <span className="hidden sm:inline font-western text-[10px]">SPIN 6-SHOOTER</span>
    </button>
  );
}
