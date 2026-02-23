# Jerry's Water Network - Unity Implementation

A Unity implementation of the Jerry's Water Network game for charity: water.

## Project Setup

### Unity Version
**Minimum:** Unity 2020.3 LTS
**Recommended:** Unity 2022 LTS or later

### Initial Setup Steps

1. **Open the Project**
   - Create a new 2D project in Unity
   - Import the Assets folder contents

2. **Configure Project Settings**
   - Go to Edit > Project Settings > Player
   - Set Default Screen Width: 1080
   - Set Default Screen Height: 1920
   - Set Target Platforms: iOS and Android (for mobile)

3. **Create Scenes**
   - Create 4 new scenes in Assets/Scenes/:
     - MainMenu
     - Level
     - LevelComplete
     - Rewards

4. **Add Managers to MainMenu Scene**
   - Create empty GameObject named "GameManager"
   - Add the GameManager script to it
   - Create empty GameObject named "SceneLoader"
   - Add the SceneLoader script to it
   - Create Canvas for UI
   - Add the UIManager script to the Canvas

5. **Set Scene Build Order**
   - File > Build Settings
   - Add scenes in this order:
     1. MainMenu
     2. Level
     3. LevelComplete
     4. Rewards

### Dependencies
- **LeanTween** (for smooth animations)
  - Download from Asset Store or: https://assetstore.unity.com/packages/tools/animation/leantween-3595
  - Alternative: Use DOTween from Asset Store

### Folder Structure
```
Assets/
├── Sprites/
│   ├── Characters/
│   ├── Tiles/
│   ├── Particles/
│   ├── UI/
│   ├── Backgrounds/
├── Sounds/
├── Fonts/
├── Scenes/
├── Scripts/
│   ├── Managers/
│   ├── GamePlay/
│   ├── UI/
├── Data/
│   └── LevelConfigs/
└── Prefabs/
```

## Scripts Overview

### Managers
- **GameManager.cs** - Handles global game state, scoring, and data persistence
- **SceneLoader.cs** - Manages scene transitions between Main Menu, Level, Level Complete, and Rewards

### UI
- **UIManager.cs** - Central UI controller, manages button clicks and text updates
- **MainMenuController.cs** - Main Menu specific setup and animations

### GamePlay (To be implemented)
- **LevelManager.cs** - Manages level setup and rules
- **PipeManager.cs** - Handles pipe placement and grid snapping
- **WaterParticle.cs** - Water droplet movement and pathfinding
- **RewardSystem.cs** - Milestone tracking and rewards

## Color Reference

| Purpose | Hex | RGB |
|---------|-----|-----|
| Brand Yellow | #FFC907 | (255, 201, 7) |
| White Background | #FFFFFF | (255, 255, 255) |
| Light Sand | #F5F5DC | (245, 245, 220) |
| Water Blue | #B0E0E6 | (176, 224, 230) |
| Text Dark | #000000 | (0, 0, 0) |
| Button Hover | #E6B800 | (230, 184, 0) |

## Next Steps

1. **Create UI for Main Menu Scene**
   - Add Canvas with charity: water logo
   - Create Play and How It Works buttons (styled in brand yellow)
   - Connect buttons to UIManager callbacks

2. **Implement Level Scene**
   - Create 8×12 grid of tiles
   - Implement tile placement system
   - Add Water Source and Village sprites

3. **Create Water Particle System**
   - Spawn particles from Water Source
   - Implement pathfinding along pipes
   - Add particle collection at Village

4. **Add Sound Design**
   - Import water flow audio
   - Import success chime audio
   - Setup AudioSource components

5. **Create Level Data System**
   - Define level configurations in JSON
   - Implement level progression
   - Setup difficulty scaling

## Testing Checklist

- [ ] Main Menu loads correctly
- [ ] Play button transitions to Level scene
- [ ] GameManager persists across scene changes
- [ ] UI updates display correctly
- [ ] Sound effects play on button clicks
- [ ] Layout renders correctly at 1080×1920

## Tips for Development

- Use LeanTween for smooth animations and transitions
- Keep UI prefabs organized in Assets/Prefabs/
- Test on multiple device sizes using Game view
- Use Debug.Log for development tracking
- Store all game constants in respective Manager classes

## Asset Import Checklist

When you add art/audio assets, ensure:
- [ ] Sprites are imported as Sprite type, not Texture
- [ ] Audio clips are properly formatted (WAV or MP3)
- [ ] Fonts are imported correctly
- [ ] All assets use consistent naming conventions
- [ ] Layer settings are properly configured for sorting

## Additional Resources

- [Unity 2D Documentation](https://docs.unity3d.com/Manual/2DAnd3D.html)
- [UI Toolkit Documentation](https://docs.unity3d.com/Manual/UIElements.html)
- [Mobile Game Development Best Practices](https://docs.unity3d.com/Manual/MobileOptimization.html)
