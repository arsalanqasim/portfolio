/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tab = 'research' | 'projects' | 'stack' | 'about';

export interface Project {
  id: string;
  title: string;
  icon: string; // lucide icon name
  tag: string;
  description: string;
  logic: string;
  stack: string;
  impact: string;
  category: string;
  detailedSpecs?: {
    input?: string;
    output?: string;
    complexity?: string;
    algorithm?: string;
  };
}

export interface SpecRow {
  key: string;
  value: string;
  isStatus?: boolean;
}

export interface HistoryItem {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}
