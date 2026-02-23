/**
 * UIManager - Centralized UI management
 * Handles UI elements, popups, and notifications
 */

class UIManager {
    constructor(scene) {
        this.scene = scene;
        this.popups = [];
        this.notifications = [];
    }

    /**
     * Show a simple message popup
     */
    showPopup(title, message, buttons = []) {
        const centerX = BrandingConstants.SCREEN_WIDTH / 2;
        const centerY = BrandingConstants.SCREEN_HEIGHT / 2;

        // Overlay
        const overlay = this.scene.add.rectangle(
            centerX,
            centerY,
            BrandingConstants.SCREEN_WIDTH,
            BrandingConstants.SCREEN_HEIGHT,
            0x000000,
            0.5
        );

        // Popup box
        const popupWidth = 320;
        const popupHeight = 240;

        const popup = this.scene.add.rectangle(
            centerX,
            centerY,
            popupWidth,
            popupHeight,
            0xFFFFFF
        );
        popup.setStrokeStyle(2, BrandingConstants.PRIMARY_BLUE);

        // Title
        this.scene.add.text(
            centerX,
            centerY - popupHeight / 2 + 30,
            title,
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '22px',
                color: BrandingConstants.PRIMARY_BLUE,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Message
        this.scene.add.text(
            centerX,
            centerY - 20,
            message,
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '14px',
                color: BrandingConstants.TEXT_PRIMARY,
                align: 'center',
                wordWrap: { width: 280 }
            }
        ).setOrigin(0.5);

        // Buttons
        const buttonSpacing = popupWidth / (buttons.length + 1);
        buttons.forEach((btn, index) => {
            const buttonX = centerX - (popupWidth / 2) + buttonSpacing * (index + 1);
            const buttonY = centerY + popupHeight / 2 - 30;

            const button = this.scene.add.rectangle(
                buttonX,
                buttonY,
                100,
                40,
                btn.color || BrandingConstants.PRIMARY_BLUE
            );
            button.setInteractive({ useHandCursor: true });

            this.scene.add.text(
                buttonX,
                buttonY,
                btn.text,
                {
                    fontFamily: BrandingConstants.FONT_FAMILY,
                    fontSize: '14px',
                    color: '#FFFFFF',
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5);

            button.on('pointerdown', () => {
                overlay.destroy();
                popup.destroy();
                if (btn.callback) btn.callback();
            });
        });

        this.popups.push({ overlay, popup });
    }

    /**
     * Show a notification (toast-style message)
     */
    showNotification(message, duration = 3000, type = 'info') {
        let colors = {
            info: { bg: BrandingConstants.PRIMARY_BLUE, text: '#FFFFFF' },
            success: { bg: BrandingConstants.CHARITY_WATER_BLUE, text: '#FFFFFF' },
            warning: { bg: BrandingConstants.PRIMARY_YELLOW, text: BrandingConstants.TEXT_PRIMARY },
            error: { bg: '#FF6B6B', text: '#FFFFFF' }
        };

        const color = colors[type] || colors.info;

        const notificationY = 50 + (this.notifications.length * 60);
        const notif = this.scene.add.rectangle(
            BrandingConstants.SCREEN_WIDTH - 150,
            notificationY,
            280,
            50,
            color.bg
        );

        const text = this.scene.add.text(
            BrandingConstants.SCREEN_WIDTH - 150,
            notificationY,
            message,
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '14px',
                color: color.text,
                align: 'center',
                wordWrap: { width: 260 }
            }
        ).setOrigin(0.5);

        this.notifications.push({ notif, text, startTime: Date.now() });

        // Auto-remove after duration
        this.scene.time.delayedCall(duration, () => {
            this.removeNotification(notif);
        });

        return { notif, text };
    }

    /**
     * Remove a notification
     */
    removeNotification(notif) {
        const index = this.notifications.findIndex(n => n.notif === notif);
        if (index !== -1) {
            const notification = this.notifications[index];
            notification.notif.destroy();
            notification.text.destroy();
            this.notifications.splice(index, 1);
        }
    }

