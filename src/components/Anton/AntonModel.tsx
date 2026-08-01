import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { AntonState, Point } from './AntonTypes';

const ANTON_GLB_PATH = '/assets/anton/anton_v1.0.0.glb';

interface AntonModelProps {
  position: Point;
  state: AntonState;
  isDragging: boolean;
  reducedMotion: boolean;
}

const animationByState: Record<AntonState, string> = {
  arrival: 'arrival',
  greeting: 'greeting',
  explore: 'explore',
  inspect: 'inspect',
  observe: 'observe',
  react: 'react',
  rest: 'rest',
  hidden: 'hidden',
  'picked-up': 'picked-up',
  return: 'return',
};

const loopingStates = new Set<AntonState>(['explore', 'observe', 'rest', 'picked-up']);

export function AntonModel({ position, state, isDragging, reducedMotion }: AntonModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(ANTON_GLB_PATH);
  const model = useMemo(() => scene.clone(true), [scene]);
  const { actions } = useAnimations(animations, group);
  const clipName = animationByState[state];

  useEffect(() => {
    const action = actions[clipName];
    if (!action) return;

    const shouldLoop = loopingStates.has(state) && !reducedMotion;
    action.reset();
    action.setLoop(shouldLoop ? THREE.LoopRepeat : THREE.LoopOnce, shouldLoop ? Infinity : 1);
    action.clampWhenFinished = !shouldLoop;
    action.fadeIn(reducedMotion ? 0.05 : 0.18).play();

    return () => {
      action.fadeOut(reducedMotion ? 0.05 : 0.18);
    };
  }, [actions, clipName, reducedMotion, state]);

  useEffect(() => {
    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.frustumCulled = false;
      object.castShadow = false;
      object.receiveShadow = false;
    });
  }, [model]);

  return (
    <group
      ref={group}
      position={[position.x + 58, position.y + 44, 0]}
      scale={state === 'hidden' ? 0 : isDragging ? 1.12 : 1}
    >
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(ANTON_GLB_PATH);
