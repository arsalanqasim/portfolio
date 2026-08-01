import { AntonSurface, AntonTarget, Point } from './AntonTypes';

const TYPE_PRIORITY: Record<AntonSurface['type'], number> = {
  technical: 100,
  content: 72,
  interface: 54,
  section: 40,
  low: 12,
};

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function evaluateAntonTargets(
  surfaces: AntonSurface[],
  activeSection: string,
  currentPosition: Point,
  cursor: Point | null,
): AntonTarget[] {
  return surfaces
    .filter((surface) => !surface.obstacle && surface.rect.width > 0 && surface.rect.height > 0)
    .map((surface) => {
      const sectionBoost = surface.sectionId === activeSection ? 35 : 0;
      const cursorBoost = cursor
        ? Math.max(0, 24 - distance(cursor, surface.anchor) / 24)
        : 0;
      const travelCost = Math.min(42, distance(currentPosition, surface.anchor) / 28);
      const score = TYPE_PRIORITY[surface.type] + surface.priority + sectionBoost + cursorBoost - travelCost;
      return { surface, position: surface.anchor, score };
    })
    .sort((a, b) => b.score - a.score);
}
