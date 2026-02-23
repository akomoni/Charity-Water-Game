# Jerry's Water Network - Game Build Guide

## Project Overview
A charity: water themed mobile puzzle game where players build water pipe networks to deliver clean water to villages. Players help real communities by achieving in-game milestones.

---

## Engine Setup

### Project Configuration
- **Engine Type:** 2D Game Engine (Unity, Godot, or equivalent)
- **Screen Resolution:** 1080 × 1920 (Mobile Portrait)
- **Target Platforms:** iOS and Android
- **Physics:** 2D with downward gravity for water particle simulation

### Physics Settings
- Set gravity to pull downward on water particles for realistic flow simulation

---

## Game Scenes

1. **Scene 1: Main Menu** - Initial loading screen
2. **Scene 2: Level** - Main gameplay area
3. **Scene 3: Level Complete** - Success screen with progression
4. **Scene 4: Rewards** - Milestone rewards display

---

## Scene Layouts

### Main Menu Scene

**Visual Layout:**
```
┌─────────────────────────────┐
│   charity: water logo       │  (Top center, image)
│         (centered)          │
├─────────────────────────────┤
│                             │
│     ┌─────────────────┐     │
│     │   Play Button   │     │  (Center of screen)
│     └─────────────────┘     │
│                             │
│  ┌──────────────────────┐   │
│  │ How It Works Button  │   │  (Below play button)
│  └──────────────────────┘   │
│                             │
└─────────────────────────────┘
```

