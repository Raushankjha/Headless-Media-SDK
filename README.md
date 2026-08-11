# Headless Media SDK + Component Library

A take-home implementation for a small Pexels-powered media SDK ecosystem.

## Architecture

```text
apps/web
  ├── @headless-media/media-react
  │     └── @headless-media/media-core
  └── @headless-media/media-ui-react

media-native
  └── @headless-media/media-core

media-ui-react / media-ui-native
  └── independent of the SDK and wrappers
```

The web app is the composition layer. The data layer and UI layer are intentionally independent.

## Included

- `media-core`: typed Pexels client, auth, photo/video search, curated/popular endpoints, single-item fetch, pagination, in-memory cache/request dedupe, activity events.
- `media-react`: provider and hooks.
- `media-native`: React Native-oriented provider/hooks with the same core contract.
- `media-ui-react`: headless Grid, Lightbox, and Reel behavior.
- `media-ui-native`: React Native-oriented headless hooks.
- `apps/web`: working demo with search, media grid, lightbox, reels, events and load-more.
- `skills/`: two AI-agent skill documents.

## Run

1. Install Node 20+ and npm.
2. Run `npm install`.
3. Copy `.env.example` to `apps/web/.env.local`.
4. Put your Pexels key in `VITE_PEXELS_API_KEY`.
5. Run `npm run dev`.

## Build and test

```bash
npm build
npm typecheck
npm test
```

## AI-assisted development

AI coding assistance was used for repository scaffolding, implementation acceleration, test/documentation drafting, and iterative review. Architecture, package boundaries, public contracts, and final integration should be reviewed by the candidate before submission. The two `SKILL.md` files are intentionally specific to the package APIs and were used as guidance for the app integration.

## Security note

Because this take-home has no backend, a browser app must receive the Pexels key as a public runtime value. This demo does not pretend that a client-side key is secret. In a production product, a server-side proxy or controlled API gateway would normally be considered.

## Scope decisions

The core web experience is the primary executable demo. React Native packages provide the platform contract and headless primitives without requiring a full native application in this repository. Visual styling is deliberately kept in the app because the component library is headless.
