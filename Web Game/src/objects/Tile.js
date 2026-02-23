/**
 * Tile - Individual grid tile
 * Represents a single tile on the game grid
 */

class Tile {
    constructor(scene, x, y, gridX, gridY, tileSize) {
        this.scene = scene;
        this.x = x;                    // World position X
        this.y = y;                    // World position Y
        this.gridX = gridX;            // Grid column
        this.gridY = gridY;            // Grid row
        this.tileSize = tileSize;
        
        // Pipe state
        this.pipeType = 'none';        // 'none', 'straight', 'corner', 'tjoint', 'filter', 'block'
        this.connections = [null, null]; // Two connection directions
        
        // Tile type
        this.tileType = 'normal';      // 'normal', 'water_source', 'village', 'blocked'
        
        // Visual representation
        this.graphics = scene.add.rectangle(x, y, tileSize, tileSize);
        this.border = scene.add.graphics();
        
        this.updateVisuals();
    }

    /**
     * Try to place a pipe on this tile
     */
    tryPlacePipe(pipeType, dir1, dir2) {
        // Cannot place on special tiles
        if (this.tileType !== 'normal') {
            return false;
        }

        // Already has pipe
        if (this.pipeType !== 'none') {
            return false;
        }

        this.pipeType = pipeType;
        this.connections = [dir1, dir2];
        this.updateVisuals();
        return true;
    }

    /**
     * Remove pipe from this tile
     */
    removePipe() {
        this.pipeType = 'none';
        this.connections = [null, null];
        this.updateVisuals();
    }

    /**
     * Get the exit direction for water entering from a direction
     */
    getExitDirection(entryDirection) {
        if (this.pipeType === 'none') return null;

        // Straight pipe - continue in same direction
        if (this.pipeType === 'straight') {
            if (this.connections[0] === entryDirection) return this.connections[1];
            if (this.connections[1] === entryDirection) return this.connections[0];
        }

        // Corner pipe - redirect
        if (this.pipeType === 'corner') {
            if (this.connections[0] === entryDirection) return this.connections[1];
            if (this.connections[1] === entryDirection) return this.connections[0];
        }

        // T-joint or filter - pass through
        if (this.pipeType === 'tjoint' || this.pipeType === 'filter') {
            return entryDirection;
        }

        return null;
    }

    /**
     * Check if this tile has a connection in a direction
     */
    hasConnection(direction) {
        if (this.pipeType === 'none') return false;
        return this.connections[0] === direction || this.connections[1] === direction;
    }

    /**
     * Check if water can enter from a direction
     */
    canWaterEnter(fromDirection) {
        // Special tiles can receive water
        if (this.tileType === 'village' || this.tileType === 'water_source') {
            return true;
        }

        // Blocked tiles block water
        if (this.tileType === 'blocked') {
            return false;
        }

        // Normal tiles need pipes
        if (this.pipeType === 'none') {
            return false;
        }

        return this.hasConnection(fromDirection);
    }

    /**
     * Set tile type
     */
    setTileType(type) {
        this.tileType = type;
        this.updateVisuals();
    }

    /**
     * Update visual representation
     */
    updateVisuals() {
        let color = BrandingConstants.ACCENT_LIGHT_BLUE;

        switch (this.tileType) {
            case 'water_source':
                color = BrandingConstants.CHARITY_WATER_BLUE;
                break;
            case 'village':
                color = BrandingConstants.CHARITY_WATER_YELLOW;
                break;
            case 'blocked':
                color = 0xCCCCCC;
                break;
            case 'normal':
            default:
                if (this.pipeType !== 'none') {
                    color = BrandingConstants.BACKGROUND_WHITE;
                }
                break;
        }

        this.graphics.setFillStyle(color);
        this.graphics.setStrokeStyle(1, 0x999999);

        // Draw border
        this.border.clear();
        this.border.lineStyle(1, 0x999999);
        const halfSize = this.tileSize / 2;
        this.border.strokeRect(
            this.x - halfSize,
            this.y - halfSize,
            this.tileSize,
            this.tileSize
        );
    }

    /**
     * Get tile data for serialization
     */
    getData() {
        return {
            gridX: this.gridX,
            gridY: this.gridY,
            pipeType: this.pipeType,
            connections: this.connections,
            tileType: this.tileType,
        };
    }

    /**
     * Destroy tile graphics
     */
    destroy() {
        this.graphics.destroy();
        this.border.destroy();
    }

    // Getters
    getPipeType() { return this.pipeType; }
    getTileType() { return this.tileType; }
    hasPipe() { return this.pipeType !== 'none'; }
    isSpecialTile() { return this.tileType !== 'normal'; }
}
