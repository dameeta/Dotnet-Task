using InventoryApi.Data;
using InventoryApi.Models;
using HotChocolate;

namespace InventoryApi.GraphQL;

public class Mutation
{
    public async Task<Item> AddItem(
        string name,
        string type,
        int quantity,
        [Service] AppDbContext context)
    {
        var item = new Item
        {
            Name = name,
            Type = type,
            Quantity = quantity
        };

        context.Items.Add(item);
        await context.SaveChangesAsync();

        return item;
    }

    public async Task<bool> DeleteItem(
        int id,
        [Service] AppDbContext context)
    {
        var item = await context.Items.FindAsync(id);
        if (item == null)
        {
            return false;
        }

        context.Items.Remove(item);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<Item?> UpdateQuantity(
        int id,
        int quantity,
        [Service] AppDbContext context)
    {
        var item = await context.Items.FindAsync(id);
        if (item == null)
        {
            return null;
        }

        item.Quantity = quantity;
        await context.SaveChangesAsync();

        return item;
    }
}
