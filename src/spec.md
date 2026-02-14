# Specification

## Summary
**Goal:** Store a fixed set of 6 tugboats in the backend canister and display them dynamically as responsive cards on the Tugboats page.

**Planned changes:**
- Backend: Add a Motoko `Tugboat` data type (id, name, built, bollard_pull, type) and store exactly 6 predefined tugboats (TUG-01 to TUG-06) in canister state.
- Backend: Expose a public query method (e.g., `getAllTugboats`) to return the stored tugboats, and ensure Candid/TypeScript declarations include the new type and method.
- Frontend: Add/update a React Query hook to fetch tugboats from the backend actor on Tugboats page load (actor-gated), with loading/error/empty UI states using existing QueryState components.
- Frontend: Within the specified Tugboats page content container only, replace existing rendered content with a card grid that shows one card per tugboat (ID, Name, Built, Bollard pull, Type), in English.

**User-visible outcome:** The Tugboats page loads tugboats from the backend and shows them as a responsive grid of cards, with clear loading/error/empty states.
