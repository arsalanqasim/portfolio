/**
 * Milestones identifiers
 */
export const MILESTONES = {
  IDENTITY: 'IDENTITY',
  ANATOMY: 'ANATOMY',
  FACE: 'FACE',
  EXPRESSIONS: 'EXPRESSIONS',
  BEHAVIOR: 'BEHAVIOR',
  ANIMATION: 'ANIMATION',
  IMPLEMENTATION: 'IMPLEMENTATION'
};

/**
 * Display names for Milestones
 */
export const MILESTONE_NAMES = {
  [MILESTONES.IDENTITY]: 'Identity',
  [MILESTONES.ANATOMY]: 'Anatomy',
  [MILESTONES.FACE]: 'Face Design',
  [MILESTONES.EXPRESSIONS]: 'Expressions',
  [MILESTONES.BEHAVIOR]: 'Behavior Rules',
  [MILESTONES.ANIMATION]: 'Animation Rules',
  [MILESTONES.IMPLEMENTATION]: 'Implementation'
};

/**
 * Milestone status settings
 */
export const STATUSES = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  LOCKED: 'Locked 🔒'
};

/**
 * Event names for decoupled communication
 */
export const EVENTS = {
  DNA_UPDATED: 'DNA_UPDATED',
  PROJECT_UPDATED: 'PROJECT_UPDATED',
  PROMPT_ADDED: 'PROMPT_ADDED',
  CONCEPT_CHANGED: 'CONCEPT_CHANGED',
  DECISION_LOCKED: 'DECISION_LOCKED',
  MILESTONE_CHANGED: 'MILESTONE_CHANGED',
  SECTION_CHANGED: 'SECTION_CHANGED',
  WORKSPACE_STATE_CHANGED: 'WORKSPACE_STATE_CHANGED'
};

/**
 * Navigation views in the workspace
 */
export const SECTIONS = {
  DASHBOARD: 'dashboard',
  INSPIRATION: 'inspiration',
  PROMPTS: 'prompts',
  DNA: 'dna',
  VERSION_HISTORY: 'history',
  DECISIONS: 'decisions',
  CONCEPTS: 'concepts'
};

/**
 * Inspiration Board Categories
 */
export const INSPIRATION_CATEGORIES = [
  'Real Geckos',
  'Character Design',
  'Pixar',
  'DreamWorks',
  'Premium UI',
  'Materials',
  'Colors',
  'Motion References'
];

/**
 * Prompt Library Categories
 */
export const PROMPT_CATEGORIES = [
  'Identity',
  'Anatomy',
  'Face',
  'Expressions',
  'Behavior',
  'Animation',
  'Assets',
  'System Prompt'
];
