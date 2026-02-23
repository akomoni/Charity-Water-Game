/**
 * WaterParticle - Represents a water droplet moving through the grid
 * Handles pathfinding, movement, and collision detection
 */

class WaterParticle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, gridSystem, startGridX, startGridY) {
        const startPos = gridSystem.getTileWorldPosition(startGridX, startGridY);
        
        super(scene, startPos.x, startPos.y, 'water-droplet');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.gridSystem = gridSystem;
        this.currentGridX = startGridX;
        this.currentGridY = startGridY;
        this.gridSize = gridSystem.getTileSize();

        // Movement state
        this.isMoving = false;
        this.targetX = startPos.x;
        this.targetY = startPos.y;
        this.moveDirection = 'down';
        this.moveSpeed = 150; // pixels per second

        // Water tracking
        this.waterAmount = 1;
        this.passedThroughFilter = false;

        // Physics setup
        this.setVelocity(0, 0);
        this.setCollideWorldBounds(false);
        this.setScale(0.8);

        // Visual representation if no sprite available
        if (!this.texture.key || this.texture.key === '__missing') {
            this.graphics = scene.make.graphics({ x: 0, y: 0, add: false });
            this.setDisplayOrigin(this.gridSize / 2, this.gridSize / 2);
            this.drawParticle();
        }

        // Start movement
        this.moveToNextTile();
    }

    /**
     * Draw visual representation of water particle
     */
    drawParticle() {
        if (!this.graphics) return;

        this.graphics.clear();
        this.graphics.fillStyle(BrandingConstants.CHARITY_WATER_BLUE, 1);
        this.graphics.fillCircle(this.x, this.y, 8);
        this.graphics.strokeStyle(BrandingConstants.PRIMARY_BLUE, 2);
        this.graphics.strokeCircleShape(new Phaser.Geom.Circle(this.x, this.y, 8));
    }

    /**
     * Move to the next tile following pipes
     */
    moveToNextTile() {
        const currentTile = this.gridSystem.getTile(this.currentGridX, this.currentGridY);
        
        if (!currentTile) {
            this.destroy();
            return;
        }

        // Check if current tile is a village (win condition)
        if (currentTile.tileType === 'village') {
            this.reachedVillage();
            return;
        }

        // Apply filter bonus if passing through filter
        if (currentTile.pipeType === 'filter' && !this.passedThroughFilter) {
            this.waterAmount *= 2;
            this.passedThroughFilter = true;
        }

        // Get next direction
        const nextDirection = currentTile.getExitDirection(this.getReverseDirection(this.moveDirection));
        
        if (!nextDirection) {
            // Dead end or no pipe
            this.destroy();
            return;
        }

        this.moveDirection = nextDirection;

        // Get adjacent tile
        const nextTile = this.gridSystem.getAdjacentTile(
            this.currentGridX,
            this.currentGridY,
            nextDirection
        );

        if (!nextTile) {
            // Out of bounds
            this.destroy();
            return;
        }

        // Move to next tile
        this.currentGridX = nextTile.gridX;
        this.currentGridY = nextTile.gridY;

        const nextPos = this.gridSystem.getTileWorldPosition(
            this.currentGridX,
            this.currentGridY
        );

        this.targetX = nextPos.x;
        this.targetY = nextPos.y;
        this.isMoving = true;
    }

    /**
     * Update movement
     */
    update(time, delta) {
        if (!this.isMoving) return;

        // Move towards target
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.moveSpeed * (delta / 1000)) {
            // Reached target
            this.x = this.targetX;
            this.y = this.targetY;
            this.isMoving = false;

            // Immediately move to next tile after slight delay
            this.scene.time.delayedCall(100, () => {
                this.moveToNextTile();
            });
        } else {
            // Move towards target
            const moveDistance = this.moveSpeed * (delta / 1000);
            const moveX = (dx / distance) * moveDistance;
            const moveY = (dy / distance) * moveDistance;

            this.x += moveX;
            this.y += moveY;
        }

        this.updateGraphics();
    }

    /**
     * Update graphics representation
     */
    updateGraphics() {
        if (!this.graphics) return;
        this.drawParticle();
    }

    /**
     * Get reverse of a direction
     */
    getReverseDirection(direction) {
        switch (direction) {
            case 'up': return 'down';
            case 'down': return 'up';
            case 'left': return 'right';
            case 'right': return 'left';
            default: return 'down';
        }
    }

    /**
     * Called when water reaches a village
     */
    reachedVillage() {
        // Add water to score
        window.gameManager.addWater(this.waterAmount);

        // Visual effect - fade out
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                this.destroy();
            }
        });

        // Particle burst effect
        this.createVillageEffect();
    }

    /**
     * Create visual effect when reaching village
     */
    createVillageEffect() {
        const particles = this.scene.add.particles(
            BrandingConstants.CHARITY_WATER_BLUE
        );

        const emitter = particles.createEmitter({
            x: this.x,
            y: this.y,
            lifespan: 400,
            gravityY: -100,
            speed: { min: -100, max: 100 },
            angle: { min: 240, max: 300 },
            scale: { start: 0.5, end: 0 }
        });

        this.scene.time.delayedCall(500, () => {
            particles.emitters.remove(emitter);
        });
    }

    /**
     * Destroy particle properly
     */
    destroy() {
        if (this.graphics) {
            this.graphics.destroy();
        }
        super.destroy();
    }

    // Getters
    getWaterAmount() { return this.waterAmount; }
    getGridPosition() { return { x: this.currentGridX, y: this.currentGridY }; }
}
