import { describe, expect, vi, it, beforeAll } from "vitest";
import debounce from "../core/debounce.ts";

describe("debounce", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  it("should return value after 1000ms", async () => {
    const fn: () => Promise<unknown[]> = () => new Promise((resolve) => resolve(["test"]));
    const callFn = debounce(fn, 1000);
    const result = callFn();
    vi.advanceTimersByTime(1000);
    expect(await result).toEqual(["test"]);
  });
  it("should return value after second call after 1500ms", async () => {
    const fn = vi.fn();
    const callFn = debounce(fn, 1000);
    callFn([1]);
    callFn([2]);
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledOnce();
  });
});
