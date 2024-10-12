/*
 Saubhagya S.D.S.S.	IT21312380
 
 */


using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class OrderService
    {
        private readonly EliteWearDbContext _context;
        private readonly ProductService _productService;

        public OrderService(EliteWearDbContext context, ProductService productService)
        {
            _context = context;
            _productService = productService;
        }

        public async Task<List<Order>> GetOrdersAsync()
        {
            return await _context.Orders.Find(order => true).ToListAsync();
        }

        public async Task<List<Order>> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.Find(order => order.UserId == id).ToListAsync();
        }

        public async Task<int> GetNextOrderIdAsync()
        {
            var lastOrder = await _context.Orders.Find(order => true)
                .Sort(Builders<Order>.Sort.Descending(o => o.Id))
                .Limit(1)
                .FirstOrDefaultAsync();

            return lastOrder?.Id + 1 ?? 1; // If no orders exist, start at 1
        }

        public async Task CreateOrderAsync(Order order)
        {

            order.Id = await GetNextOrderIdAsync(); // Set the auto-incrementing ID

            await _context.Orders.InsertOneAsync(order);
            foreach (var item in order.Items)
            {
                // Deduct the quantity for each product in the order
                await _productService.DeductProductQuantityAsync(item.Id, item.Qty);
            }


        }


        public async Task UpdateOrderAsync(int id, Order updatedOrder)
        {
            await _context.Orders.ReplaceOneAsync(order => order.Id == id, updatedOrder);
        }

        public async Task UpdateOrderStatusAsync(int id, string newStatus)
        {
            var filter = Builders<Order>.Filter.Eq(order => order.Id, id);
            var update = Builders<Order>.Update.Set(order => order.Status, newStatus);

            var result = await _context.Orders.UpdateOneAsync(filter, update);
            if (result.ModifiedCount == 0)
            {
                throw new Exception($"Order with ID {id} not found or status unchanged.");
            }
        }


        public async Task UpdateOrderItemStatusAsync(int orderId, int itemId, string newStatus)
        {
            // Filter to find the order with the given ID and the item with the given itemId
            var filter = Builders<Order>.Filter.And(
                Builders<Order>.Filter.Eq(order => order.Id, orderId),
                Builders<Order>.Filter.ElemMatch(order => order.Items, item => item.Id == itemId)
            );

            // Update to set the new status for the specific item
            var update = Builders<Order>.Update.Set("Items.$.Status", newStatus);

            // Perform the update
            var result = await _context.Orders.UpdateOneAsync(filter, update);

            if (result.ModifiedCount == 0)
            {
                throw new Exception($"Order or item with ID {orderId} or item {itemId} not found, or status unchanged.");
            }

            // Check if all items in the order are delivered
            var order = await _context.Orders.Find(o => o.Id == orderId).FirstOrDefaultAsync();
            if (order != null && order.Items.All(item => item.Status == "Delivered"))
            {
                // Update the order status to 'Delivered'
                var updateOrderStatus = Builders<Order>.Update.Set(o => o.Status, "Delivered");
                await _context.Orders.UpdateOneAsync(o => o.Id == orderId, updateOrderStatus);
            }
            else if (order != null && order.Items.Any(item => item.Status == "Delivered"))
            {
                // Update the order status to 'Partially Delivered'
                var updateOrderStatus = Builders<Order>.Update.Set(o => o.Status, "Partially Delivered");
                await _context.Orders.UpdateOneAsync(o => o.Id == orderId, updateOrderStatus);
            }
        }



        public async Task DeleteOrderAsync(int id)
        {
            await _context.Orders.DeleteOneAsync(order => order.Id == id);
        }
    }
}
