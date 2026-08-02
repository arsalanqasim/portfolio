import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFBX, useAnimations } from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { AntonState, Point } from './AntonTypes';

const RANGO_ANIMATED_FBX_PATH = '/assets/anton/Waving.fbx';

interface AntonModelProps {
  position: Point;
  state: AntonState;
  isDragging: boolean;
  reducedMotion: boolean;
}

export function AntonModel({ position, state, isDragging, reducedMotion }: AntonModelProps) {
  const group = useRef<THREE.Group>(null);
  const rootRef = useRef<THREE.Group>(null);
  
  // Load the downloaded Mixamo FBX directly to preserve its embedded colors/textures
  const fbx = useFBX(RANGO_ANIMATED_FBX_PATH);
  
  const model = useMemo(() => {
    // SkeletonUtils.clone is crucial for rigged models
    const cloned = SkeletonUtils.clone(fbx);
    cloned.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return cloned;
  }, [fbx]);

  const { actions } = useAnimations(fbx.animations, rootRef);

  useEffect(() => {
    // Mixamo animations are typically named 'mixamo.com' or 'Armature|mixamo.com|Layer0'
    // Let's grab the first animation track available.
    const animName = fbx.animations.length > 0 ? fbx.animations[0].name : null;
    const greetingAction = animName ? actions[animName] : null;
    
    if (state === 'greeting' && greetingAction) {
      greetingAction.reset().fadeIn(0.2).play();
    } else if (greetingAction) {
      // Fade out if leaving greeting state
      greetingAction.fadeOut(0.2);
    }
  }, [state, actions, fbx.animations]);

  // Procedural Animation Engine
  useFrame((stateCtx) => {
    if (!group.current || reducedMotion) return;
    const t = stateCtx.clock.elapsedTime;
    const lerpSpeed = 0.1;
    
    const isResting = state === 'rest' || state === 'hidden';
    const breathSpeed = isResting ? 1.0 : 2.5;
    const breath = Math.sin(t * breathSpeed) * 0.04;
    group.current.position.y = breath;
    
    if (state === 'explore') {
        group.current.position.y += Math.abs(Math.sin(t * 8)) * 0.1;
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t * 4) * 0.05, lerpSpeed);
    } else {
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0, lerpSpeed);
    }
  });

  const baseScale = state === 'hidden' ? 0 : isDragging ? 1.15 : 1;
  
  // FBX models from Mixamo are usually scaled 100x larger (cm instead of m).
  // I will drastically reduce the scale from 85 to 0.5 to fix him appearing huge and stuck in the top corner.
  const targetScale = baseScale * 0.5; 

  return (
    <group
      position={[position.x + 58, position.y + 44, 0]}
      scale={[targetScale, targetScale * -1, targetScale]} 
    >
       <group ref={group}>
         <group ref={rootRef}>
            <primitive object={model} rotation={[0, 0, 0]} />
         </group>
       </group>
    </group>
  );
}

useFBX.preload(RANGO_ANIMATED_FBX_PATH);
