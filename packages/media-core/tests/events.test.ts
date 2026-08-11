import { describe, expect, it, vi } from "vitest";
import { MediaEventEmitter } from "../src/events/emitter";

describe("MediaEventEmitter", () => {
  it("subscribes and unsubscribes", () => {
    const emitter = new MediaEventEmitter(false);
    const listener = vi.fn();
    const unsubscribe = emitter.subscribe("view", listener);
    emitter.emit({
      type: "view",
      mediaId: 1,
      mediaType: "photo",
      timestamp: 1,
    });
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    emitter.emit({
      type: "view",
      mediaId: 2,
      mediaType: "photo",
      timestamp: 2,
    });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
