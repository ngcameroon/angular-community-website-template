import { Component, afterNextRender, computed, input, signal } from '@angular/core';
import { IconComponent } from '../icon/icon';

/**
 * Star call-to-action for a public GitHub repository.
 *
 * The count is fetched in the browser rather than at build time, so a prerendered
 * page never ships a stale number. It starts null on both the server and the first
 * client render, which keeps hydration matching, then appears once the request
 * lands. Any failure (offline, rate limit, private repo) simply leaves the button
 * as a plain link.
 */
@Component({
  selector: 'app-github-star',
  imports: [IconComponent],
  template: `
    <a
      class="star"
      [href]="'https://github.com/' + repo()"
      target="_blank"
      rel="noopener noreferrer"
      [attr.aria-label]="'Star ' + repo() + ' on GitHub'"
    >
      <svg class="star__mark" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
        />
      </svg>
      <span class="star__label">{{ label() }}</span>
      @if (formatted(); as count) {
        <span class="star__count">
          <app-icon class="star__icon" name="star" />
          {{ count }}
        </span>
      }
    </a>
  `,
  styles: `
    :host {
      display: inline-flex;
    }
    .star {
      display: inline-flex;
      align-items: center;
      gap: 0.4375rem;
      border-radius: 0.5rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: var(--color-surface-card, #16161f);
      padding: 0.4375rem 0.6875rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--color-text-secondary, #a1a1aa);
      text-decoration: none;
      white-space: nowrap;
      transition:
        color 0.25s ease,
        border-color 0.25s ease,
        background-color 0.25s ease;
    }
    .star:hover {
      color: var(--color-text-primary, #f0f0f2);
      border-color: rgba(255, 255, 255, 0.2);
      background: var(--color-surface-hover, #22222e);
    }
    .star__mark {
      height: 1rem;
      width: 1rem;
      flex-shrink: 0;
    }
    .star__count {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      border-left: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.1));
      padding-left: 0.5rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      font-variant-numeric: tabular-nums;
      color: var(--color-accent-gold, #fcd116);
    }
    .star__icon {
      height: 0.75rem;
      width: 0.75rem;
    }
    @media (prefers-reduced-motion: reduce) {
      .star {
        transition: none;
      }
    }
  `,
})
export class GithubStarComponent {
  /** Repository in `owner/name` form. */
  readonly repo = input.required<string>();
  readonly label = input('Star on GitHub');

  private readonly stars = signal<number | null>(null);

  protected readonly formatted = computed(() => {
    const count = this.stars();
    if (count === null) return null;
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
  });

  constructor() {
    afterNextRender(async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${this.repo()}`);
        if (!response.ok) return;
        const data: unknown = await response.json();
        const count = (data as { stargazers_count?: unknown }).stargazers_count;
        if (typeof count === 'number') this.stars.set(count);
      } catch {
        // Offline or rate limited: the button still links to the repo.
      }
    });
  }
}