    /**
     * Create a loading bar
     */
    createLoadingBar(onComplete) {
        const centerX = BrandingConstants.SCREEN_WIDTH / 2;
        const centerY = BrandingConstants.SCREEN_HEIGHT / 2;

        // Background
        const bgBar = this.scene.add.rectangle(
            centerX,
            centerY,
            300,
            30,
            BrandingConstants.ACCENT_LIGHT_BLUE
        );
        bgBar.setStrokeStyle(2, BrandingConstants.PRIMARY_BLUE);

        // Progress bar
        const progressBar = this.scene.add.rectangle(
            centerX - 150,
            centerY,
            0,
            26,
            BrandingConstants.PRIMARY_YELLOW
        );

        // Percent text
        const percentText = this.scene.add.text(
            centerX,
            centerY,
            '0%',
            {
                fontFamily: 'Arial',
                fontSize: '14px',
                color: BrandingConstants.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        return {
            setProgress: (percent) => {
                const width = (percent / 100) * 300;
                progressBar.setSize(width, 26);
                percentText.setText(`${Math.round(percent)}%`);

                if (percent >= 100) {
                    this.scene.time.delayedCall(200, () => {
                        bgBar.destroy();
                        progressBar.destroy();
                        percentText.destroy();
                        if (onComplete) onComplete();
                    });
                }
            },
            destroy: () => {
                bgBar.destroy();
                progressBar.destroy();
                percentText.destroy();
            }
        };
    }

    /**
     * Create a grid of statistics
     */
    createStatsDisplay(stats, x, y) {
        const statsGroup = [];

        stats.forEach((stat, index) => {
            const statX = x;
            const statY = y + (index * 60);

            // Label
            const label = this.scene.add.text(
                statX,
                statY,
                stat.label,
                {
                    fontFamily: BrandingConstants.FONT_FAMILY,
                    fontSize: '14px',
                    color: BrandingConstants.TEXT_SECONDARY
                }
            );

            // Value
            const value = this.scene.add.text(
                statX,
                statY + 25,
                stat.value.toString(),
                {
                    fontFamily: 'Arial',
                    fontSize: '24px',
                    color: stat.color || BrandingConstants.PRIMARY_BLUE,
                    fontStyle: 'bold'
                }
            );

            statsGroup.push({ label, value });
        });

        return {
            update: (newStats) => {
                newStats.forEach((stat, index) => {
                    if (statsGroup[index]) {
                        statsGroup[index].value.setText(stat.value.toString());
                    }
                });
            },
            destroy: () => {
                statsGroup.forEach(s => {
                    s.label.destroy();
                    s.value.destroy();
                });
            }
        };
    }

    /**
     * Show confirmation dialog
     */
    showConfirmation(message, onConfirm, onCancel) {
        this.showPopup('Confirm', message, [
            {
                text: 'Yes',
                color: BrandingConstants.PRIMARY_BLUE,
                callback: onConfirm
            },
            {
                text: 'No',
                color: BrandingConstants.PRIMARY_YELLOW,
                callback: onCancel
            }
        ]);
    }

    /**
     * Show loading dialog
     */
    showLoadingDialog(message = 'Loading...') {
        const centerX = BrandingConstants.SCREEN_WIDTH / 2;
        const centerY = BrandingConstants.SCREEN_HEIGHT / 2;

        const overlay = this.scene.add.rectangle(
            centerX,
            centerY,
            BrandingConstants.SCREEN_WIDTH,
            BrandingConstants.SCREEN_HEIGHT,
            0x000000,
            0.3
        );

        const dialog = this.scene.add.rectangle(
            centerX,
            centerY,
            200,
            150,
            0xFFFFFF
        );
        dialog.setStrokeStyle(2, BrandingConstants.PRIMARY_BLUE);

        this.scene.add.text(
            centerX,
            centerY - 30,
            message,
            {
                fontFamily: BrandingConstants.FONT_FAMILY,
                fontSize: '16px',
                color: BrandingConstants.TEXT_PRIMARY
            }
        ).setOrigin(0.5);

        // Spinner (simple rotating rectangle)
        const spinner = this.scene.add.rectangle(
            centerX,
            centerY + 30,
            30,
            30,
            BrandingConstants.PRIMARY_BLUE
        );

        this.scene.tweens.add({
            targets: spinner,
            rotation: Math.PI * 2,
            duration: 1000,
            repeat: -1
        });

        return {
            close: () => {
                overlay.destroy();
                dialog.destroy();
                spinner.destroy();
            }
        };
    }

    /**
     * Clear all UI elements
     */
    clearAll() {
        this.popups.forEach(p => {
            p.overlay.destroy();
            p.popup.destroy();
        });
        this.popups = [];

        this.notifications.forEach(n => {
            n.notif.destroy();
            n.text.destroy();
        });
        this.notifications = [];
    }
}
