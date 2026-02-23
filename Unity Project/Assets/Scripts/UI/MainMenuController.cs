using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Controls the Main Menu scene.
/// Displays branding and sets up the initial game state.
/// </summary>
public class MainMenuController : MonoBehaviour
{
    [Header("UI Elements")]
    [SerializeField] private Image logoImage;
    [SerializeField] private Button playButton;
    [SerializeField] private Button howItWorksButton;
    [SerializeField] private CanvasGroup canvasGroup;

    [Header("Official Charity: Water Branding")]
    private Color brandYellow = BrandingConstants.CHARITY_WATER_YELLOW;
    private Color brandBlue = BrandingConstants.CHARITY_WATER_BLUE;
    private Color backgroundColor = Color.white;

    private void Start()
    {
        SetupMainMenu();
    }

    /// <summary>
    /// Initialize main menu visual setup
    /// </summary>
    private void SetupMainMenu()
    {
        // Auto-find elements if not assigned
        if (logoImage == null)
            logoImage = GetComponentInChildren<Image>();
        if (playButton == null)
            playButton = gameObject.GetComponentInChildren<Button>();
        if (howItWorksButton == null)
        {
            Button[] buttons = gameObject.GetComponentsInChildren<Button>();
            if (buttons.Length > 1)
                howItWorksButton = buttons[1];
        }

        Debug.Log($"Logo assigned: {logoImage != null}, Play button: {playButton != null}, How button: {howItWorksButton != null}");

        // Set background color
        Image bgImage = GetComponent<Image>();
        if (bgImage != null)
        {
            bgImage.color = backgroundColor;
        }

        // **RESIZE AND REPOSITION LOGO**
        if (logoImage != null)
        {
            RectTransform logoRt = logoImage.GetComponent<RectTransform>();
            if (logoRt != null)
            {
                logoRt.localScale = Vector3.one * 2.5f;  // Make it 2.5x bigger
                logoRt.sizeDelta = logoRt.sizeDelta * 2.2f;  // Also increase size
                logoRt.anchoredPosition = new Vector2(logoRt.anchoredPosition.x, -80);  // Move down
                Debug.Log($"Resized logo to scale {logoRt.localScale}, position {logoRt.anchoredPosition}");
            }
        }

        // Style play button
        if (playButton != null)
        {
            Image playButtonImage = playButton.GetComponent<Image>();
            if (playButtonImage != null)
                playButtonImage.color = brandYellow;

            // **RESIZE AND REPOSITION PLAY BUTTON**
            RectTransform playRt = playButton.GetComponent<RectTransform>();
            if (playRt != null)
            {
                playRt.localScale = Vector3.one * 1.8f;  // Make it 1.8x bigger
                playRt.sizeDelta = playRt.sizeDelta * 1.7f;  // Increase button size
                playRt.anchoredPosition = new Vector2(playRt.anchoredPosition.x, -200);  // Move down
                Debug.Log($"Resized play button to scale {playRt.localScale}, position {playRt.anchoredPosition}");
            }
            Text playText = playButton.GetComponentInChildren<Text>();
            if (playText != null)
                playText.fontSize = Mathf.RoundToInt(playText.fontSize * 1.5f);
        }

        // Style how it works button
        if (howItWorksButton != null)
        {
            Image howItWorksImage = howItWorksButton.GetComponent<Image>();
            if (howItWorksImage != null)
                howItWorksImage.color = brandYellow;

            // **RESIZE AND REPOSITION HOW IT WORKS BUTTON**
            RectTransform howRt = howItWorksButton.GetComponent<RectTransform>();
            if (howRt != null)
            {
                howRt.localScale = Vector3.one * 1.8f;  // Make it 1.8x bigger
                howRt.sizeDelta = howRt.sizeDelta * 1.7f;  // Increase button size
                howRt.anchoredPosition = new Vector2(howRt.anchoredPosition.x, -300);  // Move down even more
                Debug.Log($"Resized how button to scale {howRt.localScale}, position {howRt.anchoredPosition}");
            }
            Text howText = howItWorksButton.GetComponentInChildren<Text>();
            if (howText != null)
                howText.fontSize = Mathf.RoundToInt(howText.fontSize * 1.5f);
        }

        // Fade in animation
        if (canvasGroup != null)
        {
            canvasGroup.alpha = 0;
            LeanTween.alphaCanvas(canvasGroup, 1f, 0.5f);
        }

        Debug.Log("Main Menu loaded successfully");
    }

    /// <summary>
    /// Handle play button animation
    /// </summary>
    public void OnPlayButtonHover()
    {
        if (playButton != null)
        {
            LeanTween.scale(playButton.gameObject, Vector3.one * 1.05f, 0.2f);
        }
    }

    /// <summary>
    /// Reset button scale on hover exit
    /// </summary>
    public void OnPlayButtonHoverExit()
    {
        if (playButton != null)
        {
            LeanTween.scale(playButton.gameObject, Vector3.one, 0.2f);
        }
    }
}
