# Anton Interaction Map (v1.0)

This document is the authoritative interaction specification and single source of truth for **Anton the Gecko**'s behavioral state machine on the portfolio website. It defines how Anton navigates, observes, and reacts within different page sections and under global environment events. 

All interaction state machines, scroll listeners, and event handlers must adhere strictly to the rules, priorities, and timings specified herein. **Anton is fully design-locked. Do not redesign him.**

---

## 1. Interaction Priorities & State Logic
Anton's interaction engine runs on a deterministic priority-based queue. High-priority triggers immediately interrupt lower-priority behaviors. When an interruptible animation is interrupted, it must smoothly blend (using a crossfade duration of $200\text{ms}$) into the new animation state.

### Priority Level Hierarchy:
- **Level 1 — Critical**: System overrides (e.g. Tab hidden, Konami Code). Always interrupts. Non-interruptible by lower levels.
- **Level 2 — High**: Immediate reactive triggers (e.g. fast scrolling, theme changes, viewport resizing, startled retreats).
- **Level 3 — Mid**: User clicks and deliberate navigation events.
- **Level 4 — Mid**: Spatial layout snaps (e.g. scroll snaps, gutter traversal).
- **Level 5 — Low**: Continuous hover tracking and curious inspection.
- **Level 6 — Default**: Default idle loops and sleep states.

---

## 2. Section-Specific Behaviors

### Hero
#### H-01: Page Load Entrance
- **Trigger**: Page finishes loading.
- **Condition**: Viewport is initialized on the Hero section (`#home`).
- **Behavior**: Anton starts fully hidden behind the top-right border of the main intro card. He peeks his head out, scans the viewport, crawls out, and snaps to his home position on the border.
- **Animation**: `peek_around_edge` ($0.6\text{s}$) $\to$ `traverse_walk` ($0.3\text{s}$) $\to$ `idle_breathing` ($3.2\text{s}$ loop).
- **Priority**: Level 4 (Mid).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: $0.9\text{s}$ (transition sequence).
- **Notes**: Position coordinates must align paws to the card boundary. He does not float in space.

#### H-02: Idle Observation
- **Trigger**: Viewport remains on Hero section with no user inputs.
- **Condition**: Mouse cursor is outside the $200\text{px}$ boundary around Anton.
- **Behavior**: Rhythmical breathing cycle, occasional blinks, and periodic head-turns looking downward from the card edge.
- **Animation**: `idle_breathing` ($3.2\text{s}$ loop), `face_blink` (every $6-12\text{s}$), `look_down` ($0.35\text{s}$).
- **Priority**: Level 6 (Default).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: Continuous.
- **Notes**: Keeps Anton alive without drawing active attention.

#### H-03: Gaze cursor tracking
- **Trigger**: Mouse cursor enters the $200\text{px}$ boundary.
- **Condition**: Gaze target coordinate is active.
- **Behavior**: Head and eyes rotate to track the mouse position. If the mouse stays stationary for $>3\text{s}$, Anton takes $2-3$ cautious steps closer on the card border.
- **Animation**: `observe_cursor` (continuous) $\to$ `traverse_walk` ($0.6\text{s}$ step).
- **Priority**: Level 5 (Low).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: Continuous.
- **Notes**: Gaze tracking uses a lerp weight of $0.08$ for smooth, lag-free motion.

#### H-04: Click Interaction
- **Trigger**: Cursor clicks Anton.
- **Condition**: Click event is fired.
- **Behavior**: Performs a curious head tilt and a rapid double-wag of his tail tip, then returns to alert stance.
- **Animation**: `head_tilt` ($0.5\text{s}$) $+$ `tail_flick` ($0.4\text{s}$).
- **Priority**: Level 3 (Mid).
- **Interruptible**: Yes.
- **Cooldown**: $1.0\text{s}$.
- **Duration**: $0.9\text{s}$.
- **Notes**: No speech bubbles, dialog popups, or sound effects are allowed.

#### H-05: Scroll Exit
- **Trigger**: User scrolls downward, moving the Hero section out of view.
- **Condition**: Hero section bounding box crosses viewport threshold.
- **Behavior**: Anton scurries backward and slips behind the intro card border, disappearing from the layout before the section fully exits the screen.
- **Animation**: `disappear_behind_ui` ($0.4\text{s}$).
- **Priority**: Level 2 (High).
- **Interruptible**: No.
- **Cooldown**: None.
- **Duration**: $0.4\text{s}$.
- **Notes**: WebGL rendering is paused for Anton once he is fully hidden.

