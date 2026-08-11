import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { JourneyTimelineSectionComponent } from './components/journey-timeline/journey-timeline-section';
import { JOURNEY_PHASES, JOURNEY_REPO, JOURNEY_WEEKS } from './journey.data';

@Component({
  selector: 'app-roadmap',
  imports: [ScrollRevealDirective, JourneyTimelineSectionComponent],
  template: `
    <section class="relative overflow-hidden px-5 pt-28 pb-14 sm:px-6 sm:pt-32 lg:px-8">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          class="absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-[140px]"
          style="background: oklch(69.02% .277 332.77 / 0.07)"
        ></div>
      </div>

      <div class="relative mx-auto max-w-7xl">
        <header appReveal class="max-w-3xl">
          <span class="gradient-text text-sm font-semibold tracking-widest uppercase">
            Roadmap H2 2026
          </span>
          <h1 class="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The 12-Week
            <span class="gradient-text">Angular Journey</span>
          </h1>
          <p class="mt-5 text-base text-text-secondary sm:text-lg">
            Our mission is to empower the developer community in Cameroon by fostering deep
            mastery of Angular and modern web standards. This roadmap bridges theoretical
            knowledge and professional application through structured learning and collective
            innovation.
          </p>

          <div class="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              [href]="repo"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary w-full sm:w-auto"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
              Open journey-2026
            </a>
            <a href="#journey" class="btn-secondary w-full sm:w-auto">See the timeline</a>
          </div>
        </header>

        <dl
          appReveal
          [appRevealDelay]="150"
          class="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle sm:mt-14 lg:grid-cols-4"
        >
          @for (fact of facts; track fact.label) {
            <div class="bg-surface-card px-5 py-6">
              <dt class="text-xs font-semibold tracking-widest text-text-muted uppercase">
                {{ fact.label }}
              </dt>
              <dd class="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {{ fact.value }}
              </dd>
              <dd class="mt-1 text-xs text-text-muted">{{ fact.note }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>

    <section class="px-5 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <header appReveal>
          <span class="text-sm font-semibold tracking-widest text-accent-green uppercase">
            Goals
          </span>
          <h2 class="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Two tracks, one outcome
          </h2>
        </header>

        <div class="mt-8 grid gap-5 lg:grid-cols-2">
          @for (goal of goals; track goal.title; let i = $index) {
            <article
              appReveal
              [appRevealDelay]="i * 120"
              class="gradient-border-card group p-6 sm:p-8"
            >
              <span
                class="font-mono text-xs font-semibold tracking-widest"
                [style.color]="goal.accent"
              >
                {{ goal.eyebrow }}
              </span>
              <h3 class="font-display mt-3 text-xl font-bold sm:text-2xl">{{ goal.title }}</h3>
              <p class="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                {{ goal.body }}
              </p>
            </article>
          }
        </div>
      </div>
    </section>

    <section id="journey" class="scroll-mt-24 px-5 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <header appReveal class="max-w-3xl">
          <span class="gradient-text text-sm font-semibold tracking-widest uppercase">
            Milestone I
          </span>
          <h2 class="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            12 weeks into the heart of Angular
          </h2>
          <p class="mt-4 text-sm text-text-secondary sm:text-base">
            A modular curriculum built so each module stands on the one before it, moving from
            foundational concepts to advanced implementation patterns. Sessions run every Thursday
            evening for 60 minutes, with a live demo and a Q&amp;A.
          </p>
        </header>

        <div appReveal [appRevealDelay]="120" class="mt-10">
          <app-journey-timeline-section />
        </div>
      </div>
    </section>

    <section class="px-5 py-14 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <header appReveal>
          <span class="text-sm font-semibold tracking-widest text-accent-green uppercase">
            How it builds
          </span>
          <h2 class="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Four phases across the journey
          </h2>
        </header>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          @for (phase of phases; track phase.id; let i = $index) {
            <article
              appReveal
              [appRevealDelay]="i * 100"
              class="relative overflow-hidden rounded-xl border border-border-subtle bg-surface-card p-6"
            >
              <span
                class="absolute inset-x-0 top-0 h-0.5"
                [style.background]="phase.accent"
                aria-hidden="true"
              ></span>
              <span class="font-mono text-xs font-semibold" [style.color]="phase.accent">
                Phase {{ phase.id }}
              </span>
              <h3 class="font-display mt-2 text-lg font-bold">{{ phase.name }}</h3>
              <p class="mt-1 text-xs text-text-muted">
                Weeks {{ phase.weeks[0] }} to {{ phase.weeks[phase.weeks.length - 1] }}
              </p>
              <p class="mt-3 text-sm leading-relaxed text-text-secondary">{{ phase.summary }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="px-5 py-14 pb-24 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <article appReveal class="gradient-border-card overflow-hidden">
          <div
            class="h-1"
            style="background: linear-gradient(90deg, oklch(63.32% .24 31.68), oklch(69.02% .277 332.77), oklch(53.18% .28 296.97))"
          ></div>
          <div class="p-6 sm:p-10">
            <span class="gradient-text text-sm font-semibold tracking-widest uppercase">
              Milestone II
            </span>
            <h2 class="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              The Open Source Pathway
            </h2>
            <p class="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
              The open-source initiative is the collaborative heart of our community. By building
              high-quality component libraries, templates, and developer tools, we solve real-world
              challenges while contributing back to the global Angular ecosystem. This pathway
              encourages innovation through peer-reviewed contributions, putting Cameroonian talent
              at the forefront of practical, scalable tech solutions.
            </p>

            <ul class="mt-7 grid gap-3 sm:grid-cols-3">
              @for (item of pathway; track item.title) {
                <li class="rounded-lg border border-border-subtle bg-page-bg p-4">
                  <h3 class="text-sm font-semibold text-text-primary">{{ item.title }}</h3>
                  <p class="mt-1.5 text-xs leading-relaxed text-text-muted">{{ item.body }}</p>
                </li>
              }
            </ul>

            <div class="mt-8 flex flex-col gap-3 border-t border-border-subtle pt-7 sm:flex-row">
              <a
                href="https://github.com/ngcameroon"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary w-full sm:w-auto"
              >
                Join the community
              </a>
              <a
                [href]="repo + '/issues'"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary w-full sm:w-auto"
              >
                Suggest a session topic
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
})
export class RoadmapComponent {
  protected readonly repo = JOURNEY_REPO;
  protected readonly phases = JOURNEY_PHASES;

  protected readonly facts = [
    { label: 'Sessions', value: `${JOURNEY_WEEKS.length}`, note: 'One per week' },
    { label: 'Starts', value: 'Aug 6', note: 'Thursday, 2026' },
    { label: 'Runs until', value: 'Oct 22', note: 'Capstone week' },
    { label: 'Per session', value: '60 min', note: 'Demo plus Q&A' },
  ];

  protected readonly goals = [
    {
      eyebrow: 'GOAL 01',
      title: 'The Angular Journey',
      body: 'A weekly webinar series covering the features of Angular and how to use them to build real systems. Twelve lessons, each explained in detail with demo projects and review sessions.',
      accent: 'oklch(63.32% 0.24 31.68)',
    },
    {
      eyebrow: 'GOAL 02',
      title: 'Open Source Build with Angular',
      body: 'The open-source project follows the series, so everything learned feeds directly into continuous development and improvement of the community.',
      accent: 'oklch(53.18% 0.28 296.97)',
    },
  ];

  protected readonly pathway = [
    {
      title: 'Component libraries',
      body: 'Accessible, themeable building blocks the whole community can install and ship.',
    },
    {
      title: 'Developer tools',
      body: 'Schematics and CLI utilities that remove the repetitive parts of Angular work.',
    },
    {
      title: 'Community templates',
      body: 'Starters that encode our conventions, so the next project begins at a higher floor.',
    },
  ];
}
