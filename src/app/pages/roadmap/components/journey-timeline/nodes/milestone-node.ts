import { Component, computed, input } from '@angular/core';
import {
  NgDiagramNodeSelectedDirective,
  NgDiagramPortComponent,
  type NgDiagramNodeTemplate,
  type SimpleNode,
} from 'ng-diagram';
import { IconComponent } from '../../../../../shared/components/icon/icon';
import type { MilestoneNodeData } from '../journey-layout';

@Component({
  selector: 'app-milestone-node',
  imports: [NgDiagramPortComponent, IconComponent],
  hostDirectives: [{ directive: NgDiagramNodeSelectedDirective, inputs: ['node'] }],
  template: `
    <article class="milestone" [style.--accent]="data().accent">
      <span class="glyph" aria-hidden="true"><app-icon [name]="data().glyph" /></span>
      <div class="body">
        <span class="eyebrow">{{ data().eyebrow }}</span>
        <h3 class="title">{{ data().title }}</h3>
        <p class="description">{{ data().description }}</p>
      </div>
    </article>

    <ng-diagram-port [id]="'top'" [side]="'top'" [type]="'both'" />
    <ng-diagram-port [id]="'bottom'" [side]="'bottom'" [type]="'both'" />
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    ng-diagram-port {
      opacity: 0;
      pointer-events: none;
    }

    .milestone {
      position: relative;
      display: flex;
      height: 100%;
      align-items: flex-start;
      gap: 0.75rem;
      overflow: hidden;
      border-radius: 0.875rem;
      border: 1px dashed color-mix(in oklch, var(--accent) 45%, transparent);
      background:
        radial-gradient(
          120% 140% at 0% 0%,
          color-mix(in oklch, var(--accent) 14%, transparent) 0%,
          transparent 60%
        ),
        #14141c;
      padding: 0.875rem 1rem;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    }

    .glyph {
      display: grid;
      height: 2.25rem;
      width: 2.25rem;
      flex-shrink: 0;
      place-items: center;
      border-radius: 0.625rem;
      border: 1px solid color-mix(in oklch, var(--accent) 28%, transparent);
      background: color-mix(in oklch, var(--accent) 14%, transparent);
      color: var(--accent);
      font-size: 1.125rem;
    }

    .body {
      min-width: 0;
    }

    .eyebrow {
      font-size: 0.5625rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--accent);
    }

    .title {
      margin-top: 0.0625rem;
      font-family: var(--font-display, 'Inter Tight', sans-serif);
      font-size: 1.0625rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.2;
      color: #f0f0f2;
    }

    .description {
      margin-top: 0.3125rem;
      font-size: 0.75rem;
      line-height: 1.45;
      color: #a1a1aa;
      text-wrap: pretty;
    }
  `,
})
export class MilestoneNodeComponent implements NgDiagramNodeTemplate<MilestoneNodeData> {
  readonly node = input.required<SimpleNode<MilestoneNodeData>>();

  protected readonly data = computed(() => this.node().data);
}
