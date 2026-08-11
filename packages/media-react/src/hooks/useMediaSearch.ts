import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem, PaginatedResponse } from "@headless-media/media-core";
import { useMediaClient } from "../context/MediaProvider";

export interface UseMediaSearchOptions {
  query: string;
  perPage?: number;
  includeVideos?: boolean;
  enabled?: boolean;
}

export function useMediaSearch({
  query,
  perPage = 20,
  includeVideos = true,
  enabled = true,
}: UseMediaSearchOptions) {
  const client = useMediaClient();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const requestId = useRef(0);

  const search = useCallback(
    async (nextPage = 1, append = false) => {
      if (!query.trim() || !enabled) {
        setItems([]);
        setPage(0);
        setHasMore(false);
        return;
      }
      const id = ++requestId.current;
      append ? setLoadingMore(true) : setLoading(true);
      setError(null);
      try {
        const [photos, videos] = await Promise.all([
          client.searchPhotos({
            query,
            page: nextPage,
            perPage: Math.ceil(perPage * 0.7),
          }),
          includeVideos
            ? client.searchVideos({
                query,
                page: nextPage,
                perPage: Math.floor(perPage * 0.3),
              })
            : Promise.resolve(null),
        ]);
        if (id !== requestId.current) return;
        const merged = [...photos.items, ...(videos?.items ?? [])];
        setItems((prev) => (append ? [...prev, ...merged] : merged));
        setPage(nextPage);
        setHasMore(
          Boolean(photos.pagination.nextPage || videos?.pagination.nextPage),
        );
      } catch (err) {
        if (id === requestId.current)
          setError(
            err instanceof Error ? err : new Error("Failed to load media."),
          );
      } finally {
        if (id === requestId.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [client, includeVideos, enabled, perPage, query],
  );

  useEffect(() => {
    void search(1, false);
  }, [search]);
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) void search(page + 1, true);
  }, [hasMore, loadingMore, page, search]);
  return {
    items,
    loading,
    loadingMore,
    error,
    hasMore,
    page,
    loadMore,
    refetch: () => search(1, false),
  };
}
