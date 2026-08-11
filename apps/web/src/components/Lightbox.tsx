import { useEffect } from "react";
import type { MediaItem } from "@headless-media/media-core";
import { useLightbox } from "@headless-media/media-ui-react";

export function Lightbox({
  item,
  onClose,
  onDownload,
}: {
  item: MediaItem | null;
  onClose: () => void;
  onDownload: (item: MediaItem) => void;
}) {
  if (!item) return null;
  return (
    <LightboxInner item={item} onClose={onClose} onDownload={onDownload} />
  );
}

function LightboxInner({
  item,
  onClose,
  onDownload,
}: {
  item: MediaItem;
  onClose: () => void;
  onDownload: (item: MediaItem) => void;
}) {
  const lightbox = useLightbox();
  // Sync the externally controlled item into the headless controller.
  useEffect(() => {
    lightbox.open(item);
  }, [item, lightbox]);
  const src =
    item.type === "photo"
      ? item.src.large2x
      : (
          item.videoFiles.find((f) => f.width && f.width >= 720) ??
          item.videoFiles[0]
        )?.link;
  return (
    <div
      className="overlay"
      {...lightbox.getDialogProps({
        onMouseDown: (e) => {
          if (e.target === e.currentTarget) {
            lightbox.close();
            onClose();
          }
        },
      })}
    >
      <button
        className="close"
        {...lightbox.getCloseButtonProps({
          onClick: () => {
            lightbox.close();
            onClose();
          },
        })}
      >
        ×
      </button>
      <div className="lightbox-content">
        {item.type === "photo" ? (
          <img src={src} alt={item.alt} />
        ) : (
          <video src={src} controls autoPlay playsInline />
        )}
        <div className="lightbox-meta">
          <span>{item.type}</span>
          <button onClick={() => onDownload(item)}>Download</button>
        </div>
      </div>
    </div>
  );
}
