using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Controls all UI elements in the Level scene.
/// Manages displays for level info, timer, score, and buttons.
/// </summary>
public class LevelUIController : MonoBehaviour
{
    [Header("Top Bar UI")]
    [SerializeField] private Text levelNumberText;
    [SerializeField] private Image logoImage;
    [SerializeField] private Text timerText;

    [Header("Bottom Bar UI")]
    [SerializeField] private Text scoreText;
    [SerializeField] private Button startButton;
    [SerializeField] private Button restartButton;

    [Header("Overlay Screens")]
    [SerializeField] private CanvasGroup levelCompleteScreen;
    [SerializeField] private Text completeMessageText;
    [SerializeField] private Button nextLevelButton;
    [SerializeField] private Button claimRewardButton;

    [SerializeField] private CanvasGroup timeoutScreen;
    [SerializeField] private Text timeoutMessageText;

    [Header("Settings")]
    [SerializeField] private bool debugMode = false;

    private void Start()
    {
        SetupUI();
    }

    /// <summary>
    /// Initialize UI elements
    /// </summary>
    private void SetupUI()
    {
        // Style buttons with brand colors
        StyleButton(startButton, BrandingConstants.CHARITY_WATER_YELLOW);
        StyleButton(restartButton, BrandingConstants.CHARITY_WATER_BLUE);
        StyleButton(nextLevelButton, BrandingConstants.CHARITY_WATER_YELLOW);
        StyleButton(claimRewardButton, BrandingConstants.CHARITY_WATER_BLUE);

        // Hide overlay screens initially
        if (levelCompleteScreen != null)
            levelCompleteScreen.alpha = 0;
        if (timeoutScreen != null)
            timeoutScreen.alpha = 0;

        // Set text colors
        if (levelNumberText != null)
            levelNumberText.color = BrandingConstants.TEXT_PRIMARY;
        if (timerText != null)
            timerText.color = BrandingConstants.CHARITY_WATER_BLUE;
        if (scoreText != null)
            scoreText.color = BrandingConstants.TEXT_PRIMARY;

        SetupButtonListeners();

        if (debugMode)
            Debug.Log("Level UI initialized");
    }

    /// <summary>
    /// Setup button click listeners
    /// </summary>
    private void SetupButtonListeners()
    {
        if (startButton != null)
            startButton.onClick.AddListener(OnStartButtonClicked);

        if (restartButton != null)
            restartButton.onClick.AddListener(OnRestartButtonClicked);

        if (nextLevelButton != null)
            nextLevelButton.onClick.AddListener(OnNextLevelClicked);

        if (claimRewardButton != null)
            claimRewardButton.onClick.AddListener(OnClaimRewardClicked);
    }

    // ===== Button Callbacks =====

    private void OnStartButtonClicked()
    {
        if (debugMode)
            Debug.Log("Start button clicked");

        LevelManager.Instance.StartLevel();
    }

    private void OnRestartButtonClicked()
    {
        if (debugMode)
            Debug.Log("Restart button clicked");

        LevelManager.Instance.RestartLevel();
    }

    private void OnNextLevelClicked()
    {
        if (debugMode)
            Debug.Log("Next Level button clicked");

        GameManager.Instance.CompleteLevel();
        SceneLoader.Instance.LoadLevel();
    }

    private void OnClaimRewardClicked()
    {
        if (debugMode)
            Debug.Log("Claim Reward button clicked");

        // TODO: Show reward screen or animation
        SceneLoader.Instance.LoadLevel();
    }

    // ===== Display Updates =====

    /// <summary>
    /// Update level number display
    /// </summary>
    public void UpdateLevelDisplay(int levelNumber)
    {
        if (levelNumberText != null)
            levelNumberText.text = $"Level {levelNumber}";
    }

    /// <summary>
    /// Update timer display
    /// </summary>
    public void UpdateTimerDisplay(int seconds)
    {
        if (timerText != null)
        {
            timerText.text = $"{seconds}s";

            // Change color if low time
            if (seconds <= 10 && seconds > 0)
            {
                timerText.color = Color.red;
            }
            else if (seconds > 0)
            {
                timerText.color = BrandingConstants.CHARITY_WATER_BLUE;
            }
        }
    }

