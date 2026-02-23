/**
 * LevelCompleteScene - Shown when level is successfully completed
 * Displays score and next level button
 */

class LevelCompleteScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelCompleteScene' });
    }

    create() {
        // Background
        this.add.rectangle(
            BrandingConstants.SCREEN_WIDTH / 2,
            BrandingConstants.SCREEN_HEIGHT / 2,
            BrandingConstants.SCREEN_WIDTH,
            BrandingConstants.SCREEN_HEIGHT,
            BrandingConstants.ACCENT_LIGHT_BLUE
        );

        const centerX = BrandingConstants.SCREEN_WIDTH / 2;
        const centerY = BrandingConstants.SCREEN_HEIGHT / 2;

        // Success banner
        const bannerY = 150;
        this.add.rectangle(
            centerX,
            bannerY,
            BrandingConstants.SCREEN_WIDTH,
            120,
            BrandingConstants.PRIMARY_YELLOW
        );

        // Success title
        this.add.text(
            centerX,
            bannerY - 30,
            '🎉 Level Complete! 🎉',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '32px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Level and water info
        const levelText = this.add.text(
            centerX,
            250,
            `Level ${window.gameManager.getCurrentLevel() - 1} Complete`,
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '28px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Water collected this level
        const levelWater = window.gameManager.getLevelWater();
        this.add.text(
            centerX,
            320,
            'Water Collected This Level:',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '18px',
                color: BrandingConstants.TEXT_PRIMARY
            }
        ).setOrigin(0.5);

        this.add.text(
            centerX,
            370,
            `+${levelWater} Liters`,
            {
                fontFamily: 'Arial',
                fontSize: '36px',
                color: BrandingConstants.CHARITY_WATER_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Total cumulative water
        const totalWater = window.gameManager.getCumulativeScore();
        this.add.text(
            centerX,
            450,
            'Total Water Collected:',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '18px',
                color: BrandingConstants.TEXT_PRIMARY
            }
        ).setOrigin(0.5);

        this.add.text(
            centerX,
            500,
            `${totalWater} Liters`,
            {
                fontFamily: 'Arial',
                fontSize: '40px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Check for milestone
        const milestone = window.gameManager.checkMilestone(totalWater);
        if (milestone) {
            this.add.text(
                centerX,
                570,
                `🏆 ${milestone.name}`,
                {
                    fontFamily: BrandingConstants.FONT_FAMILY,
                    fontSize: '20px',
                    color: BrandingConstants.PRIMARY_YELLOW,
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5);
        }

        // Next level button
        const nextButtonY = BrandingConstants.SCREEN_HEIGHT - 150;
        const nextButton = this.add.rectangle(
            centerX,
            nextButtonY,
            250,
            60,
            BrandingConstants.PRIMARY_BLUE
        );
        nextButton.setInteractive({ useHandCursor: true });
        nextButton.on('pointerdown', () => {
            this.scene.start('LevelScene');
        });
        nextButton.on('pointerover', () => {
            nextButton.setFillStyle(BrandingConstants.CHARITY_WATER_BLUE);
        });
        nextButton.on('pointerout', () => {
            nextButton.setFillStyle(BrandingConstants.PRIMARY_BLUE);
        });

        const nextLevel = window.gameManager.getCurrentLevel();
        this.add.text(
            centerX,
            nextButtonY,
            `Next: Level ${nextLevel}`,
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '20px',
                color: '#FFFFFF',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Back to menu button
        const menuButtonY = nextButtonY + 80;
        const menuButton = this.add.rectangle(
            centerX,
            menuButtonY,
            200,
            50,
            BrandingConstants.ACCENT_LIGHT_BLUE
        );
        menuButton.setInteractive({ useHandCursor: true });
        menuButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
        menuButton.setStrokeStyle(2, BrandingConstants.PRIMARY_BLUE);

        this.add.text(
            centerX,
            menuButtonY,
            'Back to Menu',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '16px',
                color: BrandingConstants.PRIMARY_BLUE
            }
        ).setOrigin(0.5);

        // Charity: Water attribution
        this.add.text(
            centerX,
            BrandingConstants.SCREEN_HEIGHT - 30,
            'Bringing clean water to villages',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '12px',
                color: BrandingConstants.TEXT_SECONDARY
            }
        ).setOrigin(0.5);
    }
}
