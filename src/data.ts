/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, SpecRow, HistoryItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'dino-ai',
    title: 'Dino-AI',
    icon: 'Brain',
    tag: 'Game Agent',
    description: 'Neuroevolution Game Agent built to master a custom Pygame simulation of the classic Chrome Dinosaur game via genetic iterative breeding.',
    logic: 'Genetic Algorithms, Neuroevolution, Iterative Fitness Mutators',
    stack: 'Python, Pygame, NumPy',
    impact: 'Demonstrates non-RL learning paths for dynamic obstacle environments.',
    category: 'Reinforcement Learning & AI',
    detailedSpecs: {
      input: 'Dinosaur screen coordinates, obstacle distances, obstacle velocity',
      output: 'Optimal Action vector [Jump, Duck, Neutral]',
      complexity: 'O(N) computation for 3-layer neural controller per member',
      algorithm: 'Neuroevolution of Augmenting Topologies (NEAT) simplified'
    }
  },
  {
    id: 'triage-iq',
    title: 'TriageIQ',
    icon: 'Bug',
    tag: 'NLP System',
    description: 'Automated NLP GitHub Issue Triage Tool engineered to classify support tickets by category, urgency, and operational intent.',
    logic: 'NLP Classification, Intent Recognition, Priority Scoring',
    stack: 'Python, NLP Libraries, Scikit-learn',
    impact: 'Reduces manual issue sorting latency by algorithmic routing.',
    category: 'NLP & Intent Systems',
    detailedSpecs: {
      input: 'Unstructured issue title and markdown text body',
      output: 'Multiclass classification (Category, Urgency Level [1-4], Handler team)',
      complexity: 'O(V + log C) where V is TF-IDF vocabulary space',
      algorithm: 'Linear SVM with SGD Training + Regex pattern parsing matcher'
    }
  },
  {
    id: 'budgy',
    title: 'Budgy',
    icon: 'Calculator',
    tag: 'Desktop App',
    description: 'Robust desktop finance management application featuring automated transaction classification and interactive data visualization pipelines.',
    logic: 'Data Parsing, Automated Categorization, Time-series Rendering',
    stack: 'Python, Tkinter, Pandas, Matplotlib',
    impact: 'Provides secure, localized financial tracking without external API dependencies.',
    category: 'Software Engineering',
    detailedSpecs: {
      input: 'Plain CSV/Excel bank statements or raw transaction strings',
      output: 'Structured classified database (SQLite), spend aggregates',
      complexity: 'O(N) statement parsing with heuristic matching algorithms',
      algorithm: 'Local Rule-Based Heuristic Matcher + Naive Bayes Classifier'
    }
  },
  {
    id: 'fake-news-def',
    title: 'Fake News Def',
    icon: 'ShieldAlert',
    tag: 'NLP Pipeline',
    description: 'End-to-end machine learning system designed to detect fabricated news articles using robust vectorization and statistical classification techniques.',
    logic: 'TF-IDF Vectorization, Text Preprocessing, Predictive Modeling',
    stack: 'Python, Scikit-learn, Jupyter',
    impact: 'Automates credibility scoring for large-scale text corpus integration.',
    category: 'Machine Learning Pipelines',
    detailedSpecs: {
      input: 'Full article text containing headlines and body',
      output: 'Binary probability score [Reliable vs Fabricated]',
      complexity: 'O(D * M) document vector multiplication factor',
      algorithm: 'Logistic Regression with L2 Regularization & NLTK Stemming'
    }
  }
];

export const GLYCOTWIN_SPECS: SpecRow[] = [
  { key: 'Domain', value: 'Deep Learning, Bioinformatics' },
  { key: 'Core_Stack', value: 'Python, PyTorch' },
  { key: 'Math_Lib', value: 'SciPy, TorchDiffeq' },
  { key: 'Topology', value: 'Continuous-Depth ResNet' },
  { key: 'Time_Series', value: 'Continuous (Non-Discrete)', isStatus: true },
];

export const OPERATIONAL_HISTORY: HistoryItem[] = [
  {
    period: 'Present',
    role: 'AI & Automation Specialist',
    company: 'Freelance / Independent',
    description: 'Architecting bespoke generative AI agents and orchestrating complex automation pipelines. Integrating APIs (Gemini, Google AI Studio) to deliver scalable intelligence solutions for specialized workflows.'
  },
  {
    period: 'Previous',
    role: 'Shopify Product Manager',
    company: 'E-commerce Operations',
    description: 'Managed end-to-end product lifecycles, optimized digital storefronts, and implemented data-driven strategies to streamline logistics and enhance user experience metrics.'
  }
];

export const STACK_AI = [
  { name: 'PyTorch', value: 95, level: 'Advanced' },
  { name: 'Scikit-learn', value: 90, level: 'Advanced' },
  { name: 'TensorFlow', value: 80, level: 'Strong' },
  { name: 'Neural ODEs', value: 75, level: 'Proficient' },
];

export const STACK_TOOLING = [
  'Python',
  'Git/GitHub',
  'NumPy',
  'Pandas',
  'Matplotlib'
];

export const STACK_AUTOMATION = [
  { name: 'n8n', desc: 'Used for connecting APIs, automating data syncing and complex developer automation chains.' },
  { name: 'Make (Integromat)', desc: 'Advanced conditional routing for multi-step e-commerce workflows and automated client triggers.' },
  { name: 'Web Scraping', desc: 'High-speed distributed parsing of public information pipelines using BeautifulSoup and Playwright.' }
];

export const TERMINAL_YAML = `current_focus:
  learning:
    - "Advanced Deep Learning architectures and Computer Vision (U-Net)"
    - "Cloud computing infrastructure and secure API management"
    - "Broadening holistic AI/ML engineering skill sets for enterprise applications"
    
  building:
    - "GlycoTwin: Finalizing Hybrid Neural ODE models for biological simulations"
    - "Generative AI Agents using Google AI Studio and Gemini API"
    - "Expanding neuroevolution algorithms in continuous environments"
    
  open_to:
    - "AI Engineer roles and Machine Learning developer positions"
    - "Internships focused on AI agent development and model deployment"
    - "Collaborations on open-source Python and PyTorch projects"`;
