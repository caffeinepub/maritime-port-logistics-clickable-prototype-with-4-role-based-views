# Specification

## Summary
**Goal:** Replace the current Berthing page content in the two specified content regions with a grouped, card-based display of the provided `infrastructure` data.

**Planned changes:**
- Remove/hide the existing UI currently rendered within the two selected Berthing page DOM regions and replace it with new card-based sections driven by the `infrastructure` object.
- Render four grouped sections with headings: `terminal_3_mps`, `main_harbour_quays`, `specialized_industrial`, `tema_shipyard`.
- Within each group, render one consistently styled card per entry and display the required fields with English labels:
  - `terminal_3_mps`: berth, draft, type
  - `main_harbour_quays`: berth, quay, draft
  - `specialized_industrial`: name, location, draft, cargo
  - `tema_shipyard`: dock, dimensions, capacity, primary_use
- Ensure responsive layout: grid of cards on wider screens and single-column stacking on narrow screens.

**User-visible outcome:** On the Berthing page, the selected content areas show four infrastructure categories as headings with responsive, consistently styled cards listing the relevant fields for each item.
