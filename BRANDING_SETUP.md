# Current Branding Implementation

## Current State (Placeholder Values)

### Colors
```csharp
// Current values in UIManager.cs
brandYellow = #FFC907 (1f, 0.789f, 0.027f)
textDarkColor = #000000 (0, 0, 0)
backgroundColor = #FFFFFF (1, 1, 1)
```

**Status:** ⚠️ Using estimated Charity: Water yellow - needs verification against official PDF

### Typography
```
Headers: Clean sans serif (not yet specified)
Body Text: Clean sans serif (not yet specified)
UI Labels: Clean sans serif (not yet specified)
```

**Status:** ⚠️ Placeholder - awaiting official font specifications

### Logo
```
Status: ⚠️ No logo files imported yet
Placements:
  - Main Menu: Top center (needs official logo)
  - Level Scene: Top bar center (small version)
  - Level Complete: Corner or top section
```

---

## What Needs to Be Uploaded

From the Charity: Water branding guide, we need:

### 1. **Brand Colors** (RGB/Hex values for)
- [ ] Primary Yellow
- [ ] Primary Blue (if used)
- [ ] Accent colors
- [ ] Text colors
- [ ] Background colors

### 2. **Logo Files**
- [ ] Full logo (horizontal)
- [ ] Icon/mark only
- [ ] Logo variations (dark, light backgrounds)
- [ ] Minimum size specifications
- [ ] Clear space requirements

### 3. **Typography**
- [ ] Primary font name (for headers)
- [ ] Secondary font name (for body)
- [ ] Font size specifications
- [ ] Weight specifications (Bold, Regular, Light)
- [ ] Line height values

### 4. **Design Standards**
- [ ] Button styles
- [ ] Icon styles
- [ ] Spacing rules (margins, padding)
- [ ] Corner radius values
- [ ] Shadows and depth

### 5. **Technical Assets**
- [ ] Logo files (SVG preferred, PNG backup)
- [ ] Font files (TTF/OTF)
- [ ] Color swatches (PNG for reference)
- [ ] Icon set (if applicable)

---

## Upload Instructions (Step by Step)

### **Step 1: Find Your PDF**
Locate the Charity: Water branding guide PDF on your computer. It should be named something like:
- `charity-water-brand-guidelines.pdf`
- `Brand Guide - Charity Water.pdf`
- `Charity Water Style Guide.pdf`

### **Step 2: Drag into VS Code**

1. Open VS Code (you're already here)
2. Look at the **File Explorer** on the left side
3. Look for a folder icon at the top (usually shows file tree)
4. Navigate to `/workspaces/GameForWater-Charity/`
5. **Drag your PDF file** from your computer into this folder in VS Code
6. Release to drop it

The file should now appear in your workspace!

### **Step 3: Tell Me It's Uploaded**

Once you see the PDF in the explorer, let me know:
- The filename
- Any other files you also uploaded

I'll then:
1. Extract all the branding specifications
2. Create an official branding guide document
3. Update all styles to match
4. Provide implementation instructions

---

## Alternative: Paste Specifications

If you prefer, you can just **copy the key information** from the PDF and paste it here:

```markdown
**From Charity: Water Brand Guide:**

Primary Yellow: #_______ (Hex code)
Font for Headers: ____________
Font for Body: ____________
Logo location: (describe where to find files)

[Add any other key specifications]
```

Then I'll create everything based on that information.

---

## Files Ready to Update

Once we have the official branding:

**Will be updated:**
```
/Unity Project/Assets/Scripts/UI/UIManager.cs
/Unity Project/Assets/Scripts/UI/MainMenuController.cs
/BRANDING_CHECKLIST.md
[new file] Official Branding Guidelines document
[new file] Color swatches reference
[new file] Typography specifications
```

---

## Next Steps

1. **Upload the PDF** (drag & drop recommended)
2. **Tell me the filename** it shows up as
3. **I'll review it** and extract all details
4. **Update all styles** to be 100% compliant with official Charity: Water branding
5. **Game will look perfectly branded** ✨

Ready when you are! Just drag that PDF into VS Code and let me know. 🚀
