import { createContext, useContext, type ReactNode } from "react";
import type { MediaClient } from "@headless-media/media-core";
const Context = createContext<MediaClient | null>(null);
export function MediaProvider({
  client,
  children,
}: {
  client: MediaClient;
  children: ReactNode;
}) {
  return <Context.Provider value={client}>{children}</Context.Provider>;
}
export function useMediaClient() {
  const client = useContext(Context);
  if (!client)
    throw new Error("useMediaClient must be used inside MediaProvider");
  return client;
}
