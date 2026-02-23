# Quick Start Guide - Jerry's Water Network

## Getting Started in 5 Minutes

### Step 1: Create a New Unity Project
- Open Unity Hub
- Click "New Project"
- Select **2D Core**
- Name it "GameForWater-Charity"
- Choose a location and click Create

### Step 2: Configure Project Settings
```
Edit > Project Settings > Player

Screen Size:
  - Default Screen Width: 1080
  - Default Screen Height: 1920

Aspect Ratio: Custom (9:16 Portrait)
```

### Step 3: Create Directories
In the Assets folder, create these directories:
```
Assets/
├── Scripts/
│   ├── Managers/
│   ├── GamePlay/
│   └── UI/
├── Sprites/
├── Sounds/
├── Data/
└── Scenes/
```

### Step 4: Copy Scripts
Copy all the script files provided:
- `GameManager.cs` → Assets/Scripts/Managers/
- `SceneLoader.cs` → Assets/Scripts/Managers/
- `UIManager.cs` → Assets/Scripts/UI/
- `MainMenuController.cs` → Assets/Scripts/UI/

### Step 5: Create Scenes
Create 4 new scenes in Assets/Scenes/:
1. Save as "MainMenu"
2. Save as "Level"
3. Save as "LevelComplete"
4. Save as "Rewards"

### Step 6: Set Build Order
Go to **File > Build Settings**:
1. Drag MainMenu scene to index 0
2. Drag Level scene to index 1
3. Drag LevelComplete scene to index 2
4. Drag Rewards scene to index 3

### Step 7: Setup Main Menu Scene
In the MainMenu scene:
1. Create → UI > Canvas
2. On Canvas, create Panels and Buttons:
   - Image (Logo) at top-center
   - Button (Play) at center
   - Button (How It Works) below
3. Attach scripts:
   - Add `MainMenuController` script to Canvas
   - Create GameManager GameObject and attach `GameManager` script
   - Create SceneLoader GameObject and attach `SceneLoader` script
   - Attach `UIManager` script to Canvas

### Step 8: Install LeanTween (For Animations)
Option A - Asset Store (Recommended):
- Open Asset Store in Unity
- Search "LeanTween"
- Download and import

Option B - Manual:
- Download from: https://github.com/dentedpixel/LeanTween
- Extract to Assets/Plugins/

### Step 9: Test Main Menu
1. Press Play
2. Verify:
   - Background is white
   - Logo displays at top
   - Two buttons display in brand yellow (#FFC907)
   - Buttons are clickable
   - No console errors

## Next Phases

### Phase 2: Level Scene
- [ ] Create 8×12 grid of tiles
- [ ] Add Water Source sprite at top-middle
- [ ] Add Village sprite at bottom-middle
- [ ] Create LevelManager script
- [ ] Implement pipe placement system

### Phase 3: Water System
- [ ] Create water particle prefab
- [ ] Implement particle spawning
- [ ] Create pathfinding system
- [ ] Test water follows pipes

### Phase 4: Polish
- [ ] Add animations
- [ ] Add sound effects
- [ ] Add particle effects
- [ ] Optimize for mobile

## Debugging

### Enable Debug Mode
In the Inspector:
1. Select GameManager
2. Check "Debug Mode" checkbox
3. Console will show detailed logs

### Common Issues

**"Can't find scene MainMenu"**
- Ensure scenes are in Build Settings in correct order

**Buttons not working**
- Check UIManager is attached to Canvas
- Verify buttons have EventTrigger or Button component

**Colors look wrong**
- Ensure colors are set to sRGB mode
- Check Sprite compression settings

## File Locations

- **Scripts:** `Assets/Scripts/`
- **Scenes:** `Assets/Scenes/`
- **Data:** `Assets/Data/LevelConfigs/`
- **Documentation:** `Unity Project/README.md`

## Next Command

Ready to build the Level scene? Let me know and I'll create:
- LevelManager script
- Grid system
- Tile prefabs
- Pipe placement system
