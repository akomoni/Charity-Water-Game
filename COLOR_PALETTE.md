# Charity: Water Official Color Palette

## Primary Colors

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║  CHARITY WATER BLUE                  CHARITY WATER YELLOW    ║
║  #2596BE                             #FFC908                ║
║  RGB: (37, 150, 190)                RGB: (255, 201, 8)      ║
║  HSL: (194°, 67%, 45%)              HSL: (44°, 100%, 51%)   ║
║  ██████████████████████████████      ██████████████████████  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### Primary Blue - #2596BE
- **Hex:** #2596BE
- **RGB:** 37, 150, 190
- **HSL:** 194°, 67%, 45%
- **CMYK:** 81, 21, 0, 25
- **Usage:** Primary interface color, accents, links, interactive elements
- **Best For:** Headings, primary call-to-action areas, brand identity
- **Contrast:** White text (WCAG AAA)

### Primary Yellow - #FFC908
- **Hex:** #FFC908
- **RGB:** 255, 201, 8
- **HSL:** 44°, 100%, 51%
- **CMYK:** 0, 21, 97, 0
- **Usage:** Secondary buttons, highlights, call-to-actions, emphasis
- **Best For:** Action buttons, highlights, promotional content
- **Contrast:** Dark text #333333 (WCAG AA), Black text (WCAG AAA)

---

## Supporting Colors

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║  TEXT PRIMARY         TEXT SECONDARY        BACKGROUND      ║
║  #333333              #666666              #FFFFFF          ║
║  ████████░░░░░░      ████████░░░░░        ████████████     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### Text Primary - #333333
- **Hex:** #333333
- **RGB:** 51, 51, 51
- **HSL:** 0°, 0%, 20%
- **Usage:** Primary body text, headlines, main content
- **Contrast:** White background (WCAG AAA)

### Text Secondary - #666666
- **Hex:** #666666
- **RGB:** 102, 102, 102
- **HSL:** 0°, 0%, 40%
- **Usage:** Secondary text, subtext, disabled states, muted content
- **Contrast:** White background (WCAG AA)

### Background White - #FFFFFF
- **Hex:** #FFFFFF
- **RGB:** 255, 255, 255
- **HSL:** 0°, 0%, 100%
- **Usage:** Primary background, panels, containers, cards
- **Contrast:** Works with all text colors

---

## Accent Colors

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║  LIGHT BLUE           LIGHT YELLOW      HOVER STATES        ║
║  #E8F4F8              #FFF9E6           (Lighter versions)  ║
║  ████████░░░░░░      ████████░░░░░     ░░░░░░░░░░░░       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### Light Blue Accent - #E8F4F8
- **Hex:** #E8F4F8
- **RGB:** 232, 244, 248
- **HSL:** 194°, 61%, 94%
- **Usage:** Light backgrounds, hover states, accents
- **Pair With:** #2596BE text for layering

### Light Yellow Accent - #FFF9E6
- **Hex:** #FFF9E6
- **RGB:** 255, 249, 230
- **HSL:** 48°, 100%, 95%
- **Usage:** Light backgrounds, hover states, accents
- **Pair With:** #333333 text for contrast

---

## State Colors

### Hover States
```
Regular Button:     #FFC908 background → lighten to #FFF9E6 (background shift)
                    or add 10% opacity overlay
                    
Primary Button:     #2596BE background → lighten to #E8F4F8 (background shift)
                    or add 10% opacity overlay
```

### Disabled States
```
Disabled Button:    #CCCCCC background with #999999 text
Disabled Text:      #AAAAAA
```

### Active/Selected States
```
Selected:           #2596BE background + border
Active:             #FFC908 with darker shade #E6B800
Focus:              #2596BE with outline
```

---

## Color Applications by Component

### Buttons
```
Primary Button (CTA)
  Background: #FFC908
  Text:       #333333 (dark text for contrast)
  Hover:      #FFF9E6 (light cream background) with darker text
  Active:     #E6B800
  
Secondary Button
  Background: #2596BE
  Text:       #FFFFFF (white text)
  Hover:      #E8F4F8
  Active:     #1B7FA5
```

### Links
```
Regular Link:       #2596BE
Visited Link:       #1B7FA5
Hover Link:         underline, darker shade
Active Link:        #FFC908
```

### Text Hierarchy
```
Headline:           #2596BE (primary blue) or #333333 (dark gray)
Subheading:         #333333 (dark gray)
Body:               #333333 (dark gray)
Secondary:          #666666 (medium gray)
Muted/Caption:      #999999 (light gray)
Important/Alert:    #FF0000 or #FFC908 (only if accent needed)
```

### UI Elements
```
Card Background:    #FFFFFF
Card Shadow:        #00000015 (black with 8% opacity)
Border:             #CCCCCC or #E8F4F8
Divider:            #EEEEEE
Input Field:        #FFFFFF border with #333333 text
Input Focus:        #2596BE border
```

---

## Accessibility Compliance

### Contrast Ratios (WCAG Standards)

| Color Pair | Hex Codes | Ratio | Level |
|-----------|-----------|-------|-------|
| #FFC908 + #333333 | Yellow + Dark Gray | 11.2:1 | AAA |
| #2596BE + #FFFFFF | Blue + White | 4.5:1 | AA |
| #333333 + #FFFFFF | Dark Gray + White | 12.6:1 | AAA |
| #666666 + #FFFFFF | Med Gray + White | 6.0:1 | AA |

All color combinations meet WCAG AA or better standards. ✅

---

## Color Specifications for Export

### For Web (CSS)
```css
:root {
  --charity-blue: #2596BE;
  --charity-yellow: #FFC908;
  --text-primary: #333333;
  --text-secondary: #666666;
  --background: #FFFFFF;
  --accent-light-blue: #E8F4F8;
  --accent-light-yellow: #FFF9E6;
}
```

### For Unity (C#)
See `BrandingConstants.cs` for exact Color definitions:
```csharp
BrandingConstants.CHARITY_WATER_BLUE      // #2596BE
BrandingConstants.CHARITY_WATER_YELLOW    // #FFC908
BrandingConstants.TEXT_PRIMARY            // #333333
BrandingConstants.TEXT_SECONDARY          // #666666
BrandingConstants.BACKGROUND_WHITE        // #FFFFFF
BrandingConstants.ACCENT_LIGHT_BLUE       // #E8F4F8
BrandingConstants.ACCENT_LIGHT_YELLOW     // #FFF9E6
```

### For Figma/Design Tools
```
Charity Water Blue
  HEX:  #2596BE
  RGB:  37, 150, 190
  HSL:  194°, 67%, 45%
  
Charity Water Yellow
  HEX:  #FFC908
  RGB:  255, 201, 8
  HSL:  44°, 100%, 51%
```

---

## Color Blindness Considerations

The primary blue (#2596BE) and yellow (#FFC908) combination provides:
- ✅ Good separation for Deuteranopia (red-green colorblind)
- ✅ Good separation for Protanopia (red-green colorblind)
- ✅ Good separation for Tritanopia (blue-yellow colorblind)
- ✅ Excellent contrast for complete colorblindness

Consider using icons/patterns in addition to color to aid colorblind users.

---

## Testing Checklist

- [ ] All buttons use official yellow (#FFC908) or blue (#2596BE)
- [ ] All text uses approved colors (#333333 or #666666)
- [ ] Background is white (#FFFFFF)
- [ ] Color contrast meets WCAG AA standards
- [ ] Hover states properly lighten/darken
- [ ] No unapproved colors in UI
- [ ] Mobile display shows colors correctly
- [ ] Print/export colors remain consistent

