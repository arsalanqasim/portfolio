/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useAnton } from './useAnton';
import { useSectionObserver } from './useSectionObserver';
import { AntonSprite } from './AntonSprite';
import { AntonBubble } from './AntonBubble';

export default function Anton() {
  const {
    state,
    message,
    bubbleVisible,
    position,
    rotation,
    isMobile,
    prefersReducedMotion,
    eyeOffset,
    headRotation,
    isHovered,
    setIsHovered,
    activeSection,
    handleSectionEnter,
    handleAntonClick,
  } = useAnton();

  // Initialize the section observer for Anton
  useSectionObserver({
    sectionIds: ['home', 'work', 'experience', 'skills', 'about', 'footer'],
    onSectionEnter: handleSectionEnter,
  });

  // Calculate size based on responsive parameters
  const getSizeClass = () => {
    if (isMobile) return 'w-[80px] h-[80px]';
    return 'w-[100px] h-[100px] md:w-[135px] md:h-[135px]';
  };

  const isUpsideDown = activeSection === 'footer' && state === 'Goodbye';

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: prefersReducedMotion ? 'transform 0.3s ease-out' : 'none',
        pointerEvents: 'none',
        zIndex: 45,
      }}
      className={`${getSizeClass()}`}
    >
      <div className="relative w-full h-full">
        {/* Speech Bubble */}
        <AntonBubble
          message={message}
          visible={bubbleVisible}
          isUpsideDown={isUpsideDown}
        />

        {/* Gecko Sprite Container */}
        <div
          onClick={handleAntonClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center center',
            transition: prefersReducedMotion ? 'transform 0.3s ease-out' : 'none',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
          className="w-full h-full"
        >
          <AntonSprite
            state={state}
            eyeOffset={eyeOffset}
            headRotation={headRotation}
            isHovered={isHovered}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </div>
  );
}
