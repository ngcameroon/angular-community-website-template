import type { IconName } from '../../shared/components/icon/icon';

export type MeetupCategory =
  | 'Core Architecture'
  | 'Reactive Logic'
  | 'Forms & State'
  | 'Advanced Features'
  | 'Community Build';

export interface Meetup {
  readonly id: string;
  readonly weekNumber: number;
  /** Session day, YYYY-MM-DD. Combined with the series time slot to get exact times. */
  readonly date: string;
  readonly formattedDate: string;
  readonly theme: string;
  readonly description: string;
  readonly phase: string;
  readonly category: MeetupCategory;
  readonly icon: IconName;
  readonly topics: readonly string[];
  /** Filled in once the registration link for a session exists. */
  readonly registrationUrl: string | null;
}

export const MEETUP_SERIES = {
  title: 'Angular Cameroon H2 2026 Community Roadmap',
  location: 'Yaoundé, Cameroon',
  timeSlot: '20:00 - 21:00 WAT (GMT+1)',
  frequency: 'Every Thursday Evening',
  launchDate: '2026-08-06',
} as const;

const START_TIME = '20:00';
const END_TIME = '21:00';
const UTC_OFFSET = '+01:00';

export const startOf = (meetup: Meetup): number =>
  Date.parse(`${meetup.date}T${START_TIME}:00${UTC_OFFSET}`);

export const endOf = (meetup: Meetup): number =>
  Date.parse(`${meetup.date}T${END_TIME}:00${UTC_OFFSET}`);

export const CATEGORY_ACCENT: Record<MeetupCategory, string> = {
  'Core Architecture': 'oklch(63.32% 0.24 31.68)',
  'Reactive Logic': 'oklch(69.02% 0.277 332.77)',
  'Forms & State': 'oklch(53.18% 0.28 296.97)',
  'Advanced Features': 'oklch(51.01% 0.274 263.83)',
  'Community Build': '#007A5E',
};

