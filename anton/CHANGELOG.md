# Changelog

All notable changes to the Anton character design will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-06-30

### Added
- **Workspace Architecture**: Established isolated `/anton` studio folder layout.
- **Visual Shell**: Dark-themed workspace inspired by Pixar and Figma design tools.
- **Inspiration Board**: Component allowing drag-and-drop reference organization.
- **Prompt Library**: Searchable vault for storing AI prompts used for character development.
- **Anton DNA Panel**: JSON-backed character configuration tree and view schema.
- **Version History & Decision Logs**: Markdown-driven tracking components.
- **Design Tokens**: Centralized CSS variables file separating tokens from component rules.
- **State Separation**: Isolated temporary workspace state (`state/`) from permanent design configs (`data/`).
- **JSDoc Declarations**: Prepped vanilla JS components with typed schema signatures.
- **Schema Validation**: Templates verifying config structures.
- **Express Serving**: Mounted `/anton` static route to local server.
