using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Manages pipe placement, validation, and undo functionality.
/// Handles drag-and-drop of pipe pieces onto the grid.
/// </summary>
public class PipeManager : MonoBehaviour
{
    private GridSystem gridSystem;
    private int maxPipePieces;
    private int piecesPlaced;
    private bool placementEnabled = true;

    // Track placed pipes for undo/removal
    private Stack<(int x, int y, PipeType type, Direction d1, Direction d2)> placedPipes = 
        new Stack<(int, int, PipeType, Direction, Direction)>();

    [Header("Pipe Prefabs")]
    private GameObject straightPipePrefab;
    private GameObject cornerPipePrefab;
    private GameObject tJointPrefab;

    [Header("Settings")]
    private float gridSnapTolerance = 16f; // Pixels to snap to grid

    public void Initialize(GridSystem grid, int maxPieces)
    {
        gridSystem = grid;
        maxPipePieces = maxPieces;
        piecesPlaced = 0;
        placementEnabled = true;

        Debug.Log($"PipeManager initialized - Max pieces: {maxPieces}");
    }

    /// <summary>
    /// Attempt to place a pipe at world position
    /// </summary>
    public bool TryPlacePipe(Vector3 worldPos, PipeType pipeType, Direction dir1, Direction dir2)
    {
        if (!placementEnabled)
        {
            Debug.Log("Pipe placement is disabled");
            return false;
        }

        if (piecesPlaced >= maxPipePieces)
        {
            Debug.Log("Maximum pipe pieces reached");
            return false;
        }

        // Get nearest grid tile
        Vector2Int gridPos = gridSystem.GetGridPositionFromWorld(worldPos);
        TileController tile = gridSystem.GetTile(gridPos.x, gridPos.y);

        if (tile == null)
        {
            Debug.Log("Invalid grid position");
            return false;
        }

        // Special tiles cannot have pipes
        if (tile.IsSpecialTile())
        {
            Debug.Log("Cannot place pipe on special tile");
            return false;
        }

        // Try to place pipe
        if (tile.TryPlacePipe(pipeType, dir1, dir2))
        {
            piecesPlaced++;
            placedPipes.Push((gridPos.x, gridPos.y, pipeType, dir1, dir2));

            if (Debug.isDebugBuild)
                Debug.Log($"Pipe placed at ({gridPos.x}, {gridPos.y}) - Total: {piecesPlaced}/{maxPipePieces}");

            return true;
        }

        return false;
    }

    /// <summary>
    /// Remove the last placed pipe (undo)
    /// </summary>
    public bool UndoLastPipe()
    {
        if (placedPipes.Count == 0)
            return false;

        var (x, y, _, _, _) = placedPipes.Pop();
        TileController tile = gridSystem.GetTile(x, y);

        if (tile != null)
        {
            tile.RemovePipe();
            piecesPlaced--;

            if (Debug.isDebugBuild)
                Debug.Log($"Pipe removed from ({x}, {y}) - Total: {piecesPlaced}/{maxPipePieces}");

            return true;
        }

        return false;
    }

    /// <summary>
    /// Clear all placed pipes
    /// </summary>
    public void ClearAllPipes()
    {
        while (placedPipes.Count > 0)
        {
            UndoLastPipe();
        }
    }

    /// <summary>
    /// Disable pipe placement (called when level starts)
    /// </summary>
    public void DisablePlacement()
    {
        placementEnabled = false;
        Debug.Log("Pipe placement disabled");
    }

    /// <summary>
    /// Enable pipe placement
    /// </summary>
    public void EnablePlacement()
    {
        placementEnabled = true;
        Debug.Log("Pipe placement enabled");
    }

    /// <summary>
    /// Get all tiles with pipes
    /// </summary>
    public List<TileController> GetAllPipedTiles()
    {
        List<TileController> pipedTiles = new List<TileController>();

        for (int x = 0; x < gridSystem.GetGridWidth(); x++)
        {
            for (int y = 0; y < gridSystem.GetGridHeight(); y++)
            {
                TileController tile = gridSystem.GetTile(x, y);
                if (tile != null && tile.HasPipe())
                {
                    pipedTiles.Add(tile);
                }
            }
        }

        return pipedTiles;
    }

    /// <summary>
    /// Validate the current pipe network
    /// Returns true if water can reach village from source
    /// </summary>
    public bool ValidateNetwork()
    {
        // Find water source tile
        TileController sourceArea = null;
        for (int x = 0; x < gridSystem.GetGridWidth(); x++)
        {
            for (int y = 0; y < gridSystem.GetGridHeight(); y++)
            {
                TileController tile = gridSystem.GetTile(x, y);
                if (tile != null && tile.GetTileType() == TileType.WaterSource)
                {
                    sourceArea = tile;
                    break;
                }
            }
            if (sourceArea != null) break;
        }

        // Simple validation: check if there's a continuous pipe from source down
        // This is a simplified check - more complex pathfinding can be added
        if (sourceArea == null) return false;

        return CanReachVillage(sourceArea.GetGridX(), sourceArea.GetGridY(), Direction.Down);
    }

    /// <summary>
    /// Check if village can be reached from a position
    /// </summary>
    private bool CanReachVillage(int x, int y, Direction fromDir)
    {
        TileController currentTile = gridSystem.GetTile(x, y);

        if (currentTile == null)
            return false;

        if (currentTile.GetTileType() == TileType.Village)
            return true;

        if (currentTile.GetPipeType() == PipeType.None && currentTile.GetTileType() != TileType.WaterSource)
            return false;

        // Get exit direction
        Direction exitDir = currentTile.GetExitDirection(fromDir);
        if (exitDir == Direction.Up) // Invalid
            return false;

        // Move to next tile
        TileController nextTile = gridSystem.GetAdjacentTile(x, y, exitDir);
        if (nextTile == null)
            return false;

        return CanReachVillage(nextTile.GetGridX(), nextTile.GetGridY(), OppositeDirection(exitDir));
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

    public int GetPiecesPlaced() => piecesPlaced;
    public int GetMaxPieces() => maxPipePieces;
    public bool IsPlacementEnabled() => placementEnabled;
    public int GetPiecesRemaining() => maxPipePieces - piecesPlaced;
}

/// <summary>
/// Data class for pipe placement
/// </summary>
public class PipePlacement
{
    public PipeType PipeType { get; set; }
    public Direction Direction1 { get; set; }
    public Direction Direction2 { get; set; }
    public int GridX { get; set; }
    public int GridY { get; set; }

    public PipePlacement(PipeType type, Direction d1, Direction d2, int x, int y)
    {
        PipeType = type;
        Direction1 = d1;
        Direction2 = d2;
        GridX = x;
        GridY = y;
    }
}
