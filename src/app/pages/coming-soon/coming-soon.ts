import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  template: `
    <section class="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pt-24 pb-20">
      <!-- Background glow -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-[120px]"
             style="background: oklch(69.02% .277 332.77 / 0.08)"></div>
      </div>

      <div class="relative text-center">
        <span class="gradient-text text-sm font-semibold tracking-widest uppercase">Coming Soon</span>
        <h1 class="font-display mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {{ heading }}
        </h1>
        <p class="mx-auto mt-4 max-w-lg text-lg text-text-secondary">
          {{ description }}
        </p>
        <a
          href="https://github.com/ngcameroon"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary mt-8"
        >
          Join Community for Updates
        </a>
      </div>
    </section>
  `,
})
export class ComingSoonComponent {
  private readonly route = inject(ActivatedRoute);
  readonly heading = this.route.snapshot.data['heading'] ?? 'Coming Soon';
  readonly description = this.route.snapshot.data['description'] ?? 'This page is under construction.';
}
