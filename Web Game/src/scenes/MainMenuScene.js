/**
 * Main Menu Scene
 * Starting scene with Play and How It Works buttons
 */

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    create() {
        console.log('=== MainMenuScene.create() started ===');

        // Simple background
        const bg = this.add.rectangle(
            BrandingConstants.SCREEN_WIDTH / 2,
            BrandingConstants.SCREEN_HEIGHT / 2,
            BrandingConstants.SCREEN_WIDTH,
            BrandingConstants.SCREEN_HEIGHT,
            0xE8F4F8  // Light blue
        );
        console.log('Background created');

        const centerX = BrandingConstants.SCREEN_WIDTH / 2;
        const centerY = BrandingConstants.SCREEN_HEIGHT / 2;

        // Title
        this.add.text(centerX, 150, 'Jerry\'s Water Network', {
            fontSize: '48px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);
        console.log('Title created');

        // Subtitle
        this.add.text(centerX, 220, 'Bringing clean water to villages', {
            fontSize: '18px',
            fill: '#FFFFFF'
        }).setOrigin(0.5);
        console.log('Subtitle created');

        // Play button
        const playBtn = this.add.rectangle(
            centerX,
            centerY + 100,
            220,
            70,
            0xFFC908  // Yellow
        );
        playBtn.setInteractive({ useHandCursor: true });
        playBtn.setStrokeStyle(2, '#FFFFFF');

        const playText = this.add.text(
            centerX,
            centerY + 100,
            'PLAY',
            { fontSize: '28px', fill: '#333333' }
        ).setOrigin(0.5);
        console.log('Play button created');

        playBtn.on('pointerdown', () => {
            console.log('Play button clicked');
            window.gameManager.resetLevel();
            this.scene.start('LevelScene');
        });

        playBtn.on('pointerover', () => {
            playBtn.setFillStyle(0xFFD700);
        });

        playBtn.on('pointerout', () => {
            playBtn.setFillStyle(0xFFC908);
        });

        // How It Works button
        const infoBtn = this.add.rectangle(
            centerX,
            centerY + 200,
            220,
            70,
            0x2596BE  // Blue
        );
        infoBtn.setInteractive({ useHandCursor: true });
        infoBtn.setStrokeStyle(2, '#FFFFFF');

        const infoText = this.add.text(
            centerX,
            centerY + 200,
            'HOW IT WORKS',
            { fontSize: '18px', fill: '#FFFFFF' }
        ).setOrigin(0.5);
        console.log('Info button created');

        infoBtn.on('pointerdown', () => {
            alert('HOW IT WORKS:\n\n' +
                '1. Build pipes from Water Source to Village\n' +
                '2. Water flows downward\n' +
                '3. Collect 100+ units before time runs out\n' +
                '4. Use Filters for 2x bonus\n\nYou have 60 seconds per level!');
        });

        infoBtn.on('pointerover', () => {
            infoBtn.setFillStyle(0x1B7FA5);
        });

        infoBtn.on('pointerout', () => {
            infoBtn.setFillStyle(0x2596BE);
        });

        // Footer
        this.add.text(
            centerX,
            BrandingConstants.SCREEN_HEIGHT - 80,
            'A game by charity: water\nEvery drop counts',
            { fontSize: '14px', fill: '#FFFFFF', align: 'center' }
        ).setOrigin(0.5);

        console.log('=== MainMenuScene.create() completed ===');
        console.log('=== MainMenuScene.create() completed ===');
    }

    showTutorial() {
        alert('HOW IT WORKS:\n\n' +
            '1. Build pipes from Water Source to Village\n' +
            '2. Water flows downward\n' +
            '3. Collect 100+ units before time runs out\n' +
            '4. Use Filters for 2x bonus\n\nYou have 60 seconds per level!');
    }
}
