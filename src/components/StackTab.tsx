/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { STACK_AI, STACK_TOOLING, STACK_AUTOMATION } from '../data';
import { 
  Plus, 
  Binary, 
  Terminal, 
  Network, 
  CheckCircle2, 
  ChevronRight,
  Workflow,
  Cpu,
  BookmarkCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function StackTab() {
  const [selectedAIStack, setSelectedAIStack] = useState<string | null>(null);
  const [selectedToolIdx, setSelectedToolIdx] = useState<number | null>(null);

  // Map technologies to the internal projects that utilize them
  const techProjectRelation: { [key: string]: { project: string; role: string }[] } = {
    'PyTorch': [
      { project: 'GlycoTwin', role: 'Continuous-Depth ODE Integration gradient solving' }
    ],
    'Scikit-learn': [
      { project: 'TriageIQ', role: 'Support ticket routing SVM Classification' },
      { project: 'Fake News Def', role: 'Credibility logistics and documentation modeling' }
    ],
    'TensorFlow': [
      { project: 'Dino-AI', role: 'Alternate evolutionary state deep controller weight tests' }
    ],
    'Neural ODEs': [
      { project: 'GlycoTwin', role: 'Dynamic biological system model trajectory solver' }
    ],
    'Python': [
      { project: 'All Catalog Projects', role: 'Primary core algorithmic language framework' }
    ],
    'Git/GitHub': [
      { project: 'TriageIQ', role: 'Triage ticket simulation pipeline hooks' }
    ],
    'NumPy': [
      { project: 'Dino-AI', role: 'High-speed matrix multiplication of neuro-genes' }
    ],
    'Pandas': [
      { project: 'Budgy', role: 'Automated categorical CSV/Excel statement compiler' }
    ],
    'Matplotlib': [
      { project: 'Budgy', role: 'Expense aggregates visual chart plotting renderer' }
    ]
  };

  return (
    <div className="space-y-12">
      
      {/* Header Section */}
      <section className="relative border-b border-[#21262d] pb-6 flex flex-col gap-1.5">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#dfe2eb] sm:text-4xl">System Architecture &amp; Stack</h1>
        <p className="font-mono text-xs text-[#c0c7d4] max-w-2xl leading-relaxed">
          // An analytical overview of the primary technologies, frameworks, and infrastructure utilized in constructing intelligent agents and resilient pipelines.
        </p>
      </section>

      {/* Bento Grid layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Card 1: AI & Machine Learning (Col span 8) */}
        <div className="md:col-span-8 bg-[#1c2026] border border-[#21262d] rounded-lg p-6 flex flex-col gap-6 group hover:border-[#414752] transition-colors relative overflow-hidden">
          
          <div className="flex items-center gap-2 border-b border-[#21262d]/80 pb-3">
            <span className="p-1 rounded bg-[#58a6ff]/10 text-[#58a6ff]">
              <Binary className="h-4 w-4" />
            </span>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#58a6ff]">AI &amp; Machine Learning</h2>
            <span className="ml-auto font-mono text-[9px] text-[#8b919d]">Click item to inspect mapping</span>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            {STACK_AI.map((item) => {
              const isSelected = selectedAIStack === item.name;

              return (
                <div key={item.name} className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedAIStack(isSelected ? null : item.name)}
                    className={`flex justify-between items-center bg-[#0a0e14] p-3 border rounded transition-all cursor-pointer text-left w-full ${
                      isSelected 
                        ? 'border-[#58a6ff] bg-[#58a6ff]/5' 
                        : 'border-[#21262d] hover:border-[#30363d]'
                    }`}
                  >
                    <div className="font-mono text-xs text-[#dfe2eb] font-semibold shrink-0">{item.name}</div>
                    
                    <div className="flex items-center gap-4 flex-grow justify-end max-w-[200px] sm:max-w-[340px]">
                      {/* Percentage progress bar */}
                      <div className="flex-grow flex items-center gap-3">
                        <div className="h-2 flex-grow bg-[#21262d] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-[#58a6ff] rounded-full"
                          />
                        </div>
                        <span className="font-mono text-xs text-[#58a6ff] font-bold shrink-0 min-w-[36px] text-right">{item.value}%</span>
                      </div>
                      <ChevronRight className={`h-3 w-3 text-[#8b919d] shrink-0 transition-transform ${isSelected ? 'rotate-90 text-[#58a6ff]' : ''}`} />
                    </div>
                  </button>

                  {/* Interactive project linkage expander */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-[#161b22] border-x border-b border-[#58a6ff]/40 p-4 rounded-b-md mx-[1px]"
                      >
                        <h4 className="font-mono text-[10px] uppercase text-[#58a6ff] tracking-wider mb-2 flex items-center gap-1">
                          <BookmarkCheck className="h-3 w-3" />
                          System Implementation Usage
                        </h4>
                        
                        {techProjectRelation[item.name] ? (
                          <div className="space-y-3">
                            {techProjectRelation[item.name].map((rel, i) => (
                              <div key={i} className="font-mono text-[11px] leading-relaxed">
                                <span className="text-[#67df70] font-semibold">&gt; {rel.project}:</span>
                                <p className="text-[#c0c7d4] mt-0.5 ml-3">{rel.role}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="font-mono text-[11px] text-[#8b919d]">
                            No diagnostic registry found. Applied as helper optimization tools inside system frameworks.
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* Card 2: Development & Tooling (Col span 4) */}
        <div className="md:col-span-4 bg-[#1c2026] border border-[#21262d] rounded-lg p-6 flex flex-col gap-6 group hover:border-[#414752] transition-colors">
          
          <div className="flex items-center gap-2 border-b border-[#21262d]/80 pb-3">
            <span className="p-1 rounded bg-[#27a640]/10 text-[#27a640]">
              <Terminal className="h-4 w-4" />
            </span>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#27a640]">Development &amp; Tooling</h2>
          </div>

          <div className="font-sans text-xs text-[#c0c7d4] leading-relaxed">
            Highly versatile environment configuration tools utilizing standard Unix patterns, local mathematical arrays, and reproducible package control interfaces.
          </div>

          <div className="flex flex-wrap gap-2.5 mt-2">
            {STACK_TOOLING.map((tool, idx) => {
              const isSelected = selectedToolIdx === idx;
              return (
                <div key={tool} className="relative">
                  <button
                    onClick={() => setSelectedToolIdx(isSelected ? null : idx)}
                    className={`px-3 py-1 bg-[#10141a] border rounded font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-[#27a640] text-[#27a640] shadow-sm' 
                        : 'border-[#414752] text-[#c0c7d4] hover:border-[#58a6ff] hover:text-[#58a6ff]'
                    }`}
                  >
                    {tool}
                  </button>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-8 left-0 z-20 w-48 bg-[#161b22] border border-[#27a640] p-3 rounded font-mono text-[10px] text-[#dfe2eb] leading-relaxed shadow-lg"
                      >
                        <h5 className="font-bold text-[#27a640] mb-1">Use case:</h5>
                        <p className="text-[#c0c7d4]">
                          {techProjectRelation[tool]?.[0]?.project 
                            ? `Active on ${techProjectRelation[tool][0].project}: ${techProjectRelation[tool][0].role}`
                            : 'Applied as structural model baseline throughout entire workspace repository.'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* Card 3: Automation & Workflow (Col span 12) */}
        <div className="md:col-span-12 bg-[#1c2026] border border-[#21262d] rounded-lg p-6 flex flex-col md:flex-row gap-6 md:gap-12 group hover:border-[#414752] transition-colors items-start md:items-center">
          
          <div className="flex flex-col gap-2 md:w-1/3 border-b md:border-b-0 md:border-r border-[#21262d]/80 pb-4 md:pb-0 md:pr-6">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-purple-500/10 text-[#d8baff]">
                <Workflow className="h-4 w-4" />
              </span>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#d8baff]">Automation &amp; Workflow</h2>
            </div>
            
            <p className="font-sans text-xs text-[#c0c7d4] mt-2 leading-relaxed">
              Orchestrating complex data pipelines and automated task execution for high-efficiency enterprise operations.
            </p>
          </div>

          <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {STACK_AUTOMATION.map((item, i) => (
              <div 
                key={i} 
                className="bg-[#10141a] border border-[#21262d] p-4 rounded-md flex flex-col gap-2 hover:border-[#d8baff]/40 transition group/autocard"
              >
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#dfe2eb]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d8baff] group-hover/autocard:scale-125 transition-transform"></span>
                  {item.name}
                </div>
                <p className="font-sans text-[11px] text-[#c0c7d4] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </section>

    </div>
  );
}
