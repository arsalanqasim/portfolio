# Version History

This file maps the progressive release timeline of Anton, from initial design concepts to full production integration.

---

## v0.1.0 — Identity Phase
- **Date**: 2026-06-30
- **Summary**: Initial Character Studio release. Sets up architecture, config schemas, and design guidelines.
- **Decisions**: Established Core Philosophy, no-talk rules, lock states, and DNA model isolation.
- **Files Changed**:
  - `anton/index.html`
  - `anton/style.css`
  - `anton/design-tokens.css`
  - `anton/data/Anton_DNA.json`
  - `anton/data/project.json`
  - `anton/state/workspace.json`
  - `anton/js/main.js`
  - `anton/js/storage.js`
  - `anton/js/events.js`
  - `anton/js/constants.js`

---

## v0.2.0 — Concept Production Pipeline
- **Date**: 2026-06-30
- **Summary**: Concept Asset Pipeline release. Integrates automatic folder image scanning, canonical indexing, prompts documentation, separate reviews logs, and custom category filtering.
- **Decisions**: Cancelled the placeholder review UI cards in favor of a real-world server folder scanner endpoint `/api/concepts`.
- **Files Changed**:
  - `server.ts`
  - `anton/js/storage.js`
  - `anton/js/components/log.js`
  - `anton/data/project.json`
  - `anton/data/reviews.json`
  - `anton/prompts/master_prompt.md`
  - `anton/prompts/negative_prompt.md`
  - `anton/prompts/evaluation_sheet.md`

---

## v0.3.0 — Expression System
- **Date**: *Scheduled*
- **Summary**: Transition logic for the 6 core emotions (Neutral, Curious, Focused, Happy, Sleepy, Alert).
- **Decisions**: *Pending*
- **Files Changed**: *Pending*

---

## v1.0.0 — Production Lock
- **Date**: *Scheduled*
- **Summary**: Complete asset integration, browser performance certification, and final portfolio deployment.
- **Decisions**: *Pending*
- **Files Changed**: *Pending*
