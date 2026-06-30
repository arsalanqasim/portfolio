/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { AntonState } from './AntonStateMachine';

interface AntonSpriteProps {
  state: AntonState;
  eyeOffset: { x: number; y: number };
  headRotation: number;
  isHovered: boolean;
  prefersReducedMotion: boolean;
}

export function AntonSprite({
  state,
  eyeOffset,
  headRotation,
  isHovered,
  prefersReducedMotion,
}: AntonSpriteProps) {
  // 1. Blinking Animations (eyelid vertical scale)
  const blinkVariants = {
    blink: {
      scaleY: [1, 1, 0, 1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatDelay: 2,
        times: [0, 0.95, 0.97, 0.99, 1],
      },
    },
    sleeping: {
      scaleY: 0,
      transition: { duration: 0.5 },
    },
    static: {
      scaleY: 1,
    },
  };

  const getBlinkVariant = () => {
    if (state === 'Sleeping') return 'sleeping';
    if (prefersReducedMotion) return 'static';
    return 'blink';
  };

  // 2. Breathing Animations (chest expansion)
  const bodyScaleY = prefersReducedMotion
    ? 1
    : state === 'Sleeping'
    ? [1, 0.98, 1]
    : [1, 1.02, 1];

  const bodyScaleTransition = {
    duration: state === 'Sleeping' ? 4.5 : 2.5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  };

  // 3. Tail Swaying Animations (Phase-lagged nested rotations)
  const getTailAnimations = () => {
    if (prefersReducedMotion) {
      return { base: 0, mid: 0, tip: 0, transition: { duration: 0.1 } };
    }
    
    if (state === 'Sleeping') {
      // Curled tail around body
      return {
        base: -25,
        mid: -30,
        tip: -35,
        transition: { duration: 1, ease: 'easeOut' as const },
      };
    }

    const multiplier = state === 'Traveling' ? 2 : isHovered ? 1.5 : 1;
    const baseRot = 4 * multiplier;
    const midRot = 6 * multiplier;
    const tipRot = 8 * multiplier;
    const dur = 1.6 / multiplier;

    return {
      base: [-baseRot, baseRot, -baseRot],
      mid: [-midRot, midRot, -midRot],
      tip: [-tipRot, tipRot, -tipRot],
      transition: {
        duration: dur,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    };
  };

  const tailAnims = getTailAnimations();

  // 4. Leg Walk / Gesture Cycles
  const getLegAnimations = () => {
    const isWalking = state === 'Traveling';
    const isWaving = state === 'Greeting' || state === 'Goodbye';
    const isPointing = state === 'Pointing';

    if (prefersReducedMotion) {
      return {
        fl: { rotate: 0 },
        fr: { rotate: 0 },
        bl: { rotate: 0 },
        br: { rotate: 0 },
      };
    }

    if (isWalking) {
      // Walking legs walk out of phase
      return {
        fl: { rotate: [-18, 18, -18], transition: { duration: 0.35, repeat: Infinity, ease: 'easeInOut' as const } },
        fr: { rotate: [18, -18, 18], transition: { duration: 0.35, repeat: Infinity, ease: 'easeInOut' as const } },
        bl: { rotate: [15, -15, 15], transition: { duration: 0.35, repeat: Infinity, ease: 'easeInOut' as const } },
        br: { rotate: [-15, 15, -15], transition: { duration: 0.35, repeat: Infinity, ease: 'easeInOut' as const } },
      };
    }

    if (isWaving) {
      // Raise Front-Right leg to wave
      return {
        fl: { rotate: 0 },
        fr: { rotate: [-10, 45, -10, 45, 0], transition: { duration: 1.5, repeat: Infinity, repeatDelay: 1 } },
        bl: { rotate: 0 },
        br: { rotate: 0 },
      };
    }

    if (isPointing) {
      // Front-Left points at the screen elements
      return {
        fl: { rotate: -40, transition: { duration: 0.5 } },
        fr: { rotate: 10 },
        bl: { rotate: 0 },
        br: { rotate: 0 },
      };
    }

    if (state === 'Thinking') {
      // Front left leg scratching chin
      return {
        fl: { rotate: -25, y: -4 },
        fr: { rotate: 5 },
        bl: { rotate: 0 },
        br: { rotate: 0 },
      };
    }

    if (state === 'Sleeping') {
      // Tuck legs in
      return {
        fl: { rotate: 15, scale: 0.95 },
        fr: { rotate: -15, scale: 0.95 },
        bl: { rotate: 10, scale: 0.95 },
        br: { rotate: -10, scale: 0.95 },
      };
    }

    // Default Idle
    return {
      fl: { rotate: 0 },
      fr: { rotate: 0 },
      bl: { rotate: 0 },
      br: { rotate: 0 },
    };
  };

  const legs = getLegAnimations();

  // 5. Head tilt / gesture rotation
  const getHeadTilt = () => {
    if (prefersReducedMotion) return 0;
    if (state === 'Thinking') return -15;
    if (state === 'Celebrating') return [0, -10, 10, 0];
    return headRotation;
  };

  const headTilt = getHeadTilt();

  // 6. Happy bouncing/jump
  const getYBounce = () => {
    if (prefersReducedMotion) return 0;
    if (state === 'Celebrating' || state === 'Happy') {
      return [-2, 4, -2];
    }
    return 0;
  };

  const yBounceTransition = {
    duration: 0.6,
    repeat: state === 'Celebrating' ? Infinity : 0,
    ease: 'easeInOut' as const,
  };

  // Theme colors matching the portfolio stylesheet
  // Gecko body: olive green, Spot: accent burnt-orange, Belly: cream yellow
  const bodyColor = '#556b2f';
  const bellyColor = '#d9e3b1';
  const spotColor = '#c2410c';
  const eyeScleraColor = '#a2c11c';

  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animate={{
        y: getYBounce(),
        scale: isHovered ? 1.08 : 1,
      }}
      transition={{
        y: yBounceTransition,
        scale: { type: 'spring', stiffness: 300, damping: 15 },
      }}
    >
      <svg
        viewBox="0 0 150 150"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="gecko">
          {/* Back Left Leg */}
          <motion.path
            id="back-left-leg"
            d="M 46 80 C 35 82, 32 92, 38 96 C 40 98, 45 92, 45 86"
            fill="none"
            stroke={bodyColor}
            strokeWidth="8"
            strokeLinecap="round"
            transform-origin="46px 80px"
            animate={legs.bl}
          />

          {/* Back Right Leg */}
          <motion.path
            id="back-right-leg"
            d="M 74 80 C 85 82, 88 92, 82 96 C 80 98, 75 92, 75 86"
            fill="none"
            stroke={bodyColor}
            strokeWidth="8"
            strokeLinecap="round"
            transform-origin="74px 80px"
            animate={legs.br}
          />

          {/* Tail Base -> Nested Middle -> Nested Tip */}
          <motion.g
            id="tail-base-group"
            transform-origin="60px 88px"
            animate={{ rotate: tailAnims.base }}
            transition={tailAnims.transition}
          >
            <path
              d="M 57 88 C 58 98, 59 104, 60 108"
              fill="none"
              stroke={bodyColor}
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Tail Mid */}
            <motion.g
              id="tail-mid-group"
              transform-origin="60px 108px"
              animate={{ rotate: tailAnims.mid }}
              transition={tailAnims.transition}
            >
              <path
                d="M 60 108 C 60 114, 59 122, 57 126"
                fill="none"
                stroke={bodyColor}
                strokeWidth="6.5"
                strokeLinecap="round"
              />
              {/* Tail Tip */}
              <motion.g
                id="tail-tip-group"
                transform-origin="57px 126px"
                animate={{ rotate: tailAnims.tip }}
                transition={tailAnims.transition}
              >
                <path
                  d="M 57 126 C 55 130, 52 136, 48 141"
                  fill="none"
                  stroke={bodyColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.g>
            </motion.g>
          </motion.g>

          {/* Body/Torso */}
          <motion.g
            id="torso"
            transform-origin="60px 72px"
            animate={{ scaleY: bodyScaleY }}
            transition={bodyScaleTransition}
          >
            {/* Main Spine/Body */}
            <path
              d="M 60 52 C 46 62, 44 80, 60 88 C 76 80, 74 62, 60 52 Z"
              fill={bodyColor}
            />
            {/* Cream Belly */}
            <path
              d="M 60 55 C 50 63, 49 76, 60 83 C 71 76, 70 63, 60 55 Z"
              fill={bellyColor}
              opacity="0.8"
            />
            {/* Burnt Orange Spots */}
            <circle cx="56" cy="62" r="2.5" fill={spotColor} />
            <circle cx="64" cy="67" r="3" fill={spotColor} />
            <circle cx="55" cy="74" r="2" fill={spotColor} />
            <circle cx="65" cy="77" r="2.5" fill={spotColor} />
            <circle cx="60" cy="71" r="1.5" fill={spotColor} />
          </motion.g>

          {/* Front Left Leg */}
          <motion.path
            id="front-left-leg"
            d="M 48 58 C 36 56, 32 46, 38 42 C 40 40, 44 46, 45 52"
            fill="none"
            stroke={bodyColor}
            strokeWidth="8"
            strokeLinecap="round"
            transform-origin="48px 58px"
            animate={legs.fl}
          />

          {/* Front Right Leg */}
          <motion.path
            id="front-right-leg"
            d="M 72 58 C 84 56, 88 46, 82 42 C 80 40, 76 46, 75 52"
            fill="none"
            stroke={bodyColor}
            strokeWidth="8"
            strokeLinecap="round"
            transform-origin="72px 58px"
            animate={legs.fr}
          />

          {/* Head & Eyes */}
          <motion.g
            id="head"
            transform-origin="60px 48px"
            animate={{
              rotate: headTilt,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            {/* Head Silhouette */}
            <path
              d="M 60 20 C 44 26, 44 48, 60 50 C 76 48, 76 26, 60 20 Z"
              fill={bodyColor}
            />

            {/* Left Eye Sclera */}
            <circle cx="48" cy="33" r="8" fill={eyeScleraColor} />
            {/* Left Eye Eyelid Group (for Blinking) */}
            <g transform="translate(48, 33)">
              <motion.g
                transform-origin="0 0"
                animate={getBlinkVariant()}
                variants={blinkVariants}
              >
                {/* Pupil */}
                <motion.circle
                  cx={eyeOffset.x * 0.8}
                  cy={eyeOffset.y * 0.8}
                  r="4"
                  fill="#1c1917"
                />
                {/* Pupil reflection */}
                <motion.circle
                  cx={eyeOffset.x * 0.8 - 1.2}
                  cy={eyeOffset.y * 0.8 - 1.2}
                  r="1.2"
                  fill="#ffffff"
                />
              </motion.g>
            </g>

            {/* Right Eye Sclera */}
            <circle cx="72" cy="33" r="8" fill={eyeScleraColor} />
            {/* Right Eye Eyelid Group (for Blinking) */}
            <g transform="translate(72, 33)">
              <motion.g
                transform-origin="0 0"
                animate={getBlinkVariant()}
                variants={blinkVariants}
              >
                {/* Pupil */}
                <motion.circle
                  cx={eyeOffset.x * 0.8}
                  cy={eyeOffset.y * 0.8}
                  r="4"
                  fill="#1c1917"
                />
                {/* Pupil reflection */}
                <motion.circle
                  cx={eyeOffset.x * 0.8 - 1.2}
                  cy={eyeOffset.y * 0.8 - 1.2}
                  r="1.2"
                  fill="#ffffff"
                />
              </motion.g>
            </g>

            {/* Eyelid rims for sleeping or static closed eye shapes */}
            {state === 'Sleeping' && (
              <>
                <path
                  d="M 40 33 Q 48 37 56 33"
                  fill="none"
                  stroke="#38491f"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M 64 33 Q 72 37 80 33"
                  fill="none"
                  stroke="#38491f"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            )}

            {/* Mouth */}
            <path
              d={
                state === 'Happy' || state === 'Celebrating'
                  ? 'M 55 42 Q 60 46 65 42'
                  : 'M 56 43 Q 60 44 64 43'
              }
              fill="none"
              stroke="#2e381d"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}
