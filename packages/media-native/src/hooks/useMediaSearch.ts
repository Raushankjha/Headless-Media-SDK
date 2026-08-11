import { useCallback, useEffect, useState } from "react";
import type { MediaItem } from "@headless-media/media-core";
import { useMediaClient } from "../MediaProvider";
export function useMediaSearch(query: string, perPage = 20) {
  const client = useMediaClient();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const search = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const [p, v] = await Promise.all([
        client.searchPhotos({
          query,
          page: 1,
          perPage: Math.ceil(perPage * 0.7),
        }),
        client.searchVideos({
          query,
          page: 1,
          perPage: Math.floor(perPage * 0.3),
        }),
      ]);
      setItems([...p.items, ...v.items]);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Failed to load media."));
    } finally {
      setLoading(false);
    }
  }, [client, perPage, query]);
  useEffect(() => {
    void search();
  }, [search]);
  return { items, loading, error, refetch: search };
}
