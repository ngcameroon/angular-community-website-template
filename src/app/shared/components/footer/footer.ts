import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../core/directives/scroll-reveal.directive';
import { COMMUNITY, NAV_LINKS } from '../../../core/community.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  template: `
    <footer class="relative border-t border-border-subtle">
      <div class="absolute inset-x-0 top-0 h-px" style="background: linear-gradient(90deg, transparent, oklch(63.32% .24 31.68 / 0.4), oklch(69.02% .277 332.77 / 0.4), oklch(53.18% .28 296.97 / 0.4), transparent)"></div>

      <div class="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div appReveal class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div class="sm:col-span-2 lg:col-span-1">
            <a routerLink="/" class="group flex items-center gap-3">
              <img
                [src]="community.logo"
                [alt]="community.name + ' logo'"
                class="h-8 w-8 rounded-lg transition-transform duration-300 group-hover:scale-110"
                width="32"
                height="32"
              />
              <span class="font-display text-sm font-bold text-text-primary">
                {{ community.wordmark.prefix
                }}<span class="gradient-text">{{ community.wordmark.suffix }}</span>
              </span>
            </a>
            <p class="mt-3 max-w-xs text-sm text-text-muted leading-relaxed">
              {{ community.description }}
            </p>
          </div>

          <div>
            <h4 class="text-xs font-semibold tracking-widest text-text-muted uppercase">Navigate</h4>
            <ul class="mt-4 space-y-2.5">
              @for (link of navLinks; track link.label) {
                <li>
                  <a [routerLink]="link.route" class="text-sm text-text-secondary transition-colors duration-300 hover:text-text-primary">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-semibold tracking-widest text-text-muted uppercase">Community</h4>
            <ul class="mt-4 space-y-2.5">
              @for (social of community.socials; track social.label) {
                <li>
                  <a [href]="social.url" target="_blank" rel="noopener noreferrer" class="text-sm text-text-secondary transition-colors duration-300 hover:text-text-primary">
                    {{ social.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-semibold tracking-widest text-text-muted uppercase">Resources</h4>
            <ul class="mt-4 space-y-2.5">
              @for (link of community.resourceLinks; track link.label) {
                <li>
                  <a [href]="link.url" target="_blank" rel="noopener noreferrer" class="text-sm text-text-secondary transition-colors duration-300 hover:text-text-primary">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>

        <div appReveal [appRevealDelay]="200" class="mt-10 flex flex-col items-center gap-3 border-t border-border-subtle pt-8 sm:flex-row sm:justify-between">
          <p class="text-xs text-text-muted">
            &copy; {{ currentYear }} {{ community.name }}. Built with Angular.
          </p>
          <p class="text-xs text-text-muted">
            Made in {{ community.city }}, {{ community.country }}
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly community = COMMUNITY;
  protected readonly navLinks = NAV_LINKS;

  readonly currentYear = new Date().getFullYear();
}
