/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { OPERATIONAL_HISTORY, TERMINAL_YAML } from '../data';
import { TerminalLine } from '../types';
import { 
  School, 
  Dumbbell, 
  Workflow, 
  Calendar, 
  BookOpen, 
  Compass, 
  HelpCircle,
  Atom, 
  ArrowRight,
  ShieldAlert,
  Terminal,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AboutTab() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<'refinement' | 'strength' | null>(null);
  
  // Terminal Emulator States
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: 'Diagnostic Shell v1.0.4 - Automated Registry Boot.', type: 'success' },
    { text: 'Type "help" to view directory actions.', type: 'output' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom on change
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    const newHistory = [...terminalHistory, { text: `user@arsalan:~# ${terminalInput}`, type: 'input' as const }];
    let response: TerminalLine[] = [];

    switch (command) {
      case 'help':
        response = [
          { text: 'Available commands:', type: 'output' },
          { text: '  cat current_focus.yml - Display active systems config yaml', type: 'output' },
          { text: '  skills                - List certified technical abilities', type: 'output' },
          { text: '  bio                   - Output physical text profile', type: 'output' },
          { text: '  socials               - View live communications channels', type: 'output' },
          { text: '  run-ode               - Fire simulated neural ordinary differential engine query', type: 'success' },
          { text: '  clear                 - Wipe terminal buffer logs', type: 'output' }
        ];
        break;
      case 'cat current_focus.yml':
      case 'cat':
        response = TERMINAL_YAML.split('\n').map(line => ({ text: line, type: 'output' as const }));
        break;
      case 'skills':
        response = [
          { text: 'AI/ML Engineering: PyTorch, Scikit-learn, TensorFlow, Neural ODE models', type: 'success' },
          { text: 'Math & Computes: SciPy, NumPy, Pandas, continuous integrations', type: 'success' },
          { text: 'Automation Pipelines: n8n, Make (Integromat), Distributed Web Scrapers', type: 'success' }
        ];
        break;
      case 'bio':
        response = [
          { text: 'Subject: Arsalan Qasim', type: 'output' },
          { text: 'Academic Status: Final Year Artificial Intelligence student (7th Semester) at COMSATS Islamabad', type: 'output' },
          { text: 'Philosophy: Emphasizes mathematical rigor, calisthenics-driven consistency, and complete, production-ready system designs.', type: 'output' }
        ];
        break;
      case 'socials':
        response = [
          { text: 'GitHub Profile: https://github.com/arsalanqasim', type: 'success' },
          { text: 'LinkedIn Net: https://www.linkedin.com/in/arsalan-qasim-416a7b258', type: 'success' },
          { text: 'Email Gateway: arsalanqasim400@gmail.com', type: 'success' }
        ];
        break;
      case 'run-ode':
        response = [
          { text: 'Booting PyTorch neural ode environment...', type: 'output' },
          { text: 'Loaded solver coefficients: stiffness=1.2, step_size=0.05, complexity_nodes=64', type: 'output' },
          { text: 'Executing continuous boundary conditions integrations loop...', type: 'output' },
          { text: 'Integration stabilized successfully! Continuous epochs result: [SYSTEM_STATE: OPTIMAL]', type: 'success' }
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = [
          { text: `Error: command "${command}" not found in system prompt registry. Type "help" for support.`, type: 'error' }
        ];
    }

    setTerminalHistory([...newHistory, ...response]);
    setTerminalInput('');
  };

  return (
    <div className="space-y-12">
      
      {/* Header Summary / Asymmetric Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left column / Bio details (Col span 7) */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-[#dfe2eb] sm:text-4xl">
              Engineering Precision.
            </h1>
            <p className="font-mono text-xs text-[#58a6ff] tracking-wide mt-2">
              ~/profile/arsalan-qasim.sh
            </p>
          </div>

          <div className="relative overflow-hidden border border-[#21262d] bg-[#1c2026] p-6 rounded-lg group hover:border-[#30363d] transition-colors duration-300">
            {/* Visual colored strip */}
            <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#58a6ff] opacity-60 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="space-y-4 font-sans text-sm text-[#c0c7d4] leading-relaxed">
              <p>
                I am a final-year Artificial Intelligence student at COMSATS University Islamabad, specializing in bridging theoretical machine learning architectures with robust software engineering practices. My approach to AI is fundamentally systemic—focusing on the entire pipeline from data ingestion to model deployment.
              </p>
              <p>
                Beyond academia, I operate as a freelance AI &amp; automation specialist, architecting intelligent agents and streamlining e-commerce operations. I build systems that prioritize mathematical rigor, structural integrity, and measurable business value over superficial metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Right column / Portrait frame (Col span 5) */}
        <div className="md:col-span-5 h-[320px] rounded-lg border border-[#30363d] relative overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop"
            alt="Arsalan Qasim Professional Photo"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
          
          {/* Subtle design labels */}
          <div className="absolute top-3 left-4 font-mono text-[9px] text-[#dfe2eb]/60 bg-black/45 px-2 py-0.5 rounded backdrop-blur-xs select-none">SYS.AVATAR.01</div>
          <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#dfe2eb]">
            <span className="font-semibold block text-sm">Arsalan Qasim</span>
            <span className="text-[9px] text-[#58a6ff]">Islamabad, PK</span>
          </div>
          <div className="absolute bottom-3 right-4 font-mono text-[9px] text-[#27a640] uppercase tracking-wide glow-text-green font-bold bg-[#27a640]/10 border border-[#27a640]/30 px-2.5 py-0.5 rounded select-none">SYS.ACTIVE</div>
        </div>

      </section>

      {/* Bento Grid layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Discipline & Metaphor Calisthenics Card (Col span 6) */}
        <div className="md:col-span-6 bg-[#181c22] border border-[#21262d] rounded-lg p-6 flex flex-col justify-between group hover:border-[#30363d] transition-colors">
          
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#21262d] mb-4">
              <Dumbbell className="h-4 w-4 text-[#58a6ff]" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#dfe2eb]">Discipline &amp; Metaphor</h2>
            </div>

            <h3 className="font-display text-xl font-bold text-[#dfe2eb] mb-2">Structural Integrity</h3>
            <p className="font-sans text-xs text-[#c0c7d4] leading-relaxed mb-6">
              My commitment to calisthenics is inseparable from my approach to software engineering. Both disciplines demand rigorous consistency, progressive overload, and an obsession with foundational mechanics.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedDiscipline(selectedDiscipline === 'refinement' ? null : 'refinement')}
              className={`p-3 bg-[#0a0e14] border rounded font-mono text-[11px] font-semibold text-left transition relative cursor-pointer ${
                selectedDiscipline === 'refinement' ? 'border-[#58a6ff] text-[#58a6ff]' : 'border-[#21262d] text-[#c0c7d4] hover:border-[#414752]'
              }`}
            >
              <span>Iterative Refinement</span>
              <AnimatePresence>
                {selectedDiscipline === 'refinement' && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-sans text-[10px] text-[#c0c7d4] mt-1.5 leading-relaxed font-normal"
                  >
                    Consistent daily practice of forms breeds immaculate model outputs.
                  </motion.p>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setSelectedDiscipline(selectedDiscipline === 'strength' ? null : 'strength')}
              className={`p-3 bg-[#0a0e14] border rounded font-mono text-[11px] font-semibold text-left transition relative cursor-pointer ${
                selectedDiscipline === 'strength' ? 'border-[#58a6ff] text-[#58a6ff]' : 'border-[#21262d] text-[#c0c7d4] hover:border-[#414752]'
              }`}
            >
              <span>Systemic Strength</span>
              <AnimatePresence>
                {selectedDiscipline === 'strength' && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-sans text-[10px] text-[#c0c7d4] mt-1.5 leading-relaxed font-normal"
                  >
                    Rigid load tolerance guarantees robust stability during execution queries.
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>

        {/* Academic Foundation Card (Col span 6) */}
        <div className="md:col-span-6 bg-[#181c22] border border-[#21262d] rounded-lg p-6 flex flex-col justify-between group hover:border-[#30363d] transition-colors">
          
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#21262d] mb-4">
              <School className="h-4 w-4 text-[#58a6ff]" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#dfe2eb]">Academic Foundation</h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h3 className="font-sans text-sm font-bold text-[#dfe2eb]">BS Artificial Intelligence</h3>
                <p className="font-mono text-xs text-[#8b919d] mt-1">COMSATS University Islamabad</p>
              </div>
              <span className="shrink-0 font-mono text-[9px] font-bold border border-[#414752] bg-[#0a0e14] text-[#c0c7d4] px-2.5 py-1 rounded">
                7th Semester
              </span>
            </div>
          </div>

          <div className="w-full bg-[#0a0e14] border border-[#21262d] p-3 rounded flex items-start gap-3">
            <span className="p-1.5 rounded bg-[#58a6ff]/10 text-[#58a6ff] shrink-0">
              <BookOpen className="h-4 w-4" />
            </span>
            <div className="font-mono text-xs text-[#c0c7d4] leading-relaxed">
              <span className="text-[#58a6ff] font-bold">Focus:</span> Advanced ML architectures, Neural ODEs, Computer Vision, and computational modeling.
            </div>
          </div>

        </div>

        {/* Operational History (Col span 12) */}
        <div className="md:col-span-12 bg-[#181c22] border border-[#21262d] rounded-lg p-6">
          <div className="flex items-center gap-2 pb-3 border-b border-[#21262d] mb-6">
            <Workflow className="h-3.5 w-3.5 text-[#58a6ff]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#dfe2eb]">Operational History</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPERATIONAL_HISTORY.map((item, i) => (
              <div 
                key={i} 
                className="relative border-l-2 border-[#21262d] pl-5 py-2 group/timeline hover:border-[#58a6ff] transition-colors"
              >
                {/* Glowing target node along timeline */}
                <div className="absolute -left-[5px] top-4 h-2 w-2 rounded-full bg-[#21262d] group-hover/timeline:bg-[#58a6ff] transition-all"></div>
                
                <span className="font-mono text-[10px] text-[#8b919d] block leading-none mb-1">{item.period}</span>
                <h4 className="font-sans text-sm font-semibold text-[#dfe2eb]">{item.role}</h4>
                <p className="font-mono text-xs text-[#8b919d] mt-0.5">{item.company}</p>
                <p className="font-sans text-xs text-[#c0c7d4] leading-relaxed mt-2.5">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Dynamic Terminal Shell Emulator Panel */}
      <section className="bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden shadow-2xl">
        
        {/* Terminal Title Header */}
        <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
          <div className="flex gap-1.5 select-none">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
          </div>
          <div className="font-mono text-xs text-[#dfe2eb]/60">~/arsalan/current_focus.yml</div>
          <div className="w-6"></div> {/* balance spacer */}
        </div>

        {/* Terminal outputs */}
        <div className="p-4 overflow-y-auto max-h-[340px] font-mono text-xs leading-relaxed space-y-2 scrollbar select-text">
          {terminalHistory.map((line, idx) => {
            let style = 'text-[#c0c7d4]';
            if (line.type === 'input') style = 'text-[#58a6ff] font-semibold';
            else if (line.type === 'success') style = 'text-[#67df70] font-semibold';
            else if (line.type === 'error') style = 'text-[#ffb4ab] font-bold';
            
            return (
              <div key={idx} className={`${style} whitespace-pre-wrap`}>
                {line.text}
              </div>
            );
          })}
          <div ref={terminalBottomRef} />
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleTerminalSubmit} className="bg-[#0b0e14] border-t border-[#30363d] px-4 py-2 bg-[#090a0f] flex items-center relative z-10">
          <ChevronRight className="h-4 w-4 text-[#58a6ff] shrink-0" />
          <input
            type="text"
            placeholder="Type 'help' for available actions, or query yaml..."
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="flex-grow bg-transparent border-none text-xs px-2 outline-none py-1 text-[#dfe2eb] font-mono focus:outline-none focus:ring-0 placeholder-[#414752]"
          />
          <div className="h-3 w-1.5 bg-[#58a6ff] animate-ping shrink-0 ml-1"></div>
        </form>

      </section>

    </div>
  );
}
