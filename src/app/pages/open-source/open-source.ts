import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';
import { ProjectCardComponent } from './components/project-card/project-card';
import { OPEN_SOURCE_PROJECTS } from './open-source.data';

@Component({
  selector: 'app-open-source',
  imports: [RouterLink, ScrollRevealDirective, ProjectCardComponent],
  template: `
    <section class="relative overflow-hidden px-5 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          class="absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-[140px]"
          style="background: oklch(53.18% .28 296.97 / 0.08)"
        ></div>
      </div>

      <div class="relative mx-auto max-w-7xl">
        <header appReveal class="max-w-3xl">
          <span class="gradient-text text-sm font-semibold tracking-widest uppercase">
            Open Source
          </span>
          <h1 class="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Built by the community,
            <span class="gradient-text">for everyone</span>
          </h1>
          <p class="mt-5 text-base text-text-secondary sm:text-lg">
            By building component libraries, templates, and developer tools we solve real problems
            and contribute back to the global Angular ecosystem. Every project here is open to
            contributions, whatever your experience level.
          </p>

          <div class="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://github.com/ngcameroon"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary w-full sm:w-auto"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
              Browse the organisation
            </a>
            <a routerLink="/roadmap" class="btn-secondary w-full sm:w-auto">
              See the open source pathway
            </a>
          </div>
        </header>
      </div>
    </section>

    <section class="px-5 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <header appReveal>
          <h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">Projects</h2>
          <p class="mt-2 text-sm text-text-secondary">
            {{ projects.length }} projects in the ngCameroon ecosystem right now.
          </p>
        </header>

        <div class="mt-8 grid gap-5 lg:grid-cols-2">
          @for (project of projects; track project.id; let i = $index) {
            <app-project-card appReveal [appRevealDelay]="i * 110" [project]="project" />
          }
        </div>
      </div>
    </section>

    <section class="px-5 py-10 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <header appReveal>
          <span class="text-sm font-semibold tracking-widest text-accent-green uppercase">
            Contributing
          </span>
          <h2 class="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Your first pull request starts here
          </h2>
        </header>

        <ol class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          @for (step of steps; track step.title; let i = $index) {
            <li
              appReveal
              [appRevealDelay]="i * 90"
              class="relative overflow-hidden rounded-xl border border-border-subtle bg-surface-card p-5"
            >
              <span class="font-mono text-xs font-bold text-text-muted">
                0{{ i + 1 }}
              </span>
              <h3 class="font-display mt-2 text-base font-bold">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-text-secondary">{{ step.body }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="px-5 pt-6 pb-24 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <article appReveal class="gradient-border-card overflow-hidden">
          <div
            class="h-1"
            style="background: linear-gradient(90deg, oklch(63.32% .24 31.68), oklch(69.02% .277 332.77), oklch(53.18% .28 296.97))"
          ></div>
          <div class="p-6 sm:p-10">
            <h2 class="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Have an idea worth building?
            </h2>
            <p class="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Phase 2 of our roadmap turns the community into working groups that ship real
              libraries together. Bring a proposal, or join a team that is already building.
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
              <a routerLink="/meetups" class="btn-secondary w-full sm:w-auto">
                See upcoming sessions
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
})
export class OpenSourceComponent {
  protected readonly projects = OPEN_SOURCE_PROJECTS;

  protected readonly steps = [
    {
      title: 'Pick a project',
      body: 'Start with an issue labelled good first issue. Every repo keeps a few open on purpose.',
    },
    {
      title: 'Fork and branch',
      body: 'Work on a branch named after what you are changing, so the pull request explains itself.',
    },
    {
      title: 'Open a pull request',
      body: 'Small and focused beats large and perfect. Describe what changed and why it matters.',
    },
    {
      title: 'Review together',
      body: 'A maintainer reviews with you, not at you. Feedback is how the whole community levels up.',
    },
  ];
}
