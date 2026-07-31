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
- **Movement model:** He travels between meaningful portfolio components and sections based on visible context, content, and visitor activity.
- **Continuity:** Anton remains one continuous character moving through the page rather than unrelated duplicated appearances.
- **Scroll relationship:** Scrolling changes his available context and targets, but does not physically drag or force Anton to move.
- **Recorded answer:** A

### 26. Physical Placement

- **Decision:** Anton moves along meaningful portfolio surfaces.
- **Allowed surfaces:** Card edges, component borders, image frames, section boundaries, and other grounded surfaces.
- **Default constraint:** Anton's autonomous placement must never block a component, text, control, or other meaningful part of the portfolio.
- **Placement principle:** His autonomous position must support the page rather than cover or interfere with it.
- **Manual override:** The visitor may temporarily override this constraint by manually placing Anton.
- **Recorded answer:** A, with non-obstruction constraint

### 27. Collision Avoidance

- **Decision:** Anton reroutes around important content.
- **Path rule:** He chooses another nearby safe surface or pauses until a safe path is available.
- **Forbidden:** He must not overlap or obscure important content simply to reach a preferred target.
- **Recorded answer:** A

### 28. Unreachable Target Behavior

- **Decision:** When no safe path to a target exists, Anton rests at the nearest safe position.
- **Behavior:** He waits naturally and continues observing until the target becomes safely reachable.
- **Recorded answer:** A

### 29. User Repositioning

- **Decision:** The visitor may manually move Anton.
- **Interaction:** The visitor can click and hold Anton, pick him up, and place him somewhere else on the page.
- **Purpose:** Gives the visitor control when Anton is in an inconvenient position or appears to be blocking something.
- **Implementation requirement:** The interaction must feel like physically picking up and repositioning a character, not dragging a generic UI element.
- **Placement rule:** The visitor may place Anton anywhere on the page, including temporarily over meaningful content.
- **Self-correction:** If manual placement obstructs meaningful content, Anton waits briefly, then moves himself to available whitespace.
- **Fallback placement:** If truly empty background space is unavailable, Anton may use the nearest low-priority area that does not materially interfere with the portfolio.
- **No-space fallback:** If neither empty space nor a suitable low-priority area exists, Anton disappears from the site until a safe location becomes available.
- **Return behavior:** When he returns, he greets the visitor and resumes normal exploration.
- **Recorded answer:** B, with self-correction and hidden-state fallback

### 30. Manual Placement Correction Delay

- **Decision:** Anton waits 3–5 seconds before correcting an obstructing manual placement.
- **Purpose:** This gives the visitor time to intentionally position him while preserving the portfolio's readability.
- **Recorded answer:** A

### 31. Safe Whitespace Definition

- **Decision:** Safe placement prioritizes visually empty background areas, with a low-priority fallback.
- **Primary safe space:** Areas with no text, controls, images, cards, or other meaningful content.
- **Fallback safe space:** The nearest low-priority area may be used when completely empty space is unavailable, provided it does not materially interfere with the page.
- **Hidden state:** Anton disappears only when neither option is available.
- **Recorded answer:** A + C

### 32. Reappearance After Hidden State

- **Decision:** Anton reappears at the nearest safe location in the current viewport.
- **Return sequence:** He becomes visible, greets the visitor, and resumes context-aware exploration.
- **Continuity:** He does not need to return to the obstructed location that caused him to hide.
- **Recorded answer:** A

### 33. Scroll Relationship

- **Decision:** Anton remains independent of scrolling.
- **Context response:** Scrolling updates which portfolio content is visible and relevant, allowing Anton to choose a new target.
- **Physical response:** Anton is not carried by page scroll physics and does not need to move continuously while the visitor scrolls.
- **Recorded answer:** A + C, clarified as context-aware but scroll-independent

### 34. Section-Change Decision

- **Decision:** When scrolling reveals a new section, Anton observes and decides autonomously whether to respond.
- **Evaluation:** He considers the section's meaningful content, visitor activity, current state, and safe placement availability.
- **Boundary:** A section change alone does not force an animation, greeting, or relocation.
- **Recorded answer:** A

### 35. Long-Distance Travel

- **Decision:** Anton travels visibly when practical and hides when necessary.
- **Visible travel:** He moves along nearby safe surfaces when the route is believable and non-obstructive.
- **Hidden transition:** For distant or impractical routes, he may disappear and reappear at a safe destination.
- **Purpose:** Preserve believable character movement without forcing long, distracting journeys.
- **Recorded answer:** A

### 36. Hiding Transition