    /// <summary>
    /// Update score (People Helped) display
    /// </summary>
    public void UpdateScoreDisplay(int score)
    {
        if (scoreText != null)
            scoreText.text = $"People Helped: {score}";
    }

    /// <summary>
    /// Show level complete screen
    /// </summary>
    public void ShowLevelCompleteScreen(int score, bool isMilestoneReached = false)
    {
        if (levelCompleteScreen == null) return;

        // Update message
        if (completeMessageText != null)
            completeMessageText.text = $"You helped bring clean water to {score} people.";

        // Show/hide reward button
        if (claimRewardButton != null)
        {
            claimRewardButton.gameObject.SetActive(isMilestoneReached);
        }

        // Show screen with fade
        StartCoroutine(FadeInUI(levelCompleteScreen, true));
    }

    /// <summary>
    /// Show timeout message
    /// </summary>
    public void ShowTimeoutMessage()
    {
        if (timeoutScreen == null) return;

        if (timeoutMessageText != null)
            timeoutMessageText.text = "Time's Up!\nTry Again!";

        StartCoroutine(FadeInUI(timeoutScreen, true));
    }

    /// <summary>
    /// Disable game buttons
    /// </summary>
    public void DisableGameplayButtons()
    {
        if (startButton != null)
            startButton.interactable = false;
        if (restartButton != null)
            restartButton.interactable = false;
    }

    /// <summary>
    /// Enable game buttons
    /// </summary>
    public void EnableGameplayButtons()
    {
        if (startButton != null)
            startButton.interactable = true;
        if (restartButton != null)
            restartButton.interactable = true;
    }

    // ===== Style Helpers =====

    /// <summary>
    /// Style a button with brand colors
    /// </summary>
    private void StyleButton(Button button, Color backgroundColor)
    {
        if (button == null) return;

        Image buttonImage = button.GetComponent<Image>();
        if (buttonImage != null)
            buttonImage.color = backgroundColor;

        Text buttonText = button.GetComponentInChildren<Text>();
        if (buttonText != null)
        {
            buttonText.color = BrandingConstants.TEXT_PRIMARY;
            buttonText.fontSize = BrandingConstants.FONT_SIZE_BUTTON;
        }

        // Add color transition for interactions
        ColorBlock colors = button.colors;
        colors.normalColor = backgroundColor;
        colors.selectedColor = DarkenColor(backgroundColor);
        colors.pressedColor = DarkenColor(backgroundColor);
        colors.highlightedColor = LightenColor(backgroundColor);
        button.colors = colors;
    }

    /// <summary>
    /// Darken color for button pressed state
    /// </summary>
    private Color DarkenColor(Color color)
    {
        Color.RGBToHSV(color, out float h, out float s, out float v);
        return Color.HSVToRGB(h, s, v * 0.8f);
    }

    /// <summary>
    /// Lighten color for button hover state
    /// </summary>
    private Color LightenColor(Color color)
    {
        Color.RGBToHSV(color, out float h, out float s, out float v);
        return Color.HSVToRGB(h, s * 0.5f, Mathf.Min(v * 1.2f, 1f));
    }

    /// <summary>
    /// Fade UI element in/out
    /// </summary>
    private System.Collections.IEnumerator FadeInUI(CanvasGroup canvasGroup, bool fadeIn)
    {
        canvasGroup.gameObject.SetActive(true);
        float duration = 0.5f;
        float elapsedTime = 0;

        float startAlpha = fadeIn ? 0 : 1;
        float endAlpha = fadeIn ? 1 : 0;

        while (elapsedTime < duration)
        {
            elapsedTime += Time.deltaTime;
            canvasGroup.alpha = Mathf.Lerp(startAlpha, endAlpha, elapsedTime / duration);
            yield return null;
        }

        canvasGroup.alpha = endAlpha;
        if (!fadeIn)
            canvasGroup.gameObject.SetActive(false);
    }
}
