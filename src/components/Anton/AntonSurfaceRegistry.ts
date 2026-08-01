import { useEffect, useState } from 'react';
import { AntonSurface, AntonSurfaceType, Rect } from './AntonTypes';

const FALLBACK_SECTIONS = ['home', 'work', 'experience', 'skills', 'about', 'footer'];

function toRect(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  };
}

function priorityFor(element: HTMLElement, type: AntonSurfaceType) {
  const explicit = Number(element.dataset.antonPriority);
  if (Number.isFinite(explicit)) return explicit;
  return type === 'technical' ? 20 : type === 'content' ? 12 : 0;
}

function buildSurface(element: HTMLElement, index: number, obstacle = false): AntonSurface {
  const id = element.dataset.antonId || element.id || `anton-surface-${index}`;
  const type = obstacle ? 'low' : (element.dataset.antonPriorityType || element.dataset.antonSurface || 'section') as AntonSurfaceType;
  const rect = toRect(element);
  const anchor = {
    x: Math.max(12, Math.min(window.innerWidth - 124, rect.right - 100)),
    y: Math.max(72, Math.min(window.innerHeight - 104, rect.top + 8)),
  };
  return {
    id,
    element,
    rect,
    type,
    priority: obstacle ? 1000 : priorityFor(element, type),
    sectionId: element.closest<HTMLElement>('[id]')?.id || element.id || 'home',
    anchor,
    obstacle,
  };
}

function collectSurfaces(): AntonSurface[] {
  const explicit = Array.from(document.querySelectorAll<HTMLElement>('[data-anton-surface]'));
  const elements = explicit.length
    ? explicit
    : FALLBACK_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  const obstacles = Array.from(document.querySelectorAll<HTMLElement>('[data-anton-obstacle]'));
  const all = [...elements, ...obstacles].filter((element, index, list) => list.indexOf(element) === index);
  return all.map((element, index) => buildSurface(element, index, obstacles.includes(element))).filter((surface) => surface.rect.width > 0 && surface.rect.height > 0);
}

export function useAntonSurfaceRegistry() {
  const [surfaces, setSurfaces] = useState<AntonSurface[]>([]);

  useEffect(() => {
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setSurfaces(collectSurfaces()));
    };

    const resizeObserver = new ResizeObserver(refresh);
    const observeSurfaces = () => {
      const explicit = Array.from(document.querySelectorAll<HTMLElement>('[data-anton-surface]'));
      const elements = explicit.length
        ? explicit
        : FALLBACK_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      const obstacles = Array.from(document.querySelectorAll<HTMLElement>('[data-anton-obstacle]'));
      [...elements, ...obstacles].forEach((element) => resizeObserver.observe(element));
    };

    observeSurfaces();
    refresh();
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('scroll', refresh, { passive: true });
    const observer = new MutationObserver(() => {
      resizeObserver.disconnect();
      observeSurfaces();
      refresh();
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', refresh);
      window.removeEventListener('scroll', refresh);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return surfaces;
}
