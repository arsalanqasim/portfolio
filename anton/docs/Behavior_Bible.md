# Anton Behavior Bible (v1.0)

This document is the authoritative animation and interaction specification and single source of truth for **Anton the Gecko**'s behavioral engine. All future animation loops, state-machines, user interactions, and programmatic triggers must follow the constraints, rules, and priority systems defined below.

Every behavior is designed to reinforce Anton's identity as a **quiet explorer**—an intelligent observer, not an entertainer.

---

## 1. Personality Rules
Anton's personality traits dictate how he interacts with elements on the portfolio site:
- **Quiet**: Anton never makes sounds, produces dialog bubbles, or displays text. His communication is entirely physical.
- **Observant**: Anton's default state is looking toward points of interest (code blocks, project highlights, interactive widgets).
- **Cautious**: If the mouse cursor moves too quickly or comes too close too fast, Anton backs away or retreats to a container corner.
- **Calm**: Anton does not display high-frequency jittery movements. His cycles are steady and controlled.
- **Intelligent**: Anton's eyes track elements with clear intentionality. Pupils contract when focusing on text/code and dilate when curious.
- **Agile**: Anton's movements are quick and precise. He utilizes organic friction, deceleration, and weight.

---

## 2. Motion Principles
Anton's motion framework is built on realistic day gecko mechanics:
- **Dash-and-Freeze**: Anton does not walk at a continuous, steady pace. He moves in sudden, rapid bursts (scurries), and then pauses completely (freezes) for a random duration (1.5 to 4 seconds).
- **Limb Sequencing**: Traversal crawl loops must follow the standard diagonal gait sequence:
  1. Left Hand (LH) forward.
  2. Right Foot (RF) forward.
  3. Right Hand (RH) forward.
  4. Left Foot (LF) forward.
- **Tail Counterbalance**: The tail acts as a balance beam. When the head turns right, the tail curves left. During scurries, the tail wags side-to-side in a fluid sine wave opposing the active limb thrust.
- **Head Lead**: The head must rotate and tilt toward target coordinates 120ms before the torso aligns. The gaze always drives body repositioning.

---

## 3. Idle Behaviors
When the visitor is inactive, Anton displays subtle signs of life:
- **Breathing Cycle**: A slow, rhythmic vertical scale deformation of the chest cavity (`y` scale shifts by `±2%` over a 3.2-second loop).
- **Blinking**: Occasional eyelids closing for 180ms, occurring at random intervals between 6 and 12 seconds.
- **Subtle Head Tilting**: Occasional minor head rotation changes (`±5 degrees`) as if looking around at nearby document borders.
- **Tail Twitch**: A quick double-twitch of the tail tip (lasts 400ms) once every 15 to 20 seconds.

---

## 4. Scroll Behaviors
Scrolling triggers active traversal snapping:
- **Clinging Hook**: As the scroll position shifts, Anton clings tightly to the container border he currently occupies. Limbs adapt to the scroll momentum.
- **Snapping Traversal**: If the container scrolls out of the viewport, Anton scurries vertically or horizontally along grid gutters to snap onto the nearest visible container.
- **Scroll Friction**: Anton is affected by page inertia. Fast scroll stops cause a slight slide and recovery pose, showcasing physical weight.

---

## 5. Hover Behaviors
Anton reacts selectively to the user's cursor:
- **Tracking Gaze**: If the cursor enters a 200px radius around Anton, his eyes and head track the cursor position smoothly.
- **Curious Approach**: If the cursor remains static within the tracking zone, Anton takes 2-3 slow steps closer to inspect it.
- **Startled Retreat**: If the cursor moves erratically or too fast inside the 200px zone, Anton instantly retracts his limbs, shifts backward, and assumes a low alert posture.
- **Boundary Limit**: Gaze tracking stops if the cursor is outside the 200px zone; Anton returns to default target tracking (such as inspecting a project tag).

---

## 6. Attention Rules
Anton never demands attention from the user:
- **No Greeting Waving**: Anton does not wave or look directly at the screen when a visitor arrives.
- **No Performance Dancing**: Anton never jumps, dances, or does celebratory spins unless explicitly triggered by secret easter eggs.
- **Organic Discovery**: Anton sits quietly. If the visitor notices him, it is because his presence is integrated cleanly into the layout grid.

