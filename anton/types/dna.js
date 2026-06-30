/**
 * @typedef {Object} AntonIdentity
 * @property {string} name - Name of the character
 * @property {string} codename - Internal codename
 * @property {string} philosophy - One-sentence brand statement
 * @property {string[]} rules - Non-negotiable behavior rules
 */

/**
 * @typedef {Object} AntonPersonality
 * @property {string} temperament - Overall mood description
 * @property {string[]} loved_interactions - Array of items Anton interacts with
 * @property {string[]} ignored_interactions - Array of items Anton bypasses
 */

/**
 * @typedef {Object} ScaleRules
 * @property {number} navbar_height_px - Height on the navbar
 * @property {number} project_card_height_px - Height on projects
 * @property {number} portrait_focal_height_px - Height on main portrait
 */

/**
 * @typedef {Object} BodyProportions
 * @property {number} head_to_body_ratio - Geometric ratio
 * @property {number} tail_to_body_ratio - Geometric ratio
 * @property {number} limb_length_ratio - Geometric ratio
 */

/**
 * @typedef {Object} AntonAppearance
 * @property {string} species - Biological inspiration
 * @property {ScaleRules} scale_rules - Rendering scales
 * @property {BodyProportions} body_proportions - Proportional anatomy limits
 */

/**
 * @typedef {Object} SpeedConfig
 * @property {number} walk_units_per_sec - Base walk speed
 * @property {number} scurry_units_per_sec - Fast scurry speed
 */

/**
 * @typedef {Object} AntonMovement
 * @property {string} style - Description of motion pattern
 * @property {SpeedConfig} speed - Movement speeds
 * @property {string[]} gait_sequence - Traversal limb sequencing
 * @property {string} rotation_rules - Eye vs head vs body rotation order
 */

/**
 * @typedef {Object} EasterEggConfig
 * @property {string} id - Unique identifier
 * @property {string} trigger - Activation conditions
 * @property {string} description - Behavioral output description
 */

/**
 * @typedef {Object} AntonBehavior
 * @property {Object.<string, string>} sections - Mapping of page section IDs to Anton behavior roles
 * @property {EasterEggConfig[]} easter_eggs - Interactive triggers
 */

/**
 * @typedef {Object} MaterialConfig
 * @property {number} skin_roughness - Matte skin feel (0-1)
 * @property {number} underbelly_roughness - Cream underbelly feel (0-1)
 * @property {number} eye_glossiness - Reflectivity (0-1)
 * @property {number} body_specular - Specular bounce (0-1)
 */

/**
 * @typedef {Object} AntonBrand
 * @property {Object.<string, string>} colors - Color map variables
 * @property {MaterialConfig} materials - Shader attributes
 */

/**
 * @typedef {Object} AntonDNA
 * @property {AntonIdentity} identity
 * @property {AntonPersonality} personality
 * @property {AntonAppearance} appearance
 * @property {AntonMovement} movement
 * @property {AntonBehavior} behavior
 * @property {AntonBrand} brand
 */

export {};
