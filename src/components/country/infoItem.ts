import { createElement } from "../../utils/createElement.ts";

export default function infoItem(key: string, value: string | number = "No information") {
  return createElement("li", {
    classList: ["country-info__item"],
    children: [
      createElement("span", { classList: ["item-title"], children: [key] }),
      createElement("span", { classList: ["item-value"], children: [String(value)] }),
    ],
  });
}
