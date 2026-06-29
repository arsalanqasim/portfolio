/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Section = 'home' | 'work' | 'experience' | 'skills' | 'about';

export interface Project {
  id: string;
  title: string;
  icon: string;
  tag: string;
  description: string;
  stack: string;
  impact: string;
  category: string;
  githubUrl?: string;
  detailedSpecs?: {
    input?: string;
    output?: string;
    approach?: string;
  };
}

export interface HistoryItem {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  items: { name: string; usedIn: string }[];
}

export interface FocusItem {
  category: string;
  items: string[];
}
