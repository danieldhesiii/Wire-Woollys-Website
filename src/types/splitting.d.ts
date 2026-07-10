// `splitting` ships no bundled TypeScript types, so we declare a minimal surface here.
// Covers the common usage: Splitting({ target, by }) and the auto-init default call.
declare module "splitting" {
  interface SplittingOptions {
    /** Elements (or a selector) to split. Defaults to "[data-splitting]". */
    target?: string | Element | Element[] | NodeListOf<Element>;
    /** Plugin to run: "chars", "words", "lines", "items", "grid", etc. */
    by?: string;
    /** Key used to namespace the generated CSS custom properties. */
    key?: string | null;
    [option: string]: unknown;
  }

  interface SplittingResult {
    el: Element;
    chars?: HTMLElement[];
    words?: HTMLElement[];
    lines?: HTMLElement[][];
    [key: string]: unknown;
  }

  function Splitting(options?: SplittingOptions): SplittingResult[];

  namespace Splitting {
    function html(options?: SplittingOptions & { content?: string }): string;
    function add(plugin: unknown): void;
  }

  export = Splitting;
}
