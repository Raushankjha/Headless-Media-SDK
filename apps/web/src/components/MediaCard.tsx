import type { MediaItem } from "@headless-media/media-core";

export function MediaCard({
  item,
  onOpen,
}: {
  item: MediaItem;
  onOpen: (item: MediaItem) => void;
}) {
  return (
    <button
      className="media-card"
      onClick={() => onOpen(item)}
      aria-label={`Open ${item.type} ${item.id}`}
    >
      <img
        src={item.type === "photo" ? item.src.medium : item.image}
        alt={item.type === "photo" ? item.alt : `Video by ${item.user.name}`}
        loading="lazy"
      />
      <span className="badge">{item.type}</span>
    </button>
  );
}
