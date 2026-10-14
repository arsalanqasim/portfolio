import { useEffect, useRef, useState } from 'react';

export default function ChameleonEyes() {
  const [leftPupil, setLeftPupil] = useState({ x: 0, y: 0 });
  const [rightPupil, setRightPupil] = useState({ x: 0, y: 0 });

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate left eye pupil offset
      if (leftEyeRef.current) {
        const rect = leftEyeRef.current.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const dist = Math.min(5, Math.hypot(deltaX, deltaY) / 25);
        setLeftPupil({
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
        });
      }

      // Calculate right eye pupil offset (chameleons can move eyes independently!)
      if (rightEyeRef.current) {
        const rect = rightEyeRef.current.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const dist = Math.min(5, Math.hypot(deltaX, deltaY) / 25);
        setRightPupil({
          x: Math.cos(angle + 0.05) * dist,
          y: Math.sin(angle + 0.05) * dist,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-accent/10 border border-accent/30 shadow-2xs">
      <span className="text-[10px] font-western text-accent tracking-wider mr-1">RANGO'S GAZE:</span>
      {/* Left Eye */}
      <div
        ref={leftEyeRef}
        className="relative w-5 h-5 rounded-full bg-[#f4ebd0] border-2 border-[#8c735c] overflow-hidden flex items-center justify-center shadow-inner"
      >
        <div
          style={{
            transform: `translate(${leftPupil.x}px, ${leftPupil.y}px)`,
          }}
          className="w-2 h-2 rounded-full bg-[#1b1510] transition-transform duration-75"
        >
          <div className="w-0.5 h-0.5 rounded-full bg-white ml-0.5 mt-0.5" />
        </div>
      </div>

      {/* Right Eye */}
      <div
        ref={rightEyeRef}
        className="relative w-5 h-5 rounded-full bg-[#f4ebd0] border-2 border-[#8c735c] overflow-hidden flex items-center justify-center shadow-inner"
      >
        <div
          style={{
            transform: `translate(${rightPupil.x}px, ${rightPupil.y}px)`,
          }}
          className="w-2 h-2 rounded-full bg-[#1b1510] transition-transform duration-75"
        >
          <div className="w-0.5 h-0.5 rounded-full bg-white ml-0.5 mt-0.5" />
        </div>
      </div>
    </div>
  );
}
