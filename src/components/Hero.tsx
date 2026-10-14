/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { CONTACT, RESUME_PATH, PROFILE_IMAGE } from '../data';
import { westernAudio } from '../utils/westernAudio';
import { useAnimation } from '../context/AnimationContext';
import TiltCard from './animations/TiltCard';
import ChameleonEyes from './animations/ChameleonEyes';
import RevolverCylinder from './animations/RevolverCylinder';
import SaloonDoors from './animations/SaloonDoors';
import SheriffBadge3D from './animations/SheriffBadge3D';

export default function Hero() {
  const { mode } = useAnimation();

  const posterContent = (
    <div className="relative w-64 sm:w-72 p-3 bg-surface border-4 border-double border-border-strong rounded-sm shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300">
      <div className="border border-dashed border-border-strong p-3 bg-canvas/30 text-center">
        <div className="western-font text-xs tracking-widest text-accent mb-1">
          ★ REWARD FOR EXCELLENCE ★
        </div>
        <div className="western-font text-xl text-ink tracking-wider mb-2">
          WANTED
        </div>
        <div className="relative w-full h-56 border-2 border-border-strong overflow-hidden bg-surface mb-2 shadow-inner">
          <img
            src={PROFILE_IMAGE}
            alt="Arsalan Qasim"
            className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="western-font text-sm text-ink font-semibold">
          ARSALAN QASIM
        </div>
        <p className="font-serif text-xs text-ink-muted italic mt-0.5">
          Full Stack AI / ML Gunslinger
        </p>
        <div className="mt-2 pt-2 border-t border-border-strong/60 flex items-center justify-between text-[10px] font-serif text-ink-secondary">
          <span>Town of Dirt, 2026</span>
          <span className="text-accent font-semibold">COMSATS Uni</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="home" data-anton-surface="section" data-anton-priority-type="content" className="pt-8 pb-20 md:pt-16 md:pb-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="md:col-span-7 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent/10 border border-accent/30 text-accent font-western text-xs tracking-wider">
              <span>★</span>
              <span>SHERIFF OF FULL-STACK AI · ISLAMABAD</span>
            </div>

            {/* Mode 2: Rango's Live Tracking Gaze */}
            {mode === 'novelty' && <ChameleonEyes />}
          </div>

          <h1 className="western-font text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-ink leading-[1.2] tracking-normal">
            I engineer full-stack machine learning systems and intelligent agents that scale.
          </h1>

          <p className="font-serif text-lg text-ink-secondary leading-relaxed max-w-xl italic">
            I'm Arsalan — final-year AI student at COMSATS Islamabad and group leader intern. 
            On these digital plains, I engineer end-to-end AI applications across multi-agent systems, 
            computer vision pipelines, NLP, and high-impact production automations.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#work"
              onClick={() => westernAudio.playPaperRustle()}
              className="inline-flex items-center gap-2 rounded border-2 border-accent bg-accent px-5 py-2.5 text-sm font-serif font-bold text-white hover:bg-accent-hover transition-colors shadow-sm"
            >
              <span>Inspect Bounties</span>
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={RESUME_PATH}
              download="Arsalan_Qasim.pdf"
              onClick={() => westernAudio.playCylinderClick()}
              className="inline-flex items-center gap-2 rounded border-2 border-border-strong bg-surface px-5 py-2.5 text-sm font-serif font-semibold text-ink-secondary hover:border-accent hover:text-accent transition-colors shadow-sm"
            >
              Affidavit (CV)
            </a>

            {/* Mode 2: Novelty Interactive Toys */}
            {mode === 'novelty' && (
              <div className="flex items-center gap-2">
                <RevolverCylinder />
                <SaloonDoors />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 pt-2 font-serif text-sm">
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => westernAudio.playPaperRustle()}
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => westernAudio.playPaperRustle()}
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              onClick={() => westernAudio.playPaperRustle()}
              className="inline-flex items-center gap-1.5 text-ink-muted hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
              Telegram / Dispatch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="md:col-span-5 flex flex-col items-center md:items-end gap-4"
        >
          {/* Mode 1 vs Other Modes: 3D Parallax TiltCard */}
          {mode === 'atmosphere' ? (
            <TiltCard maxTilt={15}>{posterContent}</TiltCard>
          ) : (
            posterContent
          )}

          {/* Mode 3: Interactive 3D WebGL Sheriff Star Badge */}
          {mode === 'threejs' && (
            <div className="w-64 sm:w-72">
              <SheriffBadge3D />
            </div>
          )}

          {/* Spirit of the West Quote Tag */}
          <div className="max-w-[280px] p-2 rounded bg-surface/80 border border-border text-center font-serif text-[11px] text-ink-muted italic shadow-xs">
            "No man can walk out on his own story."
            <span className="block not-italic text-[10px] text-accent mt-0.5 font-western">— The Spirit of the West</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
