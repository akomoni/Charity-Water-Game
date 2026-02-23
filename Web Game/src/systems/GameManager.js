/**
 * GameManager - Singleton for global game state
 * Manages player data, progression, and scoring
 */

class GameManager {
    constructor() {
        console.log('GameManager constructor called');
        
        if (GameManager.instance) {
            console.log('GameManager instance already exists, returning');
            return GameManager.instance;
        }

        // Level Data
        this.currentLevel = this.loadFromStorage('currentLevel', 1);
        this.score = 0;
        this.waterAmount = 0;
        this.waterNeeded = 100;
        this.cumulativeScore = this.loadFromStorage('cumulativeScore', 0);

        // Settings
        this.debugMode = true;
        this.soundEnabled = this.loadFromStorage('soundEnabled', true);

        GameManager.instance = this;
        console.log('GameManager initialized successfully');
    }

    /**
     * Reset level data for new attempt
     */
    resetLevel() {
        this.score = 0;
        this.waterAmount = 0;

        if (this.debugMode) {
            console.log(`Level ${this.currentLevel} reset. Score: ${this.score}, Water: ${this.waterAmount}/${this.waterNeeded}`);
        }
    }

    /**
     * Complete the current level and advance
     */
    completeLevel() {
        this.cumulativeScore += this.score;
        this.currentLevel++;

        this.saveToStorage('currentLevel', this.currentLevel);
        this.saveToStorage('cumulativeScore', this.cumulativeScore);

        if (this.debugMode) {
            console.log(`Level completed! Score: ${this.score}, Cumulative: ${this.cumulativeScore}`);
        }
    }

    /**
     * Add water particles to current level
     */
    addWater(amount = 1) {
        this.waterAmount += amount;

        if (this.debugMode) {
            console.log(`Water added: ${amount}. Total: ${this.waterAmount}/${this.waterNeeded}`);
        }
    }

    /**
     * Check if level is complete
     */
    isLevelComplete() {
        return this.waterAmount >= this.waterNeeded;
    }

    /**
     * Check if milestone reward is earned
     */
    checkMilestone(threshold) {
        return this.cumulativeScore >= threshold;
    }

    /**
     * Save data to localStorage
     */
    saveToStorage(key, value) {
        try {
            localStorage.setItem(`cw_${key}`, JSON.stringify(value));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    }

    /**
     * Load data from localStorage
     */
    loadFromStorage(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(`cw_${key}`);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.warn('Failed to load from localStorage:', e);
            return defaultValue;
        }
    }

    /**
     * Reset all progress (for testing)
     */
    resetAllProgress() {
        this.currentLevel = 1;
        this.cumulativeScore = 0;
        this.score = 0;
        this.waterAmount = 0;

        localStorage.removeItem('cw_currentLevel');
        localStorage.removeItem('cw_cumulativeScore');

        if (this.debugMode) {
            console.log('All progress reset.');
        }
    }

    /**
     * Toggle sound
     */
    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
        this.saveToStorage('soundEnabled', enabled);
    }

    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!GameManager.instance) {
            new GameManager();
        }
        return GameManager.instance;
    }
}

// Create and export singleton instance
const gameManager = GameManager.getInstance();
