# Level Scene Setup Guide

## Overview

The Level scene is the core gameplay area where players build water pipe networks. This guide walks through setting it up in Unity step-by-step.

---

## Scripts Created for Level Scene

All scripts are ready to use in:
```
Assets/Scripts/GamePlay/
├── LevelManager.cs         ✅ Manages level flow and game state
├── GridSystem.cs           ✅ Creates and manages the 8×12 grid
├── TileController.cs       ✅ Individual tile behavior
├── PipeManager.cs          ✅ Handles pipe placement and validation
└── WaterParticle.cs        ✅ Water droplet movement and collection

Assets/Scripts/UI/
└── LevelUIController.cs    ✅ Manages all level UI elements
```

---

## Step 1: Create Level Scene

### In Unity Editor:

1. **Open the Level scene file**
   - Or create new: File > New Scene (Scene)
   - Save as: `Assets/Scenes/Level.unity`

2. **Set Scene Render Settings**
   - Windows > Rendering > Lighting Settings
   - Ambient Color: #FFFFFF (white)
   - Remove unnecessary lighting

3. **Create Main Camera**
   - Right-click in Hierarchy > Camera
   - Name: "MainCamera"
   - Position: (0, 0, -10)
   - Set size to: 10 (orthographic)

---

## Step 2: Create Canvas for UI

### Add Main UI Canvas:

1. **Right-click Hierarchy > UI > Canvas**
   - Name: "LevelCanvas"
   - Canvas Render Mode: Screen Space - Overlay
   - Set to scale with screen

2. **Configure Canvas Scaler**
   - Select Canvas > Inspector
   - Add component: Canvas Scaler
   - Set Match to: Match Width or Height
   - Match: Width
   - Reference Resolution: 1080, 1920

3. **Attach LevelUIController Script**
   - Select Canvas
   - Drag `LevelUIController.cs` into Inspector
   - Or Add Component > Script > LevelUIController

---

## Step 3: Create Top Bar UI

### Add Top Bar Panel:

1. **Create Panel**
   - Right-click Canvas > UI > Panel
   - Name: "TopBar"
   - Set Layout:
     - Height: 80
     - Position Y: 960 (top)
     - Anchor: Top, Stretch Horizontally

2. **Style Panel**
   - Background Color: #FFFFFF (white)
   - Add shadow or border line

3. **Add Level Number Text**
   - Right-click TopBar > UI > Text
   - Name: "LevelNumberText"
   - Text: "Level 1"
   - Font Size: 24
   - Color: #333333 (dark gray)
   - Position: Left side

4. **Add Logo Image**
   - Right-click TopBar > UI > Image
   - Name: "LogoImage"
   - Image: (To be added when logo is imported)
   - Size: 60×60
   - Position: Center

5. **Add Timer Text**
   - Right-click TopBar > UI > Text
   - Name: "TimerText"
   - Text: "60s"
   - Font Size: 24
   - Color: #2596BE (brand blue)
   - Position: Right side

---

## Step 4: Create Game Grid

### Add Grid Container:

1. **Create Empty GameObject**
   - Right-click Hierarchy > Create Empty
   - Name: "GridContainer"
   - Position: (0, 0, 0)
   - Parent to: Main canvas or world

2. **Add Grid Manager**
   - Attach `LevelManager.cs` script
   - Attach `GridSystem.cs` script (auto-created)
   - Attach `PipeManager.cs` script (auto-created)

3. **Assign References**
   - In LevelManager Inspector:
     - Grid Container: Drag GridContainer
     - Level UI Controller: Drag your LevelUIController

### The grid will auto-generate when the scene starts!

---

## Step 5: Create Bottom Bar UI

### Add Bottom Bar Panel:

1. **Create Panel**
   - Right-click Canvas > UI > Panel
   - Name: "BottomBar"
   - Layout:
     - Height: 100
     - Position Y: -50 (bottom)
     - Anchor: Bottom, Stretch Horizontally

2. **Add Score Text (Left)**
   - Right-click BottomBar > UI > Text
   - Name: "ScoreText"
   - Text: "People Helped: 0"
   - Font Size: 18
   - Color: #333333
   - Align: Left

3. **Create Button Container (Right)**
   - Right-click BottomBar > UI > Panel
   - Name: "ButtonContainer"
   - Layout: Horizontal Layout Group
   - Position: Right side

4. **Add Start Button**
   - Right-click ButtonContainer > UI > Button
   - Name: "StartButton"
   - Text: "START"
   - Size: 120×60
   - Color: #FFC908 (yellow)

5. **Add Restart Button**
   - Right-click ButtonContainer > UI > Button
   - Name: "RestartButton"
   - Text: "RESTART"
   - Size: 120×60
   - Color: #2596BE (blue)

---

## Step 6: Create Special Tiles

### Add Water Source:

1. **Create Empty GameObject**
   - Right-click Hierarchy > Create Empty
   - Name: "WaterSource"
   - Attach script: (Leave blank for now)

2. **Add Visual Indicator**
   - Add Sprite Renderer component
   - Color: #2596BE (brand blue)
   - Sprite: Create a simple circle or use placeholder

### Add Village:

1. **Create Empty GameObject**
   - Right-click Hierarchy > Create Empty
   - Name: "Village"

2. **Add Visual Indicator**
   - Add Sprite Renderer component
   - Color: #FFC908 (brand yellow)
   - Sprite: Create a simple house shape or placeholder

3. **Add Jerry Character (Optional)**
   - Create another empty GameObject next to Village
   - Name: "Jerry"
   - Add sprite with character

