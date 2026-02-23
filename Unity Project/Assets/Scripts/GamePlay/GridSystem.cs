using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Manages the game grid system.
/// Handles tile creation, grid positioning, and tile lookups.
/// Grid is 8 wide × 12 tall with 120×120 pixel tiles.
/// </summary>
public class GridSystem : MonoBehaviour
{
    [Header("Grid Configuration")]
    private int gridWidth = 8;
    private int gridHeight = 12;
    private float tileSize = 120f;

    // 2D array of tiles for quick lookup
    private TileController[,] tiles;
    
    // Dictionary for faster position-based lookups
    private Dictionary<Vector2, TileController> tileMap = new Dictionary<Vector2, TileController>();

    // Grid offset for centering on screen
    private Vector3 gridOrigin = Vector3.zero;

    public void Initialize(int width, int height, float size, Transform gridContainer)
    {
        gridWidth = width;
        gridHeight = height;
        tileSize = size;

        // Calculate grid origin to center it
        float gridWorldWidth = gridWidth * tileSize;
        float gridWorldHeight = gridHeight * tileSize;
        gridOrigin = new Vector3(-gridWorldWidth / 2f, gridWorldHeight / 2f, 0);

        // Create tile array
        tiles = new TileController[gridWidth, gridHeight];
        tileMap.Clear();

        // Create visual tiles
        CreateTiles(gridContainer);

        Debug.Log($"Grid initialized: {gridWidth}×{gridHeight} tiles, {tileSize}×{tileSize} pixels each");
    }

    /// <summary>
    /// Create visual tiles in the scene
    /// </summary>
    private void CreateTiles(Transform gridContainer)
    {
        for (int x = 0; x < gridWidth; x++)
        {
            for (int y = 0; y < gridHeight; y++)
            {
                // Create tile GameObject
                GameObject tileObj = new GameObject($"Tile_{x}_{y}");
                tileObj.transform.SetParent(gridContainer, false);
                tileObj.transform.localPosition = GetTileLocalPosition(x, y);

                // Add sprite renderer for visual
                SpriteRenderer spriteRenderer = tileObj.AddComponent<SpriteRenderer>();
                spriteRenderer.color = BrandingConstants.ACCENT_LIGHT_BLUE;
                spriteRenderer.sortingOrder = 0;

                // Add box collider for interaction
                BoxCollider2D collider = tileObj.AddComponent<BoxCollider2D>();
                collider.size = Vector2.one * tileSize;

                // Add TileController script
                TileController tileController = tileObj.AddComponent<TileController>();
                tileController.Initialize(x, y, tileSize);

                // Store reference
                tiles[x, y] = tileController;
                tileMap[new Vector2(x, y)] = tileController;

                // Add visual border using UI/outline
                AddTileBorder(tileObj);
            }
        }
    }

    /// <summary>
    /// Add visual border to tile
    /// </summary>
    private void AddTileBorder(GameObject tileObj)
    {
        // Create border with line renderer or simple rect
        LineRenderer lineRenderer = tileObj.AddComponent<LineRenderer>();
        lineRenderer.positionCount = 5; // 4 corners + 1 to close
        lineRenderer.useWorldSpace = false;
        lineRenderer.width = 0.02f;
        lineRenderer.material = new Material(Shader.Find("Sprites/Default"));
        lineRenderer.startColor = Color.gray;
        lineRenderer.endColor = Color.gray;
        lineRenderer.sortingOrder = 1;

        float halfSize = tileSize / 2f;
        lineRenderer.SetPosition(0, new Vector3(-halfSize, halfSize, 0));
        lineRenderer.SetPosition(1, new Vector3(halfSize, halfSize, 0));
        lineRenderer.SetPosition(2, new Vector3(halfSize, -halfSize, 0));
        lineRenderer.SetPosition(3, new Vector3(-halfSize, -halfSize, 0));
        lineRenderer.SetPosition(4, new Vector3(-halfSize, halfSize, 0));
    }

    /// <summary>
    /// Get world position of a tile
    /// </summary>
    public Vector3 GetTileWorldPosition(int gridX, int gridY)
    {
        if (!IsValidGridPosition(gridX, gridY))
            return Vector3.zero;

        Vector3 localPos = GetTileLocalPosition(gridX, gridY);
        return gridOrigin + localPos;
    }

    /// <summary>
    /// Get local position of a tile (relative to grid)
    /// </summary>
    private Vector3 GetTileLocalPosition(int gridX, int gridY)
    {
        return new Vector3(
            gridX * tileSize + tileSize / 2f,
            -gridY * tileSize - tileSize / 2f,
            0
        );
    }

    /// <summary>
    /// Get grid position from world position
    /// </summary>
    public Vector2Int GetGridPositionFromWorld(Vector3 worldPos)
    {
        Vector3 localPos = worldPos - gridOrigin;
        int gridX = Mathf.RoundToInt(localPos.x / tileSize);
        int gridY = Mathf.RoundToInt(-localPos.y / tileSize);

        return new Vector2Int(gridX, gridY);
    }

    /// <summary>
    /// Get tile at grid position
    /// </summary>
    public TileController GetTile(int x, int y)
    {
        if (!IsValidGridPosition(x, y))
            return null;

        return tiles[x, y];
    }

    /// <summary>
    /// Get tile at world position
    /// </summary>
    public TileController GetTileAtWorldPosition(Vector3 worldPos)
    {
        Vector2Int gridPos = GetGridPositionFromWorld(worldPos);
        return GetTile(gridPos.x, gridPos.y);
    }

    /// <summary>
    /// Check if position is valid on grid
    /// </summary>
    public bool IsValidGridPosition(int x, int y)
    {
        return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
    }

    /// <summary>
    /// Get adjacent tile in a direction
    /// </summary>
    public TileController GetAdjacentTile(int x, int y, Direction direction)
    {
        int newX = x;
        int newY = y;

        switch (direction)
        {
            case Direction.Up:
                newY--;
                break;
            case Direction.Down:
                newY++;
                break;
            case Direction.Left:
                newX--;
                break;
            case Direction.Right:
                newX++;
                break;
        }

        return GetTile(newX, newY);
    }

    /// <summary>
    /// Get all adjacent tiles
    /// </summary>
    public TileController[] GetAdjacentTiles(int x, int y)
    {
        List<TileController> adjacent = new List<TileController>();

        foreach (Direction dir in System.Enum.GetValues(typeof(Direction)))
        {
            TileController tile = GetAdjacentTile(x, y, dir);
            if (tile != null)
                adjacent.Add(tile);
        }

        return adjacent.ToArray();
    }

    // ===== Getters =====

    public int GetGridWidth() => gridWidth;
    public int GetGridHeight() => gridHeight;
    public float GetTileSize() => tileSize;
    public Vector3 GetGridOrigin() => gridOrigin;
}

/// <summary>
/// Direction enum for pipe connections
/// </summary>
public enum Direction
{
    Up,
    Down,
    Left,
    Right
}

/// <summary>
/// Pipe type enum
/// </summary>
public enum PipeType
{
    None,
    Straight,
    Corner,
    TJoint,
    Cross,
    Filter,
    Block
}
