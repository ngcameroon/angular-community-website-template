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
    installCommand: 'npm install ngx-transforms',
  },
  {
    id: 'community-template',
    name: 'angular-community-template',
    tagline: 'A website template any Angular community can fork',
    description:
      'The site you are reading, turned into a starting point. Angular 21 with SSR, prerendering, and Tailwind CSS 4, plus a roadmap timeline and a meetups scheduler. Change one config file to make it yours.',
    maintainer: 'Angular Cameroon',
    status: 'building',
    icon: 'templates',
    accent: 'oklch(53.18% 0.28 296.97)',
    tags: ['Angular 21', 'SSR + prerender', 'Tailwind 4', 'Config driven'],
    repoUrl: 'https://github.com/ngcameroon/angular-community-template',
    npmUrl: null,
    installCommand: 'npx degit ngcameroon/angular-community-template my-community',
  },
];