---

### Navigation
#### N-01: Active Section Change
- **Trigger**: Navigation menu link is clicked.
- **Condition**: Viewport targets a different page section.
- **Behavior**: Anton immediately scurries behind the card border in his current section, teleporting his position coordinates off-screen through the layout gutters, and peeks out from the border of the target section card.
- **Animation**: `disappear_behind_ui` ($0.4\text{s}$) $\to$ Teleport $\to$ `peek_around_edge` ($0.6\text{s}$).
- **Priority**: Level 2 (High).
- **Interruptible**: No.
- **Cooldown**: None.
- **Duration**: $1.0\text{s}$ total.
- **Notes**: Ensures Anton never floats across page layouts during high-speed programmatic transitions.

---

### Projects
#### P-01: Project Card Snapping
- **Trigger**: Projects section (`#work`) is entered.
- **Condition**: Page scroll halts.
- **Behavior**: Anton appears on the top-right border of the active/featured project container card, clinging flat to its border.
- **Animation**: `peek_around_edge` ($0.6\text{s}$) $\to$ `rest_on_card` ($0.8\text{s}$).
- **Priority**: Level 4 (Mid).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: $1.4\text{s}$ total.
- **Notes**: Claws snap exactly onto the border lines.

#### P-02: Project Tag Inspection
- **Trigger**: Cursor hovers over a project tag, metric, or detail link.
- **Condition**: Cursor is on the same card or within $300\text{px}$ of Anton.
- **Behavior**: Anton scurries along the card border to align himself adjacent to the hovered element. He lowers his torso, narrows his eyelids to squint, contracts his pupils, and points his head directly at the text.
- **Animation**: `traverse_walk` (dynamic) $\to$ `inspect_project` ($1.5\text{s}$ hold).
- **Priority**: Level 5 (Low).
- **Interruptible**: Yes.
- **Cooldown**: $0.5\text{s}$.
- **Duration**: Dynamic.
- **Notes**: Mimics a creature closely reading/inspecting text.

#### P-03: Moving Between Cards
- **Trigger**: User interacts with a different project card or card carousel shifts.
- **Condition**: Target project card is in view.
- **Behavior**: Anton scurries along the grid gutters (gutters separating cards) to snap onto the new card. If cards are separated by white space, he performs a quick disappear-and-reappear teleport sequence.
- **Animation**: `traverse_walk` / `traverse_climb` (continuous) OR `disappear_behind_ui` ($0.4\text{s}$) $\to$ `peek_around_edge` ($0.6\text{s}$).
- **Priority**: Level 4 (Mid).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: Dynamic.
- **Notes**: Uses diagonal locomotion gait (LH $\to$ RF $\to$ RH $\to$ LF) during crawl.

---

### Experience Timeline
#### E-01: Timeline Vertical Snap
- **Trigger**: Experience section (`#experience`) is entered.
- **Condition**: Viewport focuses on timeline.
- **Behavior**: Anton snaps to the vertical timeline axis line or the vertical border of the active experience card, clinging in vertical orientation.
- **Animation**: `peek_around_edge` ($0.6\text{s}$) $\to$ vertical cling pose.
- **Priority**: Level 4 (Mid).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: $0.6\text{s}$.
- **Notes**: Head points upward, tail hangs straight down.

#### E-02: Timeline Climbing
- **Trigger**: Scroll event moves the timeline.
- **Condition**: Scrolling velocity is low to moderate.
- **Behavior**: Anton climbs vertically up or down the timeline grid line, keeping pace with the active/focused milestone card.
- **Animation**: `traverse_climb` (continuous loop).
- **Priority**: Level 4 (Mid).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: Dynamic (tied to scroll velocity).
- **Notes**: Spine sways laterally during climbing. Tail sways slightly to counterbalance.

#### E-03: Climb Stop & Settle
- **Trigger**: Scroll movement stops.
- **Condition**: Anton completes climbing.
- **Behavior**: Anton stops climbing, slides down 4px under simulated gravity, immediately climbs back 4px to plant claws firmly, and locks into the resting cling position.
- **Animation**: `climb_stop` ($0.4\text{s}$).
- **Priority**: Level 4 (Mid).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: $0.4\text{s}$.
- **Notes**: Adds weight and friction to his motion.

