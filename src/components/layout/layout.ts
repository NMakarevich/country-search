import { createElement } from "../../utils/createElement.ts";

import "./styles.css";

export function layout() {
  const searchInput = createElement("input", {
    classList: ["input"],
    attributes: { id: "search-country" },
  });
  const resultsList = createElement("ul", {
    classList: ["results-list", "hidden"],
  });
  const loader = createElement("span", { classList: ["loader", "hidden"] });
  const notFound = createElement("span", {
    classList: ["not-found", "hidden"],
    children: ["Ничего не найдено"],
  });

  function render() {
    return createElement("main", {
      classList: ["main"],
      children: [
        createElement("div", {
          classList: ["container"],
          children: [
            createElement("div", {
              classList: ["search"],
              children: [
                createElement("label", {
                  classList: ["search-label"],
                  attributes: { for: "search-country" },
                  children: ["Search country: "],
                }),
                searchInput,
              ],
            }),
            loader,
            notFound,
            resultsList,
          ],
        }),
      ],
    });
  }

  return { render, searchInput, resultsList, loader, notFound } as const;
}
