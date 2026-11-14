import { BASE_URL } from "../constants.ts";
import { HttpError } from "./httpError.ts";

export default async function searchCountries(
  searchString: string,
  signal: AbortSignal
): Promise<unknown[]> {
  const response = await fetch(`${BASE_URL}/${searchString}`, { signal });
  if (!response.ok) {
    throw new HttpError(response.ok);
  }
  if (response.status === 404) {
    throw new Error("Ничего не найдено");
  }
  return response.json();
}
