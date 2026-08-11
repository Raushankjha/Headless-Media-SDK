import { useCallback, useState } from "react";
import type { MediaItem } from "@headless-media/media-core";
import { useMediaClient } from "../context/MediaProvider";

export function useMediaItem() {
  const client = useMediaClient();
  const [item, setItem] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const get = useCallback(
    async (id: number, type: "photo" | "video") => {
      setLoading(true);
      setError(null);
      try {
        const result =
          type === "photo"
            ? await client.getPhoto(id)
            : await client.getVideo(id);
        setItem(result);
        return result;
      } catch (err) {
        const e =
          err instanceof Error ? err : new Error("Failed to load media item.");
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [client],
  );
  return { item, loading, error, get };
}
