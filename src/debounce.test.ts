import { describe, expect, vi, it, beforeAll } from "vitest";
import debounce from "./core/debounce.ts";

describe("debounce", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  it("should return value after 1000ms", () => {
    const fn = () => console.log("test");
    const spyLog = vi.spyOn(console, "log");
    const callFn = debounce(fn, 1000);
    callFn();
    expect(spyLog).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(spyLog).toHaveBeenCalled();
    expect(spyLog).toHaveBeenCalledWith("test");
  });
  it("should return value after second call after 1500ms", () => {
    const fn = () => console.log("test");
    const spyLog = vi.spyOn(console, "log");
    const callFn = debounce(fn, 1000);
    callFn();
    vi.advanceTimersByTime(500);
    expect(spyLog).not.toHaveBeenCalled();
    callFn();
    expect(spyLog).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(spyLog).toHaveBeenCalledTimes(1);
    expect(spyLog).toHaveBeenCalledWith("test");
  });
});
