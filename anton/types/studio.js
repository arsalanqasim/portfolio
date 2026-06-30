/**
 * @typedef {Object} PromptCard
 * @property {string} version - Target milestone version
 * @property {string} title - Heading of the prompt card
 * @property {string} category - Category tag
 * @property {string} goal - Target objective
 * @property {string} text - Exact prompt instructions body
 * @property {boolean} locked - Locked badge flag
 * @property {string} notes - Performance comments or tips
 */

/**
 * @typedef {Object} ConceptCard
 * @property {string} id - Unique identifier
 * @property {string} previewUrl - URL path or SVG symbol name
 * @property {string} version - Milestone version
 * @property {number} rating - Scale from 1 to 5
 * @property {string[]} pros - Advantages
 * @property {string[]} cons - Drawbacks
 * @property {string} status - APPROVED, REJECTED, WIP
 * @property {string} notes - Development log notes
 */

/**
 * @typedef {Object} DesignDecision
 * @property {string} id - Decision index identifier (e.g. #12)
 * @property {string} category - Eye, locomotion, scale, etc.
 * @property {string} description - Brief summary of decision
 * @property {string} reason - Background reasoning
 * @property {string} status - LOCKED, PROPOSED
 * @property {string} date - Timestamp index
 */

/**
 * @typedef {Object} MilestoneProgress
 * @property {string} id - Milestone ID string (e.g. IDENTITY)
 * @property {string} name - User friendly title
 * @property {string} status - NOT_STARTED, IN_PROGRESS, LOCKED
 * @property {string} description - Scope of this target milestone
 */

/**
 * @typedef {Object} PanOffset
 * @property {number} x - Horizontal drag shift
 * @property {number} y - Vertical drag shift
 */

/**
 * @typedef {Object} WorkspaceState
 * @property {string} activeSection - Visible menu option
 * @property {boolean} sidebarCollapsed - Layout collapsed flag
 * @property {string} themeMode - Theme (dark, light)
 * @property {number} zoomLevel - Viewport scale
 * @property {PanOffset} panOffset - Viewport translation coordinates
 * @property {?string} selectedConcept - Open concept card ID
 * @property {string} searchQuery - Live text query
 */

export {};
