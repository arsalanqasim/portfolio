/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Dumbbell, Award, BookOpen } from 'lucide-react';
import { CURRENT_FOCUS } from '../data';
import { westernAudio } from '../utils/westernAudio';

const CERTIFICATIONS = [
  {
    category: 'Tier 1: Industry Specializations',
    certs: [
      { name: 'Machine Learning in Production', issuer: 'DeepLearning.AI' },
      { name: 'Machine Learning with Python', issuer: 'IBM' },
      { name: 'Deep Learning & Neural Networks', issuer: 'IBM' },
      { name: 'Intermediate Deep Learning (PyTorch)', issuer: 'DataCamp' },
      { name: 'Supervised Learning (Scikit-learn)', issuer: 'DataCamp' },
    ]
  },
  {
    category: 'Tier 2: Specialized Training',
    certs: [
      { name: 'National AI Training (ACT AI)', issuer: 'National AI Programme' },
      { name: 'Human Research (Data & Specimens)', issuer: 'CITI Program' }
    ]
  },
  {
    category: 'Tier 3: Skills & Assessments',
    certs: [
      { name: 'SEO & Optimization Frameworks', issuer: 'DigiSkills' },
      { name: 'Freelancing Operations', issuer: 'DigiSkills' },
      { name: 'Digital Skills (Advanced Level 5)', issuer: 'European Commission' }
    ]
  }
];

const COURSEWORK = [
  {
    category: 'Core AI & ML',
    courses: ['Neural Networks', 'Machine Learning Fundamentals', 'Natural Language Processing', 'Computer Vision', 'Introduction to AI', 'Reinforcement Learning', 'Robotics']
  },
  {
    category: 'Systems & Engineering',
    courses: ['Data Structures & Algorithms', 'Design & Analysis of Algorithms', 'Database Systems', 'Web Technologies', 'Computer Networks', 'Software Engineering', 'Operating Systems']
  },
  {
    category: 'Math & Foundations',
    courses: ['Linear Algebra', 'Probability & Statistics', 'Calculus & Analytical Geometry', 'Differential Equations', 'Knowledge Representation', 'Digital Logic Design']
  }
];

export default function About() {
  return (
    <div className="space-y-10 font-serif">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="space-y-4"
      >
        <p className="text-ink-secondary leading-relaxed text-[1.1rem]">
          I'm Arsalan Qasim, a final-year Artificial Intelligence student at COMSATS University Islamabad. 
          I engineer full-stack AI systems and autonomous agentic applications — from raw data collection 
          and validation pipelines to model training, optimization, deployment, and cloud automation.
        </p>
        <p className="text-ink-secondary leading-relaxed">
          I'm an INTP autodidact who enjoys solving hard engineering challenges from first principles. 
          I operate best with full autonomy and programmatic control — finding alignment where mathematical rigor, 
          software craft, and measurable commercial results intersect (like improving agent task success rates to 92.9% 
          or slashing client listing turnaround by 90%).
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          onClick={() => westernAudio.playPaperRustle()}
          className="card p-5 cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-4 w-4 text-accent" />
            <h3 className="western-font text-base text-ink font-normal">Academia & Credentials</h3>
          </div>
          <p className="text-sm font-semibold text-ink">BS Artificial Intelligence</p>
          <p className="text-sm text-ink-muted mt-0.5">COMSATS University Islamabad</p>
          <p className="text-xs text-ink-muted mt-2 font-mono">7th semester completed · Expected Jan 2027 · CGPA 3.34 / 4.0</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onClick={() => westernAudio.playPaperRustle()}
          className="card p-5 cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-3">
            <Dumbbell className="h-4 w-4 text-accent" />
            <h3 className="western-font text-base text-ink font-normal">Physical Discipline</h3>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed">
            I train calisthenics seriously. Progressive overload, strict mechanical form adjustment, 
            and disciplined repetition is the exact same philosophy I apply when architecting and refining machine learning models.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="card p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center gap-2 border-b-2 border-border pb-4">
          <Award className="h-5 w-5 text-accent" />
          <h3 className="western-font text-xl text-ink font-normal">Accreditations & Certificates</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((group) => (
            <div key={group.category} className="space-y-3">
              <h4 className="text-xs font-western tracking-wider uppercase text-accent">
                ★ {group.category}
              </h4>
              <ul className="space-y-2">
                {group.certs.map((cert) => (
                  <li key={cert.name} className="text-xs leading-normal">
                    <span className="font-semibold text-ink block">{cert.name}</span>
                    <span className="text-ink-muted">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="card p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center gap-2 border-b-2 border-border pb-4">
          <BookOpen className="h-5 w-5 text-accent" />
          <h3 className="western-font text-xl text-ink font-normal">Foundational Coursework</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSEWORK.map((group) => (
            <div key={group.category} className="space-y-3">
              <h4 className="text-xs font-western tracking-wider uppercase text-accent">
                ★ {group.category}
              </h4>
              <ul className="flex flex-wrap gap-1.5">
                {group.courses.map((course) => (
                  <li key={course} className="text-xs bg-canvas text-ink-secondary px-2.5 py-1 rounded border border-border">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="card p-6 sm:p-8"
      >
        <h3 className="western-font text-xl text-ink font-normal mb-6">Current Trail & Focus</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURRENT_FOCUS.map((block) => (
            <div key={block.category}>
              <h4 className="text-xs font-western tracking-wider uppercase text-accent mb-3">
                ★ {block.category}
              </h4>
              <ul className="space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="text-sm text-ink-secondary leading-relaxed flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">★</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
