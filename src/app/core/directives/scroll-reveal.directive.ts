import {
  Directive,
  ElementRef,
  afterNextRender,
  input,
  inject,
  DestroyRef,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { class: 'reveal' },
})
export class ScrollRevealDirective {
  readonly delay = input<number>(0, { alias: 'appRevealDelay' });

  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const element = this.el.nativeElement as HTMLElement;

      // If IntersectionObserver is not supported, show immediately
      if (!('IntersectionObserver' in window)) {
        element.classList.add('visible');
        return;
      }

      const reveal = () => {
        const d = this.delay();
        if (d > 0) {
          element.style.transitionDelay = `${d}ms`;
        }
        // Small rAF to let the browser paint the initial state first
        requestAnimationFrame(() => {
          element.classList.add('visible');
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal();
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0 },
      );

      // Use setTimeout to ensure hydration is fully complete
      setTimeout(() => {
        observer.observe(element);
      }, 100);

      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
