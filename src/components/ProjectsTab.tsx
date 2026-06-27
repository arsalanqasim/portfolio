/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { 
  Gamepad2, 
  Bug, 
  Wallet, 
  ShieldAlert, 
  Send, 
  TrendingUp, 
  Search, 
  Clock, 
  Sliders, 
  Play, 
  Maximize2, 
  X, 
  HelpCircle,
  Code2,
  Github,
  Activity,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Help map icons to strings dynamically using Lucide React
const iconMap: { [key: string]: any } = {
  Activity: Activity,
  Eye: Eye,
  Gamepad2: Gamepad2,
  Bug: Bug
};

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // TriageIQ Interactive Tool states
  const [triageText, setTriageText] = useState('');
  const [triageResults, setTriageResults] = useState<{
    category: string;
    urgency: string;
    team: string;
    confidence: string;
  } | null>(null);
  const [isTriageAnalyzing, setIsTriageAnalyzing] = useState(false);

  // Dino-AI Interactive Tool states
  const [generationsCount, setGenerationsCount] = useState(1);
  const [dynoScores, setDynoScores] = useState<number[]>([150, 420, 890, 1540, 3100]);
  const [mutating, setMutating] = useState(false);

  // Handlers for TriageIQ interactive predictions
  const handleTriageQuery = (e: FormEvent) => {
    e.preventDefault();
    if (!triageText.trim()) return;

    setIsTriageAnalyzing(true);
    setTimeout(() => {
      const txt = triageText.toLowerCase();
      let category = 'Bug Classification';
      let urgency = 'P3 - Medium';
      let team = 'Engineering Support';
      let confidence = '82.4%';

      if (txt.includes('crash') || txt.includes('error') || txt.includes('down') || txt.includes('cannot log in') || txt.includes('broken')) {
        category = 'Runtime Malfunction';
        urgency = 'P1 - Critical';
        team = 'SRE Core Operations';
        confidence = '94.1%';
      } else if (txt.includes('slow') || txt.includes('timeout') || txt.includes('latency') || txt.includes('leak') || txt.includes('memory')) {
        category = 'Performance Optimization';
        urgency = 'P2 - High';
        team = 'Infrastructure Fleet';
        confidence = '88.7%';
      } else if (txt.includes('pricing') || txt.includes('bill') || txt.includes('subscription') || txt.includes('payment')) {
        category = 'Billing Integration';
        urgency = 'P2 - High';
        team = 'Commerce Core';
        confidence = '91.3%';
      } else if (txt.includes('feature') || txt.includes('suggest') || txt.includes('would be cool') || txt.includes('add button')) {
        category = 'Request / Proposal';
        urgency = 'P4 - Non-Urgent';
        team = 'Product Management Division';
        confidence = '79.2%';
      }

      setTriageResults({ category, urgency, team, confidence });
      setIsTriageAnalyzing(false);
    }, 1000);
  };

  // Handler for Dino-AI Neuroevolution mutator iteration
  const triggerMutateBreed = () => {
    setMutating(true);
    setTimeout(() => {
      const nextGen = generationsCount + 1;
      const lastScore = dynoScores[dynoScores.length - 1];
      // Generate a dynamic evolved score improvement
      const gain = Math.floor(lastScore * (0.3 + Math.random() * 0.5));
      const nextScore = Math.min(99999, lastScore + gain);
      
      setGenerationsCount(nextGen);
      setDynoScores([...dynoScores, nextScore]);
      setMutating(false);
    }, 1200);
  };

  return (
    <div className="space-y-12">
      
      {/* Header Section */}
      <header className="border-b border-[#21262d] pb-6">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs text-[#58a6ff] uppercase tracking-widest">~/directory/portfolio</span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#dfe2eb] sm:text-4xl">
            Engineering Catalog
          </h1>
          <p className="font-mono text-xs text-[#c0c7d4] max-w-2xl mt-2 leading-relaxed">
            &gt; Executing functional specs for specialized machine learning models, neuroevolution algorithms, and natural language processing pipelines. Architecture and implementation details below.
          </p>
        </div>
      </header>

      {/* Grid of Catalog Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => {
          const IconComponent = iconMap[project.icon] || Code2;
          return (
            <article 
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#21262d] bg-[#161b22] p-6 transition-colors duration-300 hover:border-[#30363d] cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Pulsing visual border strip on hover */}
              <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#58a6ff] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

              {/* Top Row with Title & Segment */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <IconComponent className="h-5 w-5 text-[#58a6ff]" />
                    <h2 className="font-display text-lg font-bold text-[#dfe2eb] tracking-tight group-hover:text-[#58a6ff] transition-colors">
                      {project.title}
                    </h2>
                  </div>
                  <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded border border-[#21262d] text-[#dfe2eb]/90 ${
                    project.tag.includes('NLP') ? 'border-[#27a640]/40 text-[#67df70]' : 'border-[#414752] text-[#c0c7d4]'
                  }`}>
                    {project.tag}
                  </span>
                </div>

                {/* Narrative description */}
                <p className="font-sans text-xs text-[#c0c7d4] leading-relaxed mb-6 group-hover:text-[#dfe2eb] transition-colors">
                  {project.description}
                </p>
              </div>

              {/* Systems Metadata Technical Spreadsheet Grid */}
              <div className="space-y-2 border-t border-[#21262d] pt-4 font-mono text-[11px] leading-relaxed">
                <div className="flex gap-4">
                  <span className="w-16 shrink-0 text-right text-[#c0c7d4] font-semibold select-none">LOGIC:</span>
                  <span className="text-[#dfe2eb]/95">{project.logic}</span>
                </div>
                <div className="flex gap-4">
                  <span className="w-16 shrink-0 text-right text-[#c0c7d4] font-semibold select-none">STACK:</span>
                  <span className="text-[#dfe2eb]/95">{project.stack}</span>
                </div>
                <div className="flex gap-4">
                  <span className="w-16 shrink-0 text-right text-[#c0c7d4] font-semibold select-none">IMPACT:</span>
                  <span className="text-[#dfe2eb]/95">{project.impact}</span>
                </div>
              </div>

              {/* Action and hover buttons footer */}
              <div className="mt-5 pt-4 border-t border-[#21262d] flex items-center justify-between gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 border border-[#414752] hover:border-[#58a6ff] px-3 py-1.5 rounded text-[10.5px] font-mono text-[#c0c7d4] hover:text-[#58a6ff] bg-[#0d1117]/80 hover:bg-[#58a6ff]/5 transition-all cursor-pointer select-none"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
                <span className="font-mono text-[10px] text-[#58a6ff] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 select-none ml-auto">
                  Open Interactive Spec
                  <Maximize2 className="h-3 w-3" />
                </span>
              </div>
            </article>
          );
        })}
      </section>

      {/* Full Interactive Trial spec detailed view model (AnimatePresence) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl border border-[#30363d] bg-[#161b22] px-6 py-6 rounded-lg text-left shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#21262d] pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#58a6ff]">System Simulation Unit</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#27a640] animate-pulse"></span>
                </div>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setTriageResults(null);
                    setTriageText('');
                  }}
                  className="rounded p-1 text-[#c0c7d4] hover:bg-[#21262d] hover:text-[#dfe2eb] transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#dfe2eb]">{selectedProject.title} Specs</h3>
                  <p className="mt-1 font-mono text-[11px] text-[#8b919d]">Category: {selectedProject.category}</p>
                </div>

                {/* Implementation variables listed as a datasheet specs block */}
                <div className="bg-[#0d1117] border border-[#21262d] px-4 py-4 rounded font-mono text-[11px] space-y-2.5">
                  <div className="flex border-b border-[#21262d]/50 pb-2">
                    <span className="w-24 font-bold text-[#58a6ff]">Algorithm</span>
                    <span className="text-[#dfe2eb]">{selectedProject.detailedSpecs?.algorithm}</span>
                  </div>
                  <div className="flex border-b border-[#21262d]/50 pb-2">
                    <span className="w-24 font-bold text-[#58a6ff]">Input Vector</span>
                    <span className="text-[#dfe2eb]">{selectedProject.detailedSpecs?.input}</span>
                  </div>
                  <div className="flex border-b border-[#21262d]/50 pb-2">
                    <span className="w-24 font-bold text-[#58a6ff]">Output Format</span>
                    <span className="text-[#dfe2eb]">{selectedProject.detailedSpecs?.output}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 font-bold text-[#58a6ff]">Time Complexity</span>
                    <span className="text-[#27a640] font-bold">{selectedProject.detailedSpecs?.complexity}</span>
                  </div>
                </div>

                {/* LIVE DEMO: TriageIQ Automated Classifier */}
                {selectedProject.id === 'triage-iq' && (
                  <div className="border-t border-[#21262d] pt-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Bug className="h-4 w-4 text-[#27a640]" />
                      <h4 className="font-mono text-xs font-semibold text-[#dfe2eb]">Automated Intent Predictor Lab</h4>
                    </div>

                    <form onSubmit={handleTriageQuery} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="e.g., Fatal crash on user sign-out: system memory out-of-bounds error"
                        value={triageText}
                        onChange={(e) => setTriageText(e.target.value)}
                        className="flex-grow bg-[#0d1117] border border-[#414752] rounded text-xs px-3 py-2 font-sans placeholder-[#8b919d] text-[#dfe2eb] focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#58a6ff]"
                      />
                      <button
                        type="submit"
                        disabled={isTriageAnalyzing || !triageText.trim()}
                        className="bg-[#58a6ff] hover:bg-[#58a6ff]/90 disabled:opacity-50 text-black px-4 py-2 font-mono text-xs font-bold rounded flex items-center gap-1.5 transition cursor-pointer"
                      >
                        {isTriageAnalyzing ? (
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
                        ) : (
                          <>
                            <Send className="h-3 w-3" />
                            Classify
                          </>
                        )}
                      </button>
                    </form>

                    {/* Results of predictive logic output */}
                    {triageResults && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#181c22] border border-[#27a640]/40 p-3.5 rounded font-mono text-[11px] grid grid-cols-2 gap-y-2 gap-x-4"
                      >
                        <div>
                          <span className="text-[#c0c7d4] block">PREDICTED CATEGORY:</span>
                          <span className="text-[#dfe2eb] font-bold underline decoration-[#27a640]/60">{triageResults.category}</span>
                        </div>
                        <div>
                          <span className="text-[#c0c7d4] block">URGENCY METRIC:</span>
                          <span className={`font-bold ${triageResults.urgency.includes('P1') ? 'text-[#ffb4ab] animate-pulse' : 'text-[#67df70]'}`}>{triageResults.urgency}</span>
                        </div>
                        <div>
                          <span className="text-[#c0c7d4] block">TARGET VECTOR TEAM:</span>
                          <span className="text-[#dfe2eb]">{triageResults.team}</span>
                        </div>
                        <div>
                          <span className="text-[#c0c7d4] block">MODEL CONFIDENCE:</span>
                          <span className="text-[#58a6ff] font-bold">{triageResults.confidence}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* LIVE DEMO: DQN Drone Lab Agent Training */}
                {selectedProject.id === 'neon-dqn' && (
                  <div className="border-t border-[#21262d] pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4 text-[#58a6ff]" />
                        <h4 className="font-mono text-xs font-semibold text-[#dfe2eb]">DQN Drone Navigation Training Sandbox</h4>
                      </div>
                      <span className="font-mono text-[10px] text-[#dfe2eb]/60 bg-[#21262d] px-2 py-0.5 rounded">Episode {generationsCount * 300} / 3000</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Train action */}
                      <div className="md:col-span-4 flex flex-col justify-center bg-[#0d1117] border border-[#21262d] p-3 rounded">
                        <p className="font-sans text-[10px] text-[#c0c7d4] mb-3 leading-relaxed">
                          Train the Dueling Double DQN agent on 6x32x32 observation tensors with continuous rewards. Observe curriculum learning convergence.
                        </p>
                        <button
                          onClick={triggerMutateBreed}
                          disabled={mutating}
                          className="w-full bg-[#27a640] hover:bg-[#27a640]/90 disabled:opacity-50 text-white font-mono text-[11px] py-1.5 px-3 rounded flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <TrendingUp className="h-3.5 w-3.5" />
                          {mutating ? 'Simulating Episodes...' : 'Train 300 Episodes'}
                        </button>
                      </div>

                      {/* Path Rewards dynamic chart visualizer */}
                      <div className="md:col-span-8 bg-[#0d1117] border border-[#21262d] p-3.5 rounded flex flex-col justify-end min-h-[110px]">
                        <div className="flex items-end justify-between h-[60px] gap-1 px-4">
                          {dynoScores.map((score, i) => {
                            const ratio = score / 99999;
                            const h = Math.max(10, Math.floor(ratio * 60));
                            return (
                              <div key={i} className="flex flex-col items-center flex-1">
                                <span className="font-mono text-[8px] text-[#58a6ff] mb-1">{score}</span>
                                <div 
                                  className="w-full rounded-t bg-[#58a6ff]" 
                                  style={{ height: `${h}px` }}
                                ></div>
                                <span className="font-mono text-[8.5px] mt-1 text-[#8b919d]">E{(i+1)*300}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-2 text-center border-t border-[#21262d] pt-1.5">
                          <span className="font-mono text-[9px] text-[#c0c7d4]">Best Drone Path Reward reached: {dynoScores[dynoScores.length - 1]}pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Close & Repository Actions CTA */}
              <div className="mt-6 flex items-center justify-between border-t border-[#21262d] pt-4 gap-4">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-[#58a6ff] bg-[#58a6ff]/5 px-4 py-2 font-mono text-xs font-semibold text-[#58a6ff] rounded hover:bg-[#58a6ff]/15 transition-all cursor-pointer"
                  >
                    <Github className="h-4 w-4" />
                    <span>Clone Repository</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setTriageResults(null);
                    setTriageText('');
                  }}
                  className="bg-[#21262d] hover:bg-[#30363d] text-[#dfe2eb] px-5 py-2 font-mono text-xs rounded transition cursor-pointer ml-auto"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
