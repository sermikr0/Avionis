import type { CSSProperties } from "react";

/**
 * Inline custom properties for the scroll-driven `reveal` utilities.
 * Staggers siblings by shifting the entry range `step` percent per index.
 */
export function stagger(index: number, step = 5): CSSProperties {
  return {
    "--reveal-start": `${5 + index * step}%`,
    "--reveal-end": `${40 + index * step}%`,
  } as CSSProperties;
}
