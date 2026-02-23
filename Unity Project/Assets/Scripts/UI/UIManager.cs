using UnityEngine;
using UnityEngine.UI;
using TMPro;

/// <summary>
/// Manages UI interactions and displays game data on screen.
/// Controls button interactions, text updates, and UI animations.
/// </summary>
public class UIManager : MonoBehaviour
{
    public static UIManager Instance { get; private set; }

    [Header("Main Menu References")]
    [SerializeField] private Button playButton;
    [SerializeField] private Button howItWorksButton;
    [SerializeField] private Image logoImage;

    [Header("Level Scene References")]
    [SerializeField] private Text levelNumberText;
    [SerializeField] private Text timerText;
    [SerializeField] private Text scoreText;
    [SerializeField] private Button startButton;
    [SerializeField] private Button restartButton;
    [SerializeField] private Image levelLogoImage;

    [Header("Level Complete References")]
    [SerializeField] private Text completionMessageText;
    [SerializeField] private Button nextLevelButton;
    [SerializeField] private Button claimRewardButton;
    [SerializeField] private Text rewardMessageText;

    [Header("Official Charity: Water Colors")]
    private Color brandYellow = BrandingConstants.CHARITY_WATER_YELLOW;
    private Color brandBlue = BrandingConstants.CHARITY_WATER_BLUE;
    private Color textPrimaryColor = BrandingConstants.TEXT_PRIMARY;
    private Color textSecondaryColor = BrandingConstants.TEXT_SECONDARY;

    [Header("Audio")]
    [SerializeField] private AudioClip buttonClickSound;
    [SerializeField] private AudioClip popSound;
    private AudioSource audioSource;

