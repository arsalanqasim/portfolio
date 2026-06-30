# Anton Character Bible (v1.0)

This document is the authoritative design specification and single source of truth for **Anton the Gecko**, the brand mascot for Arsalan Qasim's portfolio. All future AI generation prompts, visual assets, animation frames, and code behaviors must strictly adhere to the guidelines, specifications, and limits outlined herein.

---

## 1. Character Overview
- **Name**: Anton
- **Codename**: Explorer-01
- **Biological Inspiration**: Gold Dust Day Gecko (*Phelsuma laticauda*)
- **Target Role**: A quiet explorer who discovers technology with the same curiosity that visitors discover Arsalan's portfolio.
- **Visual Silhouette Key**: Sleek organic lines, wide almond-shaped intelligent eyes, clean gecko proportions, flat 2D layout constraints, zero cartoon outlines.

---

## 2. Brand Philosophy
Anton is not a cartoon mascot, a playful pet, or a performance-seeking character. He represents:
- **Craftsmanship & Iteration**: Anton's design represents the same careful refining process used in coding and calisthenics.
- **Intellectual Curiosity**: Anton is driven entirely by observation and learning, never by playfulness or entertainment.
- **Timelessness**: The character design must feel modern, minimal, and premium today, and remain fully viable 10 years from now.
- **Calm Integration**: Anton sits quietly in container cards, navbar elements, and footer regions. He belongs to the page's structure.

---

## 3. Personality
- **Temperament**: Quiet, observant, cautious, intelligent, agile, and calm.
- **Core Motivation**: Active interest in understanding and exploring technological systems.
- **Preferred Objects (Loved Interactions)**:
  - Fresh projects and newly updated cards.
  - Interesting code block layouts.
  - Dynamic AI schemas and volumetric diagrams.
  - High-res graphics and moving elements.
  - Interactive call-to-action buttons.
- **Avoided Areas (Ignored Interactions)**:
  - Large blank white spaces.
  - Long paragraphs of decorative text.
  - Complex backgrounds.
  - Random, fast mouse movements happening far away.

---

## 4. Physical Anatomy
Anton's dimensions are mathematically constrained to fit portfolio sections cleanly:
- **Proportional Scale Ratios**:
  - **Head-to-body ratio**: 0.35 (Large enough to read expressions, but small enough to look realistic).
  - **Tail-to-body ratio**: 1.10 (Long tail used for balancing and visual counterweighting).
  - **Limb-length ratio**: 0.45.
- **Physical Traits**:
  - Broad head with rounded nose tip.
  - Wide-set, glossy, pupil-adjustable almond eyes.
  - Five-toed adhesive pads on all four limbs.
  - Thick, tapering tail structure with organic curvature.

---

## 5. Design Language
Every visual asset generated for Anton must satisfy these craftsmanship directives:
- **No Outlines**: Use volumetric flat shading, ambient occlusion shadows, or subtle gradients. Avoid black lines or cartoon strokes.
- **Realistic Outlines**: Rounded corners, smooth joint connections, and organic contours.
- **Minimalist Detailing**: Body details (e.g. spots) should be geometric and sparse. Avoid busy textures or chaotic patterns.
- **Anti-anthropomorphism**:
  - No human clothing, hats, shoes, or glasses.
  - No artificial accessories (backpacks, bags, gadgets).
  - No human mouth curves, smiles, or human teeth.
  - No fantasy attributes (horns, spikes, extra limbs, glowing wings).

---

## 6. Color & Material Specifications
All assets must use the following hexadecimal and shader rules:
- **Hex Color Palette**:
  - **Base Green**: `#4ADE80` (Vibrant, natural, high-visibility green).
  - **Spots Orange**: `#F97316` (Contrast orange spots on head/back).
  - **Underbelly Cream**: `#F8FAFC` (Soft cream underbelly color).
  - **Accent Cyan**: `#06B6D4` (Contrast highlight color for eyes/gaze lines).
  - **Shadows & Occlusion**: `#0F172A` (Obsidian/Slate shadow bases).
- **Material Shader Parameters**:
  - **Skin Roughness**: `0.85` (Matte, non-reflective leather skin texture).
  - **Underbelly Roughness**: `0.95` (Soft, dry texture).
  - **Eye Glossiness**: `0.98` (Near-mirror finish, reflecting ambient portfolio light).
  - **Specular Bounce**: `0.15` (Subtle highlights on skin ridges).

---

