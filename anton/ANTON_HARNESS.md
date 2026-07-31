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

### 16. Dialogue System

- **Decision:** Anton uses authored dialogue with contextual selection.
- **Source of truth:** His lines are written and curated as part of the character design.
- **Runtime behavior:** The system selects an appropriate line based on Anton's state, visitor behavior, and current portfolio context.
- **Forbidden:** No uncontrolled freeform dialogue generation.
- **Recorded answer:** A

### 17. Relationship to Portfolio Chatbot

- **Decision:** Anton remains a distinct character.
- **Anton's role:** Expresses his own observations, reactions, and personality through movement and authored text.
- **Chatbot's role:** Continues handling visitor questions and factual information about Arsalan's portfolio.
- **Boundary:** Anton does not replace or impersonate the portfolio chatbot.
- **Recorded answer:** A

### 18. Content Priority

- **Decision:** Anton prioritizes high-signal technical content.
- **Primary targets:** Projects, metrics, code-related visuals, technical diagrams, skill details, and meaningful work updates.
- **Curiosity principle:** His exploration should reinforce the portfolio's core identity as practical AI/ML engineering work.
- **Recorded answer:** A

### 19. Fallback Exploration

- **Decision:** When no high-signal technical content is active, Anton explores nearby meaningful content.
- **Fallback targets:** Relevant interface elements, personal sections, and visitor activity.
- **Return behavior:** He returns to technical content when a stronger target becomes available.
- **Recorded answer:** A

### 20. Visitor Reaction Style

- **Decision:** Anton responds to visitor interaction with subtle but readable reactions.
- **Possible reactions:** Looks toward the cursor, adjusts posture, tilts his head, changes expression, or briefly comments.
- **Intensity boundary:** Reactions should remain expressive without becoming exaggerated, noisy, or distracting.
- **Recorded answer:** A

### 21. Cursor Interaction

- **Decision:** Anton uses proximity-aware cursor interaction between limited gaze tracking and selective approach behavior.
- **Near cursor:** His eyes and head may follow the cursor, with subtle posture or expression changes.
- **Occasional approach:** If the cursor remains meaningfully near him, he may move slightly toward it.
- **Boundary:** He does not follow the cursor globally across the entire viewport.
- **Recorded answer:** A + B, bounded hybrid

### 22. Cursor-Reaction Area

- **Decision:** Anton uses a broad local cursor area weighted toward meaningful targets.
- **General awareness:** He can notice the cursor from farther away within the active portfolio section.
- **Strong reaction:** His most expressive response occurs when the cursor is near a meaningful portfolio element he is inspecting.
- **Boundary:** Awareness remains local to the active context and does not become full-viewport cursor tracking.
- **Recorded answer:** B + C, bounded hybrid

### 23. Click Reaction

- **Decision:** A click triggers a brief acknowledgment followed by a return to exploration.
- **Acknowledgment:** Anton may use a small gesture, expression, or authored line.
- **Direct engagement:** In some contexts he may briefly face the visitor and offer a short character interaction.
- **Boundary:** Clicks do not turn Anton into a persistent conversational interface.
- **Recorded answer:** A + limited B

### 24. Click Interaction Duration

- **Decision:** Click interactions last approximately 1–3 seconds.
- **Sequence:** Acknowledge the visitor, perform a small reaction or short line, then return to exploration.
- **Boundary:** The interaction is a moment, not an ongoing mode.
- **Recorded answer:** A

### 25. Page Traversal

- **Decision:** Anton uses context-aware section traversal.
- **Movement model:** He travels between meaningful portfolio components and sections based on scroll position, content, and visitor activity.
- **Continuity:** Anton remains one continuous character moving through the page rather than unrelated duplicated appearances.
- **Recorded answer:** A

### 26. Physical Placement

- **Decision:** Anton moves along meaningful portfolio surfaces.
- **Allowed surfaces:** Card edges, component borders, image frames, section boundaries, and other grounded surfaces.
- **Hard constraint:** Anton must never block a component, text, control, or other meaningful part of the portfolio.
- **Placement principle:** His position must support the page rather than cover or interfere with it.
- **Recorded answer:** A, with non-obstruction constraint

## Unresolved Decisions

- Visitor interaction model
- Character behavior scope
- Anton's relationship to portfolio content
- Visual personality and appearance
- Motion and behavior system
- Accessibility and performance constraints
- Implementation and delivery scope
