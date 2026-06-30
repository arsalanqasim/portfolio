/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { AntonState } from './AntonStateMachine';
import {
  ANTON_SECTIONS,
  CLICK_REACTIONS,
  RANDOM_CLICK_MESSAGES,
  SCROLL_REACTIONS,
  INACTIVITY_REACTIONS,
  getTargetPosition,
} from './antonMessages';

// Desktop dimensions for Anton
const ANTON_WIDTH_DESKTOP = 135;
const ANTON_HEIGHT_DESKTOP = 135;

export function useAnton() {
  const [state, setState] = useState<AntonState>('Greeting');
  const [message, setMessage] = useState<string>("Welcome! I'll show you around.");
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Pupil and head tracking offsets
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeSectionRef = useRef('home');
  const [activeSection, setActiveSection] = useState('home');

  const bubbleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollReactionCooldown = useRef(false);
  const sectionCooldowns = useRef<Record<string, number>>({});
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const lastActivityTime = useRef(Date.now());
  const isSleeping = useRef(false);
  const previousClickIndex = useRef(-1);

  // Position interpolation state
  const currentPos = useRef({ x: window.innerWidth - ANTON_WIDTH_DESKTOP - 200, y: window.innerHeight - ANTON_HEIGHT_DESKTOP - 24 });
  const targetPos = useRef({ x: window.innerWidth - ANTON_WIDTH_DESKTOP - 200, y: window.innerHeight - ANTON_HEIGHT_DESKTOP - 24, rotation: 0 });
  const isTraveling = useRef(false);

  // Screen size config
  const getAntonSize = useCallback(() => {
    if (typeof window === 'undefined') return { w: 135, h: 135 };
    if (window.innerWidth < 768) {
      return { w: 80, h: 80 }; // Mobile size
    } else if (window.innerWidth < 1024) {
      return { w: 100, h: 100 }; // Tablet size
    }
    return { w: 135, h: 135 }; // Desktop size
  }, []);

  // Update screen type & reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Display speech bubble helper
  const showBubble = useCallback((text: string, duration = 5000) => {
    if (bubbleTimeoutRef.current) {
      clearTimeout(bubbleTimeoutRef.current);
    }
    setMessage(text);
    setBubbleVisible(true);

    bubbleTimeoutRef.current = setTimeout(() => {
      setBubbleVisible(false);
    }, duration);
  }, []);

  // Section observer handler
  const handleSectionEnter = useCallback((sectionId: string) => {
    if (activeSectionRef.current === sectionId) return;
    activeSectionRef.current = sectionId;
    setActiveSection(sectionId);

    const config = ANTON_SECTIONS.find((s) => s.id === sectionId);
    if (!config) return;

    const now = Date.now();
    const lastTrigger = sectionCooldowns.current[sectionId] || 0;

    // Check cooldown
    if (now - lastTrigger >= config.cooldown) {
      sectionCooldowns.current[sectionId] = now;
      
      // Start moving towards target
      isTraveling.current = true;
      setState('Traveling');
      
      // Cancel sleeping if moving
      if (isSleeping.current) {
        isSleeping.current = false;
      }

      // Dialog triggers immediately on arrival or start
      showBubble(config.message, 5000);
    }
  }, [showBubble]);

  // Handle global click events for specific links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      
      if (href.includes('Arsalan_Qasim.pdf') || anchor.hasAttribute('download')) {
        setState('Happy');
        showBubble(CLICK_REACTIONS.resume, 5000);
      } else if (href.includes('github.com')) {
        setState('Celebrating');
        showBubble(CLICK_REACTIONS.github, 5000);
      } else if (href.includes('linkedin.com')) {
        setState('Celebrating');
        showBubble(CLICK_REACTIONS.linkedin, 5000);
      } else if (href.startsWith('mailto:')) {
        setState('Happy');
        showBubble(CLICK_REACTIONS.email, 5000);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [showBubble]);

  // Click Anton handler
  const handleAntonClick = useCallback(() => {
    // Determine a random message ensuring no repeat of previous
    let nextIndex = previousClickIndex.current;
    while (nextIndex === previousClickIndex.current) {
      nextIndex = Math.floor(Math.random() * RANDOM_CLICK_MESSAGES.length);
    }
    previousClickIndex.current = nextIndex;

    const clickStates: AntonState[] = ['Happy', 'Thinking', 'Greeting', 'Watching'];
    const randomState = clickStates[Math.floor(Math.random() * clickStates.length)];
    
    setState(randomState);
    showBubble(RANDOM_CLICK_MESSAGES[nextIndex], 4500);
  }, [showBubble]);

  // Scroll dynamics
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const dy = currentScrollY - lastScrollY.current;
      const dt = now - lastScrollTime.current;

      if (dt > 0 && !scrollReactionCooldown.current && !isTraveling.current) {
        const velocity = Math.abs(dy) / dt; // pixels per millisecond

        // Speedrun detection
        if (velocity > 3.5) {
          scrollReactionCooldown.current = true;
          setState('Watching');
          showBubble(SCROLL_REACTIONS.speedrun, 5000);

          setTimeout(() => {
            scrollReactionCooldown.current = false;
          }, 25000); // Cooldown for scroll speed bubble
        }
        // Scroll back up detection
        else if (dy < -200 && currentScrollY > 100) {
          scrollReactionCooldown.current = true;
          setState('Happy');
          showBubble(SCROLL_REACTIONS.backUp, 5000);

          setTimeout(() => {
            scrollReactionCooldown.current = false;
          }, 25000);
        }
      }

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showBubble]);

  // Hero section reading dwell time detection
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeSectionRef.current === 'home' && !isSleeping.current && !isTraveling.current) {
        setState('Reading');
        showBubble(SCROLL_REACTIONS.heroIdle, 5000);
      }
    }, 12000); // Triggers if user stays on Hero for 12s without scrolling away

    return () => clearTimeout(timer);
  }, [showBubble]);

  // Inactivity detection
  useEffect(() => {
    const resetActivity = () => {
      lastActivityTime.current = Date.now();
      if (isSleeping.current) {
        isSleeping.current = false;
        setState('Idle');
        showBubble(INACTIVITY_REACTIONS.wake, 4000);
      }
    };

    window.addEventListener('mousemove', resetActivity, { passive: true });
    window.addEventListener('scroll', resetActivity, { passive: true });
    window.addEventListener('click', resetActivity, { passive: true });

    const checkInterval = setInterval(() => {
      if (Date.now() - lastActivityTime.current > 60000) {
        if (!isSleeping.current && !isTraveling.current) {
          isSleeping.current = true;
          setState('Sleeping');
          showBubble(INACTIVITY_REACTIONS.sleep, 4000);
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', resetActivity);
      window.removeEventListener('scroll', resetActivity);
      window.removeEventListener('click', resetActivity);
      clearInterval(checkInterval);
    };
  }, [showBubble]);

  // Mouse cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isSleeping.current) return;

      const size = getAntonSize();
      const antonX = currentPos.current.x + size.w / 2;
      const antonY = currentPos.current.y + size.h / 2;

      const dx = e.clientX - antonX;
      const dy = e.clientY - antonY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 400) {
        // Cursor is far away: center eyes, return head to normal
        setEyeOffset({ x: 0, y: 0 });
        setHeadRotation(0);
        if (state === 'Watching') {
          setState('Idle');
        }
      } else if (dist <= 400 && dist > 100) {
        // Cursor is nearby: glance towards cursor, rotate head slightly
        const angle = Math.atan2(dy, dx);
        const intensity = isHovered ? 1.2 : 0.6;
        setEyeOffset({
          x: Math.cos(angle) * 3 * intensity,
          y: Math.sin(angle) * 3 * intensity,
        });

        // Rotate head slightly (max 12 deg)
        let angleDeg = (angle * 180) / Math.PI;
        // Normalize angle to [-180, 180]
        if (angleDeg > 180) angleDeg -= 360;
        const targetHeadRot = Math.max(-12, Math.min(12, angleDeg * 0.15));
        setHeadRotation(targetHeadRot);

        if (state === 'Idle' && !isTraveling.current) {
          setState('Watching');
        }
      } else {
        // Cursor circles Anton (very close)
        const angle = Math.atan2(dy, dx);
        setEyeOffset({
          x: Math.cos(angle) * 5,
          y: Math.sin(angle) * 5,
        });

        let angleDeg = (angle * 180) / Math.PI;
        if (angleDeg > 180) angleDeg -= 360;
        const targetHeadRot = Math.max(-20, Math.min(20, angleDeg * 0.25));
        setHeadRotation(targetHeadRot);

        if (state === 'Idle' && !isTraveling.current) {
          setState('Watching');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [state, isHovered, getAntonSize]);

  // requestAnimationFrame Coordinate Animation Loop
  useEffect(() => {
    let animId: number;

    const updatePosition = () => {
      const size = getAntonSize();
      const nextTarget = getTargetPosition(activeSectionRef.current, size.w, size.h, isMobile);
      targetPos.current = nextTarget;

      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (prefersReducedMotion) {
        // Snapping immediately to prevent animations when reduced motion is preferred
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
        setRotation(targetPos.current.rotation);
        setPosition({ x: currentPos.current.x, y: currentPos.current.y });
        isTraveling.current = false;
        if (state === 'Traveling') {
          const config = ANTON_SECTIONS.find((s) => s.id === activeSectionRef.current);
          setState(config ? config.animation : 'Idle');
        }
      } else if (isTraveling.current) {
        // Slower traversal speed (lerp coefficient 0.05) to walk organically
        const lerpFactor = 0.05;
        currentPos.current.x += dx * lerpFactor;
        currentPos.current.y += dy * lerpFactor;

        // Calculate travel angle to rotate body in crawling direction
        const moveAngle = Math.atan2(dy, dx) * 180 / Math.PI;
        // Make gecko point upwards/downwards based on crawling direction
        // standard gecko orientation is upright. If climbing, rotate body.
        setRotation(moveAngle + 90); // 90 degrees offset makes gecko head point in travel direction

        setPosition({ x: currentPos.current.x, y: currentPos.current.y });

        if (distance < 6) {
          // Arrived! Snap and switch to docked state
          currentPos.current.x = targetPos.current.x;
          currentPos.current.y = targetPos.current.y;
          setRotation(targetPos.current.rotation);
          setPosition({ x: currentPos.current.x, y: currentPos.current.y });
          isTraveling.current = false;

          const config = ANTON_SECTIONS.find((s) => s.id === activeSectionRef.current);
          setState(config ? config.animation : 'Idle');
        }
      } else {
        // Docked lock-on: 1-to-1 matching to prevent viewport scroll lag
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
        setRotation(targetPos.current.rotation);
        setPosition({ x: currentPos.current.x, y: currentPos.current.y });
      }

      animId = requestAnimationFrame(updatePosition);
    };

    animId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isMobile, prefersReducedMotion, getAntonSize, state]);

  return {
    state,
    message,
    bubbleVisible,
    position,
    rotation,
    scale,
    isMobile,
    prefersReducedMotion,
    eyeOffset,
    headRotation,
    isHovered,
    setIsHovered,
    activeSection,
    handleSectionEnter,
    handleAntonClick,
  };
}
