# Anton Harness

This file is the active interview-driven source of truth for rebuilding Anton from scratch.
When a new answer changes an earlier decision, update this file by removing or rewriting the conflicting decision before recording the new one.

## Current Decisions

### 1. Primary Purpose

- **Decision:** Anton is a silent visual companion for the portfolio.
- **Role:** Make the portfolio feel alive, embody curiosity and craftsmanship, and subtly guide attention through presence and movement.
- **Communication boundary:** Anton is not the portfolio's general AI assistant. His text is character-driven and tied to his reactions, observations, and story moments rather than open-ended help.
- **Recorded answer:** A

### 2. Character Form and Rendering Medium

- **Decision:** Anton will be a 3D character.
- **Intent:** He should feel like a real character with believable presence, not a flat 2D mascot.
- **Recorded answer:** B

### 3. Visual Realism and Character Style

- **Decision:** Anton should be a believable stylized 3D character with cartoonish charm.
- **Anatomy boundary:** He should be gecko-looking and gecko-inspired, but not a completely realistic gecko.
- **Reference direction:** The expressive, cinematic creature-character approach of *Rango* (2011).
- **Avoid:** Photorealistic animal rendering and generic mascot-like simplification.
- **Recorded answer:** A, with clarification

### 4. Primary Relationship

- **Decision:** Anton interacts with both the visitor and the portfolio content.
- **Visitor relationship:** He notices and responds to visitor activity without becoming demanding or distracting.
- **Portfolio relationship:** He independently observes and explores meaningful projects, skills, experience, and visual elements.
- **Recorded answer:** A

### 5. Core Behavior

- **Decision:** Anton explores and inspects the portfolio.
- **Behavior loop:** He moves toward meaningful portfolio elements, studies them, responds subtly to the visitor, and rests or sleeps naturally.
- **Primary activities:** Exploring, inspecting, observing, reacting, resting, and sleeping.
- **Recorded answer:** A

### 6. Exploration Driver

- **Decision:** Anton uses context-aware autonomy.
- **Inputs:** Current portfolio section, meaningful content, visitor activity, hover targets, scroll behavior, and page state.
- **Decision model:** Anton chooses when and where to explore instead of relying only on fixed scripts or direct cursor commands.
- **Recorded answer:** A

### 7. Autonomy Intensity

- **Decision:** Anton uses quiet and bounded autonomy.
- **Behavior boundary:** He acts only when something is meaningful, never steals focus, and is comfortable remaining still.
- **Design implication:** Autonomous behavior should feel intentional and occasional rather than busy, needy, or attention-seeking.
- **Recorded answer:** A

### 8. Arrival Behavior

- **Decision:** Anton should combine a subtle entrance with a visual greeting.
- **Entrance:** He appears from within or behind portfolio components rather than simply spawning in open space.
- **Greeting:** After emerging, he acknowledges the visitor through a clear character action.
- **Current boundary:** The greeting is visual and non-verbal unless explicitly changed later.
- **Recorded answer:** B + C

### 9. Greeting Gesture

- **Decision:** Anton gives an expressive mascot-style greeting.
- **Action:** He raises or waves one front foot clearly toward the visitor after emerging.
- **Boundary:** This is a deliberate greeting event, not a constant or repeated attention-seeking behavior.
- **Recorded answer:** B

### 10. Greeting Frequency

- **Decision:** Anton performs the greeting once per visit or session.
- **After greeting:** He returns to his normal exploration behavior and does not repeat the greeting during the same session.
- **Recorded answer:** A

### 11. Post-Greeting Behavior

- **Decision:** After greeting, Anton begins context-aware exploration.
- **Transition:** He observes the current page, chooses a meaningful target, and starts exploring without waiting for another command.
- **Recorded answer:** A

### 12. Movement Style

- **Decision:** Anton uses smooth cinematic movement.
- **Motion quality:** Movement should feel polished, fluid, expressive, and film-like rather than constantly abrupt or stop-start.
- **Physicality:** He should still retain believable weight, timing, balance, and creature-specific motion.
- **Recorded answer:** B

### 13. Anthropomorphism

- **Decision:** Anton is a balanced creature-character.
- **Creature foundation:** He retains a gecko-inspired body, instincts, and physical identity.
- **Character expression:** He may use selected expressive gestures, including the front-foot greeting, without becoming fully human.
- **Recorded answer:** C

### 14. Communication Method

- **Decision:** Anton communicates primarily through eyes and body language, supported by context-dependent text.
- **Primary channel:** Gaze, head direction, posture, gestures, movement, and facial expressions.
- **Secondary channel:** Text may be a minimal expressive caption, a short contextual comment, or a complete sentence when the character moment requires it.
- **Boundary:** Text remains character-driven and should not turn Anton into the portfolio's general-purpose chatbot.
- **Recorded answer:** A + B + C, with contextual use

### 15. Audio Boundary

- **Decision:** Anton uses text-only communication.
- **Forbidden:** No spoken dialogue, voice performance, or audio speech.
- **Communication output:** His captions and dialogue are rendered visually on the page.
- **Recorded answer:** A

## Unresolved Decisions

- Visitor interaction model
- Character behavior scope
- Anton's relationship to portfolio content
- Visual personality and appearance
- Motion and behavior system
- Accessibility and performance constraints
- Implementation and delivery scope
