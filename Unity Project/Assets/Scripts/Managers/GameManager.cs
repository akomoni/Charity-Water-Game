using UnityEngine;

/// <summary>
/// Singleton GameManager that handles global game state and player data persistence.
/// Manages score, cumulative water, level progression, and data that persists across scenes.
/// </summary>
public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    [Header("Level Data")]
    public int currentLevel = 1;
    public int score = 0;
    public int waterAmount = 0;
    public int waterNeeded = 100;
    public int cumulativeScore = 0;

    [Header("Settings")]
    [SerializeField] private bool debugMode = false;

    private void Awake()
    {
        // Implement singleton pattern
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        DontDestroyOnLoad(gameObject);

        // Load player data from persistent storage
        LoadPlayerData();
    }

    private void OnDestroy()
    {
        if (Instance == this)
        {
            SavePlayerData();
        }
    }

    /// <summary>
    /// Reset level data for a new level attempt
    /// </summary>
    public void ResetLevel()
    {
        score = 0;
        waterAmount = 0;
        
        if (debugMode)
            Debug.Log($"Level {currentLevel} reset. Score: {score}, Water: {waterAmount}/{waterNeeded}");
    }

    /// <summary>
    /// Complete the current level and advance to next
    /// </summary>
    public void CompleteLevel()
    {
        cumulativeScore += score;
        currentLevel++;
        
        SavePlayerData();
        
        if (debugMode)
            Debug.Log($"Level completed! Score: {score}, Cumulative: {cumulativeScore}");
    }

    /// <summary>
    /// Add water particles to the current level
    /// </summary>
    public void AddWater(int amount = 1)
    {
        waterAmount += amount;
        
        if (debugMode)
            Debug.Log($"Water added: {amount}. Total: {waterAmount}/{waterNeeded}");
    }

    /// <summary>
    /// Check if level is complete
    /// </summary>
    public bool IsLevelComplete()
    {
        return waterAmount >= waterNeeded;
    }

    /// <summary>
    /// Check if milestone reward is earned
    /// </summary>
    public bool CheckMilestone(int milestoneThreshold)
    {
        return cumulativeScore >= milestoneThreshold;
    }

    /// <summary>
    /// Save player data to PlayerPrefs
    /// </summary>
    private void SavePlayerData()
    {
        PlayerPrefs.SetInt("CurrentLevel", currentLevel);
        PlayerPrefs.SetInt("CumulativeScore", cumulativeScore);
        PlayerPrefs.Save();
        
        if (debugMode)
            Debug.Log("Player data saved.");
    }

    /// <summary>
    /// Load player data from PlayerPrefs
    /// </summary>
    private void LoadPlayerData()
    {
        currentLevel = PlayerPrefs.GetInt("CurrentLevel", 1);
        cumulativeScore = PlayerPrefs.GetInt("CumulativeScore", 0);
        
        if (debugMode)
            Debug.Log($"Player data loaded. Level: {currentLevel}, Cumulative Score: {cumulativeScore}");
    }

    /// <summary>
    /// Reset all player progress (for testing)
    /// </summary>
    public void ResetAllProgress()
    {
        currentLevel = 1;
        cumulativeScore = 0;
        score = 0;
        waterAmount = 0;
        
        PlayerPrefs.DeleteAll();
        
        if (debugMode)
            Debug.Log("All progress reset.");
    }
}
