# Anton 3D Production Plan (v1.0)

This document is the technical production specification and implementation plan for transforming **Anton the Gecko** from a design-locked concept into a real-time, low-latency 3D web asset. It serves as the authoritative blueprint for 3D modeling artists, rigging technical directors, and frontend creative developers.

---

## 1. Modeling Pipeline
To ensure high-performance rendering on mobile devices and lower-end web clients, Anton's mesh must be modeled according to real-time game specifications:
- **Topology**: Quad-dominant topology with clean edge loops around the eyes, shoulder/hip joints, and tail segments to support clean skeletal deformation.
- **Poly Budget**: Target **3,500 to 5,000 triangles** (approximately 1,800 to 2,500 quads).
- **Bind Pose**: Model in a neutral horizontal splayed gecko posture (all four limbs extended downward, head facing forward, tail straight) rather than a human T-pose.
- **Subdivision**: No runtime subdivision. All curvature must be modeled directly into the low-poly mesh, using normal maps to approximate fine scale detailing.

---

## 2. UV Mapping Strategy
- **Texture Packing**: All meshes (body, eyes, claws) must fit onto a single, unified UV coordinate sheet (0-1 UV space).
- **Seam Placement**: Locate UV seams on the underbelly line, the inner side of limbs, and underneath the tail to conceal visual breaks.
- **Texel Density**: Prioritize UV space for the head (specifically the eyes and eyelids) to ensure expressions remain readable. The tail and torso can use slightly compressed UV space.
- **Symmetry**: Mirror body UVs where appropriate to save texture space, but keep the head asymmetrical to accommodate custom orange spot variations.

---

## 3. Materials & Shading
Anton uses a standard **glTF PBR (Physically Based Rendering) Metallic-Roughness** shader workflow to ensure cross-renderer compatibility (Three.js, Blender, Unity):
- **Base Color (Albedo)**: 1024x1024 texture map containing green skin (`#4ADE80`), cream underbelly (`#F8FAFC`), and orange spots (`#F97316`).
- **Roughness Map**: Greyscale map setting the body roughness to `0.85`, underbelly to `0.95`, and eyes to `0.02` (glossy).
- **Normal Map**: 1024x1024 map simulating fine day gecko skin textures, scales, and limb ridges.
- **Metallic Map**: Flat zero value (non-metallic) for the skin, with optional tiny specular highlights.

---

## 4. Skeleton Hierarchy
The bone hierarchy must follow a clean, hierarchical nomenclature:

```
Root (Ground/Center)
└── Pelvis (Deform)
    ├── Spine_01 (Deform)
    │   ├── Spine_02 (Deform)
    │   │   ├── Neck (Deform)
    │   │   │   └── Head (Deform)
    │   │   │       ├── Eye_L (Deform/Control)
    │   │   │       └── Eye_R (Deform/Control)
    │   │   ├── Clavicle_L (Deform)
    │   │   │   └── Shoulder_L -> Elbow_L -> Wrist_L -> Fingers_L (Deform)
    │   │   └── Clavicle_R (Deform)
    │   │       └── Shoulder_R -> Elbow_R -> Wrist_R -> Fingers_R (Deform)
    │   ├── Hip_L (Deform)
    │   │   └── Knee_L -> Ankle_L -> Foot_L -> Toes_L (Deform)
    │   └── Hip_R (Deform)
    │       └── Knee_R -> Ankle_R -> Foot_R -> Toes_R (Deform)
    └── Tail_01 (Deform)
        └── Tail_02 -> Tail_03 -> Tail_04 -> Tail_05 -> Tail_06 (Deform)
```

---

## 5. Rigging Plan
- **Max Bone Influences**: Vertices must be weighted to **no more than 4 bones** per vertex to guarantee compatibility with glTF skinning limits in WebGL.
- **Weight Painting**: Ensure smooth transitions at the shoulders, hips, and tail segments. Limit limb twist deformations using falloff weight maps.
- **Control Rig vs. Deform Rig**: Create a secondary control rig (with IK/FK controllers) for animating in Blender, but export *only* the flat deform bone hierarchy to the final GLB asset.

---

## 6. Facial Rig Requirements
To support Anton's expressive states without adding mesh weight:
- **Eyelid blend shapes (Shape Keys)**:
  - `Blink_L` & `Blink_R`: Full closure of the eyelids (0 to 1 value).
  - `Squint_L` & `Squint_R`: Partial narrowing of the eyes for the "Focused" state.
