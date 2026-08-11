import type { Edge, Node } from 'ng-diagram';
import type { IconName } from '../../../../shared/components/icon/icon';
import {
  JOURNEY_PHASES,
  JOURNEY_WEEKS,
  phaseOf,
  repoUrlFor,
  type JourneyPhase,
  type JourneyWeek,
} from '../../journey.data';

export const WEEK_NODE = 'journey-week';
export const MILESTONE_NODE = 'journey-milestone';

export interface WeekNodeData {
  readonly kind: 'week';
  readonly week: JourneyWeek;
  readonly phase: JourneyPhase;
  readonly repoUrl: string;
}

export interface MilestoneNodeData {
  readonly kind: 'milestone';
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly accent: string;
  readonly glyph: IconName;
}

export type JourneyNodeData = WeekNodeData | MilestoneNodeData;

export interface FlowRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface JourneyStop {
  readonly id: string;
  readonly label: string;
  readonly weekNumber: number | null;
}

export const START_NODE_ID = 'milestone-kickoff';
export const OSS_NODE_ID = 'milestone-open-source';

export const weekNodeId = (week: number) => `week-${week}`;

const NODE_W = 300;
const NODE_H = 172;
const GAP_X = 76;
const GAP_Y = 116;
const COLS = 4;

const MILESTONE_W = 300;
const START_H = 124;
const OSS_H = 152;

type PortSide = 'top' | 'right' | 'bottom' | 'left';

interface Cell {
  readonly row: number;
  readonly col: number;
}

interface Placement {
  readonly id: string;
  readonly type: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly data: JourneyNodeData;
}

/**
 * Serpentine grid: rows alternate direction so consecutive weeks are always
 * adjacent and the path never crosses itself.
 */
function cellFor(week: number): Cell {
  const index = week - 1;
  const row = Math.floor(index / COLS);
  const positionInRow = index % COLS;
  const col = row % 2 === 0 ? positionInRow : COLS - 1 - positionInRow;
  return { row, col };
}

const xFor = (col: number) => col * (NODE_W + GAP_X);
const yFor = (row: number) => row * (NODE_H + GAP_Y);

function portsBetween(from: Cell, to: Cell): { source: PortSide; target: PortSide } {
  if (from.row !== to.row) {
    return { source: 'bottom', target: 'top' };
  }
  return to.col > from.col
    ? { source: 'right', target: 'left' }
    : { source: 'left', target: 'right' };
}

function placements(): Placement[] {
  const firstCell = cellFor(1);
  const lastCell = cellFor(JOURNEY_WEEKS.length);

  const milestones: Placement[] = [
    {
      id: START_NODE_ID,
      type: MILESTONE_NODE,
      x: xFor(firstCell.col),
      y: yFor(firstCell.row) - (START_H + GAP_Y),
      width: MILESTONE_W,
      height: START_H,
      data: {
        kind: 'milestone',
        eyebrow: 'Kickoff',
        title: 'The Journey Begins',
        description: 'Thursday, August 6, 2026 at 19:00 WAT. Every session runs 60 minutes.',
        accent: JOURNEY_PHASES[0].accent,
        glyph: 'rocket',
      },
    },
    {
      id: OSS_NODE_ID,
      type: MILESTONE_NODE,
      x: xFor(lastCell.col),
      y: yFor(lastCell.row) + NODE_H + GAP_Y,
      width: MILESTONE_W,
      height: OSS_H,
      data: {
        kind: 'milestone',
        eyebrow: 'Milestone II',
        title: 'Open Source Pathway',
        description:
          'The journey flows into collaborative work: component libraries, CLI tools, and templates built by the community.',
        accent: JOURNEY_PHASES[3].accent,
        glyph: 'community',
      },
    },
  ];

  const weeks: Placement[] = JOURNEY_WEEKS.map((week) => {
    const { row, col } = cellFor(week.week);
    return {
      id: weekNodeId(week.week),
      type: WEEK_NODE,
      x: xFor(col),
      y: yFor(row),
      width: NODE_W,
      height: NODE_H,
      data: {
        kind: 'week',
        week,
        phase: phaseOf(week),
        repoUrl: repoUrlFor(week),
      },
    };
  });

  return [...milestones, ...weeks];
}

