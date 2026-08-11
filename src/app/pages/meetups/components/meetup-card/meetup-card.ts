import { Component, computed, input } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon';
import { CATEGORY_ACCENT, type Meetup } from '../../meetups.data';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const VISIBLE_TOPICS = 3;

@Component({
  selector: 'app-meetup-card',
  imports: [IconComponent],
  template: `
    @let meetup = event();
    <article class="card" [class.card--past]="past()" [style.--accent]="accent()">
      <span class="rail" aria-hidden="true"></span>

      <header class="head">
        <time class="tile" [attr.datetime]="meetup.date">
          <span class="tile__month">{{ month() }}</span>
          <span class="tile__day">{{ day() }}</span>
          <span class="tile__weekday">{{ weekday() }}</span>
        </time>

        <div class="ident">
          <span class="week">Week {{ meetup.weekNumber }}</span>
          <span class="category">
            <app-icon class="category__icon" [name]="meetup.icon" />
            {{ meetup.category }}
          </span>
          @if (past()) {
            <span class="chip chip--past">Event has passed</span>
          }
        </div>
      </header>

      <h3 class="theme">{{ meetup.theme }}</h3>
      <p class="description">{{ meetup.description }}</p>

      <ul class="topics">
        @for (topic of shownTopics(); track $index) {
          <li>{{ topic }}</li>
        }
        @if (hiddenTopics()) {
          <li class="topics__more">+{{ hiddenTopics() }}</li>
        }
      </ul>

      <footer class="foot">
        <span class="time">20:00 WAT</span>
        @if (!past()) {
          @if (meetup.registrationUrl) {
            <a
              [href]="meetup.registrationUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="register"
            >
              Register
              <span aria-hidden="true">&rarr;</span>
            </a>
          } @else {
            <span class="soon">Link soon</span>
          }
        }
      </footer>
    </article>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    .card {
      position: relative;
      display: flex;
      height: 100%;
      flex-direction: column;
      overflow: hidden;
      border-radius: 0.875rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: var(--color-surface-card, #16161f);
      padding: 1.25rem 1.25rem 1rem 1.5rem;
      transition:
        transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        border-color 0.35s ease,
        box-shadow 0.35s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      border-color: color-mix(in oklch, var(--accent) 45%, transparent);
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.3),
        0 18px 44px rgba(0, 0, 0, 0.45);
    }
    .rail {
      position: absolute;
      inset: 0 auto 0 0;
      width: 3px;
      background: linear-gradient(
        to bottom,
        var(--accent),
        color-mix(in oklch, var(--accent) 25%, transparent)
      );
    }

    /* Date tile: the primary scanning key on an events list. */
    .head {
      display: flex;
      align-items: flex-start;
      gap: 0.875rem;
    }
    .tile {
      display: flex;
      width: 3.25rem;
      flex-shrink: 0;
      flex-direction: column;
      align-items: center;
      border-radius: 0.625rem;
      border: 1px solid color-mix(in oklch, var(--accent) 24%, transparent);
      background: color-mix(in oklch, var(--accent) 10%, transparent);
      padding: 0.375rem 0 0.4375rem;
    }
    .tile__month {
      font-size: 0.5625rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: var(--accent);
    }
    .tile__day {
      font-family: var(--font-display, 'Inter Tight', sans-serif);
      font-size: 1.375rem;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      color: var(--color-text-primary, #f0f0f2);
      font-variant-numeric: tabular-nums;
    }
    .tile__weekday {
      font-size: 0.5625rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--color-text-muted, #71717a);
    }
    .ident {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 0.3125rem;
      padding-top: 0.125rem;
    }
    .week {
      font-size: 0.5625rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--color-text-muted, #71717a);
    }
    .category {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: color-mix(in oklch, var(--accent) 72%, #d4d4d8);
    }
    .category__icon {
      height: 0.875rem;
      width: 0.875rem;
      flex-shrink: 0;
    }
    .chip {
      align-self: flex-start;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(255, 255, 255, 0.06);
      padding: 0.125rem 0.4375rem;
      font-size: 0.5625rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #d4d4d8;
    }

    .theme {
      margin-top: 1rem;
      font-family: var(--font-display, 'Inter Tight', sans-serif);
      font-size: 1.0625rem;
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.02em;
      color: var(--color-text-primary, #f0f0f2);
      text-wrap: balance;
    }
    /* Clamped so every card in the grid keeps the same rhythm. */
    .description {
      margin-top: 0.375rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 0.8125rem;
      line-height: 1.6;
      color: var(--color-text-secondary, #a1a1aa);
    }
    .topics {
      margin-top: 0.875rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      list-style: none;
      padding: 0;
    }
    .topics li {
      border-radius: 0.3125rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.1875rem 0.4375rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.625rem;
      color: var(--color-text-muted, #71717a);
      white-space: nowrap;
    }
    .topics__more {
      color: color-mix(in oklch, var(--accent) 70%, #71717a) !important;
    }
    .foot {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      border-top: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      padding-top: 0.75rem;
      margin-top: 1.125rem;
    }
    .time {
      font-family: var(--font-mono, monospace);
      font-size: 0.6875rem;
      color: var(--color-text-muted, #71717a);
    }
    .register {
      display: inline-flex;
      align-items: center;
      gap: 0.3125rem;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent);
      text-decoration: none;
      transition: gap 0.2s ease;
    }
    .register:hover {
      gap: 0.5625rem;
    }
    .soon {
      font-size: 0.6875rem;
      color: var(--color-text-muted, #71717a);
    }

    /* Past: drain the colour, keep the text legible. Blanket opacity would sink
       contrast below AA. */
    .card--past {
      background: #131318;
      border-color: rgba(255, 255, 255, 0.05);
    }
    .card--past .rail {
      background: var(--color-text-muted, #71717a);
    }
    .card--past .tile__month,
    .card--past .category {
      color: var(--color-text-muted, #71717a);
    }
    .card--past .tile {
      border-color: rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.03);
    }
    .card--past .tile__day {
      color: var(--color-text-secondary, #a1a1aa);
    }
    .card--past .theme {
      color: var(--color-text-secondary, #a1a1aa);
    }
    .card--past:hover {
      transform: none;
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .card,
      .register {
        transition: none;
      }
      .card:hover {
        transform: none;
      }
    }
  `,
})
export class MeetupCardComponent {
  readonly event = input.required<Meetup>();
  readonly past = input(false);

  protected readonly accent = computed(() => CATEGORY_ACCENT[this.event().category]);

  protected readonly day = computed(() => this.event().date.slice(8, 10));

  protected readonly month = computed(() => MONTHS[Number(this.event().date.slice(5, 7)) - 1]);

  /** Taken from the formatted string rather than parsed, to dodge timezone drift. */
  protected readonly weekday = computed(() => this.event().formattedDate.slice(0, 3));

  protected readonly shownTopics = computed(() => this.event().topics.slice(0, VISIBLE_TOPICS));

  protected readonly hiddenTopics = computed(() =>
    Math.max(0, this.event().topics.length - VISIBLE_TOPICS),
  );
}
