import {
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { JourneyListComponent } from './journey-list';
import { JourneyTimelineComponent } from './journey-timeline';

type JourneyView = 'canvas' | 'list';

const CANVAS_MIN_WIDTH = '(min-width: 1024px)';

@Component({
  selector: 'app-journey-timeline-section',
  imports: [JourneyListComponent, JourneyTimelineComponent],
  template: `
    <div class="bar">
      <p class="caption">
        Twelve Thursdays, four phases. The path runs left to right, then wraps, so no
        two sessions sit out of order.
      </p>

      @if (canvasAvailable()) {
        <div class="toggle" role="group" aria-label="Choose how to view the curriculum">
          @for (option of views; track option.value) {
            <button
              type="button"
              [class.on]="view() === option.value"
              [attr.aria-pressed]="view() === option.value"
              (click)="view.set(option.value)"
            >
              {{ option.label }}
            </button>
          }
        </div>
      }
    </div>

    @if (canvasAvailable() && view() === 'canvas') {
      @defer (on viewport; prefetch on immediate) {
        <app-journey-timeline />
      } @placeholder {
        <div class="skeleton" aria-hidden="true">
          <span class="skeleton__pulse"></span>
        </div>
      } @loading {
        <div class="skeleton" role="status">
          <span class="skeleton__label">Loading the journey canvas</span>
        </div>
      }
    } @else {
      <app-journey-list />
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .bar {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    @media (min-width: 768px) {
      .bar {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        gap: 2rem;
      }
    }

    .caption {
      max-width: 34rem;
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--color-text-secondary, #a1a1aa);
      text-wrap: pretty;
    }

    .toggle {
      display: inline-flex;
      flex-shrink: 0;
      gap: 0.125rem;
      border-radius: 0.625rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: var(--color-surface-elevated, #1a1a23);
      padding: 0.1875rem;
    }

    .toggle button {
      cursor: pointer;
      border: none;
      border-radius: 0.4375rem;
      background: transparent;
      padding: 0.3125rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-muted, #71717a);
      transition:
        color 0.2s ease,
        background-color 0.2s ease;
    }

    .toggle button:hover {
      color: var(--color-text-primary, #f0f0f2);
    }

    .toggle button.on {
      background: var(--color-surface-hover, #22222e);
      color: var(--color-text-primary, #f0f0f2);
    }

    .skeleton {
      display: grid;
      height: 40rem;
      place-items: center;
      border-radius: 1rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: #101017;
    }

    .skeleton__label {
      font-size: 0.75rem;
      color: var(--color-text-muted, #71717a);
    }

    .skeleton__pulse {
      height: 2rem;
      width: 2rem;
      border-radius: 999px;
      background: var(--color-vivid-pink, #e879f9);
      opacity: 0.25;
      animation: journey-pulse 1.6s ease-in-out infinite;
    }

    @keyframes journey-pulse {
      0%,
      100% {
        opacity: 0.15;
        transform: scale(0.9);
      }
      50% {
        opacity: 0.4;
        transform: scale(1.05);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton__pulse {
        animation: none;
      }
    }
  `,
})
export class JourneyTimelineSectionComponent {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly views: readonly { value: JourneyView; label: string }[] = [
    { value: 'canvas', label: 'Canvas' },
    { value: 'list', label: 'List' },
  ];

  protected readonly view = signal<JourneyView>('canvas');

  /**
   * Starts false on the server and on the first client render so hydration matches;
   * afterNextRender then upgrades to the canvas as an ordinary post-hydration update.
   */
  protected readonly canvasAvailable = signal(false);

  constructor() {
    afterNextRender(() => {
      const query = window.matchMedia(CANVAS_MIN_WIDTH);
      this.canvasAvailable.set(query.matches);

      const onChange = (event: MediaQueryListEvent) => this.canvasAvailable.set(event.matches);
      query.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => query.removeEventListener('change', onChange));
    });
  }
}
