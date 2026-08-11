import {
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  NgDiagramBackgroundComponent,
  NgDiagramComponent,
  NgDiagramMinimapComponent,
  NgDiagramNodeTemplateMap,
  NgDiagramSelectionService,
  NgDiagramService,
  NgDiagramViewportService,
  initializeModel,
  provideNgDiagram,
  type NgDiagramConfig,
} from 'ng-diagram';

import { JOURNEY_PHASES } from '../../journey.data';
import { JourneyDetailRailComponent } from './journey-detail-rail';
import {
  JOURNEY_STOPS,
  MILESTONE_NODE,
  WEEK_NODE,
  buildJourneyModel,
  journeyRect,
  nodeRect,
  phaseRect,
  type FlowRect,
  type JourneyNodeData,
  type WeekNodeData,
} from './journey-layout';
import { MilestoneNodeComponent } from './nodes/milestone-node';
import { WeekNodeComponent } from './nodes/week-node';

const FRAME_PADDING = 64;
const ZOOM_MIN = 0.18;
const ZOOM_MAX = 1.6;
const STOP_SCALE = 1;
const STOP_CONTEXT = 150;
const TOUR_INTERVAL_MS = 2600;
const CAMERA_MS = 620;

@Component({
  selector: 'app-journey-timeline',
  imports: [
    NgDiagramComponent,
    NgDiagramBackgroundComponent,
    NgDiagramMinimapComponent,
    JourneyDetailRailComponent,
  ],
  providers: [provideNgDiagram()],
  template: `
    <div class="shell">
      <div
        class="canvas"
        [class.canvas--ready]="ready()"
        [class.canvas--touring]="playing()"
        tabindex="0"
        role="application"
        aria-label="The 12 week Angular journey. Use the left and right arrow keys to move between sessions, space to play the tour, and escape for the overview."
        (keydown)="onKeydown($event)"
      >
        <ng-diagram
          [model]="model"
          [config]="config"
          [nodeTemplateMap]="nodeTemplateMap"
          (diagramInit)="onDiagramInit()"
        >
          <!-- The only slot ng-diagram projects is the background; anything else
               placed inside is silently dropped, hence the minimap sits outside. -->
          <ng-diagram-background [type]="'dots'" />
        </ng-diagram>

        <ng-diagram-minimap
          [position]="'bottom-left'"
          [width]="188"
          [height]="132"
          [showZoomControls]="false"
        />

        @if (ready()) {
          <div class="phases" role="group" aria-label="Jump to a phase of the journey">
            <button type="button" class="pill" [class.pill--on]="focused() === null" (click)="fit()">
              Whole journey
            </button>
            @for (phase of phases; track phase.id) {
              <button
                type="button"
                class="pill"
                [class.pill--on]="focused() === phase.id"
                [style.--accent]="phase.accent"
                (click)="focusPhase(phase.id)"
              >
                <span class="dot" aria-hidden="true"></span>
                Phase {{ phase.id }}
              </button>
            }
          </div>

          <div class="zoom" role="group" aria-label="Zoom controls">
            <button type="button" class="sq" (click)="zoomIn()" [disabled]="!canZoomIn()" aria-label="Zoom in">
              +
            </button>
            <span class="scale">{{ scaleLabel() }}</span>
            <button type="button" class="sq" (click)="zoomOut()" [disabled]="!canZoomOut()" aria-label="Zoom out">
              &minus;
            </button>
            <button type="button" class="sq" (click)="fit()" aria-label="Fit the whole journey">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 9V5a1 1 0 011-1h4M20 9V5a1 1 0 00-1-1h-4M4 15v4a1 1 0 001 1h4M20 15v4a1 1 0 01-1 1h-4"
                />
              </svg>
            </button>
          </div>

          <div class="deck">
            <div class="deck__controls">
              <button type="button" class="sq" (click)="previous()" [disabled]="!hasPrevious()" aria-label="Previous session">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button type="button" class="play" (click)="togglePlay()" [attr.aria-pressed]="playing()">
                @if (playing()) {
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                  Pause
                } @else {
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                  Play the journey
                }
              </button>

              <button type="button" class="sq" (click)="next()" [disabled]="!hasNext()" aria-label="Next session">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <span class="deck__label">{{ stopLabel() }}</span>
            </div>

            <ol class="ticks" aria-hidden="true">
              @for (stop of stops; track stop.id; let i = $index) {
                <li>
                  <button
                    type="button"
                    class="tick"
                    [class.tick--on]="i === stopIndex()"
                    [class.tick--done]="stopIndex() !== null && i < stopIndex()!"
                    [class.tick--marker]="stop.weekNumber === null"
                    [style.--accent]="accentForStop(i)"
                    [attr.tabindex]="-1"
                    (click)="goToStop(i)"
                  ></button>
                </li>
              }
            </ol>
          </div>
        } @else {
          <div class="booting" role="status">
            <span class="booting__spin" aria-hidden="true"></span>
            Preparing the journey canvas
          </div>
        }
      </div>

      <app-journey-detail-rail [week]="selectedWeek()" />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .shell {
      display: grid;
      gap: 1rem;
      grid-template-columns: minmax(0, 1fr);
    }
    @media (min-width: 1024px) {
      .shell {
        grid-template-columns: minmax(0, 1fr) 19rem;
      }
    }
    .canvas {
      position: relative;
      display: flex;
      height: clamp(34rem, 68vh, 44rem);
      overflow: hidden;
      border-radius: 1rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background:
        radial-gradient(120% 90% at 50% -10%, rgba(232, 121, 249, 0.06), transparent 60%),
        #101017;
      outline: none;
    }
    .canvas:focus-visible {
      border-color: color-mix(in oklch, var(--color-vivid-pink, #e879f9) 50%, transparent);
    }
    .canvas ng-diagram {
      flex: 1;
      min-width: 0;
    }
    /* Inert until diagramInit: this also stops ng-diagram's own wheel and
       box-selection directives from reaching an engine that does not exist yet. */
    .canvas ng-diagram,
    .canvas ng-diagram-minimap {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
    }
    .canvas--ready ng-diagram,
    .canvas--ready ng-diagram-minimap {
      opacity: 1;
      pointer-events: auto;
    }
    .booting {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      font-size: 0.75rem;
      color: var(--color-text-muted, #71717a);
    }
    .booting__spin {
      height: 1rem;
      width: 1rem;
      border-radius: 999px;
      border: 2px solid rgba(255, 255, 255, 0.12);
      border-top-color: var(--color-vivid-pink, #e879f9);
      animation: journey-spin 0.7s linear infinite;
    }
    @keyframes journey-spin {
      to {
        transform: rotate(360deg);
      }
    }
    .phases,
    .zoom {
      position: absolute;
      z-index: 4;
      display: flex;
      gap: 0.375rem;
    }
    .phases {
      top: 0.75rem;
      left: 0.75rem;
      right: 0.75rem;
      flex-wrap: wrap;
    }
    .zoom {
      top: 0.75rem;
      right: 0.75rem;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }
    @media (min-width: 640px) {
      .phases {
        right: 4rem;
      }
    }
    .pill,
    .sq,
    .play {
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(20, 20, 28, 0.82);
      color: var(--color-text-secondary, #a1a1aa);
      backdrop-filter: blur(10px);
      transition:
        color 0.2s ease,
        border-color 0.2s ease,
        background-color 0.2s ease;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      border-radius: 999px;
      padding: 0.3125rem 0.6875rem;
      font-size: 0.6875rem;
      font-weight: 600;
      white-space: nowrap;
    }
    .pill:hover,
    .sq:hover:not(:disabled),
    .play:hover {
      color: #f0f0f2;
      border-color: rgba(255, 255, 255, 0.2);
    }
    .pill--on {
      color: #f0f0f2;
      border-color: color-mix(in oklch, var(--accent, #a1a1aa) 55%, transparent);
      background: color-mix(in oklch, var(--accent, #ffffff) 14%, rgba(20, 20, 28, 0.9));
    }
    .dot {
      height: 0.4375rem;
      width: 0.4375rem;
      border-radius: 999px;
      background: var(--accent, #a1a1aa);
    }
    .sq {
      display: grid;
      height: 1.75rem;
      width: 1.75rem;
      place-items: center;
      border-radius: 0.5rem;
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 1;
    }
    .sq:disabled {
      cursor: not-allowed;
      opacity: 0.35;
    }
    .scale {
      font-family: var(--font-mono, monospace);
      font-size: 0.5625rem;
      color: var(--color-text-muted, #71717a);
      font-variant-numeric: tabular-nums;
    }

    .deck {
      position: absolute;
      bottom: 0.75rem;
      left: 50%;
      z-index: 5;
      display: flex;
      width: min(30rem, calc(100% - 13rem));
      transform: translateX(-50%);
      flex-direction: column;
      gap: 0.5rem;
      border-radius: 0.875rem;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(16, 16, 23, 0.86);
      padding: 0.625rem 0.75rem;
      backdrop-filter: blur(14px);
    }
    .deck__controls {
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }
    .play {
      display: inline-flex;
      align-items: center;
      gap: 0.4375rem;
      border-radius: 0.5rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .deck__label {
      margin-left: auto;
      font-family: var(--font-mono, monospace);
      font-size: 0.625rem;
      color: var(--color-text-muted, #71717a);
      white-space: nowrap;
    }
    .ticks {
      display: flex;
      align-items: center;
      gap: 0.1875rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .ticks li {
      flex: 1;
    }
    .tick {
      display: block;
      width: 100%;
      height: 0.25rem;
      cursor: pointer;
      border: none;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.1);
      padding: 0;
      transition:
        background-color 0.3s ease,
        height 0.2s ease;
    }
    .tick--marker {
      max-width: 0.75rem;
      flex: none;
    }
    .tick--done {
      background: color-mix(in oklch, var(--accent, #ffffff) 45%, transparent);
    }
    .tick--on {
      height: 0.5rem;
      background: var(--accent, #ffffff);
    }
    .tick:hover {
      background: rgba(255, 255, 255, 0.35);
    }

    @media (prefers-reduced-motion: reduce) {
      .booting__spin {
        animation: none;
      }
      .canvas ng-diagram {
        transition: none;
      }
    }
  `,
})
export class JourneyTimelineComponent {
  private readonly diagram = inject(NgDiagramService);
  private readonly viewport = inject(NgDiagramViewportService);
  private readonly selectionService = inject(NgDiagramSelectionService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly phases = JOURNEY_PHASES;
  protected readonly stops = JOURNEY_STOPS;

  protected readonly model = initializeModel(buildJourneyModel());

  protected readonly nodeTemplateMap = new NgDiagramNodeTemplateMap([
    [WEEK_NODE, WeekNodeComponent],
    [MILESTONE_NODE, MilestoneNodeComponent],
  ]);

  /**
   * ng-diagram throws if its engine is touched before diagramInit. Those reads
   * happen during change detection, so the throw lands in Angular's error handler,
   * which re-renders and throws again. Every service read below is gated on this.
   */
  protected readonly ready = this.diagram.isInitialized;

  protected readonly config: NgDiagramConfig = {
    nodeDraggingEnabled: false,
    viewportPanningEnabled: true,
    resize: { defaultResizable: false },
    nodeRotation: { defaultRotatable: false },
    linking: { validateConnection: () => false },
    background: { dotSpacing: 26 },
    hideWatermark: true,
    zoom: { min: ZOOM_MIN, max: ZOOM_MAX, zoomToFit: { onInit: false } },
    edgeRouting: {
      defaultRouting: 'orthogonal',
      orthogonal: { firstLastSegmentLength: 22, maxCornerRadius: 18 },
    },
  };

  protected readonly focused = signal<number | null>(null);
  protected readonly stopIndex = signal<number | null>(null);
  protected readonly playing = signal(false);

  private timer: ReturnType<typeof setInterval> | null = null;
  private cameraFrame: number | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.stopTimer();
      if (this.cameraFrame !== null) cancelAnimationFrame(this.cameraFrame);
    });
  }

  protected readonly canZoomIn = computed(() => this.ready() && this.viewport.canZoomIn());
  protected readonly canZoomOut = computed(() => this.ready() && this.viewport.canZoomOut());

  protected readonly scaleLabel = computed(() =>
    this.ready() ? `${Math.round(this.viewport.scale() * 100)}%` : '',
  );

  protected readonly selectedWeek = computed<WeekNodeData | null>(() => {
    if (!this.ready()) return null;
    const [node] = this.selectionService.selection().nodes;
    if (!node) return null;
    const data = node.data as JourneyNodeData | undefined;
    return data?.kind === 'week' ? data : null;
  });

  protected readonly hasPrevious = computed(() => (this.stopIndex() ?? 0) > 0);
  protected readonly hasNext = computed(
    () => (this.stopIndex() ?? -1) < this.stops.length - 1,
  );

  protected readonly stopLabel = computed(() => {
    const index = this.stopIndex();
    if (index === null) return 'Overview';
    const stop = this.stops[index];
    return stop.weekNumber === null
      ? stop.label
      : `Week ${stop.weekNumber} of ${this.stops.filter((s) => s.weekNumber !== null).length}`;
  });

  protected accentForStop(index: number): string {
    const stop = this.stops[index];
    const week = stop.weekNumber;
    const phase = week === null ? null : this.phases.find((p) => p.weeks.includes(week));
    return phase?.accent ?? this.phases[0].accent;
  }

  /**
   * diagramInit is the engine-ready signal, so this path deliberately skips the
   * `ready` gate: gating it risks a silent no-op if isInitialized settles a tick
   * later, which would leave the canvas hidden for good.
   */
  protected onDiagramInit(): void {
    this.focused.set(this.phases[0].id);
    this.moveCamera(phaseRect(this.phases[0]), false);
  }

  protected fit(): void {
    if (!this.ready()) return;
    this.pause();
    this.focused.set(null);
    this.stopIndex.set(null);
    this.selectionService.deselectAll();
    this.moveCamera(journeyRect(), true);
  }

  protected focusPhase(phaseId: number): void {
    if (!this.ready()) return;
    const phase = this.phases.find((p) => p.id === phaseId);
    if (!phase) return;
    this.pause();
    this.focused.set(phaseId);
    this.stopIndex.set(null);
    this.selectionService.deselectAll();
    this.moveCamera(phaseRect(phase), true);
  }

  protected goToStop(index: number): void {
    if (!this.ready()) return;
    const stop = this.stops[index];
    const rect = stop ? nodeRect(stop.id) : null;
    if (!rect) return;

    this.stopIndex.set(index);
    this.focused.set(null);
    this.selectionService.select([stop.id]);
    this.moveCamera(
      {
        x: rect.x - STOP_CONTEXT,
        y: rect.y - STOP_CONTEXT,
        width: rect.width + STOP_CONTEXT * 2,
        height: rect.height + STOP_CONTEXT * 2,
      },
      true,
      STOP_SCALE,
    );
  }

  protected next(): void {
    const index = this.stopIndex();
    this.goToStop(index === null ? 0 : Math.min(index + 1, this.stops.length - 1));
  }

  protected previous(): void {
    const index = this.stopIndex();
    this.goToStop(index === null ? 0 : Math.max(index - 1, 0));
  }

  protected togglePlay(): void {
    if (!this.ready()) return;
    if (this.playing()) {
      this.pause();
      return;
    }

    if (this.stopIndex() === null || !this.hasNext()) this.goToStop(0);
    this.playing.set(true);
    this.timer = setInterval(() => {
      if (!this.hasNext()) {
        this.pause();
        return;
      }
      this.next();
    }, TOUR_INTERVAL_MS);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.ready()) return;

    switch (event.key) {
      case 'ArrowRight':
        this.pause();
        this.next();
        break;
      case 'ArrowLeft':
        this.pause();
        this.previous();
        break;
      case ' ':
        this.togglePlay();
        break;
      case 'Escape':
        this.fit();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  protected zoomIn(): void {
    if (!this.ready()) return;
    this.pause();
    this.viewport.zoom(1.25);
  }

  protected zoomOut(): void {
    if (!this.ready()) return;
    this.pause();
    this.viewport.zoom(0.8);
  }

  private pause(): void {
    this.playing.set(false);
    this.stopTimer();
  }

  private stopTimer(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private moveCamera(rect: FlowRect, animate: boolean, maxScale = ZOOM_MAX): void {
    const view = this.viewport.viewport();
    if (!view.width || !view.height) return;

    const usableWidth = view.width - FRAME_PADDING * 2;
    const usableHeight = view.height - FRAME_PADDING * 2;
    if (usableWidth <= 0 || usableHeight <= 0) return;

    const target = {
      scale: Math.max(
        ZOOM_MIN,
        Math.min(maxScale, ZOOM_MAX, usableWidth / rect.width, usableHeight / rect.height),
      ),
      centreX: rect.x + rect.width / 2,
      centreY: rect.y + rect.height / 2,
    };

    const apply = (scale: number, centreX: number, centreY: number) =>
      this.viewport.setViewport(
        view.width! / 2 - centreX * scale,
        view.height! / 2 - centreY * scale,
        scale,
      );

    const reducedMotion =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!animate || reducedMotion) {
      apply(target.scale, target.centreX, target.centreY);
      return;
    }

    const from = {
      scale: view.scale,
      centreX: (view.width / 2 - view.x) / view.scale,
      centreY: (view.height / 2 - view.y) / view.scale,
    };

    if (this.cameraFrame !== null) cancelAnimationFrame(this.cameraFrame);

    const started = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - started) / CAMERA_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      apply(
        from.scale + (target.scale - from.scale) * eased,
        from.centreX + (target.centreX - from.centreX) * eased,
        from.centreY + (target.centreY - from.centreY) * eased,
      );
      this.cameraFrame = t < 1 ? requestAnimationFrame(step) : null;
    };

    this.cameraFrame = requestAnimationFrame(step);
  }
}