#### E-04: Milestone Reading
- **Trigger**: Timeline snaps to a new milestone card.
- **Condition**: A milestone becomes active.
- **Behavior**: Anton pivots his head toward the milestone text headers (job title/company), squints to focus, and wags his tail tip slowly.
- **Animation**: `inspect_project` ($1.5\text{s}$).
- **Priority**: Level 5 (Low).
- **Interruptible**: Yes.
- **Cooldown**: $1.0\text{s}$.
- **Duration**: $1.5\text{s}$.
- **Notes**: Keeps his body locked to the timeline line while head and neck twist to read.

---

### Skills
#### S-01: Skill Chip Hover
- **Trigger**: Cursor hovers over a skill chip (e.g. React, WebGL).
- **Condition**: Skill chip is within active skills card block.
- **Behavior**: Anton crawls along the container border until he is parallel to the hovered chip. He tilts his head, dilates his pupils, and performs a rapid tail-flick, expressing interest in the selected skill.
- **Animation**: `traverse_walk` (dynamic) $\to$ `head_tilt` ($0.5\text{s}$) $+$ `tail_flick` ($0.4\text{s}$).
- **Priority**: Level 5 (Low).
- **Interruptible**: Yes.
- **Cooldown**: $0.8\text{s}$.
- **Duration**: Dynamic.
- **Notes**: Restricts his walk path to the card borders; he will not step onto empty page space.

---

### About
#### A-01: Profile Frame Interaction
- **Trigger**: Cursor enters the About section (`#about`).
- **Condition**: Viewport is centered on About.
- **Behavior**: Anton snaps to the top-right frame corner of Arsalan's profile photo. He lies flat on the frame border and tracks the cursor position using dynamic gaze tracking.
- **Animation**: `peek_around_edge` ($0.6\text{s}$) $\to$ `observe_cursor` (continuous).
- **Priority**: Level 5 (Low).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: Continuous.
- **Notes**: Head rotation limits apply ($\pm45^\circ$ Yaw, $\pm25^\circ$ Pitch). If cursor goes beyond $200\text{px}$, Anton defaults to looking directly at the profile photo.

---

### Footer
#### F-01: Sleep Transition
- **Trigger**: Viewport is scrolled to the Footer section (`#footer`).
- **Condition**: Scroll stops.
- **Behavior**: Anton crawls to the bottom-right corner of the footer card, curls his tail tightly around his body, closes his eyes, and falls asleep.
- **Animation**: `rest_on_card` ($0.8\text{s}$) $\to$ `tail_curl` ($1.2\text{s}$) $\to$ `idle_sleep` (loop).
- **Priority**: Level 6 (Default).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: Continuous (until wake trigger).
- **Notes**: Slows breathing cycle to a 5.0-second loop to save CPU resources.

#### F-02: Wake Up
- **Trigger**: Mouse hover within $200\text{px}$ of footer corner, or scroll upward.
- **Condition**: Anton is in `idle_sleep` state.
- **Behavior**: Eyelids snap open, pupils dilate in alert response, tail uncurls, and he stands up on all limbs.
- **Animation**: `wake_up` ($0.5\text{s}$) $\to$ standard standing alert posture.
- **Priority**: Level 2 (High).
- **Interruptible**: Yes.
- **Cooldown**: $1.0\text{s}$.
- **Duration**: $0.5\text{s}$.
- **Notes**: Returns to standard alert tracking state.

---

## 3. Global Behaviors & System Triggers

### G-01: Mouse Movement (Cursor Gaze)
- **Trigger**: Mouse moves.
- **Condition**: Cursor is within a $200\text{px}$ radius of Anton's head center.
- **Behavior**: Anton's head and eyes track the cursor's coordinates.
- **Animation**: `observe_cursor` (continuous).
- **Priority**: Level 5 (Low).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: Continuous.
- **Notes**: Gaze tracking stops if cursor leaves the $200\text{px}$ boundary.

### G-02: Normal Scrolling
- **Trigger**: Page scrolls.
- **Condition**: Scroll velocity is low/moderate ($<500\text{px/s}$).
- **Behavior**: Anton clings tightly to his container border, adjusting his legs to accommodate scroll inertia, or scurries along the gutters to snap to the nearest visible container.
- **Animation**: `traverse_walk` / `traverse_climb` (dynamic).
- **Priority**: Level 4 (Mid).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: Dynamic.
- **Notes**: Walk speed matches scroll momentum.