function buildEdges(): Edge[] {
  const edges: Edge[] = [
    {
      id: 'edge-kickoff',
      source: START_NODE_ID,
      sourcePort: 'bottom',
      target: weekNodeId(1),
      targetPort: 'top',
      targetArrowhead: 'ng-diagram-arrow',
      data: {},
    },
  ];

  for (let i = 0; i < JOURNEY_WEEKS.length - 1; i++) {
    const from = JOURNEY_WEEKS[i];
    const to = JOURNEY_WEEKS[i + 1];
    const ports = portsBetween(cellFor(from.week), cellFor(to.week));
    edges.push({
      id: `edge-w${from.week}-w${to.week}`,
      source: weekNodeId(from.week),
      sourcePort: ports.source,
      target: weekNodeId(to.week),
      targetPort: ports.target,
      targetArrowhead: 'ng-diagram-arrow',
      data: {},
    });
  }

  const lastWeek = JOURNEY_WEEKS[JOURNEY_WEEKS.length - 1];
  edges.push({
    id: 'edge-open-source',
    source: weekNodeId(lastWeek.week),
    sourcePort: 'bottom',
    target: OSS_NODE_ID,
    targetPort: 'top',
    targetArrowhead: 'ng-diagram-arrow',
    data: {},
  });

  return edges;
}

export function buildJourneyModel(): { nodes: Node[]; edges: Edge[] } {
  const nodes = placements().map(
    (p) =>
      ({
        id: p.id,
        type: p.type,
        position: { x: p.x, y: p.y },
        size: { width: p.width, height: p.height },
        resizable: false,
        rotatable: false,
        draggable: false,
        data: p.data,
      }) as Node,
  );

  return { nodes, edges: buildEdges() };
}

const RECTS: ReadonlyMap<string, FlowRect> = new Map(
  placements().map((p) => [p.id, { x: p.x, y: p.y, width: p.width, height: p.height }]),
);

/** Ordered path through the journey, used by the guided tour. */
export const JOURNEY_STOPS: readonly JourneyStop[] = [
  { id: START_NODE_ID, label: 'Kickoff', weekNumber: null },
  ...JOURNEY_WEEKS.map((week) => ({
    id: weekNodeId(week.week),
    label: `Week ${week.week}`,
    weekNumber: week.week,
  })),
  { id: OSS_NODE_ID, label: 'Open Source', weekNumber: null },
];

function union(ids: ReadonlySet<string>): FlowRect {
  const boxes = [...RECTS.entries()].filter(([id]) => ids.has(id)).map(([, rect]) => rect);
  const left = Math.min(...boxes.map((b) => b.x));
  const top = Math.min(...boxes.map((b) => b.y));
  const right = Math.max(...boxes.map((b) => b.x + b.width));
  const bottom = Math.max(...boxes.map((b) => b.y + b.height));
  return { x: left, y: top, width: right - left, height: bottom - top };
}

export function nodeRect(id: string): FlowRect | null {
  return RECTS.get(id) ?? null;
}

/**
 * Phase framing is derived from these rects rather than from
 * `zoomToFit({ nodeIds })`, which unions the given nodes with every edge in the
 * diagram unless a non-empty `edgeIds` is also passed, and framed the phases
 * inconsistently even then.
 */
export function phaseRect(phase: JourneyPhase): FlowRect {
  const ids = phase.weeks.map(weekNodeId);
  if (phase.weeks.includes(1)) ids.unshift(START_NODE_ID);
  if (phase.weeks.includes(JOURNEY_WEEKS.length)) ids.push(OSS_NODE_ID);
  return union(new Set(ids));
}

export function journeyRect(): FlowRect {
  return union(new Set(RECTS.keys()));
}
