import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations, Center } from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { AntonState, Point } from './AntonTypes';

const RANGO_ANIMATED_GLB_PATH = '/assets/anton/rango_animated.glb';
const RANGO_STATIC_GLB_PATH = '/assets/anton/rango.glb';

interface AntonModelProps {
  position: Point;
  state: AntonState;
  isDragging: boolean;
  reducedMotion: boolean;
}

export function AntonModel({ position, state, isDragging, reducedMotion }: AntonModelProps) {
  const group = useRef<THREE.Group>(null);
  const rootRef = useRef<THREE.Group>(null);
  
  // Load BOTH GLB files. 
  // We use the animated one for the skeleton/geometry, and the static one to steal its perfect colored material!
  const animatedGLTF = useGLTF(RANGO_ANIMATED_GLB_PATH);
  const staticGLTF = useGLTF(RANGO_STATIC_GLB_PATH);
  
  const model = useMemo(() => {
    const cloned = SkeletonUtils.clone(animatedGLTF.scene);
    
    // Find the perfect material from the static GLB
    const perfectMaterial = Object.values(staticGLTF.materials).find(m => m.name === 'Rango');
    
    cloned.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        
        // Apply the colored material if found
        if (perfectMaterial) {
           (node as THREE.Mesh).material = perfectMaterial;
           // Fix inverted normals caused by negative scaling in previous iterations, just to be extremely safe
           perfectMaterial.side = THREE.DoubleSide;
        }
      }
    });
    return cloned;
  }, [animatedGLTF.scene, staticGLTF.materials]);

  const { actions } = useAnimations(animatedGLTF.animations, rootRef);

  useEffect(() => {
    const animName = animatedGLTF.animations.length > 0 ? animatedGLTF.animations[0].name : null;
    const greetingAction = animName ? actions[animName] : null;

    if ((state === 'greeting' || state === 'react') && greetingAction) {
      greetingAction.reset().fadeIn(0.2).play();
    } else if (greetingAction) {
      greetingAction.fadeOut(0.2);
    }
  }, [state, actions, animatedGLTF.animations]);

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
  const targetScale = baseScale * 120; 

  return (
    <group
      position={[position.x + 80, position.y + 110, 0]}
      // Scale is strictly positive to prevent normal inversion!
      scale={[targetScale, targetScale, targetScale]} 
    >
       <group ref={group}>
         <group ref={rootRef}>
            <Center>
              {/* Rotate by 180 degrees on X (flips right-side up for Ortho cam) and Y (faces camera) */}
              <primitive object={model} rotation={[Math.PI, Math.PI, 0]} />
            </Center>
         </group>
       </group>
    </group>
  );
}

useGLTF.preload(RANGO_ANIMATED_GLB_PATH);
useGLTF.preload(RANGO_STATIC_GLB_PATH);
