# Anton Animation Specification (v1.0)

This document is the authoritative animation specification and single source of truth for **Anton the Gecko**, the interactive portfolio companion for Arsalan Qasim's portfolio. It details the runtime state triggers, keyframe transitions, bone coordinates, shape key values, and physics parameters for all 22 core animations.

All developer integrations (React Three Fiber, Three.js, GSAP/Framer Motion) and 3D animator assets must strictly comply with these specifications. **Anton is design-locked. Do not redesign him.**

---

## 1. Rig & Animation System Context
To ensure seamless execution, the animations specified below refer to the technical rig and mesh attributes defined in the [3D Production Plan](file:///c:/Users/arsal/Desktop/portfolio/anton/docs/3D_Production_Plan.md):
- **Core Bones**: `Root`, `Pelvis`, `Spine_01`, `Spine_02`, `Neck`, `Head`, `Eye_L`, `Eye_R`, `Tail_01` to `Tail_06`, and limbs (Thigh/Shin/Foot and Shoulder/Elbow/Wrist).
- **Shape Keys (Facial & Eye Expression)**:
  - `Blink_L` & `Blink_R`: Full lid closure ($0.0 \to 1.0$).
  - `Squint_L` & `Squint_R`: Eyelid narrowing ($0.0 \to 1.0$).
  - `Pupil_Contract`: Shrinks pupil to vertical slit ($0.0 \to 1.0$).
  - `Pupil_Dilate`: Expands pupil to large circle ($0.0 \to 1.0$).
- **Motion Constraints**:
  - **Dash-and-Freeze**: Traversal is performed in explosive scurries followed by absolute freezes ($1.5\text{s} - 4.0\text{s}$).
  - **Head-Lead Gaze**: Gaze updates eyes and `Head` bone rotations $120\text{ms}$ before the spine/torso adjusts.
  - **Diagonal Crawl Gait**: Walking steps must follow the pattern: Left Hand (LH) $\to$ Right Foot (RF) $\to$ Right Hand (RH) $\to$ Left Foot (LF).
  - **Tail Counterbalance**: The tail segment chain (`Tail_01` - `Tail_06`) rotates in opposition to head movements to act as a physical counterbalance.
  - **Environment Snapping**: Anton must snap paw IK targets to CSS container card borders and traverse along gutters. He cannot hover in empty space.

---

## 2. Animation Specification Matrix (Overview)

| ID | Animation Name | Purpose | Loop | Duration | Ease Type | Trigger |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **01** | `idle_breathing` | Subtle sign of life | Yes | 3.2s | Sine / Cubic-Bezier | Engine default when idle |
| **02** | `face_blink` | Real-time blink | No | 180ms | Ease-In-Out | Random interval (6-12s) |
| **03** | `look_left` | Gaze shift to left | No | 0.4s | Ease-Out (Cubic) | Target coordinate changes |
| **04** | `look_right` | Gaze shift to right | No | 0.4s | Ease-Out (Cubic) | Target coordinate changes |
| **05** | `look_up` | Gaze shift upward | No | 0.35s | Ease-Out (Cubic) | Target coordinate changes |
| **06** | `look_down` | Gaze shift downward | No | 0.35s | Ease-Out (Cubic) | Target coordinate changes |
| **07** | `head_tilt` | Express curiosity | No | 0.5s | Ease-Out (Back) | User click / focus event |
| **08** | `tail_flick` | Express alert reaction | No | 400ms | Elastic / Back | User click / startle |
| **09** | `tail_curl` | Fold tail close | No | 1.2s | Ease-In-Out | Sleep transition / retreat |
| **10** | `traverse_walk` | Horizontal traversal | Yes | 0.6s | Linear (Engine curves) | Position update on same axis |
| **11** | `walk_look_around` | Curious traversal | Yes | 1.2s | Complex (Mixed) | Traversing active sections |
| **12** | `traverse_climb` | Vertical climbing | Yes | 0.7s | Linear | Vertical scroll snapper |
| **13** | `climb_stop` | Climb halt settling | No | 0.4s | Ease-Out (Cubic) | Scroll movement stops |
| **14** | `rest_on_card` | Lower to flat resting | No | 0.8s | Ease-In-Out (Cubic)| Extended inactivity (>15s) |
| **15** | `jump_down` | Drop to lower container | No | 0.6s | Custom Bezier | Vertical snap downward |
| **16** | `idle_sleep` | Low CPU sleeping loop | Yes | 5.0s | Sine / Cubic-Bezier | Inactivity timer timeout (60s)|
| **17** | `wake_up` | Fast wake transition | No | 0.5s | Ease-Out (Elastic) | User activity detected |
| **18** | `observe_cursor` | Dynamic cursor tracking | Yes | Dynamic | Lerp ($0.08$ weight) | Cursor inside 200px boundary |
| **19** | `inspect_project` | Focus on portfolio tag | No | 1.5s | Ease-In-Out (Cubic)| Snap focus to project items |
| **20** | `celebrate_backflip` | Secret interaction flip | No | 1.0s | Custom Bezier | Konami Code typed / double click |
| **21** | `disappear_behind_ui`| Exit viewport | No | 0.4s | Ease-In (Cubic) | Startled retreat / page change |
| **22** | `peek_around_edge` | Enter viewport | No | 0.6s | Ease-Out (Back) | Segment entry splay |

---

## 3. Detailed Animation Specifications

### 01. Idle Breathing
- **Animation Name**: `idle_breathing` (or `idle_neutral`)
- **Purpose**: Provides a quiet, organic sign of life when Anton is stationary, ensuring he does not look dead or frozen on the page, without grabbing user attention.
- **Trigger**: Entered automatically when Anton is stationary (not moving or sleeping) and has no active tracking targets.
- **Start Pose**: Standard standing alert pose (`Pose #1 — Standing Alert`). All 4 limbs planted on the container border, tail in a relaxed S-curve, eyes open, head aligned forward.
- **End Pose**: Seamlessly loops back to Start Pose.
- **Duration**: 3.2 seconds.
- **Loop**: Yes (seamless loop).
- **Ease Type**: `cubic-bezier(0.4, 0.0, 0.6, 1.0)` (Sine-like ease-in-out).
- **Notes**: 
  - Subtly expands/contracts the chest cavity (`Spine_02` scale shifts by $\pm2\%$ along the Y-axis).
  - The `Pelvis` and `Spine_01` bones undergo a minor vertical position translation of $\pm1.5\%$ of body height relative to the surface.
  - Tail segments `Tail_03` through `Tail_06` perform a micro-sway ($\pm3^\circ$ horizontal rotation) offset by a $90^\circ$ phase lag from the chest cycle.

---

### 02. Blink
- **Animation Name**: `face_blink`
- **Purpose**: Maintain anatomical realism; prevents the eyes from feeling like static glass beads.
- **Trigger**: Procedural timer firing at random intervals between 6 and 12 seconds during any non-sleeping states.
- **Start Pose**: Eyelid shape keys `Blink_L` = 0.0, `Blink_R` = 0.0 (fully open eyes).
- **End Pose**: Eyelid shape keys `Blink_L` = 0.0, `Blink_R` = 0.0 (fully open eyes).
- **Duration**: 180ms (0.18s).
- **Loop**: No (single-shot additive blend).
- **Ease Type**: `cubic-bezier(0.25, 1, 0.5, 1)` (instant closure, rapid, smooth reopening).
- **Notes**: 
  - Additive animation layered over all other animations.
  - Eyelid shape keys `Blink_L` and `Blink_R` animate linearly from $0.0 \to 1.0$ in 60ms, hold at $1.0$ for 40ms, then ease back to $0.0$ in 80ms.

---

### 03. Look Left
- **Animation Name**: `look_left`
- **Purpose**: Orients Anton's gaze and head to the left to inspect content borders or react to cursor movement.
- **Trigger**: Gaze target coordinate updates to the left of Anton's head center.
- **Start Pose**: Head aligned straight (Yaw: $0^\circ$, Pitch: $0^\circ$).
- **End Pose**: Head turned to the left (Yaw: $-45^\circ$, Pitch: $0^\circ$).
- **Duration**: 0.4 seconds.
- **Loop**: No (holds end pose or blends into active tracking).
- **Ease Type**: `cubic-bezier(0.215, 0.61, 0.355, 1.0)` (Ease-Out Cubic).
- **Notes**: 
  - Follows head-lead gaze: `Eye_L` and `Eye_R` bones rotate $-15^\circ$ (leftwards) at 50ms, followed by the `Head` bone rotating to $-45^\circ$ at 400ms.
  - Spine bones (`Spine_02` and `Neck`) twist slightly to the left ($\approx -10^\circ$) to ease the neck strain.
  - Tail segments `Tail_03` to `Tail_06` curve to the right ($+10^\circ$) to act as a visual counterbalance.

---

### 04. Look Right
- **Animation Name**: `look_right`
- **Purpose**: Orients Anton's gaze and head to the right.
- **Trigger**: Gaze target coordinate updates to the right of Anton's head center.
- **Start Pose**: Head aligned straight (Yaw: $0^\circ$, Pitch: $0^\circ$).
- **End Pose**: Head turned to the right (Yaw: $+45^\circ$, Pitch: $0^\circ$).
- **Duration**: 0.4 seconds.
- **Loop**: No (holds end pose).
- **Ease Type**: `cubic-bezier(0.215, 0.61, 0.355, 1.0)` (Ease-Out Cubic).
- **Notes**: 
  - Gaze-lead: `Eye_L` and `Eye_R` bones rotate $+15^\circ$ (rightwards) at 50ms, followed by `Head` bone rotation to $+45^\circ$.
  - Spine bones twist to the right ($+10^\circ$).
  - Tail segments curve to the left ($-10^\circ$) to counterbalance.

---

### 05. Look Up
- **Animation Name**: `look_up`
- **Purpose**: Directs Anton's gaze upward, used when snapping onto container edges and inspecting content above him.
- **Trigger**: Gaze target coordinate updates above Anton.
- **Start Pose**: Head aligned straight (Yaw: $0^\circ$, Pitch: $0^\circ$).
- **End Pose**: Head tilted upward (Pitch: $+25^\circ$, Yaw: $0^\circ$).
- **Duration**: 0.35 seconds.
- **Loop**: No.
- **Ease Type**: `cubic-bezier(0.215, 0.61, 0.355, 1.0)` (Ease-Out Cubic).
- **Notes**: 
  - `Head` and `Neck` bones pitch up by $+25^\circ$.
  - Eyelid squint keys `Squint_L`/`Squint_R` drop to $-0.1$ (widening the eyes slightly) and `Pupil_Dilate` increases to $+0.2$ to signal curious focus.
  - Tail segments compress slightly flat against the card border.

---

### 06. Look Down
- **Animation Name**: `look_down`
- **Purpose**: Directs Anton's gaze downward, typically when looking over the edge of a container card.
- **Trigger**: Gaze target coordinate updates below Anton's current card edge.
- **Start Pose**: Head aligned straight (Yaw: $0^\circ$, Pitch: $0^\circ$).
- **End Pose**: Head tilted downward (Pitch: $-25^\circ$, Yaw: $0^\circ$).
- **Duration**: 0.35 seconds.
- **Loop**: No.
- **Ease Type**: `cubic-bezier(0.215, 0.61, 0.355, 1.0)` (Ease-Out Cubic).
- **Notes**: 
  - `Head` and `Neck` bones pitch down by $-25^\circ$.
  - The front clavicles (`Clavicle_L`, `Clavicle_R`) rotate downward slightly to lower the head clearance.
  - Tail segments lift slightly upward ($\approx 5\text{px}$) from the surface plane to prevent visual clipping through the card boundary.

---

### 07. Head Tilt
- **Animation Name**: `head_tilt`
- **Purpose**: Conveys quiet curiosity or focused attention without human-like smiling or waving.
- **Trigger**: User click event on Anton, or when cursor enters the 200px boundary and becomes static.
- **Start Pose**: Head level, eyes neutral.
- **End Pose**: Head tilted along Roll/Yaw axes.
- **Duration**: 0.5 seconds.
- **Loop**: No.
- **Ease Type**: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (Ease-Out Back).
- **Notes**: 
  - Rotates `Head` and `Neck` bones along the Roll axis (Z-axis) by $+15^\circ$ (or $-15^\circ$ dynamically based on target vector) and Yaw axis by $10^\circ$.
  - Pupil shape key `Pupil_Dilate` increases from $0.0 \to 0.3$ to signal focused observation.
  - Settles with a tiny elastic bounce (overshoot) to look organic.

---

### 08. Tail Flick
- **Animation Name**: `tail_flick`
- **Purpose**: A quick physical response indicating alert status or tactile reaction to clicks.
- **Trigger**: Mouse click, double click, or high-velocity cursor approaches.
- **Start Pose**: Tail resting in flat S-curve on surface.
- **End Pose**: Tail returned to rest.
- **Duration**: 400ms (0.4s).
- **Loop**: No.
- **Ease Type**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (Elastic/Back).
- **Notes**: 
  - Focuses movement entirely on `Tail_04`, `Tail_05`, and `Tail_06` bones.
  - The tail tip rotates rapidly: Left ($+20^\circ$) $\to$ Right ($-20^\circ$) $\to$ Left ($+15^\circ$) $\to$ Rest.
  - Body and head bones remain stationary, conveying that the reaction is isolated.

---

### 09. Tail Curl
- **Animation Name**: `tail_curl`
- **Purpose**: Wraps the tail close to the torso, establishing a compact footprint for sleeping or defensive retreats.
- **Trigger**: Transitioning to `idle_sleep` state, or startled retreats.
- **Start Pose**: Tail extended in relaxed S-curve.
- **End Pose**: Tail curled in a compact loop around the hips.
- **Duration**: 1.2 seconds.
- **Loop**: No (holds end pose).
- **Ease Type**: `cubic-bezier(0.77, 0.0, 0.175, 1.0)` (Ease-In-Out).
- **Notes**: 
  - Sequential rotation propagates down the tail chain: `Tail_01` rotates $+20^\circ$, `Tail_02` $+35^\circ$, `Tail_03` $+40^\circ$, and `Tail_04` through `Tail_06` rotate $+45^\circ$, accumulating a $210^\circ$ curl.
  - Keeps the tail close to the body, preventing it from clipping outside container card bounds when curled.

---

### 10. Walk (Locomotion)
- **Animation Name**: `traverse_walk`
- **Purpose**: Standard horizontal locomotion along card borders.
- **Trigger**: Page scrolls or UI layout shifts forcing horizontal movement.
- **Start Pose**: Low crawl stance (`Pose #2 — Traversal Crawl`), claws aligned with border.
- **End Pose**: Returns to low crawl stance, looping into the next cycle.
- **Duration**: 0.6 seconds per step cycle.
- **Loop**: Yes (while movement is active).
- **Ease Type**: Linear (speed transitions are handled programmatically by the engine's dash-and-freeze curve).
- **Notes**: 
  - Implements the diagonal gait pattern:
    1. `Shoulder_L` / `Wrist_L` forward ($0\%\text{ of cycle}$)
    2. `Hip_R` / `Foot_R` forward ($25\%\text{ of cycle}$)
    3. `Shoulder_R` / `Wrist_R` forward ($50\%\text{ of cycle}$)
    4. `Hip_L` / `Foot_L` forward ($75\%\text{ of cycle}$)
  - Spine bones (`Spine_01`, `Spine_02`) bend laterally in a sine wave ($\pm 8^\circ$) in opposition to the limb movement.
  - Tail wags horizontally in a phase-delayed sine wave relative to the spine.

---

### 11. Walk + Look Around
- **Animation Name**: `walk_look_around`
- **Purpose**: Shows active interest in page layout elements during movement, making Anton feel intelligent.
- **Trigger**: Autonomous navigation between sections (e.g. searching for tags in active views).
- **Start Pose**: Locomotion crawl pose.
- **End Pose**: Standard crawl pose.
- **Duration**: 1.2 seconds.
- **Loop**: Yes (while exploring).
- **Ease Type**: Mixed (Linear step cycle with Ease-Out gaze offsets).
- **Notes**: 
  - Combines the base `traverse_walk` step cycle with dynamic head rotations (`Head` Yaw shifts randomly between $-20^\circ$ and $+20^\circ$ every $300\text{ms}$).
  - Pupil shape key `Pupil_Dilate` oscillates between $0.1$ and $0.4$, conveying visual scanning.

---

### 12. Vertical Climb
- **Animation Name**: `traverse_climb`
- **Purpose**: Vertical navigation along layout gutters or vertical container card borders.
- **Trigger**: Page scroll shifting Anton vertically to follow the viewport.
- **Start Pose**: Clinging vertically, head pointing up (`Pose #3 — Vertical Climb`).
- **End Pose**: Clinging vertically, looping into the next step.
- **Duration**: 0.7 seconds.
- **Loop**: Yes.
- **Ease Type**: Linear.
- **Notes**: 
  - Snaps claw IK targets to the vertical border.
  - Adjusts body lean: Pelvis and spine bones are held slightly closer to the wall surface ($10\%$ closer than walk) to reflect effort against gravity.
  - Tail hangs vertically downward, swaying by $\pm5^\circ$ under physics inertia.

---

### 13. Climb Stop
- **Animation Name**: `climb_stop`
- **Purpose**: Settles Anton into a stationary vertical hold with realistic physical momentum.
- **Trigger**: Scroll movement halts.
- **Start Pose**: Mid-stride vertical climb cycle.
- **End Pose**: Locked vertical cling pose.
- **Duration**: 0.4 seconds.
- **Loop**: No.
- **Ease Type**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (Ease-Out Quad/Cubic).
- **Notes**: 
  - Decelerates climbing joints to a stop.
  - Overshoot: Anton's root position slides downward by 4px, followed by an immediate recovery upward climb of 4px to plant claws.

---

### 14. Rest On Card
- **Animation Name**: `rest_on_card`
- **Purpose**: Relaxes Anton into a lower-energy, flat posture when he remains stationary.
- **Trigger**: Anton is stationary on a horizontal border for over 15 seconds.
- **Start Pose**: Standard standing alert pose (`Pose #1`).
- **End Pose**: Flat resting posture (`Pose #4 — Resting/Sleeping`).
- **Duration**: 0.8 seconds.
- **Loop**: No (holds end pose).
- **Ease Type**: `cubic-bezier(0.77, 0, 0.175, 1)` (Ease-In-Out).
- **Notes**: 
  - Translates `Pelvis` and `Spine` bones downward, lowering torso height to touch the card surface.
  - Limbs tuck inward closer to the flanks.
  - Tail relaxes and lies flat on the surface. `Pupil_Contract` blends to $+0.2$ to indicate relaxation.

---

### 15. Jump Down
- **Animation Name**: `jump_down`
- **Purpose**: Traversal mechanism to drop down from an upper card to a lower card.
- **Trigger**: Layout scroll snaps Anton to a container directly below his current location.
- **Start Pose**: Edge-cling posture, looking down.
- **End Pose**: Standing alert landing pose on lower card edge.
- **Duration**: 0.6 seconds.
- **Loop**: No.
- **Ease Type**: `cubic-bezier(0.3, 0, 0.8, 0.15)` (Takeoff/Fall) + `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (Landing).
- **Notes**: 
  - **Phase 1 (Push Off, 0-150ms)**: Pelvis rises, limbs extend, pushing off the card.
  - **Phase 2 (Airborne, 150-450ms)**: Limbs splay out, tail curves upward ($+30^\circ$ Pitch) to balance rotation.
  - **Phase 3 (Landing, 450-600ms)**: Limbs compress fully to absorb shock, tail sweeps downward, then body rises back to neutral height.

---

### 16. Sleep
- **Animation Name**: `idle_sleep`
- **Purpose**: Visual representation of the sleep state. Limits CPU usage by slowing mesh updates.
- **Trigger**: 60 seconds of complete site inactivity.
- **Start Pose**: Flat resting posture (`Pose #4`).
- **End Pose**: Curled sleeping pose (eyes closed, tail curled, slow chest expansion).
- **Duration**: 2.0 seconds (transition), then infinite loop.
- **Loop**: Yes (for the breathing loop).
- **Ease Type**: `cubic-bezier(0.445, 0.05, 0.55, 0.95)` (Ease-In-Out Sine).
- **Notes**: 
  - Blends eyelid shape keys `Blink_L`/`Blink_R` to $1.0$ (fully closed) over 1.5 seconds.
  - Blends tail to curled position (`tail_curl`).
  - Chest breathing cycle slows down to a 5.0-second loop with scale variation reduced to $\pm1\%$.

---

### 17. Wake Up
- **Animation Name**: `wake_up`
- **Purpose**: Rapidly alerts Anton and restores him to active status when the user resumes interaction.
- **Trigger**: Mouse hover within 200px tracking zone or page scroll.
- **Start Pose**: Curled sleeping pose (`idle_sleep`).
- **End Pose**: Standing alert pose (`Pose #1`).
- **Duration**: 0.5 seconds.
- **Loop**: No.
- **Ease Type**: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (Ease-Out Back).
- **Notes**: 
  - Eyelid shape keys `Blink_L`/`Blink_R` snap to $0.0$ in 100ms.
  - Shape key `Pupil_Dilate` spikes instantly to $0.6$ (alert response), then settles to neutral ($0.0$) at 500ms.
  - Tail uncurls rapidly, and limbs push the torso back to standard alert height.

---

### 18. Observe Cursor
- **Animation Name**: `observe_cursor`
- **Purpose**: Tracks the user's cursor dynamically to maintain interaction engagement.
- **Trigger**: Cursor enters the 200px tracking radius.
- **Start Pose**: Current active pose.
- **End Pose**: Head and eyes tracking cursor coordinates dynamically in real-time.
- **Duration**: Continuous / Dynamic.
- **Loop**: Yes (procedurally generated loop).
- **Ease Type**: Linear interpolation (`lerp`) with a weight factor of $0.08$ for lag-free, organic smoothing.
- **Notes**: 
  - Head bone rotation is constrained to $\pm45^\circ$ Yaw (Y-axis) and $\pm25^\circ$ Pitch (X-axis).
  - Eye bones track target coordinates. Pupil shape key `Pupil_Dilate` increases to $+0.3$.
  - When rotation boundaries are reached, the spine tilts slightly ($\approx 10^\circ$) to help look.

---

### 19. Inspect Project
- **Animation Name**: `inspect_project`
- **Purpose**: Conveys focus and intellectual interest in specific portfolio elements (projects, cards, tags).
- **Trigger**: Anton snaps onto a newly focused/clicked project tag.
- **Start Pose**: Standing alert pose.
- **End Pose**: Focused inspection pose.
- **Duration**: 1.5 seconds.
- **Loop**: No (holds posture).
- **Ease Type**: `cubic-bezier(0.645, 0.045, 0.355, 1.0)` (Ease-In-Out Cubic).
- **Notes**: 
  - Body lowers slightly closer to the tag border.
  - Head points directly at the target element coordinates.
  - Eye squint keys `Squint_L`/`Squint_R` increase to $0.4$ (narrowed eyes), and `Pupil_Contract` increases to $0.6$ (slitted pupils) to simulate high concentration.
  - Tail tip performs slow, rhythmic, low-amplitude wags.

---

### 20. Celebrate
- **Animation Name**: `celebrate_backflip`
- **Purpose**: High-fidelity easter egg celebrating user interaction milestones.
- **Trigger**: Konami Code typed (`↑ ↑ ↓ ↓ ← → ← → B A`), or double click on Anton.
- **Start Pose**: Standing alert pose.
- **End Pose**: Standing alert pose (landing recovery).
- **Duration**: 1.0 second.
- **Loop**: No.
- **Ease Type**: Custom Bezier: `cubic-bezier(0.6, -0.28, 0.735, 0.045)` (Launch) + `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (Landing).
- **Notes**: 
  - **Compression (0-150ms)**: Crouches very low, flexing all joints.
  - **Launch (150-250ms)**: Translates Root bone vertically on Z/Y axes, jumps into the air.
  - **Flip (250-750ms)**: Rotates $360^\circ$ around Pitch axis (backflip). Limbs splay, tail curves.
  - **Landing (750-1000ms)**: Lands on container edge, limbs compress deeply to absorb momentum, then rise to standing height.

---

### 21. Disappear Behind UI
- **Animation Name**: `disappear_behind_ui`
- **Purpose**: Hides Anton behind container boundaries during startled retreats or page changes.
- **Trigger**: Erratic cursor movements within 200px boundary (Startled Retreat) or section change.
- **Start Pose**: Clinging to container edge.
- **End Pose**: Fully hidden behind card border (mesh visibility culled).
- **Duration**: 0.4 seconds.
- **Loop**: No.
- **Ease Type**: `cubic-bezier(0.55, 0.055, 0.675, 0.19)` (Ease-In Back).
- **Notes**: 
  - Scurries backward or slips sideways into the gutter space between cards.
  - Translates body coordinates behind the card overlay layer, using CSS Z-index/overflow clipping to conceal the mesh.

---

### 22. Peek Around Edge
- **Animation Name**: `peek_around_edge`
- **Purpose**: Organic entrance mechanism when Anton reappears in a new portfolio section.
- **Trigger**: Scroll snap finished, or navigation target reached.
- **Start Pose**: Hidden behind container edge.
- **End Pose**: Head and front paws visible, peeking over card edge.
- **Duration**: 0.6 seconds.
- **Loop**: No.
- **Ease Type**: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (Ease-Out Back).
- **Notes**: 
  - Slowly slides the head and front paw IK targets over the container border.
  - Eyes are wide open (`Pupil_Dilate` = 0.4) and perform a quick horizontal glance scan.
  - The torso remains behind the boundary, ready to transition into a full crawl onto the surface.
