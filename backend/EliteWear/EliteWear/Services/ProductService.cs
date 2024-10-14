/*
Sachintha N.H.D.K	IT21221064
 
 */



using EliteWear.Models;
using MongoDB.Driver;

namespace EliteWear.Services
{
    public class ProductService
    {
        private readonly EliteWearDbContext _context;
        private readonly NotificationService _notificationService;
        public ProductService(EliteWearDbContext context, NotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products.Find(product => true).ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _context.Products.Find(product => product.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateProductAsync(Product product)
        {
            // Check if a product with the same Id already exists
            var existingProduct = await GetProductByIdAsync(product.Id);

            if (existingProduct != null)
            {
                await RestockProductQuantityAsync(product.Id, product.Quantity);
            }
            else
            {

                await _context.Products.InsertOneAsync(product);
            }
        }


        public async Task UpdateProductAsync(int id, Product updatedProduct)
        {
            await _context.Products.ReplaceOneAsync(product => product.Id == id, updatedProduct);
        }

        public async Task DeleteProductAsync(int id)
        {
            // Check if the product exists in any active orders
            var orderWithProduct = await _context.Orders.Find(order => order.Items.Any(item => item.Id == id)).FirstOrDefaultAsync();

            if (orderWithProduct != null)
            {
                // Product is part of an order, so we cannot delete it
                throw new InvalidOperationException($"Cannot delete product with ID {id} because it is part of an active order.");
            }

            // Product is not in any order, proceed with deletion
            await _context.Products.DeleteOneAsync(product => product.Id == id);
        }


        public async Task DeductProductQuantityAsync(int productId, int quantityToDeduct)
        {
            var filter = Builders<Product>.Filter.Eq(product => product.Id, productId);
            var update = Builders<Product>.Update.Inc(product => product.Quantity, -quantityToDeduct); // Deduct the quantity

            var result = await _context.Products.FindOneAndUpdateAsync(filter, update, new FindOneAndUpdateOptions<Product>
            {
                ReturnDocument = ReturnDocument.After
            });

            if (result == null)
            {
                throw new Exception($"Product with ID {productId} not found or quantity unchanged.");
            }
            if (result.Quantity <= 10)
            {
                // Send notification to the vendor
                await _notificationService.SendLowStockNotification(result);
            }
        }

        public async Task RestockProductQuantityAsync(int productId, int quantityToAdd)
        {
            var filter = Builders<Product>.Filter.Eq(product => product.Id, productId);
            var update = Builders<Product>.Update.Inc(product => product.Quantity, quantityToAdd);

            var result = await _context.Products.FindOneAndUpdateAsync(filter, update, new FindOneAndUpdateOptions<Product>
            {
                ReturnDocument = ReturnDocument.After
            });

            if (result == null)
            {
                throw new Exception($"Product with ID {productId} not found.");
            }

            if (result.Quantity <= 10)
            {
                await _notificationService.SendLowStockNotification(result);
            }
        }

        public async Task ActivateProductStatusAsync(int productId)
        {
            var filter = Builders<Product>.Filter.Eq(product => product.Id, productId);
            var update = Builders<Product>.Update.Set(product => product.Status, "Active");

            var result = await _context.Products.FindOneAndUpdateAsync(filter, update, new FindOneAndUpdateOptions<Product>
            {
                ReturnDocument = ReturnDocument.After
            });

            if (result == null)
            {
                throw new Exception($"Product with ID {productId} not found or could not be activated.");
            }

            // Optionally, log or send a notification if needed
            Console.WriteLine($"Product with ID {productId} has been activated.");
        }


    }
}
