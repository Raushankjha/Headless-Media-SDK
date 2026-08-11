# SDK documentation

## Packages

- `@headless-media/media-core`: framework-agnostic Pexels client, events, cache and typed contracts.
- `@headless-media/media-react`: React provider and hooks around `media-core`.
- `@headless-media/media-native`: React Native provider and hooks around `media-core`.

## Core example

```ts
const client = createMediaClient({ apiKey });
const result = await client.searchPhotos({ query: 'mountains', page: 1, perPage: 20 });
```

## Events

```ts
const unsubscribe = client.subscribe('view', event => {
  console.log(event.mediaId);
});
unsubscribe();
```
