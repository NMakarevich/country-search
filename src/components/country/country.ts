import { createElement } from "../../utils/createElement.ts";
import type { Country } from "../../entities/country.ts";

export function country(details: Country) {
  function handleClick() {}

  return createElement("div", {
    classList: ["country"],
    eventHandlers: [{ type: "click", callback: handleClick }],
    children: [
      createElement("div", {
        classList: ["image-wrapper"],
        children: [
          createElement("img", {
            classList: ["country-flag"],
            attributes: { src: details.flags?.svg || "", alt: details.name },
          }),
        ],
      }),
      createElement("ul", {
        classList: ["country-info"],
        children: [
          createElement("li", {
            classList: ["country-info__item"],
            children: ["Name", details.name],
          }),
        ],
      }),
    ],
  });
}
