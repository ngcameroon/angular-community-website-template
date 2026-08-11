import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { CommunityPulseComponent } from './components/community-pulse/community-pulse';
import { OpenSourceSpotlightComponent } from './components/open-source-spotlight/open-source-spotlight';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CommunityPulseComponent, OpenSourceSpotlightComponent],
  template: `
    <app-hero />
    <app-community-pulse />
    <app-open-source-spotlight />
  `,
})
export class HomeComponent {}