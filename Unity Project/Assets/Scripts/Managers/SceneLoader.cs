using UnityEngine;
using UnityEngine.SceneManagement;

/// <summary>
/// Manages scene transitions and loading.
/// Provides methods to navigate between Main Menu, Level, Level Complete, and Rewards scenes.
/// </summary>
public class SceneLoader : MonoBehaviour
{
    public static SceneLoader Instance { get; private set; }

    [Header("Scene Names")]
    [SerializeField] private string mainMenuScene = "MainMenu";
    [SerializeField] private string levelScene = "Level";
    [SerializeField] private string levelCompleteScene = "LevelComplete";
    [SerializeField] private string rewardsScene = "Rewards";

    [Header("Transition")]
    [SerializeField] private float transitionDuration = 0.5f;
    [SerializeField] private bool debugMode = false;

    private CanvasGroup fadeCanvasGroup;

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        DontDestroyOnLoad(gameObject);
    }

    /// <summary>
    /// Load the Main Menu scene
    /// </summary>
    public void LoadMainMenu()
    {
        LoadScene(mainMenuScene);
    }

    /// <summary>
    /// Load the Level scene
    /// </summary>
    public void LoadLevel()
    {
        LoadScene(levelScene);
    }

    /// <summary>
    /// Load the Level Complete scene
    /// </summary>
    public void LoadLevelComplete()
    {
        LoadScene(levelCompleteScene);
    }

    /// <summary>
    /// Load the Rewards scene
    /// </summary>
    public void LoadRewards()
    {
        LoadScene(rewardsScene);
    }

    /// <summary>
    /// Generic scene loading with fade transition
    /// </summary>
    private void LoadScene(string sceneName)
    {
        if (debugMode)
            Debug.Log($"Loading scene: {sceneName}");

        SceneManager.LoadScene(sceneName);
    }

    /// <summary>
    /// Quit the application
    /// </summary>
    public void QuitApplication()
    {
        if (debugMode)
            Debug.Log("Application quit requested.");

        #if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
        #else
            Application.Quit();
        #endif
    }

    /// <summary>
    /// Get the current active scene name
    /// </summary>
    public string GetCurrentScene()
    {
        return SceneManager.GetActiveScene().name;
    }
}
