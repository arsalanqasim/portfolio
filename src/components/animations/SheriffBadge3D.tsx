import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { westernAudio } from '../../utils/westernAudio';

function BadgeModel({ isDragging, setIsDragging }: { isDragging: boolean; setIsDragging: (v: boolean) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const dragStartRef = useRef<{ x: number; rotY: number }>({ x: 0, rotY: 0 });

  // Generate 5-point star 2D shape (classic Texas/Western Sheriff star)
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 5;
    const outerRadius = 1.35;
    const innerRadius = 0.62;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 4,
    }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!isDragging) {
      // Idle rotation and floating oscillation
      groupRef.current.rotation.y += delta * 0.6;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 0.08;

      // Mouse pointer tilt
      const targetX = (-state.pointer.y * Math.PI) / 6;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    westernAudio.playStarChime();
    if (groupRef.current) {
      dragStartRef.current = {
        x: e.clientX,
        rotY: groupRef.current.rotation.y,
      };
    }
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging || !groupRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    groupRef.current.rotation.y = dragStartRef.current.rotY + deltaX * 0.015;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 3D Extruded Star */}
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[starShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#d4941e"
          roughness={0.22}
          metalness={0.88}
        />
      </mesh>

      {/* Central Brass Embossed Boss */}
      <mesh position={[0, 0, 0.16]}>
        <cylinderGeometry args={[0.38, 0.38, 0.08, 32]} />
        <meshStandardMaterial color="#8a530f" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* 5 Corner Ball Tips */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180 - Math.PI / 2;
        const x = Math.cos(rad) * 1.4;
        const y = Math.sin(rad) * 1.4;
        return (
          <mesh key={i} position={[x, y, 0.09]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#e5a828" roughness={0.2} metalness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function SheriffBadge3D() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="relative w-full h-56 sm:h-64 rounded border-2 border-border-strong bg-canvas/60 overflow-hidden shadow-inner flex flex-col items-center justify-center group">
      <div className="absolute top-2 left-3 right-3 flex items-center justify-between text-[10px] font-western text-accent tracking-wider z-10 pointer-events-none">
        <span>★ 3D WEBGL ENGINE ★</span>
        <span className="text-ink-muted">{isDragging ? 'SPINNING...' : 'DRAG TO ROTATE'}</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={2.5} />
        <directionalLight position={[-4, -3, 2]} intensity={1.0} color="#e58229" />
        <pointLight position={[0, 0, 2]} intensity={1.5} color="#fff" />
        <BadgeModel isDragging={isDragging} setIsDragging={setIsDragging} />
      </Canvas>

      <div className="absolute bottom-2 text-center text-[10px] font-serif text-ink-muted pointer-events-none">
        Procedural Three.js · Metallic Specular Shader
      </div>
    </div>
  );
}