- **Decision:** Anton hides using the environment, with fading as a secondary method.
- **Primary method:** He slips behind a card edge, image frame, component boundary, or another believable surface.
- **Secondary method:** If no suitable environmental surface exists, he may fade out and fade back in at the destination.
- **Style boundary:** The transition should remain cinematic and grounded rather than magical or flashy.
- **Recorded answer:** A + B

### 37. Contextual Greeting on Reappearance

- **Decision:** Anton greets only when contextually appropriate.
- **Greeting moments:** First arrival of the session, and return from hidden state caused by obstruction or lack of safe space.
- **No repeated greeting:** Normal movement between sections or ordinary environment fades do not trigger another greeting.
- **Recorded answer:** A

## Finalized Build Direction

The following implementation decisions use the recommended defaults authorized by the user for any remaining questions.

### Character Asset

- Build one continuous 3D Anton character from scratch.
- Use a stylized cinematic creature design: gecko-inspired, cartoonish, expressive, and believable without being photorealistic.
- Preserve a recognizable gecko silhouette while allowing characterful proportions and expressive gestures inspired by creature cinema such as *Rango* (2011).
- Avoid generic mascot geometry, realistic reptile simulation, human clothing, and human facial anatomy.

### Rendering Architecture

- Use a single shared transparent 3D canvas layered over the portfolio rather than separate canvases per section.
- Use React Three Fiber and Three.js as the runtime renderer, with a GLB asset as the production character format.
- Keep the canvas cosmetic and non-blocking by default; only Anton's hit area accepts pointer input.
- Drive placement from measured DOM surfaces and visible portfolio context, not hardcoded viewport coordinates.
- Keep all character decisions in a deterministic state machine; React components render state and do not invent ad-hoc behavior.

### Behavior Architecture

- Use authored states for `arrival`, `greeting`, `explore`, `inspect`, `observe`, `react`, `rest`, `hidden`, `picked-up`, and `return`.
- Use a context evaluator to rank technical content, nearby meaningful content, visitor activity, safe surfaces, and current visibility.
- Use a target selector to choose one safe destination at a time.
- Use a collision and obstruction layer to reject destinations that cover text, controls, cards, images, or other meaningful content.
- Use visible travel for nearby targets and environment-assisted or fade transitions for distant targets.
- Treat rest, waiting, and hiding as intentional valid states rather than failures.

### Visitor Controls

- Support pointer/touch click-and-hold pickup and repositioning.
- Show a clear pickup affordance without adding a permanent control panel.
- Allow free placement temporarily, then apply the 3–5 second obstruction correction rule.
- Allow keyboard-accessible focus and repositioning fallback so the interaction is not pointer-only.
- Respect `prefers-reduced-motion`; reduce movement and transitions while preserving the character's visibility and text alternatives.

### Dialogue System

- Keep dialogue authored, versioned, and selected by context.
- Support three line lengths: minimal expressive captions, short contextual comments, and occasional complete sentences.
- Keep Anton separate from the existing portfolio chatbot.
- Never generate uncontrolled responses or use Anton to answer factual visitor questions.
- Render dialogue as accessible text attached to Anton's current character state.

### Portfolio Context Targets

Prioritize targets in this order:

1. Technical projects and featured work
2. Metrics, diagrams, code-related visuals, and meaningful updates
3. Skills and tools
4. Experience and professional history
5. About, profile, and personal narrative
6. Relevant visitor activity and interface elements

### Safety and Performance Contract

- Anton must never permanently obscure portfolio content.
- Anton must never trap focus, prevent scrolling, or interfere with links, buttons, forms, or the chatbot.
- Hide or pause expensive rendering when Anton is outside the visible context, the tab is hidden, or no safe placement is available.
- Lazy-load the 3D runtime and character asset after the portfolio's primary content is available.
- Provide a lightweight hidden/reduced-motion fallback for unsupported devices or accessibility settings.
- Keep the first implementation focused on one character, one shared canvas, authored behaviors, safe placement, and the pickup interaction.

### Decision Precedence

1. The latest decision in this harness overrides earlier interview decisions.
2. This harness overrides legacy Anton documents and the old prototype implementation when they conflict.
3. Safety, accessibility, and non-obstruction rules override autonomous character behavior.
4. Character personality overrides decorative effects and unnecessary animation.

## Status

- **Harness state:** Complete for implementation kickoff.
- **Character design state:** Ready for visual concept and 3D blockout.
- **Runtime state:** Ready for a fresh Anton integration; the existing SVG/speech-bubble prototype is legacy code and should not be extended as the production implementation.
- **Next build phase:** Create the first approved 3D concept and blockout, then integrate the shared canvas and state skeleton.
