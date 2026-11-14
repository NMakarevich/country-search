import type { ICountry } from "../core/types.ts";

export class Country {
  country: ICountry;

  constructor(country: unknown) {
    this.country = country as ICountry;
  }
}
