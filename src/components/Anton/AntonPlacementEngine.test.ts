import { describe, expect, it } from 'vitest';
import { findNearestSafePosition, findSafeTarget, isSafeAntonPosition } from './AntonPlacementEngine';
import { AntonSurface, AntonTarget } from './AntonTypes';

const surface: AntonSurface = {
  id: 'project-1',
  element: {} as HTMLElement,
  rect: { left: 100, top: 100, right: 300, bottom: 220, width: 200, height: 120 },
  type: 'technical',
  priority: 20,
  sectionId: 'work',
  anchor: { x: 180, y: 100 },
};

describe('Anton placement engine', () => {
  it('finds a perimeter position without covering the target surface', () => {
    const target: AntonTarget = { surface, position: surface.anchor, score: 100 };
    const position = findSafeTarget(target, [surface], { width: 800, height: 600 });
    expect(position).not.toBeNull();
    expect(isSafeAntonPosition(position!, [surface], { width: 800, height: 600 }, surface.id)).toBe(true);
  });

  it('finds a safe viewport fallback', () => {
    const position = findNearestSafePosition({ x: 10, y: 10 }, [surface], { width: 800, height: 600 });
    expect(position).not.toBeNull();
    expect(isSafeAntonPosition(position!, [surface], { width: 800, height: 600 })).toBe(true);
  });

  it('rejects positions that overlap meaningful content', () => {
    expect(isSafeAntonPosition({ x: 120, y: 120 }, [surface], { width: 800, height: 600 })).toBe(false);
  });
});
