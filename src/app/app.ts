import { layout } from "../components/layout/layout.ts";
import debounce from "../core/debounce.ts";
import searchCountries from "../core/searchCountries.ts";
import mapCountryResponse from "../core/mapCountryResponse.ts";
import type { Country } from "../entities/country.ts";
import { country } from "../components/country/country.ts";

const DELAY_MS = 500;
const TIMEOUT_MS = 3000;

export default function app() {
  const { render, searchInput, resultsList, loader, notFound, timeout, retryButton } = layout();

  const debouncedGetCountries = debounce(searchCountries, DELAY_MS);
  let abortController: AbortController | null = null;

  function renderResults(countries: Country[]) {
    resultsList.replaceChildren(...countries.map((c) => country(c)));
  }

  async function searchCountry(searchString: string) {
    abortController?.abort();
    abortController = new AbortController();
    notFound.classList.add("hidden");
    resultsList.classList.add("hidden");
    loader.classList.remove("hidden");
    try {
      const res = debouncedGetCountries(
        searchString,
        AbortSignal.any([abortController.signal, AbortSignal.timeout(TIMEOUT_MS)])
      );
      const countries = await mapCountryResponse(res);
      loader.classList.add("hidden");
      resultsList.classList.remove("hidden");
      renderResults(countries);
    } catch (e) {
      loader.classList.add("hidden");
      if (e instanceof Error) {
        if (e.message === "AbortError") {
          console.log("Aborted by next request");
        } else if (e.message === "TimeoutError") {
          loader.classList.add("hidden");
          timeout.classList.remove("hidden");
          retryButton.onclick = async () => {
            timeout.classList.add("hidden");
            await searchCountry(searchString);
          };
        } else if (e.message === "404") {
          notFound.classList.remove("hidden");
        }
      }
    }
  }

  async function handleInput(event: Event) {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      const value = target.value;
      if (!value) {
        resultsList.replaceChildren("");
        return;
      }
      await searchCountry(value);
    }
  }

  function run() {
    document.body.appendChild(render());
    searchInput.addEventListener("input", handleInput);
  }

  return { run } as const;
}
