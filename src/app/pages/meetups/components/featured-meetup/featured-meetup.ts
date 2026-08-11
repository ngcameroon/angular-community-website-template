import { Component, computed, input } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon';
import { CATEGORY_ACCENT, endOf, startOf, type Meetup } from '../../meetups.data';

@Component({
  selector: 'app-featured-meetup',
  imports: [IconComponent],
  template: `
    @let meetup = event();
    <div class="frame">
      <span class="angular-halo" aria-hidden="true"></span>
      <article class="card angular-ring" [style.--accent]="accent()">
        <span class="aura" aria-hidden="true"></span>

      <div class="body">
        <header class="head">
          <span class="icon" aria-hidden="true"><app-icon [name]="meetup.icon" /></span>
          <div>
            <span class="flag">
              @if (live()) {
                <span class="ping" aria-hidden="true"></span>
                Happening now
              } @else {
                Next session
              }
            </span>
            <p class="week">Week {{ meetup.weekNumber }} · {{ meetup.category }}</p>
          </div>
        </header>

        <h3 class="theme">{{ meetup.theme }}</h3>
        <p class="description">{{ meetup.description }}</p>

        <ul class="topics">
          @for (topic of meetup.topics; track $index) {
            <li>{{ topic }}</li>
          }
        </ul>
      </div>

      <aside class="panel">
        <dl class="when">
          <div>
            <dt>Date</dt>
            <dd>
              <time [attr.datetime]="meetup.date">{{ meetup.formattedDate }}</time>
            </dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>20:00 - 21:00 WAT</dd>
          </div>
        </dl>

        @if (live()) {
          <p class="countdown countdown--live">The session is live right now</p>
        } @else {
          <div class="countdown" role="timer">
            @for (unit of countdown(); track unit.label) {
              <div class="unit">
                <span class="value">{{ unit.value }}</span>
                <span class="label">{{ unit.label }}</span>
              </div>
            }
          </div>
        }

        @if (meetup.registrationUrl) {
          <a
            [href]="meetup.registrationUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary w-full"
          >
            {{ live() ? 'Join the session now' : 'Register for this event' }}
          </a>
        } @else {
          <button type="button" class="btn-primary w-full" disabled>Registration opens soon</button>
        }

        <p class="note">{{ meetup.phase }}</p>
      </aside>
      </article>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .frame {
      position: relative;
    }
    .card {
      position: relative;
      display: grid;
      overflow: hidden;
      border-radius: 1rem;
      background: var(--color-surface-card, #16161f);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    }
    @media (min-width: 900px) {
      .card {
        grid-template-columns: minmax(0, 1fr) 19rem;
      }
    }
    .aura {
      position: absolute;
      top: -50%;
      left: -10%;
      height: 160%;
      width: 60%;
      background: radial-gradient(
        50% 40% at 50% 50%,
        color-mix(in oklch, var(--accent) 20%, transparent),
        transparent 70%
      );
      pointer-events: none;
      animation: aura-drift 9s ease-in-out infinite;
    }
    @keyframes aura-drift {
      0%,
      100% {
        opacity: 0.55;
        transform: translateX(0);
      }
      50% {
        opacity: 0.9;
        transform: translateX(12%);
      }
    }
    .body {
      position: relative;
      padding: clamp(1.5rem, 3vw, 2rem);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 0.875rem;
    }
    .icon {
      display: grid;
      height: 3rem;
      width: 3rem;
      flex-shrink: 0;
      place-items: center;
      border-radius: 0.875rem;
      border: 1px solid color-mix(in oklch, var(--accent) 28%, transparent);
      background: color-mix(in oklch, var(--accent) 14%, transparent);
      color: var(--accent);
      font-size: 1.5rem;
    }
    .flag {
      display: inline-flex;
      align-items: center;
      gap: 0.4375rem;
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--accent);
    }
    .ping {
      position: relative;
      display: inline-block;
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 999px;
      background: var(--color-accent-gold, #fcd116);
      box-shadow: 0 0 0 0 rgba(252, 209, 22, 0.6);
      animation: ping 1.6s ease-out infinite;
    }
    @keyframes ping {
      70% {
        box-shadow: 0 0 0 0.5rem rgba(252, 209, 22, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(252, 209, 22, 0);
      }
    }
    .week {
      margin-top: 0.125rem;
      font-size: 0.75rem;
      color: var(--color-text-muted, #71717a);
    }
    .theme {
      margin-top: 1.125rem;
      font-family: var(--font-display, 'Inter Tight', sans-serif);
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: var(--color-text-primary, #f0f0f2);
      text-wrap: balance;
    }
    @media (min-width: 640px) {
      .theme {
        font-size: 1.875rem;
      }
    }
    .description {
      margin-top: 0.75rem;
      max-width: 44rem;
      font-size: 0.9375rem;
      line-height: 1.65;
      color: var(--color-text-secondary, #a1a1aa);
      text-wrap: pretty;
    }
    .topics {
      margin-top: 1.25rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
      list-style: none;
      padding: 0;
    }
    .topics li {
      border-radius: 0.375rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: rgba(255, 255, 255, 0.03);
      padding: 0.25rem 0.5rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.6875rem;
      color: var(--color-text-secondary, #a1a1aa);
    }
    .panel {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      border-top: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: rgba(255, 255, 255, 0.02);
      padding: 1.5rem;
    }
    @media (min-width: 900px) {
      .panel {
        border-top: none;
        border-left: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      }
    }
    .when {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .when dt {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-text-muted, #71717a);
    }
    .when dd {
      margin-top: 0.1875rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-text-primary, #f0f0f2);
    }
    .countdown {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.375rem;
    }
    .unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0.5rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: var(--color-page-bg, #0f0f13);
      padding: 0.5rem 0.25rem;
    }
    .value {
      font-family: var(--font-display, 'Inter Tight', sans-serif);
      font-size: 1.125rem;
      font-weight: 800;
      line-height: 1;
      color: var(--accent);
      font-variant-numeric: tabular-nums;
    }
    .label {
      margin-top: 0.25rem;
      font-size: 0.5rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-text-muted, #71717a);
    }
    .countdown--live {
      display: block;
      border-radius: 0.5rem;
      border: 1px solid rgba(252, 209, 22, 0.35);
      background: rgba(252, 209, 22, 0.1);
      padding: 0.625rem;
      text-align: center;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--color-accent-gold, #fcd116);
    }
    .btn-primary[disabled],
    .btn-primary[disabled]:hover {
      cursor: not-allowed;
      opacity: 0.55;
      filter: saturate(0.6);
      transform: none;
      box-shadow: none;
    }
    .note {
      text-align: center;
      font-size: 0.6875rem;
      color: var(--color-text-muted, #71717a);
    }
    @media (prefers-reduced-motion: reduce) {
      .aura,
      .ping {
        animation: none;
      }
    }
  `,
})
export class FeaturedMeetupComponent {
  readonly event = input.required<Meetup>();
  readonly now = input.required<number>();

  protected readonly accent = computed(() => CATEGORY_ACCENT[this.event().category]);

  protected readonly live = computed(() => {
    const now = this.now();
    return now >= startOf(this.event()) && now < endOf(this.event());
  });

  protected readonly countdown = computed(() => {
    const remaining = Math.max(0, startOf(this.event()) - this.now());
    const seconds = Math.floor(remaining / 1000);
    return [
      { label: 'Days', value: pad(Math.floor(seconds / 86400)) },
      { label: 'Hours', value: pad(Math.floor(seconds / 3600) % 24) },
      { label: 'Mins', value: pad(Math.floor(seconds / 60) % 60) },
      { label: 'Secs', value: pad(seconds % 60) },
    ];
  });
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}
