import { Routes } from '@angular/router';
import { COMMUNITY } from './core/community.config';

const suffix = ` | ${COMMUNITY.name}`;

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    title: `${COMMUNITY.name}: Empowering Angular Developers in ${COMMUNITY.country}`,
  },
  {
    path: 'roadmap',
    loadComponent: () => import('./pages/roadmap/roadmap').then(m => m.RoadmapComponent),
    title: `Roadmap${suffix}`,
  },
  {
    path: 'open-source',
    loadComponent: () => import('./pages/open-source/open-source').then(m => m.OpenSourceComponent),
    title: `Open Source${suffix}`,
  },
  {
    path: 'meetups',
    loadComponent: () => import('./pages/meetups/meetups').then(m => m.MeetupsComponent),
    title: `Meetups & Events${suffix}`,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
