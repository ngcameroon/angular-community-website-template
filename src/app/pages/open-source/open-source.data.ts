import type { IconName } from '../../shared/components/icon/icon';

export type ProjectStatus = 'live' | 'building' | 'planned';

export interface OpenSourceProject {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly maintainer: string;
  readonly status: ProjectStatus;
  readonly icon: IconName;
  readonly accent: string;
  readonly tags: readonly string[];
  readonly repoUrl: string;
  readonly npmUrl: string | null;
  readonly docsUrl: string | null;
  readonly demoUrl: string | null;
  readonly installCommand: string | null;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Live',
  building: 'In progress',
  planned: 'Planned',
};

export const OPEN_SOURCE_PROJECTS: readonly OpenSourceProject[] = [
  {
    id: 'ngx-transforms',
    name: 'ngx-transforms',
    tagline: 'Declarative data transformations for Angular templates',
    description:
      'A lightweight library of pipe-based utilities for formatting, filtering, and transforming data straight in your templates, with zero boilerplate. Born in this community and now part of the ngCameroon ecosystem.',
    maintainer: 'mofirojean',
    status: 'live',
    icon: 'package',
    accent: 'oklch(63.32% 0.24 31.68)',
    tags: ['Standalone pipes', 'Tree-shakable', 'Signals ready', 'Fully typed'],
    repoUrl: 'https://github.com/mofirojean/ngx-transforms',
    npmUrl: 'https://www.npmjs.com/package/ngx-transforms',
    docsUrl: null,
    demoUrl: null,
    installCommand: 'npm install ngx-transforms',
  },
  {
    id: 'angular-ui-skills',
    name: 'angular-ui-skills',
    tagline: 'Agent skills that teach AI assistants to build Angular UIs',
    description:
      'Per-library agent skills for Claude Code, Cursor, Copilot, and Gemini, covering Spartan/ng, PrimeNG, NG-ZORRO, and Angular Material, plus a cross-cutting design discipline skill. Composes with the angular-developer base skill.',
    maintainer: 'mofirojean',
    status: 'live',
    icon: 'ai',
    accent: 'oklch(69.02% 0.277 332.77)',
    tags: ['Agent skills', 'Spartan/ng', 'PrimeNG', 'Material & ZORRO'],
    repoUrl: 'https://github.com/mofirojean/angular-ui-skills',
    npmUrl: null,
    docsUrl: 'https://angular-ui-skills-docs.vercel.app',
    demoUrl: null,
    installCommand: 'npx skills@latest add mofirojean/angular-ui-skills -g',
  },
  {
    id: 'community-template',
    name: 'angular-community-website-template',
    tagline: 'A website template any Angular community can fork',
    description:
      'The site you are reading, turned into a starting point. Angular 21 with SSR, prerendering, and Tailwind CSS 4, plus a roadmap timeline and a meetups scheduler. Change one config file to make it yours.',
    maintainer: 'Angular Cameroon',
    status: 'building',
    icon: 'templates',
    accent: 'oklch(53.18% 0.28 296.97)',
    tags: ['Angular 21', 'SSR + prerender', 'Tailwind 4', 'Config driven'],
    repoUrl: 'https://github.com/ngcameroon/angular-community-website-template',
    npmUrl: null,
    docsUrl: null,
    demoUrl: 'https://template.ngcameroon.com',
    installCommand: 'npx degit ngcameroon/angular-community-website-template my-community',
  },
];
