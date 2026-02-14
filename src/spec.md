# Specification

## Summary
**Goal:** Replace the Tugboats page main content with a reusable list that renders the full Tema fleet tugboat details from a static frontend JSON source.

**Planned changes:**
- Add a reusable `TugboatList` React component that takes the Tema fleet JSON and renders all tugboats with full details (id, name, IMO number, year built, type, status, specifications, capabilities, and optional fields when present).
- Store the provided Tema fleet JSON as a dedicated static data module/file in the frontend and render the UI from it (not from backend tugboat APIs/types).
- Replace only the selected `<main>` content (including the first paragraph) on the `/tugboats` route to render `TugboatList`, removing the old placeholder paragraph/content and avoiding duplicated list markup.

**User-visible outcome:** The Tugboats page shows all 6 tugboats from the provided Tema fleet JSON with their complete details, in English, in a responsive layout without the previous placeholder content.
