import { Component, input } from '@angular/core';
import { JOURNEY_PHASES, JOURNEY_REPO } from '../../journey.data';
import type { WeekNodeData } from './journey-layout';

@Component({
  selector: 'app-journey-detail-rail',
  template: `
    @let selected = week();
    @if (selected) {
      <span class="eyebrow" [style.color]="selected.phase.accent">
        Week {{ selected.week.week }} · {{ selected.week.dateLabel }}
      </span>
      <h3 class="title">{{ selected.week.title }}</h3>
      <p class="phase">Phase {{ selected.phase.id }}: {{ selected.phase.name }}</p>
      <p class="summary">{{ selected.phase.summary }}</p>

      <h4 class="label">Key focus areas</h4>
      <ul class="list">
        @for (item of selected.week.focus; track item) {
          <li>{{ item }}</li>
        }
      </ul>

      <a class="link" [href]="selected.repoUrl" target="_blank" rel="noopener noreferrer">
        Starter &amp; solution code
        <span aria-hidden="true">&rarr;</span>
      </a>
    } @else {
      <span class="eyebrow eyebrow--muted">Session detail</span>
      <h3 class="title">Pick a week</h3>
      <p class="summary">
        Select any card on the canvas to read what that session covers and open its code
        folder. The four phases build on each other, so the path never doubles back.
      </p>
      <ul class="legend">
        @for (phase of phases; track phase.id) {
          <li>
            <span class="swatch" [style.background]="phase.accent" aria-hidden="true"></span>
            <span>
              <strong>Phase {{ phase.id }}: {{ phase.name }}</strong>
              <em>Weeks {{ phase.weeks[0] }} to {{ phase.weeks[phase.weeks.length - 1] }}</em>
            </span>
          </li>
        }
      </ul>
      <a class="link" [href]="repo" target="_blank" rel="noopener noreferrer">
        Browse the repository
        <span aria-hidden="true">&rarr;</span>
      </a>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-radius: 1rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: var(--color-surface-card, #16161f);
      padding: 1.25rem;
    }
    .eyebrow {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
    .eyebrow--muted {
      color: var(--color-text-muted, #71717a);
    }
    .title {
      margin-top: 0.375rem;
      font-family: var(--font-display, 'Inter Tight', sans-serif);
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.2;
      color: var(--color-text-primary, #f0f0f2);
      text-wrap: balance;
    }
    .phase {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-secondary, #a1a1aa);
    }
    .summary {
      margin-top: 0.5rem;
      font-size: 0.8125rem;
      line-height: 1.6;
      color: var(--color-text-secondary, #a1a1aa);
      text-wrap: pretty;
    }
    .label {
      margin-top: 1rem;
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-text-muted, #71717a);
    }
    .list,
    .legend {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
    }
    .list {
      margin-top: 0.5rem;
      gap: 0.375rem;
    }
    .list li {
      position: relative;
      padding-left: 0.875rem;
      font-size: 0.8125rem;
      color: var(--color-text-secondary, #a1a1aa);
    }
    .list li::before {
      content: '';
      position: absolute;
      top: 0.5rem;
      left: 0;
      height: 0.25rem;
      width: 0.25rem;
      border-radius: 999px;
      background: var(--color-vivid-pink, #e879f9);
    }
    .legend {
      margin-top: 1rem;
      gap: 0.625rem;
    }
    .legend li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }
    .legend strong {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-primary, #f0f0f2);
    }
    .legend em {
      font-style: normal;
      font-size: 0.6875rem;
      color: var(--color-text-muted, #71717a);
    }
    .swatch {
      margin-top: 0.3125rem;
      height: 0.5rem;
      width: 0.5rem;
      flex-shrink: 0;
      border-radius: 999px;
    }
    .link {
      margin-top: auto;
      padding-top: 1.25rem;
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--color-text-primary, #f0f0f2);
      text-decoration: none;
      transition: gap 0.2s ease;
    }
    .link:hover {
      gap: 0.625rem;
    }
  `,
})
export class JourneyDetailRailComponent {
  readonly week = input<WeekNodeData | null>(null);

  protected readonly phases = JOURNEY_PHASES;
  protected readonly repo = JOURNEY_REPO;
}
