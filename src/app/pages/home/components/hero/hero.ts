import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMMUNITY } from '../../../../core/community.config';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero-section relative overflow-hidden">
      <!-- === Layered animated background === -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="hero-glow"></div>

        <!-- Animated SVG grid -->
        <svg class="hero-pattern" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-grid" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <path d="M 22 0 L 0 0 0 22" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        <!-- Spinning conic orb -->
        <div class="hero-conic-orb"></div>

        <!-- Floating Angular triangles -->
        <svg class="hero-triangle hero-triangle--right" viewBox="0 0 200 200">
          <polygon points="100,15 185,175 15,175" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="500" stroke-dashoffset="0" />
        </svg>
        <svg class="hero-triangle hero-triangle--left" viewBox="0 0 200 200">
          <polygon points="100,15 185,175 15,175" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>

        <!-- Floating particles -->
        <div class="hero-particle hero-particle--1"></div>
        <div class="hero-particle hero-particle--2"></div>
        <div class="hero-particle hero-particle--3"></div>

        <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-page-bg to-transparent"></div>
      </div>

      <!-- === Content === -->
      <div class="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center text-center">
          <!-- Heading -->
          <h1 class="hero-heading hero-animate hero-animate--1 font-display max-w-5xl font-extrabold tracking-tight">
            Empowering the
            <span class="gradient-text">Next Generation</span>
            of Angular Developers in
            <span class="gradient-text-accent">{{ community.country }}</span>
          </h1>

          <!-- Subtitle -->
          <p class="hero-subtitle hero-animate hero-animate--2 mx-auto mt-6 max-w-2xl text-text-secondary">
            {{ community.tagline }} Join us by contributing to open source, attending meetups,
            and shaping the future of web development in {{ community.country }}.
          </p>

          <!-- CTAs -->
          <div class="hero-animate hero-animate--3 mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <a
              [href]="community.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-gradient-outline w-full sm:w-auto"
            >
              <span class="btn-label flex items-center gap-2">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Join the Community
              </span>
            </a>
            <a routerLink="/roadmap" class="btn-secondary w-full sm:w-auto">
              Explore the 2026 Roadmap
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <!-- Socials -->
          <div class="hero-animate hero-animate--3 mt-5 flex items-center gap-2.5">
            <a
              [href]="linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="social"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.125 2.062 2.062 0 010 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
              LinkedIn
            </a>
            <a
              [href]="xUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="social"
            >
              <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z"/>
              </svg>
              X
            </a>
          </div>

          <!-- Stats -->
          <div class="hero-animate hero-animate--4 mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 sm:mt-20 sm:gap-6 md:grid-cols-4">
            @for (stat of stats; track stat.label; let i = $index) {
              <div class="stat-card" [style.animation-delay]="(0.6 + i * 0.1) + 's'">
                <span class="font-display text-xl font-bold text-text-primary sm:text-2xl md:text-3xl">{{ stat.value }}</span>
                <span class="mt-1 text-[0.65rem] tracking-widest text-text-muted uppercase sm:text-xs">{{ stat.label }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero-section {
      min-height: 100svh;
      display: flex;
      align-items: center;
      padding: 6rem 0 3rem;
    }

    @media (min-width: 640px) {
      .hero-section { padding: 7rem 0 5rem; }
    }

    .hero-heading {
      font-size: clamp(2rem, 5.5vw, 4.5rem);
      line-height: 1.08;
      letter-spacing: -0.03em;
    }

    .hero-subtitle {
      font-size: clamp(0.95rem, 2vw, 1.25rem);
      line-height: 1.7;
    }

    /* === Staggered entrance animations === */
    .hero-animate {
      opacity: 0;
      animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .hero-animate--1 { animation-delay: 0.1s; }
    .hero-animate--2 { animation-delay: 0.3s; }
    .hero-animate--3 { animation-delay: 0.5s; }
    .hero-animate--4 { animation-delay: 0.7s; }

    /* === Background layers === */
    .hero-glow {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 70% 50% at 50% -5%, oklch(59.91% .239 8.14 / 0.14) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 75% 20%, oklch(53.18% .28 296.97 / 0.08) 0%, transparent 50%),
        radial-gradient(ellipse 35% 35% at 15% 55%, rgba(0, 122, 94, 0.07) 0%, transparent 50%);
      animation: pulse-glow 8s ease-in-out infinite;
    }

    .hero-conic-orb {
      position: absolute;
      top: -30%;
      left: 50%;
      transform: translateX(-50%);
      width: min(900px, 120vw);
      height: min(900px, 120vw);
      border-radius: 50%;
      background: conic-gradient(
        from var(--angle, 0deg),
        oklch(63.32% .24 31.68 / 0.07),
        oklch(69.02% .277 332.77 / 0.04),
        oklch(53.18% .28 296.97 / 0.07),
        oklch(51.01% .274 263.83 / 0.04),
        oklch(63.32% .24 31.68 / 0.07)
      );
      filter: blur(60px);
      animation: spin-gradient 10s linear infinite;
    }

    .hero-pattern {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      animation: fade-in 2s ease 0.5s forwards;
    }

    /* === Floating triangles === */
    .hero-triangle {
      position: absolute;
      animation: float 12s ease-in-out infinite;
    }
    .hero-triangle--right {
      top: 10%;
      right: 8%;
      width: clamp(100px, 15vw, 220px);
      height: clamp(100px, 15vw, 220px);
      opacity: 0.04;
      color: oklch(69.02% .277 332.77);
    }
    .hero-triangle--left {
      bottom: 15%;
      left: 5%;
      width: clamp(70px, 10vw, 150px);
      height: clamp(70px, 10vw, 150px);
      opacity: 0.03;
      color: var(--color-accent-green);
      rotate: 20deg;
      animation: float-delayed 15s ease-in-out infinite;
    }

    /* === Floating particles === */
    .hero-particle {
      position: absolute;
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }
    .hero-particle--1 {
      top: 25%;
      left: 15%;
      width: 4px;
      height: 4px;
      background: oklch(69.02% .277 332.77 / 0.3);
      animation-duration: 7s;
    }
    .hero-particle--2 {
      top: 40%;
      right: 12%;
      width: 3px;
      height: 3px;
      background: var(--color-accent-gold);
      opacity: 0.3;
      animation: float-delayed 9s ease-in-out infinite;
    }
    .hero-particle--3 {
      bottom: 30%;
      right: 25%;
      width: 5px;
      height: 5px;
      background: oklch(63.32% .24 31.68 / 0.25);
      animation-duration: 11s;
    }

    /* === Socials === */
    .social {
      display: inline-flex;
      align-items: center;
      gap: 0.4375rem;
      padding: 0.4375rem 0.875rem;
      border-radius: 999px;
      border: 1px solid var(--color-border-subtle);
      background: var(--color-surface-card);
      color: var(--color-text-secondary);
      font-size: 0.8125rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .social:hover {
      color: var(--color-text-primary);
      border-color: rgba(255, 255, 255, 0.2);
      background: var(--color-surface-hover);
      transform: translateY(-2px);
    }

    /* === Stats === */
    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-radius: 0.75rem;
      background: var(--color-surface-card);
      border: 1px solid var(--color-border-card);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      opacity: 0;
      animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .stat-card:hover {
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    }
    @media (min-width: 640px) {
      .stat-card { padding: 1.5rem; }
    }
  `,
})
export class HeroComponent {
  protected readonly community = COMMUNITY;
  readonly stats = COMMUNITY.stats;

  protected readonly linkedinUrl =
    COMMUNITY.socials.find((s) => s.network === 'linkedin')?.url ?? COMMUNITY.githubUrl;
  protected readonly xUrl =
    COMMUNITY.socials.find((s) => s.network === 'x')?.url ?? COMMUNITY.githubUrl;
}
