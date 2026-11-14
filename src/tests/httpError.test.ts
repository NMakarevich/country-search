import { describe, expect, it } from "vitest";
import { HttpError } from "../core/httpError.ts";

describe("HttpError", () => {
  it("Should be instantiated Error", () => {
    try {
      throw new HttpError(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  it("Should throw an HttpError", () => {
    try {
      throw new HttpError(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpError);
    }
  });
  it("Should return HttpError with status = false", () => {
    try {
      throw new HttpError(false);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpError);
      expect((e as HttpError).status).toBeFalsy();
    }
  });
});
