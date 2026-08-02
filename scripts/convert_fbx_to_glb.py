import bpy
import sys
import os

# Get arguments
argv = sys.argv
if "--" not in argv:
    print("No arguments provided after --")
    sys.exit(1)

args = argv[argv.index("--") + 1:]
if len(args) < 2:
    print("Usage: blender --background --python convert.py -- <input_fbx> <output_glb>")
    sys.exit(1)

input_fbx = args[0]
output_glb = args[1]

# Clear existing scene
bpy.ops.wm.read_factory_settings(use_empty=True)

# Import FBX
bpy.ops.import_scene.fbx(filepath=input_fbx)

# Rename the animation action to 'greeting' so React can easily target it
for action in bpy.data.actions:
    action.name = 'greeting'

# Export GLB
bpy.ops.export_scene.gltf(
    filepath=output_glb,
    export_format='GLB',
    export_animations=True
)

print(f"Successfully converted {input_fbx} to {output_glb}")
