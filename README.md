# Shuoguo Leilei mockup

Responsive React + TypeScript + Tailwind CSS visual prototype for **Shuoguo Leilei**, a curated bilingual B2B trade platform connecting verified Chinese buyers with export-ready California agricultural producers.

## Demo-only scope

- Local mock data only
- Local interface state only
- No external APIs, database, authentication backend, or payments

## Major screens

- Public landing page
- Platform dashboard with summary cards, activity feed, and kanban pipeline
- Exporter directory and exporter profile
- Buyer sourcing requests and request detail
- Private deal room
- Service-partner directory
- Market intelligence dashboard

## Key interactions

- English / 中文 toggle
- Route-based navigation across screens
- Search and filter controls
- Tabs, modal windows, and progress indicators
- Kanban drag/drop and stage-movement interactions
- Loading, empty, and recoverable error states
- “Request introduction” modal
- “Submit sourcing request” modal form

## Install and run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Project structure

```text
src/
  App.tsx              App shell, routing, global modals
  components.tsx       Reusable layout and UI components
  data/mockData.ts     Demonstration data for all screens
  lib/i18n.tsx         Local translation helpers and language context
  pages.tsx            Route screens and local-state interactions
  types.ts             Shared TypeScript models
```

## Notes

- Placeholder imagery is used for visual presentation.
- Deal-room and market-intelligence content is clearly marked as demonstration data.
- The prototype positions Tri-Stone as a managed introduction and coordination layer, not as a customs authority, law firm, or regulator.
