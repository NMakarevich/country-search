import { createElement } from "../../utils/createElement.ts";

import "./styles.css";

export function layout() {
  const searchInput = createElement("input", {
    classList: ["input"],
    attributes: { id: "search-country", placeholder: "Искать страну по названию" },
  });
  const resultsList = createElement("ul", {
    classList: ["results-list", "hidden"],
  });
  const loader = createElement("span", { classList: ["loader", "hidden"] });
  const notFound = createElement("span", {
    classList: ["not-found", "hidden"],
    children: ["Ничего не найдено"],
  });
  const retryButton = createElement("button", {
    classList: ["button"],
    attributes: { type: "button" },
    children: ["Повторить поиск"],
  });
  const timeout = createElement("div", {
    classList: ["timeout", "hidden"],
    children: [createElement("span", { children: ["Превышено время запроса"] }), retryButton],
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
              children: [searchInput],
            }),
            timeout,
            loader,
            notFound,
            resultsList,
          ],
        }),
      ],
    });
  }

  return { render, searchInput, resultsList, loader, notFound, retryButton, timeout } as const;
}
