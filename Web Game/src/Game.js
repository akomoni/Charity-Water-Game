/**
 * Main Game Configuration and Initialization
 * Sets up Phaser with all scenes and settings
 */

console.log('Game.js: Starting initialization');
console.log('Game.js: BrandingConstants:', typeof BrandingConstants);

const gameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920,
        min: {
            width: 240,
            height: 360,
        },
        max: {
            width: 1080,
            height: 1920,
        },
        expandParent: true,
    },
    backgroundColor: BrandingConstants.BACKGROUND_WHITE_HEX,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [
        BootScene,
        MainMenuScene,
        LevelScene,
        LevelCompleteScene,
        RewardsScene,
    ],
    input: {
        activePointers: 10,
    },
    render: {
        pixelArt: true,
        antialias: false,
        roundPixels: true,
    },
};

// Initialize the game
console.log('Game.js: Creating Phaser game instance');
const game = new Phaser.Game(gameConfig);
console.log('Game.js: Phaser game instance created');

// Global game reference
window.game = game;
// gameManager is already created by GameManager.js
window.gameManager = gameManager;

console.log('Game.js: Initialization complete!');
