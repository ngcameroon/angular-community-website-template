import { Component, computed, input } from '@angular/core';
import {
  NgDiagramNodeSelectedDirective,
  NgDiagramPortComponent,
  type NgDiagramNodeTemplate,
  type SimpleNode,
} from 'ng-diagram';
import type { WeekNodeData } from '../journey-layout';

@Component({
  selector: 'app-week-node',
  imports: [NgDiagramPortComponent],
  // Applies .ng-diagram-node-selected to this host; without it a selected node
  // gets no visual treatment at all.
  hostDirectives: [{ directive: NgDiagramNodeSelectedDirective, inputs: ['node'] }],
  template: `
    <article
      class="card"
      [class.card--complete]="status() === 'complete'"
      [class.card--live]="status() === 'in-progress'"
      [style.--accent]="data().phase.accent"
    >
      <span class="glow" aria-hidden="true"></span>
      <span class="rail" aria-hidden="true"></span>

      <header class="head">
        <span class="week">{{ paddedWeek() }}</span>
        <span class="meta">
          <span class="kicker">Week</span>
          <time [attr.datetime]="data().week.isoDate">{{ data().week.dateLabel }}</time>
        </span>
        <span class="status" [attr.data-status]="status()">{{ statusLabel() }}</span>
      </header>

      <h3 class="title">{{ data().week.title }}</h3>

      <ul class="chips">
        @for (item of data().week.focus; track item) {
          <li>{{ item }}</li>
        }
      </ul>

      <footer class="foot">
        <span class="phase">Phase {{ data().phase.id }} · {{ data().phase.name }}</span>
      </footer>
    </article>

    <ng-diagram-port [id]="'top'" [side]="'top'" [type]="'both'" />
    <ng-diagram-port [id]="'right'" [side]="'right'" [type]="'both'" />
    <ng-diagram-port [id]="'bottom'" [side]="'bottom'" [type]="'both'" />
    <ng-diagram-port [id]="'left'" [side]="'left'" [type]="'both'" />
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    /* Ports exist only so edges have somewhere to dock; the layout is fixed. */
    ng-diagram-port {
      opacity: 0;
      pointer-events: none;
    }
    .card {
      position: relative;
      display: flex;
      height: 100%;
      flex-direction: column;
      gap: 0.5rem;
      overflow: hidden;
      border-radius: 0.875rem;
      border: 1px solid rgba(255, 255, 255, 0.07);
      background: linear-gradient(160deg, #1a1a24 0%, #131319 100%);
      padding: 0.875rem 1rem 0.75rem 1.125rem;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
      transition:
        transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        border-color 0.35s ease,
        box-shadow 0.35s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      border-color: color-mix(in oklch, var(--accent) 45%, transparent);
      box-shadow:
        0 18px 42px rgba(0, 0, 0, 0.45),
        0 0 32px color-mix(in oklch, var(--accent) 14%, transparent);
    }
    .glow {
      position: absolute;
      top: -40%;
      left: -20%;
      height: 140%;
      width: 70%;
      background: radial-gradient(
        60% 50% at 50% 50%,
        color-mix(in oklch, var(--accent) 22%, transparent),
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .card:hover .glow {
      opacity: 1;
    }
    .rail {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(
        to bottom,
        var(--accent),
        color-mix(in oklch, var(--accent) 40%, transparent)
      );
    }
    .card--complete .rail {
      background: var(--color-accent-green, #007a5e);
    }
    .card--live {
      border-color: color-mix(in oklch, var(--accent) 55%, transparent);
    }
    .head {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }
    .week {
      font-family: var(--font-display, 'Inter Tight', sans-serif);
      font-size: 2.375rem;
      font-weight: 800;
      line-height: 0.9;
      letter-spacing: -0.045em;
      color: var(--accent);
    }
    .meta {
      display: flex;
      min-width: 0;
      flex-direction: column;
    }
    .kicker {
      font-size: 0.5625rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #71717a;
    }
    .meta time {
      font-family: var(--font-mono, monospace);
      font-size: 0.8125rem;
      font-weight: 500;
      color: #d4d4d8;
    }
    .status {
      margin-left: auto;
      flex-shrink: 0;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.1875rem 0.5rem;
      font-size: 0.5625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #a1a1aa;
    }
    .status[data-status='complete'] {
      border-color: rgba(0, 122, 94, 0.35);
      background: rgba(0, 122, 94, 0.12);
      color: #34d399;
    }
    .status[data-status='in-progress'] {
      border-color: rgba(252, 209, 22, 0.35);
      background: rgba(252, 209, 22, 0.12);
      color: #fcd116;
    }
    .title {
      position: relative;
      font-family: var(--font-display, 'Inter Tight', sans-serif);
      font-size: 0.9375rem;
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.015em;
      color: #f0f0f2;
      text-wrap: balance;
    }
    .chips {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .chips li {
      border-radius: 0.3125rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.125rem 0.375rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.625rem;
      color: #a1a1aa;
      white-space: nowrap;
    }
    .foot {
      position: relative;
      margin-top: auto;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 0.4375rem;
    }
    .phase {
      font-size: 0.5625rem;
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: color-mix(in oklch, var(--accent) 70%, #a1a1aa);
    }
    @media (prefers-reduced-motion: reduce) {
      .card,
      .glow {
        transition: none;
      }
      .card:hover {
        transform: none;
      }
    }
  `,
})
export class WeekNodeComponent implements NgDiagramNodeTemplate<WeekNodeData> {
  readonly node = input.required<SimpleNode<WeekNodeData>>();

  protected readonly data = computed(() => this.node().data);
  protected readonly status = computed(() => this.data().week.status);
  protected readonly paddedWeek = computed(() => String(this.data().week.week).padStart(2, '0'));

  protected readonly statusLabel = computed(() => {
    switch (this.status()) {
      case 'complete':
        return 'Done';
      case 'in-progress':
        return 'Live';
      default:
        return 'Upcoming';
    }
  });
}
