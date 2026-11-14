import { Country } from "../entities/country.ts";

export default async function mapCountryResponse(raw: Promise<unknown>): Promise<Country[]> {
  console.log(raw);
}
