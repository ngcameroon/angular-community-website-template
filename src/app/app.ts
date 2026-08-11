import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { COMMUNITY } from './core/community.config';

const META_DESCRIPTIONS: Record<string, string> = {
  '/': COMMUNITY.description,
  '/roadmap': `Explore the ${COMMUNITY.name} community roadmap and the sessions we run each week.`,
  '/open-source': `Open source Angular projects built by the ${COMMUNITY.name} community.`,
  '/meetups': `Upcoming ${COMMUNITY.name} meetups, workshops, and developer events in ${COMMUNITY.city}.`,
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        const desc = META_DESCRIPTIONS[event.urlAfterRedirects] ?? META_DESCRIPTIONS['/'];
        this.meta.updateTag({ name: 'description', content: desc });
      });
  }
}
