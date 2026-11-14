import { layout } from "../components/layout/layout.ts";

export default function app() {
  const { render, searchInput, resultsList } = layout();

  function handleInput(event: Event) {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      const value = target.value;
      if (!value) return;
    }
    console.log(resultsList);
  }

  function run() {
    document.body.appendChild(render());
    searchInput.addEventListener("input", handleInput);
  }

  return { run } as const;
}
