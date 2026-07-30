# Anton Harness

This file is the active interview-driven source of truth for rebuilding Anton from scratch.
When a new answer changes an earlier decision, update this file by removing or rewriting the conflicting decision before recording the new one.

## Current Decisions

### 1. Primary Purpose

- **Decision:** Anton is a silent visual companion for the portfolio.
- **Role:** Make the portfolio feel alive, embody curiosity and craftsmanship, and subtly guide attention through presence and movement.
- **Communication boundary:** Anton does not explain portfolio content or act as a conversational assistant.
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

## Unresolved Decisions

- Visitor interaction model
- Character behavior scope
- Anton's relationship to portfolio content
- Visual personality and appearance
- Motion and behavior system
- Accessibility and performance constraints
- Implementation and delivery scope
