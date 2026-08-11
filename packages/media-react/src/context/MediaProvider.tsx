import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { MediaClient } from "@headless-media/media-core";

const MediaContext = createContext<MediaClient | null>(null);

export function MediaProvider({
  client,
  children,
}: {
  client: MediaClient;
  children: ReactNode;
}) {
  const value = useMemo(() => client, [client]);
  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
}

export function useMediaClient(): MediaClient {
  const client = useContext(MediaContext);
  if (!client)
    throw new Error("useMediaClient must be used inside <MediaProvider>.");
  return client;
}
