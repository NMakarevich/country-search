import type { Country } from "./types.ts";

export default async function mapCountryResponse(raw: Promise<unknown>): Promise<Country[]> {
  console.log(raw);
}