---

## 7. Sleep Rules
Inactivity puts Anton to sleep to save browser CPU cycles:
- **Inactivity Timer**: Triggered after 60 seconds of zero scroll, hover, or click events across the portfolio.
- **Sleeping Pose**: Anton crawls to a container corner, curls his tail tightly around his body, closes his eyelids fully, and drops body scale height.
- **Breathing Shift**: The chest expansion cycle slows down to a 5.0-second loop.
- **Instant Wakeup**: If the cursor approaches within the 200px tracking zone, Anton's eyes pop open (Alert state) and he assumes a standing pose.

---

## 8. Curiosity Rules
Curiosity drives Anton's autonomous pathfinding:
- **Project Inspection**: Anton crawls toward highlighted project tags or newly revealed metrics, looking closely at the text.
- **Interactive Targets**: Anton positions himself near hovered buttons, watching the hover state transition.
- **Butterfly Chase**: Once every few sessions, a tiny butterfly flies across the screen. Anton drops his torso, stalks the butterfly slowly, pauses, and watches it fly out of bounds.

---

## 9. Navigation Rules
- **Container Boundary Snapping**: Anton must always snap to container edges. He cannot stand in empty whitespaces or cross blank columns.
- **Gutter Traversal**: Anton uses grid gutters (spaces between container boxes) to travel between different vertical sections.
- **No Collision Clipping**: Anton's limbs and tail must never clip through container borders. Limbs rest precisely on border guidelines.

---

## 10. Interaction Rules
- **Click**: Tapping Anton triggers a brief head tilt and a slow wag of the tail tip.
- **Double Click**: Anton opens his eyes wide (Alert state), stands taller on all four limbs for 1.5 seconds, then relaxes.
- **Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`)**: Triggered when typed on the keyboard. Anton pauses, looks directly at the visitor, performs a single backflip, and returns to normal.

---

## 11. Animation Timing
- **Base Frame Rate**: Targeted at 60 FPS.
- **Scurry Speed**: Completed within 300ms using a steep ease-out cubic curve (rapid start, smooth deceleration).
- **Blink Duration**: 180ms (ease-in-out).
- **Interpolation Weights (lerp)**: Gaze head rotation uses a `lerp` factor of `0.08` for organic, smooth target acquisition.

---

## 12. Emotional States
Anton translates states through physical configurations:
1. **Neutral**: Eyes level, normal pupil scale, body relaxed, tail in a relaxed curve.
2. **Curious**: Head tilted, pupils dilated, body lowered, tail twitching.
3. **Focused**: Eyelids narrowed, pupils contracted, head pointing down.
4. **Happy**: Softened eyelids, tail curved upward.
5. **Sleepy**: Eyelids closed, flat body posture, slow breathing.
6. **Alert**: Eyelids wide open, pupils fully dilated, body raised off the surface.

---

## 13. Behavior Priority System
When multiple triggers occur, the behavior engine resolves them using this strict hierarchy:

| Level | Priority | Behavior Trigger | Output Action |
| :---: | :--- | :--- | :--- |
| **1** | Critical | Konami Code | Celebratory Backflip (interrupts all) |
| **2** | High | Weather Rain | Scurry to nearest container overhang shelter |
| **3** | Mid | Click / Double Click | Play twitch/alert animation |
| **4** | Mid | Scroll Movement | Scurry along gutters to snap to container borders |
| **5** | Low | Cursor Hover | Track cursor position within 200px boundary |
| **6** | Default| Idle Timeout | Transition to Sleep state |

---

## 14. Things Anton Never Does
To preserve brand alignment, these actions are strictly forbidden:
- Never talks or shows speech/dialog bubbles.
- Never waves or points limbs at the user.
- Never jumps or dances to get attention.
- Never floats or travels outside container guidelines.
- Never smiles, shows teeth, or displays humanoid expressions.
- Never carries laptops, books, or clothing.
- Never tracks the cursor if it is further than 200px away.
- Never breaks physics rules (sudden velocity shifts without friction).
