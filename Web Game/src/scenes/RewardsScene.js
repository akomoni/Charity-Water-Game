/**
 * RewardsScene - Shows milestone rewards and achievements
 * Displayed when milestones are reached
 */

class RewardsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RewardsScene' });
    }

    init(data) {
        this.rewardData = data || {};
    }

    create() {
        // Background with gradient effect (simulated)
        this.add.rectangle(
            BrandingConstants.SCREEN_WIDTH / 2,
            BrandingConstants.SCREEN_HEIGHT / 2,
            BrandingConstants.SCREEN_WIDTH,
            BrandingConstants.SCREEN_HEIGHT,
            BrandingConstants.ACCENT_LIGHT_BLUE
        );

        const centerX = BrandingConstants.SCREEN_WIDTH / 2;
        const centerY = BrandingConstants.SCREEN_HEIGHT / 2;

        // Trophy banner
        const bannerY = 120;
        this.add.rectangle(
            centerX,
            bannerY,
            BrandingConstants.SCREEN_WIDTH,
            100,
            BrandingConstants.PRIMARY_YELLOW
        );

        this.add.text(
            centerX,
            bannerY,
            '🏆 Achievement Unlocked! 🏆',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '28px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Get milestones data
        const milestones = this.getMilestonesData();
        const currentWater = window.gameManager.getCumulativeScore();
        const currentMilestone = milestones.find(m => m.threshold <= currentWater);

        if (currentMilestone) {
            // Milestone info
            this.add.text(
                centerX,
                260,
                currentMilestone.name,
                {
                    fontFamily: BrandingConstants.FONT_FAMILY,
                    fontSize: '32px',
                    color: BrandingConstants.PRIMARY_BLUE,
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5);

            this.add.text(
                centerX,
                320,
                currentMilestone.description,
                {
                    fontFamily: BrandingConstants.FONT_FAMILY,
                    fontSize: '16px',
                    color: BrandingConstants.TEXT_PRIMARY,
                    align: 'center',
                    wordWrap: { width: 300 }
                }
            ).setOrigin(0.5);

            // Impact info
            const villageCount = Math.floor(currentWater / 100);
            this.add.text(
                centerX,
                420,
                `You\'ve brought clean water to ${villageCount} ${villageCount === 1 ? 'village' : 'villages'}!`,
                {
                    fontFamily: BrandingConstants.FONT_FAMILY,
                    fontSize: '18px',
                    color: BrandingConstants.CHARITY_WATER_BLUE,
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5);

            // Progress to next milestone
            const milestoneIndex = milestones.indexOf(currentMilestone);
            if (milestoneIndex < milestones.length - 1) {
                const nextMilestone = milestones[milestoneIndex + 1];
                const waterToNext = nextMilestone.threshold - currentWater;

                this.add.text(
                    centerX,
                    500,
                    `${waterToNext}L until next milestone`,
                    {
                        fontFamily: BrandingConstants.FONT_FAMILY,
                        fontSize: '16px',
                        color: BrandingConstants.TEXT_SECONDARY
                    }
                ).setOrigin(0.5);
            } else {
                this.add.text(
                    centerX,
                    500,
                    'You\'ve reached the ultimate goal!',
                    {
                        fontFamily: BrandingConstants.FONT_FAMILY,
                        fontSize: '16px',
                        color: BrandingConstants.PRIMARY_YELLOW,
                        fontStyle: 'bold'
                    }
                ).setOrigin(0.5);
            }
        }

        // Continue button
        const continueButtonY = BrandingConstants.SCREEN_HEIGHT - 150;
        const continueButton = this.add.rectangle(
            centerX,
            continueButtonY,
            250,
            60,
            BrandingConstants.PRIMARY_BLUE
        );
        continueButton.setInteractive({ useHandCursor: true });
        continueButton.on('pointerdown', () => {
            this.scene.start('LevelScene');
        });
        continueButton.on('pointerover', () => {
            continueButton.setFillStyle(BrandingConstants.CHARITY_WATER_BLUE);
        });
        continueButton.on('pointerout', () => {
            continueButton.setFillStyle(BrandingConstants.PRIMARY_BLUE);
        });

        this.add.text(
            centerX,
            continueButtonY,
            'Continue Playing',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '18px',
                color: '#FFFFFF',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Learn more link
        this.add.text(
            centerX,
            BrandingConstants.SCREEN_HEIGHT - 40,
            'Learn more at charity: water',
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '12px',
                color: BrandingConstants.PRIMARY_BLUE,
                decoration: 'underline'
            }
        ).setOrigin(0.5).setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                window.open('https://www.charitywater.org', '_blank');
            });
    }

    /**
     * Get milestone data
     */
    getMilestonesData() {
        return [
            {
                threshold: 0,
                name: 'Getting Started',
                description: 'You\'ve begun your journey to bring clean water to villages!'
            },
            {
                threshold: 100,
                name: 'Water Warrior',
                description: 'You\'ve collected 100 liters! You\'re making a real difference.'
            },
            {
                threshold: 300,
                name: 'Village Champion',
                description: 'You\'ve collected 300 liters! Entire villages now have access to clean water.'
            },
            {
                threshold: 500,
                name: 'Water Guardian',
                description: 'You\'ve collected 500 liters! You\'re a true champion for change.'
            },
            {
                threshold: 1000,
                name: 'Clean Water Hero',
                description: 'You\'ve collected 1000+ liters! You\'ve made an extraordinary impact.'
            }
        ];
    }
}
