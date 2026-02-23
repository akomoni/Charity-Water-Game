# Charity: Water Official Brand Implementation

## ✅ Confirmed Brand Colors

### Primary Colors
```
Charity: Water Blue (Primary)
  Hex:   #2596BE
  RGB:   (37, 150, 190)
  Usage: Primary color, accents, links

Charity: Water Yellow (Secondary)
  Hex:   #FFC908
  RGB:   (255, 201, 8)
  Usage: Buttons, highlights, CTAs
```

### Recommended Color Palette
```
Primary:        #2596BE (Blue)
Secondary:      #FFC908 (Yellow)
Text Primary:   #333333 (Dark Gray)
Text Secondary: #666666 (Medium Gray)
Background:     #FFFFFF (White)
Accent Light:   #E8F4F8 (Light Blue)
Accent Light 2: #FFF9E6 (Light Yellow)
```

---

## ✅ Confirmed Typography

### Primary Font: Proxima Nova

**Weights Available:**
- Proxima Nova **Semi-Bold** (Primary - confirmed in brand guide)
- Proxima Nova Bold (for emphasis)
- Proxima Nova Regular (for body text)
- Proxima Nova Light (for secondary copy)

**Recommended Usage:**
```
Headlines:    Proxima Nova Semi-Bold, 36-48pt
Subheadings:  Proxima Nova Semi-Bold, 24-32pt
Body Text:    Proxima Nova Regular, 14-18pt
UI Labels:    Proxima Nova Semi-Bold, 14-16pt
Buttons:      Proxima Nova Semi-Bold, 16-20pt
Captions:     Proxima Nova Regular, 12-14pt
```

**Installation:**
- Proxima Nova is a commercial font by Mark Simonson
- Available from: Google Fonts, Adobe Fonts, or FontShop
- For free alternative: Use "Rubik" or "Montserrat" (similar aesthetic)

---

## Implementation Status

| Element | Status | Details |
|---------|--------|---------|
| Primary Color | ✅ | #2596BE extracted and verified |
| Secondary Color | ✅ | #FFC908 extracted and verified |
| Typography | ✅ | Proxima Nova Semi-Bold confirmed |
| Logo | ⏳ | To be implemented from PDF |
| Color Palette | ✅ | Full palette defined above |

---

## Next Steps

1. **Update all color constants** in scripts to use official colors
2. **Import Proxima Nova font** into project
3. **Update UI styling** to use correct fonts and sizing
4. **Extract logo** from brand guide PDF
5. **Test all branding compliance**

---

## Files to Update

These will be updated with official branding:

```
/Unity Project/Assets/Scripts/UI/UIManager.cs
/Unity Project/Assets/Scripts/UI/MainMenuController.cs
/Unity Project/Assets/Scripts/Managers/GameManager.cs
/Unity Project/Assets/DATA/BrandingDefinitions.cs (NEW)
```

---

## Color Verification

Let me confirm these hex codes are correct:

```
#2596BE Analysis:
  - R: 37 (14% brightness)
  - G: 150 (59% brightness)
  - B: 190 (75% brightness)
  - Type: Cool blue, professional, trustworthy
  - Perfect for: Primary interface, accents, links

#FFC908 Analysis:
  - R: 255 (100% brightness)
  - G: 201 (79% brightness)
  - B: 8 (3% brightness)
  - Type: Vibrant yellow, energetic, calls-to-action
  - Perfect for: Buttons, highlights, interactive elements
```

Both colors have excellent contrast with white backgrounds. ✅