## 7. Motion Principles
Anton's animation framework follows a strict realistic reptile motion model:
- **Gait locomotion**: Walking must use a realistic crawl sequence:
  1. Left Hand (LH)
  2. Right Foot (RF)
  3. Right Hand (RH)
  4. Left Foot (LF)
- **Dash-and-Freeze Pattern**: Anton scurries rapidly (high frame rate, fast speed), then freezes completely for a random duration (0 frames of movement). Geckos move exactly like this.
- **Head-gaze Tracking**: When looking at targets, Anton's head tilts and rotates first. The body remains stationary or shifts slowly afterward to match.
- **Tail Balance**: The tail swings continuously in opposition to head/limb pivots, counter-balancing movement vectors.

---

## 8. Interaction Principles
- **Attention Rule**: Anton never waves, jumps, dances, or flashes to seek attention on arrival. He remains quiet and is discovered by visitors organically.
- **Cursor Tracking**: Anton's head tracks the cursor positions when it hovers within a 200px boundary. Outside this area, Anton ignores it.
- **Scroll Snap Traversal**: When the visitor scrolls the page, Anton moves with natural momentum, scurrying to snap onto the nearest container edge.
- **Trigger Actions**: Clicks on Anton trigger a brief head tilt or a slow tail wag, then he returns to neutral or sleepy state.

---

## 9. Approved Pose Library
- **Pose #1 — Standing Alert**: Head raised, tail curved in an S-shape, body slightly angled.
- **Pose #2 — Traversal Crawl**: Low body clearance, limbs splayed in locomotion gait.
- **Pose #3 — Vertical Climb**: Snapped to vertical card borders, head pointing up, tail hanging down.
- **Pose #4 — Resting/Sleeping**: Flat body posture, limbs tucked in, tail straight, eyes closed.

---

## 10. Approved Expression Library
Anton expresses himself through eye shapes, pupil scale, and body posture across 6 core states:
- **Neutral (Default)**: Normal oval pupil, head level, body relaxed.
- **Curious (Target Spotted)**: Pupil slightly dilated, head tilted, tail twitches slowly.
- **Focused (Reading Project)**: Narrowed eyelids, pupil contracted, head lowered.
- **Happy (Small Success)**: Eyelids softened, tail curves upward slightly.
- **Sleepy (Idle state)**: Eyelids half-closed, breathing scale cycles slowly, flat posture.
- **Alert (User interaction)**: Wide open eyes, pupil fully dilated, body raised.

---

## 11. Environment Rules
- **Physics Snapping**: Anton must snap to DOM container borders. He cannot float in empty whitespace or hover randomly.
- **Gravity & Friction**: Every crawl or climb action must look weighted. Limb slips or falls should follow natural momentum curves.
- **Blend Modes**: Drop shadows use multiply blend mode onto the portfolio canvas cards to approximate ambient occlusion.

---

## 12. Portfolio Placement Rules
| Portfolio Section | Section ID | Anton's Role / Task | Behavior Description |
| :--- | :--- | :--- | :--- |
| **Navbar** | `navbar` | Home Base | Snapped to logo, watches page load |
| **Hero** | `home` | Curious Observer | Looks down from the edge of the intro card |
| **Projects** | `work` | Active Explorer | Scurries across project tags, inspects metrics |
| **Experience** | `experience` | Quiet Climber | Vertically tracks work timeline milestones |
| **Skills** | `skills` | Inspector | Crawls to hover skill chips when user interacts |
| **About** | `about` | Respectful Visitor | Sits on portrait frame, tracking cursor gaze |
| **Footer** | `footer` | Sleeping | Curled up asleep in the bottom corner |

---

## 13. Do's and Don'ts

### Do's:
- Keep Anton minimal, calm, and integrated.
- Ensure all animations use the dash-and-freeze timing.
- Snap Anton strictly to card container borders.
- Keep eye reflections clean and glossy.

### Don'ts:
- Never make Anton wave, dance, speak, or blink text bubbles.
- Never add hats, shoes, glasses, or items.
- Never use cartoon outlines, human teeth, or funny faces.
- Never let Anton break physics or float off container borders.

---

## 14. Future Expansion
As Arsalan's career develops, Anton's world grows with new interactive items:
- **Internship Milestone**: Anton discovers and inspects a tiny laptop.
- **Research Milestone**: Anton sits next to a tiny research notebook.
- **Code Milestone**: Anton discovers a glowing code cube.
