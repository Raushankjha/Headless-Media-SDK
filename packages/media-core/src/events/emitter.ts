import type {
  MediaEvent,
  MediaEventListener,
  MediaEventType,
} from "../types/events";

export class MediaEventEmitter {
  private listeners = new Map<MediaEventType, Set<MediaEventListener<any>>>();

  constructor(private readonly defaultLogger = true) {}

  emit<T extends MediaEventType>(
    event: Extract<MediaEvent, { type: T }>,
  ): void {
    if (this.defaultLogger) console.info("[media-core event]", event);
    this.listeners.get(event.type)?.forEach((listener) => listener(event));
  }

  subscribe<T extends MediaEventType>(
    type: T,
    listener: MediaEventListener<T>,
  ): () => void {
    const set = this.listeners.get(type) ?? new Set();
    set.add(listener);
    this.listeners.set(type, set);
    return () => set.delete(listener);
  }

  clear(): void {
    this.listeners.clear();
  }
}
