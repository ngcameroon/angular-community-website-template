import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { COMMUNITY, NAV_LINKS } from '../../../core/community.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.scrolled]="scrolled()"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a routerLink="/" class="group flex items-center gap-3">
          <img
            [src]="community.logo"
            [alt]="community.name + ' logo'"
            class="h-9 w-9 rounded-lg transition-transform duration-300 group-hover:scale-110"
            width="36"
            height="36"
          />
          <span class="font-display text-lg font-bold tracking-tight text-text-primary">
            {{ community.wordmark.prefix
            }}<span class="gradient-text">{{ community.wordmark.suffix }}</span>
          </span>
        </a>

        <div class="hidden items-center gap-1 md:flex">
          @for (link of navLinks; track link.label) {
            <a
              [routerLink]="link.route"
              routerLinkActive="nav-link-active"
              [routerLinkActiveOptions]="{ exact: link.exact }"
              class="nav-link"
            >
              {{ link.label }}
            </a>
          }
        </div>

        <div class="flex items-center gap-3">
          <a
            [href]="community.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-cta btn-gradient-outline"
          >
            <span class="btn-label">Join Community</span>
          </a>

          <button
            (click)="mobileOpen.set(!mobileOpen())"
            class="inline-flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-hover md:hidden"
            [attr.aria-expanded]="mobileOpen()"
            aria-label="Toggle navigation menu"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              @if (mobileOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      @if (mobileOpen()) {
        <div class="border-t border-border-subtle bg-page-bg/95 backdrop-blur-xl md:hidden">
          <div class="space-y-1 px-4 py-4">
            @for (link of navLinks; track link.label) {
              <a
                [routerLink]="link.route"
                routerLinkActive="nav-link-active"
                (click)="mobileOpen.set(false)"
                class="block rounded-lg px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
              >
                {{ link.label }}
              </a>
            }
            <a
              [href]="community.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary mt-3 w-full justify-center"
            >
              Join Community
            </a>
          </div>
        </div>
      }
    </nav>
  `,
  styles: `
    nav {
      background: rgba(15, 15, 19, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    nav.scrolled {
      background: rgba(15, 15, 19, 0.9);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .nav-link {
      padding: 0.5rem 0.875rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      transition: color 0.2s ease, background-color 0.2s ease;
    }
    .nav-link:hover {
      color: var(--color-text-primary);
      background-color: var(--color-surface-hover);
    }
    .nav-cta {
      display: none;
    }
    @media (min-width: 768px) {
      .nav-cta {
        display: inline-flex;
      }
    }
    .nav-link-active {
      color: var(--color-text-primary) !important;
      background: linear-gradient(135deg, rgba(221,0,49,0.1), rgba(221,0,49,0.05));
    }
  `,
})
export class NavbarComponent {
  protected readonly community = COMMUNITY;
  protected readonly navLinks = NAV_LINKS;

  readonly mobileOpen = signal(false);
  readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }
}
