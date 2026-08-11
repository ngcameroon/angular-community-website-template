import { Component } from '@angular/core';
import { JOURNEY_PHASES, JOURNEY_WEEKS, phaseOf, repoUrlFor } from '../../journey.data';

/** Prerendered on the server and used on mobile, where a pan-and-zoom canvas is the wrong tool. */
@Component({
  selector: 'app-journey-list',
  template: `
    <ol class="track">
      @for (week of weeks; track week.week) {
        @let phase = phaseFor(week);
        <li class="step" [style.--accent]="phase.accent">
          <span class="marker" aria-hidden="true">
            <span class="marker__dot"></span>
          </span>

          <article class="card">
            <header class="head">
              <span class="badge">Week {{ pad(week.week) }}</span>
              <time class="date" [attr.datetime]="week.isoDate">{{ week.dateLabel }}</time>
              <span class="phase">Phase {{ phase.id }}: {{ phase.name }}</span>
            </header>

            <h3 class="title">{{ week.title }}</h3>

            <ul class="chips">
              @for (item of week.focus; track item) {
                <li>{{ item }}</li>
              }
            </ul>

            <a class="link" [href]="repoUrl(week)" target="_blank" rel="noopener noreferrer">
              Starter &amp; solution
              <span aria-hidden="true">&rarr;</span>
            </a>
          </article>
        </li>
      }
    </ol>
  `,
  styles: `
    :host {
      display: block;
    }

    .track {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      list-style: none;
      margin: 0;
      padding: 0;
      counter-reset: none;
    }

    .step {
      position: relative;
      display: flex;
      gap: 0.875rem;
      padding-left: 0.25rem;
    }

    .marker {
      position: relative;
      display: flex;
      width: 0.75rem;
      flex-shrink: 0;
      justify-content: center;
    }

    .marker::before {
      content: '';
      position: absolute;
      top: 1.5rem;
      bottom: -1.25rem;
      width: 1px;
      background: linear-gradient(
        to bottom,
        color-mix(in oklch, var(--accent) 50%, transparent),
        rgba(255, 255, 255, 0.06)
      );
    }

    .step:last-child .marker::before {
      display: none;
    }

    .marker__dot {
      position: relative;
      margin-top: 1.0625rem;
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 999px;
      background: var(--accent);
      box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent) 16%, transparent);
    }

    .card {
      flex: 1;
      min-width: 0;
      border-radius: 0.75rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      border-left: 2px solid color-mix(in oklch, var(--accent) 45%, transparent);
      background: var(--color-surface-card, #16161f);
      padding: 0.875rem 1rem;
    }

    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
    }

    .badge {
      border-radius: 0.3125rem;
      background: color-mix(in oklch, var(--accent) 16%, transparent);
      padding: 0.125rem 0.4375rem;
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--accent);
    }

    .date {
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
      color: var(--color-text-secondary, #a1a1aa);
    }

    .phase {
      margin-left: auto;
      font-size: 0.625rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--color-text-muted, #71717a);
    }

    .title {
      margin-top: 0.4375rem;
      font-family: var(--font-display, 'Inter Tight', sans-serif);
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: -0.015em;
      color: var(--color-text-primary, #f0f0f2);
      text-wrap: balance;
    }

    .chips {
      margin-top: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.3125rem;
      list-style: none;
      padding: 0;
    }

    .chips li {
      border-radius: 0.3125rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.125rem 0.4375rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.6875rem;
      color: var(--color-text-muted, #71717a);
    }

    .link {
      margin-top: 0.75rem;
      display: inline-flex;
      align-items: center;
      gap: 0.3125rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-secondary, #a1a1aa);
      text-decoration: none;
      transition:
        color 0.2s ease,
        gap 0.2s ease;
    }

    .link:hover {
      color: var(--color-text-primary, #f0f0f2);
      gap: 0.5625rem;
    }
  `,
})
export class JourneyListComponent {
  protected readonly weeks = JOURNEY_WEEKS;
  protected readonly phases = JOURNEY_PHASES;

  protected readonly phaseFor = phaseOf;
  protected readonly repoUrl = repoUrlFor;

  protected pad(week: number): string {
    return String(week).padStart(2, '0');
  }
}