### G-03: Long Inactivity
- **Trigger**: $60\text{ seconds}$ of zero page interaction (no clicks, scrolls, or mouse movement).
- **Condition**: Anywhere on the portfolio.
- **Behavior**: Anton crawls to the nearest corner of his current container card, tucks his limbs, curls his tail, closes his eyes, and falls asleep.
- **Animation**: `rest_on_card` ($0.8\text{s}$) $\to$ `tail_curl` ($1.2\text{s}$) $\to$ `idle_sleep` (loop).
- **Priority**: Level 6 (Default).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: Continuous.
- **Notes**: Enters power-saving mode (throttles WebGL requestAnimationFrame loop).

### G-04: Fast Scrolling
- **Trigger**: Page scrolls rapidly.
- **Condition**: Scroll velocity exceeds $500\text{px/s}$.
- **Behavior**: Anton flattens his torso completely against the card border, squints his eyes, and trails his tail straight behind him to resist friction. Once scroll stops, he recovers.
- **Animation**: Stance compression (horizontal/vertical) $\to$ `climb_stop` / recovery.
- **Priority**: Level 2 (High).
- **Interruptible**: No.
- **Cooldown**: None.
- **Duration**: Dynamic.
- **Notes**: Adds weight and wind friction to Anton.

### G-05: Window Resize
- **Trigger**: Browser window resize event.
- **Condition**: Layout layout breakpoints adjust.
- **Behavior**: Anton immediately scurries behind the card border to hide. Once resize events halt for $500\text{ms}$ and card coordinates recalculate, he peeks out from the new snapped position.
- **Animation**: `disappear_behind_ui` ($0.4\text{s}$) $\to$ position shift $\to$ `peek_around_edge` ($0.6\text{s}$).
- **Priority**: Level 2 (High).
- **Interruptible**: No.
- **Cooldown**: $0.5\text{s}$.
- **Duration**: $1.0\text{s}$ total.
- **Notes**: Prevents visual errors where Anton floats in empty space during dynamic CSS layout shifts.

### G-06: Theme Switching
- **Trigger**: Light/Dark theme toggle clicked.
- **Condition**: Theme class is toggled on document.
- **Behavior**: Anton blinks rapidly twice and adjusts his pupil contraction keys to adapt to the new background contrast.
- **Animation**: `face_blink` ($0.18\text{s}$) $+$ pupil dilation adjustments.
- **Priority**: Level 2 (High).
- **Interruptible**: Yes.
- **Cooldown**: $1.0\text{s}$.
- **Duration**: $0.5\text{s}$.
- **Notes**: No spatial repositioning takes place.

### G-07: Page Resize
- **Trigger**: DOM height changes (dynamic accordion expansions/content insertions).
- **Condition**: Anton's current snapped card boundaries shift.
- **Behavior**: Anton performs a quick crawl step to snap back into alignment with the recalculated card edge.
- **Animation**: `traverse_walk` / immediate snap.
- **Priority**: Level 4 (Mid).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: $0.2\text{s}$.
- **Notes**: Listened to via ResizeObserver.

### G-08: Tab Hidden
- **Trigger**: `visibilitychange` event (document.hidden = true).
- **Condition**: Page tab is placed in background.
- **Behavior**: Freezes all rendering loops, pauses the animation clock, and drops WebGL thread activity to $0\%$.
- **Animation**: Immediate frame freeze.
- **Priority**: Level 1 (Critical).
- **Interruptible**: No.
- **Cooldown**: None.
- **Duration**: Continuous.
- **Notes**: Crucial for battery saving and performance audit passing.

### G-09: Tab Visible
- **Trigger**: `visibilitychange` event (document.hidden = false).
- **Condition**: Page tab returns to active focus.
- **Behavior**: Resumes the animation clock, executes a quick wake up animation, and returns to standard idle breathing.
- **Animation**: `wake_up` ($0.5\text{s}$) $\to$ `idle_breathing`.
- **Priority**: Level 2 (High).
- **Interruptible**: Yes.
- **Cooldown**: None.
- **Duration**: $0.5\text{s}$.
- **Notes**: Restores cursor tracking.

---

## 4. Complete Interaction Matrix

