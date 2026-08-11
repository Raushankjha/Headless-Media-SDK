# Media UI Components Skill

Use `@headless-media/media-ui-react` as a behavior-only, headless UI library.

## Rules
- Components do not fetch data and do not know Pexels exists.
- Components do not import `media-core` or `media-react`.
- Prefer hooks and prop-getters over opinionated rendered components.
- The consumer owns markup, CSS, layout, colors, spacing, and visual identity.
- Preserve accessibility behavior supplied by the hooks.
- For Grid, use the root/item/sentinel prop-getters and connect `onLoadMore`.
- For Lightbox, preserve Escape-to-close, dialog semantics, and focus restoration.
- For Reel Swiper, use vertical snap behavior and active-item detection.

## Preferred pattern
```tsx
const grid = useMediaGrid({ items, hasMore, loading, onLoadMore });

<div {...grid.getRootProps()}>
  {items.map(item => (
    <article key={item.id} {...grid.getItemProps(item)}>
      {/* Consumer-owned markup and styling */}
    </article>
  ))}
  <div {...grid.getSentinelProps()} />
</div>
```

## Anti-patterns
- Do not add Tailwind classes inside the package.
- Do not add a Pexels API call.
- Do not create a styled `<MediaGrid />` that hides all markup decisions from consumers.
