import fs from 'node:fs/promises';
import path from 'node:path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

// GLTFExporter is browser-first. Node 22 provides Blob, but not FileReader.
globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((value) => {
      this.result = value;
      this.onloadend?.();
    });
  }
};

const outputPath = path.resolve('public/assets/anton/anton_v1.0.0.glb');
const palette = {
  body: '#4ADE80',
  belly: '#F8FAFC',
  spot: '#F97316',
  eye: '#F8FAFC',
  pupil: '#1E293B',
};

const materials = Object.fromEntries(
  Object.entries(palette).map(([name, color]) => [
    name,
    new THREE.MeshStandardMaterial({
      color,
      roughness: name === 'eye' || name === 'pupil' ? 0.08 : name === 'belly' ? 0.95 : 0.85,
      metalness: 0,
    }),
  ]),
);

function mesh(root, name, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1]) {
  const object = new THREE.Mesh(geometry, material);
  object.name = name;
  object.position.set(...position);
  object.rotation.set(...rotation);
  object.scale.set(...scale);
  root.add(object);
  return object;
}

function segment(root, name, position, rotationZ, length, radius, material = materials.body) {
  return mesh(
    root,
    name,
    new THREE.CapsuleGeometry(radius, length, 6, 12),
    material,
    position,
    [0, 0, rotationZ],
  );
}

function vectorTrack(nodeName, property, times, values) {
  return new THREE.VectorKeyframeTrack(`${nodeName}.${property}`, times, values);
}