    private bool isSoundEnabled = true;

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
    }

    private void Start()
    {
        audioSource = GetComponent<AudioSource>();
        if (audioSource == null)
        {
            audioSource = gameObject.AddComponent<AudioSource>();
        }

        // Tint homepage whites to an "ugly tan" color so white areas match design
        Color uglyTan = new Color(0.8235294f, 0.7058824f, 0.5490196f);
        if (logoImage != null)
            logoImage.color = uglyTan;
        if (playButton != null)
        {
            var img = playButton.GetComponent<Image>();
            if (img != null) img.color = uglyTan;
        }
        if (howItWorksButton != null)
        {
            var img = howItWorksButton.GetComponent<Image>();
            if (img != null) img.color = uglyTan;
        }

        // Disable LayoutGroups if they exist so they don't override our changes
        DisableLayoutGroupsOnButtons();

        // Apply sizing immediately
        ApplyMainMenuScaling();

        SetupButtonListeners();
    }

    private void DisableLayoutGroupsOnButtons()
    {
        if (playButton != null)
        {
            var layout = playButton.GetComponent<LayoutGroup>();
            if (layout != null) layout.enabled = false;
        }
        if (howItWorksButton != null)
        {
            var layout = howItWorksButton.GetComponent<LayoutGroup>();
            if (layout != null) layout.enabled = false;
        }
        if (logoImage != null)
        {
            var layout = logoImage.GetComponent<LayoutGroup>();
            if (layout != null) layout.enabled = false;
        }
    }

    private void ApplyMainMenuScaling()
    {
        // Make the logo much bigger and move it lower
        if (logoImage != null)
        {
            RectTransform logoRt = logoImage.rectTransform;
            if (logoRt != null)
            {
                logoRt.localScale = Vector3.one * 2.0f;
                logoRt.sizeDelta = logoRt.sizeDelta * 2.0f;
                // Move it lower on the screen
                logoRt.anchoredPosition = logoRt.anchoredPosition + new Vector2(0, -80);
                LayoutRebuilder.ForceRebuildLayoutHierarchy(logoRt);
            }
        }

        float buttonScale = 1.6f;
        float textMultiplier = 1.4f;
        float verticalDropPerButton = 60f;

        if (playButton != null)
        {
            RectTransform playRt = playButton.GetComponent<RectTransform>();
            if (playRt != null)
            {
                playRt.localScale = Vector3.one * buttonScale;
                playRt.sizeDelta = playRt.sizeDelta * buttonScale;
                // Move it lower
                playRt.anchoredPosition = playRt.anchoredPosition + new Vector2(0, -verticalDropPerButton);
                LayoutRebuilder.ForceRebuildLayoutHierarchy(playRt);
            }
            Text playText = playButton.GetComponentInChildren<Text>();
            if (playText != null)
                playText.fontSize = Mathf.RoundToInt(playText.fontSize * textMultiplier);
        }

        if (howItWorksButton != null)
        {
            RectTransform howRt = howItWorksButton.GetComponent<RectTransform>();
            if (howRt != null)
            {
                howRt.localScale = Vector3.one * buttonScale;
                howRt.sizeDelta = howRt.sizeDelta * buttonScale;
                // Move it lower (even more than play button)
                howRt.anchoredPosition = howRt.anchoredPosition + new Vector2(0, -verticalDropPerButton - 30);
                LayoutRebuilder.ForceRebuildLayoutHierarchy(howRt);
            }
            Text howText = howItWorksButton.GetComponentInChildren<Text>();
            if (howText != null)
                howText.fontSize = Mathf.RoundToInt(howText.fontSize * textMultiplier);
        }
    }

    /// <summary>
    /// Set up all button click listeners
    /// </summary>
    private void SetupButtonListeners()
    {
        if (playButton != null)
            playButton.onClick.AddListener(OnPlayButtonClicked);

        if (howItWorksButton != null)
            howItWorksButton.onClick.AddListener(OnHowItWorksClicked);

        if (startButton != null)
            startButton.onClick.AddListener(OnStartButtonClicked);

        if (restartButton != null)
            restartButton.onClick.AddListener(OnRestartButtonClicked);

        if (nextLevelButton != null)
            nextLevelButton.onClick.AddListener(OnNextLevelClicked);

        if (claimRewardButton != null)
            claimRewardButton.onClick.AddListener(OnClaimRewardClicked);
    }

    // ===== Main Menu Callbacks =====

    private void OnPlayButtonClicked()
    {
        PlayButtonSound();
        GameManager.Instance.ResetLevel();
        SceneLoader.Instance.LoadLevel();
    }

    private void OnHowItWorksClicked()
    {
        PlayButtonSound();
        Debug.Log("How It Works button clicked - Tutorial to be implemented");
    }

    // ===== Level Scene Callbacks =====

    private void OnStartButtonClicked()
    {
        PlayButtonSound();
        Debug.Log("Start button clicked - Level manager will handle water spawning");
    }

    private void OnRestartButtonClicked()
    {
        PlayButtonSound();
        GameManager.Instance.ResetLevel();
        SceneLoader.Instance.LoadLevel();
    }

    // ===== Level Complete Callbacks =====

    private void OnNextLevelClicked()
    {
        PlayButtonSound();
        GameManager.Instance.CompleteLevel();
        SceneLoader.Instance.LoadLevel();
    }

    private void OnClaimRewardClicked()
    {
        PlayButtonSound();
        Debug.Log("Claim reward clicked");
    }

    // ===== Text Updates =====

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
            timerText.text = $"{seconds}s";
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
    /// Show level complete screen with score
    /// </summary>
    public void ShowLevelCompleteScreen(int score, bool isMilestoneReached = false)
    {
        if (completionMessageText != null)
            completionMessageText.text = $"You helped bring clean water to {score} people.";

        if (isMilestoneReached && claimRewardButton != null)
        {
            claimRewardButton.gameObject.SetActive(true);
            if (rewardMessageText != null)
                rewardMessageText.text = "Campus milestone reached!";
        }
    }

    // ===== Helper Methods =====

    /// <summary>
    /// Play button click sound effect
    /// </summary>
    private void PlayButtonSound()
    {
        if (isSoundEnabled && buttonClickSound != null && audioSource != null)
        {
            audioSource.PlayOneShot(buttonClickSound);
        }
    }

    /// <summary>
    /// Play a small "pop" sound, e.g. when placing a pipe
    /// </summary>
    public void PlayPopSound()
    {
        if (isSoundEnabled && popSound != null && audioSource != null)
        {
            audioSource.PlayOneShot(popSound);
        }
    }

    /// <summary>
    /// Toggle sound on/off
    /// </summary>
    public void SetSoundEnabled(bool enabled)
    {
        isSoundEnabled = enabled;
    }

    /// <summary>
    /// Get official Charity: Water brand yellow color
    /// </summary>
    public Color GetBrandYellow()
    {
        return BrandingConstants.CHARITY_WATER_YELLOW;
    }

    /// <summary>
    /// Get official Charity: Water brand blue color
    /// </summary>
    public Color GetBrandBlue()
    {
        return BrandingConstants.CHARITY_WATER_BLUE;
    }

    /// <summary>
    /// Get primary text color
    /// </summary>
    public Color GetTextPrimaryColor()
    {
        return BrandingConstants.TEXT_PRIMARY;
    }

    /// <summary>
    /// Disable game buttons during level play
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
}
