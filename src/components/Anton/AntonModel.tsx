import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { AntonState, Point } from './AntonTypes';

interface AntonModelProps {
  position: Point;
  state: AntonState;
  isDragging: boolean;
  reducedMotion: boolean;
}

function Segment({ position, rotation, length, radius, color }: { position: [number, number, number]; rotation: [number, number, number]; length: number; radius: number; color: string }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <capsuleGeometry args={[radius, length, 6, 12]} />
      <meshStandardMaterial color={color} roughness={0.78} />
    </mesh>
  );
}

export function AntonModel({ position, state, isDragging, reducedMotion }: AntonModelProps) {
  const group = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const time = useRef(0);
  const colors = useMemo(() => ({ body: '#65a30d', belly: '#f7e7bd', spot: '#ea580c', eye: '#f8fafc', pupil: '#172554' }), []);

  useFrame((_, delta) => {
    time.current += delta;
    if (!group.current || reducedMotion) return;
    const breathing = Math.sin(time.current * 2.2) * 0.018;
    group.current.scale.y = 1 + breathing;
    if (head.current) {
      head.current.rotation.z = THREE.MathUtils.lerp(head.current.rotation.z, state === 'inspect' ? -0.12 : state === 'react' ? 0.16 : 0, 0.08);
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, isDragging ? -0.16 : 0, 0.08);
    }
    if (tail.current) {
      tail.current.rotation.z = Math.sin(time.current * (state === 'explore' ? 2.6 : 1.25)) * (state === 'explore' ? 0.12 : 0.05);
    }
  });

  const hidden = state === 'hidden';
  const scale = hidden ? 0 : isDragging ? 1.12 : 1;
  const bounce = state === 'greeting' ? Math.sin(time.current * 5) * 2 : 0;

  return (
    <group ref={group} position={[position.x + 58, position.y + 44 + bounce, 0]} scale={scale}>
      <group rotation={[0, 0, -0.08]}>
        <mesh position={[0, 12, 0]} castShadow>
          <sphereGeometry args={[24, 20, 14]} />
          <meshStandardMaterial color={colors.body} roughness={0.8} />
        </mesh>
        <mesh position={[0, 24, 5]} scale={[0.8, 0.38, 0.55]} castShadow>
          <sphereGeometry args={[26, 20, 14]} />
          <meshStandardMaterial color={colors.belly} roughness={0.92} />
        </mesh>

        <group ref={head} position={[30, -8, 4]}>
          <mesh castShadow>
            <sphereGeometry args={[21, 20, 16]} />
            <meshStandardMaterial color={colors.body} roughness={0.78} />
          </mesh>
          <mesh position={[-11, -5, 16]} scale={[0.42, 0.62, 0.22]}>
            <sphereGeometry args={[12, 16, 12]} />
            <meshStandardMaterial color={colors.eye} roughness={0.15} metalness={0.05} />
          </mesh>
          <mesh position={[11, -5, 16]} scale={[0.42, 0.62, 0.22]}>
            <sphereGeometry args={[12, 16, 12]} />
            <meshStandardMaterial color={colors.eye} roughness={0.15} metalness={0.05} />
          </mesh>
          <mesh position={[-11, -5, 19]} scale={[0.35, 0.52, 0.16]}>
            <sphereGeometry args={[8, 16, 12]} />
            <meshStandardMaterial color={colors.pupil} roughness={0.16} metalness={0.1} />
          </mesh>
          <mesh position={[11, -5, 19]} scale={[0.35, 0.52, 0.16]}>
            <sphereGeometry args={[8, 16, 12]} />
            <meshStandardMaterial color={colors.pupil} roughness={0.16} metalness={0.1} />
          </mesh>
          <mesh position={[-14, 12, 13]} scale={[0.35, 0.22, 0.18]}>
            <sphereGeometry args={[6, 12, 8]} />
            <meshStandardMaterial color={colors.spot} roughness={0.85} />
          </mesh>
          <mesh position={[13, 12, 13]} scale={[0.3, 0.2, 0.15]}>
            <sphereGeometry args={[6, 12, 8]} />
            <meshStandardMaterial color={colors.spot} roughness={0.85} />
          </mesh>
        </group>

        <Segment position={[-20, 3, 2]} rotation={[0, 0, -0.8]} length={22} radius={5} color={colors.body} />
        <Segment position={[0, 0, 2]} rotation={[0, 0, 0.8]} length={22} radius={5} color={colors.body} />
        <Segment position={[-17, 24, 2]} rotation={[0, 0, -0.85]} length={22} radius={5.5} color={colors.body} />
        <Segment position={[6, 25, 2]} rotation={[0, 0, 0.85]} length={22} radius={5.5} color={colors.body} />

        <group ref={tail} position={[-20, 25, 0]}>
          <Segment position={[-14, 5, 0]} rotation={[0, 0, -0.9]} length={26} radius={7} color={colors.body} />
          <Segment position={[-31, -8, 0]} rotation={[0, 0, -1.15]} length={24} radius={5.2} color={colors.body} />
          <Segment position={[-44, -25, 0]} rotation={[0, 0, -1.35]} length={23} radius={3.4} color={colors.body} />
        </group>
      </group>
    </group>
  );
}
