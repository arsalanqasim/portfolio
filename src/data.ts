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
      'Physics-informed digital twin for personalized glycemic response prediction: a biological mass-balance ODE core (meal absorption + glucose clearance) calibrated per patient, with a neural residual benchmarked as an artifact. Now being hardened to production grade — consolidated 8-module repo with a 122-test verification harness.',
    stack: 'Python, PyTorch, SciPy, TorchDiffeq, FastAPI, FastSAM, Depth Anything V2',
    impact:
      'OhioT1DM leave-one-patient-out: hybrid 48.14 vs physics-only 48.48 mg/dL RMSE — a statistical tie documented as an honest negative result; D1NAMO exact tie at 51.58. Personalized simple models beat deep/hybrid alternatives across 3 datasets, 2 diabetes types, 6 architectures.',
    category: 'Deep Learning & Bioinformatics',
    detailedSpecs: {
      input: 'OhioT1DM / D1NAMO datasets, patient physiological metrics, meal images',
      output: 'Personalized continuous glucose curves, nutrition and portion estimates',
      approach: 'Per-patient calibrated Neural ODE + physics core; neural residual ships as benchmarked artifact',
    },
  },
  {
    id: 'opportunity-pulse',
    title: 'OpportunityPulse AI',
    icon: 'Globe',
    tag: 'Full-Stack Agentic AI',
    description:
      'An Agentic AI-powered career growth platform and opportunity radar for Pakistani student developers, scraping and matching high-yield opportunities (hackathons, scholarships, internships) using structured data ingestion, profile alignment, and AI-driven pitch drafting.',
    stack: 'TypeScript, React 18, Vite, Tailwind CSS, Google Gemini API, Supabase, Vercel',
    impact:
      'Built a multi-agent system (Ingestion, Matching, Copilot agents) with 100% test coverage using Vitest/Playwright, complete with local smart-heuristic fallback engine to bypass cost/latency.',
    category: 'Agentic Web App',
    githubUrl: 'https://github.com/arsalanqasim/act-ai-final-project',
    liveUrl: 'https://opportunity-pulse-ai.vercel.app/',
    detailedSpecs: {
      input: 'Unstructured opportunity text, URLs, and student profile preferences',
      output: 'Matched opportunities (0-100%), markdown cover letters/proposals, task pipeline',
      approach: 'Multi-agent state machine + local fallback text extraction (Jaccard Similarity, TF-IDF)',
    },
  },
  {
    id: 'ecoflow',
    title: 'EcoFlow CBAM Auditor',
    icon: 'Leaf',
    tag: 'Kaggle × Google Capstone',
    description:
      'An enterprise-grade multi-agent supply chain carbon auditing platform built with the Google AI Stack. It automates Scope 3 carbon tracking across supplier networks, audits import shipments against EU CBAM regulations, and implements autonomous self-reflection and recovery execution.',
    stack: 'Python, FastAPI, React, Google ADK 2.0, Model Context Protocol (FastMCP), PostgreSQL',
    impact:
      'Increased task success rate from 66.0% baseline to 92.9% via dynamic DAG recovery, and reached a 98.8% reliability score for audited compliance checks.',
    category: 'Multi-Agent Auditing',
    githubUrl: 'https://github.com/arsalanqasim/ecoflow',
    detailedSpecs: {
      input: 'Confidential supplier logs, shipping manifests, EU CBAM regulation databases',
      output: 'Audited carbon tracking scores, compliance flags, self-reflection audit logs',
      approach: 'Federated peer-to-peer Agent-to-Agent (A2A) carbon data negotiation + FastMCP tools',
    },
  },
  {
    id: 'verity',
    title: 'Verity Fact-Checker',
    icon: 'Bot',
    tag: 'Slack Agent For Good',
    description:
      'An AI-powered Slack workspace agent that automatically extracts, verifies, and synthesizes claims from plain text, YouTube transcripts, and web articles, returning structured fact-checking verdicts with source-quality weighting directly inside message threads.',
    stack: 'Python, Slack Bolt SDK, Gemini 3.1 Flash-Lite, Brave Search MCP, Docker, Oracle Cloud',
    impact:
      'Submitted to the Slack Agent Builder Challenge; automates credibility checks with zero-guess safety (fallback verification returns unverifiable rather than hallucinatory citations).',
    category: 'AI Assistant & Slack Bot',
    githubUrl: 'https://github.com/arsalanqasim/verity-fact-checker',
    detailedSpecs: {
      input: 'Slack message texts, YouTube transcript links, article URLs',
      output: 'Structured fact verdicts (True, False, Misleading) with confidence indicators',
      approach: 'LLM claim parser + Model Context Protocol Brave Search integration + forced JSON schema outputs',
    },
  },
  {
    id: 'triage-iq',
    title: 'TriageIQ',
    icon: 'Brain',
    tag: 'NLP System',
    description:
      'An end-to-end Machine Learning system that automatically classifies raw support tickets and repository issues by Category, Priority, and Intent, featuring dual ML backends and interactive monitoring.',
    stack: 'Python, FastAPI, Streamlit, Scikit-learn, HuggingFace Transformers, MLflow, Docker',
    impact:
      'Achieved 0.979 Intent classification accuracy on the Bitext Customer Support dataset (27 intents) and 0.675 Micro F1 category classification across 100k+ GitHub issues.',
    category: 'Natural Language Processing',
    githubUrl: 'https://github.com/arsalanqasim/triageiq',
    detailedSpecs: {
      input: 'Unstructured customer support messages, GitHub issues/tickets',
      output: 'Standardized Category, Priority, and Intent predictions',
      approach: 'Dual-backend execution: TF-IDF + Logistic Regression vs. fine-tuned DistilBERT + MLflow tracking',
    },
  },
  {
    id: 'driver-drowsiness',
    title: 'SafeDrive Pro',
    icon: 'Eye',
    tag: 'Computer Vision',
    description:
      'A real-time Driver Monitoring System (DMS) detecting fatigue and distraction using a hybrid CV pipeline, fusing a custom YOLOv8s model with MediaPipe Face Mesh landmarks via an OR-gate fusion architecture.',
    stack: 'Python, YOLOv8, MediaPipe Face Mesh, OpenCV, CustomTkinter, Pygame',
    impact:
      '93.7% precision, 98.3% recall, 99.0 mAP@50. Reached real-time inference rate exceeding 55 FPS (18.1ms frame latency) on an RTX 4060 GPU with a 3-stage warning/SOS protocol.',
    category: 'Computer Vision',
    githubUrl: 'https://github.com/arsalanqasim/real-time-driver-drowsiness-detection',
    detailedSpecs: {
      input: 'Live camera stream at 30 FPS',
      output: 'Fatigue Score, EAR (Eye Aspect Ratio), MAR (Mouth Aspect Ratio), head-pose metrics',
      approach: 'YOLOv8 appearance cues + MediaPipe landmark geometry in a low-latency thread-safe queue',
    },
  },
  {
    id: 'neon-dqn',
    title: 'Neon DQN Drone Lab',
    icon: 'Gamepad2',
    tag: 'Reinforcement Learning',
    description:
      'A custom Pygame simulation environment featuring a Gym-compatible interface, where a Dueling/Double DQN agent was trained for autonomous drone navigation in a cyberpunk 2D city layout.',
    stack: 'Python, Pygame, OpenAI Gym, Dueling/Double DQN, CNNs, NumPy, PyTorch',
    impact:
      'Designed CNN-based state observer (6×32×32 tensors). Diagnosed convergence failure under sparse rewards and successfully resolved via curriculum learning over 1,500–3,000 episodes.',
    category: 'Reinforcement Learning',
    githubUrl: 'https://github.com/arsalanqasim/neon-dqn-drone-lab',
    detailedSpecs: {
      input: '6×32×32 grid observation tensors of urban environment',
      output: 'Drone motor and steering control vectors (thrust, yaw)',
      approach: '3-layer CNN encoder feeding double DQN layers under gradually increasing environmental complexity',
    },
  },
  {
    id: 'safex-portfolio',
    title: 'SafeX Internship Suite',
    icon: 'FileSpreadsheet',
    tag: 'Business Automation',
    description:
      'A collaborative AI-powered operations and business automation portfolio built during the SafeX Solutions Summer Internship, featuring semantic FAQ chatbots, invoice automation engines, and customer support routing assistants.',
    stack: 'Python, Streamlit, Scikit-learn, Pandas, NumPy, Pytest',
    impact:
      'Coordinated as Group Leader for 9 interns. Developed custom accuracy-scoring evaluation benchmarks and built a unified Streamlit multi-page dashboard router with namespace isolation.',
    category: 'AI & Automation Suite',
    githubUrl: 'https://github.com/arsalanqasim/safex-internship-portfolio',
    detailedSpecs: {
      input: 'Intern onboarding queries, invoice metadata, customer support messages',
      output: 'Semantic search answers, calculated invoice JSON, classified support intents',
      approach: 'TF-IDF semantic lookup + dynamic tax/discount calculations + Streamlit navigation routing',
    },
  },
];

