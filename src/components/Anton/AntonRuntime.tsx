import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AntonCanvas } from './AntonCanvas';
import { selectAntonDialogue } from './AntonDialogue';
import { evaluateAntonTargets } from './AntonContextEvaluator';
import { ANTON_SIZE, findNearestSafePosition, findSafeTarget, isSafeAntonPosition } from './AntonPlacementEngine';
import { useAntonSurfaceRegistry } from './AntonSurfaceRegistry';
import { useAntonStore } from './AntonStore';
import { Point } from './AntonTypes';

const HOLD_DELAY = 340;
const REACTION_DURATION = 1800;
const CORRECTION_DELAY = 4200;

function getCurrentSection(surfaces: ReturnType<typeof useAntonSurfaceRegistry>) {
  const visible = surfaces
    .filter((surface) => !surface.obstacle)
    .map((surface) => {
      const visibleTop = Math.max(0, surface.rect.top);
      const visibleBottom = Math.min(window.innerHeight, surface.rect.bottom);
      return { surface, area: Math.max(0, visibleBottom - visibleTop) * surface.rect.width };
    })
    .filter((entry) => entry.area > 0)
    .sort((a, b) => b.area - a.area);
  return visible[0]?.surface.sectionId ?? 'home';
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export default function AntonRuntime() {
  const surfaces = useAntonSurfaceRegistry();
  const state = useAntonStore((store) => store.state);
  const position = useAntonStore((store) => store.position);
  const targetPosition = useAntonStore((store) => store.targetPosition);
  const visible = useAntonStore((store) => store.visible);
  const isDragging = useAntonStore((store) => store.isDragging);
  const activeSection = useAntonStore((store) => store.activeSection);
  const message = useAntonStore((store) => store.message);
  const sessionGreeted = useAntonStore((store) => store.sessionGreeted);
  const setState = useAntonStore((store) => store.setState);
  const setPosition = useAntonStore((store) => store.setPosition);
  const setTargetPosition = useAntonStore((store) => store.setTargetPosition);
  const setVisible = useAntonStore((store) => store.setVisible);
  const setDragging = useAntonStore((store) => store.setDragging);
  const setActiveSection = useAntonStore((store) => store.setActiveSection);
  const setMessage = useAntonStore((store) => store.setMessage);
  const setSessionGreeted = useAntonStore((store) => store.setSessionGreeted);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [webGL, setWebGL] = useState<boolean | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [cursor, setCursor] = useState<Point | null>(null);
  const currentPosition = useRef(position);
  const holdTimer = useRef<number | null>(null);
  const correctionTimer = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const lastSafePosition = useRef(position);
  const reactionTimer = useRef<number | null>(null);

  useEffect(() => {
    const startPosition = {
      x: Math.max(16, window.innerWidth - ANTON_SIZE.width - 150),
      y: 72,
    };
    currentPosition.current = startPosition;
    lastSafePosition.current = startPosition;
    setPosition(startPosition);
    setWebGL(hasWebGL());
    setInitialized(true);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    const updateViewport = () => setMobile(window.innerWidth < 768);
    updateMotion();
    updateViewport();
    motionQuery.addEventListener('change', updateMotion);
    window.addEventListener('resize', updateViewport, { passive: true });
    return () => {
      motionQuery.removeEventListener('change', updateMotion);
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!surfaces.length) return;
    setActiveSection(getCurrentSection(surfaces));
  }, [surfaces, setActiveSection]);

  const chooseTarget = useCallback((announce = false) => {
    if (!surfaces.length || draggingRef.current) return;
    const targets = evaluateAntonTargets(surfaces, activeSection, currentPosition.current, cursor);
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const safeTarget = targets
      .map((target) => ({ target, position: findSafeTarget(target, surfaces, viewport) }))
      .find((entry) => entry.position);

    if (safeTarget?.position) {
      setVisible(true);
      setTargetPosition(safeTarget.position);
      if (state === 'hidden') {
        setState('return');
        setMessage(selectAntonDialogue({ state: 'return', sectionId: activeSection, action: 'return' }));
        window.setTimeout(() => {
          setMessage(null);
          setState('explore');
        }, reducedMotion ? 350 : 1600);
      } else if (announce) {
        setState('explore');
      }
      return;
    }

    const nearest = findNearestSafePosition(currentPosition.current, surfaces, viewport);
    if (nearest) {
      setVisible(true);
      setTargetPosition(nearest);
      setState('rest');
      return;
    }

    setTargetPosition(null);
    setVisible(false);
    setState('hidden');
  }, [activeSection, cursor, reducedMotion, setMessage, setState, setTargetPosition, setVisible, state, surfaces]);

  const chooseTargetRef = useRef(chooseTarget);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    chooseTargetRef.current = chooseTarget;
  }, [chooseTarget]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const greeted = sessionStorage.getItem('anton-greeted-v1') === 'true';
    setSessionGreeted(greeted);
    if (greeted) {
      setState('explore');
      return;
    }

    const arrivalTimer = window.setTimeout(() => {
      setState('greeting');
      setMessage(selectAntonDialogue({ state: 'greeting', sectionId: activeSectionRef.current, action: 'arrival' }));
      sessionStorage.setItem('anton-greeted-v1', 'true');
      setSessionGreeted(true);
    }, reducedMotion ? 100 : 700);
    const exploreTimer = window.setTimeout(() => {
      setMessage(null);
      setState('explore');
      chooseTargetRef.current(true);
    }, reducedMotion ? 550 : 2600);
    return () => {
      window.clearTimeout(arrivalTimer);
      window.clearTimeout(exploreTimer);
    };
  }, [reducedMotion, setMessage, setSessionGreeted, setState]);

  useEffect(() => {
    if (!sessionGreeted || state === 'picked-up' || state === 'hidden') return;
    const timer = window.setInterval(() => chooseTarget(), reducedMotion ? 7000 : 4200);
    return () => window.clearInterval(timer);
  }, [chooseTarget, reducedMotion, sessionGreeted, state]);

  useEffect(() => {
    currentPosition.current = position;
  }, [position]);

  useEffect(() => {
    if (!targetPosition || draggingRef.current) return;
    let frame = 0;
    const animate = () => {
      const current = currentPosition.current;
      const dx = targetPosition.x - current.x;
      const dy = targetPosition.y - current.y;
      const distance = Math.hypot(dx, dy);
      const factor = reducedMotion ? 1 : 0.08;
      const next = distance < 1.5
        ? targetPosition
        : { x: current.x + dx * factor, y: current.y + dy * factor };
      currentPosition.current = next;
      setPosition(next);
      if (distance >= 1.5) frame = requestAnimationFrame(animate);
      else if (state === 'explore') {
        setState('inspect');
        setMessage(selectAntonDialogue({ state: 'inspect', sectionId: activeSection, action: 'inspect' }));
        window.setTimeout(() => {
          setMessage(null);
          setState('rest');
        }, reducedMotion ? 500 : 2600);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [activeSection, reducedMotion, setMessage, setPosition, setState, state, targetPosition]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  const beginReaction = useCallback(() => {
    if (draggingRef.current) return;
    setState('react');
    setMessage(selectAntonDialogue({ state: 'react', sectionId: activeSection, action: 'click' }));
    if (reactionTimer.current) window.clearTimeout(reactionTimer.current);
    reactionTimer.current = window.setTimeout(() => {
      setMessage(null);
      setState('explore');
      chooseTarget(true);
    }, reducedMotion ? 350 : REACTION_DURATION);
  }, [activeSection, chooseTarget, reducedMotion, setMessage, setState]);

  const startDrag = useCallback(() => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => {
      draggingRef.current = true;
      didDragRef.current = true;
      setDragging(true);
      setState('picked-up');
      setMessage(null);
    }, HOLD_DELAY);
  }, [setDragging, setMessage, setState]);

  const moveDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const next = { x: event.clientX - ANTON_SIZE.width / 2, y: event.clientY - ANTON_SIZE.height / 2 };
    currentPosition.current = next;
    setPosition(next);
    setTargetPosition(null);
  }, [setPosition, setTargetPosition]);

  const endDrag = useCallback(() => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    if (!draggingRef.current) {
      if (!didDragRef.current) beginReaction();
      didDragRef.current = false;
      return;
    }

    draggingRef.current = false;
    setDragging(false);
    setState('return');
    setMessage(null);
    const dropped = currentPosition.current;
    if (correctionTimer.current) window.clearTimeout(correctionTimer.current);
    correctionTimer.current = window.setTimeout(() => {
      const safe = isSafeAntonPosition(dropped, surfaces, { width: window.innerWidth, height: window.innerHeight });
      if (safe) {
        lastSafePosition.current = dropped;
        setState('explore');
        chooseTarget(true);
        return;
      }
      const nearest = findNearestSafePosition(dropped, surfaces, { width: window.innerWidth, height: window.innerHeight });
      if (nearest) {
        setTargetPosition(nearest);
        setState('return');
        setMessage(selectAntonDialogue({ state: 'return', sectionId: activeSection, action: 'return' }));
        window.setTimeout(() => {
          setMessage(null);
          setState('explore');
          chooseTarget(true);
        }, reducedMotion ? 350 : 1300);
      } else {
        setVisible(false);
        setState('hidden');
      }
    }, reducedMotion ? 0 : CORRECTION_DELAY);
  }, [activeSection, beginReaction, chooseTarget, reducedMotion, setDragging, setMessage, setPosition, setState, setTargetPosition, setVisible, surfaces]);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && draggingRef.current) {
      currentPosition.current = lastSafePosition.current;
      setPosition(lastSafePosition.current);
      setTargetPosition(null);
      draggingRef.current = false;
      setDragging(false);
      setState('explore');
      return;
    }
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (draggingRef.current) endDrag();
      else startDrag();
      return;
    }
    if (!draggingRef.current) return;
    const delta = event.shiftKey ? 32 : 12;
    const next = { ...currentPosition.current };
    if (event.key === 'ArrowLeft') next.x -= delta;
    if (event.key === 'ArrowRight') next.x += delta;
    if (event.key === 'ArrowUp') next.y -= delta;
    if (event.key === 'ArrowDown') next.y += delta;
    if (next.x !== currentPosition.current.x || next.y !== currentPosition.current.y) {
      event.preventDefault();
      currentPosition.current = next;
      setPosition(next);
    }
  }, [endDrag, setDragging, setPosition, setState, setTargetPosition, startDrag]);

  const hitStyle = useMemo(() => ({
    left: position.x,
    top: position.y,
    width: ANTON_SIZE.width,
    height: ANTON_SIZE.height,
  }), [position]);

  if (webGL === false || !initialized) return null;

  return (
    <div className="fixed inset-0 z-[35] pointer-events-none" aria-label="Anton, Arsalan's interactive 3D gecko companion">
      {webGL !== null && (
        <AntonCanvas
          position={position}
          state={state}
          isDragging={isDragging}
          reducedMotion={reducedMotion}
          mobile={mobile}
        />
      )}
      {visible && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Move Anton. Hold to pick him up, then drag or use arrow keys."
            className="absolute rounded-full pointer-events-auto cursor-grab focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 active:cursor-grabbing"
            style={hitStyle}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              startDrag();
            }}
            onPointerMove={moveDrag}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
              endDrag();
            }}
            onPointerCancel={endDrag}
            onKeyDown={onKeyDown}
          />
          {message && (
            <div
              role="status"
              aria-live="polite"
              className="absolute max-w-[190px] -translate-y-full rounded-full border border-border bg-surface/95 px-3 py-1.5 text-[11px] font-medium text-ink-secondary shadow-sm pointer-events-none"
              style={{ left: position.x + 8, top: position.y - 6 }}
            >
              {message}
            </div>
          )}
        </>
      )}
    </div>
  );
}