---

## Step 7: Create Water Particle Prefab

### Make Particle Prefab:

1. **Create GameObject**
   - Right-click Hierarchy > Create > Sphere
   - Name: "WaterParticlePrefab"
   - Scale: (0.3, 0.3, 0.3)

2. **Add Components**
   - SpriteRenderer: Color #87CEEB (light blue)
   - CircleCollider2D (radius: 0.15)
   - Rigidbody2D: Gravity Scale 0
   - Script: `WaterParticle.cs`

3. **Make it a Prefab**
   - Drag from Hierarchy to Assets/Prefabs/
   - Create new Prefab "WaterParticlePrefab"
   - Delete from scene

4. **Assign to LevelManager**
   - Select LevelManager
   - In Inspector, drag "WaterParticlePrefab" to the field

---

## Step 8: Connect References

### In LevelManager Inspector, assign:

```
Grid Settings:
  ├─ Grid Width: 8
  ├─ Grid Height: 12
  ├─ Tile Size: 120

Game Settings:
  ├─ Water Needed To Win: 100
  ├─ Timer Seconds: 60
  ├─ Max Pipe Pieces: 10
  └─ Water Spawn Rate: 0.5

References:
  ├─ Grid Container: GridContainer
  ├─ Water Source Position: WaterSource
  ├─ Village Position: Village
  ├─ Water Particle Prefab: WaterParticlePrefab
  └─ Level UI Controller: LevelUIController
```

### In LevelUIController Inspector, assign:

```
Top Bar:
  ├─ Level Number Text: LevelNumberText
  ├─ Logo Image: LogoImage
  └─ Timer Text: TimerText

Bottom Bar:
  ├─ Score Text: ScoreText
  ├─ Start Button: StartButton
  └─ Restart Button: RestartButton

Overlay Screens:
  ├─ Level Complete Screen: (Create CanvasGroup)
  ├─ Timeout Screen: (Create CanvasGroup)
  └─ Associated buttons
```

---

## Step 9: Create Level Complete Screen

### Add Overlay Panel:

1. **Create Panel (above everything)**
   - Right-click Canvas > UI > Panel
   - Name: "LevelCompleteScreen"
   - Size: Full screen
   - Color: Black with 50% alpha

2. **Add CanvasGroup Component**
   - Add Component > CanvasGroup
   - Set initial alpha: 0

3. **Add Content Panel**
   - Right-click LevelCompleteScreen > UI > Panel
   - Name: "Content"
   - Size: 500×400
   - Position: Center
   - Color: White

4. **Add Messages**
   - Text: "Level Complete!"
   - Text: "You helped bring clean water to X people."
   - Text: "Tap to continue or select next level"

5. **Add Buttons**
   - Next Level Button
   - Claim Reward Button (hidden by default)

6. **Assign to LevelUIController**
   - Drag LevelCompleteScreen > CanvasGroup field

---

## Test Checklist

- [ ] Level scene loads without errors
- [ ] Grid appears as 8×12 visible tiles
- [ ] Water Source visible at top-middle
- [ ] Village visible at bottom-middle
- [ ] Top bar shows Level 1 and Timer
- [ ] Bottom bar shows People Helped: 0
- [ ] Start button is clickable
- [ ] Restart button is clickable
- [ ] All colors match brand specifications
- [ ] Text is readable at mobile resolution

---

## Quick Test (In Unity Only)

```csharp
// To test without full UI:

1. Open Level scene
2. Press Play
3. Look at Console for debug messages
4. Should see:
   - "Grid initialized: 8×12 tiles"
   - "Water Source at grid position (4, 1)"
   - "Village at grid position (4, 12)"
   - "Level initialized successfully"
```

---

## No Compilation Errors Checklist

- [ ] All 5 GamePlay scripts in Assets/Scripts/GamePlay/
- [ ] LevelUIController in Assets/Scripts/UI/
- [ ] BrandingConstants accessible from all scripts
- [ ] No missing references in Inspector
- [ ] No undefined variables in code
- [ ] All namespaces correct (using UnityEngine;)

---

## Next Steps

Once Level scene is working:

1. **Implement Pipe Placement System**
   - Create UI for pipe selection
   - Add drag-and-drop functionality
   - Test pipe snapping to grid

2. **Test Water Particle System**
   - Verify particles spawn correctly
   - Test movement through empty space (should disappear)
   - Test movement through pipes

3. **Polish & Tweaking**
   - Adjust water spawn rate
   - Fine-tune particle speed
   - Add visual effects

---

## Troubleshooting

### "Grid doesn't appear"
- Check GridContainer is assigned to LevelManager
- Verify GridSystem.cs is attached
- Check debug logs for initialization messages

### "Buttons not working"
- Verify EventSystem exists in canvas
- Check button listeners are hooked up
- Ensure LevelUIController script is attached

### "UI text not visible"
- Check text color is not same as background
- Verify font is imported correctly
- Ensure Canvas Render Mode is correct

### "Colors look wrong"
- Verify BrandingConstants colors are loading
- Check if Gamma vs Linear color space issue
- Test on actual mobile device

---

## Files Ready to Use

All these are already created and ready to import:

```
✅ LevelManager.cs       - Full level flow
✅ GridSystem.cs         - Grid generation
✅ TileController.cs     - Tile behavior
✅ PipeManager.cs        - Pipe placement
✅ WaterParticle.cs      - Water movement
✅ LevelUIController.cs  - UI management
✅ BrandingConstants.cs  - Official colors & fonts
```

No additional coding needed - just wire up the references in Inspector!

