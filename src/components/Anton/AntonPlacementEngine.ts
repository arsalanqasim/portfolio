import { AntonSurface, AntonTarget, Point, Rect } from './AntonTypes';

export const ANTON_SIZE = { width: 112, height: 92 };

function overlaps(a: Rect, b: Rect) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export function positionRect(position: Point): Rect {
  return {
    left: position.x,
    top: position.y,
    right: position.x + ANTON_SIZE.width,
    bottom: position.y + ANTON_SIZE.height,
    width: ANTON_SIZE.width,
    height: ANTON_SIZE.height,
  };
}

export function isInsideViewport(position: Point, viewport: { width: number; height: number }) {
  const rect = positionRect(position);
  return rect.left >= 0 && rect.top >= 0 && rect.right <= viewport.width && rect.bottom <= viewport.height;
}

export function isSafeAntonPosition(
  position: Point,
  surfaces: AntonSurface[],
  viewport: { width: number; height: number },
  ignoredSurfaceId?: string,
) {
  if (!isInsideViewport(position, viewport)) return false;
  const rect = positionRect(position);
  return !surfaces.some((surface) => surface.id !== ignoredSurfaceId && overlaps(rect, surface.rect));
}

function candidatesForSurface(surface: AntonSurface): Point[] {
  const gap = 12;
  const { rect } = surface;
  return [
    { x: rect.right + gap, y: rect.top },
    { x: rect.left - ANTON_SIZE.width - gap, y: rect.top },
    { x: rect.right - ANTON_SIZE.width, y: rect.bottom + gap },
    { x: rect.left, y: rect.bottom + gap },
    { x: rect.right - ANTON_SIZE.width - gap, y: rect.top - ANTON_SIZE.height - gap },
  ];
}

export function findSafeTarget(
  target: AntonTarget,
  surfaces: AntonSurface[],
  viewport: { width: number; height: number },
): Point | null {
  const candidates = candidatesForSurface(target.surface);
  return candidates.find((candidate) =>
    isSafeAntonPosition(candidate, surfaces, viewport, target.surface.id),
  ) ?? null;
}

export function findNearestSafePosition(
  position: Point,
  surfaces: AntonSurface[],
  viewport: { width: number; height: number },
): Point | null {
  const margin = 16;
  const candidates: Point[] = [
    { x: margin, y: margin },
    { x: viewport.width - ANTON_SIZE.width - margin, y: margin },
    { x: margin, y: viewport.height - ANTON_SIZE.height - margin },
    { x: viewport.width - ANTON_SIZE.width - margin, y: viewport.height - ANTON_SIZE.height - margin },
    { x: Math.max(margin, position.x), y: Math.max(margin, position.y) },
  ];

  const safePosition = candidates
    .filter((candidate) => isSafeAntonPosition(candidate, surfaces, viewport))
    .sort((a, b) => Math.hypot(a.x - position.x, a.y - position.y) - Math.hypot(b.x - position.x, b.y - position.y))[0] ?? null;

  if (safePosition) return safePosition;

  // On narrow screens the content section can cover the entire viewport. Keep
  // Anton discoverable by falling back to a corner that only avoids explicit
  // interaction obstacles (header, chatbot, etc.).
  return candidates
    .filter((candidate) => isInsideViewport(candidate, viewport))
    .filter((candidate) => {
      const rect = positionRect(candidate);
      return !surfaces.some((surface) => surface.obstacle && overlaps(rect, surface.rect));
    })
    .sort((a, b) => Math.hypot(a.x - position.x, a.y - position.y) - Math.hypot(b.x - position.x, b.y - position.y))[0] ?? null;
}
