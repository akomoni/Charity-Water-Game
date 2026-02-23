using UnityEngine;

/// <summary>
/// Controllers a single tile on the game grid.
/// Manages tile state, pipe placement, and water flow direction.
/// </summary>
public class TileController : MonoBehaviour
{
    [Header("Position")]
    private int gridX;
    private int gridY;
    private float tileSize;

    [Header("Tile State")]
    private PipeType currentPipeType = PipeType.None;
    private Direction[] connections = new Direction[2]; // For straight/corner pipes
    private TileType tileType = TileType.Normal;

    [Header("Visual")]
    private SpriteRenderer spriteRenderer;
    private Sprite pipeSprite;

    public void Initialize(int x, int y, float size)
    {
        gridX = x;
        gridY = y;
        tileSize = size;

        spriteRenderer = GetComponent<SpriteRenderer>();
        UpdateTileVisuals();
    }

    /// <summary>
    /// Place a pipe on this tile
    /// </summary>
    public bool TryPlacePipe(PipeType pipeType, Direction dir1, Direction dir2)
    {
        // Cannot place on special tiles
        if (tileType != TileType.Normal)
            return false;

        // Already has pipe
        if (currentPipeType != PipeType.None)
            return false;

        currentPipeType = pipeType;
        connections[0] = dir1;
        connections[1] = dir2;

        UpdateTileVisuals();
        return true;
    }

    /// <summary>
    /// Remove pipe from this tile
    /// </summary>
    public void RemovePipe()
    {
        currentPipeType = PipeType.None;
        connections[0] = Direction.Up;
        connections[1] = Direction.Up;
        UpdateTileVisuals();
    }

    /// <summary>
    /// Get the exit direction for water entering from a direction
    /// </summary>
    public Direction GetExitDirection(Direction entryDirection)
    {
        if (currentPipeType == PipeType.None)
            return Direction.Up; // Invalid

        // If straight pipe, water continues in same direction
        if (currentPipeType == PipeType.Straight)
        {
            if (connections[0] == entryDirection || connections[1] == entryDirection)
            {
                // Return the other connection
                return connections[0] == entryDirection ? connections[1] : connections[0];
            }
        }

        // If corner pipe, redirect
        if (currentPipeType == PipeType.Corner)
        {
            if (connections[0] == entryDirection)
                return connections[1];
            if (connections[1] == entryDirection)
                return connections[0];
        }

        // If T-joint or filter, pass through
        if (currentPipeType == PipeType.TJoint || currentPipeType == PipeType.Filter)
        {
            return entryDirection; // Continue in same direction
        }

        return Direction.Up; // Invalid/no exit
    }

    /// <summary>
    /// Check if this tile has a pipe connection in a direction
    /// </summary>
    public bool HasConnection(Direction direction)
    {
        if (currentPipeType == PipeType.None)
            return false;

        return connections[0] == direction || connections[1] == direction;
    }

    /// <summary>
    /// Mark this as a special tile (Water Source, Village, etc.)
    /// </summary>
    public void SetTileType(TileType type)
    {
        tileType = type;
        UpdateTileVisuals();
    }

    /// <summary>
    /// Update visual representation of tile
    /// </summary>
    private void UpdateTileVisuals()
    {
        Color tileColor = BrandingConstants.ACCENT_LIGHT_BLUE;

        switch (tileType)
        {
            case TileType.WaterSource:
                tileColor = BrandingConstants.CHARITY_WATER_BLUE;
                break;
            case TileType.Village:
                tileColor = BrandingConstants.CHARITY_WATER_YELLOW;
                break;
            case TileType.Blocked:
                tileColor = Color.gray;
                break;
        }

        if (currentPipeType != PipeType.None)
        {
            tileColor = Color.white; // Pipe tiles are white
        }

        spriteRenderer.color = tileColor;
    }

    /// <summary>
    /// Check if water can enter this tile from a direction
    /// </summary>
    public bool CanWaterEnter(Direction fromDirection)
    {
        // Special tiles can receive water
        if (tileType == TileType.Village || tileType == TileType.WaterSource)
            return true;

        // Blocked tiles block water
        if (tileType == TileType.Blocked)
            return false;

        // Check pipe connections
        if (currentPipeType == PipeType.None)
            return false;

        return HasConnection(fromDirection);
    }

    // ===== Getters =====

    public int GetGridX() => gridX;
    public int GetGridY() => gridY;
    public PipeType GetPipeType() => currentPipeType;
    public TileType GetTileType() => tileType;
    public bool HasPipe() => currentPipeType != PipeType.None;
    public bool IsSpecialTile() => tileType != TileType.Normal;

    public Direction[] GetConnections()
    {
        return connections;
    }
}

/// <summary>
/// Types of tiles on the grid
/// </summary>
public enum TileType
{
    Normal,
    WaterSource,
    Village,
    Blocked
}
