using UnityEngine;

/// <summary>
/// Official Charity: Water Branding Constants
/// Contains all official brand colors and typography specifications
/// 
/// Brand Guide Reference: cw_Brand-UsageGuide.pdf
/// Last Updated: February 23, 2026
/// </summary>
public static class BrandingConstants
{
    // ===== PRIMARY BRAND COLORS =====
    
    /// <summary>
    /// Charity: Water Primary Blue
    /// Hex: #2596BE | RGB: (37, 150, 190)
    /// Usage: Primary color, accents, links
    /// </summary>
    public static readonly Color CHARITY_WATER_BLUE = new Color(37f/255f, 150f/255f, 190f/255f);
    
    /// <summary>
    /// Charity: Water Secondary Yellow
    /// Hex: #FFC908 | RGB: (255, 201, 8)
    /// Usage: Buttons, highlights, CTAs, call-to-action elements
    /// </summary>
    public static readonly Color CHARITY_WATER_YELLOW = new Color(255f/255f, 201f/255f, 8f/255f);
    
    // ===== SUPPORTING COLORS =====
    
    /// <summary>
    /// Primary text color - Dark Gray
    /// Hex: #333333 | RGB: (51, 51, 51)
    /// Usage: Body text, headlines, primary content
    /// </summary>
    public static readonly Color TEXT_PRIMARY = new Color(51f/255f, 51f/255f, 51f/255f);
    
    /// <summary>
    /// Secondary text color - Medium Gray
    /// Hex: #666666 | RGB: (102, 102, 102)
    /// Usage: Secondary text, subtext, muted content
    /// </summary>
    public static readonly Color TEXT_SECONDARY = new Color(102f/255f, 102f/255f, 102f/255f);
    
    /// <summary>
    /// Background color - White
    /// Hex: #FFFFFF | RGB: (255, 255, 255)
    /// Usage: Main background, panels, containers
    /// </summary>
    public static readonly Color BACKGROUND_WHITE = Color.white;
    
    /// <summary>
    /// Accent light blue - for highlights and backgrounds
    /// Hex: #E8F4F8 | RGB: (232, 244, 248)
    /// Usage: Hover states, light backgrounds, accents
    /// </summary>
    public static readonly Color ACCENT_LIGHT_BLUE = new Color(232f/255f, 244f/255f, 248f/255f);
    
    /// <summary>
    /// Accent light yellow - for highlights and backgrounds
    /// Hex: #FFF9E6 | RGB: (255, 249, 230)
    /// Usage: Hover states, light backgrounds, accents
    /// </summary>
    public static readonly Color ACCENT_LIGHT_YELLOW = new Color(255f/255f, 249f/255f, 230f/255f);
    
    // ===== TRANSPARENCY VARIANTS =====
    
    /// <summary>
    /// Charity: Water Blue with 50% alpha for overlays
    /// </summary>
    public static readonly Color CHARITY_WATER_BLUE_TRANSPARENT = new Color(37f/255f, 150f/255f, 190f/255f, 0.5f);
    
    /// <summary>
    /// Charity: Water Yellow with 50% alpha for overlays
    /// </summary>
    public static readonly Color CHARITY_WATER_YELLOW_TRANSPARENT = new Color(255f/255f, 201f/255f, 8f/255f, 0.5f);
    
    // ===== TYPOGRAPHY CONSTANTS =====
    
    /// <summary>
    /// Primary font family: Proxima Nova
    /// Make sure to import the asset into Assets/Fonts/
    /// </summary>
    public const string FONT_PROXIMA_NOVA = "Proxima Nova";
    
    // ===== FONT SIZES =====
    
    /// <summary>
    /// Font size for main headlines
    /// Usage: Scene titles, main headings
    /// Size: 48pt
    /// </summary>
    public const int FONT_SIZE_HEADLINE = 48;
    
    /// <summary>
    /// Font size for subheadings
    /// Usage: Section titles, emphasis text
    /// Size: 32pt
    /// </summary>
    public const int FONT_SIZE_SUBHEADING = 32;
    
    /// <summary>
    /// Font size for UI buttons
    /// Usage: Game buttons, calls-to-action
    /// Size: 20pt
    /// </summary>
    public const int FONT_SIZE_BUTTON = 20;
    
    /// <summary>
    /// Font size for body text
    /// Usage: Instructions, descriptions, regular content
    /// Size: 16pt
    /// </summary>
    public const int FONT_SIZE_BODY = 16;
    
    /// <summary>
    /// Font size for UI labels and small text
    /// Usage: Labels, captions, secondary copy
    /// Size: 14pt
    /// </summary>
    public const int FONT_SIZE_LABEL = 14;
    
    // ===== HEX COLOR CODES (FOR REFERENCE) =====
    
    /*
     CHARITY WATER OFFICIAL HEX CODES:
     ================================
     Primary Blue:      #2596BE
     Secondary Yellow:  #FFC908
     Text Primary:      #333333
     Text Secondary:    #666666
     Background White:  #FFFFFF
     Accent Light Blue: #E8F4F8
     Accent Light Yel:  #FFF9E6
    */
    
    // ===== SIZING CONSTANTS =====
    
    /// <summary>
    /// Standard button height
    /// </summary>
    public const float BUTTON_HEIGHT = 60f;
    
    /// <summary>
    /// Standard button corner radius
    /// </summary>
    public const float BUTTON_CORNER_RADIUS = 8f;
    
    /// <summary>
    /// Standard padding/margin for UI elements
    /// </summary>
    public const float UI_PADDING = 16f;
    
    /// <summary>
    /// Spacing between elements
    /// </summary>
    public const float UI_SPACING = 24f;
    
    // ===== HELPER METHODS =====
    
    /// <summary>
    /// Get a color by name (for editor/debugging)
    /// </summary>
    public static Color GetColorByName(string colorName)
    {
        return colorName.ToLower() switch
        {
            "blue" => CHARITY_WATER_BLUE,
            "yellow" => CHARITY_WATER_YELLOW,
            "text" => TEXT_PRIMARY,
            "secondary" => TEXT_SECONDARY,
            "background" => BACKGROUND_WHITE,
            _ => TEXT_PRIMARY
        };
    }
    
    /// <summary>
    /// Returns the Proxima Nova font (requires import)
    /// Falls back to default if not found
    /// </summary>
    public static Font GetProximaNovaFont()
    {
        Font font = Resources.Load<Font>("Fonts/" + FONT_PROXIMA_NOVA);
        return font != null ? font : Resources.GetBuiltinResource<Font>("Arial.ttf");
    }
}
