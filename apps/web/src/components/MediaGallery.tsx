import type { MediaItem } from "@headless-media/media-core";
import { useMediaGrid } from "@headless-media/media-ui-react";
import { MediaCard } from "./MediaCard";

export function MediaGallery({
  items,
  loading,
  hasMore,
  onLoadMore,
  onOpen,
}: {
  items: MediaItem[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onOpen: (item: MediaItem) => void;
}) {
  const grid = useMediaGrid({ items, loading, hasMore, onLoadMore });
  return (
    <>
      <div className="grid" {...grid.getRootProps()}>
        {items.map((item) => (
          <div key={`${item.type}-${item.id}`} {...grid.getItemProps(item)}>
            <MediaCard item={item} onOpen={onOpen} />
          </div>
        ))}
      </div>
      <div {...grid.getSentinelProps()} />
      {loading && <div className="status">Loading...</div>}
      {!loading && items.length === 0 && (
        <div className="empty">Search for something to explore.</div>
      )}
      {loading && items.length === 0 && (
        <div className="empty">Fetching media...</div>
      )}
    </>
  );
}
