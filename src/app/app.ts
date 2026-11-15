import { layout } from "../components/layout/layout.ts";
import debounce from "../core/debounce.ts";
import searchCountries from "../core/searchCountries.ts";
import mapCountryResponse from "../core/mapCountryResponse.ts";
import type { Country } from "../entities/country.ts";
import { country } from "../components/country/country.ts";

export default function app() {
  const { render, searchInput, resultsList, loader, notFound } = layout();

  const debouncedGetCountries = debounce(searchCountries, 500);
  let abortController: AbortController | null = null;

  function renderResults(countries: Country[]) {
    resultsList.replaceChildren(...countries.map((c) => country(c)));
  }

  async function handleInput(event: Event) {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      const value = target.value;
      if (!value) {
        resultsList.replaceChildren("");
        return;
      }
      abortController?.abort();
      abortController = new AbortController();
      notFound.classList.add("hidden");
      resultsList.classList.add("hidden");
      loader.classList.remove("hidden");
      try {
        const res = debouncedGetCountries(
          value,
          AbortSignal.any([abortController.signal, AbortSignal.timeout(3000)])
        );
        const countries = await mapCountryResponse(res);
        loader.classList.add("hidden");
        resultsList.classList.remove("hidden");
        renderResults(countries);
      } catch (e) {
        loader.classList.add("hidden");
        if (e instanceof Error) {
          if (e.name === "AbortError") {
            console.log("Aborted by next request");
          } else if (e.name === "TimeoutError") {
            console.log("Time is out");
          } else if (e.message === "404") {
            notFound.classList.remove("hidden");
          }
        }
      }
    }
  }

  function run() {
    document.body.appendChild(render());
    searchInput.addEventListener("input", handleInput);
  }

  return { run } as const;
}
