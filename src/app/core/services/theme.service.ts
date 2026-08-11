import { Injectable } from '@angular/core';

/**
 * Brand values available to TypeScript. The CSS side of the same palette lives in
 * the `@theme` block in `src/styles.css`; change both together.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** Angular OKLch gradient: signature red-to-pink-to-purple. Usually keep this. */
  readonly angularGradient =
    'linear-gradient(90deg, oklch(63.32% .24 31.68) 0%, oklch(69.02% .277 332.77) 50%, oklch(53.18% .28 296.97) 100%)';

  /** Your community's accent gradient. Swap these for your own colours. */
  readonly accentGradient = 'linear-gradient(90deg, #007A5E 0%, #FCD116 50%, #CE1126 100%)';

  /** Angular fused with your accents, for hero and marketing surfaces. */
  readonly fusedGradient =
    'linear-gradient(135deg, #DD0031 0%, oklch(69.02% .277 332.77) 33%, #FCD116 66%, #007A5E 100%)';

  readonly colors = {
    angular: { red: '#DD0031', blue: '#1976D2', dark: '#C3002F' },
    accent: { green: '#007A5E', red: '#CE1126', gold: '#FCD116' },
  } as const;

  readonly fonts = {
    sans: "'Inter', system-ui, sans-serif",
    display: "'Inter Tight', 'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  } as const;
}
