import { useEffect } from "react";
import type {
  MediaEventListener,
  MediaEventType,
} from "@headless-media/media-core";
import { useMediaClient } from "../context/MediaProvider";

export function useMediaEvents<T extends MediaEventType>(
  type: T,
  listener: MediaEventListener<T>,
) {
  const client = useMediaClient();
  useEffect(() => client.subscribe(type, listener), [client, type, listener]);
}
