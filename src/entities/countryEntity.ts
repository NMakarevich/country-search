import type { Country } from "../core/types.ts";

export class CountryEntity {
  country: Country;

  constructor(country: unknown) {
    this.country = country as Country;
  }
}
