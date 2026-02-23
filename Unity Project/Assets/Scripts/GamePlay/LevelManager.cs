using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/// <summary>
/// Manages the Level scene gameplay flow.
/// Handles level initialization, timer, water spawning, and win/lose conditions.
/// </summary>
public class LevelManager : MonoBehaviour
{
    public static LevelManager Instance { get; private set; }

    [Header("Level Configuration")]
    [SerializeField] private int gridWidth = 8;
    [SerializeField] private int gridHeight = 12;
    [SerializeField] private float tileSize = 120f;

    [Header("Game Settings")]
    [SerializeField] private int waterNeededToWin = 100;
    [SerializeField] private float timerDuration = 60f;
    [SerializeField] private int maxPipePieces = 10;

    [Header("Water System")]
    [SerializeField] private float waterSpawnRate = 0.5f; // Spawn every 0.5 seconds
    [SerializeField] private GameObject waterParticlePrefab;

    [Header("References")]
    [SerializeField] private Transform gridContainer;
    [SerializeField] private Transform waterSourcePosition;
    [SerializeField] private Transform villagePosition;

    [Header("UI References")]
    [SerializeField] private LevelUIController levelUI;

    // State tracking
    private bool isGameActive = false;
    private bool isLevelComplete = false;
    private float currentTimer;
    private float waterSpawnTimer;
    private int piecesPlaced;
    private GridSystem gridSystem;
    private PipeManager pipeManager;

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
        InitializeLevel();
    }

    private void Update()
    {
        if (!isGameActive) return;

        UpdateTimer();
        UpdateWaterSpawning();
        CheckWinCondition();
        CheckLoseCondition();
    }

    /// <summary>
    /// Initialize the level - create grid, setup tiles, prepare game
    /// </summary>
    private void InitializeLevel()
    {
        if (Debug.isDebugBuild)
            Debug.Log($"Initializing Level {GameManager.Instance.currentLevel}");

        // Create grid system
        gridSystem = gameObject.AddComponent<GridSystem>();
        gridSystem.Initialize(gridWidth, gridHeight, tileSize, gridContainer);

        // Create pipe manager
        pipeManager = gameObject.AddComponent<PipeManager>();
        pipeManager.Initialize(gridSystem, maxPipePieces);

        // Setup water source and village
        SetupSpecialTiles();

        // Reset game state
        GameManager.Instance.ResetLevel();
        currentTimer = timerDuration;
        waterSpawnTimer = 0f;
        piecesPlaced = 0;
        isLevelComplete = false;

        // Update UI
        if (levelUI != null)
        {
            levelUI.UpdateLevelDisplay(GameManager.Instance.currentLevel);
            levelUI.UpdateScoreDisplay(0);
            levelUI.UpdateTimerDisplay((int)currentTimer);
        }

        if (Debug.isDebugBuild)
            Debug.Log("Level initialized successfully");
    }

    /// <summary>
    /// Setup special tiles - Water Source and Village
    /// </summary>
    private void SetupSpecialTiles()
    {
        // Water Source at top-middle (column 4, row 1)
        Vector3 sourcePos = gridSystem.GetTileWorldPosition(3, 0); // 0-indexed
        if (waterSourcePosition != null)
            waterSourcePosition.position = sourcePos;

        // Village at bottom-middle (column 4, row 12)
        Vector3 villagePos = gridSystem.GetTileWorldPosition(3, gridHeight - 1);
        if (villagePosition != null)
            villagePosition.position = villagePos;

        if (Debug.isDebugBuild)
        {
            Debug.Log($"Water Source at grid position (4, 1): {sourcePos}");
            Debug.Log($"Village at grid position (4, {gridHeight}): {villagePos}");
        }
    }

    /// <summary>
    /// Start the level - called when "Start" button is pressed
    /// </summary>
    public void StartLevel()
    {
        if (isGameActive) return;

        isGameActive = true;

        // Disable pipe placement
        if (pipeManager != null)
            pipeManager.DisablePlacement();

        // Disable buttons
        if (levelUI != null)
            levelUI.DisableGameplayButtons();

        if (Debug.isDebugBuild)
            Debug.Log("Level started - water spawning begins");
    }

    /// <summary>
    /// Pause the level
    /// </summary>
    public void PauseLevel()
    {
        isGameActive = false;
        Time.timeScale = 0f;
    }

    /// <summary>
    /// Resume the level
    /// </summary>
    public void ResumeLevel()
    {
        isGameActive = true;
        Time.timeScale = 1f;
    }

    /// <summary>
    /// Restart the level
    /// </summary>
    public void RestartLevel()
    {
        Time.timeScale = 1f;
        SceneLoader.Instance.LoadLevel();
    }

    /// <summary>
    /// Update the countdown timer
    /// </summary>
    private void UpdateTimer()
    {
        currentTimer -= Time.deltaTime;

        if (currentTimer < 0)
            currentTimer = 0;

        if (levelUI != null)
            levelUI.UpdateTimerDisplay((int)currentTimer);
    }

    /// <summary>
    /// Spawn water particles at the water source
    /// </summary>
    private void UpdateWaterSpawning()
    {
        if (!isGameActive || isLevelComplete) return;

        waterSpawnTimer += Time.deltaTime;

        if (waterSpawnTimer >= waterSpawnRate)
        {
            SpawnWaterParticle();
            waterSpawnTimer = 0f;
        }
    }

    /// <summary>
    /// Spawn a single water droplet
    /// </summary>
    private void SpawnWaterParticle()
    {
        if (waterSourcePosition == null) return;

        if (waterParticlePrefab != null)
        {
            GameObject waterParticle = Instantiate(waterParticlePrefab, waterSourcePosition.position, Quaternion.identity);
            WaterParticle particleScript = waterParticle.GetComponent<WaterParticle>();
            if (particleScript != null)
            {
                particleScript.Initialize(gridSystem, waterSourcePosition.position);
            }
        }
    }

    /// <summary>
    /// Check if player has won
    /// </summary>
    private void CheckWinCondition()
    {
        if (GameManager.Instance.IsLevelComplete() && !isLevelComplete)
        {
            isLevelComplete = true;
            CompleteLevel();
        }
    }

    /// <summary>
    /// Check if player has lost (timeout)
    /// </summary>
    private void CheckLoseCondition()
    {
        if (currentTimer <= 0 && !GameManager.Instance.IsLevelComplete() && !isLevelComplete)
        {
            LoseLevel();
        }
    }

    /// <summary>
    /// Handle level completion
    /// </summary>
    private void CompleteLevel()
    {
        isGameActive = false;
        StopAllCoroutines();

        if (Debug.isDebugBuild)
            Debug.Log($"Level Complete! Score: {GameManager.Instance.score}");

        // Show completion screen after a short delay
        StartCoroutine(ShowLevelCompleteScreen());
    }

    /// <summary>
    /// Handle level failure (timeout)
    /// </summary>
    private void LoseLevel()
    {
        isGameActive = false;

        if (Debug.isDebugBuild)
            Debug.Log("Time's up! Level failed.");

        if (levelUI != null)
            levelUI.ShowTimeoutMessage();

        // Allow restart
        StartCoroutine(AllowRestart());
    }

    /// <summary>
    /// Show level complete screen with delay
    /// </summary>
    private IEnumerator ShowLevelCompleteScreen()
    {
        yield return new WaitForSeconds(1f);

        bool isMilestone = GameManager.Instance.CheckMilestone(200);
        if (levelUI != null)
            levelUI.ShowLevelCompleteScreen(GameManager.Instance.score, isMilestone);

        // Transition to level complete scene
        yield return new WaitForSeconds(2f);
        SceneLoader.Instance.LoadLevelComplete();
    }

    /// <summary>
    /// Allow player to restart after timeout
    /// </summary>
    private IEnumerator AllowRestart()
    {
        yield return new WaitForSeconds(2f);
        if (levelUI != null)
            levelUI.EnableGameplayButtons();
    }

    // ===== Getters =====

    public GridSystem GetGridSystem() => gridSystem;
    public PipeManager GetPipeManager() => pipeManager;
    public int GetGridWidth() => gridWidth;
    public int GetGridHeight() => gridHeight;
    public float GetTileSize() => tileSize;
    public bool IsGameActive() => isGameActive;
    public float GetCurrentTimer() => currentTimer;
    public int GetWaterNeeded() => waterNeededToWin;
}
