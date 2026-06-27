/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, SpecRow, HistoryItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'glyco-twin',
    title: 'GlycoTwin: Neuro-Symbolic Digital Twin',
    icon: 'Activity',
    tag: 'Final Year Project (In Progress)',
    description: 'Developing a hybrid neuro-symbolic system for personalized glycemic response prediction using LSTM/Transformer encoders for metabolic pattern learning and Neural ODEs with biological constraints for physiologically realistic glucose dynamics modeling.',
    logic: 'LSTM/Transformer Encoders, Neural ODEs, FastSAM, Depth Anything V2',
    stack: 'Python, PyTorch, SciPy, TorchDiffeq',
    impact: 'Physiologically realistic glucose dynamics modeling and nutrition estimation from meal images.',
    category: 'Deep Learning & Bioinformatics',
    detailedSpecs: {
      input: 'OhioT1DM/Shanghai T2DM datasets, meal images, patient metrics',
      output: 'Personalized glycemic response curves, portion-size and nutrition estimation',
      complexity: 'O(N) for encoder-decoder pattern learning & continuous integration steps',
      algorithm: 'Neural ODE solver with biological mass-balance constraints'
    }
  },
  {
    id: 'driver-drowsiness',
    title: 'Real-Time Driver Drowsiness Detection System',
    icon: 'Eye',
    tag: 'Computer Vision',
    description: 'Built a hybrid computer vision pipeline fusing fine-tuned YOLOv8s (trained on 2,400 custom images with augmentation) and MediaPipe Face Mesh for real-time drowsiness detection via an OR-gate fusion architecture.',
    logic: 'YOLOv8s, MediaPipe Face Mesh, OR-gate Fusion',
    stack: 'Python, PyTorch, OpenCV, CustomTkinter',
    impact: 'Achieved 95.2% Precision and 97.9% Recall on a 500-image test set with 99.0 mAP50, running at ~55 FPS on RTX 4060 — validated on live 30 FPS webcam with documented robustness against glasses reflections (94% accuracy).',
    category: 'Computer Vision & Deep Learning',
    githubUrl: 'https://github.com/arsalanqasim/real-time-driver-drowsiness-detection',
    detailedSpecs: {
      input: 'Live webcam video stream (30 FPS)',
      output: 'Drowsiness metrics, 3-stage warning/SOS escalation protocol',
      complexity: 'O(F) frame processing under 18ms latency',
      algorithm: 'YOLOv8s object detection + MediaPipe landmark facial mesh tracking'
    }
  },
  {
    id: 'neon-dqn',
    title: 'Neon DQN Drone Lab',
    icon: 'Gamepad2',
    tag: 'Reinforcement Learning',
    description: 'Designed and built a custom Pygame simulation environment from scratch with a Gym-compatible interface, featuring dynamic urban obstacles and a cyberpunk 2D city layout.',
    logic: 'Dueling/Double DQN, CNN Observation Processing',
    stack: 'Python, Pygame, NumPy, PyTorch',
    impact: 'Successfully trained autonomous flight agents across complex obstacle grids using curriculum learning.',
    category: 'Reinforcement Learning',
    githubUrl: 'https://github.com/arsalanqasim/neon-dqn-drone-lab',
    detailedSpecs: {
      input: '6x32x32 observation tensors from environment grid',
      output: 'Autonomous navigation motor/steering control vector',
      complexity: 'O(3-layer CNN forward pass per step)',
      algorithm: 'Dueling/Double DQN with curriculum learning (1,500-3,000 episodes)'
    }
  },
  {
    id: 'triage-iq',
    title: 'NLP GitHub Issue Triage Tool',
    icon: 'Bug',
    tag: 'NLP System',
    description: 'Automated classification of 140,000+ raw repository labels into a standardized taxonomy using NLP-based text classification, significantly reducing manual triaging effort.',
    logic: 'TF-IDF Vectorization, Text Classification',
    stack: 'Python, Scikit-learn, NLP Libraries',
    impact: 'Significantly reduces manual issue sorting and triaging latency on large open-source repositories.',
    category: 'Natural Language Processing',
    githubUrl: 'https://github.com/arsalanqasim/triageiq',
    detailedSpecs: {
      input: 'Unstructured repository issue text & markdown template',
      output: 'Standardized label category and taxonomy classification',
      complexity: 'O(V) vocabulary vector mapping complexity',
      algorithm: 'Linear SVM / SGD classifier with tf-idf vectorizer'
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
    description: 'Building end-to-end AI/ML systems—from data collection pipelines and model training to deployment and automation. Utilizing PyTorch, HuggingFace Transformers, LangChain, RAG pipelines, and integrating APIs (OpenAI, Anthropic) for intelligent workflows.'
  },
  {
    period: '2024 – Present',
    role: 'Automation Engineer',
    company: 'Upwork (E-commerce Client, Slovenia)',
    description: 'Built a Streamlit-based automation application streamlining Shopify workflows across 20+ stores in 5+ countries. Reduced per-product upload time from 45 to 5 minutes (~90% reduction) via direct Judge.me API integration, implemented one-click multilingual product localization, and delivered 3,000+ products.'
  }
];

export const STACK_AI = [
  { name: 'PyTorch', value: 95, level: 'Advanced' },
  { name: 'Scikit-learn', value: 85, level: 'Advanced' },
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
    - "Real-Time Driver Drowsiness Detection System fusing YOLOv8s and MediaPipe"
    - "Expanding reinforcement learning models in autonomous environments"
    
  open_to:
    - "AI Engineer roles and Machine Learning developer positions"
    - "Internships focused on AI agent development and model deployment"
    - "Collaborations on open-source Python and PyTorch projects"`;
