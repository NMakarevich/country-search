import { describe, expect, it, vi } from "vitest";
import searchCountries from "../core/searchCountries.ts";
import { mockResponse } from "../mock/mock.ts";

const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);

describe("searchCountries", () => {
  it("Should return promise", () => {
    const abortController = new AbortController();
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });
    const result = searchCountries("Spain", abortController.signal);
    expect(result).toBeInstanceOf(Promise);
  });
  it("Should return 4 countries for searchString 'rus'", async () => {
    const abortController = new AbortController();
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });
    const result = await searchCountries("rus", abortController.signal);
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(4);
  });
  it("Should throw not found if no countries is found", async () => {
    const abortController = new AbortController();
    mockFetch.mockResolvedValue({
      ok: true,
      status: 404,
      json: () => Promise.resolve({ message: "Not Found" }),
    });
    try {
      await searchCountries("rusia", abortController.signal);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toBe("Ничего не найдено");
    }
  });
});