export const GLYCOTWIN_HIGHLIGHTS = [
  { label: 'Domain', value: 'Bioinformatics & deep learning' },
  { label: 'Core stack', value: 'Python, PyTorch, TorchDiffeq, FastAPI' },
  { label: 'Approach', value: 'Physics-informed ODEs, per-patient calibration' },
  { label: 'Status', value: 'Production-grade conversion — final year project' },
];

export const OPERATIONAL_HISTORY: HistoryItem[] = [
  {
    period: 'June 2026 – August 2026',
    role: 'AI / ML & Automation Intern (Group Leader)',
    company: 'SafeX Solutions · Remote, Pakistan',
    description:
      'Led a 9-intern development team coordinating weekly deliverables and repository merges. Developed a semantic FAQ retrieval chatbot (TF-IDF + Cosine similarity), engineered an Invoice Automation parser, prototyped an AI Customer Support Agent, and built a custom multi-page Streamlit dashboard router hosting all team sandboxes.',
  },
  {
    period: '2024 – Present',
    role: 'Automation Engineer',
    company: 'Upwork (E-commerce Client, Slovenia)',
    description:
      'Streamlined end-to-end Shopify product listing workflows across 20+ stores in 5+ European countries. Reduced per-product upload time from 45 to 5 minutes (~90% reduction) by engineering solutions from custom Selenium scraping to direct Judge.me API integrations, delivering 3,000+ localized products.',
  },
  {
    period: 'Present',
    role: 'Freelance AI & Automation Specialist',
    company: 'Independent Contractor',
    description:
      'Design and engineer custom AI/ML pipelines and workflow automations, including RAG architectures, model fine-tuning, automated web scraping agents, and LangChain/Gemini API integrations.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Machine Learning',
    items: [
      { name: 'PyTorch & Scikit-learn', usedIn: 'GlycoTwin, drowsiness detection, DQN lab, TriageIQ' },
      { name: 'Transformers & LSTM', usedIn: 'GlycoTwin sequence models, DistilBERT issue triage' },
      { name: 'Neural ODEs', usedIn: 'GlycoTwin — continuous glucose dynamics modeling' },
      { name: 'Computer Vision', usedIn: 'YOLOv8s, MediaPipe Face Mesh, FastSAM, Depth Anything V2, OpenCV' },
      { name: 'Reinforcement Learning', usedIn: 'Dueling/Double DQN drone navigation' },
      { name: 'RAG & Agentic LLMs', usedIn: 'OpportunityPulse AI state machine, Verity Slack agent, EcoFlow plan-reflection' },
    ],
  },
  {
    title: 'Tools & Full-Stack',
    items: [
      { name: 'Python & TypeScript', usedIn: 'Used across all projects and web applications' },
      { name: 'React 18 & Vite', usedIn: 'OpportunityPulse AI client, EcoFlow monitoring dashboard, portfolio' },
      { name: 'Streamlit & FastAPI', usedIn: 'TriageIQ API & UI, SafeX Solutions dashboard' },
      { name: 'Supabase & PostgreSQL', usedIn: 'OpportunityPulse AI data persistence & RLS' },
      { name: 'Model Context Protocol', usedIn: 'Verity (Brave Search MCP), EcoFlow tool server execution' },
      { name: 'Docker & MLflow', usedIn: 'TriageIQ model tracking and containerized deployment, Verity hosting' },
    ],
  },
  {
    title: 'Automation & Testing',
    items: [
      { name: 'Web Scraping / Ingestion', usedIn: 'Trafilatura & youtube-transcript-api (Verity), Selenium (Upwork)' },
      { name: 'Workflow Orchestration', usedIn: 'n8n pipelines, Make e-commerce routing, GitHub Actions CI/CD' },
      { name: 'Testing Frameworks', usedIn: 'Vitest & Playwright (OpportunityPulse AI), Pytest (SafeX, TriageIQ)' },
    ],
  },
];

export const CURRENT_FOCUS: FocusItem[] = [
  {
    category: 'Building',
    items: [
      'GlycoTwin — hardening to production grade: real benchmarks, consolidated backend, deployment, weighed-portion meal study',
      'OpportunityPulse AI — extending matching algorithms and cover letter customizer',
      'Autonomous Slack and terminal agents utilizing custom MCP tool integrations',
    ],
  },
  {
    category: 'Learning',
    items: [
      'Advanced deep learning architectures (state space models, multi-modal perception)',
      'Enterprise orchestration frameworks and serverless network containment',
      'Scale and rate-limit mitigation patterns for client agent deployments',
    ],
  },
  {
    category: 'Open to',
    items: [
      'AI/ML Engineer and Generative AI Developer positions',
      'Agentic application engineering and full-stack AI roles',
      'Remote global freelance engagements or major city relocation (Islamabad, Lahore, Karachi)',
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
