import type { MediaVideo } from "@headless-media/media-core";
import { useReelSwiper } from "@headless-media/media-ui-react";

export function Reels({
  videos,
  onActive,
}: {
  videos: MediaVideo[];
  onActive: (video: MediaVideo) => void;
}) {
  const reels = useReelSwiper(
    videos,
    (item) => item.type === "video" && onActive(item),
  );
  return (
    <section className="reels-section">
      <div className="section-title">
        <h2>Reels</h2>
        <span>Vertical video browsing</span>
      </div>
      <div {...reels.getRootProps({ className: "reels", style: { height: 680 } })}>
        {videos.map((video, index) => {
          const file =
            video.videoFiles.find((f) => f.width && f.width >= 720) ??
            video.videoFiles[0];
          return (
            <article
              key={video.id}
              {...reels.getItemProps(index, { className: "reel" })}
            >
              <video
                src={file?.link}
                poster={video.image}
                controls
                muted
                playsInline
                preload="metadata"
              />
              <div className="reel-caption">
                <strong>{video.user.name}</strong>
                <span>{video.duration}s</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
