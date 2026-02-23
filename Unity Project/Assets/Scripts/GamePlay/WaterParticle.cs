using UnityEngine;

/// <summary>
/// Controls a single water droplet particle.
/// Handles movement through pipes, collection at village, and destruction.
/// </summary>
public class WaterParticle : MonoBehaviour
{
    [Header("Movement")]
    [SerializeField] private float moveSpeed = 2f; // tiles per second
    [SerializeField] private AnimationCurve moveCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);

    [Header("State")]
    private GridSystem gridSystem;
    private int currentGridX;
    private int currentGridY;
    private Direction currentDirection = Direction.Down;
    private bool hasPassedFilter = false;
    private float moveProgress = 0f;

    [Header("Settings")]
    [SerializeField] private bool debugMode = false;

    private Vector3 startPosition;
    private Vector3 endPosition;
    private float tileSize;

    public void Initialize(GridSystem grid, Vector3 startPos)
    {
        gridSystem = grid;
        startPosition = startPos;
        transform.position = startPos;

        // Get starting grid position
        Vector2Int gridPos = gridSystem.GetGridPositionFromWorld(startPos);
        currentGridX = gridPos.x;
        currentGridY = gridPos.y;
        tileSize = gridSystem.GetTileSize();

        // Start moving downward
        currentDirection = Direction.Down;
        moveProgress = 0f;

        if (debugMode)
            Debug.Log($"Water particle spawned at grid ({currentGridX}, {currentGridY})");
    }

    private void Update()
    {
        if (gridSystem == null)
            return;

        MoveParticle();
        CheckCollision();
    }

    /// <summary>
    /// Move the particle toward the next tile
    /// </summary>
    private void MoveParticle()
    {
        moveProgress += Time.deltaTime * (moveSpeed / tileSize);

        if (moveProgress >= 1f)
        {
            // Reached next tile
            MoveToNextTile();
            moveProgress = 0f;
        }
        else
        {
            // Interpolate position
            Vector3 nextPos = gridSystem.GetTileWorldPosition(currentGridX, currentGridY);
            Vector3 prevPos = transform.position;

            // Calculate target based on direction
            Vector3 directionOffset = GetDirectionOffset() * tileSize;
            endPosition = gridSystem.GetTileWorldPosition(currentGridX, currentGridY) + directionOffset;

            float smoothProgress = moveCurve.Evaluate(moveProgress);
            transform.position = Vector3.Lerp(prevPos, endPosition, smoothProgress);
        }
    }

    /// <summary>
    /// Get vector offset for current direction
    /// </summary>
    private Vector3 GetDirectionOffset()
    {
        return currentDirection switch
        {
            Direction.Up => Vector3.up,
            Direction.Down => Vector3.down,
            Direction.Left => Vector3.left,
            Direction.Right => Vector3.right,
            _ => Vector3.down
        };
    }

    /// <summary>
    /// Move to the next tile in the current direction
    /// </summary>
    private void MoveToNextTile()
    {
        TileController nextTile = gridSystem.GetAdjacentTile(currentGridX, currentGridY, currentDirection);

        if (nextTile == null)
        {
            // Out of bounds - destroy particle
            DestroyParticle("Out of bounds");
            return;
        }

        // Check if next tile can receive water
        Direction oppositeDir = OppositeDirection(currentDirection);
        if (!nextTile.CanWaterEnter(oppositeDir))
        {
            // Water blocked - destroy particle
            DestroyParticle("Blocked tile");
            return;
        }

        // Update position
        currentGridX = nextTile.GetGridX();
        currentGridY = nextTile.GetGridY();

        // Check if reached village
        if (nextTile.GetTileType() == TileType.Village)
        {
            CollectWater();
            return;
        }

        // Check for filter tile (bonus water)
        if (nextTile.GetPipeType() == PipeType.Filter)
        {
            hasPassedFilter = true;
        }

        // Update direction based on pipe
        PipeType pipeType = nextTile.GetPipeType();
        if (pipeType != PipeType.None)
        {
            Direction exitDir = nextTile.GetExitDirection(oppositeDir);
            if (exitDir != Direction.Up) // Valid exit
            {
                currentDirection = exitDir;
            }
            else
            {
                DestroyParticle("Invalid pipe exit");
                return;
            }
        }
        else if (pipeType == PipeType.None && nextTile.GetTileType() == TileType.Normal)
        {
            // No pipe, water disappears
            DestroyParticle("No pipe");
            return;
        }

        UpdateParticlePosition();
    }

    /// <summary>
    /// Water reached the village - collect it and destroy particle
    /// </summary>
    private void CollectWater()
    {
        int waterValue = hasPassedFilter ? 2 : 1;
        GameManager.Instance.AddWater(waterValue);

        if (debugMode)
            Debug.Log($"Water collected at village! Value: {waterValue}");

        DestroyParticle("Collected");
    }

    /// <summary>
    /// Check collision with obstacles (for visual feedback)
    /// </summary>
    private void CheckCollision()
    {
        // Raycast check if needed for animations/effects
        // For now, path-following is enough
    }

    /// <summary>
    /// Destroy the particle
    /// </summary>
    private void DestroyParticle(string reason = "")
    {
        if (debugMode && !string.IsNullOrEmpty(reason))
            Debug.Log($"Water particle destroyed: {reason}");

        Destroy(gameObject);
    }

    /// <summary>
    /// Update particle visual position
    /// </summary>
    private void UpdateParticlePosition()
    {
        Vector3 newPos = gridSystem.GetTileWorldPosition(currentGridX, currentGridY);
        transform.position = newPos;
    }

    /// <summary>
    /// Get opposite direction
    /// </summary>
    private Direction OppositeDirection(Direction dir)
    {
        return dir switch
        {
            Direction.Up => Direction.Down,
            Direction.Down => Direction.Up,
            Direction.Left => Direction.Right,
            Direction.Right => Direction.Left,
            _ => Direction.Up
        };
    }

    // ===== Getters =====

    public int GetGridX() => currentGridX;
    public int GetGridY() => currentGridY;
    public Direction GetDirection() => currentDirection;
    public bool IsFiltered() => hasPassedFilter;
}
