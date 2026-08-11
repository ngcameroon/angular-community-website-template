import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../core/directives/scroll-reveal.directive';
import { IconComponent } from '../../../../shared/components/icon/icon';
import { COMMUNITY, FEATURED_PROJECT } from '../../../../core/community.config';

@Component({
  selector: 'app-open-source-spotlight',
  standalone: true,
  imports: [ScrollRevealDirective, IconComponent],
  template: `
    <section id="open-source" class="relative py-20 sm:py-28">
      <div class="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <header appReveal class="text-center">
          <span class="gradient-text text-sm font-semibold tracking-widest uppercase">
            Open Source
          </span>
          <h2 class="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built by the Community
          </h2>
        </header>

        <div appReveal [appRevealDelay]="150" class="mx-auto mt-14 max-w-4xl sm:mt-16">
          <article class="gradient-border-card group">
            <div
              class="h-1"
              style="background: linear-gradient(90deg, oklch(63.32% .24 31.68), oklch(69.02% .277 332.77), oklch(53.18% .28 296.97))"
            ></div>

            <div class="p-6 sm:p-8 lg:p-10">
              <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                <div class="flex-1">
                  <div class="flex items-center gap-3">
                    <div
                      class="flex h-11 w-11 items-center justify-center rounded-xl text-angular-red transition-transform duration-500 group-hover:scale-110"
                      style="background: linear-gradient(135deg, rgba(221,0,49,0.15), rgba(221,0,49,0.05));"
                    >
                      <app-icon class="h-5 w-5" name="package" />
                    </div>
                    <div>
                      <h3 class="font-display text-xl font-bold sm:text-2xl">{{ project.name }}</h3>
                      <span class="text-xs text-text-muted font-mono">{{ project.meta }}</span>
                    </div>
                  </div>

                  <div
                    class="mt-4 inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-accent-green/5 px-3 py-1"
                  >
                    <app-icon class="h-3.5 w-3.5 text-accent-green" name="community" />
                    <span class="text-xs font-medium text-accent-green">
                      Community project by <strong>{{ project.author }}</strong>
                    </span>
                  </div>

                  <p class="mt-4 text-sm text-text-secondary leading-relaxed sm:text-base">
                    {{ project.description }}
                  </p>

                  <ul class="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                    @for (feature of project.features; track feature) {
                      <li class="flex items-start gap-2.5 text-sm text-text-secondary">
                        <svg
                          class="mt-0.5 h-4 w-4 shrink-0 text-accent-green"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2.5"
                          aria-hidden="true"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {{ feature }}
                      </li>
                    }
                  </ul>
                </div>

                <div class="w-full lg:w-80">
                  <div
                    class="overflow-hidden rounded-xl border border-border-subtle bg-page-bg transition-all duration-500 group-hover:shadow-lg group-hover:shadow-black/20"
                  >
                    <div class="flex items-center gap-1.5 border-b border-border-subtle px-4 py-2.5">
                      <span class="h-2.5 w-2.5 rounded-full bg-angular-red/40"></span>
                      <span class="h-2.5 w-2.5 rounded-full bg-accent-gold/40"></span>
                      <span class="h-2.5 w-2.5 rounded-full bg-accent-green/40"></span>
                      <span class="ml-2 text-xs text-text-muted font-mono">terminal</span>
                    </div>
                    <div class="p-4 font-mono text-sm">
                      <div>
                        <span class="text-accent-green">$</span>
                        <span class="text-text-secondary ml-2">{{ project.installCommand }}</span>
                      </div>
                      <div class="mt-3 text-xs">
                        <span class="text-accent-green">$</span>
                        <span class="text-text-muted ml-2">// Use in your component</span>
                      </div>
                      <pre class="mt-1 text-xs leading-relaxed"><span class="text-electric-violet">import</span> <span class="text-text-primary">{{ '{' }} {{ project.importName }} {{ '}' }}</span>
  <span class="text-electric-violet">from</span> <span class="text-accent-green">'{{ project.name }}'</span>;</pre>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:mt-8 sm:flex-row sm:pt-8">
                <a
                  [href]="project.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-primary w-full sm:w-auto"
                >
                  View on GitHub
                </a>
                <a
                  [href]="project.npmUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-secondary w-full sm:w-auto"
                >
                  View on npm
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
})
export class OpenSourceSpotlightComponent {
  protected readonly community = COMMUNITY;
  protected readonly project = FEATURED_PROJECT;
}
