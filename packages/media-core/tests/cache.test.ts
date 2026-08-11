import { describe, expect, it } from "vitest";
import { MemoryCache } from "../src/cache/memory-cache";

describe("MemoryCache", () => {
  it("stores and returns values", () => {
    const cache = new MemoryCache<number>(1000);
    cache.set("a", 42);
    expect(cache.get("a")).toBe(42);
  });
});