function rotationTrack(nodeName, times, angles, axis = 'z') {
  const values = [];
  angles.forEach((angle) => {
    const euler = new THREE.Euler(
      axis === 'x' ? angle : 0,
      axis === 'y' ? angle : 0,
      axis === 'z' ? angle : 0,
    );
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
    values.push(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  });
  return new THREE.QuaternionKeyframeTrack(`${nodeName}.quaternion`, times, values);
}

function scaleTrack(nodeName, times, values) {
  return vectorTrack(nodeName, 'scale', times, values.flat());
}

const scene = new THREE.Scene();
scene.name = 'AntonProductionScene';
scene.userData = {
  character: 'Anton',
  assetVersion: '1.0.0',
  source: 'procedural-low-poly-production-placeholder',
  rigContract: 'anton-v1',
};

const root = new THREE.Group();
root.name = 'AntonRoot';
root.userData = {
  anchors: ['Head', 'Eye_L', 'Eye_R', 'Tail_01', 'Socket_Front_L', 'Socket_Front_R'],
  animationIntents: ['arrival', 'greeting', 'explore', 'inspect', 'observe', 'react', 'rest', 'hidden', 'picked-up', 'return'],
};
scene.add(root);

mesh(root, 'Body', new THREE.SphereGeometry(24, 20, 14), materials.body, [0, 12, 0]);
mesh(root, 'Belly', new THREE.SphereGeometry(26, 20, 14), materials.belly, [0, 24, 5], [0, 0, 0], [0.8, 0.38, 0.55]);

const head = new THREE.Group();
head.name = 'Head';
head.position.set(30, -8, 4);
root.add(head);
mesh(head, 'HeadMesh', new THREE.SphereGeometry(21, 20, 16), materials.body);
mesh(head, 'Eye_L', new THREE.SphereGeometry(12, 16, 12), materials.eye, [-11, -5, 16], [0, 0, 0], [0.42, 0.62, 0.22]);
mesh(head, 'Eye_R', new THREE.SphereGeometry(12, 16, 12), materials.eye, [11, -5, 16], [0, 0, 0], [0.42, 0.62, 0.22]);
mesh(head, 'Pupil_L', new THREE.SphereGeometry(8, 16, 12), materials.pupil, [-11, -5, 19], [0, 0, 0], [0.35, 0.52, 0.16]);
mesh(head, 'Pupil_R', new THREE.SphereGeometry(8, 16, 12), materials.pupil, [11, -5, 19], [0, 0, 0], [0.35, 0.52, 0.16]);
mesh(head, 'Spot_L', new THREE.SphereGeometry(6, 12, 8), materials.spot, [-14, 12, 13], [0, 0, 0], [0.35, 0.22, 0.18]);
mesh(head, 'Spot_R', new THREE.SphereGeometry(6, 12, 8), materials.spot, [13, 12, 13], [0, 0, 0], [0.3, 0.2, 0.15]);

segment(root, 'FrontLeg_L', [-20, 3, 2], -0.8, 22, 5);
const greetingHand = segment(root, 'FrontLeg_R', [0, 0, 2], 0.8, 22, 5);
greetingHand.userData.anchor = 'Socket_Front_R';
segment(root, 'BackLeg_L', [-17, 24, 2], -0.85, 22, 5.5);
segment(root, 'BackLeg_R', [6, 25, 2], 0.85, 22, 5.5);

const tail = new THREE.Group();
tail.name = 'Tail_01';
tail.position.set(-20, 25, 0);
root.add(tail);
segment(tail, 'Tail_02', [-14, 5, 0], -0.9, 26, 7);
segment(tail, 'Tail_03', [-31, -8, 0], -1.15, 24, 5.2);
segment(tail, 'Tail_04', [-44, -25, 0], -1.35, 23, 3.4);

const socketLeft = new THREE.Object3D();
socketLeft.name = 'Socket_Front_L';
socketLeft.position.set(-32, -6, 4);
root.add(socketLeft);
const socketRight = new THREE.Object3D();
socketRight.name = 'Socket_Front_R';
socketRight.position.set(12, -8, 4);
root.add(socketRight);

const clips = [
  new THREE.AnimationClip('arrival', 0.65, [
    vectorTrack('AntonRoot', 'scale', [0, 0.65], [0.02, 0.02, 0.02, 1, 1, 1]),
    vectorTrack('AntonRoot', 'position', [0, 0.65], [0, -18, 0, 0, 0, 0]),
  ]),
  new THREE.AnimationClip('greeting', 1.1, [
    rotationTrack('FrontLeg_R', [0, 0.24, 0.52, 0.8, 1.1], [0.8, 0.1, 1.0, 0.15, 0.8]),
    rotationTrack('Head', [0, 0.42, 0.82, 1.1], [0, -0.08, 0.08, 0]),
  ]),
  new THREE.AnimationClip('explore', 1.2, [
    rotationTrack('Tail_01', [0, 0.3, 0.6, 0.9, 1.2], [0, 0.1, -0.1, 0.08, 0]),
    scaleTrack('Body', [0, 0.3, 0.6, 0.9, 1.2], [[1, 1, 1], [1, 1.04, 1], [1, 0.98, 1], [1, 1.02, 1], [1, 1, 1]]),
  ]),
  new THREE.AnimationClip('inspect', 1.5, [
    rotationTrack('Head', [0, 0.45, 1.0, 1.5], [0, -0.18, -0.18, 0]),
    rotationTrack('Tail_01', [0, 0.75, 1.5], [0, 0.12, 0]),
  ]),
  new THREE.AnimationClip('observe', 1.2, [
    rotationTrack('Head', [0, 0.6, 1.2], [0, 0.14, 0]),
  ]),
  new THREE.AnimationClip('react', 0.8, [
    rotationTrack('Tail_01', [0, 0.18, 0.4, 0.8], [0, 0.25, -0.25, 0]),
    rotationTrack('Head', [0, 0.3, 0.8], [0, -0.14, 0]),
  ]),
  new THREE.AnimationClip('rest', 1.4, [
    scaleTrack('Body', [0, 0.7, 1.4], [[1, 1, 1], [1, 0.94, 1], [1, 1, 1]]),
    rotationTrack('Head', [0, 1.4], [0, -0.04]),
  ]),
  new THREE.AnimationClip('hidden', 0.4, [
    vectorTrack('AntonRoot', 'scale', [0, 0.4], [1, 1, 1, 0, 0, 0]),
  ]),
  new THREE.AnimationClip('picked-up', 0.4, [
    vectorTrack('AntonRoot', 'scale', [0, 0.2, 0.4], [1, 1, 1, 1.15, 1.15, 1.15, 1.08, 1.08, 1.08]),
  ]),
  new THREE.AnimationClip('return', 0.6, [
    vectorTrack('AntonRoot', 'scale', [0, 0.6], [0.92, 0.92, 0.92, 1, 1, 1]),
    rotationTrack('Tail_01', [0, 0.6], [0.16, 0]),
  ]),
];

const exporter = new GLTFExporter();
const binary = await exporter.parseAsync(scene, {
  binary: true,
  animations: clips,
  trs: true,
  onlyVisible: true,
  includeCustomExtensions: true,
});

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, Buffer.from(binary));
console.log(`Generated ${outputPath} (${(binary.byteLength / 1024).toFixed(1)} KB)`);
