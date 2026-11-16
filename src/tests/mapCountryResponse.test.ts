import { describe, expect, it } from "vitest";
import mapCountryResponse from "../core/mapCountryResponse.ts";
import { mockResponse } from "../mock/mock.ts";
import { Country } from "../entities/country.ts";

describe("mapCountryResponse", () => {
  it("should return an empty array", async () => {
    const mockJson = new Promise((resolve) => resolve([]));
    const result = await mapCountryResponse(mockJson);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
  it("should return array of Countries", async () => {
    const mockJson = new Promise((resolve) => resolve(mockResponse));
    const result = await mapCountryResponse(mockJson);
    expect(Array.isArray(result)).toBe(true);
    expect(result.every((country) => country instanceof Country)).toBe(true);
  });
});
