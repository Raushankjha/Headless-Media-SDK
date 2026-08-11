# Media React Data Skill

Use `@headless-media/media-react` for all media data access in the web app.

## Rules
- Initialize one `MediaClient` with the Pexels key and pass it to `MediaProvider`.
- Use `useMediaSearch` for search results; do not call Pexels directly from components.
- Use `useMediaEvents` for activity subscriptions.
- Keep loading, error, empty, and pagination states explicit.
- Use `loadMore()` for infinite pagination and respect `hasMore`.
- Do not import `@headless-media/media-core` into application UI components unless there is a concrete domain-type need; prefer types exposed by the data layer.
- Do not put Pexels URLs, API headers, or fetch logic in React components.

## Preferred pattern
```tsx
const { items, loading, error, hasMore, loadMore } = useMediaSearch({
  query,
  perPage: 20,
  includeVideos: true,
});
```

## Before coding
1. Check whether the feature belongs in the data wrapper or in the app.
2. Preserve the package dependency direction: app -> media-react -> media-core.
3. Keep UI presentation separate from data fetching.
