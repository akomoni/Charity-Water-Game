/**
 * Boot Scene
 * Preloads assets and initializes the game
 */

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Set loading bar style
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(BrandingConstants.ACCENT_LIGHT_BLUE, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.add.text(width / 2, height / 2 - 80, 'Loading...', {
            font: '24px ' + BrandingConstants.FONT_FAMILY,
            fill: BrandingConstants.TEXT_PRIMARY_HEX,
        }).setOrigin(0.5);

        let percentText = this.add.text(width / 2, height / 2 + 20, '0%', {
            font: '18px ' + BrandingConstants.FONT_FAMILY,
            fill: '#fff',
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(BrandingConstants.CHARITY_WATER_BLUE, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Skip asset loading for now - using graphics rendering
        // Assets can be added later when files are provided
        console.log('BootScene: Skipping asset preload (no image assets provided)');
    }

    create() {
        console.log('BootScene: create() called');
        console.log('BootScene: Starting MainMenuScene');
        this.scene.start('MainMenuScene');
    }
}
