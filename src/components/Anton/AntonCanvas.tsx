import { Canvas, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { AntonModel } from './AntonModel';
import { AntonState, Point } from './AntonTypes';

function ViewportCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.OrthographicCamera)) return;
    camera.left = 0;
    camera.right = size.width;
    camera.top = 0;
    camera.bottom = size.height;
    camera.near = 0.1;
    camera.far = 1000;
    camera.position.set(0, 0, 100);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

interface AntonCanvasProps {
  position: Point;
  state: AntonState;
  isDragging: boolean;
  reducedMotion: boolean;
  mobile: boolean;
}

export function AntonCanvas({ position, state, isDragging, reducedMotion, mobile }: AntonCanvasProps) {
  return (
    <Canvas
      orthographic
      dpr={mobile ? [1, 1.25] : [1, 1.8]}
      frameloop={state === 'hidden' ? 'never' : 'always'}
      camera={{ position: [0, 0, 100], zoom: 1 }}
      gl={{ alpha: true, antialias: !mobile, powerPreference: 'low-power' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      fallback={<div aria-hidden="true" />}
    >
      <ViewportCamera />
      <ambientLight intensity={1.8} />
      <directionalLight position={[100, -120, 160]} intensity={2.4} color="#fff7ed" />
      <directionalLight position={[-80, 40, 80]} intensity={1.2} color="#cffafe" />
      <AntonModel position={position} state={state} isDragging={isDragging} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