**Styling:**
- Background Color: White
- Button Color: charity: water yellow (#FFC907)
- Font: Clean sans serif

---

### Level Scene

#### Top Bar
```
┌──────────────────────────────────────────────┐
│  Level 1  │  charity: water logo (small)  │  60s  │
│ (Left)    │       (Center)                │ (Right)│
└──────────────────────────────────────────────┘
```

- **Left:** Level number text
- **Center:** charity: water logo (scaled down)
- **Right:** Timer text (countdown)

#### Main Game Board

**Grid Configuration:**
- **Dimensions:** 8 columns × 12 rows
- **Tile Size:** 120 × 120 pixels
- **Total Board Size:** 960 × 1440 pixels

**Special Tile Positions:**
- **Water Source:** Top row, middle column (Column 4)
- **Village:** Bottom row, middle column (Column 4)
- **Jerry Sprite:** Positioned next to the Village tile

#### Bottom Bar
```
┌──────────────────────────────────────────────┐
│ People Helped: 0    │  [Start]  [Restart]   │
│     (Left)          │      (Right)           │
└──────────────────────────────────────────────┘
```

- **Left:** Score text with label "People Helped: " + number
- **Right:** Start button and Restart button (yellow #FFC907)

---

### Level Complete Scene

**Display Elements:**
- **Title Text:** "Level Complete!"
- **Message:** "You helped bring clean water to [score] people."
- **Next Level Button:** Advances to next level
- **Claim Campus Reward Button:** Appears if milestone reached

**Layout:**
```
┌─────────────────────────────┐
│    Level Complete!          │
├─────────────────────────────┤
│  You helped bring clean     │
│  water to [score] people.   │
├─────────────────────────────┤
│  ┌─────────────────────┐    │
│  │  Next Level Button  │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ Claim Reward Button │    │  (if applicable)
│  └─────────────────────┘    │
└─────────────────────────────┘
```

---

### Rewards Scene

**Display Elements:**
- Shows cumulative score across all levels
- Displays milestone-based reward messages
- Option to continue to next level

---

## Core Game Variables

```
score = 0                    // People helped in current level
waterAmount = 0              // Water particles reaching village
waterNeeded = 100            // Particles required to complete level
timer = 60                   // Seconds remaining (countdown)
levelComplete = false        // Level completion flag
cumulativeScore = 0          // Total people helped across all levels
```

---

## Assets to Create

### Sprites - Characters & Objects
- **Jerry** - jerry can character sprite (walking/standing poses)
- **Water Droplet** - particle sprite for water flow animation
- **Pipe - Straight** - straight horizontal/vertical pipe tile
- **Pipe - Corner** - 90-degree bent pipe tile
- **Pipe - T Joint** - T-shaped 3-way pipe connector
- **Filter Tile** - special tile that multiplies water (2× bonus)
- **Block Tile** - obstacle that blocks pipe placement
- **Village Icon** - destination sprite with glow on success

### UI Elements
- **Play Button** - yellow background (#FFC907)
- **How It Works Button** - yellow background (#FFC907)
- **Start Button** - yellow background (#FFC907)
- **Restart Button** - yellow background (#FFC907)
- **Next Level Button** - yellow background (#FFC907)
- **Claim Reward Button** - yellow background (#FFC907)
- **charity: water Logo** - full size and small variants
- **Background Panels** - semi-transparent overlays for menus

### Audio Assets
- **Water Flow Sound** - soft looping audio for water movement
- **Success Chime** - short melodic sound on level complete
- **Background Music** - ambient, non-intrusive (optional)

---

## Player Interaction

### Pipe Placement

**Drag & Drop Mechanics:**
- Players can drag pipe pieces from a selection menu onto the game board
- Pipe pieces snap to the nearest grid tile upon release
- Pieces snap with 16-pixel tolerance (within grid alignment)

**Placement Rules:**
- Cannot place pipes on blocked tiles
- Cannot place pipes on Water Source or Village tiles
- Cannot place more than [level-specific limit] pipe pieces per level
- Placement is disabled after Start button is pressed

**Visual Feedback:**
- Highlight valid placement areas in green
- Show invalid areas in red
- Display snap indication when hovering over grid

### Start Button Logic

**When Start Button Pressed:**
1. Lock all pipe placement (disable drag & drop)
2. Disable Restart button during level
3. Begin spawning water particles at Water Source tile
4. Begin timer countdown
5. Show visual water flow animation

---

## Game Logic

### Water Particle Movement

**Particle Spawning:**
- Spawn water droplets at Water Source (top middle) every 0.5 seconds
- Each particle moves downward one tile per frame
- Particles travel at constant speed

**Particle Pathfinding:**
- At each tile, check the pipe direction
  - If **straight pipe:** continue in same direction
  - If **corner pipe:** turn 90 degrees per pipe orientation
  - If **T joint:** split into three paths or follow incoming direction
  - If **filter tile:** continue but mark as "filtered"
  - If **no pipe:** particle disappears
  - If **block tile:** particle disappears

### Water Collection & Scoring

**Collection Logic:**
- When particle reaches Village tile, increase `waterAmount` by 1
- If particle traveled through Filter tile: increase `waterAmount` by 2 instead of 1
- Update displayed score in real-time

### Win Condition

**Level Completion:**
```
if waterAmount >= waterNeeded:
    levelComplete = true
    Stop spawning water particles
    Display Level Complete Scene after 1 second
```

### Timer Logic

**Countdown:**
- `timer` decreases by 1 every second
- Display remaining time in top-right corner

**Timeout Condition:**
```
if timer <= 0 AND waterAmount < waterNeeded:
    Reset level (restart pipe placement)
    Reset timer to 60
    Reset waterAmount to 0
    Show "Time's Up! Try Again" message
```

### Score Display

**Score Calculation:**
```
score = waterAmount
displayText = "People Helped: " + score
```

### Reward Milestone System

**Cumulative Score Tracking:**
- Add current level's score to `cumulativeScore` on level complete
- Store `cumulativeScore` persistently across gameplay sessions

**Reward Thresholds:**
```
if cumulativeScore >= 200:
    Show "You've helped 200 people! Campus milestone 1 reached!"
    Award badge/visual indicator

if cumulativeScore >= 500:
    Show "You've helped 500 people! Campus milestone 2 reached!"
    Award higher-tier badge/visual indicator

if cumulativeScore >= 1000:
    Show "You've helped 1000 people! Major campaign milestone!"
    Award special badge
```

---

## Branding Guidelines

### Color Palette
- **Primary Brand Color:** #FFC907 (charity: water yellow)
  - Use for all buttons and interactive highlights
  - Use for important UI elements
- **Background:** White or light sand color (#F5F5DC)
- **Water Color:** Light blue (#87CEEB or #B0E0E6)
- **Text:** Dark gray or black for legibility
- **Accent:** Darker yellow for button hover states (#E6B800)

### Typography
- **Font Family:** Clean sans serif (e.g., Open Sans, Roboto, or system default)
- **Primary Text:** 24-36pt for headers
- **Body Text:** 16-20pt for gameplay elements
- **UI Labels:** 14-18pt for buttons and meters

### Logo Placement
- **Main Menu:** Center-top, prominent size
- **Level Scene:** Small size in top-center bar
- **Level Complete:** Display in corner or top section
- **All Screens:** Ensure logo is visible and not obscured

### Visual Style
- Clean, modern interface
- Generous whitespace
- Rounded corners on buttons (8-12px radius)
- Subtle shadows for depth
- Smooth transitions between screens

---

## Animations

### Water Particle Flow
- Particles follow smooth linear interpolation along pipe paths
- Animation speed: ~2 tiles per second (120 pixels/second)
- Particles scale slightly (0.8x → 1.0x) as they spawn for emphasis

### Jerry Character
- **On Level Complete:** Bounce animation (jump up 30 pixels, return, repeat 2×)
- **Standing Idle:** Subtle breathing animation (±5 pixel vertical movement)

### Village Icon
- **On Water Arrival:** Glow effect (brightness increase and pulse)
- **On Level Complete:** Scale up slightly (1.0x → 1.1x) with glow

### UI Transitions
- **Scene Changes:** Fade transition (0.5 second duration)
- **Button Presses:** Scale feedback (0.95x → 1.0x on release)
- **Score Updates:** Number increment animation (0.3 second per point)

### Pipe Placement
- **Hover:** Slight alpha increase (0.7 → 1.0)
- **Valid Placement:** Green highlight overlay
- **Invalid Placement:** Red/semi-transparent effect

---

## Sound Design

### Audio Assets
- **Water Flow Sound**
  - Duration: Looping
  - Volume: Soft (-6dB relative to master)
  - Trigger: Continuous while water spawning and moving
  - Description: Gentle trickling/flowing water sound

- **Success Chime**
  - Duration: 1-2 seconds
  - Volume: Medium (-3dB)
  - Trigger: When level completes
  - Description: Pleasant, uplifting melodic tone (e.g., C-E-G chord progression)

- **Button Click Sound** (optional)
  - Duration: 0.3 seconds
  - Volume: Soft (-9dB)
  - Trigger: On button press
  - Description: Light tap or beep sound

### Audio Guidelines
- Avoid harsh, loud, or jarring sounds
- Keep all audio at comfortable volumes for extended play
- Ensure sounds don't overlap or create audio clutter
- Consider adding a mute toggle for sound effects and music

---

## Testing Checklist

### Gameplay Mechanics
- [ ] Confirm water particles spawn at Water Source every 0.5 seconds
- [ ] Confirm water follows correct pipe direction (straight, corner, T-joint)
- [ ] Confirm water disappears when encountering a block tile
- [ ] Confirm water disappears when no pipe ahead
- [ ] Confirm Filter tile adds 2 points instead of 1
- [ ] Confirm water collection at Village increases waterAmount

### Scoring & Display
- [ ] Confirm score updates in real-time as particles reach Village
- [ ] Confirm score display shows "People Helped: [number]"
- [ ] Confirm display updates every time waterAmount changes
- [ ] Confirm final score is correct on Level Complete screen

### Timer & Countdown
- [ ] Confirm timer starts at 60 seconds
- [ ] Confirm timer decreases by 1 every second
- [ ] Confirm timer display updates in top-right corner
- [ ] Confirm level restarts when timer reaches 0 and waterAmount < waterNeeded

### Pipe Placement
- [ ] Confirm pipe pieces snap to grid correctly
- [ ] Confirm pieces cannot be placed on blocked tiles
- [ ] Confirm pieces cannot be placed on Water Source or Village
- [ ] Confirm pipe placement is disabled after Start button press
- [ ] Confirm piece limit is enforced per level

### UI & Navigation
- [ ] Confirm Main Menu displays logo and buttons correctly
- [ ] Confirm Play button transitions to Level scene
- [ ] Confirm How It Works button opens tutorial (if implemented)
- [ ] Confirm Level scene displays all UI elements (top bar, board, bottom bar)
- [ ] Confirm Start button enables water spawning
- [ ] Confirm Restart button resets level without advancing

### Win/Lose Conditions
- [ ] Confirm Level Complete scene displays when waterAmount >= waterNeeded
- [ ] Confirm level restart occurs when timer expires with insufficient water
- [ ] Confirm Next Level button advances to next level
- [ ] Confirm cumulative score persists across levels

### Rewards System
- [ ] Confirm cumulativeScore tracks across all levels
- [ ] Confirm reward message displays at 200 cumulative water collected
- [ ] Confirm higher reward message displays at 500 cumulative water collected
- [ ] Confirm Claim Campus Reward button appears only when milestone reached
- [ ] Confirm reward state persists after closing/reopening game

### Branding & Visuals
- [ ] Confirm buttons use brand yellow (#FFC907)
- [ ] Confirm background colors are white or light sand
- [ ] Confirm logo is visible on all screens
- [ ] Confirm font is clean, readable sans serif
- [ ] Confirm layout maintains 1080×1920 mobile aspect ratio

### Animations & Polish
- [ ] Confirm water particles move smoothly along pipe paths
- [ ] Confirm Jerry bounces when level completes
- [ ] Confirm Village icon glows on successful water arrival
- [ ] Confirm UI transitions are smooth (fade effects)
- [ ] Confirm button interactions provide visual feedback

### Performance
- [ ] Confirm game runs smoothly at 60 FPS on target devices
- [ ] Confirm water particle spawning doesn't cause lag
- [ ] Confirm level loading is responsive (< 2 seconds)
- [ ] Confirm memory usage is optimized for mobile devices

### Platform-Specific (Mobile)
- [ ] Confirm layout scales properly on various phone sizes
- [ ] Confirm touch input is responsive
- [ ] Confirm landscape orientation handling (optional)
- [ ] Confirm battery usage is reasonable

---

## Desktop Scaling

For desktop resolution testing (1920 × 1080):

**Grid Expansion:**
- Expand grid width to accommodate desktop aspect ratio
- Maintain 120×120 pixel tiles
- Suggested: 16 columns × 12 rows for 1920×1440 board
- Center board on screen with side margins

**Layout Adjustments:**
- Scale UI elements proportionally
- Maintain font sizes relative to tile size
- Ensure buttons remain easily clickable

---

## Optional Expansion Features

### Difficulty Progression
- **Moving Valves:** Add rotating pipe segments that change direction over time
  - Increases level complexity and player decision-making
  - Introduce in Level 5+

### Resource Challenges
- **Limited Pipe Count:** Restrict number of placeable pipes per level (e.g., max 8 pipes)
  - Forces players to plan more efficiently
  - Tests spatial reasoning skills

### Social/Competitive Features
- **Daily Campus Leaderboard:** 
  - Track top daily scores across all players
  - Award bonus rewards for high scores
  - Encourage daily engagement and community competition
  - Display leaderboard on Main Menu or separate Leaderboard screen

### Quality of Life Improvements
- **Undo System:** Allow one reversal of pipe placement per level
- **Hint System:** Show a suggested water path if player is stuck
- **Tutorial Levels:** First 2-3 levels with guided placement
- **Level Selection:** Unlock ability to replay previous levels

### Accessibility Features
- **Colorblind Mode:** Adjust highlighting colors for various colorblindness types
- **Text Size Adjustment:** Allow players to increase UI text size
- **High Contrast Mode:** Improve visibility for players with visual impairments
- **Audio Descriptions:** Text descriptions for story/tutorial audio

---

## File Structure Recommendation

```
GameForWater-Charity/
├── Assets/
│   ├── Sprites/
│   │   ├── Characters/
│   │   │   ├── jerry_character.png
│   │   │   └── village_icon.png
│   │   ├── Tiles/
│   │   │   ├── pipe_straight.png
│   │   │   ├── pipe_corner.png
│   │   │   ├── pipe_t_joint.png
│   │   │   ├── filter_tile.png
│   │   │   ├── block_tile.png
│   │   │   └── water_source.png
│   │   ├── Particles/
│   │   │   └── water_droplet.png
│   │   ├── UI/
│   │   │   ├── buttons/
│   │   │   ├── logo_full.png
│   │   │   └── logo_small.png
│   │   └── Backgrounds/
│   │       └── menu_bg.png
│   ├── Sounds/
│   │   ├── water_flow.wav
│   │   ├── success_chime.wav
│   │   └── button_click.wav
│   └── Fonts/
│       └── opensans.ttf
├── Scenes/
│   ├── MainMenu.scene
│   ├── Level.scene
│   ├── LevelComplete.scene
│   └── Rewards.scene
├── Scripts/
│   ├── GameManager.cs
│   ├── LevelManager.cs
│   ├── WaterParticle.cs
│   ├── PipeManager.cs
│   ├── UIManager.cs
│   └── RewardSystem.cs
├── Data/
│   ├── LevelConfigs/
│   │   ├── level_1.json
│   │   ├── level_2.json
│   │   └── ...
│   └── PlayerData.json
├── Documentation/
│   ├── BUILD_GUIDE.md
│   └── DESIGN_NOTES.md
└── README.md
```

---

## Development Timeline (Suggested)

**Week 1-2: Foundation**
- Engine setup and project configuration
- Create main menu scene and UI
- Implement basic level scene layout

**Week 3-4: Core Mechanics**
- Implement pipe placement and grid snapping
- Create water particle system
- Implement particle pathfinding logic

**Week 5: Polish & Polish**
- Add animations and transitions
- Implement sound design
- Create pixel-perfect UI

**Week 6: Testing & Balancing**
- Run through testing checklist
- Balance level difficulty
- Optimize performance

**Week 7: Deployment Preparation**
- Prepare app store assets
- Set up analytics
- Create user documentation

---

## Notes

- Keep the charity: water branding prominent throughout the experience
- Ensure gameplay loop is intuitive and enjoyable for all ages
- Testing with real mobile devices is critical for final polish
- Consider user feedback for post-launch updates and improvements
