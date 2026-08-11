import { PexelsClient } from "./api/pexels-client";
import { PhotoApi } from "./api/photos";
import { VideoApi } from "./api/videos";
import { MemoryCache } from "./cache/memory-cache";
import { MediaEventEmitter } from "./events/emitter";
import type { MediaEventType, MediaEventListener } from "./types/events";
import type {
  MediaPhoto,
  MediaVideo,
  PaginationParams,
  SearchParams,
} from "./types";

export interface MediaClientOptions {
  apiKey: string;
  cacheTtlMs?: number;
  defaultEventLogger?: boolean;
}

export class MediaClient {
  readonly photos: PhotoApi;
  readonly videos: VideoApi;
  readonly events: MediaEventEmitter;
  private readonly cache: MemoryCache<unknown>;
  private readonly inflight = new Map<string, Promise<unknown>>();

  constructor(options: MediaClientOptions) {
    const pexels = new PexelsClient(options.apiKey);
    this.photos = new PhotoApi(pexels);
    this.videos = new VideoApi(pexels);
    this.events = new MediaEventEmitter(options.defaultEventLogger ?? true);
    this.cache = new MemoryCache(options.cacheTtlMs ?? 30_000);
  }

  async cached<T>(key: string, request: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key) as T | undefined;
    if (cached !== undefined) return cached;
    const existing = this.inflight.get(key) as Promise<T> | undefined;
    if (existing) return existing;
    const promise = request()
      .then((value) => {
        this.cache.set(key, value);
        this.inflight.delete(key);
        return value;
      })
      .catch((error) => {
        this.inflight.delete(key);
        throw error;
      });
    this.inflight.set(key, promise);
    return promise;
  }

  searchPhotos(params: SearchParams) {
    return this.cached(`photos:search:${JSON.stringify(params)}`, () =>
      this.photos.search(params),
    );
  }
  curatedPhotos(params: PaginationParams = {}) {
    return this.cached(`photos:curated:${JSON.stringify(params)}`, () =>
      this.photos.curated(params),
    );
  }
  getPhoto(id: number) {
    return this.cached(`photo:${id}`, () => this.photos.getById(id));
  }
  searchVideos(params: SearchParams) {
    return this.cached(`videos:search:${JSON.stringify(params)}`, () =>
      this.videos.search(params),
    );
  }
  popularVideos(params: PaginationParams = {}) {
    return this.cached(`videos:popular:${JSON.stringify(params)}`, () =>
      this.videos.popular(params),
    );
  }
  getVideo(id: number) {
    return this.cached(`video:${id}`, () => this.videos.getById(id));
  }

  trackView(mediaId: number, mediaType: "photo" | "video") {
    this.events.emit({
      type: "view",
      mediaId,
      mediaType,
      timestamp: Date.now(),
    });
  }
  trackDownload(mediaId: number, mediaType: "photo" | "video") {
    this.events.emit({
      type: "download",
      mediaId,
      mediaType,
      timestamp: Date.now(),
    });
  }
  subscribe<T extends MediaEventType>(
    type: T,
    listener: MediaEventListener<T>,
  ) {
    return this.events.subscribe(type, listener);
  }
}

export const createMediaClient = (options: MediaClientOptions) =>
  new MediaClient(options);
