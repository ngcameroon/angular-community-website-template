import { Component, input } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon';
import { STATUS_LABEL, type OpenSourceProject } from '../../open-source.data';

@Component({
  selector: 'app-project-card',
  imports: [IconComponent],
  template: `
    @let item = project();
    <article class="card" [style.--accent]="item.accent">
      <span class="rail" aria-hidden="true"></span>

      <header class="head">
        <span class="badge" aria-hidden="true"><app-icon [name]="item.icon" /></span>
        <div class="ident">
          <h3 class="name">{{ item.name }}</h3>
          <p class="tagline">{{ item.tagline }}</p>
        </div>
        <span class="status" [attr.data-status]="item.status">{{ statusLabel[item.status] }}</span>
      </header>

      <p class="description">{{ item.description }}</p>

      <ul class="tags">
        @for (tag of item.tags; track $index) {
          <li>{{ tag }}</li>
        }
      </ul>

      @if (item.installCommand) {
        <div class="terminal">
          <span class="prompt" aria-hidden="true">$</span>
          <code>{{ item.installCommand }}</code>
        </div>
      }

      <footer class="foot">
        <span class="by">
          <app-icon class="by__icon" name="community" />
          {{ item.maintainer }}
        </span>
        <span class="links">
          <a [href]="item.repoUrl" target="_blank" rel="noopener noreferrer" class="link">
            GitHub
            <span aria-hidden="true">&rarr;</span>
          </a>
          @if (item.npmUrl) {
            <a [href]="item.npmUrl" target="_blank" rel="noopener noreferrer" class="link">
              npm
              <span aria-hidden="true">&rarr;</span>
            </a>
          }
          @if (item.docsUrl) {
            <a [href]="item.docsUrl" target="_blank" rel="noopener noreferrer" class="link">
              Docs
              <span aria-hidden="true">&rarr;</span>
            </a>
          }
        </span>
      </footer>
    </article>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }
    .card {
      position: relative;
      display: flex;
      height: 100%;
      flex-direction: column;
      overflow: hidden;
      border-radius: 0.875rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: var(--color-surface-card, #16161f);
      padding: 1.375rem 1.375rem 1.125rem 1.625rem;
      transition:
        transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        border-color 0.35s ease,
        box-shadow 0.35s ease;
    }
    .card:hover {
      transform: translateY(-3px);
      border-color: color-mix(in oklch, var(--accent) 45%, transparent);
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.3),
        0 18px 44px rgba(0, 0, 0, 0.45);
    }
    .rail {
      position: absolute;
      inset: 0 auto 0 0;
      width: 3px;
      background: linear-gradient(
        to bottom,
        var(--accent),
        color-mix(in oklch, var(--accent) 25%, transparent)
      );
    }
    .head {
      display: flex;
      align-items: flex-start;
      gap: 0.875rem;
    }
    .badge {
      display: grid;
      height: 2.5rem;
      width: 2.5rem;
      flex-shrink: 0;
      place-items: center;
      border-radius: 0.75rem;
      border: 1px solid color-mix(in oklch, var(--accent) 26%, transparent);
      background: color-mix(in oklch, var(--accent) 12%, transparent);
      color: var(--accent);
      font-size: 1.25rem;
    }
    .ident {
      min-width: 0;
      flex: 1;
    }
    .name {
      font-family: var(--font-mono, monospace);
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text-primary, #f0f0f2);
      overflow-wrap: anywhere;
    }
    .tagline {
      margin-top: 0.1875rem;
      font-size: 0.75rem;
      color: color-mix(in oklch, var(--accent) 70%, #a1a1aa);
    }
    .status {
      flex-shrink: 0;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 0.1875rem 0.5rem;
      font-size: 0.5625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-text-muted, #71717a);
      white-space: nowrap;
    }
    .status[data-status='live'] {
      border-color: rgba(0, 122, 94, 0.4);
      background: rgba(0, 122, 94, 0.12);
      color: #34d399;
    }
    .status[data-status='building'] {
      border-color: rgba(252, 209, 22, 0.35);
      background: rgba(252, 209, 22, 0.1);
      color: #fcd116;
    }
    .description {
      margin-top: 1rem;
      font-size: 0.8125rem;
      line-height: 1.65;
      color: var(--color-text-secondary, #a1a1aa);
      text-wrap: pretty;
    }
    .tags {
      margin-top: 0.875rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      list-style: none;
      padding: 0;
    }
    .tags li {
      border-radius: 0.3125rem;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.1875rem 0.4375rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.625rem;
      color: var(--color-text-muted, #71717a);
    }
    .terminal {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      overflow-x: auto;
      border-radius: 0.5rem;
      border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      background: var(--color-page-bg, #0f0f13);
      padding: 0.5rem 0.6875rem;
    }
    .prompt {
      color: var(--color-cameroon-green, #007a5e);
      font-family: var(--font-mono, monospace);
      font-size: 0.75rem;
    }
    .terminal code {
      font-family: var(--font-mono, monospace);
      font-size: 0.6875rem;
      color: var(--color-text-secondary, #a1a1aa);
      white-space: nowrap;
    }
    .foot {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      border-top: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
      padding-top: 0.875rem;
      margin-top: 1.25rem;
    }
    .by {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.6875rem;
      color: var(--color-text-muted, #71717a);
    }
    .by__icon {
      height: 0.8125rem;
      width: 0.8125rem;
    }
    .links {
      display: inline-flex;
      gap: 0.875rem;
    }
    .link {
      display: inline-flex;
      align-items: center;
      gap: 0.3125rem;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent);
      text-decoration: none;
      transition: gap 0.2s ease;
    }
    .link:hover {
      gap: 0.5625rem;
    }
    @media (prefers-reduced-motion: reduce) {
      .card,
      .link {
        transition: none;
      }
      .card:hover {
        transform: none;
      }
    }
  `,
})
export class ProjectCardComponent {
  readonly project = input.required<OpenSourceProject>();

  protected readonly statusLabel = STATUS_LABEL;
}
