import bpy
import math
import os

# Clear existing objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# 1. Create Armature
bpy.ops.object.armature_add(enter_editmode=True, align='WORLD', location=(0, 0, 0))
arm_obj = bpy.context.active_object
arm_obj.name = "AntonArmature"
arm = arm_obj.data
arm.name = "AntonRig"

# Edit bones
bpy.ops.armature.select_all(action='DESELECT')
# Default bone is 'Bone'. Let's rename it to 'root'
root_bone = arm.edit_bones['Bone']
root_bone.name = 'root'
root_bone.head = (0, 0, 0)
root_bone.tail = (0, 0, 0.1)

# Add spine
spine = arm.edit_bones.new('spine')
spine.head = (0, 0, 0.1)
spine.tail = (0, 1, 0.1)
spine.parent = root_bone
spine.use_connect = False

# Add head (required anchor: head)
head = arm.edit_bones.new('head')
head.head = (0, 1, 0.1)
head.tail = (0, 1.5, 0.2)
head.parent = spine
head.use_connect = True

# Add tail (required anchor: tail)
tail = arm.edit_bones.new('tail')
tail.head = (0, 0, 0.1)
tail.tail = (0, -1, 0.1)
tail.parent = root_bone
tail.use_connect = False

# Add eyes anchor (required anchor: eyes)
eyes = arm.edit_bones.new('eyes')
eyes.head = (0, 1.2, 0.3)
eyes.tail = (0, 1.3, 0.4)
eyes.parent = head
eyes.use_connect = False

# Add front sockets (required anchors: front sockets)
front_left = arm.edit_bones.new('front_left_socket')
front_left.head = (0.3, 0.8, 0.1)
front_left.tail = (0.5, 0.8, 0.0)
front_left.parent = spine
front_left.use_connect = False

front_right = arm.edit_bones.new('front_right_socket')
front_right.head = (-0.3, 0.8, 0.1)
front_right.tail = (-0.5, 0.8, 0.0)
front_right.parent = spine
front_right.use_connect = False

bpy.ops.object.mode_set(mode='OBJECT')

# 2. Create the Mesh (Stylized Gecko Blockout)
# Body
bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=8, radius=0.4, location=(0, 0.5, 0.1))
body_obj = bpy.context.active_object
body_obj.name = "AntonBody"
body_obj.scale = (0.7, 1.5, 0.5)

# Head
bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=8, radius=0.3, location=(0, 1.3, 0.2))
head_obj = bpy.context.active_object
head_obj.name = "AntonHead"
head_obj.scale = (0.8, 1.0, 0.6)

# Tail
bpy.ops.mesh.primitive_cone_add(vertices=16, radius1=0.2, depth=1.5, location=(0, -0.5, 0.1))
tail_obj = bpy.context.active_object
tail_obj.name = "AntonTail"
tail_obj.rotation_euler = (math.radians(-90), 0, 0)
tail_obj.scale = (0.8, 1.0, 0.5)

# Join meshes
bpy.ops.object.select_all(action='DESELECT')
body_obj.select_set(True)
head_obj.select_set(True)
tail_obj.select_set(True)
bpy.context.view_layer.objects.active = body_obj
bpy.ops.object.join()
mesh_obj = bpy.context.active_object
mesh_obj.name = "AntonMesh"

# Add Material
mat = bpy.data.materials.new(name="AntonMaterial")
mat.use_nodes = True
bsdf = mat.node_tree.nodes["Principled BSDF"]
bsdf.inputs['Base Color'].default_value = (0.1, 0.6, 0.2, 1) # Greenish
mesh_obj.data.materials.append(mat)

# Parent mesh to armature with automatic weights
bpy.ops.object.select_all(action='DESELECT')
mesh_obj.select_set(True)
arm_obj.select_set(True)
bpy.context.view_layer.objects.active = arm_obj
bpy.ops.object.parent_set(type='ARMATURE_AUTO')

# 3. Create Animations
anim_names = ["arrival", "greeting", "explore", "inspect", "observe", "react", "rest", "hidden", "picked-up", "return"]
if not arm_obj.animation_data:
    arm_obj.animation_data_create()

bpy.ops.object.mode_set(mode='POSE')
for anim_name in anim_names:
    action = bpy.data.actions.new(name=anim_name)
    arm_obj.animation_data.action = action
    
    pose_bone = arm_obj.pose.bones['root']
    head_bone = arm_obj.pose.bones['head']
    
    # Default state frame 1
    pose_bone.location = (0, 0, 0)
    head_bone.rotation_quaternion = (1, 0, 0, 0)
    pose_bone.keyframe_insert(data_path="location", frame=1)
    head_bone.keyframe_insert(data_path="rotation_quaternion", frame=1)
    
    # Frame 30 (simple variations per animation)
    if anim_name == "greeting":
        head_bone.rotation_quaternion = (0.9, 0, 0.3, 0) # slight tilt
    elif anim_name == "hidden":
        pose_bone.location = (0, 0, -5) # Move out of view
    elif anim_name == "picked-up":
        pose_bone.location = (0, 0, 2) # Lifted up
        
    pose_bone.keyframe_insert(data_path="location", frame=30)
    head_bone.keyframe_insert(data_path="rotation_quaternion", frame=30)
    
    # Stash the action into NLA tracks so it gets exported by GLTF
    track = arm_obj.animation_data.nla_tracks.new()
    track.name = anim_name
    track.strips.new(anim_name, int(action.frame_range[0]), action)

bpy.ops.object.mode_set(mode='OBJECT')

# 4. Export GLB
out_dir = "C:/Users/arsal/Desktop/portfolio/public/assets/anton"
os.makedirs(out_dir, exist_ok=True)
export_path = os.path.join(out_dir, "anton_v1.0.0.glb")

bpy.ops.export_scene.gltf(
    filepath=export_path,
    export_format='GLB',
    export_animations=True,
    export_nla_strips=True,
    export_def_bones=False
)
print("Exported GLB to", export_path)
