/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GLYCOTWIN_SPECS } from '../data';
import { LockOpen, ArrowRight, Play, RefreshCw, Sliders, Info, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export default function ResearchTab() {
  // Simulator state variables
  const [stiffness, setStiffness] = useState<number>(1.2);
  const [complexity, setComplexity] = useState<number>(64);
  const [stepSize, setStepSize] = useState<number>(0.05);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simSteps, setSimSteps] = useState<number>(20);
  const [graphData, setGraphData] = useState<{ t: number; x: number; y: number }[]>([]);
  const [currentSelectedPoint, setCurrentSelectedPoint] = useState<number | null>(null);

  // Generate continuous simulation trajectory using a simple Lotka-Volterra or neural ODE style oscillator
  const generateTrajectory = () => {
    const points = [];
    let x = 1.0;
    let y = 0.5;
    const dt = stepSize;
    // Parameter values based on inputs
    const alpha = stiffness;
    const beta = 1.5;
    const gamma = 1.2;
    const delta = 0.8;

    for (let i = 0; i <= 40; i++) {
      const t = i * dt;
      // Solve next step with Euler integration representing discrete steps of continuous functions
      const dx = (alpha * x - beta * x * y) * (complexity / 64);
      const dy = (-gamma * y + delta * x * y) * (complexity / 64);
      
      x = x + dx * dt;
      y = y + dy * dt;

      // Bound values for visualization
      const boundedX = Math.max(0.1, Math.min(3.5, x));
      const boundedY = Math.max(0.1, Math.min(3.5, y));

      points.push({
        t: parseFloat(t.toFixed(2)),
        x: boundedX,
        y: boundedY
      });
    }
    setGraphData(points);
  };

  useEffect(() => {
    generateTrajectory();
  }, [stiffness, complexity, stepSize]);

  const handleSimulate = () => {
    setIsSimulating(true);
    let step = 0;
    const interval = setInterval(() => {
      setCurrentSelectedPoint(step);
      step++;
      if (step > 40) {
        clearInterval(interval);
        setIsSimulating(false);
        setCurrentSelectedPoint(null);
      }
    }, 80);
  };

  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="relative mt-4">
        {/* Abstract Background Design Accent */}
        <div className="absolute right-0 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 opacity-5 pointer-events-none select-none">
          <div className="h-full w-full rounded-full border-4 border-dashed border-[#58a6ff] animate-spin" style={{ animationDuration: '60s' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left bio detail col span 8 */}
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#58a6ff]">
              <span className="material-symbols-outlined text-sm">terminal</span>
              <span>~/arsalan/profile</span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-[#dfe2eb] sm:text-5xl leading-tight">
              Arsalan Qasim <br />
              <span className="text-[#8b919d]">|</span> AI/ML Engineer
            </h1>

            <p className="font-display text-xl font-medium leading-relaxed text-[#c0c7d4]">
              Bridging theoretical concepts with practical software development. Specializing in advanced machine learning architectures, continuous-depth models, and robust computational engineering.
            </p>

            {/* Social CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://github.com/arsalanqasim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#58a6ff] px-5 py-2 font-mono text-xs font-semibold text-[#58a6ff] rounded hover:bg-[#58a6ff]/10 transition-all cursor-pointer"
              >
                <Cpu className="h-4 w-4" />
                GitHub Profiler
              </a>
              <a
                href="https://www.linkedin.com/in/arsalan-qasim-416a7b258"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#414752] px-5 py-2 font-mono text-xs font-semibold text-[#c0c7d4] rounded hover:border-[#58a6ff] hover:text-[#58a6ff] transition-all cursor-pointer"
              >
                <span>LinkedIn Network</span>
              </a>
            </div>
          </div>

          {/* Right profile photo container col span 4 */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative group w-64 h-64 sm:w-72 sm:h-72 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border border-[#30363d] bg-[#161b22] hover:border-[#58a6ff]/60 transition-all duration-300 shadow-2xl">
              <img
                src="/assets/profile_image.png"
                alt="Arsalan Qasim Portrait"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
              {/* Tactical overlay corners on focus/hover */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#58a6ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#58a6ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#58a6ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#58a6ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research Spotlight */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-10 bg-[#414752]"></div>
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#58a6ff]">
            Featured Research Spotlight
          </h2>
          <div className="h-[1px] flex-grow bg-[#414752]"></div>
        </div>

        {/* Bento Grid layout */}
        <div className="overflow-hidden border border-[#414752] bg-[#1c2026] rounded-lg group">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Content Canvas (Col span 8) */}
            <div className="relative overflow-hidden border-b border-[#414752]/50 bg-[#181c22] p-6 sm:p-8 md:col-span-8 md:border-b-0 md:border-r border-[#414752] flex flex-col justify-between">
              
              {/* Radial Glow Highlight */}
              <div 
                className="pointer-events-none absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  backgroundImage: 'radial-gradient(circle at 100% 0%, #58a6ff 0%, transparent 60%)'
                }}
              ></div>

              <div className="relative z-10">
                {/* Active Research Indicator */}
                <div className="inline-flex items-center gap-2 border border-[#27a640] bg-[#27a640]/5 px-3 py-1 font-mono text-xs font-medium text-[#c0c7d4] rounded mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#67df70] opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#27a640]"></span>
                  </span>
                  Active Research
                </div>

                <h3 className="font-display text-2xl font-bold text-[#dfe2eb] mb-2 font-display">GlycoTwin</h3>
                <h4 className="font-display text-lg font-semibold text-[#58a6ff] mb-4">Biological Simulation via Hybrid Neural ODEs</h4>
                <p className="font-sans text-sm text-[#c0c7d4] leading-relaxed max-w-2xl">
                  A high-fidelity biological simulation framework leveraging Hybrid Neural Ordinary Differential Equations. By bridging traditional mechanistic differential equations with deep continuous-time learning, GlycoTwin establishes a novel architecture for modeling complex, dynamic biological states over time.
                </p>
              </div>

              {/* Whitepaper CTA */}
              <div className="relative z-10 mt-8">
                <button 
                  onClick={() => alert("Loading GlycoTwin Theoretical Specification Whitepaper... (Simulated representation has been recorded in telemetry)")}
                  className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[#58a6ff] hover:text-[#a2c9ff] transition-colors group/link cursor-pointer"
                >
                  Read the Whitepaper
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover/link:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right System Specs Column (Col span 4) */}
            <div className="flex flex-col bg-[#1c2026] md:col-span-4">
              <div className="bg-[#31353c] border-b border-[#414752]/50 px-4 py-3">
                <span className="font-mono text-xs font-semibold text-[#dfe2eb]">System Architecture Specs</span>
              </div>

              <div className="flex-grow divide-y divide-[#414752]/40 font-mono text-xs">
                {GLYCOTWIN_SPECS.map((spec, i) => (
                  <div key={i} className="flex items-center p-3.5 hover:bg-[#181c22]/50 transition-colors">
                    <span className="w-1/3 text-right pr-4 text-[#c0c7d4] font-medium select-none">{spec.key}</span>
                    <span className={`w-2/3 ${spec.isStatus ? 'text-[#67df70] font-bold shadow-sm glow-text-green' : 'text-[#dfe2eb]'}`}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-[#0a0e14]/60 border-t border-[#414752]/50 p-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#c0c7d4]">Repo Access:</span>
                  <span className="flex items-center gap-1.5 font-semibold text-[#58a6ff]">
                    <LockOpen className="h-3.5 w-3.5" />
                    Public
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Neural ODE Simulation Lab */}
      <section className="border border-[#414752]/80 bg-[#161b22] px-6 py-6 rounded-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#21262d] pb-4">
          <div className="flex items-center gap-2.5">
            <Sliders className="h-4 w-4 text-[#58a6ff]" />
            <h3 className="font-display text-md font-semibold text-[#dfe2eb]">Interactive Integration Simulator</h3>
          </div>
          <span className="font-mono text-[10px] text-[#8b919d]">Neural ODE State Integrator v1.02</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls (Col span 5) */}
          <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <p className="font-sans text-xs text-[#c0c7d4] leading-relaxed">
                Interact with the dynamic biological vector fields by altering continuous-depth multipliers and step iterations. Watch the integration trajectory stabilize or oscillate.
              </p>

              {/* Stiffness Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#c0c7d4]">Simulation Stiffness:</span>
                  <span className="font-semibold text-[#58a6ff]">{stiffness.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={stiffness}
                  onChange={(e) => setStiffness(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#21262d] rounded-lg appearance-none cursor-pointer accent-[#58a6ff]"
                />
              </div>

              {/* Hidden Layer Dimension Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#c0c7d4]">Hidden Net Size ($H_d$):</span>
                  <span className="font-semibold text-[#58a6ff]">{complexity} Nodes</span>
                </div>
                <input
                  type="range"
                  min="32"
                  max="256"
                  step="32"
                  value={complexity}
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#21262d] rounded-lg appearance-none cursor-pointer accent-[#58a6ff]"
                />
              </div>

              {/* Integration Step Size Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#c0c7d4]">Step Size ($dt$):</span>
                  <span className="font-semibold text-[#27a640]">{stepSize.toFixed(3)}s</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.15"
                  step="0.01"
                  value={stepSize}
                  onChange={(e) => setStepSize(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#21262d] rounded-lg appearance-none cursor-pointer accent-[#27a640]"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="flex flex-1 items-center justify-center gap-2 rounded bg-[#58a6ff] hover:bg-[#58a6ff]/90 text-black font-semibold font-mono text-xs py-2 px-4 transition disabled:opacity-50 cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-black" />
                Solve ODE Path
              </button>
              <button
                onClick={() => {
                  setStiffness(1.2);
                  setComplexity(64);
                  setStepSize(0.05);
                }}
                className="flex items-center justify-center p-2 rounded border border-[#414752] text-[#c0c7d4] hover:border-[#58a6ff] hover:text-[#58a6ff] transition cursor-pointer"
                title="Reset Parameters"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Virtual Plot Visualization (Col span 7) */}
          <div className="lg:col-span-8 flex flex-col justify-end bg-[#0d1117] border border-[#21262d] p-4 rounded relative overflow-hidden h-[260px]">
            
            {/* Grid Pattern overlays */}
            <div className="absolute inset-0 grid-bg-pattern opacity-40"></div>

            {/* Active coordinates info overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#161b22]/90 border border-[#21262d] px-2 py-1 rounded font-mono text-[9px] text-[#dfe2eb] z-10">
              <Info className="h-3 w-3 text-[#58a6ff]" />
              <span>
                State Vector: [
                {currentSelectedPoint !== null && graphData[currentSelectedPoint] 
                  ? `${graphData[currentSelectedPoint].x.toFixed(2)}, ${graphData[currentSelectedPoint].y.toFixed(2)}` 
                  : `${graphData[0]?.x.toFixed(2)}, ${graphData[0]?.y.toFixed(2)}`}
                ]
              </span>
            </div>

            {/* SVG Plot */}
            <div className="relative z-0 h-full w-full flex items-end">
              <svg className="w-full h-[180px] overflow-visible">
                {/* Horizontal reference line */}
                <line x1="0" y1="90" x2="100%" y2="90" stroke="#21262d" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Simulated continuous path plot line for X */}
                <polyline
                  fill="none"
                  stroke="#58a6ff"
                  strokeWidth="2.5"
                  points={graphData.map((d, i) => `${(i / 40) * 100}%,${180 - d.x * 45}`).join(' ')}
                />

                {/* Simulated continuous path plot line for Y */}
                <polyline
                  fill="none"
                  stroke="#27a640"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  points={graphData.map((d, i) => `${(i / 40) * 100}%,${180 - d.y * 45}`).join(' ')}
                />

                {/* Glowing simulation tracking node moving dynamically along solved route */}
                {currentSelectedPoint !== null && graphData[currentSelectedPoint] && (
                  <circle
                    cx={`${(currentSelectedPoint / 40) * 100}%`}
                    cy={180 - graphData[currentSelectedPoint].x * 45}
                    r="6"
                    className="fill-[#58a6ff] filter drop-shadow-[0_0_6px_rgba(88,166,255,1)]"
                  />
                )}
              </svg>
            </div>

            {/* Label indicators */}
            <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-[#8b919d] border-t border-[#21262d] pt-2 relative z-10 select-none">
              <span className="flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#58a6ff]"></span>
                $x(t)$ Membrane Potential
              </span>
              <span>Continuous Integration Epoch $\tau \in [0, 2]$</span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded bg-[#27a640] animate-pulse"></span>
                $y(t)$ Gate Volts
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
