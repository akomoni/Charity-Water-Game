/**
 * GridSystem - Manages the game grid
 * Creates and manages 8x12 tiles
 */

class GridSystem {
    constructor(scene, gridWidth = 8, gridHeight = 12, tileSize = 120) {
        this.scene = scene;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.tileSize = tileSize;

        // 2D array of tiles
        this.tiles = [];
        this.tileMap = new Map();

        // Calculate grid origin (centered on screen)
        const gridWorldWidth = gridWidth * tileSize;
        const gridWorldHeight = gridHeight * tileSize;
        
        const screenCenterX = BrandingConstants.SCREEN_WIDTH / 2;
        const screenCenterY = BrandingConstants.SCREEN_HEIGHT / 2;
        
        this.gridOriginX = screenCenterX - (gridWorldWidth / 2);
        this.gridOriginY = screenCenterY - (gridWorldHeight / 2);

        this.createTiles();
        console.log(`Grid system initialized: ${gridWidth}×${gridHeight} tiles`);
    }

    /**
     * Create all tiles
     */
    createTiles() {
        for (let x = 0; x < this.gridWidth; x++) {
            this.tiles[x] = [];

            for (let y = 0; y < this.gridHeight; y++) {
                const worldX = this.gridOriginX + (x * this.tileSize) + (this.tileSize / 2);
                const worldY = this.gridOriginY + (y * this.tileSize) + (this.tileSize / 2);

                const tile = new Tile(
                    this.scene,
                    worldX,
                    worldY,
                    x, y,
                    this.tileSize
                );

                this.tiles[x][y] = tile;
                this.tileMap.set(`${x},${y}`, tile);
            }
        }
    }

    /**
     * Get world position of a tile
     */
    getTileWorldPosition(gridX, gridY) {
        if (!this.isValidGridPosition(gridX, gridY)) {
            return { x: 0, y: 0 };
        }

        const worldX = this.gridOriginX + (gridX * this.tileSize) + (this.tileSize / 2);
        const worldY = this.gridOriginY + (gridY * this.tileSize) + (this.tileSize / 2);

        return { x: worldX, y: worldY };
    }

    /**
     * Get grid position from world position
     */
    getGridPositionFromWorld(worldX, worldY) {
        const localX = worldX - this.gridOriginX;
        const localY = worldY - this.gridOriginY;

        const gridX = Math.floor(localX / this.tileSize);
        const gridY = Math.floor(localY / this.tileSize);

        return { x: gridX, y: gridY };
    }

    /**
     * Get tile at grid position
     */
    getTile(gridX, gridY) {
        if (!this.isValidGridPosition(gridX, gridY)) {
            return null;
        }

        return this.tiles[gridX][gridY];
    }

    /**
     * Get tile at world position
     */
    getTileAtWorldPosition(worldX, worldY) {
        const gridPos = this.getGridPositionFromWorld(worldX, worldY);
        return this.getTile(gridPos.x, gridPos.y);
    }

    /**
     * Check if grid position is valid
     */
    isValidGridPosition(gridX, gridY) {
        return gridX >= 0 && gridX < this.gridWidth &&
               gridY >= 0 && gridY < this.gridHeight;
    }

    /**
     * Get adjacent tile in a direction
     */
    getAdjacentTile(gridX, gridY, direction) {
        let newX = gridX;
        let newY = gridY;

        switch (direction) {
            case 'up':
                newY--;
                break;
            case 'down':
                newY++;
                break;
            case 'left':
                newX--;
                break;
            case 'right':
                newX++;
                break;
        }

        return this.getTile(newX, newY);
    }

    /**
     * Get all adjacent tiles
     */
    getAdjacentTiles(gridX, gridY) {
        const adjacent = [];
        const directions = ['up', 'down', 'left', 'right'];

        for (let dir of directions) {
            const tile = this.getAdjacentTile(gridX, gridY, dir);
            if (tile) {
                adjacent.push(tile);
            }
        }

        return adjacent;
    }

    /**
     * Set special tile type
     */
    setTileType(gridX, gridY, tileType) {
        const tile = this.getTile(gridX, gridY);
        if (tile) {
            tile.setTileType(tileType);
        }
    }

    /**
     * Destroy all tiles
     */
    destroy() {
        for (let x = 0; x < this.gridWidth; x++) {
            for (let y = 0; y < this.gridHeight; y++) {
                this.tiles[x][y].destroy();
            }
        }
        this.tiles = [];
        this.tileMap.clear();
    }

    // Getters
    getGridWidth() { return this.gridWidth; }
    getGridHeight() { return this.gridHeight; }
    getTileSize() { return this.tileSize; }
    getGridOrigin() { return { x: this.gridOriginX, y: this.gridOriginY }; }
}
