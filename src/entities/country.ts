import type { ICountry } from "../core/types.ts";

export class Country {
  name: string;
  capital?: string;
  region: string;
  population?: number;
  flags?: {
    svg?: string;
    png?: string;
  };
  languages?: string[];

  constructor(data: ICountry) {
    this.name = data.name;
    this.capital = data.capital ?? "";
    this.region = data.region;
    this.population = data.population ?? 0;
    this.flags = { ...data?.flags };
    this.languages = [...(data?.languages ?? []).map((language) => language?.name ?? "")];
  }
}
