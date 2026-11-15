import { BASE_URL } from "../constants.ts";
import { HttpError } from "./httpError.ts";

export default async function searchCountries(
  searchString: string,
  signal: AbortSignal
): Promise<unknown[]> {
  try {
    const response = await fetch(`${BASE_URL}/${searchString}`, { signal });
    if (response.status === 404) {
      throw new Error("404");
    }
    if (!response.ok) {
      throw new HttpError(response.ok);
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "404") {
        throw new Error("404", { cause: error });
      } else if (error.name === "AbortError") {
        throw new Error("Abort Error", { cause: error });
      } else if (error.name === "TimeoutError") {
        throw new Error("TimeoutError", { cause: error });
      }
    }
    throw error;
  }
}
