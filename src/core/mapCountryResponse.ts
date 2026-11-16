import { Country } from "../entities/country.ts";

export default async function mapCountryResponse(raw: Promise<unknown>): Promise<Country[]> {
  const data = await raw;
  if (Array.isArray(data)) {
    return data.map((c) => new Country(c));
  }
  return [];
}
