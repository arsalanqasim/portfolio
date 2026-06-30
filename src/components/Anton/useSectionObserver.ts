/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

interface UseSectionObserverProps {
  sectionIds: string[];
  onSectionEnter: (sectionId: string) => void;
}

export function useSectionObserver({ sectionIds, onSectionEnter }: UseSectionObserverProps) {
  const onSectionEnterRef = useRef(onSectionEnter);

  useEffect(() => {
    onSectionEnterRef.current = onSectionEnter;
  }, [onSectionEnter]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onSectionEnterRef.current(id);
          }
        },
        {
          // Trigger when a section occupies the main part of the viewport
          rootMargin: '-30% 0px -30% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);
}
