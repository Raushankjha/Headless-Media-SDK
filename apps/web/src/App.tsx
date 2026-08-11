import { useEffect, useMemo, useState } from "react";
import { createMediaClient } from "@headless-media/media-core";
import {
  MediaProvider,
  useMediaEvents,
  useMediaSearch,
} from "@headless-media/media-react";
import type { MediaItem, MediaVideo } from "@headless-media/media-core";
import { SearchBar } from "./components/SearchBar";
import { MediaGallery } from "./components/MediaGallery";
import { Lightbox } from "./components/Lightbox";
import { Reels } from "./components/Reels";
import "./styles.css";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY as string | undefined;
const client = apiKey ? createMediaClient({ apiKey }) : null;

function Demo() {
  const [query, setQuery] = useState("nature");
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [lastEvent, setLastEvent] = useState<string>("Ready");
  const { items, loading, loadingMore, error, hasMore, loadMore } =
    useMediaSearch({ query, perPage: 20, includeVideos: true });
  useMediaEvents("view", (event) =>
    setLastEvent(`Viewed ${event.mediaType} #${event.mediaId}`),
  );
  useMediaEvents("download", (event) =>
    setLastEvent(`Downloaded ${event.mediaType} #${event.mediaId}`),
  );
  useEffect(() => {
    if (selected) client?.trackView(selected.id, selected.type);
  }, [selected]);
  const videos = useMemo(
    () => items.filter((item): item is MediaVideo => item.type === "video"),
    [items],
  );
  if (!client)
    return (
      <main className="config">
        <h1>Headless Media SDK</h1>
        <p>
          Add <code>VITE_PEXELS_API_KEY</code> to{" "}
          <code>apps/web/.env.local</code>.
        </p>
        <p>Get a free key from Pexels, then restart Vite.</p>
      </main>
    );
  return (
    <div className="app-shell">
      <header>
        <div>
          <p className="eyebrow">Headless Media SDK</p>
          <h1>Explore visual media</h1>
          <p className="sub">
            Pexels-powered demo showing reusable SDK + headless UI primitives.
          </p>
        </div>
        <span className="event">{lastEvent}</span>
      </header>
      <SearchBar initialValue={query} onSearch={setQuery} />
      {error && <div className="error">{error.message}</div>}
      <MediaGallery
        items={items}
        loading={loading || loadingMore}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onOpen={setSelected}
      />
      {videos.length > 0 && (
        <Reels
          videos={videos.slice(0, 8)}
          onActive={(video) => client.trackView(video.id, "video")}
        />
      )}
      <Lightbox
        item={selected}
        onClose={() => setSelected(null)}
        onDownload={(item) => {
          client.trackDownload(item.id, item.type);
          const url =
            item.type === "photo"
              ? item.src.original
              : (
                  item.videoFiles.find((f) => f.quality === "hd") ??
                  item.videoFiles[0]
                )?.link;
          if (url) window.open(url, "_blank", "noopener,noreferrer");
        }}
      />
    </div>
  );
}

export default function App() {
  if (!client)
    return (
      <main className="config">
        <h1>Headless Media SDK</h1>
        <p>
          Add <code>VITE_PEXELS_API_KEY</code> to{" "}
          <code>apps/web/.env.local</code>.
        </p>
        <p>Get a free key from Pexels, then restart Vite.</p>
      </main>
    );
  return (
    <MediaProvider client={client}>
      <Demo />
    </MediaProvider>
  );
}
