/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, HistoryItem, SkillGroup, FocusItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'glyco-twin',
    title: 'GlycoTwin',
    icon: 'Activity',
    tag: 'Final Year Project',
    description:
      'I am building a hybrid system for personalized glycemic response prediction — combining LSTM/Transformer encoders with Neural ODEs constrained by biological mass-balance rules, plus meal-image nutrition estimation via FastSAM and Depth Anything V2.',
    stack: 'Python, PyTorch, SciPy, TorchDiffeq',
    impact:
      'Aims to produce physiologically realistic glucose curves and portion-size estimates from meal photos and patient data.',
    category: 'Deep Learning & Bioinformatics',
    detailedSpecs: {
      input: 'OhioT1DM / Shanghai T2DM datasets, meal images, patient metrics',
      output: 'Personalized glycemic curves, nutrition and portion estimates',
      approach: 'Neural ODE solver with biological constraints + encoder-decoder pattern learning',
    },
  },
  {
    id: 'driver-drowsiness',
    title: 'Driver Drowsiness Detection',
    icon: 'Eye',
    tag: 'Computer Vision',
    description:
      'I built a real-time pipeline that fuses a fine-tuned YOLOv8s model (2,400 custom training images) with MediaPipe Face Mesh through an OR-gate fusion architecture.',
    stack: 'Python, PyTorch, OpenCV, CustomTkinter',
    impact:
      '95.2% precision, 97.9% recall, 99.0 mAP50 on a 500-image test set — running at ~55 FPS on RTX 4060, validated on live 30 FPS webcam.',
    category: 'Computer Vision',
    githubUrl: 'https://github.com/arsalanqasim/real-time-driver-drowsiness-detection',
    detailedSpecs: {
      input: 'Live webcam stream at 30 FPS',
      output: 'Drowsiness metrics with 3-stage warning / SOS protocol',
      approach: 'YOLOv8s detection + MediaPipe landmark tracking with OR-gate fusion',
    },
  },
  {
    id: 'neon-dqn',
    title: 'Neon DQN Drone Lab',
    icon: 'Gamepad2',
    tag: 'Reinforcement Learning',
    description:
      'I designed a custom Pygame simulation environment with a Gym-compatible interface — dynamic urban obstacles, curriculum learning, and a Dueling/Double DQN agent on 6×32×32 observation tensors.',
    stack: 'Python, Pygame, NumPy, PyTorch',
    impact:
      'Trained autonomous navigation agents across complex obstacle grids over 1,500–3,000 episodes.',
    category: 'Reinforcement Learning',
    githubUrl: 'https://github.com/arsalanqasim/neon-dqn-drone-lab',
    detailedSpecs: {
      input: '6×32×32 grid observation tensors',
      output: 'Motor and steering control vectors',
      approach: 'Dueling/Double DQN with 3-layer CNN and curriculum learning',
    },
  },
  {
    id: 'triage-iq',
    title: 'GitHub Issue Triage Tool',
    icon: 'Bug',
    tag: 'NLP',
    description:
      'I automated classification of 140,000+ raw repository labels into a standardized taxonomy using TF-IDF vectorization and linear SVM classification.',
    stack: 'Python, Scikit-learn',
    impact:
      'Cuts manual issue sorting time on large open-source repositories.',
    category: 'Natural Language Processing',
    githubUrl: 'https://github.com/arsalanqasim/triageiq',
    detailedSpecs: {
      input: 'Unstructured issue text and markdown',
      output: 'Standardized label category',
      approach: 'TF-IDF + linear SVM / SGD classifier',
    },
  },
];

export const GLYCOTWIN_HIGHLIGHTS = [
  { label: 'Domain', value: 'Bioinformatics & deep learning' },
  { label: 'Core stack', value: 'Python, PyTorch, TorchDiffeq' },
  { label: 'Approach', value: 'Neural ODEs with biological constraints' },
  { label: 'Status', value: 'In progress — final year project' },
];

export const OPERATIONAL_HISTORY: HistoryItem[] = [
  {
    period: 'Present',
    role: 'AI & Automation Specialist',
    company: 'Freelance',
    description:
      'I build end-to-end AI/ML systems — from data pipelines and model training to deployment. I work with PyTorch, HuggingFace, LangChain, RAG pipelines, and OpenAI/Anthropic APIs.',
  },
  {
    period: '2024 – Present',
    role: 'Automation Engineer',
    company: 'Upwork — E-commerce client, Slovenia',
    description:
      'I built a Streamlit app that streamlined Shopify workflows across 20+ stores in 5+ countries. Upload time dropped from 45 to 5 minutes (~90% reduction) via Judge.me API integration. Delivered 3,000+ products with one-click multilingual localization.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Machine Learning',
    items: [
      { name: 'PyTorch', usedIn: 'GlycoTwin, drowsiness detection, DQN lab' },
      { name: 'Neural ODEs', usedIn: 'GlycoTwin — continuous glucose dynamics' },
      { name: 'Scikit-learn', usedIn: 'Issue triage classifier' },
      { name: 'Computer Vision', usedIn: 'YOLOv8s, MediaPipe, OpenCV' },
      { name: 'Reinforcement Learning', usedIn: 'Dueling/Double DQN drone navigation' },
      { name: 'NLP', usedIn: 'TF-IDF + SVM issue classification' },
    ],
  },
  {
    title: 'Tools & Languages',
    items: [
      { name: 'Python', usedIn: 'All projects' },
      { name: 'NumPy & Pandas', usedIn: 'Data processing, simulation environments' },
      { name: 'Streamlit & FastAPI', usedIn: 'Automation apps and APIs' },
      { name: 'Docker & Git', usedIn: 'Version control and deployment' },
      { name: 'HuggingFace & LangChain', usedIn: 'LLM integrations and RAG' },
    ],
  },
  {
    title: 'Automation',
    items: [
      { name: 'n8n', usedIn: 'API connections and workflow automation' },
      { name: 'Make', usedIn: 'Multi-step e-commerce routing' },
      { name: 'Web scraping', usedIn: 'BeautifulSoup, Playwright, Selenium' },
    ],
  },
];

export const CURRENT_FOCUS: FocusItem[] = [
  {
    category: 'Building',
    items: [
      'GlycoTwin — hybrid Neural ODE models for glycemic prediction',
      'Driver drowsiness system — refining YOLOv8s + MediaPipe fusion',
      'Expanding RL agents in custom simulation environments',
    ],
  },
  {
    category: 'Learning',
    items: [
      'Advanced computer vision architectures (U-Net, segmentation)',
      'Cloud infrastructure and secure API management',
      'End-to-end MLOps — Docker, MLflow, deployment pipelines',
    ],
  },
  {
    category: 'Open to',
    items: [
      'AI Engineer and ML developer roles',
      'Internships in AI agent development and model deployment',
      'Open-source collaborations in Python and PyTorch',
    ],
  },
];

export const CONTACT = {
  email: 'arsalanqasim400@gmail.com',
  github: 'https://github.com/arsalanqasim',
  linkedin: 'https://www.linkedin.com/in/arsalan-qasim-416a7b258',
  location: 'Islamabad, Pakistan',
};

export const RESUME_PATH = '/Arsalan_Qasim.pdf';
export const PROFILE_IMAGE = '/assets/profile_image.png';
