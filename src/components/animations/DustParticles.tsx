import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Initialize 45 sand particles
    const count = 45;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedX: Math.random() * 1.2 + 0.4, // Drifts right
        speedY: (Math.random() - 0.3) * 0.5, // Slight upward/downward drift
        opacity: Math.random() * 0.4 + 0.15,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > width) p.x = -10;
        if (p.y > height) p.y = -10;
        if (p.y < -10) p.y = height + 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(189, 72, 22, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Dust Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      />

      {/* Occasional Windblown Tumbleweed */}
      <motion.div
        initial={{ x: '-150px', y: '0px', rotate: 0 }}
        animate={{
          x: ['-10vw', '110vw'],
          y: ['0px', '-25px', '0px', '-35px', '0px', '-20px', '0px'],
          rotate: [0, 1440],
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 12,
          duration: 10,
          ease: 'linear',
        }}
        className="pointer-events-none fixed bottom-12 z-20 opacity-70"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 100 100"
          className="text-accent-muted filter drop-shadow"
        >
          <g stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.85">
            <circle cx="50" cy="50" r="32" strokeDasharray="6 3" />
            <circle cx="50" cy="50" r="22" strokeDasharray="4 4" />
            <path d="M20 50 Q 50 15 80 50" />
            <path d="M25 65 Q 50 85 75 65" />
            <path d="M35 25 Q 50 50 65 75" />
            <path d="M65 25 Q 50 50 35 75" />
            <path d="M15 35 Q 50 45 85 35" />
            <path d="M18 68 Q 50 55 82 68" />
          </g>
        </svg>
      </motion.div>
    </>
  );
}
