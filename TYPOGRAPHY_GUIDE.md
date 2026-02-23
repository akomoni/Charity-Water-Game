# Charity: Water Typography Guide

## Official Font: Proxima Nova

**Status:** Semi-Bold variant confirmed as primary font

### Font Specifications

| Use Case | Font | Weight | Size | Line Height | Letter Spacing |
|----------|------|--------|------|-------------|-----------------|
| Scene Titles | Proxima Nova | Semi-Bold | 48pt | 1.2 | Normal |
| Subheadings | Proxima Nova | Semi-Bold | 32pt | 1.3 | Normal |
| Button Text | Proxima Nova | Semi-Bold | 20pt | 1.0 | Normal |
| Body Text | Proxima Nova | Regular | 16pt | 1.5 | Normal |
| Labels/Captions | Proxima Nova | Regular | 14pt | 1.4 | Normal |
| Small Text | Proxima Nova | Regular | 12pt | 1.3 | Normal |

---

## Font Installation

### Method 1: Adobe Fonts (Recommended)
1. Go to https://fonts.adobe.com
2. Search for "Proxima Nova"
3. Click "Activate Font"
4. Use in your project via CSS or font names

### Method 2: Google Fonts Export
Export from Adobe and add to:
```
Assets/Fonts/ProximaNova-SemiBold.ttf
Assets/Fonts/ProximaNova-Regular.ttf
Assets/Fonts/ProximaNova-Bold.ttf
```

### Method 3: Free Alternative
If Proxima Nova is unavailable, use:
- **Rubik** (similar weight and feel)
- **Montserrat** (professional alternative)
- **Open Sans** (clean, readable fallback)

---

## Unity Implementation

### Using BrandingConstants for Font Sizes

```csharp
// Instead of hardcoding:
textElement.fontSize = BrandingConstants.FONT_SIZE_BUTTON;  // 20
textElement.fontSize = BrandingConstants.FONT_SIZE_BODY;    // 16
textElement.fontSize = BrandingConstants.FONT_SIZE_LABEL;   // 14
```

### Setting Font in Script

```csharp
using TMPro; // If using TextMeshPro

TextMeshProUGUI textElement = GetComponent<TextMeshProUGUI>();
textElement.fontSize = BrandingConstants.FONT_SIZE_HEADLINE;
textElement.fontStyle = FontStyles.Bold;
textElement.color = BrandingConstants.TEXT_PRIMARY;
```

---

## Text Hierarchy Example

```
Main Menu Scene:
├── "You are helping bring clean water to villages" 
│   └─ Proxima Nova Semi-Bold, 48pt, #333333, center
│   
├── "Play to help" 
│   └─ Proxima Nova Semi-Bold, 32pt, #2596BE
│   
└── [PLAY BUTTON]
    └─ Proxima Nova Semi-Bold, 20pt, #FFFFFF on #FFC908 background
```

---

## Mobile Text Sizing

For responsive text that scales with screen size:

```csharp
// in CanvasScaler or RectTransform
Canvas canvas = GetComponent<Canvas>();
canvas.scaleFactor = Screen.width / 1080f;  // Scale relative to design width
```

---

## Accessibility Considerations

- **Minimum text size:** 14pt for body text
- **Contrast ratio:** Yellow on white = use text color #333333 or dark background
- **Line spacing:** 1.5x minimum for comfortable reading
- **Font weight:** Never use light with small sizes

---

## Color + Typography Combinations

### Recommended Pairings

**Headlines:**
- Font: Proxima Nova Semi-Bold
- Color: #2596BE (Brand Blue)
- Size: 32-48pt

**Buttons:**
- Font: Proxima Nova Semi-Bold
- Color: #FFFFFF on #FFC908 background
- Size: 20pt

**Body Copy:**
- Font: Proxima Nova Regular
- Color: #333333
- Size: 14-16pt

**Secondary Text:**
- Font: Proxima Nova Regular
- Color: #666666
- Size: 12-14pt

---

## Code Reference

All font sizes are defined in:
```
Assets/Scripts/BrandingConstants.cs
```

Update any font size there, and it automatically applies everywhere using:
```csharp
BrandingConstants.FONT_SIZE_BUTTON
BrandingConstants.FONT_SIZE_HEADLINE
BrandingConstants.FONT_SIZE_BODY
// etc...
```

---

## Figma/Design Tool Settings

If designing in Figma:

```
Typography Styles:

Headline
  Font: Proxima Nova Semi-Bold
  Size: 48px
  Line Height: 58px (1.2x)
  Letter Spacing: 0px

Subheading
  Font: Proxima Nova Semi-Bold
  Size: 32px
  Line Height: 42px (1.3x)
  Letter Spacing: 0px

Button
  Font: Proxima Nova Semi-Bold
  Size: 20px
  Line Height: 20px
  Letter Spacing: 0px

Body
  Font: Proxima Nova Regular
  Size: 16px
  Line Height: 24px (1.5x)
  Letter Spacing: 0px

Label
  Font: Proxima Nova Regular
  Size: 14px
  Line Height: 20px (1.4x)
  Letter Spacing: 0px
```

---

## Testing Typography Compliance

- [ ] All headlines use Proxima Nova Semi-Bold
- [ ] All body text uses Proxima Nova Regular
- [ ] Font sizes match specifications above
- [ ] Color contrast is sufficient (WCAG AA minimum)
- [ ] Line heights provide adequate spacing
- [ ] Text is readable on mobile device sizes
- [ ] No text smaller than 14pt for body content

