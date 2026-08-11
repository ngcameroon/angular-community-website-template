import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';
import { IconComponent } from '../../../../shared/components/icon/icon';
import { COMMUNITY_PILLARS } from '../../../../core/community.config';

@Component({
  selector: 'app-community-pulse',
  standalone: true,
  imports: [ScrollRevealDirective, RouterLink, IconComponent],
  template: `
    <section id="roadmap" class="relative py-20 sm:py-28">
      <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <header appReveal class="text-center">
          <span class="gradient-text text-sm font-semibold tracking-widest uppercase">Community Pulse</span>
          <h2 class="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            2026 Community Roadmap
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
            Our three pillars for growth is staying relevant, active, and community-focused.
          </p>
          <a routerLink="/roadmap" class="btn-secondary mt-7">
            See the 12-week journey
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </header>

        <!-- Pillar cards -->
        <div class="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          @for (pillar of pillars; track pillar.title; let i = $index) {
            <article
              appReveal
              [appRevealDelay]="i * 120"
              class="gradient-border-card group p-6 sm:p-8"
            >
              <div
                class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                [style.background]="pillar.iconBg"
                [style.color]="pillar.accent"
              >
                <app-icon [name]="pillar.icon" />
              </div>

              <h3 class="font-display text-xl font-bold text-text-primary">{{ pillar.title }}</h3>
              <p class="mt-3 text-sm text-text-secondary leading-relaxed sm:text-base">{{ pillar.description }}</p>

              <div class="mt-5 flex flex-wrap gap-2">
                @for (tag of pillar.tags; track tag) {
                  <span class="rounded-full bg-surface-elevated px-3 py-1 text-xs font-medium text-text-muted border border-border-subtle transition-colors duration-300 group-hover:border-border-subtle/80">
                    {{ tag }}
                  </span>
                }
              </div>

              <div class="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-accent-gold">
                <span class="relative flex h-1.5 w-1.5">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-gold opacity-75"></span>
                  <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-gold"></span>
                </span>
                Coming Soon: Q2 2026
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class CommunityPulseComponent {
  readonly pillars = COMMUNITY_PILLARS;
}
