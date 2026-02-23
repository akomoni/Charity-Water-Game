/**
 * LevelScene - Main gameplay scene
 * Handles grid, water spawning, timer, and win/lose conditions
 */

class LevelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelScene' });
    }

    create() {
        // Get current level from game manager
        const levelNumber = window.gameManager.getCurrentLevel();

        // Setup background
        this.add.rectangle(
            BrandingConstants.SCREEN_WIDTH / 2,
            BrandingConstants.SCREEN_HEIGHT / 2,
            BrandingConstants.SCREEN_WIDTH,
            BrandingConstants.SCREEN_HEIGHT,
            0xFFFFFF
        );

        // Create grid
        this.gridSystem = new GridSystem(this, 8, 12, 120);

        // Setup level layout based on level number
        this.setupLevelLayout(levelNumber);

        // Create UI
        this.createLevelUI();

        // Game state
        this.gameRunning = false;
        this.levelTimer = 60; // 60 seconds
        this.timerText = null;
        this.waterSourceTile = null;
        this.villageTiles = [];

        // Water spawning
        this.waterParticles = [];
        this.spawnRate = 0.5; // Water every 0.5 seconds
        this.timeSinceLastSpawn = 0;

        // Input for pipe placement (handled by PipeManager later)
        this.input.on('pointerdown', (pointer) => {
            this.onGridClick(pointer);
        });

        console.log(`Level ${levelNumber} started`);
    }

    /**
     * Setup level layout
     */
    setupLevelLayout(levelNumber) {
        // Water source at top middle
        this.gridSystem.setTileType(4, 0, 'water_source');
        this.waterSourceTile = this.gridSystem.getTile(4, 0);

        // Villages at bottom
        this.gridSystem.setTileType(2, 11, 'village');
        this.gridSystem.setTileType(5, 11, 'village');
        
        this.villageTiles = [
            this.gridSystem.getTile(2, 11),
            this.gridSystem.getTile(5, 11)
        ];

        // Setup level-specific pipes (start with empty grid, pipes added via UI)
        // In a real implementation, this would read from a level data file
        
        // Add difficulty-based blocking
        if (levelNumber > 1) {
            const blockCount = Math.min(Math.floor(levelNumber / 2), 4);
            for (let i = 0; i < blockCount; i++) {
                const x = Math.floor(Math.random() * 8);
                const y = Math.floor(Math.random() * 10) + 1;
                if (!this.isTileSpecial(x, y)) {
                    this.gridSystem.setTileType(x, y, 'blocked');
                }
            }
        }
    }

    /**
     * Check if tile is special (source, village, etc.)
     */
    isTileSpecial(gridX, gridY) {
        const tile = this.gridSystem.getTile(gridX, gridY);
        if (!tile) return false;
        return tile.tileType !== 'normal';
    }

    /**
     * Create UI elements
     */
    createLevelUI() {
        // Top bar with back button and level info
        const topBar = this.add.rectangle(
            BrandingConstants.SCREEN_WIDTH / 2,
            30,
            BrandingConstants.SCREEN_WIDTH,
            60,
            BrandingConstants.ACCENT_LIGHT_BLUE
        );

        // Back button
        const backButton = this.add.rectangle(30, 30, 40, 40, BrandingConstants.PRIMARY_BLUE);
        backButton.setInteractive({ useHandCursor: true });
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
        backButton.on('pointerover', () => {
            backButton.setFillStyle(BrandingConstants.CHARITY_WATER_BLUE);
        });
        backButton.on('pointerout', () => {
            backButton.setFillStyle(BrandingConstants.PRIMARY_BLUE);
        });

        // Back arrow text
        this.add.text(30, 30, '←', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Level title
        const levelText = this.add.text(
            BrandingConstants.SCREEN_WIDTH / 2,
            30,
            `Level ${window.gameManager.getCurrentLevel()}`,
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '24px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Timer display
        this.timerText = this.add.text(
            BrandingConstants.SCREEN_WIDTH - 60,
            30,
            `${this.levelTimer}s`,
            {
                fontFamily: 'Arial',
                fontSize: '20px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Water collected display
        const waterDisplayY = BrandingConstants.SCREEN_HEIGHT - 80;
        this.add.text(
            30,
            waterDisplayY,
            'Water Collected:',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '16px',
                color: BrandingConstants.TEXT_PRIMARY
            }
        );

        this.waterCollectedText = this.add.text(
            30,
            waterDisplayY + 30,
            `${window.gameManager.getLevelWater()} / ${this.getTargetWater()}`,
            {
                fontFamily: 'Arial',
                fontSize: '28px',
                color: BrandingConstants.CHARITY_WATER_BLUE,
                fontStyle: 'bold'
            }
        );

        // Start button
        const startButtonX = BrandingConstants.SCREEN_WIDTH - 120;
        const startButtonY = BrandingConstants.SCREEN_HEIGHT - 65;

        this.startButton = this.add.rectangle(
            startButtonX,
            startButtonY,
            200,
            50,
            BrandingConstants.PRIMARY_YELLOW
        );
        this.startButton.setInteractive({ useHandCursor: true });
        this.startButton.on('pointerdown', () => {
            this.startLevel();
        });
        this.startButton.on('pointerover', () => {
            this.startButton.setFillStyle(0xFFD700); // Darker yellow
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setFillStyle(BrandingConstants.PRIMARY_YELLOW);
        });

        this.startButtonText = this.add.text(
            startButtonX,
            startButtonY,
            'START',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '18px',
                color: BrandingConstants.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
    }

    /**
     * Get target water for current level
     */
    getTargetWater() {
        const level = window.gameManager.getCurrentLevel();
        // Increases by 5 per level, starting at 10
        return 10 + (level - 1) * 5;
    }

    /**
     * Handle grid click for pipe placement
     */
    onGridClick(pointer) {
        if (this.gameRunning) return; // Can't place pipes during gameplay

        const tile = this.gridSystem.getTileAtWorldPosition(pointer.x, pointer.y);
        if (!tile) return;

        console.log(`Clicked tile: (${tile.gridX}, ${tile.gridY})`);
        // Pipe placement logic will be handled by PipeManager UI
    }

    /**
     * Start the level gameplay
     */
    startLevel() {
        if (this.gameRunning) return;

        this.gameRunning = true;
        this.startButton.setVisible(false);
        this.startButtonText.setVisible(false);

        console.log('Level started - spawning water');
    }

    /**
     * Update game loop
     */
    update(time, delta) {
        if (!this.gameRunning) return;

        // Timer countdown
        this.levelTimer = Math.max(0, this.levelTimer - delta / 1000);
        this.timerText.setText(Math.ceil(this.levelTimer).toString() + 's');

        // Spawn water particles
        this.timeSinceLastSpawn += delta / 1000;
        if (this.timeSinceLastSpawn >= this.spawnRate && this.waterSourceTile) {
            this.spawnWaterParticle();
            this.timeSinceLastSpawn = 0;
        }

        // Update water display
        const currentWater = window.gameManager.getLevelWater();
        this.waterCollectedText.setText(
            `${currentWater} / ${this.getTargetWater()}`
        );

        // Check win condition
        if (currentWater >= this.getTargetWater()) {
            this.winLevel();
        }

        // Check lose condition (time up)
        if (this.levelTimer <= 0) {
            this.loseLevel();
        }

        // Update water particles
        for (let particle of this.waterParticles) {
            if (!particle.active) {
                this.waterParticles = this.waterParticles.filter(p => p !== particle);
            }
        }
    }

    /**
     * Spawn a water particle
     */
    spawnWaterParticle() {
        const sourceX = this.waterSourceTile.gridX;
        const sourceY = this.waterSourceTile.gridY;

        const particle = new WaterParticle(this, this.gridSystem, sourceX, sourceY);
        this.waterParticles.push(particle);
    }

    /**
     * Win the level
     */
    winLevel() {
        this.gameRunning = false;
        window.gameManager.completeLevel();

        // Stop spawning water
        this.waterParticles.forEach(p => p.destroy());
        this.waterParticles = [];

        // Show completion scene
        this.time.delayedCall(500, () => {
            this.scene.start('LevelCompleteScene');
        });
    }

    /**
     * Lose the level
     */
    loseLevel() {
        this.gameRunning = false;

        // Stop spawning water
        this.waterParticles.forEach(p => p.destroy());
        this.waterParticles = [];

        // Show game over popup
        this.showGameOverPopup();
    }

    /**
     * Show game over popup
     */
    showGameOverPopup() {
        // Semi-transparent overlay
        const overlay = this.add.rectangle(
            BrandingConstants.SCREEN_WIDTH / 2,
            BrandingConstants.SCREEN_HEIGHT / 2,
            BrandingConstants.SCREEN_WIDTH,
            BrandingConstants.SCREEN_HEIGHT,
            0x000000,
            0.5
        );

        // Popup box
        const popupWidth = 300;
        const popupHeight = 250;
        const popupX = BrandingConstants.SCREEN_WIDTH / 2;
        const popupY = BrandingConstants.SCREEN_HEIGHT / 2;

        const popup = this.add.rectangle(
            popupX,
            popupY,
            popupWidth,
            popupHeight,
            0xFFFFFF
        );
        popup.setStrokeStyle(2, BrandingConstants.PRIMARY_BLUE);

        // Title
        this.add.text(
            popupX,
            popupY - 80,
            'Time\'s Up!',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '28px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Message
        this.add.text(
            popupX,
            popupY - 20,
            `You collected ${window.gameManager.getLevelWater()} / ${this.getTargetWater()} water`,
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '16px',
                color: BrandingConstants.TEXT_PRIMARY,
                align: 'center',
                wordWrap: { width: 250 }
            }
        ).setOrigin(0.5);

        // Retry button
        const retryButton = this.add.rectangle(
            popupX - 80,
            popupY + 70,
            120,
            50,
            BrandingConstants.PRIMARY_BLUE
        );
        retryButton.setInteractive({ useHandCursor: true });
        retryButton.on('pointerdown', () => {
            window.gameManager.resetLevel();
            this.scene.restart();
        });

        this.add.text(
            popupX - 80,
            popupY + 70,
            'RETRY',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '16px',
                color: '#FFFFFF',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Menu button
        const menuButton = this.add.rectangle(
            popupX + 80,
            popupY + 70,
            120,
            50,
            BrandingConstants.PRIMARY_YELLOW
        );
        menuButton.setInteractive({ useHandCursor: true });
        menuButton.on('pointerdown', () => {
            window.gameManager.resetLevel();
            this.scene.start('MainMenuScene');
        });

        this.add.text(
            popupX + 80,
            popupY + 70,
            'MENU',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '16px',
                color: BrandingConstants.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
    }

    shutdown() {
        // Clean up
        this.gridSystem.destroy();
        this.waterParticles.forEach(p => p.destroy());
        this.waterParticles = [];
    }
}
