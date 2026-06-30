# Anton Character Design Studio

Welcome to the **Anton Character Design Studio**. This workspace serves as the dedicated development environment for creating, defining, and refining **Anton**, the quiet gecko companion character for Arsalan's portfolio.

This workspace follows a Pixar-style internal craftsmanship philosophy. It treats character design as a deliberate software engineering process, separating core character definitions, workspace state, and visual assets into a structured, modular architecture.

---

## Workspace Directory Structure

```
anton/
├── assets/
│   ├── concepts/              # Concept art mockups and specs
│   │   ├── approved/          # Approved designs
│   │   ├── rejected/          # Discarded concepts with reasons
│   │   └── work_in_progress/  # Active drafts
│   └── icons/                 # Shared UI symbols & icon assets
├── data/                      # Permanent versioned character configurations
│   ├── Anton_DNA.json         # Authoritative traits and rules registry
│   └── project.json           # Studio metadata, active milestone, version
├── state/                     # Temporary runtime user workspace state
│   ├── workspace.json         # View parameters, panel visibility toggles
│   ├── recent.json            # Recently accessed fields and assets logs
│   └── session.json           # Session activity duration and stats
├── schema/                    # JSON Schemas to validate configuration structures
│   ├── Anton_DNA.schema.json
│   └── project.schema.json
├── types/                     # JSDoc models mapping configurations to typescript
│   ├── index.js
│   ├── dna.js
│   ├── project.js
│   └── studio.js
├── docs/                      # Reference manuals and research material
├── prompts/                   # Static text prompt history used during design phases
├── design-tokens.css          # Core visual theme design tokens (CSS variables)
├── style.css                  # Core CSS shell, typography, and page grids
├── index.html                 # Workspace HTML root anchor
├── README.md                  # This onboarding documentation
├── CHANGELOG.md               # Version log following semantic versioning
└── js/                        # Modular frontend engine
    ├── main.js                # App boots & coordinates event routing
    ├── storage.js             # Data broker: manages local state & disk files
    ├── events.js              # Event Bus (pub/sub) decoupling modules
    ├── constants.js           # Shared strings, milestones, and status identifiers
    ├── components/            # Isolated UI Components
    │   ├── board.js           # Inspiration Board component
    │   ├── dna.js             # DNA viewer & editor
    │   ├── log.js             # Version History & Decision Log parsing
    │   ├── progress.js        # Milestone progress sidebar
    │   └── prompts.js         # Prompt Library interface
    └── utils/                 # Low-level utility functions
        ├── date.js            # Date formatting formatting helpers
        ├── dom.js             # Element creator utilities (React-style)
        ├── clipboard.js       # Clipboard copy actions wrapper
        └── helpers.js         # Debouncers and object manipulators
```

---

## Architectural Principles

1. **Strict Data-Driven Design**
   No hardcoded strings, sizes, colors, or parameters should reside inside the UI components. All features must pull details directly from `data/project.json`, `data/Anton_DNA.json`, `js/constants.js`, or the temporary workspace `state/`.
   
2. **Decoupled Messaging (Event-Driven)**
   UI components do not call each other directly. Interaction changes, lock changes, or file updates are broadcasted through the central Pub/Sub Event Bus (`js/events.js`). Future modules will subscribe to these events (e.g. `DNA_UPDATED`, `MILESTONE_CHANGED`).

3. **Storage Abstraction**
   All file read/write, JSON schema verification, and state synchronization operations must go through `js/storage.js`. Never write direct `localStorage.setItem` or raw fetch instructions inside a UI component.

4. **Future React and TypeScript Readiness**
   - Keep UI elements isolated as functional components returning DOM elements. Avoid selecting elements from the global scope (`document.querySelector(...)`) from within components. Instead, query relative to the component's root or receive DOM refs.
   - Use the JSDoc definitions inside `types/` for all complex objects to facilitate immediate conversion to TypeScript.

---

## How Future AI Agents Should Work Here

If you are an AI coding assistant tasked with completing or expanding this workspace:

1. **Consult the DNA First**: Before adding animations, interactive behaviors, or visual representations, read `data/Anton_DNA.json` to verify the rule compliance (e.g. "Rule 1: Anton never talks").
2. **Update the Changelog**: If you lock a design stage or add a new component, document your progress in `CHANGELOG.md` and `Design_Log.md` using the semantic version rules.
3. **Validate Schemas**: If you edit JSON files programmatically, make sure the modified payload passes schema validation inside `schema/`.
4. **Follow the Event Cycle**: Hook new controllers into `js/events.js` rather than linking them directly to existing components.
5. **Honor the Lock System**: If a milestone is in the `Locked` state inside `state/workspace.json` (or toggled by the progress component), disable inputs and editors matching that milestone's scope.