| ID | State Scope | Trigger | Condition | Behavior Output | Animation Clip | Priority | Interruptible | Cooldown | Duration |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **H-01**| Hero | Page Load | Hero in Viewport | Appears on card corner | `peek_around_edge` | Level 4 | Yes | None | 0.9s |
| **H-02**| Hero | Inactive | Cursor >200px away | Breathe, blink, look | `idle_breathing` | Level 6 | Yes | None | Cont. |
| **H-03**| Hero | Cursor moves | Cursor <200px away | Track cursor coordinates| `observe_cursor` | Level 5 | Yes | None | Cont. |
| **H-04**| Hero | Mouse Click | Click fired | Head tilt & tail flick | `head_tilt` + `flick`| Level 3 | Yes | 1.0s | 0.9s |
| **H-05**| Hero | Scroll down | Hero leaves view | Hide behind card border | `disappear_behind_ui`| Level 2 | No | None | 0.4s |
| **N-01**| Nav | Nav Link click | Target changes | Teleport to new section | `disappear` $\to$ `peek`| Level 2 | No | None | 1.0s |
| **P-01**| Projects | Section Enter | Scroll snaps | Rest on project card border | `peek` $\to$ `rest_card`| Level 4 | Yes | None | 1.4s |
| **P-02**| Projects | Metric Hover | Cursor <300px away | Crawl close & inspect | `walk` $\to$ `inspect` | Level 5 | Yes | 0.5s | Dynamic|
| **P-03**| Projects | Card change | New active card | Scurry along gutters | `walk` / `climb` | Level 4 | Yes | None | Dynamic|
| **E-01**| Timeline | Section Enter | Viewport focus | Cling vertically to timeline | `peek` $\to$ vertical pose| Level 4 | Yes | None | 0.6s |
| **E-02**| Timeline | Scroll active | Low/mid velocity | Climb timeline line | `traverse_climb` | Level 4 | Yes | None | Dynamic|
| **E-03**| Timeline | Scroll stops | Climbing halts | Settle with slide/recovery | `climb_stop` | Level 4 | Yes | None | 0.4s |
| **E-04**| Timeline | Card focus | Milestone active | Focus head on text & wag | `inspect_project` | Level 5 | Yes | 1.0s | 1.5s |
| **S-01**| Skills | Chip hover | Skills active | Crawl to chip & tilt/flick | `walk` $\to$ `tilt` + `flick`| Level 5 | Yes | 0.8s | Dynamic|
| **A-01**| About | Section Enter | Viewport focus | Snap to photo frame & track| `peek` $\to$ `observe` | Level 5 | Yes | None | Cont. |
| **F-01**| Footer | Scroll bottom | Footer active | Corner sleep curl | `rest` $\to$ `curl` $\to$ `sleep`| Level 6 | Yes | None | Cont. |
| **F-02**| Footer | Scroll up/Hover | Sleeping state | Wake up, uncurl tail | `wake_up` | Level 2 | Yes | 1.0s | 0.5s |
| **G-01**| Global | Mouse moves | Cursor <200px away | Track cursor coordinates| `observe_cursor` | Level 5 | Yes | None | Cont. |
| **G-02**| Global | Page scrolls | Velocity <500px/s | Scurry along gutters | `walk` / `climb` | Level 4 | Yes | None | Dynamic|
| **G-03**| Global | Inactive | 60s timeout | Crawl to corner & sleep | `rest` $\to$ `curl` $\to$ `sleep`| Level 6 | Yes | None | Cont. |
| **G-04**| Global | Fast scroll | Velocity >500px/s | Flatten body to resist wind| Stance compression | Level 2 | No | None | Dynamic|
| **G-05**| Global | Window resize | Breakpoint shifts | Hide, recalculate, peek | `disappear` $\to$ `peek`| Level 2 | No | 0.5s | 1.0s |
| **G-06**| Global | Theme toggle | Theme shifts | Blink, adjust pupil width | `face_blink` + pupil adjust| Level 2 | Yes | 1.0s | 0.5s |
| **G-07**| Global | Page resize | Bounds change | Adjust snap coordinates | `traverse_walk` / snap | Level 4 | Yes | None | 0.2s |
| **G-08**| Global | Tab hidden | document.hidden | Freeze rendering clock | Freeze frame | Level 1 | No | None | Cont. |
| **G-09**| Global | Tab visible | document.visible | Resume rendering & wake up | `wake_up` | Level 2 | Yes | None | 0.5s |
| **G-10**| Global | Konami Code | Code typed | Celebratory backflip | `celebrate_backflip` | Level 1 | No | 2.0s | 1.0s |
