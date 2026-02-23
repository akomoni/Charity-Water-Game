# Unity Project Configuration Reference

## Game Settings

### Screen Configuration
```
Target Resolution: 1080 × 1920 (Mobile Portrait 9:16)
Aspect Ratio: 9:16 (Portrait)
Default DPI: 326 (Standard mobile)
Match: Preferred aspect ratio
```

### Physics 2D Settings
```
Gravity: (0, -9.81)  // Pulls particles downward
Default Material Friction: 0.4
Default Material Bounciness: 0
Sleep Angular Velocity: 0.1
Sleep Linear Velocity: 0.1
Solver Iterations: 8
Solver Velocity Iterations: 4
```

### Quality Settings
```
Texture Quality: Full Res
Anisotropic Textures: Disabled (for mobile)
Anti Aliasing: Disabled
Shadows: Disabled (for mobile performance)
V Sync Count: 1 (60 FPS cap)
```

## Player Settings

### Resolution and Presentation
```
Full Screen: Off
Allowed Orientations: Portrait (lock to portrait only)
Status Bar Hidden: True (for fullscreen mobile experience)
```

### Graphics
```
Color Space: Linear (or Gamma - test both)
Use HDR: Disabled
Graphics API: Vulkan first (Android), Metal (iOS)
```

### Scripting
```
API Compatibility Level: .NET Standard 2.1
IL2CPP Stripping: Minimal (ensure no required libraries are stripped)
```

### Other Settings
```
Target Architecture: ARMv7 + ARM64 (Android)
Scripting Backend: IL2CPP (for performance)
```

## Layer Configuration

Create these layers in Edit > Project Settings > Tags and Layers:

```
Layer 0: Default
Layer 1: TransparentFX
Layer 2: Ignore Raycast
Layer 3: Water
Layer 4: UI
Layer 5: Pipes
Layer 6: Tiles
Layer 7-31: (Reserved for future use)
```

## Tag Configuration

Create these tags for object identification:

```
Tags:
- Player
- WaterParticle
- Pipe
- Tile
- WaterSource
- Village
- Filter
- Block
```

## Canvas Settings

### Main Menu Canvas
```
Render Mode: Screen Space - Overlay
UV Rect: 0, 0, 1, 1
Pixel Perfect: True (for sharp UI text)
Reference Pixels Per Unit: 100
Match Mode: Match Width or Height
Width Reference: 1080
Height Reference: 1920
Letter Box Pad Aspect: Enabled
```

### Sorting Order
```
Main UI Canvas: 100
Game UI Canvas: 50
World Canvas: 0
```

## Camera Settings

### Main Camera
```
Projection: Orthographic
Orthographic Size: 10
Near Clip Plane: -1
Far Clip Plane: 1000
Viewport Rect: 0, 0, 1, 1
Depth: -1
Rendering Path: Forward
```

## Font Settings

### Recommended Fonts
Use free Google Fonts for consistency:
- **Headers:** Roboto Bold 36-48pt
- **Body Text:** Open Sans Regular 16-20pt
- **UI Labels:** Roboto Medium 14-18pt

Import fonts to Assets/Fonts/:
1. Download TTF files from Google Fonts
2. Drag into Assets/Fonts/
3. Import with default settings
4. Set Material to "Arial"

## Sprite Import Settings

All sprites should use:
```
Texture Type: Sprite (2D and UI)
Sprite Mode: Single
Filter Mode: Point (for pixel-perfect look)
Compression: Compressed
Max Size: 2048
Platform Overrides:
  - Android: Max Size 1024, Compression ETC2
  - iOS: Max Size 1024, Compression PVRTC
```

## Audio Settings

### Audio Clip Import
```
Audio Format:
  - Android: Vorbis, Quality 50%
  - iOS: ADPCM, 16-bit
  - PC: Uncompressed
Load Type: Decompress On Load (for sound effects)
Preload Audio Data: True
```

### AudioSource Setup
```
Volume: 0.8 (100% = too loud)
Pitch: 1.0
Spatial Blend: 2D
Max Distance: 500
```

## Time Scale Settings

```
Fixed Timestamp: 0.02 (50 FPS physics)
Time Scale: 1.0 (normal speed)
Maximum Particle Timestep: 0.03
```

## Build Settings

### Android Build
```
Minimum API Level: 24 (Android 7.0)
Target API Level: 30+
Scripting Backend: IL2CPP
CPU: ARMv7 + ARM64
Keystore: Configure for production
```

### iOS Build
```
Target Minimum iOS Version: 12.0
Scripting Backend: IL2CPP
Architecture: ARM64
Entitlements: None required
```

## Shader Configuration

For mobile optimization, use these shaders:
```
UI: UI/Default
Sprites: Sprites/Default
Unlit: Unlit/Color
```

Do NOT use:
```
Standard (too heavy for mobile)
Particle System (use sprite-based instead)
Post-Processing effects
```

## Optimization Checklist

- [ ] Static Batching enabled
- [ ] GPU Instancing enabled on materials
- [ ] Sprite Atlasing configured
- [ ] Unused assets removed from project
- [ ] Mip mapping disabled for UI
- [ ] Compress textures appropriately
- [ ] Audio compression configured per platform
- [ ] LOD Group considered for complex geometry
- [ ] Canvas Scaler properly configured

## Save Configuration Script

You can automate some settings in a script:

```csharp
using UnityEditor;

public class ProjectSetup
{
    [MenuItem("Tools/Setup Project")]
    public static void SetupProject()
    {
        // Set physics gravity for water
        Physics2D.gravity = new Vector2(0, -9.81f);
        
        // Set quality settings
        QualitySettings.vSyncCount = 1;
        
        Debug.Log("Project setup complete!");
    }
}
```

Save this as `Assets/Editor/ProjectSetup.cs`