- **Pupil Scale (Shape Keys)**:
  - `Pupil_Contract`: Pupils shrink to vertical slits (Focused state).
  - `Pupil_Dilate`: Pupils expand to large circles (Alert/Curious state).
- **Head Rotation**: The `Head` bone is constrained to `±45 degrees` on the Yaw (Y) axis and `±25 degrees` on the Pitch (X) axis.

---

## 7. Tail Rig
- **Bone Chain**: The tail consists of 6 sequential bones (`Tail_01` to `Tail_06`).
- **Blender Control**: Use a Spline IK or a chain of Copy Rotation constraints with decreasing influence multipliers down the chain.
- **Wag Formula**: In the game engine/Three.js code, the tail movement can be supplemented by a sine wave formula:
  \[\theta_i = A \cdot \sin(\omega \cdot t - i \cdot \phi)\]
  Where \(i\) is the bone index, \(A\) is the wag amplitude, \(\omega\) is the frequency, and \(\phi\) is the phase offset between segments.

---

## 8. Foot IK Considerations
- **Limb Solvers**: Use a standard two-joint IK setup (Thigh-Shin-Foot) for rear limbs and Shoulder-Arm-Wrist for front limbs.
- **Floor Snapping**: Foot bones require target IK empty nodes to support dynamic raycasting in Three.js, allowing Anton's paws to adjust heights when traversing variable-height portfolio cards.
- **Wall Climbing Snapping**: Rotation targets must support 90-degree alignment shifts when Anton climbs vertical container walls.

---

## 9. Animation Library
All animations must be baked and exported as named glTF action clips:
1. `idle_neutral`: Rhythmic chest breathing, minor tail shift, default eye gaze.
2. `idle_sleep`: Tucked posture, tail wrapped, eyes closed, slow breathing.
3. `traverse_walk`: Quadrupedal locomotion loop utilizing the diagonal gait.
4. `traverse_climb`: Vertical climb cycle with body weight pulling down.
5. `inspect_look`: Quick head point rotation, eye dilation twitch, tail tip flutter.
6. `celebrate_backflip`: High-speed backflip loop (triggered by Konami Code).

---

## 10. GLB Export Settings
When exporting from Blender, use these settings:
- **Format**: `glTF Binary (.glb)` (packs textures and geometry into a single compressed file).
- **Include**: Selected Objects, Custom Properties, Armatures, Mesh, Shape Keys, Skinning.
- **Animation**: Bake Animations, Sampling Rate: `1`, Keyframe Reduction: `Enabled` (removes redundant flat keyframes).
- **Compression**: Enable Draco geometry compression to optimize vertices data transfers.

---

## 11. Performance Budget
| Parameter | Target Limit | Critical Redline |
| :--- | :--- | :--- |
| **File Size (Draco)** | **< 1.0 MB** | > 2.0 MB |
| **Triangle Count** | **3,800** | > 5,500 |
| **Draw Calls** | **1** (Single PBR Material) | > 2 |
| **Texture Maps** | **1x 1024x1024** | 2048x2048 |
| **Bone Count** | **32 Bones** | > 45 Bones |

---

## 12. React Three Fiber Integration Plan
- **Asset Loading**: Load the model using `@react-three/drei`'s dynamic loader:
  ```javascript
  const { nodes, materials, animations } = useGLTF('/anton.glb', true); // True enables Draco decoding
  ```
- **Animation Control**: Hook clips into the R3F render loop:
  ```javascript
  const { actions } = useAnimations(animations, groupRef);
  useEffect(() => {
    actions['idle_neutral'].fadeIn(0.2).play();
  }, [actions]);
  ```
- **State Integration**: Connect the local React state with R3F properties, shifting positions when the portfolio state transitions (e.g. from navbar base to projects explorer).

---

## 13. Asset Versioning
- **Semantic File Naming**: Store files as `anton_v[MAJOR].[MINOR].[PATCH].glb` (e.g. `anton_v1.0.0.glb`).
- **Metadata Tagging**: Embed the corresponding version string into the GLB's custom properties metadata to allow client checks against the DNA version.

---

## 14. Future Extensibility
- **Item Socket Sockets**: Add empty constraint locator bones relative to the front limb paws:
  - `Socket_Front_L` & `Socket_Front_R`
  - Allows easy parenting of future interactive items (laptop, notebook, code cube) directly to Anton's hands without editing the base rig.
