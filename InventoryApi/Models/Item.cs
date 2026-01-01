using System.ComponentModel.DataAnnotations;

namespace InventoryApi.Models;

public class Item
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    
    public string Type { get; set; } = string.Empty;
    
    public int Quantity { get; set; }
}
