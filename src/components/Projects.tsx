/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import {
  Activity,
  Eye,
  Gamepad2,
  Bug,
  Globe,
  Leaf,
  Bot,
  Brain,
  FileSpreadsheet,
  Github,
  X,
  ExternalLink,
} from 'lucide-react';
import { westernAudio } from '../utils/westernAudio';

const iconMap: Record<string, typeof Activity> = {
  Activity,
  Eye,
  Gamepad2,
  Bug,
  Globe,
  Leaf,
  Bot,
  Brain,
  FileSpreadsheet,
};

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  const Icon = iconMap[project.icon] || Activity;

  const gradients: Record<string, string> = {
    'Final Year Project': 'from-orange-500/10 via-amber-500/5 to-transparent',
    'Full-Stack Agentic AI': 'from-blue-500/10 via-indigo-500/5 to-transparent',
    'Kaggle × Google Capstone': 'from-emerald-500/10 via-teal-500/5 to-transparent',
    'Slack Agent For Good': 'from-purple-500/10 via-fuchsia-500/5 to-transparent',
    'NLP System': 'from-sky-500/10 via-cyan-500/5 to-transparent',
    'Computer Vision': 'from-rose-500/10 via-red-500/5 to-transparent',
    'Reinforcement Learning': 'from-violet-500/10 via-purple-500/5 to-transparent',
    'Business Automation': 'from-yellow-500/10 via-amber-500/5 to-transparent',
  };

  const gradientClass = gradients[project.tag] || 'from-stone-500/10 to-transparent';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      onClick={() => {
        westernAudio.playPaperRustle();
        onSelect();
      }}
      data-anton-surface="project"
      data-anton-priority-type="technical"
      className="card card-lift p-6 cursor-pointer flex flex-col h-full"
    >
      <div className={`aspect-[16/9] rounded bg-gradient-to-br ${gradientClass} border-2 border-border mb-5 flex items-center justify-center relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-all duration-300" />
        <div className="text-center z-10 px-4">
          <div className="inline-flex p-3 rounded-lg bg-surface border-2 border-border shadow-sm text-accent mb-2.5 group-hover:scale-110 transition-transform duration-200">
            <Icon className="h-6 w-6" />
          </div>
          <h4 className="western-font text-sm text-ink leading-none mb-1 font-normal">
            {project.title}
          </h4>
          <span className="text-[10px] uppercase tracking-wider text-ink-muted font-serif">
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-accent shrink-0" />
          <h3 className="western-font text-base text-ink font-normal">{project.title}</h3>
        </div>
        <span className="shrink-0 text-xs font-serif font-medium text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
          ★ {project.tag}
        </span>
      </div>

      <p className="font-serif text-sm text-ink-secondary leading-relaxed flex-grow">{project.description}</p>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between font-serif">
        <span className="text-xs text-ink-muted">{project.stack}</span>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              westernAudio.playCylinderClick();
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover"
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProjectCard
                project={project}
                onSelect={() => setSelected(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {PROJECTS.length > 4 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              westernAudio.playCylinderClick();
              setShowAll(!showAll);
            }}
            className="inline-flex items-center gap-2 rounded border-2 border-border-strong bg-surface px-5 py-2.5 font-western text-xs tracking-wider text-ink-secondary hover:border-accent hover:text-accent transition-colors cursor-pointer shadow-sm hover:shadow"
          >
            ★ {showAll ? 'SHOW FEWER BOUNTIES' : 'INSPECT MORE BOUNTIES'}
          </button>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => {
              westernAudio.playCylinderClick();
              setSelected(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-surface border-4 border-double border-border-strong rounded shadow-2xl overflow-hidden font-serif"
            >
              <div className="flex items-start justify-between p-6 border-b-2 border-border">
                <div>
                  <p className="text-xs font-western text-accent tracking-wider mb-1">★ {selected.category}</p>
                  <h3 className="western-font text-2xl text-ink font-normal">{selected.title}</h3>
                </div>
                <button
                  onClick={() => {
                    westernAudio.playCylinderClick();
                    setSelected(null);
                  }}
                  className="p-1 rounded text-ink-muted hover:text-ink hover:bg-canvas transition border border-border cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-sm font-serif">
                <p className="text-ink-secondary leading-relaxed">{selected.description}</p>

                <div className="rounded border border-border bg-canvas/50 p-4 space-y-2.5">
                  {selected.detailedSpecs?.approach && (
                    <div>
                      <span className="text-xs font-western text-accent tracking-wider uppercase">Field Approach</span>
                      <p className="text-ink-secondary mt-0.5">{selected.detailedSpecs.approach}</p>
                    </div>
                  )}
                  {selected.detailedSpecs?.input && (
                    <div>
                      <span className="text-xs font-western text-accent tracking-wider uppercase">Incoming Telemetry</span>
                      <p className="text-ink-secondary mt-0.5">{selected.detailedSpecs.input}</p>
                    </div>
                  )}
                  {selected.detailedSpecs?.output && (
                    <div>
                      <span className="text-xs font-western text-accent tracking-wider uppercase">Deliverable</span>
                      <p className="text-ink-secondary mt-0.5">{selected.detailedSpecs.output}</p>
                    </div>
                  )}
                </div>

                <p className="text-ink-secondary pt-1">
                  <span className="font-semibold text-accent">Proven Outcome: </span>
                  {selected.impact}
                </p>
              </div>

              {(selected.githubUrl || selected.liveUrl) && (
                <div className="px-6 pb-6 flex flex-wrap gap-3">
                  {selected.githubUrl && (
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => westernAudio.playCylinderClick()}
                      className="inline-flex items-center gap-2 rounded border-2 border-border-strong bg-surface px-4 py-2 text-sm font-semibold text-ink-secondary hover:border-accent hover:text-accent transition-colors cursor-pointer"
                    >
                      <Github className="h-4 w-4" />
                      Inspect Code
                    </a>
                  )}
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => westernAudio.playCylinderClick()}
                      className="inline-flex items-center gap-2 rounded border-2 border-accent bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-colors cursor-pointer shadow-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Deployment
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
