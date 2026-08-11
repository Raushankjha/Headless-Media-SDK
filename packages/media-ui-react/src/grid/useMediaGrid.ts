import { useEffect, useRef } from "react";
import type { MediaItem } from "./types";

export interface MediaGridOptions {
  items: MediaItem[];
  hasMore?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  rootClassName?: string;
}
export function useMediaGrid({
  hasMore = false,
  loading = false,
  onLoadMore,
}: MediaGridOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore || loading || !onLoadMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore();
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loading, onLoadMore]);

  return {
    getRootProps: (props: React.HTMLAttributes<HTMLDivElement> = {}) => ({
      role: "list",
      ...props,
    }),
    getItemProps: (
      item: MediaItem,
      props: React.HTMLAttributes<HTMLElement> = {},
    ) => ({ role: "listitem", "data-media-id": item.id, ...props }),
    getSentinelProps: (props: React.HTMLAttributes<HTMLDivElement> = {}) => ({
      ...props,
      ref: sentinelRef,
      "aria-hidden": true,
    }),
  };
}
