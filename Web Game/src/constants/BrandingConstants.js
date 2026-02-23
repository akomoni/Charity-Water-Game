/**
 * Branding Constants for Charity: Water
 * Official brand colors, typography, and sizing
 */

const BrandingConstants = {
    // ===== OFFICIAL BRAND COLORS =====
    
    // Primary Colors
    CHARITY_WATER_BLUE: 0x2596BE,      // #2596BE
    CHARITY_WATER_BLUE_HEX: '#2596BE',
    CHARITY_WATER_BLUE_RGB: { r: 37, g: 150, b: 190 },
    
    PRIMARY_BLUE: 0x2596BE,            // Alias for CHARITY_WATER_BLUE
    PRIMARY_BLUE_HEX: '#2596BE',
    
    CHARITY_WATER_YELLOW: 0xFFC908,    // #FFC908
    CHARITY_WATER_YELLOW_HEX: '#FFC908',
    CHARITY_WATER_YELLOW_RGB: { r: 255, g: 201, b: 8 },
    
    PRIMARY_YELLOW: 0xFFC908,          // Alias for CHARITY_WATER_YELLOW
    PRIMARY_YELLOW_HEX: '#FFC908',
    
    // Supporting Colors
    TEXT_PRIMARY: 0x333333,            // #333333
    TEXT_PRIMARY_HEX: '#333333',
    TEXT_PRIMARY_RGB: { r: 51, g: 51, b: 51 },
    
    TEXT_SECONDARY: 0x666666,          // #666666
    TEXT_SECONDARY_HEX: '#666666',
    TEXT_SECONDARY_RGB: { r: 102, g: 102, b: 102 },
    
    BACKGROUND_WHITE: 0xFFFFFF,        // #FFFFFF
    BACKGROUND_WHITE_HEX: '#FFFFFF',
    BACKGROUND_WHITE_RGB: { r: 255, g: 255, b: 255 },
    
    ACCENT_LIGHT_BLUE: 0xE8F4F8,       // #E8F4F8
    ACCENT_LIGHT_BLUE_HEX: '#E8F4F8',
    ACCENT_LIGHT_BLUE_RGB: { r: 232, g: 244, b: 248 },
    
    ACCENT_LIGHT_YELLOW: 0xFFF9E6,     // #FFF9E6
    ACCENT_LIGHT_YELLOW_HEX: '#FFF9E6',
    ACCENT_LIGHT_YELLOW_RGB: { r: 255, g: 249, b: 230 },
    
    // ===== TYPOGRAPHY =====
    FONT_PRIMARY: 'Proxima Nova',
    FONT_FAMILY: "'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    
    // Font Sizes
    FONT_SIZE_HEADLINE: 48,
    FONT_SIZE_SUBHEADING: 32,
    FONT_SIZE_BUTTON: 20,
    FONT_SIZE_BODY: 16,
    FONT_SIZE_LABEL: 14,
    
    // ===== SIZING CONSTANTS =====
    BUTTON_HEIGHT: 60,
    BUTTON_CORNER_RADIUS: 8,
    UI_PADDING: 16,
    UI_SPACING: 24,
    
    // ===== GRID & GAME =====
    GRID_WIDTH: 8,
    GRID_HEIGHT: 12,
    TILE_SIZE: 120,
    GAME_WIDTH: 8 * 120,    // 960px
    GAME_HEIGHT: 12 * 120,  // 1440px
    SCREEN_WIDTH: 1080,
    SCREEN_HEIGHT: 1920,
    
    // ===== HELPER METHODS =====
    
    /**
     * Get color by name
     */
    getColorByName: function(name) {
        const colors = {
            'blue': this.CHARITY_WATER_BLUE,
            'yellow': this.CHARITY_WATER_YELLOW,
            'text': this.TEXT_PRIMARY,
            'secondary': this.TEXT_SECONDARY,
            'background': this.BACKGROUND_WHITE,
            'light-blue': this.ACCENT_LIGHT_BLUE,
            'light-yellow': this.ACCENT_LIGHT_YELLOW,
        };
        return colors[name.toLowerCase()] || this.TEXT_PRIMARY;
    },
    
    /**
     * Get hex color by name
     */
    getColorHex: function(name) {
        const colors = {
            'blue': this.CHARITY_WATER_BLUE_HEX,
            'yellow': this.CHARITY_WATER_YELLOW_HEX,
            'text': this.TEXT_PRIMARY_HEX,
            'secondary': this.TEXT_SECONDARY_HEX,
            'background': this.BACKGROUND_WHITE_HEX,
            'light-blue': this.ACCENT_LIGHT_BLUE_HEX,
            'light-yellow': this.ACCENT_LIGHT_YELLOW_HEX,
        };
        return colors[name.toLowerCase()] || this.TEXT_PRIMARY_HEX;
    },
    
    /**
     * Get RGB color by name
     */
    getColorRGB: function(name) {
        const colors = {
            'blue': this.CHARITY_WATER_BLUE_RGB,
            'yellow': this.CHARITY_WATER_YELLOW_RGB,
            'text': this.TEXT_PRIMARY_RGB,
            'secondary': this.TEXT_SECONDARY_RGB,
            'background': this.BACKGROUND_WHITE_RGB,
            'light-blue': this.ACCENT_LIGHT_BLUE_RGB,
            'light-yellow': this.ACCENT_LIGHT_YELLOW_RGB,
        };
        return colors[name.toLowerCase()] || this.TEXT_PRIMARY_RGB;
    },
};

// Freeze constants to prevent accidental modification
Object.freeze(BrandingConstants);
