import type { IconName } from '../shared/components/icon/icon';

/**
 * Everything that makes this site *yours*.
 *
 * Editing this file plus `public/brand/` is enough to rebrand the whole template.
 * Anything that could not live here (the static tags in `src/index.html`, the
 * colour palette in `src/styles.css`, and the page content under
 * `src/app/pages/*.data.ts`) is listed in the README under "Make it yours".
 */

export interface CommunitySocial {
  readonly label: string;
  readonly url: string;
  /** Which inline logo to draw. Add more in shared/components/social-icon. */
  readonly network: 'github' | 'x' | 'linkedin';
}

export interface CommunityStat {
  readonly value: string;
  readonly label: string;
}

export interface CommunityLink {
  readonly label: string;
  readonly url: string;
}

export const COMMUNITY = {
  /** Full name, used in copy and page titles. */
  name: 'Angular Community',

  /**
   * Wordmark shown in the navbar and footer. The suffix is rendered in the
   * brand gradient, so "ng" + "Community" reads as ngCommunity.
   */
  wordmark: { prefix: 'ng', suffix: 'Community' },

  /** One line under the hero heading. */
  tagline: 'We build, learn, and grow together.',

  /** Used for the meta description and the footer blurb. */
  description:
    'A community of Angular developers learning in the open, contributing to open source, and meeting regularly.',

  city: 'Your City',
  country: 'Your Country',

  /** Shown wherever session times are printed. */
  timezoneLabel: 'WAT (GMT+1)',
  /** UTC offset used to turn a session date into an exact instant. */
  utcOffset: '+01:00',

  /** Canonical origin, no trailing slash. Used for og:url and the sitemap. */
  siteUrl: 'https://your-community.example',

  /** Path inside `public/`. Swap the file, keep the path, and you are done. */
  logo: 'brand/logo.svg',

  /** The GitHub organisation behind the community. Drives the primary CTA. */
  githubUrl: 'https://github.com/your-org',

  /**
   * Repository shown by the header's star button, in `owner/name` form. It must be
   * public for the count to load. Set to null to hide the button entirely.
   */
  starRepo: 'ngcameroon/angular-community-website-template' as string | null,

  socials: [
    { label: 'GitHub', url: 'https://github.com/your-org', network: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/your-org', network: 'linkedin' },
    { label: 'X', url: 'https://x.com/your-org', network: 'x' },
  ] as readonly CommunitySocial[],

  /** The four figures in the hero. Keep them honest. */
  stats: [
    { value: '500+', label: 'Members' },
    { value: '12+', label: 'Meetups' },
    { value: '3', label: 'OSS Projects' },
    { value: '2026', label: 'Roadmap' },
  ] as readonly CommunityStat[],

  /** External links in the footer's Resources column. */
  resourceLinks: [
    { label: 'Angular Docs', url: 'https://angular.dev' },
    { label: 'Angular Blog', url: 'https://blog.angular.dev' },
    { label: 'Angular GitHub', url: 'https://github.com/angular/angular' },
  ] as readonly CommunityLink[],
} as const;

/**
 * The single project highlighted on the landing page. Point it at whatever your
 * community is proudest of; the full list lives on the Open Source page.
 */
export const FEATURED_PROJECT = {
  name: 'your-library',
  meta: 'v1.x · Angular 17+',
  author: 'your-maintainer',
  description:
    'One or two sentences on what this library does and why your community built it. Keep it concrete: what problem does it remove for the people installing it?',
  features: [
    'Standalone and tree-shakable',
    'Fully typed with strict generics',
    'Works with Angular Signals out of the box',
    'Comprehensive test coverage',
  ],
  installCommand: 'npm install your-library',
  importName: 'SomeThing',
  repoUrl: 'https://github.com/your-org/your-library',
  npmUrl: 'https://www.npmjs.com/package/your-library',
} as const;

/** Navigation shown in the navbar and the footer's Navigate column. */
export const NAV_LINKS: readonly { label: string; route: string; exact: boolean }[] = [
  { label: 'Home', route: '/', exact: true },
  { label: 'Roadmap', route: '/roadmap', exact: false },
  { label: 'Open Source', route: '/open-source', exact: false },
  { label: 'Meetups', route: '/meetups', exact: false },
];

/** The three cards on the home page. Icons come from the shared icon set. */
export const COMMUNITY_PILLARS: readonly {
  title: string;
  description: string;
  icon: IconName;
  iconBg: string;
  accent: string;
  tags: string[];
}[] = [
  {
    title: 'Relevant',
    description:
      'Stay ahead of the Angular ecosystem. We track the latest releases, migration paths, and best practices so our community is always current.',
    icon: 'broadcast',
    iconBg: 'linear-gradient(135deg, rgba(221,0,49,0.15), rgba(221,0,49,0.05))',
    accent: '#DD0031',
    tags: ['Angular 21', 'Signals', 'SSR'],
  },
  {
    title: 'Active',
    description:
      'Monthly meetups, weekly study groups, and hackathons. Consistent engagement builds lasting skills and stronger connections.',
    icon: 'signals',
    iconBg: 'linear-gradient(135deg, rgba(252,209,22,0.15), rgba(252,209,22,0.05))',
    accent: '#FCD116',
    tags: ['Meetups', 'Workshops', 'Hackathons'],
  },
  {
    title: 'Community-Focused',
    description:
      'By developers, for developers. Mentorship programs, code reviews, and open source contributions that lift everyone up.',
    icon: 'community',
    iconBg: 'linear-gradient(135deg, rgba(0,122,94,0.15), rgba(0,122,94,0.05))',
    accent: '#007A5E',
    tags: ['Mentorship', 'OSS', 'Code Reviews'],
  },
];