export const MEETUPS: readonly Meetup[] = [
  {
    id: 'week-01',
    weekNumber: 1,
    date: '2026-08-06',
    formattedDate: 'Thursday, Aug 6, 2026',
    theme: 'Architecture Overview & Environment Setup',
    description:
      'Exploration of modern standalone architecture, Angular CLI best practices, workspace setup, and modular project directory structure.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Core Architecture',
    icon: 'architecture',
    topics: [
      'Standalone Components',
      'Angular CLI Workflows',
      'Directory Organization',
      'Environment Config',
    ],
    registrationUrl: 'https://calendar.app.google/VLYT1Qr65avZ5AFJ6',
  },
  {
    id: 'week-02',
    weekNumber: 2,
    date: '2026-08-13',
    formattedDate: 'Thursday, Aug 13, 2026',
    theme: 'Component Architecture & Lifecycle Hooks',
    description:
      'Mastering component interaction patterns using modern @Input and @Output decorators/functions and understanding lifecycle hook execution order.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Core Architecture',
    icon: 'components',
    topics: [
      'Component Trees',
      'Inputs & Outputs',
      'Lifecycle Hooks',
      'Container vs Presentational',
    ],
    registrationUrl: null,
  },
  {
    id: 'week-03',
    weekNumber: 3,
    date: '2026-08-20',
    formattedDate: 'Thursday, Aug 20, 2026',
    theme: 'Advanced Templates & Content Projection',
    description:
      'Deep dive into Angular built-in control flow (@if, @for, @switch), template variables, and multi-slot content projection using ng-content.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Core Architecture',
    icon: 'templates',
    topics: [
      'Built-in Control Flow',
      'ng-content Projection',
      'Template Ref Variables',
      'Slot Architecture',
    ],
    registrationUrl: null,
  },
  {
    id: 'week-04',
    weekNumber: 4,
    date: '2026-08-27',
    formattedDate: 'Thursday, Aug 27, 2026',
    theme: 'Structural & Attribute Directives',
    description:
      'Building custom attribute and structural directives to encapsulate low-level DOM manipulation, host bindings, and reusable UI behaviors.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Core Architecture',
    icon: 'directives',
    topics: [
      'Custom Directives',
      'HostBinding & HostListener',
      'TemplateRef & ViewContainerRef',
      'DOM Manipulation',
    ],
    registrationUrl: null,
  },
  {
    id: 'week-05',
    weekNumber: 5,
    date: '2026-09-03',
    formattedDate: 'Thursday, Sep 3, 2026',
    theme: 'Reactive Programming with Signals & RxJS',
    description:
      'Transitioning to fine-grained reactivity using Angular Signals (signal, computed, effect) alongside traditional RxJS observable streams.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Reactive Logic',
    icon: 'signals',
    topics: [
      'Writable & Computed Signals',
      'Signal Effects',
      'RxJS Interop (toSignal/toObservable)',
      'State Reactivity',
    ],
    registrationUrl: null,
  },
  {
    id: 'week-06',
    weekNumber: 6,
    date: '2026-09-10',
    formattedDate: 'Thursday, Sep 10, 2026',
    theme: 'Dependency Injection & Modular Service Design',
    description:
      'Understanding injector hierarchies, resolution modifiers, custom InjectionTokens, and designing scalable singleton and scoped services.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Core Architecture',
    icon: 'injection',
    topics: ['Injector Hierarchy', 'inject() Function', 'Injection Tokens', 'Provider Scopes'],
    registrationUrl: null,
  },
  {
    id: 'week-07',
    weekNumber: 7,
    date: '2026-09-17',
    formattedDate: 'Thursday, Sep 17, 2026',
    theme: 'Form Management',
    description:
      'Building robust data entry interfaces with Reactive Forms, dynamic FormArrays, custom sync/async validators, and modern Signal Forms previews.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Forms & State',
    icon: 'forms',
    topics: ['FormBuilder & FormGroup', 'FormArray', 'Custom Validation', 'Signal Forms'],
    registrationUrl: null,
  },
  {
    id: 'week-08',
    weekNumber: 8,
    date: '2026-09-24',
    formattedDate: 'Thursday, Sep 24, 2026',
    theme: 'Routing & Navigation Patterns',
    description:
      'Configuring SPA routing, route parameters, functional guards (canActivate), resolvers, and lazy loading standalone feature components.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Forms & State',
    icon: 'routing',
    topics: ['Functional Guards', 'Lazy Loading', 'Resolvers', 'Route Parameters & Inputs'],
    registrationUrl: null,
  },
  {
    id: 'week-09',
    weekNumber: 9,
    date: '2026-10-01',
    formattedDate: 'Thursday, Oct 1, 2026',
    theme: 'State Management & Data Persistence',
    description:
      'Integrating HttpClient, managing HTTP request headers with Interceptors, error handling, and implementing lightweight reactive state stores.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Forms & State',
    icon: 'database',
    topics: ['HttpClient API', 'HttpInterceptors', 'Error Interception', 'Local State Management'],
    registrationUrl: null,
  },
  {
    id: 'week-10',
    weekNumber: 10,
    date: '2026-10-08',
    formattedDate: 'Thursday, Oct 8, 2026',
    theme: 'Performance Optimization & Testing Strategies',
    description:
      'Optimizing render performance using @defer block syntax, ChangeDetectionStrategy.OnPush, and writing unit tests with Vitest / Jasmine.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Advanced Features',
    icon: 'testing',
    topics: ['@defer Lazy Views', 'OnPush Change Detection', 'Unit Testing', 'Component Harnesses'],
    registrationUrl: null,
  },
  {
    id: 'week-11',
    weekNumber: 11,
    date: '2026-10-15',
    formattedDate: 'Thursday, Oct 15, 2026',
    theme: 'Server-Side Rendering (SSR) & Hydration',
    description:
      'Implementing SSR in Angular applications, understanding event replay, DOM hydration strategies, SEO metadata, and server-side lifecycle rules.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Advanced Features',
    icon: 'cloud',
    topics: [
      'Angular SSR Engine',
      'Non-destructive Hydration',
      'Meta & Title Services',
      'Server Build Output',
    ],
    registrationUrl: null,
  },
  {
    id: 'week-12',
    weekNumber: 12,
    date: '2026-10-22',
    formattedDate: 'Thursday, Oct 22, 2026',
    theme: 'Capstone: AI Integration & Deployment',
    description:
      'Building an AI-powered Angular feature connecting to LLM APIs, handling streaming responses in UI, production bundling, and CI/CD deployment.',
    phase: 'Phase 1: The Angular Journey',
    category: 'Advanced Features',
    icon: 'ai',
    topics: [
      'LLM API Integration',
      'Streaming Response UI',
      'Production Bundling',
      'CI/CD & Hosting Deployment',
    ],
    registrationUrl: null,
  },
  {
    id: 'phase2-01',
    weekNumber: 13,
    date: '2026-10-29',
    formattedDate: 'Thursday, Oct 29, 2026',
    theme: 'Open-Source Scoping & Team Formation',
    description:
      'Kickoff for Phase 2: pitching community project proposals (Component Libraries, CLI tools), organizing working groups, and repository setup.',
    phase: 'Phase 2: Open Source Pathway',
    category: 'Community Build',
    icon: 'rocket',
    topics: [
      'Project Selection',
      'Team Assignment',
      'Monorepo Architecture',
      'Contribution Guidelines',
    ],
    registrationUrl: null,
  },
  {
    id: 'phase2-02',
    weekNumber: 15,
    date: '2026-11-12',
    formattedDate: 'Thursday, Nov 12, 2026',
    theme: 'Sprint 1: Core Scaffolding & Design System',
    description:
      'Reviewing base pull requests, establishing library API contracts, building primitive UI components, and configuring automated test suites.',
    phase: 'Phase 2: Open Source Pathway',
    category: 'Community Build',
    icon: 'tools',
    topics: [
      'Component Primitive API',
      'Design System Tokens',
      'Automated CI Workflows',
      'Peer PR Reviews',
    ],
    registrationUrl: null,
  },
  {
    id: 'phase2-03',
    weekNumber: 17,
    date: '2026-11-26',
    formattedDate: 'Thursday, Nov 26, 2026',
    theme: 'Sprint 2: Feature Implementation & Docs',
    description:
      'Advancing complex component features, writing interactive documentation sites, npm packaging preparations, and accessibility audits.',
    phase: 'Phase 2: Open Source Pathway',
    category: 'Community Build',
    icon: 'docs',
    topics: ['Complex Widgets', 'Documentation App', 'Accessibility (ARIA)', 'npm Package Config'],
    registrationUrl: null,
  },
  {
    id: 'phase2-04',
    weekNumber: 20,
    date: '2026-12-17',
    formattedDate: 'Thursday, Dec 17, 2026',
    theme: 'H2 2026 Community Showcase & Release',
    description:
      'Celebrating the H2 journey, demonstrating open-source libraries built by community teams, releasing v1.0 packages, and awarding contributor certificates.',
    phase: 'Phase 2: Open Source Pathway',
    category: 'Community Build',
    icon: 'trophy',
    topics: [
      'Live Demos',
      'v1.0 Release Announcement',
      'Community Recognition',
      '2027 Roadmap Preview',
    ],
    registrationUrl: null,
  },
];
