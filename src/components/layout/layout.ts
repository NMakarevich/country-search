import { createElement } from "../../utils/createElement.ts";

export function layout() {
  const searchInput = createElement("input", {
    classList: ["input"],
    attributes: { id: "search-country" },
  });
  const resultsList = createElement("ul", {
    classList: ["results-list"],
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
            resultsList,
          ],
        }),
      ],
    });
  }

  return { render, searchInput, resultsList } as const;
}
