/**
 * PipeManager - Manages pipe placement and interaction
 * Handles drag-and-drop pipe placement on the grid
 */

class PipeManager {
    constructor(scene, gridSystem) {
        this.scene = scene;
        this.gridSystem = gridSystem;

        // Pipe types available for placement
        this.availablePipes = {
            'straight': { cost: 1, icon: '─' },
            'corner': { cost: 1, icon: '└' },
            'tjoint': { cost: 2, icon: '┴' },
            'filter': { cost: 3, icon: '⊕' }
        };

        this.selectedPipeType = 'straight';
        this.pipeInventory = {
            'straight': 10,
            'corner': 8,
            'tjoint': 3,
            'filter': 1
        };

        this.draggingPipe = null;
        this.dragPreview = null;

        // Direction constants
        this.directions = ['up', 'down', 'left', 'right'];
    }

    /**
     * Create pipe placement UI
     */
    createUI() {
        const startX = 20;
        let currentY = 100;

        // Pipe selection header
        this.scene.add.text(
            startX,
            currentY,
            'Pipes:',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '16px',
                color: BrandingConstants.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        );

        currentY += 40;

        // Create buttons for each pipe type
        for (let pipeType in this.availablePipes) {
            const pipe = this.availablePipes[pipeType];
            const count = this.pipeInventory[pipeType];

            // Button background
            const buttonX = startX + 20;
            const button = this.scene.add.rectangle(
                buttonX,
                currentY,
                120,
                40,
                this.selectedPipeType === pipeType ? 
                    BrandingConstants.PRIMARY_YELLOW : 
                    BrandingConstants.ACCENT_LIGHT_BLUE
            );
            button.setInteractive({ useHandCursor: true });
            button.setStrokeStyle(
                this.selectedPipeType === pipeType ? 3 : 1,
                BrandingConstants.PRIMARY_BLUE
            );

            // Store button reference
            if (!this.pipeButtons) this.pipeButtons = {};
            this.pipeButtons[pipeType] = button;

            button.on('pointerdown', () => {
                this.selectPipeType(pipeType);
            });

            // Icon and name
            this.scene.add.text(
                buttonX - 40,
                currentY,
                pipe.icon,
                {
                    fontFamily: 'Arial',
                    fontSize: '20px',
                    color: BrandingConstants.PRIMARY_BLUE
                }
            ).setOrigin(0.5);

            const nameText = this.scene.add.text(
                buttonX + 15,
                currentY - 10,
                pipeType.charAt(0).toUpperCase() + pipeType.slice(1),
                {
                    fontFamily: BrandingConstants.FONT_FAMILY,
                    fontSize: '12px',
                    color: BrandingConstants.TEXT_PRIMARY,
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5, 1);

            const countText = this.scene.add.text(
                buttonX + 15,
                currentY + 8,
                `×${count}`,
                {
                    fontFamily: 'Arial',
                    fontSize: '11px',
                    color: count > 0 ? BrandingConstants.CHARITY_WATER_BLUE : '#999999'
                }
            ).setOrigin(0.5, 0);

            currentY += 50;
        }
    }

    /**
     * Select pipe type for placement
     */
    selectPipeType(pipeType) {
        this.selectedPipeType = pipeType;

        // Update button visuals
        for (let type in this.pipeButtons) {
            const button = this.pipeButtons[type];
            if (type === pipeType) {
                button.setFillStyle(BrandingConstants.PRIMARY_YELLOW);
                button.setStrokeStyle(3, BrandingConstants.PRIMARY_BLUE);
            } else {
                button.setFillStyle(BrandingConstants.ACCENT_LIGHT_BLUE);
                button.setStrokeStyle(1, BrandingConstants.PRIMARY_BLUE);
            }
        }

        console.log(`Selected pipe type: ${pipeType}`);
    }

    /**
     * Handle grid click for pipe placement during setup
     */
    onGridClick(tile, pointer) {
        if (!tile || tile.tileType !== 'normal') return;
        if (this.pipeInventory[this.selectedPipeType] <= 0) return;

        // Show direction selector
        this.showDirectionSelector(tile);
    }

    /**
     * Show direction selector popup
     */
    showDirectionSelector(tile) {
        const tilePos = this.gridSystem.getTileWorldPosition(tile.gridX, tile.gridY);
        const popupX = tilePos.x;
        const popupY = tilePos.y;

        // Create semi-transparent overlay
        const overlay = this.scene.add.rectangle(
            BrandingConstants.SCREEN_WIDTH / 2,
            BrandingConstants.SCREEN_HEIGHT / 2,
            BrandingConstants.SCREEN_WIDTH,
            BrandingConstants.SCREEN_HEIGHT,
            0x000000,
            0.3
        );

        // Direction buttons (up, down, left, right)
        const directions = [
            { name: 'up', x: 0, y: -80, symbol: '↑' },
            { name: 'down', x: 0, y: 80, symbol: '↓' },
            { name: 'left', x: -80, y: 0, symbol: '←' },
            { name: 'right', x: 80, y: 0, symbol: '→' }
        ];

        if (this.selectedPipeType === 'tjoint') {
            // T-joint requires selecting two directions
            this.showTJointSelector(tile, directions, overlay);
        } else {
            // Regular pipes show simple direction grid
            for (let dir of directions) {
                const button = this.scene.add.rectangle(
                    popupX + dir.x,
                    popupY + dir.y,
                    50,
                    50,
                    BrandingConstants.PRIMARY_BLUE
                );
                button.setInteractive({ useHandCursor: true });
                button.setDepth(1000);

                this.scene.add.text(
                    popupX + dir.x,
                    popupY + dir.y,
                    dir.symbol,
                    {
                        fontFamily: 'Arial',
                        fontSize: '24px',
                        color: '#FFFFFF'
                    }
                ).setOrigin(0.5).setDepth(1001);

                button.on('pointerdown', () => {
                    this.placePipe(tile, dir.name, null);
                    overlay.destroy();
                    // Remove all direction buttons
                    this.scene.children.getAll().forEach(obj => {
                        if (obj.depth === 1000 || obj.depth === 1001) {
                            obj.destroy();
                        }
                    });
                });

                button.on('pointerover', () => {
                    button.setFillStyle(BrandingConstants.CHARITY_WATER_BLUE);
                });

                button.on('pointerout', () => {
                    button.setFillStyle(BrandingConstants.PRIMARY_BLUE);
                });
            }
        }
    }

    /**
     * Show selector for T-joint (two directions)
     */
    showTJointSelector(tile, directions, overlay) {
        const tilePos = this.gridSystem.getTileWorldPosition(tile.gridX, tile.gridY);

        // First direction selection
        this.scene.add.text(
            tilePos.x,
            tilePos.y - 120,
            'First direction:',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '14px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        for (let dir of directions) {
            const button = this.scene.add.rectangle(
                tilePos.x + dir.x,
                tilePos.y - 80 + dir.y,
                45,
                45,
                BrandingConstants.PRIMARY_YELLOW
            );
            button.setInteractive({ useHandCursor: true });

            button.on('pointerdown', () => {
                this.selectTJointSecondDirection(tile, dir.name, overlay);
            });

            button.on('pointerover', () => {
                button.setFillStyle(0xFFD700);
            });

            button.on('pointerout', () => {
                button.setFillStyle(BrandingConstants.PRIMARY_YELLOW);
            });
        }
    }

    /**
     * Select second direction for T-joint
     */
    selectTJointSecondDirection(tile, firstDir, overlay) {
        const tilePos = this.gridSystem.getTileWorldPosition(tile.gridX, tile.gridY);

        // Clear previous buttons
        this.scene.children.getAll().forEach(obj => {
            if (obj.y && Math.abs(obj.y - tilePos.y) < 200) {
                if (obj instanceof Phaser.GameObjects.Rectangle || 
                    (obj instanceof Phaser.GameObjects.Text && obj.y < tilePos.y - 100)) {
                    obj.destroy();
                }
            }
        });

        // Show second direction options (can't be opposite of first)
        const directions = [
            { name: 'up', x: 0, y: -80, symbol: '↑' },
            { name: 'down', x: 0, y: 80, symbol: '↓' },
            { name: 'left', x: -80, y: 0, symbol: '←' },
            { name: 'right', x: 80, y: 0, symbol: '→' }
        ];

        const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' };
        const validDirs = directions.filter(d => d.name !== opposites[firstDir]);

        this.scene.add.text(
            tilePos.x,
            tilePos.y - 120,
            'Second direction:',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '14px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        for (let dir of validDirs) {
            const button = this.scene.add.rectangle(
                tilePos.x + dir.x,
                tilePos.y + dir.y,
                45,
                45,
                BrandingConstants.PRIMARY_BLUE
            );
            button.setInteractive({ useHandCursor: true });

            button.on('pointerdown', () => {
                this.placePipe(tile, firstDir, dir.name);
                overlay.destroy();
                // Cleanup
                this.scene.children.getAll().forEach(obj => {
                    if (obj.depth === 1000 || obj.depth === 1001) {
                        obj.destroy();
                    }
                });
            });

            button.on('pointerover', () => {
                button.setFillStyle(BrandingConstants.CHARITY_WATER_BLUE);
            });

            button.on('pointerout', () => {
                button.setFillStyle(BrandingConstants.PRIMARY_BLUE);
            });
        }
    }

    /**
     * Place pipe on tile
     */
    placePipe(tile, dir1, dir2) {
        const success = tile.tryPlacePipe(this.selectedPipeType, dir1, dir2);

        if (success) {
            this.pipeInventory[this.selectedPipeType]--;
            console.log(`Placed ${this.selectedPipeType} pipe at (${tile.gridX}, ${tile.gridY})`);
        } else {
            console.log('Failed to place pipe - invalid placement');
        }
    }

    /**
     * Remove pipe from tile
     */
    removePipe(tile) {
        if (tile.pipeType === 'none') return;

        const pipeType = tile.pipeType;
        tile.removePipe();
        this.pipeInventory[pipeType]++;

        console.log(`Removed ${pipeType} pipe from (${tile.gridX}, ${tile.gridY})`);
    }

    /**
     * Reset all pipes
     */
    resetPipes() {
        // Reset inventory
        this.pipeInventory = {
            'straight': 10,
            'corner': 8,
            'tjoint': 3,
            'filter': 1
        };

        // Clear all placed pipes
        for (let x = 0; x < this.gridSystem.getGridWidth(); x++) {
            for (let y = 0; y < this.gridSystem.getGridHeight(); y++) {
                const tile = this.gridSystem.getTile(x, y);
                if (tile && tile.pipeType !== 'none') {
                    tile.removePipe();
                }
            }
        }

        console.log('Pipes reset');
    }
}
