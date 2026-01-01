using InventoryApi.Data;
using InventoryApi.Models;
using HotChocolate;
using HotChocolate.Data;

namespace InventoryApi.GraphQL;

public class Query
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Item> GetItems([Service] AppDbContext context)
    {
        return context.Items;
    }
}
