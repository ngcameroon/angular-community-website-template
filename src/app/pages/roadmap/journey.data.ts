/**
 * Curriculum for the 12-Week Angular Journey, mirroring
 * https://github.com/ngcameroon/journey-2026.
 *
 * `status` is declared by hand rather than derived from today's date so the
 * prerendered page and the hydrated page always agree. Flip a week to
 * 'in-progress' on session day and 'complete' once the recording is published.
 */

export type JourneyStatus = 'upcoming' | 'in-progress' | 'complete';

export interface JourneyWeek {
  readonly week: number;
  readonly dateLabel: string;
  readonly isoDate: string;
  readonly title: string;
  readonly folder: string;
  readonly focus: readonly string[];
  readonly phase: number;
  readonly status: JourneyStatus;
}

export interface JourneyPhase {
  readonly id: number;
  readonly name: string;
  readonly summary: string;
  readonly accent: string;
  readonly weeks: readonly number[];
}

export const JOURNEY_REPO = 'https://github.com/ngcameroon/journey-2026';

export const JOURNEY_PHASES: readonly JourneyPhase[] = [
  {
    id: 1,
    name: 'Foundations',
    summary:
      'How an Angular application is wired together, and how components compose into a tree you can reason about.',
    accent: 'oklch(63.32% 0.24 31.68)',
    weeks: [1, 2, 3],
  },
  {
    id: 2,
    name: 'Composition & Reactivity',
    summary:
      'Extend the template language with your own directives, then make state flow predictably through signals and injection.',
    accent: 'oklch(69.02% 0.277 332.77)',
    weeks: [4, 5, 6],
  },
  {
    id: 3,
    name: 'Application Architecture',
    summary:
      'The parts every real product needs: forms users can trust, routes that scale, and server data you can cache.',
    accent: 'oklch(53.18% 0.28 296.97)',
    weeks: [7, 8, 9],
  },
  {
    id: 4,
    name: 'Production & AI',
    summary:
      'Ship it. Measure and test the app, render it on the server, then deploy a capstone with AI in the loop.',
    accent: 'oklch(51.01% 0.274 263.83)',
    weeks: [10, 11, 12],
  },
];

export const JOURNEY_WEEKS: readonly JourneyWeek[] = [
  {
    week: 1,
    dateLabel: 'Aug 06',
    isoDate: '2026-08-06',
    title: 'Architecture Overview & Setup',
    folder: 'week-01-architecture',
    focus: ['Standalone APIs', 'Angular CLI', 'Project structure'],
    phase: 1,
    status: 'upcoming',
  },
  {
    week: 2,
    dateLabel: 'Aug 13',
    isoDate: '2026-08-13',
    title: 'Components & Lifecycle Hooks',
    folder: 'week-02-components',
    focus: ['Component tree', 'Inputs & outputs', 'Lifecycle order'],
    phase: 1,
    status: 'upcoming',
  },
  {
    week: 3,
    dateLabel: 'Aug 20',
    isoDate: '2026-08-20',
    title: 'Templates & Content Projection',
    folder: 'week-03-templates',
    focus: ['Control flow', 'ng-content', 'Structural slots'],
    phase: 1,
    status: 'upcoming',
  },
  {
    week: 4,
    dateLabel: 'Aug 27',
    isoDate: '2026-08-27',
    title: 'Structural & Attribute Directives',
    folder: 'week-04-directives',
    focus: ['Custom directives', 'Host bindings', 'DOM control'],
    phase: 2,
    status: 'upcoming',
  },
  {
    week: 5,
    dateLabel: 'Sep 03',
    isoDate: '2026-09-03',
    title: 'Signals & RxJS',
    folder: 'week-05-signals-rxjs',
    focus: ['Writable signals', 'Computed state', 'RxJS interop'],
    phase: 2,
    status: 'upcoming',
  },
  {
    week: 6,
    dateLabel: 'Sep 10',
    isoDate: '2026-09-10',
    title: 'Dependency Injection & Services',
    folder: 'week-06-dependency-injection',
    focus: ['Injectors', 'Provider hierarchy', 'Injection tokens'],
    phase: 2,
    status: 'upcoming',
  },
  {
    week: 7,
    dateLabel: 'Sep 17',
    isoDate: '2026-09-17',
    title: 'Form Management',
    folder: 'week-07-forms',
    focus: ['Reactive forms', 'Custom validators', 'Signal Forms'],
    phase: 3,
    status: 'upcoming',
  },
  {
    week: 8,
    dateLabel: 'Sep 24',
    isoDate: '2026-09-24',
    title: 'Routing & Navigation',
    folder: 'week-08-routing',
    focus: ['Functional guards', 'Resolvers', 'Lazy loading'],
    phase: 3,
    status: 'upcoming',
  },
  {
    week: 9,
    dateLabel: 'Oct 01',
    isoDate: '2026-10-01',
    title: 'State & Data Persistence',
    folder: 'week-09-state-http',
    focus: ['HttpClient', 'Interceptors', 'Local state'],
    phase: 3,
    status: 'upcoming',
  },
  {
    week: 10,
    dateLabel: 'Oct 08',
    isoDate: '2026-10-08',
    title: 'Performance & Testing',
    folder: 'week-10-performance-testing',
    focus: ['@defer', 'Change detection', 'Vitest'],
    phase: 4,
    status: 'upcoming',
  },
  {
    week: 11,
    dateLabel: 'Oct 15',
    isoDate: '2026-10-15',
    title: 'SSR & Hydration',
    folder: 'week-11-ssr-hydration',
    focus: ['Angular SSR', 'Hydration', 'SEO'],
    phase: 4,
    status: 'upcoming',
  },
  {
    week: 12,
    dateLabel: 'Oct 22',
    isoDate: '2026-10-22',
    title: 'Capstone: AI Integration & Deployment',
    folder: 'week-12-ai-capstone',
    focus: ['AI APIs', 'Production builds', 'CI/CD'],
    phase: 4,
    status: 'upcoming',
  },
];

export function phaseOf(week: JourneyWeek): JourneyPhase {
  const phase = JOURNEY_PHASES.find((p) => p.id === week.phase);
  if (!phase) {
    throw new Error(`Week ${week.week} references unknown phase ${week.phase}`);
  }
  return phase;
}

export function repoUrlFor(week: JourneyWeek): string {
  return `${JOURNEY_REPO}/tree/main/${week.folder}`;
}
