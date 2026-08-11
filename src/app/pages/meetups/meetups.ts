import {
  Component,
  DestroyRef,
  TransferState,
  afterNextRender,
  computed,
  inject,
  makeStateKey,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { FeaturedMeetupComponent } from './components/featured-meetup/featured-meetup';
import { MeetupCardComponent } from './components/meetup-card/meetup-card';
import { MEETUPS, MEETUP_SERIES, endOf, type Meetup } from './meetups.data';

/**
 * The page is prerendered, so "has this passed?" cannot come from build time alone
 * or the list would rot between deploys. The build stamps its clock into
 * TransferState, the first client render reuses that exact value so hydration
 * matches, then afterNextRender switches to the visitor's real clock and ticks.
 */
const RENDERED_AT = makeStateKey<number>('meetupsRenderedAt');

/** Chronological, so "everything before index N has finished" holds. */
const ORDERED = [...MEETUPS].sort((a, b) => endOf(a) - endOf(b));

@Component({
  selector: 'app-meetups',
  imports: [RouterLink, ScrollRevealDirective, FeaturedMeetupComponent, MeetupCardComponent],
  template: `
    <section class="relative overflow-hidden px-5 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          class="absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-[140px]"
          style="background: oklch(63.32% .24 31.68 / 0.07)"
        ></div>
      </div>

      <div class="relative mx-auto max-w-7xl">
        <header appReveal class="max-w-3xl">
          <span class="gradient-text text-sm font-semibold tracking-widest uppercase">
            Meetups & Events
          </span>
          <h1 class="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Every Thursday,
            <span class="gradient-text">we build together</span>
          </h1>
          <p class="mt-5 text-base text-text-secondary sm:text-lg">
            {{ series.title }}. Sixteen live sessions running from August through December, hosted
            from {{ series.location }} and open to everyone.
          </p>
        </header>

        <dl
          appReveal
          [appRevealDelay]="150"
          class="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle sm:mt-12 lg:grid-cols-4"
        >
          @for (fact of facts(); track fact.label) {
            <div class="bg-surface-card px-5 py-5">
              <dt class="text-xs font-semibold tracking-widest text-text-muted uppercase">
                {{ fact.label }}
              </dt>
              <dd class="font-display mt-2 text-lg font-bold tracking-tight sm:text-xl">
                {{ fact.value }}
              </dd>
            </div>
          }
        </dl>
      </div>
    </section>

    @let next = featured();

    @if (next) {
      <section class="px-5 py-8 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <app-featured-meetup appReveal [event]="next" [now]="now()" />
        </div>
      </section>
    }

    @if (upcoming().length) {
      <section class="px-5 py-10 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <header appReveal class="flex items-end justify-between gap-6">
            <div>
              <h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Upcoming sessions
              </h2>
              <p class="mt-2 text-sm text-text-secondary">
                {{ upcoming().length }} more to come, in order.
              </p>
            </div>
          </header>

          <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            @for (meetup of upcoming(); track meetup.id; let i = $index) {
              <app-meetup-card appReveal [appRevealDelay]="(i % 3) * 90" [event]="meetup" />
            }
          </div>
        </div>
      </section>
    }

    @if (past().length) {
      <section class="px-5 py-10 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <header appReveal>
            <h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Past sessions
            </h2>
            <p class="mt-2 text-sm text-text-secondary">
              {{ past().length }} session{{ past().length === 1 ? '' : 's' }} already delivered,
              most recent first.
            </p>
          </header>

          <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            @for (meetup of past(); track meetup.id) {
              <app-meetup-card [event]="meetup" [past]="true" />
            }
          </div>
        </div>
      </section>
    }

    @if (!next && !upcoming().length) {
      <section class="px-5 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            The H2 2026 series has wrapped
          </h2>
          <p class="mt-3 text-sm text-text-secondary sm:text-base">
            Every session is archived below. Follow the community for the 2027 programme.
          </p>
        </div>
      </section>
    }

    <section class="px-5 pt-6 pb-24 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <article appReveal class="gradient-border-card overflow-hidden">
          <div
            class="h-1"
            style="background: linear-gradient(90deg, oklch(63.32% .24 31.68), oklch(69.02% .277 332.77), oklch(53.18% .28 296.97))"
          ></div>
          <div class="p-6 sm:p-10">
            <h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Never miss a Thursday
            </h2>
            <p class="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Sessions run {{ series.frequency }}, {{ series.timeSlot }}. Join the community to get
              the registration link for each session as it opens.
            </p>
            <div class="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/ngcameroon"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary w-full sm:w-auto"
              >
                Join the Community
              </a>
              <a routerLink="/roadmap" class="btn-secondary w-full sm:w-auto">
                See the full roadmap
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
})
export class MeetupsComponent {
  private readonly transferState = inject(TransferState);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly series = MEETUP_SERIES;

  protected readonly now = signal(this.initialClock());

  constructor() {
    afterNextRender(() => {
      this.now.set(Date.now());
      const timer = setInterval(() => this.now.set(Date.now()), 1000);
      this.destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  private initialClock(): number {
    const transferred = this.transferState.get(RENDERED_AT, null);
    if (transferred !== null) return transferred;

    const stamped = Date.now();
    this.transferState.set(RENDERED_AT, stamped);
    return stamped;
  }

  /**
   * Derived from a count rather than straight from the clock: the clock ticks every
   * second for the countdown, and recomputing the lists on every tick would hand
   * Angular fresh arrays to diff once a second. The count only changes when a
   * session actually ends.
   */
  private readonly passedCount = computed(
    () => ORDERED.filter((meetup) => endOf(meetup) <= this.now()).length,
  );

  private readonly scheduled = computed(() => {
    const passed = this.passedCount();
    return { upcoming: ORDERED.slice(passed), past: ORDERED.slice(0, passed) };
  });

  protected readonly featured = computed<Meetup | null>(() => this.scheduled().upcoming[0] ?? null);

  protected readonly upcoming = computed(() => this.scheduled().upcoming.slice(1));

  /** Most recent first, so the newest recap sits closest to the live sessions. */
  protected readonly past = computed(() => [...this.scheduled().past].reverse());

  protected readonly facts = computed(() => [
    { label: 'Sessions', value: `${MEETUPS.length}` },
    { label: 'Cadence', value: this.series.frequency.replace('Every ', '') },
    { label: 'Time', value: '20:00 - 21:00 WAT' },
    { label: 'Delivered', value: `${this.scheduled().past.length} of ${MEETUPS.length}` },
  ]);
}
