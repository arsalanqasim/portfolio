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
  ImageIcon,
} from 'lucide-react';

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
      onClick={onSelect}
      data-anton-surface="project"
      data-anton-priority-type="technical"
      className="card card-lift p-6 cursor-pointer flex flex-col h-full"
    >
      <div className={`aspect-[16/9] rounded-lg bg-gradient-to-br ${gradientClass} border border-border mb-5 flex items-center justify-center relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-all duration-300" />
        <div className="text-center z-10 px-4">
          <div className="inline-flex p-3 rounded-xl bg-white border border-border/80 shadow-sm text-accent mb-2.5 group-hover:scale-110 transition-transform duration-200">
            <Icon className="h-6 w-6" />
          </div>
          <h4 className="font-serif text-sm font-semibold text-ink leading-none mb-1">
            {project.title}
          </h4>
          <span className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-accent shrink-0" />
          <h3 className="font-serif text-lg font-semibold text-ink">{project.title}</h3>
        </div>
        <span className="shrink-0 text-xs font-medium text-ink-muted bg-canvas px-2 py-0.5 rounded">
          {project.tag}
        </span>
      </div>

      <p className="text-sm text-ink-secondary leading-relaxed flex-grow">{project.description}</p>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-xs text-ink-muted">{project.stack}</span>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover"
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

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
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
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-ink-secondary hover:border-accent hover:text-accent transition-colors cursor-pointer shadow-sm hover:shadow"
          >
            {showAll ? 'Show fewer projects' : 'Show more projects'}
          </button>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-surface border border-border rounded-xl shadow-xl overflow-hidden"
            >
              <div className="flex items-start justify-between p-6 border-b border-border">
                <div>
                  <p className="text-xs font-medium text-accent mb-1">{selected.category}</p>
                  <h3 className="font-serif text-xl font-semibold text-ink">{selected.title}</h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 rounded-lg text-ink-muted hover:bg-canvas hover:text-ink transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-sm">
                <p className="text-ink-secondary leading-relaxed">{selected.description}</p>

                <div className="rounded-lg bg-canvas p-4 space-y-2.5">
                  {selected.detailedSpecs?.approach && (
                    <div>
                      <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Approach</span>
                      <p className="text-ink-secondary mt-0.5">{selected.detailedSpecs.approach}</p>
                    </div>
                  )}
                  {selected.detailedSpecs?.input && (
                    <div>
                      <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Input</span>
                      <p className="text-ink-secondary mt-0.5">{selected.detailedSpecs.input}</p>
                    </div>
                  )}
                  {selected.detailedSpecs?.output && (
                    <div>
                      <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Output</span>
                      <p className="text-ink-secondary mt-0.5">{selected.detailedSpecs.output}</p>
                    </div>
                  )}
                </div>

                <p className="text-ink-secondary">
                  <span className="font-medium text-ink">Impact: </span>
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
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-ink-secondary hover:border-accent hover:text-accent transition-colors cursor-pointer"
                    >
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </a>
                  )}
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
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
