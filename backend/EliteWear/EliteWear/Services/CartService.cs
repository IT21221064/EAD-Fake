/*
 Saubhagya S.D.S.S.	IT21312380
 
 */

using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class CartService
    {
        private readonly EliteWearDbContext _context;

        public CartService(EliteWearDbContext context)
        {
            _context = context;
        }

        public async Task<List<Cart>> GetCartsAsync()
        {
            return await _context.Carts.Find(cart => true).ToListAsync();
        }

        public async Task<Cart?> GetCartByIdAsync(int id)
        {
            return await _context.Carts.Find(cart => cart.UserId == id).FirstOrDefaultAsync();
        }

        // Method to get the next auto-incrementing cart ID
        public async Task<int> GetNextCartIdAsync()
        {
            var lastCart = await _context.Carts.Find(cart => true)
                .Sort(Builders<Cart>.Sort.Descending(c => c.Id))
                .Limit(1)
                .FirstOrDefaultAsync();

            return lastCart?.Id + 1 ?? 1; // If no carts exist, start at 1
        }

        public async Task CreateCartAsync(Cart cart)
        {
            // Set auto-incrementing ID
            cart.Id = await GetNextCartIdAsync();
            await _context.Carts.InsertOneAsync(cart);
        }

        public async Task UpdateCartAsync(int id, Cart updatedCart)
        {
            var filter = Builders<Cart>.Filter.Eq(cart => cart.UserId, id);
            var updateDefinition = Builders<Cart>.Update
                .Set(cart => cart.Items, updatedCart.Items) 
                .Set(cart => cart.TotalPrice, updatedCart.TotalPrice); 

            var result = await _context.Carts.UpdateOneAsync(filter, updateDefinition);

            if (result.ModifiedCount == 0)
            {
                throw new Exception("Cart not found or no changes made.");
            }
        }

        public async Task DeleteCartAsync(int id)
        {
            await _context.Carts.DeleteOneAsync(cart => cart.UserId == id);
        }

        public async Task<bool> RemoveCartItemAsync(int UserId, int cartItemId)
        {
            // Find the cart by UserId
            var cart = await _context.Carts.Find(c => c.UserId == UserId).FirstOrDefaultAsync();
            if (cart == null || cart.Items == null)
            {
                Console.WriteLine($"Cart with UserId {UserId} not found.");
                return false; // Cart or items not found
            }

            // Find the item to remove based on cartItemId
            var cartItem = cart.Items.FirstOrDefault(item => item.Id == cartItemId);
            if (cartItem == null)
            {
                Console.WriteLine($"Cart item with Id {cartItemId} not found.");
                return false; // Cart item not found
            }

            // Remove the item
            cart.Items.Remove(cartItem);

            // Recalculate the total price
            cart.TotalPrice = cart.Items.Sum(item => item.Price * item.Quantity);

            // Update the cart in the database
            var result = await _context.Carts.ReplaceOneAsync(c => c.UserId == UserId, cart);

            return result.ModifiedCount > 0; // Return true if the update was successful
        }

    }
}
